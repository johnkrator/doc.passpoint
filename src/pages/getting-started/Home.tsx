import { useState, useEffect, useCallback, useRef } from "react";
import type { ReactNode, CSSProperties } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Code2,
  Copy,
  CreditCard,
  Globe,
  Send,
  Wallet,
} from "lucide-react";
import logoSrc from "@/assets/new-logo.png";

// ─── Utilities ────────────────────────────────────────────────────────────────

type CountUpProps = {
  to: number;
  decimals?: number;
  duration?: number;
  locale?: boolean;
};

const CountUp = ({
  to,
  decimals = 0,
  duration = 1600,
  locale = false,
}: CountUpProps): ReactNode => {
  const [val, setVal] = useState<number>(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const start = performance.now();
    const tick = (now: number): void => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(to * eased);
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [to, duration]);

  if (locale) return <>{Math.round(val).toLocaleString()}</>;
  return <>{val.toFixed(decimals)}</>;
};

// ─── Types & constants ───────────────────────────────────────────────────────

const CODE_TABS = ["curl", "node", "python", "go"] as const;
type TabKey = (typeof CODE_TABS)[number];

type Method = "GET" | "POST" | "DELETE";

type Endpoint = { method: Method; path: string };

type ProductCard = {
  index: string;
  icon: ReactNode;
  title: string;
  blurb: string;
  href: string;
  endpoints?: Endpoint[];
};

type StepItem = { num: string; title: string; body: string };

type Testimonial = {
  initials: string;
  quote: string;
  name: string;
  role: string;
};

type FaqItem = { id: string; question: string; answer: string };

const PRODUCT_CARDS: ProductCard[] = [
  {
    index: "01",
    icon: <Send className="h-4 w-4" strokeWidth={1.6} />,
    title: "Collections",
    blurb:
      "Accept payments via bank transfer, mobile money, card and reserved virtual accounts in 50+ markets.",
    href: "/collection",
    endpoints: [
      { method: "POST", path: "/collections" },
      { method: "GET", path: "/collections/{id}" },
      { method: "POST", path: "/collections/{id}/refund" },
    ],
  },
  {
    index: "02",
    icon: <ArrowRight className="h-4 w-4" strokeWidth={1.6} />,
    title: "Payouts & Transfers",
    blurb:
      "Send to bank accounts, wallets and cards across 50+ countries with same-day settlement.",
    href: "/payout",
  },
  {
    index: "03",
    icon: <Wallet className="h-4 w-4" strokeWidth={1.6} />,
    title: "Wallet Management",
    blurb:
      "Multi-currency wallets with per-customer ledgers, holds and atomic balance moves.",
    href: "/wallet",
  },
  {
    index: "04",
    icon: <CreditCard className="h-4 w-4" strokeWidth={1.6} />,
    title: "Virtual Cards",
    blurb:
      "Issue branded debit and credit cards on demand with programmable spend controls.",
    href: "/virtual-card-v2",
  },
  {
    index: "05",
    icon: <Globe className="h-4 w-4" strokeWidth={1.6} />,
    title: "Cross-Border",
    blurb:
      "Move money across 30+ corridors with real-time FX, smart routing and compliance.",
    href: "/transfer",
  },
  {
    index: "06",
    icon: <Code2 className="h-4 w-4" strokeWidth={1.6} />,
    title: "Sandbox",
    blurb:
      "A full mirror of production with deterministic test fixtures and replayable webhooks.",
    href: "/sandbox-playground",
  },
];

const STEPS: StepItem[] = [
  {
    num: "01",
    title: "Create your account",
    body: "Sign up, get instant sandbox API keys, verify your email. No sales calls required.",
  },
  {
    num: "02",
    title: "Connect credentials",
    body: "Drop the secret into your environment, scaffold a webhook listener and you are live in sandbox.",
  },
  {
    num: "03",
    title: "Test in sandbox",
    body: "Replay deterministic fixtures for every payment state — success, retry, decline, refund.",
  },
  {
    num: "04",
    title: "Go live",
    body: "Submit KYB, swap to live keys and start moving real money. Same code, different prefix.",
  },
];

const TESTIMONIALS: Testimonial[] = [
  {
    initials: "GB",
    quote:
      "Being able to collect and pay out across different payment methods from one place has been a real shift for us. Our customers can pay how they want, and we can disburse instantly without jumping through multiple systems.",
    name: "George Barnat",
    role: "CEO · Quotex",
  },
  {
    initials: "FA",
    quote:
      "What stood out with Passpoint was how quickly we went live across markets we would normally approach one by one. One integration gave us access to multiple rails, currencies and compliance layers without rebuilding from scratch.",
    name: "Fabrice Amalaman",
    role: "CEO · Payqin",
  },
];

type CoverageColumn = {
  index: string;
  eyebrow: string;
  headline: string;
  italic: string;
  items: ReadonlyArray<{ primary: string; secondary?: string }>;
};

const COVERAGE_COLUMNS: ReadonlyArray<CoverageColumn> = [
  {
    index: "01",
    eyebrow: "Currencies",
    headline: "Twenty",
    italic: "currencies.",
    items: [
      { primary: "NGN", secondary: "Nigerian Naira" },
      { primary: "USD", secondary: "United States Dollar" },
      { primary: "GBP", secondary: "Pound Sterling" },
      { primary: "EUR", secondary: "Euro" },
      { primary: "CNY", secondary: "Chinese Yuan" },
      { primary: "KES · GHS · UGX", secondary: "East & West Africa" },
      { primary: "XOF · XAF · ZAR", secondary: "Francophone & Southern" },
    ],
  },
  {
    index: "02",
    eyebrow: "Rails",
    headline: "Eight payment",
    italic: "rails.",
    items: [
      { primary: "Bank transfer", secondary: "Local & SWIFT" },
      { primary: "Mobile money", secondary: "MTN, Airtel, M-Pesa, +" },
      { primary: "Reserved virtual accounts", secondary: "NGN & USD" },
      { primary: "Open banking", secondary: "EU & UK collections" },
      { primary: "ACH · Wire · RTP", secondary: "USD payouts" },
      { primary: "FedNow", secondary: "Instant USD" },
      { primary: "Card issuance", secondary: "USD virtual cards" },
    ],
  },
  {
    index: "03",
    eyebrow: "Compliance",
    headline: "Audited",
    italic: "by design.",
    items: [
      { primary: "PCI DSS Level 1", secondary: "Certified processor" },
      { primary: "SOC 2 Type II", secondary: "Annual attestation" },
      { primary: "ISO 27001", secondary: "Information security" },
      { primary: "GDPR", secondary: "EU data residency" },
      { primary: "CBN licensed", secondary: "Switching & processing" },
      { primary: "AML / KYC / KYB", secondary: "Tier-1 vendor stack" },
      { primary: "HMAC-SHA512 webhooks", secondary: "Signed at the edge" },
    ],
  },
];

const FAQ_ITEMS: FaqItem[] = [
  {
    id: "sandbox",
    question: "Is there a sandbox environment for testing?",
    answer:
      "Yes. Passpoint provides a full sandbox environment that mirrors production. Use sandbox API keys to test all endpoints: collections, payouts, wallets, and virtual cards without touching real funds.",
  },
  {
    id: "auth",
    question: "How does authentication work?",
    answer:
      "All API requests use your Merchant ID and API key as a Bearer token in the Authorization header. Keys are scoped separately for sandbox and production environments.",
  },
  {
    id: "currencies",
    question: "What currencies and countries are supported?",
    answer:
      "Passpoint supports NGN, USD, GBP, EUR, CNY, and multiple African MoMo currencies. Coverage spans Nigeria, across Africa, the US, UK, and EU through bank and mobile money rails.",
  },
  {
    id: "webhooks",
    question: "How do I receive payment notifications?",
    answer:
      "Configure a global callback URL and secret from your dashboard. Passpoint sends signed webhook events for every payment state change: pending, successful, failed, and reversed.\n\nThe callback secret is a shared key you set between your system and Passpoint. When a webhook is sent to your callback URL, Passpoint uses your secret to hash the payload and includes the result in the request header as a signature. Your server re-hashes the payload with the same secret and compares it against the signature if they match, the callback is genuine. Without a secret, no hash is sent and you lose that extra layer of verification.\n\nHow does SHA-512 webhook signature verification work?\n\nWhen Passpoint sends a webhook to your callback URL, it includes an x-passpoint-signature header containing a SHA-512 HMAC hash of the raw request body, signed with your callback secret.\n\nTo verify it on your server: concatenate the raw request body as a string, compute HMAC-SHA512 using your callback secret as the key, then compare your computed hash against the value in the x-passpoint-signature header. If they match, the payload is genuine and untampered. Always use a constant-time comparison to prevent timing attacks, and reject any request where the signature is absent or mismatched.",
  },
  {
    id: "virtualcards",
    question: "What can I do with virtual cards?",
    answer:
      "Issue USD virtual cards for your customers or your own business use cases. Fund, freeze, unfreeze, withdraw, and terminate cards programmatically with full real-time authorization decision support.",
  },
  {
    id: "channel-headers",
    question:
      "What are x-channel-id and x-channel-code, and what values should I use?",
    answer:
      "These headers identify the integration channel making the request and must be included on every authenticated API call alongside your x-merchant-id.\n\n• x-channel-id: 3 · x-channel-code: legacy-api-user — use for legacy or direct API access. The payment status report and transfer status endpoints specifically require channel 3.\n\nUsing the wrong channel for an endpoint will result in an authentication or routing error.",
  },
  {
    id: "response-codes",
    question: "What do the Passpoint response codes mean?",
    answer:
      "Every API response includes a responseCode field. The key codes are:\n\n• 00 — Success. The request was processed successfully.\n• 01 — Pending. The transaction has been received and is still processing.\n• 09 — Duplicate transaction reference. The clientReference you sent has already been used.\n• 25 — Transaction not found. The reference or ID does not match any record.\n• 31 — Invalid parameter. A required field is missing or has an invalid value.\n• 96 — System error. A temporary issue on Passpoint's end — safe to retry with exponential backoff.\n\nAlways check responseCode first. A 200 HTTP status does not guarantee a successful transaction.",
  },
  {
    id: "idempotency",
    question:
      "How do I safely retry failed requests without creating duplicate transactions?",
    answer:
      "Pass a unique clientReference in every payout, collection, or transfer request. Passpoint uses this value as an idempotency key — if you retry a request with the same clientReference, the API returns the original response instead of creating a second transaction. Use a reference that is unique per operation (e.g. a UUID or your internal order ID). If you receive a 96 system error or a network timeout with no response, wait and retry with the identical clientReference so no double-charge occurs.",
  },
  {
    id: "rate-limits",
    question: "Are there API rate limits I need to know about?",
    answer:
      "Yes. Passpoint enforces per-merchant rate limits to ensure platform stability. If you exceed the limit, you will receive a 429 Too Many Requests response. Implement exponential backoff with jitter when retrying: start with a 1-second delay, double on each failure up to a maximum of 32 seconds. Cache data that does not change frequently — such as bank lists, currency lists, and wallet balances — rather than polling the API on every request. For high-throughput use cases, contact Passpoint support to discuss elevated limits.",
  },
];

const REF_IDS: readonly string[] = [
  "a1f2c9",
  "8h21k0",
  "b73e1d",
  "c9a4f7",
  "d2k88p",
  "4nh02e",
];

// ─── Reusable bits ────────────────────────────────────────────────────────────

type EyebrowProps = { children: ReactNode };

const Eyebrow = ({ children }: EyebrowProps): ReactNode => (
  <div
    className="inline-flex items-center gap-2.5 mb-6"
    style={{ color: "var(--ink-mute)" }}
  >
    <span
      className="inline-block w-1.5 h-1.5 rounded-full"
      style={{
        background: "var(--clay)",
        animation: "clay-beep 2.6s ease-out infinite",
      }}
      aria-hidden="true"
    />
    <span className="font-['JetBrains_Mono',monospace] text-[11px] uppercase tracking-[0.22em]">
      {children}
    </span>
  </div>
);

type SerifEmProps = { children: ReactNode };

const SerifEm = ({ children }: SerifEmProps): ReactNode => (
  <em
    className="font-['Fraunces',serif] italic font-normal"
    style={{ color: "var(--clay)" }}
  >
    {children}
  </em>
);

type MethodBadgeProps = { method: Method };

const MethodBadge = ({ method }: MethodBadgeProps): ReactNode => {
  const tone: Record<Method, CSSProperties> = {
    GET: { color: "var(--moss)", borderColor: "var(--rule)" },
    POST: { color: "var(--clay)", borderColor: "var(--rule)" },
    DELETE: { color: "var(--clay)", borderColor: "var(--rule)" },
  };
  return (
    <span
      className="font-['JetBrains_Mono',monospace] text-[10px] font-medium px-1.5 py-0.5 rounded border tracking-[0.06em]"
      style={tone[method]}
    >
      {method}
    </span>
  );
};

// ─── Editorial code card ──────────────────────────────────────────────────────

const codeStyles: Record<string, CSSProperties> = {
  ln: {
    color: "oklch(0.62 0.012 75)",
    width: 36,
    flexShrink: 0,
    textAlign: "right",
    paddingRight: 14,
    userSelect: "none",
    fontSize: 11,
  },
  fg: { color: "var(--ink)" },
  k: { color: "oklch(0.45 0.18 30)", fontWeight: 500 },
  s: { color: "oklch(0.45 0.10 145)" },
  n: { color: "oklch(0.50 0.15 60)" },
  c: { color: "oklch(0.58 0.012 75)", fontStyle: "italic" },
  p: { color: "oklch(0.58 0.012 75)" },
  v: { color: "var(--ink-soft)" },
  m: { color: "oklch(0.45 0.15 290)" },
  pun: { color: "oklch(0.55 0.012 75)" },
  fn: { color: "oklch(0.50 0.13 60)" },
};

type CodeLineProps = { n: number; children: ReactNode };

const CodeLine = ({ n, children }: CodeLineProps): ReactNode => (
  <div className="flex items-start group">
    <span style={codeStyles.ln} className="font-['JetBrains_Mono',monospace]">
      {n}
    </span>
    <span
      style={codeStyles.fg}
      className="font-['JetBrains_Mono',monospace] text-[12.5px] leading-[1.75] whitespace-pre"
    >
      {children}
    </span>
  </div>
);

type CodeProps = { refId: string; refVisible: boolean };

const blinkCursor: CSSProperties = {
  display: "inline-block",
  width: 6,
  height: "1em",
  background: "var(--clay)",
  verticalAlign: "text-bottom",
  marginLeft: 2,
  animation: "cursor-blink 1.1s step-end infinite",
  transform: "translateY(2px)",
  borderRadius: 1,
};

const CurlCode = ({ refId, refVisible }: CodeProps): ReactNode => (
  <>
    <CodeLine n={1}>
      <span style={codeStyles.c}># Initiate a cross-border collection</span>
    </CodeLine>
    <CodeLine n={2}>
      <span style={codeStyles.k}>curl</span>
      <span style={codeStyles.p}> -X </span>
      <span style={codeStyles.m}>POST</span>
      <span style={codeStyles.s}> https://api.passpoint.dev/v1/collections</span>
      {" \\"}
    </CodeLine>
    <CodeLine n={3}>
      {"  "}
      <span style={codeStyles.p}>-H </span>
      <span style={codeStyles.s}>"Authorization: Bearer pk_live_••••EZHF"</span>
      {" \\"}
    </CodeLine>
    <CodeLine n={4}>
      {"  "}
      <span style={codeStyles.p}>-d </span>
      <span style={codeStyles.pun}>&apos;{"{"}</span>
    </CodeLine>
    <CodeLine n={5}>
      {"    "}
      <span style={codeStyles.v}>"amount"</span>
      {":      "}
      <span style={codeStyles.n}>1240.00</span>,
    </CodeLine>
    <CodeLine n={6}>
      {"    "}
      <span style={codeStyles.v}>"source"</span>
      {":      "}
      <span style={codeStyles.s}>"USD"</span>,
    </CodeLine>
    <CodeLine n={7}>
      {"    "}
      <span style={codeStyles.v}>"destination"</span>
      {":  "}
      <span style={codeStyles.s}>"NGN"</span>,
    </CodeLine>
    <CodeLine n={8}>
      {"    "}
      <span style={codeStyles.v}>"channel"</span>
      {":     "}
      <span style={codeStyles.s}>"bank_transfer"</span>,
    </CodeLine>
    <CodeLine n={9}>
      {"    "}
      <span style={codeStyles.v}>"reference"</span>
      {":   "}
      <span style={codeStyles.s}>"ord_</span>
      <span
        style={{
          ...codeStyles.s,
          opacity: refVisible ? 1 : 0,
          transition: "opacity 0.3s",
        }}
      >
        {refId}
      </span>
      <span style={codeStyles.s}>"</span>
      <span style={blinkCursor} aria-hidden="true" />
    </CodeLine>
    <CodeLine n={10}>
      {"  "}
      <span style={codeStyles.pun}>{"}"}&apos;</span>
    </CodeLine>
  </>
);

const NodeCode = ({ refId, refVisible }: CodeProps): ReactNode => (
  <>
    <CodeLine n={1}>
      <span style={codeStyles.k}>import </span>
      <span style={codeStyles.v}>Passpoint</span>
      <span style={codeStyles.k}> from </span>
      <span style={codeStyles.s}>"@passpoint/sdk"</span>
      <span style={codeStyles.pun}>;</span>
    </CodeLine>
    <CodeLine n={2}>{""}</CodeLine>
    <CodeLine n={3}>
      <span style={codeStyles.k}>const </span>
      <span style={codeStyles.v}>client</span>
      {" = new "}
      <span style={codeStyles.fn}>Passpoint</span>
      <span style={codeStyles.pun}>({"{ "}</span>
      <span style={codeStyles.v}>apiKey</span>
      <span style={codeStyles.pun}>: </span>
      <span style={codeStyles.m}>process.env</span>
      <span style={codeStyles.pun}>.</span>
      <span style={codeStyles.v}>PP_KEY</span>
      <span style={codeStyles.pun}> {"})"};</span>
    </CodeLine>
    <CodeLine n={4}>{""}</CodeLine>
    <CodeLine n={5}>
      <span style={codeStyles.k}>const </span>
      <span style={codeStyles.v}>charge</span>
      {" = "}
      <span style={codeStyles.k}>await </span>
      <span style={codeStyles.v}>client</span>
      <span style={codeStyles.pun}>.</span>
      <span style={codeStyles.v}>collections</span>
      <span style={codeStyles.pun}>.</span>
      <span style={codeStyles.fn}>create</span>
      <span style={codeStyles.pun}>({"{"}</span>
    </CodeLine>
    <CodeLine n={6}>
      {"  "}
      <span style={codeStyles.v}>amount</span>
      {":      "}
      <span style={codeStyles.n}>1240.00</span>,
    </CodeLine>
    <CodeLine n={7}>
      {"  "}
      <span style={codeStyles.v}>source</span>
      {":      "}
      <span style={codeStyles.s}>"USD"</span>,
    </CodeLine>
    <CodeLine n={8}>
      {"  "}
      <span style={codeStyles.v}>destination</span>
      {":  "}
      <span style={codeStyles.s}>"NGN"</span>,
    </CodeLine>
    <CodeLine n={9}>
      {"  "}
      <span style={codeStyles.v}>reference</span>
      {":   "}
      <span style={codeStyles.s}>"ord_</span>
      <span
        style={{
          ...codeStyles.s,
          opacity: refVisible ? 1 : 0,
          transition: "opacity 0.3s",
        }}
      >
        {refId}
      </span>
      <span style={codeStyles.s}>"</span>
      <span style={blinkCursor} aria-hidden="true" />
    </CodeLine>
    <CodeLine n={10}>
      <span style={codeStyles.pun}>{"});"}</span>
    </CodeLine>
  </>
);

const PythonCode = ({ refId, refVisible }: CodeProps): ReactNode => (
  <>
    <CodeLine n={1}>
      <span style={codeStyles.k}>from </span>
      <span style={codeStyles.v}>passpoint </span>
      <span style={codeStyles.k}>import </span>
      <span style={codeStyles.v}>Client</span>
    </CodeLine>
    <CodeLine n={2}>{""}</CodeLine>
    <CodeLine n={3}>
      <span style={codeStyles.v}>client</span>
      {" = "}
      <span style={codeStyles.fn}>Client</span>
      <span style={codeStyles.pun}>(</span>
      <span style={codeStyles.v}>api_key</span>
      <span style={codeStyles.pun}>=</span>
      <span style={codeStyles.v}>os</span>
      <span style={codeStyles.pun}>.</span>
      <span style={codeStyles.fn}>environ</span>
      <span style={codeStyles.pun}>[</span>
      <span style={codeStyles.s}>"PP_KEY"</span>
      <span style={codeStyles.pun}>])</span>
    </CodeLine>
    <CodeLine n={4}>{""}</CodeLine>
    <CodeLine n={5}>
      <span style={codeStyles.v}>charge</span>
      {" = "}
      <span style={codeStyles.v}>client</span>
      <span style={codeStyles.pun}>.</span>
      <span style={codeStyles.v}>collections</span>
      <span style={codeStyles.pun}>.</span>
      <span style={codeStyles.fn}>create</span>
      <span style={codeStyles.pun}>(</span>
    </CodeLine>
    <CodeLine n={6}>
      {"    "}
      <span style={codeStyles.v}>amount</span>
      <span style={codeStyles.pun}>=</span>
      <span style={codeStyles.n}>1240.00</span>,
    </CodeLine>
    <CodeLine n={7}>
      {"    "}
      <span style={codeStyles.v}>source</span>
      <span style={codeStyles.pun}>=</span>
      <span style={codeStyles.s}>"USD"</span>,
    </CodeLine>
    <CodeLine n={8}>
      {"    "}
      <span style={codeStyles.v}>destination</span>
      <span style={codeStyles.pun}>=</span>
      <span style={codeStyles.s}>"NGN"</span>,
    </CodeLine>
    <CodeLine n={9}>
      {"    "}
      <span style={codeStyles.v}>reference</span>
      <span style={codeStyles.pun}>=</span>
      <span style={codeStyles.s}>"ord_</span>
      <span
        style={{
          ...codeStyles.s,
          opacity: refVisible ? 1 : 0,
          transition: "opacity 0.3s",
        }}
      >
        {refId}
      </span>
      <span style={codeStyles.s}>"</span>
      <span style={blinkCursor} aria-hidden="true" />
    </CodeLine>
    <CodeLine n={10}>
      <span style={codeStyles.pun}>)</span>
    </CodeLine>
  </>
);

const GoCode = ({ refId, refVisible }: CodeProps): ReactNode => (
  <>
    <CodeLine n={1}>
      <span style={codeStyles.v}>client</span>
      {" := "}
      <span style={codeStyles.m}>passpoint</span>
      <span style={codeStyles.pun}>.</span>
      <span style={codeStyles.fn}>NewClient</span>
      <span style={codeStyles.pun}>(</span>
      <span style={codeStyles.v}>os</span>
      <span style={codeStyles.pun}>.</span>
      <span style={codeStyles.fn}>Getenv</span>
      <span style={codeStyles.pun}>(</span>
      <span style={codeStyles.s}>"PP_KEY"</span>
      <span style={codeStyles.pun}>))</span>
    </CodeLine>
    <CodeLine n={2}>{""}</CodeLine>
    <CodeLine n={3}>
      <span style={codeStyles.v}>charge</span>
      <span style={codeStyles.pun}>, </span>
      <span style={codeStyles.v}>err</span>
      {" := "}
      <span style={codeStyles.v}>client</span>
      <span style={codeStyles.pun}>.</span>
      <span style={codeStyles.m}>Collections</span>
      <span style={codeStyles.pun}>.</span>
      <span style={codeStyles.fn}>Create</span>
      <span style={codeStyles.pun}>(</span>
      <span style={codeStyles.v}>ctx</span>
      <span style={codeStyles.pun}>, &amp;</span>
      <span style={codeStyles.m}>passpoint.CollectionParams</span>
      <span style={codeStyles.pun}>{"{"}</span>
    </CodeLine>
    <CodeLine n={4}>
      {"    "}
      <span style={codeStyles.v}>Amount</span>
      <span style={codeStyles.pun}>: </span>
      <span style={codeStyles.n}>1240.00</span>,
    </CodeLine>
    <CodeLine n={5}>
      {"    "}
      <span style={codeStyles.v}>Source</span>
      <span style={codeStyles.pun}>: </span>
      <span style={codeStyles.s}>"USD"</span>,
    </CodeLine>
    <CodeLine n={6}>
      {"    "}
      <span style={codeStyles.v}>Destination</span>
      <span style={codeStyles.pun}>: </span>
      <span style={codeStyles.s}>"NGN"</span>,
    </CodeLine>
    <CodeLine n={7}>
      {"    "}
      <span style={codeStyles.v}>Reference</span>
      <span style={codeStyles.pun}>: </span>
      <span style={codeStyles.s}>"ord_</span>
      <span
        style={{
          ...codeStyles.s,
          opacity: refVisible ? 1 : 0,
          transition: "opacity 0.3s",
        }}
      >
        {refId}
      </span>
      <span style={codeStyles.s}>"</span>
      <span style={blinkCursor} aria-hidden="true" />
    </CodeLine>
    <CodeLine n={8}>
      <span style={codeStyles.pun}>{"})"};</span>
    </CodeLine>
  </>
);

const HeroCodeCard = (): ReactNode => {
  const [activeTab, setActiveTab] = useState<TabKey>("curl");
  const [refId, setRefId] = useState<string>(REF_IDS[0]);
  const [refVisible, setRefVisible] = useState<boolean>(true);

  useEffect(() => {
    let i = 0;
    let pendingTimeout: number | undefined;
    const interval = window.setInterval(() => {
      i = (i + 1) % REF_IDS.length;
      setRefVisible(false);
      pendingTimeout = window.setTimeout(() => {
        setRefId(REF_IDS[i]);
        setRefVisible(true);
      }, 280);
    }, 2800);
    return () => {
      window.clearInterval(interval);
      if (pendingTimeout !== undefined) window.clearTimeout(pendingTimeout);
    };
  }, []);

  const handleTabClick = useCallback((tab: TabKey): void => {
    setActiveTab(tab);
  }, []);

  return (
    <div className="relative select-none">
      {/* Floating chip A */}
      <div
        className="absolute z-10 hidden lg:flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border text-[12px] whitespace-nowrap"
        style={{
          top: -14,
          left: -28,
          background: "var(--paper-card)",
          borderColor: "var(--rule)",
          color: "var(--ink-soft)",
          boxShadow:
            "0 1px 2px rgba(15,15,20,.04), 0 12px 28px -10px rgba(15,15,20,.10)",
          animation: "float-a 7s ease-in-out infinite",
        }}
      >
        <span
          className="inline-flex items-center justify-center w-[22px] h-[22px] rounded-full"
          style={{ background: "var(--clay-soft)", color: "var(--clay)" }}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </span>
        <span>
          <span style={{ color: "var(--ink)" }} className="font-medium">
            Payment confirmed
          </span>
          <span style={{ color: "var(--ink-mute)" }}> · $1,240.00 → NGN</span>
        </span>
      </div>

      {/* Floating chip B */}
      <div
        className="absolute z-10 hidden lg:flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border text-[12px] whitespace-nowrap"
        style={{
          bottom: 32,
          right: -22,
          background: "var(--paper-card)",
          borderColor: "var(--rule)",
          color: "var(--ink-soft)",
          boxShadow:
            "0 1px 2px rgba(15,15,20,.04), 0 12px 28px -10px rgba(15,15,20,.10)",
          animation: "float-b 8s ease-in-out infinite",
        }}
      >
        <span
          className="inline-flex items-center justify-center w-[22px] h-[22px] rounded-full"
          style={{ background: "var(--clay-soft)", color: "var(--clay)" }}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
          </svg>
        </span>
        <span>
          <span style={{ color: "var(--ink)" }} className="font-medium">
            Settled in 2.4s
          </span>
          <span style={{ color: "var(--ink-mute)" }}> · avg p50</span>
        </span>
      </div>

      {/* Code card */}
      <div
        className="relative overflow-hidden rounded-[14px] border"
        style={{
          background: "var(--paper-card)",
          borderColor: "var(--rule)",
          boxShadow:
            "0 1px 0 rgba(255,255,255,.6) inset, 0 1px 2px rgba(15,15,20,.04), 0 24px 60px -20px rgba(15,15,20,.16)",
        }}
      >
        {/* Tabs bar */}
        <div
          className="flex items-end px-3 pt-3 gap-px border-b"
          style={{ borderColor: "var(--rule-soft)" }}
        >
          {CODE_TABS.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => handleTabClick(tab)}
                className="relative px-3 py-2.5 -mb-px font-['JetBrains_Mono',monospace] text-[11.5px] cursor-pointer transition-colors"
                style={{
                  color: isActive ? "var(--ink)" : "var(--ink-mute)",
                  borderBottom: `1px solid ${isActive ? "var(--clay)" : "transparent"}`,
                }}
              >
                {tab}
              </button>
            );
          })}
          <div className="flex-1" />
          <button
            type="button"
            className="mb-1.5 inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md font-['JetBrains_Mono',monospace] text-[10.5px] cursor-pointer transition-colors"
            style={{
              color: "var(--ink-mute)",
              border: "1px solid var(--rule)",
              background: "var(--paper)",
            }}
            aria-label="Copy code snippet"
          >
            <Copy className="w-3 h-3" strokeWidth={1.6} />
            Copy
          </button>
        </div>

        {/* Code body */}
        <div
          className="relative py-5 overflow-hidden"
          style={{ background: "var(--paper-card)" }}
        >
          {activeTab === "curl" && (
            <CurlCode refId={refId} refVisible={refVisible} />
          )}
          {activeTab === "node" && (
            <NodeCode refId={refId} refVisible={refVisible} />
          )}
          {activeTab === "python" && (
            <PythonCode refId={refId} refVisible={refVisible} />
          )}
          {activeTab === "go" && (
            <GoCode refId={refId} refVisible={refVisible} />
          )}
        </div>

        {/* Response footer */}
        <div
          className="grid items-center px-5 py-3.5 font-['JetBrains_Mono',monospace] text-[11.5px] border-t"
          style={{
            gridTemplateColumns: "auto 1fr auto",
            gap: 12,
            background: "var(--paper-deep)",
            borderColor: "var(--rule-soft)",
            color: "var(--ink-mute)",
          }}
        >
          <span
            className="flex items-center gap-2"
            style={{ color: "var(--moss)" }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{
                background: "var(--moss)",
                boxShadow: "0 0 0 4px oklch(0.55 0.07 140 / 0.18)",
              }}
            />
            200 OK
          </span>
          <span style={{ color: "var(--ink-soft)" }}>
            collection.created · 142ms
          </span>
          <span className="hidden sm:block text-right">us-east-1</span>
        </div>
      </div>
    </div>
  );
};

// ─── Section components ──────────────────────────────────────────────────────

const HeroSection = (): ReactNode => (
  <section className="relative isolate overflow-hidden pt-12 sm:pt-20 lg:pt-28 pb-16 lg:pb-32">
    {/* Soft brand-tinted ambient glow */}
    <div
      className="pointer-events-none absolute -z-10"
      style={{
        width: 720,
        height: 480,
        right: -160,
        top: -100,
        filter: "blur(120px)",
        opacity: 0.28,
        background:
          "radial-gradient(closest-side, var(--color-brand-100), transparent 70%)",
      }}
      aria-hidden="true"
    />

    <div className="grid lg:grid-cols-[1.05fr_1fr] gap-14 lg:gap-20 items-start">
      {/* Left column */}
      <div className="ink-rise">
        {/* Editorial eyebrow */}
        <div
          className="inline-flex items-center gap-2 mb-8 pl-3 pr-4 py-1.5 rounded-full border"
          style={{
            borderColor: "var(--rule)",
            background: "var(--paper-card)",
            color: "var(--ink-soft)",
          }}
        >
          <span
            className="inline-block w-1.5 h-1.5 rounded-full"
            style={{
              background: "var(--clay)",
              animation: "clay-beep 2.6s ease-out infinite",
            }}
            aria-hidden="true"
          />
          <span className="font-['JetBrains_Mono',monospace] text-[11px] uppercase tracking-[0.18em]">
            Payment infrastructure · 2026
          </span>
        </div>

        {/* Headline — editorial serif with italic emphasis */}
        <h1
          className="font-['Fraunces',serif] font-medium tracking-[-0.035em] leading-[0.96] mb-8"
          style={{
            color: "var(--ink)",
            fontSize: "clamp(2.6rem, 6.4vw, 5.5rem)",
          }}
        >
          Payment infrastructure
          <br />
          built for{" "}
          <SerifEm>
            <span className="italic">developers</span>
          </SerifEm>
          <br />
          who move{" "}
          <SerifEm>
            <span className="italic">fast.</span>
          </SerifEm>
        </h1>

        <p
          className="text-[16px] sm:text-[18px] leading-[1.65] mb-10 max-w-[540px]"
          style={{ color: "var(--ink-soft)" }}
        >
          A complete payments suite — collections, payouts, wallets, virtual
          cards and cross-border transfers. One contract for auth, idempotency
          and webhooks across every product.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-14">
          <a
            href="https://go.mypasspoint.com/auth/login"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-[14px] font-medium transition-all"
            style={{
              background: "var(--ink)",
              color: "var(--paper)",
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,.08), 0 1px 2px rgba(15,15,20,.10), 0 8px 22px -8px rgba(15,15,20,.30)",
            }}
          >
            Start building
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" strokeWidth={1.8} />
          </a>
          <Link
            to="/introduction"
            className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-[14px] font-medium border transition-all"
            style={{
              borderColor: "var(--rule)",
              background: "var(--paper-card)",
              color: "var(--ink)",
            }}
          >
            <code
              className="font-['JetBrains_Mono',monospace] text-[12.5px]"
              style={{ color: "var(--clay)" }}
            >
              $ curl api.passpoint.dev
            </code>
          </Link>
        </div>

        {/* Editorial trust strip — three columns separated by hairlines */}
        <div
          className="grid grid-cols-3 border-y"
          style={{ borderColor: "var(--rule)" }}
        >
          {[
            { to: 50, decimals: 0, unit: "+", label: "Countries" },
            { to: 99.99, decimals: 2, unit: "%", label: "Uptime" },
            { to: 142, decimals: 0, unit: "ms", label: "p50 latency" },
          ].map(({ to, decimals, unit, label }, i) => (
            <div
              key={label}
              className={`py-6 ${i > 0 ? "pl-6 border-l" : "pr-6"} ${i < 2 ? "pr-6" : ""}`}
              style={{ borderColor: "var(--rule)" }}
            >
              <div
                className="font-['Fraunces',serif] font-medium leading-none tracking-[-0.03em] tabular-nums"
                style={{
                  color: "var(--ink)",
                  fontSize: "clamp(1.7rem, 3.4vw, 2.4rem)",
                }}
              >
                <CountUp to={to} decimals={decimals} />
                <span style={{ color: "var(--clay)" }}>{unit}</span>
              </div>
              <div
                className="text-[12px] mt-2.5 font-['JetBrains_Mono',monospace] uppercase tracking-[0.14em]"
                style={{ color: "var(--ink-mute)" }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right column — code card */}
      <div className="relative max-w-full lg:mt-6">
        <HeroCodeCard />
      </div>
    </div>
  </section>
);

const ProductSection = (): ReactNode => (
  <section className="py-24 lg:py-32">
    <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-20 items-end mb-16 lg:mb-20">
      <div>
        <Eyebrow>Product suite</Eyebrow>
        <h2
          className="font-['Fraunces',serif] font-medium leading-[1.02] tracking-[-0.025em]"
          style={{
            color: "var(--ink)",
            fontSize: "clamp(2.1rem, 4vw, 3.4rem)",
          }}
        >
          Six primitives.
          <br />
          <SerifEm>One unified API.</SerifEm>
        </h2>
      </div>
      <p
        className="text-[16px] leading-[1.65] max-w-[460px]"
        style={{ color: "var(--ink-soft)" }}
      >
        Every endpoint shares the same auth, idempotency and webhook contract —
        wiring up a new product is a config change, not a re-integration.
      </p>
    </div>

    {/* Editorial column-rule grid */}
    <div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t"
      style={{ borderColor: "var(--rule)" }}
    >
      {PRODUCT_CARDS.map((card, i) => (
        <Link
          key={card.title}
          to={card.href}
          className="group relative flex flex-col gap-5 px-7 py-9 lg:px-9 lg:py-11 border-b transition-colors"
          style={{
            borderColor: "var(--rule)",
            borderRight:
              i % 3 !== 2 ? "1px solid var(--rule)" : undefined,
          }}
        >
          {/* Subtle hover wash */}
          <span
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background:
                "linear-gradient(180deg, transparent, var(--paper-deep))",
            }}
            aria-hidden="true"
          />

          <div className="relative flex items-start justify-between gap-3">
            <span
              className="font-['Fraunces',serif] italic font-normal text-[18px]"
              style={{ color: "var(--clay)" }}
            >
              {card.index}
            </span>
            <span
              className="inline-flex items-center justify-center w-9 h-9 rounded-full border transition-colors"
              style={{
                borderColor: "var(--rule)",
                color: "var(--ink-soft)",
                background: "var(--paper-card)",
              }}
            >
              {card.icon}
            </span>
          </div>

          <div className="relative">
            <h3
              className="font-['Fraunces',serif] font-medium text-[24px] tracking-[-0.015em] mb-2"
              style={{ color: "var(--ink)" }}
            >
              {card.title}
            </h3>
            <p
              className="text-[14px] leading-[1.65]"
              style={{ color: "var(--ink-soft)" }}
            >
              {card.blurb}
            </p>
          </div>

          {card.endpoints && (
            <ul className="relative flex flex-col gap-1.5 mt-1">
              {card.endpoints.map((ep) => (
                <li
                  key={ep.path}
                  className="flex items-center gap-2 px-2 py-1.5 rounded"
                  style={{ background: "var(--paper-deep)" }}
                >
                  <MethodBadge method={ep.method} />
                  <code
                    className="font-['JetBrains_Mono',monospace] text-[11px]"
                    style={{ color: "var(--ink-soft)" }}
                  >
                    {ep.path}
                  </code>
                </li>
              ))}
            </ul>
          )}

          <span
            className="relative mt-auto inline-flex items-center gap-1.5 text-[13px] font-medium pt-2"
            style={{ color: "var(--ink)" }}
          >
            Read documentation
            <ArrowUpRight
              className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              strokeWidth={1.8}
              style={{ color: "var(--clay)" }}
            />
          </span>
        </Link>
      ))}
    </div>
  </section>
);

const NumbersSection = (): ReactNode => {
  const items: ReadonlyArray<{
    prefix: string;
    to: number;
    decimals: number;
    locale?: boolean;
    unit: string;
    label: string;
    note: string;
  }> = [
    {
      prefix: "$",
      to: 4.2,
      decimals: 1,
      unit: "B",
      label: "Processed across the network",
      note: "Trailing 12 months · ▲ 38% YoY",
    },
    {
      prefix: "",
      to: 142,
      decimals: 0,
      unit: "ms",
      label: "Median p50 API latency",
      note: "Measured at the edge · ▼ 31ms",
    },
    {
      prefix: "",
      to: 99.99,
      decimals: 2,
      unit: "%",
      label: "Platform uptime",
      note: "Trailing 90 days · SLA-backed",
    },
    {
      prefix: "",
      to: 2400,
      decimals: 0,
      locale: true,
      unit: "+",
      label: "Live merchants integrated",
      note: "Currently processing · ▲ 12% MoM",
    },
  ];

  return (
    <section
      className="relative py-24 lg:py-32 -mx-4 sm:-mx-8 lg:-mx-16 xl:-mx-24 px-4 sm:px-8 lg:px-16 xl:px-24 border-y"
      style={{
        background: "var(--paper-deep)",
        borderColor: "var(--rule)",
      }}
    >
      <div className="relative grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-20 items-end mb-16 lg:mb-20">
        <div>
          <Eyebrow>By the numbers</Eyebrow>
          <h2
            className="font-['Fraunces',serif] font-medium leading-[1.02] tracking-[-0.025em]"
            style={{
              color: "var(--ink)",
              fontSize: "clamp(2.1rem, 4vw, 3.4rem)",
            }}
          >
            Built for teams shipping <SerifEm>real volume.</SerifEm>
          </h2>
        </div>
        <p
          className="text-[16px] leading-[1.65] max-w-[460px]"
          style={{ color: "var(--ink-soft)" }}
        >
          Powering payment infrastructure for fintechs, marketplaces and global
          platforms in production today.
        </p>
      </div>

      <div
        className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t"
        style={{ borderColor: "var(--rule)" }}
      >
        {items.map(({ prefix, to, decimals, locale, unit, label, note }, i) => (
          <div
            key={label}
            className="px-7 py-9 lg:px-8 lg:py-12 border-b"
            style={{
              borderColor: "var(--rule)",
              borderRight:
                i % 4 !== 3 ? "1px solid var(--rule)" : undefined,
            }}
          >
            <div
              className="font-['Fraunces',serif] font-medium leading-none tracking-[-0.04em] tabular-nums"
              style={{
                color: "var(--ink)",
                fontSize: "clamp(2.6rem, 5vw, 3.6rem)",
              }}
            >
              {prefix}
              <CountUp to={to} decimals={decimals} locale={locale} />
              <SerifEm>{unit}</SerifEm>
            </div>
            <div
              className="mt-4 text-[14px] leading-[1.55] max-w-[220px]"
              style={{ color: "var(--ink-soft)" }}
            >
              {label}
            </div>
            <div
              className="mt-3 font-['JetBrains_Mono',monospace] text-[10.5px] uppercase tracking-[0.14em]"
              style={{ color: "var(--ink-mute)" }}
            >
              {note}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const StepsSection = (): ReactNode => (
  <section className="py-24 lg:py-32">
    <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-20 items-end mb-16 lg:mb-20">
      <div>
        <Eyebrow>Integration path</Eyebrow>
        <h2
          className="font-['Fraunces',serif] font-medium leading-[1.02] tracking-[-0.025em]"
          style={{
            color: "var(--ink)",
            fontSize: "clamp(2.1rem, 4vw, 3.4rem)",
          }}
        >
          From signup to first live transaction in{" "}
          <SerifEm>under an hour.</SerifEm>
        </h2>
      </div>
      <p
        className="text-[16px] leading-[1.65] max-w-[460px]"
        style={{ color: "var(--ink-soft)" }}
      >
        A predictable four-step path. Most teams go from{" "}
        <code
          className="font-['JetBrains_Mono',monospace] text-[13px] px-1.5 py-0.5 rounded"
          style={{
            background: "var(--paper-deep)",
            color: "var(--clay)",
            border: "1px solid var(--rule)",
          }}
        >
          git clone
        </code>{" "}
        to a real payment in production the same day.
      </p>
    </div>

    <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px">
      {STEPS.map(({ num, title, body }, i) => (
        <li
          key={num}
          className="relative px-2 lg:px-7 py-2 lg:py-4"
          style={{
            borderTop: "1px solid var(--rule)",
            borderRight:
              i < STEPS.length - 1 ? "1px solid var(--rule)" : undefined,
          }}
        >
          <div
            className="font-['Fraunces',serif] italic font-normal text-[14px] mb-6 mt-2 inline-flex items-center gap-2"
            style={{ color: "var(--clay)" }}
          >
            <span
              className="inline-block w-6 h-px"
              style={{ background: "var(--clay)" }}
            />
            {num}
          </div>
          <h3
            className="font-['Fraunces',serif] font-medium text-[22px] tracking-[-0.015em] mb-3"
            style={{ color: "var(--ink)" }}
          >
            {title}
          </h3>
          <p
            className="text-[14px] leading-[1.65] max-w-[260px]"
            style={{ color: "var(--ink-soft)" }}
          >
            {body}
          </p>
        </li>
      ))}
    </ol>

    <div className="mt-12">
      <Link
        to="/api-integrations"
        className="group inline-flex items-center gap-2 text-[13.5px] font-medium"
        style={{ color: "var(--ink)" }}
      >
        Read the integration guide
        <ArrowUpRight
          className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          strokeWidth={1.8}
          style={{ color: "var(--clay)" }}
        />
      </Link>
    </div>
  </section>
);

const TestimonialsSection = (): ReactNode => (
  <section className="py-24 lg:py-32">
    <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-20 items-end mb-16 lg:mb-20">
      <div>
        <Eyebrow>In their words</Eyebrow>
        <h2
          className="font-['Fraunces',serif] font-medium leading-[1.02] tracking-[-0.025em]"
          style={{
            color: "var(--ink)",
            fontSize: "clamp(2.1rem, 4vw, 3.4rem)",
          }}
        >
          What teams ship with <SerifEm>Passpoint.</SerifEm>
        </h2>
      </div>
      <p
        className="text-[16px] leading-[1.65] max-w-[460px]"
        style={{ color: "var(--ink-soft)" }}
      >
        Engineering and platform leads on integrating, scaling and shipping with
        us in production.
      </p>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-px">
      {TESTIMONIALS.map(({ initials, quote, name, role }, i) => (
        <article
          key={name}
          className="relative flex flex-col gap-8 px-2 sm:px-8 py-10 lg:py-14"
          style={{
            borderTop: "1px solid var(--rule)",
            borderRight:
              i === 0 ? "1px solid var(--rule)" : undefined,
            background: "var(--paper)",
          }}
        >
          <span
            className="font-['Fraunces',serif] font-normal italic leading-none select-none"
            style={{
              color: "var(--clay)",
              fontSize: 72,
              opacity: 0.55,
            }}
            aria-hidden="true"
          >
            “
          </span>
          <blockquote
            className="font-['Fraunces',serif] font-normal text-[22px] sm:text-[26px] leading-[1.35] tracking-[-0.012em] flex-1"
            style={{ color: "var(--ink)" }}
          >
            {quote}
          </blockquote>
          <footer
            className="flex items-center gap-3 pt-4 border-t"
            style={{ borderColor: "var(--rule)" }}
          >
            <span
              className="w-9 h-9 rounded-full grid place-items-center font-['JetBrains_Mono',monospace] text-[11.5px] font-medium border"
              style={{
                color: "var(--clay)",
                borderColor: "var(--rule)",
                background: "var(--clay-soft)",
              }}
            >
              {initials}
            </span>
            <div>
              <div
                className="text-[14px] font-medium"
                style={{ color: "var(--ink)" }}
              >
                {name}
              </div>
              <div
                className="text-[12.5px] mt-0.5"
                style={{ color: "var(--ink-mute)" }}
              >
                {role}
              </div>
            </div>
          </footer>
        </article>
      ))}
    </div>
  </section>
);

const CoverageSection = (): ReactNode => (
  <section className="py-24 lg:py-32">
    <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-20 items-end mb-16 lg:mb-20">
      <div>
        <Eyebrow>Coverage</Eyebrow>
        <h2
          className="font-['Fraunces',serif] font-medium leading-[1.02] tracking-[-0.025em]"
          style={{
            color: "var(--ink)",
            fontSize: "clamp(2.1rem, 4vw, 3.4rem)",
          }}
        >
          Coverage you can <SerifEm>build on.</SerifEm>
        </h2>
      </div>
      <p
        className="text-[16px] leading-[1.65] max-w-[460px]"
        style={{ color: "var(--ink-soft)" }}
      >
        The currencies, rails and certifications behind every Passpoint API
        call. One contract — twenty currencies, eight rails, four
        independently-audited control sets.
      </p>
    </div>

    <div
      className="grid grid-cols-1 md:grid-cols-3 border-t"
      style={{ borderColor: "var(--rule)" }}
    >
      {COVERAGE_COLUMNS.map((col, i) => (
        <div
          key={col.eyebrow}
          className="px-2 md:px-8 lg:px-10 py-10 lg:py-14 border-b"
          style={{
            borderColor: "var(--rule)",
            borderRight:
              i < COVERAGE_COLUMNS.length - 1
                ? "1px solid var(--rule)"
                : undefined,
          }}
        >
          <div className="flex items-center gap-3 mb-8">
            <span
              className="font-['Fraunces',serif] italic font-normal text-[16px]"
              style={{ color: "var(--clay)" }}
            >
              {col.index}
            </span>
            <span
              className="inline-block w-6 h-px"
              style={{ background: "var(--clay)" }}
              aria-hidden="true"
            />
            <span
              className="font-['JetBrains_Mono',monospace] text-[10.5px] uppercase tracking-[0.18em]"
              style={{ color: "var(--ink-mute)" }}
            >
              {col.eyebrow}
            </span>
          </div>

          <h3
            className="font-['Fraunces',serif] font-medium tracking-[-0.018em] leading-[1.05] mb-8"
            style={{
              color: "var(--ink)",
              fontSize: "clamp(1.8rem, 2.6vw, 2.4rem)",
            }}
          >
            {col.headline} <SerifEm>{col.italic}</SerifEm>
          </h3>

          <ul className="flex flex-col">
            {col.items.map((item, idx) => (
              <li
                key={item.primary}
                className="flex items-baseline justify-between gap-4 py-3"
                style={{
                  borderTop:
                    idx === 0 ? "1px solid var(--rule)" : "1px dashed var(--rule)",
                }}
              >
                <span
                  className="text-[14.5px] font-medium"
                  style={{ color: "var(--ink)" }}
                >
                  {item.primary}
                </span>
                {item.secondary && (
                  <span
                    className="font-['JetBrains_Mono',monospace] text-[11px] tracking-[0.02em] text-right shrink-0"
                    style={{ color: "var(--ink-mute)" }}
                  >
                    {item.secondary}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    <div className="mt-12 flex flex-col sm:flex-row gap-3">
      <Link
        to="/transfer/list-countries"
        className="group inline-flex items-center gap-2 text-[13.5px] font-medium"
        style={{ color: "var(--ink)" }}
      >
        View full coverage list
        <ArrowUpRight
          className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          strokeWidth={1.8}
          style={{ color: "var(--clay)" }}
        />
      </Link>
    </div>
  </section>
);

type FaqProps = {
  openFaq: string | null;
  toggleFaq: (id: string) => void;
};

const FaqSection = ({ openFaq, toggleFaq }: FaqProps): ReactNode => (
  <section className="py-24 lg:py-32">
    <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-20 items-end mb-16">
      <div>
        <Eyebrow>Frequently asked</Eyebrow>
        <h2
          className="font-['Fraunces',serif] font-medium leading-[1.02] tracking-[-0.025em]"
          style={{
            color: "var(--ink)",
            fontSize: "clamp(2.1rem, 4vw, 3.4rem)",
          }}
        >
          The questions developers <SerifEm>ask first.</SerifEm>
        </h2>
      </div>
      <p
        className="text-[16px] leading-[1.65] max-w-[460px]"
        style={{ color: "var(--ink-soft)" }}
      >
        Everything else lives in the docs — these are the ones that come up in
        nearly every integration.
      </p>
    </div>

    <div className="border-t" style={{ borderColor: "var(--rule)" }}>
      {FAQ_ITEMS.map((item) => {
        const isOpen = openFaq === item.id;
        return (
          <div
            key={item.id}
            className="border-b"
            style={{ borderColor: "var(--rule)" }}
          >
            <button
              type="button"
              className="flex w-full items-start justify-between text-left gap-8 py-7 cursor-pointer transition-colors"
              onClick={() => toggleFaq(item.id)}
              aria-expanded={isOpen}
              aria-controls={`faq-${item.id}`}
            >
              <span
                className="font-['Fraunces',serif] text-[20px] sm:text-[22px] font-medium tracking-[-0.012em] leading-[1.3]"
                style={{ color: "var(--ink)" }}
              >
                {item.question}
              </span>
              <span
                className="w-8 h-8 rounded-full border grid place-items-center shrink-0 transition-all duration-300"
                style={{
                  borderColor: isOpen ? "var(--clay)" : "var(--rule)",
                  background: isOpen ? "var(--clay)" : "transparent",
                  color: isOpen ? "var(--paper)" : "var(--ink-soft)",
                  transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </span>
            </button>
            {isOpen && (
              <div
                id={`faq-${item.id}`}
                className="pb-10 max-w-[760px] space-y-4"
              >
                {item.answer.split("\n\n").map((para, i) => {
                  const lines = para.split("\n");
                  const isList = lines.every((l) => l.startsWith("•"));
                  if (isList) {
                    return (
                      <ul key={i} className="space-y-2.5">
                        {lines.map((line, j) => (
                          <li
                            key={j}
                            className="flex gap-3 text-[15px] leading-[1.7]"
                            style={{ color: "var(--ink-soft)" }}
                          >
                            <span
                              className="mt-2.5 w-1 h-1 rounded-full shrink-0"
                              style={{ background: "var(--clay)" }}
                            />
                            <span>{line.replace(/^•\s*/, "")}</span>
                          </li>
                        ))}
                      </ul>
                    );
                  }
                  return (
                    <p
                      key={i}
                      className="text-[15px] leading-[1.7]"
                      style={{ color: "var(--ink-soft)" }}
                    >
                      {para}
                    </p>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  </section>
);

const FinalCtaSection = (): ReactNode => (
  <section className="pb-24 lg:pb-32">
    <div
      className="relative overflow-hidden rounded-[18px] border px-8 py-16 sm:px-14 sm:py-20 lg:px-20 lg:py-24"
      style={{
        background: "var(--paper-card)",
        borderColor: "var(--rule)",
      }}
    >
      {/* Soft brand-tinted ambient glow */}
      <div
        className="pointer-events-none absolute z-0"
        style={{
          width: 720,
          height: 480,
          right: -160,
          top: -160,
          filter: "blur(120px)",
          opacity: 0.32,
          background:
            "radial-gradient(closest-side, var(--color-brand-100), transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-20 items-center">
        <div>
          <Eyebrow>Get started</Eyebrow>
          <h3
            className="font-['Fraunces',serif] font-medium leading-[1.02] tracking-[-0.025em] mb-6"
            style={{
              color: "var(--ink)",
              fontSize: "clamp(2.1rem, 3.6vw, 3.2rem)",
            }}
          >
            Ready to start <SerifEm>building?</SerifEm>
          </h3>
          <p
            className="text-[17px] leading-[1.65] mb-10 max-w-[460px]"
            style={{ color: "var(--ink-soft)" }}
          >
            Spin up a sandbox account in under a minute. Live keys, real
            webhooks, real money — whenever you are ready.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://go.mypasspoint.com/auth/login"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-full text-[14px] font-medium transition-all"
              style={{
                background: "var(--ink)",
                color: "var(--paper)",
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,.08), 0 8px 22px -8px rgba(15,15,20,.30)",
              }}
            >
              Create sandbox account
              <ArrowRight
                className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5"
                strokeWidth={1.8}
              />
            </a>
            <Link
              to="/introduction"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-[14px] font-medium border transition-all"
              style={{
                borderColor: "var(--rule)",
                background: "var(--paper)",
                color: "var(--ink)",
              }}
            >
              Read the docs
            </Link>
          </div>
        </div>

        {/* Sandbox panel — paper, not glass */}
        <div
          className="relative rounded-[14px] border overflow-hidden"
          style={{
            background: "var(--paper)",
            borderColor: "var(--rule)",
            boxShadow: "0 1px 2px rgba(15,15,20,.04)",
          }}
        >
          <div
            className="px-5 py-3 border-b font-['JetBrains_Mono',monospace] text-[11px] uppercase tracking-[0.18em]"
            style={{
              borderColor: "var(--rule-soft)",
              background: "var(--paper-deep)",
              color: "var(--ink-mute)",
            }}
          >
            Sandbox details
          </div>
          {[
            { k: "API key", v: "pk_test_•••EZHF" },
            { k: "Status", v: "● operational", green: true },
            { k: "Region", v: "us-east-1 · eu-west-1" },
            { k: "SDKs", v: "node · python · go · ruby" },
            { k: "Webhook ping", v: "142ms p50" },
          ].map(({ k, v, green }) => (
            <div
              key={k}
              className="flex justify-between items-center px-5 py-3.5 text-[13.5px] border-b last:border-b-0"
              style={{ borderColor: "var(--rule-soft)" }}
            >
              <span style={{ color: "var(--ink-mute)" }}>{k}</span>
              <span
                className="font-['JetBrains_Mono',monospace] text-[12.5px]"
                style={{ color: green ? "var(--moss)" : "var(--ink)" }}
              >
                {v}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const FooterSection = (): ReactNode => {
  type FooterLink = { label: string; to: string | null; href?: string };
  type FooterColumn = { heading: string; links: ReadonlyArray<FooterLink> };

  const columns: ReadonlyArray<FooterColumn> = [
    {
      heading: "Products",
      links: [
        { label: "Collections", to: "/collection" },
        { label: "Payouts", to: "/payout" },
        { label: "Wallets", to: "/wallet" },
        { label: "Virtual Cards", to: "/virtual-card-v2" },
        { label: "Cross-Border", to: "/transfer" },
      ],
    },
    {
      heading: "Developers",
      links: [
        { label: "Documentation", to: "/introduction" },
        { label: "API Reference", to: "/collection" },
        { label: "Sandbox", to: "/sandbox-playground" },
        { label: "Quick Start", to: "/quick-guides" },
      ],
    },
    {
      heading: "Company",
      links: [
        { label: "About", to: null, href: "https://mypasspoint.com" },
        {
          label: "Dashboard",
          to: null,
          href: "https://go.mypasspoint.com/auth/login",
        },
        { label: "Support", to: null, href: "https://mypasspoint.com" },
      ],
    },
    {
      heading: "Legal",
      links: [
        {
          label: "Privacy",
          to: null,
          href: "https://mypasspoint.com/privacy",
        },
        { label: "Terms", to: null, href: "https://mypasspoint.com/terms" },
        { label: "Security", to: null, href: "https://mypasspoint.com" },
      ],
    },
  ];

  return (
    <footer className="border-t" style={{ borderColor: "var(--rule)" }}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.5fr_repeat(4,1fr)] gap-12 pt-16 pb-10">
        <div>
          <img
            src={logoSrc}
            alt="Passpoint"
            className="h-20 w-auto object-contain mix-blend-multiply dark:mix-blend-screen mb-5"
          />
          <p
            className="text-[13.5px] leading-[1.65] max-w-[280px] mb-6"
            style={{ color: "var(--ink-soft)" }}
          >
            Payment infrastructure for developers building global products.
            Built for teams who ship.
          </p>
          <div
            className="inline-flex items-center gap-2 border rounded-full px-3 py-1.5 text-[12px]"
            style={{
              borderColor: "var(--rule)",
              color: "var(--ink-soft)",
              background: "var(--paper-card)",
            }}
          >
            <span
              className="w-[7px] h-[7px] rounded-full"
              style={{
                background: "var(--moss)",
                boxShadow: "0 0 0 3px oklch(0.55 0.07 140 / 0.18)",
              }}
            />
            All systems operational
          </div>
        </div>

        {columns.map(({ heading, links }) => (
          <div key={heading}>
            <h5
              className="font-['JetBrains_Mono',monospace] text-[10.5px] uppercase tracking-[0.18em] mb-5"
              style={{ color: "var(--ink-mute)" }}
            >
              {heading}
            </h5>
            <ul className="flex flex-col gap-3">
              {links.map(({ label, to, href }) => (
                <li key={label}>
                  {to ? (
                    <Link
                      to={to}
                      className="text-[14px] transition-colors"
                      style={{ color: "var(--ink-soft)" }}
                    >
                      {label}
                    </Link>
                  ) : (
                    <a
                      href={href ?? "#"}
                      target={href ? "_blank" : undefined}
                      rel={href ? "noopener noreferrer" : undefined}
                      className="text-[14px] transition-colors"
                      style={{ color: "var(--ink-soft)" }}
                    >
                      {label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div
        className="border-t py-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-[12.5px]"
        style={{ borderColor: "var(--rule)", color: "var(--ink-mute)" }}
      >
        <span>© 2026 Passpoint Technologies, Inc.</span>
        <span className="font-['Fraunces',serif] italic">
          Made for developers who move fast.
        </span>
      </div>
    </footer>
  );
};

// ─── Page ─────────────────────────────────────────────────────────────────────

const Home = (): ReactNode => {
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  const toggleFaq = useCallback((id: string): void => {
    setOpenFaq((prev) => (prev === id ? null : id));
  }, []);

  return (
    <div className="claude-home min-h-screen">
      <HeroSection />
      <ProductSection />
      <NumbersSection />
      <StepsSection />
      <TestimonialsSection />
      <CoverageSection />
      <FaqSection openFaq={openFaq} toggleFaq={toggleFaq} />
      <FinalCtaSection />
      <FooterSection />
    </div>
  );
};

export default Home;
