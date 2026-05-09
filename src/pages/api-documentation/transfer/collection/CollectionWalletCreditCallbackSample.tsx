import {Webhook, Info, ShieldCheck, AlertTriangle} from "lucide-react";
import CodeBlock from "@/components/CodeBlock.tsx";

const CollectionWalletCreditCallbackSample = () => {
    const getEndpoint = () => `POST https://merchant_callback_url`;

    const getRequestBody = () => `{
    "srcAccountName": "OLANIYAN CAXTON-MARTINS",
    "destAccountNumber": "9977657822",
    "srcBank": "UNITED BANK FOR AFRICA",
    "srcAccountNumber": "2025143050",
    "eventType": "VIRTUAL_ACCOUNT_CREDIT",
    "transactionId": "000004260111545233412345132327",
    "destAccountName": "MERCHANT(Kelechi Motors)",
    "charges": 100,
    "destBank": "Providus Bank",
    "merchantId": "e0b157a2-9245-40b9-8117-d25cadfdcfaa",
    "narration": "transfer",
    "transactionAmount": 10000000,
    "currency": "NGN"
}`;

    const getCurlRequest = () => `curl --location 'https://merchant_callback_url'
--header 'signature;'
--data '{
    "srcAccountName": "OLANIYAN CAXTON-MARTINS",
    "destAccountNumber": "9977657822",
    "srcBank": "UNITED BANK FOR AFRICA",
    "srcAccountNumber": "2025143050",
    "eventType": "VIRTUAL_ACCOUNT_CREDIT",
    "transactionId": "000004260111545233412345132327",
    "destAccountName": "MERCHANT(Kelechi Motors)",
    "charges": 100,
    "destBank": "Providus Bank",
    "merchantId": "e0b157a2-9245-40b9-8117-d25cadfdcfaa",
    "narration": "transfer",
    "transactionAmount": 10000000,
    "currency": "NGN"
}
'`;

    const getResponse = () => `{
  "code": "00",
  "status": "successful",
  "message": "callback received successfully"
}`;

    const getJavaSnippet = () => `HmacUtils hmac = new HmacUtils("HmacSHA512", callback_secret);

String signature = hmac.hmacHex(callback_data);`;

    return (
        <div className="py-8 sm:py-10 space-y-16">

            {/* Hero */}
            <section>
                <div className="inline-flex items-center gap-2 bg-brand-50 dark:bg-brand-950/40 text-brand text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
                    <Webhook className="h-3.5 w-3.5" />
                    API Reference
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
                    Wallet Credit Callback Sample
                </h1>
                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl">
                    Receive real-time notifications when a virtual account is credited. This webhook is sent by
                    Passpoint when funds are received into a merchant's virtual account.
                </p>
            </section>

            {/* How Wallet Credit Callbacks Work */}
            <section>
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <Webhook className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">How Wallet Credit Callbacks Work</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-6 max-w-2xl">
                    When a customer makes a bank transfer into any of your Passpoint virtual accounts, Passpoint instantly detects the incoming credit and dispatches a POST webhook notification to your configured callback URL. This is how your application learns about new incoming payments in real time — no polling required.
                </p>

                <div className="space-y-4">
                    {/* Trigger condition */}
                    <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-3">
                        <div className="flex items-center gap-2 mb-1">
                            <Info className="h-4 w-4 text-brand shrink-0" />
                            <h3 className="text-sm font-semibold text-foreground">What triggers this callback</h3>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">
                            This callback fires for the <code className="font-mono bg-muted px-1.5 py-0.5 rounded">VIRTUAL_ACCOUNT_CREDIT</code> event type — meaning funds have been successfully received into a virtual account assigned to your merchant. The <code className="font-mono bg-muted px-1.5 py-0.5 rounded">destAccountNumber</code> field identifies which virtual account was credited.
                        </p>
                        <ul className="space-y-2">
                            {[
                                "Customer sends a bank transfer to your virtual account number.",
                                "Passpoint's banking partner confirms receipt and credits the virtual account.",
                                "Passpoint immediately dispatches the callback to your configured URL.",
                                "Your handler receives the payload, verifies the signature, and credits the customer's balance in your application.",
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-2">
                                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand shrink-0" />
                                    <span className="text-xs text-muted-foreground">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Key fields */}
                    <div className="bg-white dark:bg-card border border-border rounded-2xl overflow-hidden">
                        <div className="px-5 py-3 border-b border-border bg-muted/30">
                            <h4 className="text-sm font-semibold text-foreground">Key callback fields</h4>
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
                                        { field: "transactionId", desc: "Unique transaction ID — use as your idempotency key to prevent duplicate credit processing." },
                                        { field: "destAccountNumber", desc: "The virtual account number that was credited. Map this to a customer in your system." },
                                        { field: "transactionAmount", desc: "The amount received in the specified currency." },
                                        { field: "charges", desc: "Any Passpoint fees deducted from the received amount." },
                                        { field: "srcAccountName / srcBank", desc: "Name and bank of the sender — useful for reconciliation and customer-facing receipts." },
                                        { field: "eventType", desc: "VIRTUAL_ACCOUNT_CREDIT — always check this before processing to ensure you are handling the correct event." },
                                        { field: "merchantId", desc: "Your Passpoint merchant ID — verify this matches your expected merchant to prevent processing callbacks meant for another integration." },
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

                    {/* Idempotency */}
                    <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-3">
                        <div className="flex items-center gap-2 mb-1">
                            <ShieldCheck className="h-4 w-4 text-brand shrink-0" />
                            <h3 className="text-sm font-semibold text-foreground">Idempotency and duplicate protection</h3>
                        </div>
                        <p className="text-xs text-muted-foreground">
                            The same callback may arrive more than once (e.g., after a webhook resend). Your handler must check whether a transaction with the given <code className="font-mono bg-muted px-1.5 py-0.5 rounded">transactionId</code> has already been processed and skip it if so. <strong className="text-foreground">Never credit a customer's balance twice for the same transactionId.</strong> Store processed transaction IDs in a deduplicated log or database.
                        </p>
                    </div>

                    {/* Signature warning */}
                    <div className="bg-muted/40 dark:bg-background/40 border border-border rounded-xl p-4 flex items-start gap-3">
                        <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                        <p className="text-xs text-muted-foreground">
                            <strong className="text-foreground">Never process a callback without verifying the signature.</strong> The <code className="font-mono bg-muted px-1 py-0.5 rounded">signature</code> header is HMAC-SHA512 of the raw request body using your callback secret as the key. Any request that fails signature verification should be rejected immediately — it may be a spoofed or tampered payload.
                        </p>
                    </div>
                </div>
            </section>

            {/* Callback Details */}
            <section>
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <Webhook className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Callback details</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
                    Passpoint sends a POST request to your configured callback URL on every virtual account credit.
                </p>

                <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2 px-4 py-3 bg-muted/30 dark:bg-card/50 border border-border rounded-2xl">
                        <span className="px-2 py-0.5 rounded text-xs font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400">POST</span>
                        <code className="text-xs text-muted-foreground break-all">https://merchant_callback_url</code>
                    </div>

                    <div className="bg-white dark:bg-card border border-border rounded-2xl overflow-hidden">
                        <div className="px-5 py-3 border-b border-border bg-muted/30">
                            <h4 className="text-sm font-semibold text-foreground">Headers received</h4>
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
                                    <td className="px-5 py-3.5 font-mono text-xs text-foreground">signature</td>
                                    <td className="px-5 py-3.5 text-muted-foreground">HMAC SHA-512 of callback body using callback secret</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-5">
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">Endpoint</h4>
                            <CodeBlock>{getEndpoint()}</CodeBlock>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">Request body</h4>
                            <CodeBlock language="json">{getRequestBody()}</CodeBlock>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">cURL example</h4>
                            <CodeBlock language="bash">{getCurlRequest()}</CodeBlock>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">Signature verification (Java)</h4>
                            <CodeBlock language="java">{getJavaSnippet()}</CodeBlock>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">Response</h4>
                            <CodeBlock language="json">{getResponse()}</CodeBlock>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CollectionWalletCreditCallbackSample;
