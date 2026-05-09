import {Webhook, Info, AlertTriangle, ShieldCheck} from "lucide-react";
import CodeBlock from "@/components/CodeBlock.tsx";

const PayoutFundTransferCallbackSample = () => {
    const getCallbackEndpoint = () => {
        return `POST https://merchant_callback_url`;
    };

    const getJavaSignatureExample = () => {
        return `HmacUtils hmac = HmacUtils("HmacSHA512", callback_secret)

String signature = hmac.hmacHex(callback_data)`;
    };

    const getCallbackRequestBody = () => {
        return `{
    "srcAccountName": "Seyi ",
    "destAccountNumber": "1000005661",
    "clientReference": "090565631230185003649552088420",
    "srcBank": "Passpoint",
    "srcAccountNumber": "90010000325",
    "eventType": "FUNDS_TRANSFER",
    "transactionId": "dd7f0e1c-c382-4015-8b47-315a1a1fa4d2",
    "destAccountName": "UCHEGBULEM KELECHI ",
    "paymentRef": "090551231230185003649552088420",
    "charges": 53.75,
    "destBank": "Sparkle",
    "merchantId": "90676942-e221-4f45-94cf-0c7eff979c11",
    "transactionAmount": 50000,
    "narration": "7787999898",
    "currency": "NGN",
    "status": "successful",
    "code": "00",
    "message": "Approved or completed successfully"
}`;
    };

    const getCallbackCurlExample = () => {
        return `curl --location 'https://merchant_callback_url'
--header 'signature;'
--data '{
    "srcAccountName": "Seyi ",
    "destAccountNumber": "1000005661",
    "clientReference": "090565631230185003649552088420",
    "srcBank": "Passpoint",
    "srcAccountNumber": "90010000325",
    "eventType": "FUNDS_TRANSFER",
    "transactionId": "dd7f0e1c-c382-4015-8b47-315a1a1fa4d2",
    "destAccountName": "UCHEGBULEM KELECHI ",
    "paymentRef": "090551231230185003649552088420",
    "charges": 53.75,
    "destBank": "Sparkle",
    "merchantId": "90676942-e221-4f45-94cf-0c7eff979c11",
    "transactionAmount": 50000,
    "narration": "7787999898",
    "currency": "NGN",
    "status": "successful",
    "code": "00",
    "message": "Approved or completed successfully"
}'`;
    };

    const getCallbackResponse = () => {
        return `{
  "code": "00",
  "status": "successful",
  "message": "callback received successfully"
}`;
    };

    return (
        <div className="py-8 sm:py-10 space-y-16">

            {/* Hero */}
            <section>
                <div className="inline-flex items-center gap-2 bg-brand-50 dark:bg-brand-950/40 text-brand text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
                    <Webhook className="h-3.5 w-3.5" />
                    API Reference
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
                    Funds Transfer Callback Sample
                </h1>
                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl">
                    This endpoint receives callback notifications for fund transfer transactions. The callback is sent to your configured merchant callback URL.
                </p>
            </section>

            {/* How Fund Transfer Callbacks Work */}
            <section>
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <Webhook className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">How Fund Transfer Callbacks Work</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-6 max-w-2xl">
                    Passpoint processes payouts asynchronously. When the final status of a fund transfer is determined — whether successful or failed — Passpoint sends a POST request with the full transaction details to your configured callback URL. This is the primary mechanism for learning the definitive outcome of a transfer.
                </p>

                <div className="space-y-4">
                    {/* Delivery mechanics */}
                    <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-3">
                        <div className="flex items-center gap-2 mb-1">
                            <Info className="h-4 w-4 text-brand shrink-0" />
                            <h3 className="text-sm font-semibold text-foreground">Delivery mechanics</h3>
                        </div>
                        <ul className="space-y-2">
                            {[
                                "Passpoint sends one callback per status change — typically one for the final SUCCESSFUL or FAILED state.",
                                "Your endpoint must return HTTP 200 OK to acknowledge receipt. Any other status code (4xx, 5xx) or a timeout causes Passpoint to mark the delivery as failed.",
                                "Failed deliveries can be re-triggered manually via the Resend Single Webhook or Resend Bulk Webhook endpoints.",
                                "Configure your callback URL via your Passpoint merchant dashboard or the Global Callback Setup API.",
                            ].map((item) => (
                                <li key={item} className="flex items-start gap-2">
                                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand shrink-0" />
                                    <span className="text-xs text-muted-foreground">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Event types */}
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
                                        { field: "transactionId", desc: "Unique Passpoint transaction ID. Use this as an idempotency key — your handler must safely process duplicates." },
                                        { field: "clientReference", desc: "The reference you supplied when initiating the transfer. Use this to match the callback to your internal order or payment record." },
                                        { field: "eventType", desc: "FUNDS_TRANSFER for standard payouts. Check this to route the callback to the correct handler in your system." },
                                        { field: "status", desc: "Terminal status of the transfer: \"successful\" or \"failed\"." },
                                        { field: "code", desc: "Response code: \"00\" = successful, \"01\" = pending, \"02\" = failed." },
                                        { field: "transactionAmount", desc: "The original transfer amount in the specified currency." },
                                        { field: "charges", desc: "The fees deducted from your merchant balance for this transaction." },
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
                            <h3 className="text-sm font-semibold text-foreground">Idempotency — handle duplicates safely</h3>
                        </div>
                        <p className="text-xs text-muted-foreground">
                            The same callback may be delivered more than once — for example, after a manual webhook resend or a retry following a temporary failure. Your handler must be <strong className="text-foreground">idempotent</strong>: check whether a transaction with the given <code className="font-mono bg-muted px-1 py-0.5 rounded">transactionId</code> has already been processed and skip it if so. Never credit a wallet or fulfill an order twice based on the same transaction ID.
                        </p>
                    </div>

                    {/* Security */}
                    <div className="bg-muted/40 dark:bg-background/40 border border-border rounded-xl p-4 flex items-start gap-3">
                        <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                        <p className="text-xs text-muted-foreground">
                            <strong className="text-foreground">Always verify the signature header.</strong> Any internet-accessible callback URL can receive spoofed requests. The <code className="font-mono bg-muted px-1 py-0.5 rounded">signature</code> header is an HMAC-SHA512 hash of the raw request body using your callback secret. Reject any request where the computed signature does not match.
                        </p>
                    </div>
                </div>
            </section>

            {/* Signature Verification */}
            <section>
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <Webhook className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Signature verification</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
                    The <code className="bg-muted px-1.5 py-0.5 rounded text-xs">signature</code> header is sha512(callback_data) using the callback secret as the secret key. Always verify this before processing a callback.
                </p>

                <div className="space-y-4">
                    <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-5">
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">Example Java snippet</h4>
                            <CodeBlock>{getJavaSignatureExample()}</CodeBlock>
                        </div>
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
                    Passpoint POSTs the callback payload to your merchant callback URL. Your endpoint must return 200 OK to acknowledge receipt.
                </p>

                <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2 px-4 py-3 bg-muted/30 dark:bg-card/50 border border-border rounded-2xl">
                        <span className="px-2 py-0.5 rounded text-xs font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400">POST</span>
                        <code className="text-xs text-muted-foreground break-all">merchant_callback_url</code>
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
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Description</th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                <tr className="hover:bg-muted/20 transition-colors">
                                    <td className="px-5 py-3.5 font-mono text-xs text-foreground">signature</td>
                                    <td className="px-5 py-3.5 text-muted-foreground">SHA512 HMAC hash of callback data using your callback secret key</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-5">
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">Endpoint</h4>
                            <CodeBlock>{getCallbackEndpoint()}</CodeBlock>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">Request body</h4>
                            <CodeBlock language="json">{getCallbackRequestBody()}</CodeBlock>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">cURL example</h4>
                            <CodeBlock language="bash">{getCallbackCurlExample()}</CodeBlock>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">Response</h4>
                            <CodeBlock language="json">{getCallbackResponse()}</CodeBlock>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PayoutFundTransferCallbackSample;
