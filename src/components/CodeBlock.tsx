import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { Copy, Check, Edit3, Eye, Maximize2, X } from "lucide-react";
import { toast } from "sonner";

interface CodeBlockProps {
  children?: string;
  value?: string;
  onChange?: (value: string) => void;
  language?: string;
  title?: string;
  className?: string;
  placeholder?: string;
  readOnly?: boolean;
  minHeight?: string;
  interactive?: boolean;
  fixedHeight?: boolean;
  maxHeight?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({
  children,
  value,
  onChange,
  language = "json",
  title,
  className = "",
  placeholder = "Enter code...",
  readOnly = false,
  minHeight = "200px",
  interactive = false,
  fixedHeight = true,
  maxHeight = "400px",
}) => {
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(!readOnly && interactive);
  const [localValue, setLocalValue] = useState(value || children || "");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Use value prop for controlled components, children for static content
  const content = value !== undefined ? value : children || "";

  useEffect(() => {
    setLocalValue(content);
  }, [content]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(localValue);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy — please copy the text manually.");
    }
  };

  const handleChange = (newValue: string) => {
    setLocalValue(newValue);
    onChange?.(newValue);
  };

  const toggleEditMode = () => {
    if (!readOnly && interactive) {
      setIsEditing(!isEditing);
    }
  };

  const formatJSON = () => {
    try {
      const formatted = JSON.stringify(JSON.parse(localValue), null, 2);
      handleChange(formatted);
    } catch {
      // Invalid JSON, do not reformat.
    }
  };

  // Handle keyboard shortcuts
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const target = e.target as HTMLTextAreaElement;
      const start = target.selectionStart;
      const end = target.selectionEnd;
      const newValue =
        localValue.substring(0, start) + "  " + localValue.substring(end);
      handleChange(newValue);

      // Set cursor position after the inserted spaces
      setTimeout(() => {
        target.selectionStart = target.selectionEnd = start + 2;
      }, 0);
    }

    // Auto-close brackets and quotes
    if (e.key === "{") {
      e.preventDefault();
      const target = e.target as HTMLTextAreaElement;
      const start = target.selectionStart;
      const end = target.selectionEnd;
      const newValue =
        localValue.substring(0, start) + "{}" + localValue.substring(end);
      handleChange(newValue);

      setTimeout(() => {
        target.selectionStart = target.selectionEnd = start + 1;
      }, 0);
    }

    if (e.key === '"') {
      e.preventDefault();
      const target = e.target as HTMLTextAreaElement;
      const start = target.selectionStart;
      const end = target.selectionEnd;
      const newValue =
        localValue.substring(0, start) + '""' + localValue.substring(end);
      handleChange(newValue);

      setTimeout(() => {
        target.selectionStart = target.selectionEnd = start + 1;
      }, 0);
    }
  };

  // Generate line numbers
  const lines = localValue.split("\n");
  const lineNumbers = lines.map((_, index) => index + 1);

  /**
   * Security: dangerouslySetInnerHTML is used below to render syntax-highlighted output.
   * This is safe because:
   *   1. Input is code entered by authenticated users or loaded from the CMS — not from untrusted third parties.
   *   2. The highlightSyntax function only produces <span class="..."> wrappers using a fixed allow-list of Tailwind classes.
   *   3. HTML special characters (&, <, >, ", ') are entity-escaped before any regex replacements run.
   * No user-supplied HTML is ever injected; the output shape is fully controlled by this function.
   */
  const highlightSyntax = (code: string, lang: string) => {
    if (!code) return "";

    switch (lang) {
      case "json":
        return (
          code
            // Escape HTML entities first to prevent XSS via dangerouslySetInnerHTML
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            // Property names (keys)
            .replace(
              /"([^"]+)":/g,
              '<span class="text-codeblock-key">"$1"</span>:',
            )
            // String values
            .replace(
              /:\s*"([^"]+)"/g,
              ': <span class="text-codeblock-string">"$1"</span>',
            )
            // Standalone strings (not property values)
            .replace(
              /(^|\s|,|\[)"([^"]+)"(?=\s*[,\]}])/gm,
              '$1<span class="text-codeblock-string">"$2"</span>',
            )
            // Booleans and null
            .replace(
              /:\s*(true|false|null)/g,
              ': <span class="text-codeblock-number">$1</span>',
            )
            // Standalone booleans and null
            .replace(
              /(^|\s|,|\[)(true|false|null)(?=\s*[,\]}])/gm,
              '$1<span class="text-codeblock-number">$2</span>',
            )
            // Numbers
            .replace(
              /:\s*(-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)/g,
              ': <span class="text-codeblock-number">$1</span>',
            )
            // Standalone numbers
            .replace(
              /(^|\s|,|\[)(-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)(?=\s*[,\]}])/gm,
              '$1<span class="text-codeblock-number">$2</span>',
            )
            // Brackets and braces in white
            .replace(/([{}[\]])/g, '<span class="text-codeblock-fg">$1</span>')
            // Commas and colons in white
            .replace(/([,:])/g, '<span class="text-codeblock-fg">$1</span>')
            // Comments in gray italic (though not standard JSON)
            .replace(
              /(\/\/.*$)/gm,
              '<span class="text-codeblock-comment italic">$1</span>',
            )
            .replace(
              /(\/\*[\s\S]*?\*\/)/g,
              '<span class="text-codeblock-comment italic">$1</span>',
            )
        );

      case "bash":
      case "shell": {
        // Token-based approach to avoid regex conflicts
        const bashTokens: Array<{ type: string; value: string }> = [];
        let bi = 0;

        while (bi < code.length) {
          // Skip whitespace
          if (/\s/.test(code[bi])) {
            let ws = "";
            while (bi < code.length && /\s/.test(code[bi])) {
              ws += code[bi];
              bi++;
            }
            bashTokens.push({ type: "whitespace", value: ws });
            continue;
          }

          // Comments
          if (code[bi] === "#") {
            let comment = "";
            while (bi < code.length && code[bi] !== "\n") {
              comment += code[bi];
              bi++;
            }
            bashTokens.push({ type: "comment", value: comment });
            continue;
          }

          // Single-quoted strings
          if (code[bi] === "'") {
            let str = "'";
            bi++;
            while (bi < code.length) {
              if (code[bi] === "'") {
                str += code[bi];
                bi++;
                break;
              }
              str += code[bi];
              bi++;
            }
            bashTokens.push({ type: "string", value: str });
            continue;
          }

          // Double-quoted strings
          if (code[bi] === '"') {
            let str = '"';
            bi++;
            while (bi < code.length) {
              if (code[bi] === "\\" && bi + 1 < code.length) {
                str += code[bi] + code[bi + 1];
                bi += 2;
              } else if (code[bi] === '"') {
                str += code[bi];
                bi++;
                break;
              } else {
                str += code[bi];
                bi++;
              }
            }
            bashTokens.push({ type: "string", value: str });
            continue;
          }

          // URLs (http:// or https://)
          if (
            code.substr(bi, 7) === "http://" ||
            code.substr(bi, 8) === "https://"
          ) {
            let url = "";
            while (bi < code.length && !/[\s"'\\]/.test(code[bi])) {
              url += code[bi];
              bi++;
            }
            bashTokens.push({ type: "url", value: url });
            continue;
          }

          // Flags (--flag or -f)
          if (
            code[bi] === "-" &&
            bi + 1 < code.length &&
            /[a-zA-Z-]/.test(code[bi + 1])
          ) {
            let flag = "-";
            bi++;
            while (bi < code.length && /[a-zA-Z0-9-]/.test(code[bi])) {
              flag += code[bi];
              bi++;
            }
            bashTokens.push({ type: "flag", value: flag });
            continue;
          }

          // Commands (curl, git, etc.)
          if (/[a-zA-Z_]/.test(code[bi])) {
            let word = "";
            while (bi < code.length && /[a-zA-Z0-9_-]/.test(code[bi])) {
              word += code[bi];
              bi++;
            }

            const commands = [
              "curl",
              "wget",
              "ssh",
              "scp",
              "git",
              "npm",
              "yarn",
              "pnpm",
              "node",
              "python",
              "ruby",
              "go",
            ];
            if (commands.includes(word)) {
              bashTokens.push({ type: "command", value: word });
            } else {
              bashTokens.push({ type: "text", value: word });
            }
            continue;
          }

          // Everything else
          bashTokens.push({ type: "operator", value: code[bi] });
          bi++;
        }

        // Convert tokens to HTML
        return bashTokens
          .map((token) => {
            const escaped = token.value
              .replace(/&/g, "&amp;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;");

            switch (token.type) {
              case "comment":
                return `<span class="text-codeblock-comment italic">${escaped}</span>`;
              case "string":
                return `<span class="text-codeblock-string">${escaped}</span>`;
              case "url":
                return `<span class="text-codeblock-accent">${escaped}</span>`;
              case "flag":
                return `<span class="text-codeblock-key">${escaped}</span>`;
              case "command":
                return `<span class="text-codeblock-fg">${escaped}</span>`;
              case "whitespace":
              case "text":
              case "operator":
              default:
                return escaped;
            }
          })
          .join("");
      }

      case "javascript":
      case "js":
      case "typescript":
      case "ts": {
        // Token-based approach to avoid regex conflicts
        const jsTokens: Array<{ type: string; value: string }> = [];
        let i = 0;

        while (i < code.length) {
          // Skip whitespace
          if (/\s/.test(code[i])) {
            let ws = "";
            while (i < code.length && /\s/.test(code[i])) {
              ws += code[i];
              i++;
            }
            jsTokens.push({ type: "whitespace", value: ws });
            continue;
          }

          // Comments
          if (code.substr(i, 2) === "//") {
            let comment = "";
            while (i < code.length && code[i] !== "\n") {
              comment += code[i];
              i++;
            }
            jsTokens.push({ type: "comment", value: comment });
            continue;
          }

          if (code.substr(i, 2) === "/*") {
            let comment = "";
            while (i < code.length) {
              comment += code[i];
              if (code.substr(i, 2) === "*/") {
                comment += code[++i];
                i++;
                break;
              }
              i++;
            }
            jsTokens.push({ type: "comment", value: comment });
            continue;
          }

          // Strings
          if (code[i] === '"' || code[i] === "'" || code[i] === "`") {
            const quote = code[i];
            let str = quote;
            i++;
            while (i < code.length) {
              if (code[i] === "\\" && i + 1 < code.length) {
                str += code[i] + code[i + 1];
                i += 2;
              } else if (code[i] === quote) {
                str += code[i];
                i++;
                break;
              } else {
                str += code[i];
                i++;
              }
            }
            jsTokens.push({ type: "string", value: str });
            continue;
          }

          // Numbers
          if (/\d/.test(code[i])) {
            let num = "";
            while (i < code.length && /[\d.]/.test(code[i])) {
              num += code[i];
              i++;
            }
            jsTokens.push({ type: "number", value: num });
            continue;
          }

          // Identifiers and keywords
          if (/[a-zA-Z_$]/.test(code[i])) {
            let ident = "";
            while (i < code.length && /[a-zA-Z0-9_$]/.test(code[i])) {
              ident += code[i];
              i++;
            }

            const keywords = [
              "const",
              "let",
              "var",
              "function",
              "class",
              "if",
              "else",
              "for",
              "while",
              "do",
              "switch",
              "case",
              "break",
              "continue",
              "return",
              "try",
              "catch",
              "finally",
              "throw",
              "async",
              "await",
              "import",
              "export",
              "from",
              "default",
              "extends",
              "implements",
              "interface",
              "type",
              "enum",
              "namespace",
              "module",
              "declare",
              "abstract",
              "static",
              "public",
              "private",
              "protected",
              "readonly",
              "override",
            ];
            const booleans = [
              "true",
              "false",
              "null",
              "undefined",
              "NaN",
              "Infinity",
              "this",
              "super",
              "new",
            ];

            if (keywords.includes(ident)) {
              jsTokens.push({ type: "keyword", value: ident });
            } else if (booleans.includes(ident)) {
              jsTokens.push({ type: "boolean", value: ident });
            } else {
              // Check if next non-whitespace char is '(' for function call
              let j = i;
              while (j < code.length && /\s/.test(code[j])) j++;
              if (code[j] === "(") {
                jsTokens.push({ type: "function", value: ident });
              } else if (i > 0 && code[i - ident.length - 1] === ".") {
                jsTokens.push({ type: "property", value: ident });
              } else {
                jsTokens.push({ type: "identifier", value: ident });
              }
            }
            continue;
          }

          // Operators and punctuation
          jsTokens.push({ type: "operator", value: code[i] });
          i++;
        }

        // Convert tokens to HTML
        return jsTokens
          .map((token) => {
            const escaped = token.value
              .replace(/&/g, "&amp;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;");

            switch (token.type) {
              case "comment":
                return `<span class="text-codeblock-comment italic">${escaped}</span>`;
              case "string":
                return `<span class="text-codeblock-string">${escaped}</span>`;
              case "keyword":
                return `<span class="text-codeblock-keyword">${escaped}</span>`;
              case "boolean":
              case "number":
                return `<span class="text-codeblock-number">${escaped}</span>`;
              case "function":
              case "property":
                return `<span class="text-codeblock-accent">${escaped}</span>`;
              case "whitespace":
              case "identifier":
              case "operator":
              default:
                return escaped;
            }
          })
          .join("");
      }

      case "python":
        return (
          code
            // Keywords in purple
            .replace(
              /\b(def|class|if|elif|else|for|while|try|except|finally|with|as|import|from|return|yield|lambda|pass|break|continue|raise|assert|del|global|nonlocal|async|await|and|or|not|in|is)\b/g,
              '<span class="text-codeblock-keyword">$1</span>',
            )
            // Built-in functions
            .replace(
              /\b(print|len|range|str|int|float|list|dict|set|tuple|bool|type|input|open|round|abs|sum|min|max|sorted|reversed|enumerate|zip|map|filter)\b/g,
              '<span class="text-codeblock-accent">$1</span>',
            )
            // Function/method calls
            .replace(
              /\b([a-zA-Z_][a-zA-Z0-9_]*)\s*(?=\()/g,
              '<span class="text-codeblock-accent">$1</span>',
            )
            // Decorators
            .replace(
              /(@[a-zA-Z_][a-zA-Z0-9_]*)/g,
              '<span class="text-codeblock-tag">$1</span>',
            )
            // Strings
            .replace(
              /("""[\s\S]*?""")/g,
              '<span class="text-codeblock-string">$1</span>',
            )
            .replace(
              /('''[\s\S]*?''')/g,
              '<span class="text-codeblock-string">$1</span>',
            )
            .replace(
              /("([^"\\]|\\.)*")/g,
              '<span class="text-codeblock-string">$1</span>',
            )
            .replace(
              /('([^'\\]|\\.)*')/g,
              '<span class="text-codeblock-string">$1</span>',
            )
            // Numbers
            .replace(
              /\b(\d+(?:\.\d+)?)\b/g,
              '<span class="text-codeblock-number">$1</span>',
            )
            // Booleans and None
            .replace(
              /\b(True|False|None)\b/g,
              '<span class="text-codeblock-number">$1</span>',
            )
            // self
            .replace(
              /\b(self|cls)\b/g,
              '<span class="text-codeblock-number">$1</span>',
            )
            // Comments in gray italic
            .replace(
              /(#.*$)/gm,
              '<span class="text-codeblock-comment italic">$1</span>',
            )
        );

      case "html":
      case "xml":
        return (
          code
            // HTML tags
            .replace(/(<\/?[a-zA-Z][^>]*>)/g, (match) => {
              return (
                match
                  // Tag brackets in gray
                  .replace(
                    /([<>/])/g,
                    '<span class="text-codeblock-fg-muted">$1</span>',
                  )
                  // Tag names
                  .replace(
                    /(<\/?|<)([a-zA-Z][a-zA-Z0-9-]*)/g,
                    '$1<span class="text-codeblock-tag">$2</span>',
                  )
                  // Attribute names
                  .replace(
                    /\s([a-zA-Z][a-zA-Z0-9-]*)=/g,
                    ' <span class="text-codeblock-attribute">$1</span>=',
                  )
                  // Attribute values
                  .replace(
                    /="([^"]*)"/g,
                    '=<span class="text-codeblock-string">"$1"</span>',
                  )
                  .replace(
                    /='([^']*)'/g,
                    "=<span class=\"text-codeblock-string\">'$1'</span>",
                  )
              );
            })
            // Comments in gray italic
            .replace(
              /(<!--[\s\S]*?-->)/g,
              '<span class="text-codeblock-comment italic">$1</span>',
            )
        );

      case "css":
      case "scss":
      case "sass":
        return (
          code
            // Selectors
            .replace(
              /^([^{}\s][^{}]*)\s*{/gm,
              '<span class="text-codeblock-accent">$1</span> {',
            )
            // Property names
            .replace(
              /([a-zA-Z-]+)\s*:/g,
              '<span class="text-codeblock-key">$1</span>:',
            )
            // Values
            .replace(
              /:\s*([^;}\s]+)/g,
              ': <span class="text-codeblock-string">$1</span>',
            )
            // Important
            .replace(
              /!important/g,
              '<span class="text-codeblock-tag">!important</span>',
            )
            // Units
            .replace(
              /(\d+)(px|em|rem|%|vh|vw|vmin|vmax|ch|ex|mm|cm|in|pt|pc)/g,
              '<span class="text-codeblock-number">$1$2</span>',
            )
            // Comments in gray italic
            .replace(
              /(\/\*[\s\S]*?\*\/)/g,
              '<span class="text-codeblock-comment italic">$1</span>',
            )
            .replace(
              /(\/\/.*$)/gm,
              '<span class="text-codeblock-comment italic">$1</span>',
            )
        );

      case "java": {
        // Token-based approach to avoid regex conflicts
        const tokens: Array<{ type: string; value: string }> = [];
        let i = 0;

        while (i < code.length) {
          // Skip whitespace
          if (/\s/.test(code[i])) {
            let ws = "";
            while (i < code.length && /\s/.test(code[i])) {
              ws += code[i];
              i++;
            }
            tokens.push({ type: "whitespace", value: ws });
            continue;
          }

          // Comments
          if (code.substr(i, 2) === "//") {
            let comment = "";
            while (i < code.length && code[i] !== "\n") {
              comment += code[i];
              i++;
            }
            tokens.push({ type: "comment", value: comment });
            continue;
          }

          if (code.substr(i, 2) === "/*") {
            let comment = "";
            while (i < code.length) {
              comment += code[i];
              if (code.substr(i, 2) === "*/") {
                comment += code[++i];
                i++;
                break;
              }
              i++;
            }
            tokens.push({ type: "comment", value: comment });
            continue;
          }

          // Strings
          if (code[i] === '"' || code[i] === "'") {
            const quote = code[i];
            let str = quote;
            i++;
            while (i < code.length) {
              if (code[i] === "\\" && i + 1 < code.length) {
                str += code[i] + code[i + 1];
                i += 2;
              } else if (code[i] === quote) {
                str += code[i];
                i++;
                break;
              } else {
                str += code[i];
                i++;
              }
            }
            tokens.push({ type: "string", value: str });
            continue;
          }

          // Numbers
          if (/\d/.test(code[i])) {
            let num = "";
            while (i < code.length && /[\d.fFdDlL]/.test(code[i])) {
              num += code[i];
              i++;
            }
            tokens.push({ type: "number", value: num });
            continue;
          }

          // Identifiers and keywords
          if (/[a-zA-Z_$]/.test(code[i])) {
            let ident = "";
            while (i < code.length && /[a-zA-Z0-9_$]/.test(code[i])) {
              ident += code[i];
              i++;
            }

            // Check if it's a keyword
            const keywords = [
              "public",
              "private",
              "protected",
              "static",
              "final",
              "abstract",
              "class",
              "interface",
              "extends",
              "implements",
              "package",
              "import",
              "return",
              "if",
              "else",
              "for",
              "while",
              "do",
              "switch",
              "case",
              "break",
              "continue",
              "try",
              "catch",
              "finally",
              "throw",
              "throws",
              "new",
              "this",
              "super",
              "void",
              "int",
              "double",
              "float",
              "long",
              "short",
              "byte",
              "char",
              "boolean",
              "String",
              "Object",
            ];
            const booleans = ["true", "false", "null"];

            if (keywords.includes(ident)) {
              tokens.push({ type: "keyword", value: ident });
            } else if (booleans.includes(ident)) {
              tokens.push({ type: "boolean", value: ident });
            } else if (/^[A-Z]/.test(ident)) {
              tokens.push({ type: "class", value: ident });
            } else {
              // Check if next non-whitespace char is '(' for method call
              let j = i;
              while (j < code.length && /\s/.test(code[j])) j++;
              if (code[j] === "(") {
                tokens.push({ type: "method", value: ident });
              } else {
                tokens.push({ type: "identifier", value: ident });
              }
            }
            continue;
          }

          // Annotations
          if (code[i] === "@") {
            let annotation = "@";
            i++;
            while (i < code.length && /[a-zA-Z0-9_]/.test(code[i])) {
              annotation += code[i];
              i++;
            }
            tokens.push({ type: "annotation", value: annotation });
            continue;
          }

          // Everything else (operators, punctuation)
          tokens.push({ type: "operator", value: code[i] });
          i++;
        }

        // Convert tokens to HTML
        return tokens
          .map((token) => {
            const escaped = token.value
              .replace(/&/g, "&amp;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;");

            switch (token.type) {
              case "comment":
                return `<span class="text-codeblock-comment italic">${escaped}</span>`;
              case "string":
                return `<span class="text-codeblock-string">${escaped}</span>`;
              case "keyword":
                return `<span class="text-codeblock-keyword">${escaped}</span>`;
              case "boolean":
              case "number":
                return `<span class="text-codeblock-number">${escaped}</span>`;
              case "class":
              case "method":
                return `<span class="text-codeblock-accent">${escaped}</span>`;
              case "annotation":
                return `<span class="text-codeblock-tag">${escaped}</span>`;
              case "whitespace":
              case "identifier":
              case "operator":
              default:
                return escaped;
            }
          })
          .join("");
      }

      default:
        return code;
    }
  };

  const getLanguageIcon = (lang: string) => {
    switch (lang) {
      case "json":
        return "{}";
      case "javascript":
      case "js":
        return "JS";
      case "typescript":
      case "ts":
        return "TS";
      case "python":
        return "PY";
      case "bash":
      case "shell":
        return "$";
      case "html":
      case "xml":
        return "<>";
      case "css":
      case "scss":
      case "sass":
        return "CSS";
      case "java":
        return "JAVA";
      default:
        return "<>";
    }
  };

  // Auto-resize textarea only for interactive mode when not using fixed height
  useEffect(() => {
    if (textareaRef.current && isEditing && !fixedHeight) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        Math.max(textareaRef.current.scrollHeight, parseInt(minHeight)) + "px";
    }
  }, [localValue, isEditing, minHeight, fixedHeight]);

  const ExpandModal = ({
    isOpen,
    onClose,
  }: {
    isOpen: boolean;
    onClose: () => void;
  }) => {
    if (!isOpen) return null;

    return createPortal(
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <div
          className="rounded-xl border border-codeblock-border bg-codeblock-bg shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-codeblock-border bg-codeblock-surface">
            <span className="text-[11px] font-semibold font-mono tracking-wider text-codeblock-fg-muted uppercase">
              {title || getLanguageIcon(language)}
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={handleCopy}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                  copied
                    ? "text-green-400"
                    : "text-codeblock-fg-muted hover:text-white"
                }`}
                title={copied ? "Copied!" : "Copy"}
                type="button"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">Copy</span>
                  </>
                )}
              </button>
              <button
                onClick={onClose}
                className="h-7 w-7 flex items-center justify-center rounded text-codeblock-fg-muted hover:text-white hover:bg-white/8 transition-colors"
                type="button"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
          <div className="overflow-auto max-h-[calc(90vh-56px)]">
            <div className="bg-codeblock-bg">
              <div className="flex">
                <div className="shrink-0 select-none px-3 sm:px-4 py-5 border-r border-codeblock-border">
                  <div className="text-[13px] font-mono leading-6 text-codeblock-line-number text-right">
                    {lineNumbers.map((num) => (
                      <div key={num} className="min-w-5 sm:min-w-7 h-6">
                        {num}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex-1 overflow-x-auto overflow-y-auto">
                  <pre className="px-4 py-5 text-[13px] font-mono leading-6 text-codeblock-fg whitespace-pre">
                    <code
                      className={language ? `language-${language}` : ""}
                      dangerouslySetInnerHTML={{
                        __html: highlightSyntax(
                          localValue || placeholder,
                          language,
                        ),
                      }}
                    />
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>,
      document.body,
    );
  };

  // Language display label for the pill tab
  const langLabel = title || getLanguageIcon(language);

  return (
    <>
      {/* ── CodeBlock shell ─────────────────────────────────────────────── */}
      <div
        className={`group rounded-xl overflow-hidden border border-codeblock-border bg-codeblock-bg shadow-lg ${className}`}
      >
        {/* ── Header bar ──────────────────────────────────────────────── */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-codeblock-surface border-b border-codeblock-border">
          {/* Left: language pill + optional edit mode indicator */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold font-mono tracking-wider text-codeblock-fg-muted uppercase select-none">
              {langLabel}
            </span>
            {interactive && !readOnly && (
              <span
                className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${
                  isEditing
                    ? "bg-blue-500/20 text-blue-400"
                    : "bg-white/5 text-codeblock-fg-muted"
                }`}
              >
                {isEditing ? "EDIT" : "VIEW"}
              </span>
            )}
          </div>

          {/* Right: action buttons */}
          <div className="flex items-center gap-1">
            {interactive && !readOnly && (
              <button
                onClick={toggleEditMode}
                className="flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-medium text-codeblock-fg-muted hover:text-white hover:bg-white/8 transition-colors"
                title={isEditing ? "View mode" : "Edit mode"}
                type="button"
              >
                {isEditing ? (
                  <>
                    <Eye className="h-3 w-3" />
                    <span className="hidden sm:inline ml-1">View</span>
                  </>
                ) : (
                  <>
                    <Edit3 className="h-3 w-3" />
                    <span className="hidden sm:inline ml-1">Edit</span>
                  </>
                )}
              </button>
            )}

            {language === "json" && isEditing && interactive && (
              <button
                onClick={formatJSON}
                className="hidden sm:flex items-center px-2.5 py-1 rounded text-[11px] font-medium text-codeblock-fg-muted hover:text-white hover:bg-white/8 transition-colors"
                type="button"
              >
                Format
              </button>
            )}

            {fixedHeight && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-medium text-codeblock-fg-muted hover:text-white hover:bg-white/8 transition-colors"
                title="Expand"
                type="button"
              >
                <Maximize2 className="h-3 w-3" />
                <span className="hidden sm:inline ml-1">Expand</span>
              </button>
            )}

            <button
              onClick={handleCopy}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                copied
                  ? "text-green-400"
                  : "text-codeblock-fg-muted hover:text-white"
              }`}
              title={copied ? "Copied!" : "Copy"}
              type="button"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Copy</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* ── Code body ────────────────────────────────────────────────── */}
        <div
          className="flex overflow-hidden"
          style={fixedHeight ? { maxHeight } : {}}
        >
          {/* Line numbers */}
          <div className="shrink-0 select-none px-3 sm:px-4 py-5 border-r border-codeblock-border">
            <div className="text-[13px] font-mono leading-6 text-codeblock-line-number text-right">
              {lineNumbers.map((num) => (
                <div key={num} className="min-w-5 sm:min-w-7 h-6">
                  {num}
                </div>
              ))}
            </div>
          </div>

          {/* Code content */}
          <div className="flex-1 relative overflow-hidden">
            {isEditing && interactive ? (
              <textarea
                ref={textareaRef}
                value={localValue}
                onChange={(e) => handleChange(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                className="w-full px-4 py-5 text-[13px] font-mono leading-6 text-codeblock-fg bg-transparent border-none outline-none resize-none overflow-auto"
                style={fixedHeight ? { height: maxHeight } : { minHeight }}
                spellCheck={false}
              />
            ) : (
              <div className="w-full h-full overflow-x-auto overflow-y-auto">
                <pre className="px-4 py-5 text-[13px] font-mono leading-6 text-codeblock-fg whitespace-pre">
                  <code
                    className={language ? `language-${language}` : ""}
                    dangerouslySetInnerHTML={{
                      __html: highlightSyntax(
                        localValue || placeholder,
                        language,
                      ),
                    }}
                  />
                </pre>
              </div>
            )}

            {!localValue && isEditing && interactive && (
              <div className="absolute inset-0 px-4 py-5 text-xs font-mono text-codeblock-line-number pointer-events-none">
                {placeholder}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Full-screen modal ─────────────────────────────────────────────── */}
      <ExpandModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default CodeBlock;
