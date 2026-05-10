import {Settings, Webhook, ShieldCheck, Info, AlertTriangle} from "lucide-react";
import CodeBlock from "@/components/CodeBlock.tsx";

const UpdateCardCallbackDetails = () => {
    const endpointCode = () => `POST https://{{baseUrl}}/{{cardContext}}/update-callback-details`;
    const requestBodyCode = () => `{
    "secret": "11111",
    "url": "https://webhook.site/29a086d9-4259-43a2-a40c-1d9304701745"
}`;
    const curlCode = () => `curl --location 'https://{{baseUrl}}/{{cardContext}}/update-callback-details'
--header 'x-channel-id: CHANNEL_ID'
--header 'x-channel-code: CHANNEL_CODE'
--header 'x-merchant-id: YOUR_MERCHANT_ID'
--data '{
    "secret": "11111",
    "url": "https://webhook.site/29a086d9-4259-43a2-a40c-1d9304701745"
}'`;
    const responseCode = () => `No response body
This request doesn't return any response body`;

    return (
        <div className="py-8 sm:py-10 space-y-16">

            {/* Hero */}
            <section>
                <div className="inline-flex items-center gap-2 bg-brand-50 dark:bg-brand-950/40 text-brand text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
                    <Settings className="h-3.5 w-3.5" />
                    API Reference
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
                    Update Card Callback Details
                </h1>
                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl">
                    Update the webhook URL and secret for card event callbacks.
                </p>
            </section>

            {/* How Callback Configuration Works */}
            <section>
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <Webhook className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">How Callback Configuration Works</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-6 max-w-2xl">
                    Passpoint delivers card event notifications  such as transaction authorizations, settlements, chargebacks, and status changes  by sending a POST request to your configured webhook URL. This endpoint lets you register or update both the destination URL and an optional secret used to verify payload authenticity.
                </p>

                <div className="space-y-4">
                    {/* Webhook URL */}
                    <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-3">
                        <div className="flex items-center gap-2 mb-1">
                            <Webhook className="h-4 w-4 text-brand shrink-0" />
                            <h3 className="text-sm font-semibold text-foreground">Webhook URL</h3>
                        </div>
                        <p className="text-xs text-muted-foreground">
                            The <code className="font-mono bg-muted px-1.5 py-0.5 rounded">url</code> field must be a publicly reachable HTTPS endpoint on your server. Passpoint will POST card event payloads to this URL. Your endpoint must respond with HTTP <code className="font-mono bg-muted px-1 py-0.5 rounded">200 OK</code> within the timeout window to acknowledge receipt. Non-2xx responses are treated as delivery failures and Passpoint will retry.
                        </p>
                        <ul className="space-y-2 mt-2">
                            {[
                                "Must use HTTPS  plain HTTP endpoints will be rejected.",
                                "Must be publicly reachable. Private or localhost URLs will not receive callbacks.",
                                "Should respond within 10 seconds. Long-running processing should be offloaded to a background queue.",
                            ].map((item) => (
                                <li key={item} className="flex items-start gap-2">
                                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand shrink-0" />
                                    <span className="text-xs text-muted-foreground">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Secret and HMAC signing */}
                    <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-3">
                        <div className="flex items-center gap-2 mb-1">
                            <ShieldCheck className="h-4 w-4 text-brand shrink-0" />
                            <h3 className="text-sm font-semibold text-foreground">Secret and HMAC-SHA512 signature verification</h3>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">
                            When a <code className="font-mono bg-muted px-1.5 py-0.5 rounded">secret</code> is set, Passpoint signs every callback payload using HMAC-SHA512 with your secret as the key and includes the resulting hash in the <code className="font-mono bg-muted px-1.5 py-0.5 rounded">signature</code> request header. Verify this signature on every incoming callback to confirm the payload originated from Passpoint and was not tampered with.
                        </p>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-border">
                                        <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Step</th>
                                        <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">What to do</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    {[
                                        { step: "1", action: "Store your secret securely in an environment variable  never hardcode it in source code." },
                                        { step: "2", action: "On each incoming callback, read the `signature` header from the request." },
                                        { step: "3", action: "Compute HMAC-SHA512 of the raw request body using your secret as the key." },
                                        { step: "4", action: "Compare your computed hash with the received signature. If they match, the payload is authentic. Reject mismatches." },
                                    ].map(({ step, action }) => (
                                        <tr key={step} className="hover:bg-muted/20 transition-colors">
                                            <td className="px-4 py-3 text-xs font-semibold text-brand">{step}</td>
                                            <td className="px-4 py-3 text-muted-foreground text-xs">{action}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* When to call this endpoint */}
                    <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-3">
                        <div className="flex items-center gap-2 mb-1">
                            <Info className="h-4 w-4 text-brand shrink-0" />
                            <h3 className="text-sm font-semibold text-foreground">When to call this endpoint</h3>
                        </div>
                        <ul className="space-y-2">
                            {[
                                "During initial integration setup  to register your webhook URL before issuing any cards.",
                                "When rotating your callback secret for security  update the secret periodically as part of your key rotation policy.",
                                "When migrating to a new server or endpoint URL  update before decommissioning the old URL to avoid missed events.",
                                "When adding or removing signature verification  set or clear the secret field as needed.",
                            ].map((item) => (
                                <li key={item} className="flex items-start gap-2">
                                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand shrink-0" />
                                    <span className="text-xs text-muted-foreground">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Security warning */}
                    <div className="bg-muted/40 dark:bg-background/40 border border-border rounded-xl p-4 flex items-start gap-3">
                        <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                        <p className="text-xs text-muted-foreground">
                            <strong className="text-foreground">Treat your callback secret like a password.</strong> Anyone who obtains your secret can forge valid-looking callback payloads. Store it in a secrets manager or environment variable  never in version control. Rotate it immediately if you suspect it has been compromised.
                        </p>
                    </div>
                </div>
            </section>

            {/* API Endpoint */}
            <section>
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <Settings className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Update callback</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
                    Set the merchant webhook URL and an optional secret for HMAC-SHA512 signature verification.
                </p>

                <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2 px-4 py-3 bg-muted/30 dark:bg-card/50 border border-border rounded-2xl">
                        <span className="px-2 py-0.5 rounded text-xs font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400">POST</span>
                        <code className="text-xs text-muted-foreground break-all">
                            https://{"{{baseUrl}}"}/{"{{cardContext}}"}/update-callback-details
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
                                    <td className="px-5 py-3.5 text-muted-foreground">Basic &lt;username&gt;:&lt;password&gt;</td>
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
                            <CodeBlock language="text">{responseCode()}</CodeBlock>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default UpdateCardCallbackDetails;
