import {CheckCircle, Shield, Zap, Info, AlertTriangle, ArrowRight} from "lucide-react";
import CodeBlock from "@/components/CodeBlock.tsx";

const RealtimeAuthorizationDecisionMaker = () => {
    const endpointCode = () => `POST https://merchant_url`;
    const requestBodyCode = () => `{
    "approvalCode": "string",
    "cardAcceptorCountry": "string",
    "cardAcceptorName": "string",
    "cardId": "string",
    "clientName": "string",
    "maskedCardPan": "string",
    "mcc": "string",
    "rrn": "string",
    "stan": "string",
    "settlementCurrency": "string",
    "terminalId": "string",
    "transactionCurrency": "string",
    "transactionAmount": "decimal",
    "charges": "decimal",
    "debitAmount": "decimal",
    "settlementAmount": "decimal",
    "crossborder": "boolean",
    "crossborderCharge": "decimal",
    "crossborderChargeBearer": "string"
}`;
    const curlCode = () => `curl --location 'https://merchant_url'
--header 'Content-Type: application/json'
--data '{
    "mcc": "string",
    "cardId": "string",
    "terminalId": "string",
    "cardAcceptorCountry": "string",
    "cardAcceptorName": "string",
    "transactionCurrency": "string",
    "transactionAmount": "number",
    "settlementAmount": "number",
    "settlementCurrency": "string",
    "rrn": "string",
    "stan": "string",
    "maskedCardPan": "string",
    "clientName": "string",
    "approvalCode": "string"
}'`;
    const responseCode = () => `{
  "responseCode": "approve|decline",
  "reasonCode": "approve|decline"
}`;

    return (
        <div className="py-8 sm:py-10 space-y-16">

            {/* Hero */}
            <section>
                <div className="inline-flex items-center gap-2 bg-brand-50 dark:bg-brand-950/40 text-brand text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
                    <Shield className="h-3.5 w-3.5" />
                    API Reference
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
                    Realtime Authorization Decision Maker
                </h1>
                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl">
                    A merchant-hosted endpoint that receives authorization requests from Passpoint and returns approve or decline decisions in real time.
                </p>
            </section>

            {/* How Real-Time Authorization Works */}
            <section>
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <Zap className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">How Real-Time Authorization Works</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-6 max-w-2xl">
                    Unlike typical webhooks that deliver notifications after the fact, this is a <strong>synchronous decision endpoint</strong>. When a cardholder attempts a transaction at a merchant terminal or online checkout, Passpoint immediately forwards the authorization request to your server and waits for your <code className="font-mono bg-muted px-1 py-0.5 rounded text-xs">approve</code> or <code className="font-mono bg-muted px-1 py-0.5 rounded text-xs">decline</code> response before processing the transaction.
                </p>

                <div className="space-y-4">
                    {/* Authorization flow */}
                    <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-4">
                        <div className="flex items-center gap-2 mb-1">
                            <ArrowRight className="h-4 w-4 text-brand shrink-0" />
                            <h3 className="text-sm font-semibold text-foreground">Authorization flow</h3>
                        </div>
                        <div className="space-y-3">
                            {[
                                { step: "1", label: "Cardholder initiates purchase", detail: "The cardholder attempts a transaction using their virtual card at an online or in-person merchant." },
                                { step: "2", label: "Passpoint forwards the request", detail: "Passpoint intercepts the authorization request and immediately POSTs it to your configured merchant webhook URL with the full transaction context." },
                                { step: "3", label: "Your system evaluates the request", detail: "Apply your custom logic — check spending limits, block specific merchant categories (MCC), restrict time-of-day access, or enforce per-user controls." },
                                { step: "4", label: "Your system responds", detail: "Return a JSON response with responseCode: \"approve\" to authorize the transaction, or responseCode: \"decline\" to reject it. You must respond within the latency window." },
                                { step: "5", label: "Passpoint processes the decision", detail: "Passpoint uses your decision to approve or reject the authorization with the card network. Approved transactions proceed; declined transactions are returned to the merchant as declined." },
                            ].map(({ step, label, detail }) => (
                                <div key={step} className="flex items-start gap-3">
                                    <div className="bg-brand-50 dark:bg-brand-950/40 w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                                        <span className="text-xs font-bold text-brand">{step}</span>
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold text-foreground mb-0.5">{label}</p>
                                        <p className="text-xs text-muted-foreground">{detail}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Use cases */}
                    <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-3">
                        <div className="flex items-center gap-2 mb-1">
                            <Info className="h-4 w-4 text-brand shrink-0" />
                            <h3 className="text-sm font-semibold text-foreground">Common use cases</h3>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-3">
                            {[
                                { title: "MCC blocking", desc: "Decline transactions at specific merchant category codes (e.g., gambling, luxury goods, foreign merchants) automatically." },
                                { title: "Spending limits", desc: "Enforce per-transaction or cumulative daily/weekly limits per card or per user, beyond the card's loaded balance." },
                                { title: "Time-of-day restrictions", desc: "Only allow transactions during business hours or a defined window — decline any attempt made outside that range." },
                                { title: "Geographic controls", desc: "Block transactions from specific countries or outside a user's registered home region using cardAcceptorCountry." },
                            ].map(({ title, desc }) => (
                                <div key={title} className="bg-muted/40 dark:bg-background/40 border border-border rounded-xl p-3.5">
                                    <p className="text-xs font-semibold text-foreground mb-1">{title}</p>
                                    <p className="text-xs text-muted-foreground">{desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Latency requirement */}
                    <div className="bg-muted/40 dark:bg-background/40 border border-border rounded-xl p-4 flex items-start gap-3">
                        <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                        <p className="text-xs text-muted-foreground">
                            <strong className="text-foreground">Latency is critical.</strong> Your endpoint must respond within a strict time window (typically under 5 seconds). If your server does not respond in time, Passpoint will either approve or decline the transaction based on your configured timeout policy. Keep your authorization logic fast — offload any logging or analytics to async processes after responding.
                        </p>
                    </div>

                    {/* Key request fields */}
                    <div className="bg-white dark:bg-card border border-border rounded-2xl overflow-hidden">
                        <div className="px-5 py-3 border-b border-border bg-muted/30">
                            <h4 className="text-sm font-semibold text-foreground">Key request fields</h4>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-border">
                                        <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Field</th>
                                        <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Description</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    {[
                                        { field: "cardId", desc: "Unique ID of the virtual card — use this to look up user-specific rules and spending limits in your system." },
                                        { field: "mcc", desc: "Merchant Category Code — use this to implement category-based controls such as blocking gambling or restricting to specific merchants." },
                                        { field: "transactionAmount", desc: "The transaction amount in the transactionCurrency — use this to enforce per-transaction limits." },
                                        { field: "cardAcceptorCountry", desc: "ISO country code of the merchant — use this for geographic restrictions." },
                                        { field: "maskedCardPan", desc: "Masked card PAN for logging and display purposes. Do not store the full PAN." },
                                        { field: "crossborder", desc: "Boolean flag indicating whether the transaction is cross-border — useful for applying additional restrictions on international transactions." },
                                    ].map(({ field, desc }) => (
                                        <tr key={field} className="hover:bg-muted/20 transition-colors">
                                            <td className="px-5 py-3.5"><span className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">{field}</span></td>
                                            <td className="px-5 py-3.5 text-muted-foreground text-xs">{desc}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>

            {/* API Endpoint */}
            <section>
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <div className="relative">
                            <Shield className="h-4 w-4 text-brand" />
                            <CheckCircle className="h-2.5 w-2.5 text-brand absolute -bottom-0.5 -right-0.5" />
                        </div>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Authorization decision</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
                    Passpoint calls this endpoint on your server during card authorization to get your approve or decline decision.
                </p>

                <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2 px-4 py-3 bg-muted/30 dark:bg-card/50 border border-border rounded-2xl">
                        <span className="px-2 py-0.5 rounded text-xs font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400">POST</span>
                        <code className="text-xs text-muted-foreground break-all">
                            https://merchant_url
                        </code>
                    </div>

                    <div className="bg-white dark:bg-card border border-border rounded-2xl overflow-hidden">
                        <div className="px-5 py-3 border-b border-border bg-muted/30">
                            <h4 className="text-sm font-semibold text-foreground">Headers</h4>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                <tr className="border-b border-border">
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Header</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Value</th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                <tr className="hover:bg-muted/20 transition-colors">
                                    <td className="px-5 py-3.5 font-mono text-xs text-foreground">x-channel-id</td>
                                    <td className="px-5 py-3.5 text-muted-foreground">CHANNEL_ID</td>
                                </tr>
                                <tr className="hover:bg-muted/20 transition-colors">
                                    <td className="px-5 py-3.5 font-mono text-xs text-foreground">x-channel-code</td>
                                    <td className="px-5 py-3.5 text-muted-foreground">CHANNEL_CODE</td>
                                </tr>
                                <tr className="hover:bg-muted/20 transition-colors">
                                    <td className="px-5 py-3.5 font-mono text-xs text-foreground">x-merchant-id</td>
                                    <td className="px-5 py-3.5 text-muted-foreground">YOUR_MERCHANT_ID</td>
                                </tr>
                                <tr className="hover:bg-muted/20 transition-colors">
                                    <td className="px-5 py-3.5 font-mono text-xs text-foreground">Authorization</td>
                                    <td className="px-5 py-3.5 text-muted-foreground">Bearer [your-access-token]</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-5">
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">Endpoint</h4>
                            <CodeBlock>{endpointCode()}</CodeBlock>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">Request body</h4>
                            <CodeBlock language="json">{requestBodyCode()}</CodeBlock>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">cURL example</h4>
                            <CodeBlock language="bash">{curlCode()}</CodeBlock>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">Response</h4>
                            <CodeBlock language="json">{responseCode()}</CodeBlock>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default RealtimeAuthorizationDecisionMaker;
