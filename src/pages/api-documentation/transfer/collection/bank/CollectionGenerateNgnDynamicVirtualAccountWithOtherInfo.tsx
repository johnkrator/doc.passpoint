import {Link2, Info, Globe} from "lucide-react";
import CodeBlock from "@/components/CodeBlock.tsx";

const CollectionGenerateNgnDynamicVirtualAccountWithOtherInfo = () => {
    const getEndpoint = () => `POST https://{{baseUrl}}/{{paymentContext}}/ft-app/generate-virtual-account?type=dynamic`;

    const getRequestBody = () => `{
    "narration": "payment for services 12",
    "accountName": "Johnny Jones",
    "email": "client@gmail.com",
    "phoneNumber": "08030000000",
    "amount": "1000",
    "otherInfo": {
        "callbackUrl": "http://localhost.com/"
    }
}`;

    const getCurlRequest = () => `curl --location 'https://{{baseUrl}}/{{paymentContext}}/ft-app/generate-virtual-account?type=dynamic'
--header 'x-channel-id: CHANNEL_ID'
--header 'x-channel-code: CHANNEL_CODE'
--header 'x-merchant-id: YOUR_MERCHANT_ID'
--data-raw '{
    "narration": "payment for services 12",
    "accountName": "Johnny Jones",
    "email": "client@gmail.com",
    "phoneNumber": "08030000000",
    "amount": "1000",
    "otherInfo": {
        "callbackUrl": "http://localhost.com/"
    }
}'`;

    const getResponse = () => `{
  "responseCode": "00",
  "responseDescription": "Successful",
  "responseMessage": "virtual account has been created successfully",
  "data": {
    "accountName": "John Benson",
    "accountNumber": "0185487837",
    "bankName": "9 Payment Service Bank",
    "bankCode": "120001",
    "transactionReference": "string",
    "dynamic": true,
    "active": false
  }
}`;

    return (
        <div className="py-8 sm:py-10 space-y-16">

            {/* Hero */}
            <section>
                <div className="inline-flex items-center gap-2 bg-brand-50 dark:bg-brand-950/40 text-brand text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
                    <Link2 className="h-3.5 w-3.5" />
                    API Reference
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
                    Generate NGN Dynamic Virtual Account — With Other Info
                </h1>
                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl">
                    Generate a temporary NGN virtual account with additional callback configuration for webhook
                    notifications when payments are received.
                </p>
            </section>

            {/* How Per-Request Callback Override Works */}
            <section>
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <Globe className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">How Per-Request Callback Override Works</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-6 max-w-2xl">
                    This variant of dynamic virtual account generation allows you to specify a custom <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">callbackUrl</code> per transaction via the <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">otherInfo</code> object. When payment is received, Passpoint will POST to that specific URL instead of your globally configured callback URL.
                </p>

                <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-5">

                    {/* How the override works */}
                    <div>
                        <h3 className="text-base font-semibold text-foreground mb-3">How the callback override works</h3>
                        <div className="space-y-2">
                            {[
                                { title: "Transaction-scoped override", desc: "The otherInfo.callbackUrl overrides your global callback URL setting for this transaction only. Other transactions continue to use the global URL." },
                                { title: "Falls back to global if omitted", desc: "If callbackUrl is not provided in otherInfo, Passpoint falls back to the global callback URL configured in your account settings." },
                                { title: "Same payload, different destination", desc: "The webhook payload structure is identical to a standard Wallet Credit Callback — only the delivery destination changes." },
                            ].map(({ title, desc }) => (
                                <div key={title} className="flex items-start gap-3 px-4 py-3 bg-muted/30 dark:bg-background/30 border border-border rounded-xl">
                                    <Link2 className="h-4 w-4 text-brand shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-xs font-semibold text-foreground">{title}</p>
                                        <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Use cases */}
                    <div>
                        <h3 className="text-base font-semibold text-foreground mb-3">Common use cases</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {[
                                { label: "Multi-tenant marketplace", desc: "Route each merchant's payment notification directly to their own endpoint." },
                                { label: "Per-product routing", desc: "Send specific payment types (subscriptions vs. one-offs) to different internal services." },
                                { label: "Webhook endpoint testing", desc: "Test a new callback URL on live transactions without changing your global configuration." },
                                { label: "Staged migration", desc: "Gradually migrate transactions to a new webhook handler while keeping the old one active." },
                            ].map(({ label, desc }) => (
                                <div key={label} className="px-4 py-3 bg-muted/30 dark:bg-background/30 border border-border rounded-xl">
                                    <p className="text-xs font-semibold text-foreground">{label}</p>
                                    <p className="text-xs text-muted-foreground mt-1">{desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-muted/40 dark:bg-background/40 border border-border rounded-xl p-4 flex items-start gap-3">
                        <Info className="h-4 w-4 text-brand shrink-0 mt-0.5" />
                        <p className="text-xs text-muted-foreground">
                            The <code className="bg-muted px-1 py-0.5 rounded">otherInfo.callbackUrl</code> must be a publicly accessible HTTPS endpoint. Passpoint will not deliver callbacks to localhost or non-HTTPS URLs in production. Ensure the endpoint responds with HTTP 200 to acknowledge receipt.
                        </p>
                    </div>
                </div>
            </section>

            {/* API Endpoint */}
            <section>
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <Link2 className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Generate dynamic virtual account with callback</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
                    Create a dynamic virtual account with a custom callback URL for payment notifications.
                </p>

                <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2 px-4 py-3 bg-muted/30 dark:bg-card/50 border border-border rounded-2xl">
                        <span className="px-2 py-0.5 rounded text-xs font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400">POST</span>
                        <code className="text-xs text-muted-foreground break-all">
                            https://{"{{baseUrl}}"}/{"{{paymentContext}}"}/ft-app/generate-virtual-account?type=dynamic
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
                                    <td className="px-5 py-3.5 text-muted-foreground">3</td>
                                </tr>
                                <tr className="hover:bg-muted/20 transition-colors">
                                    <td className="px-5 py-3.5 font-mono text-xs text-foreground">x-channel-code</td>
                                    <td className="px-5 py-3.5 text-muted-foreground">legacy-api-user</td>
                                </tr>
                                <tr className="hover:bg-muted/20 transition-colors">
                                    <td className="px-5 py-3.5 font-mono text-xs text-foreground">x-merchant-id</td>
                                    <td className="px-5 py-3.5 text-muted-foreground">your-merchant-id</td>
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
                            <h4 className="text-sm font-medium text-foreground mb-3">Response</h4>
                            <CodeBlock language="json">{getResponse()}</CodeBlock>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CollectionGenerateNgnDynamicVirtualAccountWithOtherInfo;
