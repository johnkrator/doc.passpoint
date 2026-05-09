import { ArrowRight, CheckCircle, Clock, RefreshCw, AlertTriangle, XCircle, Bell, Activity } from "lucide-react";
import CodeBlock from "@/components/CodeBlock.tsx";

const TransactionDynamics = () => {
    const getTransactionLifecycleCode = () => {
        return `// Transaction Lifecycle Example
// 1. Initiate Transaction
const initiateResponse = await createTransaction({
  amount: 50000,
  currency: "NGN",
  accountNumber: "1234567890",
  bankCode: "000014"
});

// Response: { responseCode: "00", data: { status: "NEW", transactionId: "TXN123" } }

// 2. Transaction Moves to PENDING
// System begins processing

// 3. Check Status
const statusResponse = await checkTransactionStatus("TXN123");

// Possible outcomes:
// - SUCCESSFUL: Transaction completed
// - FAILED: Transaction failed
// - PROCESSING: Still being processed
// - PENDING: Awaiting provider response`;
    };

    const getWebhookExampleCode = () => {
        return `// Webhook Handler Example
app.post('/webhook/passpoint', (req, res) => {
  const event = req.body;

  // Verify webhook signature (recommended)
  const signature = req.headers['x-passpoint-signature'];
  if (!verifySignature(signature, req.body)) {
    return res.status(401).send('Invalid signature');
  }

  // Handle transaction status update
  switch(event.data.status) {
    case 'SUCCESSFUL':
      console.log('Transaction completed:', event.data.transactionId);
      // Update your database, send customer notification
      break;

    case 'FAILED':
      console.log('Transaction failed:', event.data.transactionId);
      // Log failure reason, notify customer
      break;

    case 'PENDING':
      console.log('Transaction pending:', event.data.transactionId);
      // Continue monitoring
      break;
  }

  // Always return 200 to acknowledge receipt
  res.status(200).send('Webhook received');
});`;
    };

    const getIdempotencyExampleCode = () => {
        return `// Using Client References for Idempotency
const clientReference = \`PAY_\${Date.now()}_\${userId}\`;

const response = await createTransaction({
  clientReference: clientReference, // Unique reference
  amount: 10000,
  currency: "USD",
  accountNumber: "9876543210"
});

// If network fails and you retry with same clientReference,
// Passpoint will return the original transaction instead of creating a duplicate`;
    };

    type StateVariant = "brand" | "amber" | "green" | "red" | "muted";

    const TRANSACTION_STATES: Array<{
        step: string;
        status: string;
        desc: string;
        code: string;
        icon: React.ReactNode;
        variant: StateVariant;
    }> = [
        {
            step: "1",
            status: "NEW",
            desc: "Transaction created and accepted by Passpoint, not yet submitted to the payment provider.",
            code: 'data.status: "NEW"',
            icon: <CheckCircle className="h-4 w-4" />,
            variant: "brand",
        },
        {
            step: "2",
            status: "PENDING",
            desc: "Transaction is queued and awaiting processing by our system before being sent to the payment provider.",
            code: 'data.status: "PENDING" | responseCode: "01"',
            icon: <Clock className="h-4 w-4" />,
            variant: "amber",
        },
        {
            step: "3",
            status: "PROCESSING",
            desc: "Transaction has been submitted to the payment provider and is currently being processed.",
            code: 'data.status: "PROCESSING"',
            icon: <RefreshCw className="h-4 w-4" />,
            variant: "brand",
        },
    ];

    const variantStyles: Record<StateVariant, { ring: string; bg: string; text: string; codeBg: string }> = {
        brand: {
            ring: "bg-brand/10 dark:bg-brand/15 text-brand",
            bg: "bg-brand-50/60 dark:bg-brand-950/20 border-brand/20 dark:border-brand/15",
            text: "text-brand",
            codeBg: "bg-brand/5 dark:bg-brand/10 text-brand font-mono text-xs",
        },
        amber: {
            ring: "bg-amber-100 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400",
            bg: "bg-amber-50/60 dark:bg-amber-950/20 border-amber-200/60 dark:border-amber-800/30",
            text: "text-amber-700 dark:text-amber-400",
            codeBg: "bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-300 font-mono text-xs",
        },
        green: {
            ring: "bg-green-100 dark:bg-green-950/40 text-green-600 dark:text-green-400",
            bg: "bg-green-50/60 dark:bg-green-950/20 border-green-200/60 dark:border-green-800/30",
            text: "text-green-700 dark:text-green-400",
            codeBg: "bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-300 font-mono text-xs",
        },
        red: {
            ring: "bg-red-100 dark:bg-red-950/40 text-red-500 dark:text-red-400",
            bg: "bg-red-50/60 dark:bg-red-950/20 border-red-200/60 dark:border-red-800/30",
            text: "text-red-600 dark:text-red-400",
            codeBg: "bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-300 font-mono text-xs",
        },
        muted: {
            ring: "bg-muted text-muted-foreground",
            bg: "bg-muted/30 dark:bg-muted/10 border-border",
            text: "text-muted-foreground",
            codeBg: "bg-muted text-foreground font-mono text-xs",
        },
    };

    return (
        <div className="py-8 sm:py-10 space-y-16">

            {/* ── Hero ───────────────────────────────────────────────── */}
            <section>
                <div className="inline-flex items-center gap-2 bg-brand-50 dark:bg-brand-950/40 text-brand text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
                    <Activity className="h-3.5 w-3.5" />
                    Guides
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
                    Transaction dynamics
                </h1>
                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl">
                    How transactions flow through Passpoint from initiation to completion. Understanding
                    transaction states, status codes, and lifecycle patterns is essential for robust integrations.
                </p>
            </section>

            {/* ── Transaction Lifecycle ──────────────────────────────── */}
            <section>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">Transaction lifecycle</h2>
                <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
                    Every transaction in Passpoint moves through a series of states. Handle each one appropriately.
                </p>

                <div className="space-y-3 mb-6">
                    {TRANSACTION_STATES.map(({ step, status, desc, code, icon, variant }) => {
                        const v = variantStyles[variant];
                        return (
                            <div key={status}>
                                <div className={`border ${v.bg} rounded-2xl p-5 flex items-start gap-4`}>
                                    <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${v.ring}`}>
                                        {icon}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-xs text-muted-foreground font-medium">Step {step}</span>
                                            <span className={`text-sm font-bold ${v.text}`}>{status}</span>
                                        </div>
                                        <p className="text-sm text-muted-foreground leading-relaxed mb-2">{desc}</p>
                                        <code className={`${v.codeBg} px-2 py-0.5 rounded`}>{code}</code>
                                    </div>
                                </div>
                                {step !== "3" && (
                                    <div className="flex justify-center my-1">
                                        <ArrowRight className="h-4 w-4 text-muted-foreground rotate-90" />
                                    </div>
                                )}
                            </div>
                        );
                    })}

                    {/* Arrow to terminal states */}
                    <div className="flex justify-center my-1">
                        <ArrowRight className="h-4 w-4 text-muted-foreground rotate-90" />
                    </div>

                    {/* Terminal states */}
                    <div className="grid sm:grid-cols-2 gap-3">
                        <div className={`border ${variantStyles.green.bg} rounded-2xl p-5 flex items-start gap-4`}>
                            <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${variantStyles.green.ring}`}>
                                <CheckCircle className="h-4 w-4" />
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-xs text-muted-foreground font-medium">Step 4a</span>
                                    <span className={`text-sm font-bold ${variantStyles.green.text}`}>SUCCESSFUL</span>
                                </div>
                                <p className="text-sm text-muted-foreground mb-2">Transaction completed. Funds transferred.</p>
                                <code className={`${variantStyles.green.codeBg} px-2 py-0.5 rounded`}>
                                    data.status: "SUCCESSFUL" | responseCode: "00"
                                </code>
                            </div>
                        </div>

                        <div className={`border ${variantStyles.red.bg} rounded-2xl p-5 flex items-start gap-4`}>
                            <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${variantStyles.red.ring}`}>
                                <XCircle className="h-4 w-4" />
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-xs text-muted-foreground font-medium">Step 4b</span>
                                    <span className={`text-sm font-bold ${variantStyles.red.text}`}>FAILED</span>
                                </div>
                                <p className="text-sm text-muted-foreground mb-2">Transaction failed. Check responseMessage for reason.</p>
                                <code className={`${variantStyles.red.codeBg} px-2 py-0.5 rounded`}>
                                    data.status: "FAILED" | responseCode: "02"
                                </code>
                            </div>
                        </div>
                    </div>
                </div>

                <CodeBlock language="javascript" title="Transaction Lifecycle in Code">
                    {getTransactionLifecycleCode()}
                </CodeBlock>
            </section>

            {/* ── responseCode vs data.status ────────────────────────── */}
            <section>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-8">
                    responseCode vs data.status
                </h2>

                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                    <div className="bg-white dark:bg-card border border-border rounded-2xl p-6">
                        <h4 className="text-sm font-semibold text-foreground mb-3">responseCode</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                            Result of your API <em>request</em> to Passpoint — was it accepted, rejected, or errored?
                        </p>
                        <ul className="space-y-1.5 text-xs text-muted-foreground font-mono">
                            <li><span className="text-green-600 dark:text-green-400 font-semibold">"00"</span> — API request successful</li>
                            <li><span className="text-amber-600 dark:text-amber-400 font-semibold">"01"</span> — Request accepted, transaction pending</li>
                            <li><span className="text-red-500 font-semibold">"02", "30", "31"…</span> — Request failed</li>
                        </ul>
                    </div>

                    <div className="bg-white dark:bg-card border border-border rounded-2xl p-6">
                        <h4 className="text-sm font-semibold text-foreground mb-3">data.status</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                            Current state of the <em>transaction</em> in the payment processing pipeline.
                        </p>
                        <ul className="space-y-1.5 text-xs text-muted-foreground font-mono">
                            <li><span className="text-foreground font-semibold">"NEW"</span> — Transaction created</li>
                            <li><span className="text-amber-600 dark:text-amber-400 font-semibold">"PENDING"</span> — Awaiting processing</li>
                            <li><span className="text-brand font-semibold">"PROCESSING"</span> — Being processed</li>
                            <li><span className="text-green-600 dark:text-green-400 font-semibold">"SUCCESSFUL"</span> — Completed</li>
                            <li><span className="text-red-500 font-semibold">"FAILED"</span> — Transaction failed</li>
                        </ul>
                    </div>
                </div>

                <div className="bg-muted/40 dark:bg-background/40 border border-border rounded-2xl p-5 flex items-start gap-4">
                    <div className="bg-amber-100 dark:bg-amber-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                        <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        <strong className="text-foreground">Important:</strong> A transaction can have{" "}
                        <code className="bg-amber-100/60 dark:bg-amber-950/30 px-1 rounded text-xs font-mono">responseCode "00"</code>{" "}
                        (request accepted) but{" "}
                        <code className="bg-amber-100/60 dark:bg-amber-950/30 px-1 rounded text-xs font-mono">data.status "PENDING"</code>.
                        Always check <strong className="text-foreground">data.status</strong> to confirm funds have been transferred.
                    </p>
                </div>
            </section>

            {/* ── Monitoring Transactions ────────────────────────────── */}
            <section>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">Monitoring transactions</h2>
                <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
                    Two ways to track status changes — webhooks are strongly preferred over polling.
                </p>

                <div className="grid sm:grid-cols-2 gap-4 mb-8">
                    <div className="bg-white dark:bg-card border border-border rounded-2xl p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                                <Bell className="h-4.5 w-4.5 text-brand" />
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-foreground">Webhooks</h3>
                                <span className="text-[10px] font-bold text-brand uppercase tracking-wide">Recommended</span>
                            </div>
                        </div>
                        <ul className="space-y-2">
                            {[
                                { ok: true, label: "Real-time updates" },
                                { ok: true, label: "No polling required" },
                                { ok: true, label: "Reduced API calls" },
                                { ok: true, label: "More efficient" },
                            ].map(({ ok, label }) => (
                                <li key={label} className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <CheckCircle className={`h-4 w-4 shrink-0 ${ok ? "text-brand" : "text-red-400"}`} />
                                    {label}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-white dark:bg-card border border-border rounded-2xl p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="bg-muted w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                                <RefreshCw className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-foreground">Polling</h3>
                                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide">Fallback only</span>
                            </div>
                        </div>
                        <ul className="space-y-2">
                            {[
                                { ok: false, label: "Delayed updates" },
                                { ok: false, label: "Increased API calls" },
                                { ok: false, label: "Can hit rate limits" },
                                { ok: true, label: "Useful as backup" },
                            ].map(({ ok, label }) => (
                                <li key={label} className="flex items-center gap-2 text-sm text-muted-foreground">
                                    {ok
                                        ? <CheckCircle className="h-4 w-4 shrink-0 text-brand" />
                                        : <XCircle className="h-4 w-4 shrink-0 text-red-400" />
                                    }
                                    {label}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <CodeBlock language="javascript" title="Webhook Handler Example">
                    {getWebhookExampleCode()}
                </CodeBlock>
            </section>

            {/* ── Idempotency ────────────────────────────────────────── */}
            <section>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
                    Idempotency &amp; duplicate prevention
                </h2>
                <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
                    Use client references to prevent duplicate transactions when network issues force retries.
                </p>

                <div className="bg-white dark:bg-card border border-border rounded-2xl p-6 mb-6">
                    <h3 className="text-sm font-semibold text-foreground mb-4">How it works</h3>
                    <ol className="space-y-4">
                        {[
                            "Generate a unique clientReference for each transaction attempt",
                            "Include this reference in your transaction request",
                            "If the request fails and you retry with the same clientReference, Passpoint returns the original transaction instead of creating a duplicate",
                            "Store the clientReference in your database to track transactions",
                        ].map((step, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-brand text-white text-xs font-bold shrink-0 mt-0.5">
                                    {i + 1}
                                </span>
                                {step}
                            </li>
                        ))}
                    </ol>
                </div>

                <CodeBlock language="javascript" title="Using Client References">
                    {getIdempotencyExampleCode()}
                </CodeBlock>
            </section>

            {/* ── Best Practices ─────────────────────────────────────── */}
            <section>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-8">Best practices</h2>

                <div className="space-y-3">
                    {[
                        {
                            title: "Always check data.status for final state",
                            body: 'Don\'t rely solely on responseCode. A "00" response means the request was accepted, not that the transaction is complete.',
                        },
                        {
                            title: "Implement webhooks for status updates",
                            body: "Webhooks provide real-time notifications and are more efficient than polling. Use polling only as a backup mechanism.",
                        },
                        {
                            title: "Use unique client references",
                            body: "Generate unique clientReference values to prevent duplicate transactions and enable reliable retry logic.",
                        },
                        {
                            title: "Store transaction references",
                            body: "Keep both Passpoint's transactionId and your clientReference in your database for reconciliation and support.",
                        },
                        {
                            title: "Handle all transaction states",
                            body: "Build logic to handle NEW, PENDING, PROCESSING, SUCCESSFUL, and FAILED states appropriately in your application.",
                        },
                        {
                            title: "Set realistic timeouts",
                            body: "Bank transfers can take several minutes. Don't timeout too quickly. Wait for webhook notifications or poll periodically.",
                        },
                    ].map(({ title, body }) => (
                        <div key={title} className="bg-white dark:bg-card border border-border rounded-2xl p-5 flex items-start gap-4">
                            <div className="bg-brand-50 dark:bg-brand-950/40 w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                                <CheckCircle className="h-4 w-4 text-brand" />
                            </div>
                            <div>
                                <h4 className="text-sm font-semibold text-foreground mb-1">{title}</h4>
                                <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── Common Scenarios ───────────────────────────────────── */}
            <section>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-8">Common scenarios</h2>

                <div className="space-y-4">
                    {[
                        {
                            title: "Scenario 1: Immediate success",
                            desc: "Some transactions (like wallet-to-wallet transfers) complete instantly:",
                            lines: [
                                { text: 'POST /transfer → responseCode: "00", data.status: "SUCCESSFUL"', muted: false },
                                { text: "// Transaction complete, no waiting required", muted: true },
                            ],
                        },
                        {
                            title: "Scenario 2: Asynchronous processing",
                            desc: "Most bank transfers process asynchronously:",
                            lines: [
                                { text: 'POST /transfer → responseCode: "00", data.status: "PENDING"', muted: false },
                                { text: "// Wait for webhook or poll status endpoint", muted: true },
                                { text: 'GET /transfer-status → data.status: "PROCESSING"', muted: false },
                                { text: "// Still processing...", muted: true },
                                { text: 'Webhook received → data.status: "SUCCESSFUL"', muted: false },
                                { text: "// Transaction complete!", muted: true },
                            ],
                        },
                        {
                            title: "Scenario 3: Transaction failure",
                            desc: "Failures can occur at various stages:",
                            lines: [
                                { text: 'POST /transfer → responseCode: "31"', muted: false },
                                { text: "// Validation error — fix and retry", muted: true },
                                { text: "OR", muted: true },
                                { text: 'POST /transfer → responseCode: "00", data.status: "PENDING"', muted: false },
                                { text: 'Webhook received → data.status: "FAILED"', muted: false },
                                { text: "// Provider rejected (e.g., insufficient funds, invalid account)", muted: true },
                            ],
                        },
                    ].map(({ title, desc, lines }) => (
                        <div key={title} className="bg-white dark:bg-card border border-border rounded-2xl p-6">
                            <h3 className="text-sm font-semibold text-foreground mb-2">{title}</h3>
                            <p className="text-sm text-muted-foreground mb-3">{desc}</p>
                            <div className="bg-muted/40 dark:bg-background/40 rounded-xl p-4 font-mono text-xs space-y-1">
                                {lines.map((line, i) => (
                                    <div key={i} className={line.muted ? "text-muted-foreground" : "text-foreground"}>
                                        {line.text}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default TransactionDynamics;
