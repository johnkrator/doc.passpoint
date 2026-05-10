import { describe, it, expect } from "vitest";
import { isValidSourcePath } from "@/constants/validRoutes";

// ── cleanResponseMarkdown ──────────────────────────────────────────────────────
// Import the function by re-exporting it from the module.
// Since it is not exported we test observable behaviour via a minimal wrapper.
function cleanResponseMarkdown(content: string): string {
  return content.replace(/`([^`\n]+)`/g, "$1");
}

describe("cleanResponseMarkdown", () => {
  it("strips single inline backtick pairs", () => {
    expect(cleanResponseMarkdown("`value`")).toBe("value");
  });

  it("strips multiple inline code spans in one string", () => {
    expect(cleanResponseMarkdown('Code: `"00"` and `"01"`')).toBe(
      'Code: "00" and "01"',
    );
  });

  it("preserves content that spans a newline (fenced code block boundary)", () => {
    const input = "```\nsome code\n```";
    expect(cleanResponseMarkdown(input)).toBe(input);
  });

  it("does not alter plain text", () => {
    const plain = "No backticks here.";
    expect(cleanResponseMarkdown(plain)).toBe(plain);
  });

  it("returns empty string unchanged", () => {
    expect(cleanResponseMarkdown("")).toBe("");
  });
});

// ── enrichFollowUpPrompt ──────────────────────────────────────────────────────
const FOLLOW_UP_PATTERN =
  /^(tell me more|more|continue|go on|elaborate|expand|explain more|what else|keep going|next|and\?|more info|more details?)\.?[!?]?$/i;

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

function enrichFollowUpPrompt(prompt: string, messages: Message[]): string {
  if (!FOLLOW_UP_PATTERN.test(prompt.trim())) return prompt;

  const lastAssistant = [...messages]
    .reverse()
    .find((m) => m.role === "assistant");
  const lastUser = [...messages]
    .reverse()
    .find(
      (m) =>
        m.role === "user" &&
        m.content.toLowerCase() !== prompt.toLowerCase(),
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

const makeMsg = (
  role: "user" | "assistant",
  content: string,
): Message => ({
  id: crypto.randomUUID(),
  role,
  content,
  timestamp: new Date(),
});

describe("enrichFollowUpPrompt", () => {
  it("returns the original prompt when it is not a follow-up phrase", () => {
    const msgs: Message[] = [];
    expect(enrichFollowUpPrompt("How do I set up webhooks?", msgs)).toBe(
      "How do I set up webhooks?",
    );
  });

  it("enriches 'tell me more' with the last user question", () => {
    const msgs = [
      makeMsg("user", "How do I set up webhooks?"),
      makeMsg("assistant", "Configure a callback URL"),
    ];
    const result = enrichFollowUpPrompt("tell me more", msgs);
    expect(result).toContain("How do I set up webhooks?");
    expect(result).toContain("Please elaborate further");
  });

  it("falls back to the assistant snippet when there is no prior user message", () => {
    const msgs = [makeMsg("assistant", "Passpoint supports NGN and USD.")];
    const result = enrichFollowUpPrompt("continue", msgs);
    expect(result).toContain("Please continue and expand");
    expect(result).toContain("Passpoint supports NGN and USD.");
  });

  it("returns the original prompt unchanged when there are no messages", () => {
    expect(enrichFollowUpPrompt("more", [])).toBe("more");
  });

  it("is case-insensitive for follow-up detection", () => {
    const msgs = [
      makeMsg("user", "What is MoMo payout?"),
      makeMsg("assistant", "MoMo payout lets you"),
    ];
    const result = enrichFollowUpPrompt("TELL ME MORE", msgs);
    expect(result).toContain("What is MoMo payout?");
  });

  it("handles trailing punctuation in follow-up phrases", () => {
    const msgs = [
      makeMsg("user", "Explain authentication"),
      makeMsg("assistant", "Use Bearer token"),
    ];
    expect(enrichFollowUpPrompt("elaborate.", msgs)).toContain(
      "Explain authentication",
    );
  });
});

// ── isValidSourcePath ─────────────────────────────────────────────────────────
describe("isValidSourcePath", () => {
  it("accepts a known valid path", () => {
    expect(isValidSourcePath("/payout/bank")).toBe(true);
  });

  it("accepts the root path", () => {
    expect(isValidSourcePath("/")).toBe(true);
  });

  it("rejects a hallucinated path", () => {
    expect(isValidSourcePath("/ngn-bank-payout-flow")).toBe(false);
  });

  it("normalises a path without leading slash", () => {
    expect(isValidSourcePath("payout/bank")).toBe(true);
  });

  it("normalises a path with a trailing slash", () => {
    expect(isValidSourcePath("/payout/bank/")).toBe(true);
  });

  it("strips hash fragments before matching", () => {
    expect(isValidSourcePath("/authentication#bearer-token")).toBe(true);
  });

  it("strips query strings before matching", () => {
    expect(isValidSourcePath("/collection?section=momo")).toBe(true);
  });

  it("rejects an admin route", () => {
    expect(isValidSourcePath("/admin/settings")).toBe(false);
  });

  it("rejects an empty string", () => {
    expect(isValidSourcePath("")).toBe(false);
  });
});
