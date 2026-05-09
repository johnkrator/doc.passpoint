import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import {
  X,
  Send,
  RotateCcw,
  ChevronDown,
  MessageSquare,
  Plus,
  Copy,
  Check,
  Sparkles,
  GitCompare,
  Bot,
  User,
  Loader2,
  Maximize2,
  Minimize2,
  FileText,
} from "lucide-react";
import {
  sendChatMessage,
  type ChatResponse,
  type ContextMessage,
} from "../../services/ai.service";
import ModelMetadataBadge from "./ModelMetadataBadge";
import ComparisonView from "./ComparisonView";
import { ClaudeLogo, GeminiLogo, AutoRouteLogo } from "./ProviderLogos";
import { isValidSourcePath } from "../../constants/validRoutes";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  metadata?: ChatResponse;
  timestamp: Date;
}

interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
}

interface PasspointAIProps {
  isOpen: boolean;
  onClose: () => void;
}

const MODEL_OPTIONS = [
  { value: "auto", label: "Auto (Smart Route)", Logo: AutoRouteLogo },
  { value: "claude", label: "Claude", Logo: ClaudeLogo },
  { value: "gemini", label: "Gemini", Logo: GeminiLogo },
];

const FOLLOW_UP_PATTERN =
  /^(tell me more|more|continue|go on|elaborate|expand|explain more|what else|keep going|next|and\?|more info|more details?)\.?[!?]?$/i;

function enrichFollowUpPrompt(prompt: string, messages: Message[]): string {
  if (!FOLLOW_UP_PATTERN.test(prompt.trim())) return prompt;

  const lastAssistant = [...messages].reverse().find((m) => m.role === "assistant");
  const lastUser = [...messages].reverse().find(
    (m) => m.role === "user" && m.content.toLowerCase() !== prompt.toLowerCase(),
  );

  if (lastUser) {
    return `Please elaborate further on my previous question: "${lastUser.content}". Expand on the details, provide concrete examples, and cover any important aspects not yet addressed.`;
  }
  if (lastAssistant) {
    const snippet = lastAssistant.content.slice(0, 120).replace(/\n/g, " ");
    return `Please continue and expand on what you just explained: "${snippet}..."`;
  }

  return prompt;
}

const SUGGESTED_PROMPTS = [
  "How do I integrate the Passpoint payment API?",
  "What authentication methods are available?",
  "Explain the webhook callback format",
];

export default function PasspointAI({ isOpen, onClose }: PasspointAIProps) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<
    string | null
  >(null);
  const [input, setInput] = useState("");
  const [selectedModel, setSelectedModel] = useState("auto");
  const [isLoading, setIsLoading] = useState(false);
  const [showModelDropdown, setShowModelDropdown] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [comparisonPrompt, setComparisonPrompt] = useState("");
  const [showHistory, setShowHistory] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const activeConversation = conversations.find(
    (c) => c.id === activeConversationId,
  );

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeConversation?.messages]);

  function createNewConversation(): string {
    const id = crypto.randomUUID();
    const newConv: Conversation = {
      id,
      title: "New Chat",
      messages: [],
      createdAt: new Date(),
    };
    setConversations((prev) => [newConv, ...prev]);
    setActiveConversationId(id);
    return id;
  }

  async function handleSend(prompt?: string) {
    const text = prompt || input.trim();
    if (!text || isLoading) return;

    let convId = activeConversationId;
    if (!convId) {
      convId = createNewConversation();
    }

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
      timestamp: new Date(),
    };

    setConversations((prev) =>
      prev.map((c) => {
        if (c.id === convId) {
          const isFirst = c.messages.length === 0;
          return {
            ...c,
            title: isFirst
              ? text.slice(0, 50) + (text.length > 50 ? "..." : "")
              : c.title,
            messages: [...c.messages, userMessage],
          };
        }
        return c;
      }),
    );

    setInput("");
    setIsLoading(true);

    try {
      const priorMessages =
        conversations.find((c) => c.id === convId)?.messages || [];

      const context: ContextMessage[] = priorMessages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const enrichedPrompt = enrichFollowUpPrompt(text, priorMessages);

      const response = await sendChatMessage({
        model: selectedModel,
        prompt: enrichedPrompt,
        context,
      });

      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: response.output,
        metadata: response,
        timestamp: new Date(),
      };

      setConversations((prev) =>
        prev.map((c) =>
          c.id === convId
            ? { ...c, messages: [...c.messages, assistantMessage] }
            : c,
        ),
      );
    } catch (error: any) {
      const errorMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: `❌ **Error:** ${error?.response?.data?.message || error?.message || "Failed to get response"}`,
        timestamp: new Date(),
      };
      setConversations((prev) =>
        prev.map((c) =>
          c.id === convId
            ? { ...c, messages: [...c.messages, errorMessage] }
            : c,
        ),
      );
    } finally {
      setIsLoading(false);
    }
  }

  async function handleRetry(message: Message) {
    if (!activeConversation) return;
    const idx = activeConversation.messages.findIndex(
      (m) => m.id === message.id,
    );
    const userMsg = activeConversation.messages[idx - 1];
    if (userMsg && userMsg.role === "user") {
      setConversations((prev) =>
        prev.map((c) =>
          c.id === activeConversationId
            ? { ...c, messages: c.messages.filter((m) => m.id !== message.id) }
            : c,
        ),
      );
      await handleSend(userMsg.content);
    }
  }

  function handleCompare(message: Message) {
    const idx =
      activeConversation?.messages.findIndex((m) => m.id === message.id) ?? -1;
    const userMsg = activeConversation?.messages[idx - 1];
    if (userMsg) {
      setComparisonPrompt(userMsg.content);
      setShowComparison(true);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 z-100 flex ${isFullscreen ? "" : "items-end justify-center md:items-center md:p-4"}`}>
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel — bottom sheet on mobile, floating card on md+, full screen when expanded */}
      <div
        className={`relative flex flex-col w-full overflow-hidden shadow-2xl bg-background border-border ${
          isFullscreen
            ? "h-full border-0 rounded-none"
            : "rounded-t-2xl md:rounded-2xl border h-[92dvh] md:w-[520px] md:h-[680px] md:max-h-[85vh]"
        }`}
        style={{ animation: "slideUpSheet 0.32s cubic-bezier(0.32,0.72,0,1)" }}
      >
        {/* Drag handle — mobile only */}
        <div className="flex justify-center pt-2.5 pb-0.5 md:hidden">
          <div className="w-9 h-1 rounded-full bg-muted-foreground/25" />
        </div>

        {/* ── Header ── */}
        <div className="sticky top-0 left-0 right-0 z-10 flex items-center justify-between px-4 py-2.5 md:py-3 bg-background/95 backdrop-blur-md border-b border-border">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-brand-500 flex items-center justify-center shadow-lg shadow-brand-500/25 shrink-0">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-foreground leading-tight">
                Passpoint AI
              </h2>
              <p className="text-[10px] text-muted-foreground leading-tight">
                Ask anything about Passpoint
              </p>
            </div>
          </div>
          <div className="flex items-center gap-0.5">
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="hidden md:flex p-2 rounded-lg hover:bg-muted text-muted-foreground transition-colors"
              title={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
            >
              {isFullscreen ? (
                <Minimize2 className="w-4 h-4" />
              ) : (
                <Maximize2 className="w-4 h-4" />
              )}
            </button>
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="p-2 rounded-lg hover:bg-muted text-muted-foreground transition-colors"
              title="Conversation history"
              aria-label="Conversation history"
            >
              <MessageSquare className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setActiveConversationId(null);
                setShowHistory(false);
              }}
              className="p-2 rounded-lg hover:bg-muted text-muted-foreground transition-colors"
              title="New chat"
              aria-label="New chat"
            >
              <Plus className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-muted text-muted-foreground transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ── History sidebar ── */}
        {showHistory && (
          <div className="absolute top-0 left-0 right-0 bottom-0 w-full md:w-64 md:right-auto z-20 bg-muted border-r border-border overflow-y-auto">
            <div className="p-3">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                  Recent Chats
                </p>
                <button
                  onClick={() => setShowHistory(false)}
                  className="p-1.5 rounded-lg hover:bg-accent text-muted-foreground transition-colors"
                  aria-label="Close history"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              {conversations.length === 0 && (
                <p className="text-xs text-muted-foreground italic">
                  No conversations yet
                </p>
              )}
              {conversations.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => {
                    setActiveConversationId(conv.id);
                    setShowHistory(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs mb-1 transition-colors ${
                    conv.id === activeConversationId
                      ? "bg-brand-100 dark:bg-brand-500/10 text-brand-700 dark:text-brand-300"
                      : "hover:bg-accent text-foreground"
                  }`}
                >
                  <span className="block truncate font-medium">
                    {conv.title}
                  </span>
                  <span className="block text-[10px] text-muted-foreground mt-0.5">
                    {conv.messages.length} messages
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── Main Content ── */}
        <div className="flex flex-col w-full flex-1 min-h-0">
          {/* Messages area */}
          <div
            className={`flex-1 overflow-y-auto overscroll-contain py-4 space-y-4 ${isFullscreen ? "px-4 md:px-12 lg:px-16" : "px-4"}`}
          >
            {!activeConversation || activeConversation.messages.length === 0 ? (
              /* Welcome state */
              <div
                className={`flex flex-col items-center justify-center h-full text-center ${isFullscreen ? "max-w-lg mx-auto" : ""}`}
              >
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-brand-500 flex items-center justify-center shadow-xl shadow-brand-500/25 mb-4">
                  <Sparkles className="w-6 h-6 md:w-7 md:h-7 text-white" />
                </div>
                <h3 className="text-sm md:text-base font-semibold text-foreground mb-1">
                  What are you trying to do?
                </h3>
                <p className="text-xs text-muted-foreground mb-5">
                  Ask anything about Passpoint
                </p>
                <div className="w-full space-y-2">
                  {SUGGESTED_PROMPTS.map((prompt, i) => (
                    <button
                      key={i}
                      onClick={() => handleSend(prompt)}
                      className="w-full text-left px-4 py-3.5 rounded-xl border border-border hover:border-brand-300 dark:hover:border-brand-500/30 hover:bg-brand-50 dark:hover:bg-brand-500/5 text-xs text-foreground transition-all active:scale-[0.98]"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              /* Messages */
              activeConversation.messages.map((msg) => (
                <ChatMessageBubble
                  key={msg.id}
                  message={msg}
                  isFullscreen={isFullscreen}
                  onRetry={() => handleRetry(msg)}
                  onCompare={() => handleCompare(msg)}
                />
              ))
            )}
            {isLoading && (
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-brand-500 flex items-center justify-center shrink-0">
                  <Bot className="w-3.5 h-3.5 text-white" />
                </div>
                <div className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-muted">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-brand-500" />
                  <span className="text-xs text-muted-foreground">
                    Thinking...
                  </span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* ── Input area ── */}
          <div
            className="p-3 md:p-4 border-t border-border bg-background/80 backdrop-blur-md"
            style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom, 0px))" }}
          >
            {/* Model selector */}
            <div className="relative mb-2.5">
              <button
                onClick={() => setShowModelDropdown(!showModelDropdown)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-muted text-xs text-muted-foreground hover:bg-accent transition-colors"
              >
                <span>
                  {(() => {
                    const opt = MODEL_OPTIONS.find(
                      (m) => m.value === selectedModel,
                    );
                    return opt ? <opt.Logo size={14} /> : null;
                  })()}
                </span>
                <span>
                  {MODEL_OPTIONS.find((m) => m.value === selectedModel)?.label}
                </span>
                <ChevronDown className="w-3 h-3" />
              </button>
              {showModelDropdown && (
                <div className="absolute bottom-full left-0 mb-1 w-48 bg-popover rounded-xl shadow-xl border border-border overflow-hidden z-30">
                  {MODEL_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => {
                        setSelectedModel(opt.value);
                        setShowModelDropdown(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center gap-2 transition-colors ${
                        selectedModel === opt.value
                          ? "bg-brand-50 dark:bg-brand-500/10 text-brand-700 dark:text-brand-300"
                          : "hover:bg-muted text-foreground"
                      }`}
                    >
                      <opt.Logo size={14} />
                      <span>{opt.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Input row */}
            <div className="flex items-end gap-2">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about Passpoint APIs..."
                rows={1}
                className="flex-1 resize-none bg-muted rounded-xl px-4 py-3 text-sm text-foreground placeholder-muted-foreground border border-transparent focus:border-brand-300 dark:focus:border-brand-500/30 focus:outline-none focus:ring-0 transition-colors max-h-32"
                style={{ minHeight: "44px" }}
                onInput={(e) => {
                  const el = e.target as HTMLTextAreaElement;
                  el.style.height = "auto";
                  el.style.height = Math.min(el.scrollHeight, 128) + "px";
                }}
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim() || isLoading}
                className="w-11 h-11 rounded-xl bg-brand-500 flex items-center justify-center text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-brand-600 active:scale-95 hover:shadow-lg hover:shadow-brand-500/25 transition-all shrink-0"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>

            <p className="text-[10px] text-muted-foreground mt-2 text-center hidden md:block">
              Highlight any text on the page for instant answers
            </p>
          </div>
        </div>

        {/* ── Comparison Modal ── */}
        {showComparison && (
          <ComparisonView
            prompt={comparisonPrompt}
            context={
              activeConversation?.messages.map((m) => ({
                role: m.role,
                content: m.content,
              })) || []
            }
            onClose={() => setShowComparison(false)}
          />
        )}
      </div>

      <style>{`
        @keyframes slideUpSheet {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        @media (min-width: 768px) {
          @keyframes slideUpSheet {
            from { transform: translateY(16px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
        }
      `}</style>
    </div>
  );
}

function cleanResponseMarkdown(content: string): string {
  // Strip inline backtick code spans — replace `value` with just value
  return content.replace(/`([^`\n]+)`/g, "$1");
}

/* ── Message Bubble Sub-Component ── */
function ChatMessageBubble({
  message,
  isFullscreen,
  onRetry,
  onCompare,
}: {
  message: Message;
  isFullscreen?: boolean;
  onRetry: () => void;
  onCompare: () => void;
}) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (message.role === "user") {
    return (
      <div className="flex items-start gap-2 justify-end">
        <div
          className={`px-3.5 py-2.5 rounded-2xl rounded-tr-md bg-brand-500 text-white text-sm leading-relaxed ${isFullscreen ? "max-w-[80%] md:max-w-[60%]" : "max-w-[88%]"}`}
        >
          {message.content}
        </div>
        <div className="w-7 h-7 rounded-lg bg-muted flex items-center justify-center shrink-0 mt-0.5">
          <User className="w-3.5 h-3.5 text-muted-foreground" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-2">
      <div className="w-7 h-7 rounded-lg bg-brand-500 flex items-center justify-center shrink-0 mt-0.5">
        <Bot className="w-3.5 h-3.5 text-white" />
      </div>
      <div
        className={`space-y-2 min-w-0 ${isFullscreen ? "max-w-[95%]" : "max-w-[calc(100%-36px)]"}`}
      >
        <div className="px-3.5 py-3 rounded-2xl rounded-tl-md bg-muted text-sm text-foreground prose prose-sm dark:prose-invert max-w-none overflow-hidden [&_h1]:text-sm [&_h1]:font-bold [&_h1]:mb-1 [&_h1]:mt-2 [&_h2]:text-sm [&_h2]:font-semibold [&_h2]:mb-1 [&_h2]:mt-2 [&_h3]:text-xs [&_h3]:font-semibold [&_h3]:mb-0.5 [&_h3]:mt-1.5 [&_h4]:text-xs [&_h4]:font-medium [&_p]:my-1 [&_p]:leading-relaxed [&_ul]:my-1 [&_ol]:my-1 [&_li]:my-0.5 [&_pre]:bg-codeblock-bg [&_pre]:rounded-xl [&_pre]:my-2 [&_pre]:overflow-x-auto [&_pre]:max-w-full [&_code]:text-xs [&_code]:wrap-break-word">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              a({ href, children, ...props }) {
                return (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    {...props}
                  >
                    {children}
                  </a>
                );
              },
              code({ className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "");
                const isBlock = String(children).includes("\n");
                return match || isBlock ? (
                  <SyntaxHighlighter
                    style={oneDark}
                    language={match?.[1] || "text"}
                    PreTag="div"
                    customStyle={{
                      borderRadius: "12px",
                      fontSize: "12px",
                      margin: "8px 0",
                    }}
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                ) : (
                  <code
                    className="px-1.5 py-0.5 bg-accent rounded-md text-xs font-mono"
                    {...props}
                  >
                    {children}
                  </code>
                );
              },
            }}
          >
            {cleanResponseMarkdown(message.content)}
          </ReactMarkdown>
        </div>

        {/* Footer: metadata + actions */}
        {message.metadata && (
          <div className="flex flex-col gap-2">
            {/* Row: badge + action buttons */}
            <div className="flex items-center gap-2 flex-wrap">
              {message.metadata.model_used && message.metadata.model_used !== "none" && (
                <ModelMetadataBadge metadata={message.metadata} />
              )}
              <div className="flex items-center gap-0.5 ml-auto">
                <button
                  onClick={handleCopy}
                  className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground transition-colors"
                  title="Copy response"
                  aria-label="Copy response"
                >
                  {copied ? (
                    <Check className="w-3.5 h-3.5 text-green-500" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
                <button
                  onClick={onRetry}
                  className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground transition-colors"
                  title="Retry"
                  aria-label="Retry"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={onCompare}
                  className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground transition-colors"
                  title="Compare models"
                  aria-label="Compare models"
                >
                  <GitCompare className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Sources */}
            {(() => {
              const validSources = (message.metadata.sources ?? []).filter(
                (src) => isValidSourcePath(src.path),
              );
              return validSources.length > 0 ? (
                <div className="flex items-start gap-1.5 flex-wrap">
                  <div className="flex items-center gap-1 text-[10px] text-muted-foreground shrink-0 mt-0.5">
                    <FileText className="w-3 h-3" />
                    <span className="font-medium">Sources</span>
                  </div>
                  {validSources.map((src, i) => (
                    <a
                      key={i}
                      href={src.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-2 py-0.5 rounded-md bg-brand-50 dark:bg-brand-500/10 text-brand-700 dark:text-brand-300 text-[10px] font-medium hover:bg-brand-100 dark:hover:bg-brand-500/20 transition-colors"
                      title={`${src.section}: ${src.title}`}
                    >
                      {src.title}
                    </a>
                  ))}
                </div>
              ) : null;
            })()}
          </div>
        )}
      </div>
    </div>
  );
}
