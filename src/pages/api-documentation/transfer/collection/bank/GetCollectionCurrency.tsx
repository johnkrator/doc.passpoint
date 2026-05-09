import {Globe, Info, CheckCircle2} from "lucide-react";
import CodeBlock from "@/components/CodeBlock.tsx";

const GetCollectionCurrency = () => {
    const getEndpoint = () => `GET https://{{baseUrl}}/{{paymentContext}}/ft-app/currency-list/bank?type=collection`;

    const getCurlRequest = () => `curl --location 'https://{{baseUrl}}/{{paymentContext}}/ft-app/currency-list/bank?type=collection'
--header 'x-merchant-id: YOUR_MERCHANT_ID'
--header 'x-channel-id: CHANNEL_ID'
--header 'x-channel-code: CHANNEL_CODE'`;

    const getResponse = () => `{
  "responseCode": "00",
  "responseDescription": "Successful",
  "responseMessage": "1 payout currency(ies) found.",
  "count": 1,
  "data": [
    {
      "name": "Nigerian Naira",
      "code": "NGN",
      "currencyType": "FIAT",
      "countryCode": "NG",
      "logoUrl": "https://asset.mypasspoint.com/img/payoutCurrency/NGN.png"
    }
  ]
}`;

    return (
        <div className="py-8 sm:py-10 space-y-16">

            {/* Hero */}
            <section>
                <div className="inline-flex items-center gap-2 bg-brand-50 dark:bg-brand-950/40 text-brand text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
                    <Globe className="h-3.5 w-3.5" />
                    API Reference
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
                    Get Collection Currency
                </h1>
                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl">
                    List available collection currencies for bank transfers and virtual account generation.
                </p>
            </section>

            {/* How Collection Currency Lookup Works */}
            <section>
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <CheckCircle2 className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">How Collection Currency Lookup Works</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-6 max-w-2xl">
                    This is <strong className="text-foreground">Step 1</strong> before generating any virtual account. Call this endpoint first to confirm which currencies Passpoint supports for bank collection under your account. The currency code returned here determines which virtual account type (NGN, USD, etc.) you can generate.
                </p>

                <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-5">

                    {/* What it returns */}
                    <div>
                        <h3 className="text-base font-semibold text-foreground mb-3">What this endpoint returns</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {[
                                { code: "NGN", label: "Nigerian Naira", note: "Standard NGN virtual accounts (static & dynamic)" },
                                { code: "USD", label: "US Dollar", note: "USD virtual account options where supported" },
                            ].map(({ code, label, note }) => (
                                <div key={code} className="flex items-start gap-3 px-4 py-3 bg-muted/30 dark:bg-background/30 border border-border rounded-xl">
                                    <CheckCircle2 className="h-4 w-4 text-brand shrink-0 mt-0.5" />
                                    <div>
                                        <span className="font-mono text-xs font-semibold text-foreground">{code}</span>
                                        <span className="text-xs text-muted-foreground ml-2">— {label}</span>
                                        <p className="text-xs text-muted-foreground mt-0.5">{note}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Response fields */}
                    <div>
                        <h3 className="text-base font-semibold text-foreground mb-3">Response field reference</h3>
                        <div className="overflow-x-auto border border-border rounded-xl">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-border bg-muted/30">
                                        <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Field</th>
                                        <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Description</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    <tr className="hover:bg-muted/20 transition-colors">
                                        <td className="px-5 py-3.5 font-mono text-xs text-foreground">currencyType</td>
                                        <td className="px-5 py-3.5 text-xs text-muted-foreground"><code className="bg-muted px-1 py-0.5 rounded">FIAT</code> or <code className="bg-muted px-1 py-0.5 rounded">CRYPTO</code>. Use this to group or filter currencies in your UI.</td>
                                    </tr>
                                    <tr className="hover:bg-muted/20 transition-colors">
                                        <td className="px-5 py-3.5 font-mono text-xs text-foreground">countryCode</td>
                                        <td className="px-5 py-3.5 text-xs text-muted-foreground">The 2-letter ISO code of the country where this currency operates (e.g., <code className="bg-muted px-1 py-0.5 rounded">NG</code> for Nigeria).</td>
                                    </tr>
                                    <tr className="hover:bg-muted/20 transition-colors">
                                        <td className="px-5 py-3.5 font-mono text-xs text-foreground">active</td>
                                        <td className="px-5 py-3.5 text-xs text-muted-foreground">Whether this currency is enabled for your account. Only generate virtual accounts for currencies where <code className="bg-muted px-1 py-0.5 rounded">active: true</code>.</td>
                                    </tr>
                                    <tr className="hover:bg-muted/20 transition-colors">
                                        <td className="px-5 py-3.5 font-mono text-xs text-foreground">code</td>
                                        <td className="px-5 py-3.5 text-xs text-muted-foreground">The currency code (e.g., <code className="bg-muted px-1 py-0.5 rounded">NGN</code>). Use this to determine which virtual account generation endpoint to call next.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="bg-muted/40 dark:bg-background/40 border border-border rounded-xl p-4 flex items-start gap-3">
                        <Info className="h-4 w-4 text-brand shrink-0 mt-0.5" />
                        <p className="text-xs text-muted-foreground">
                            Use this endpoint to dynamically determine which virtual account types you can generate. This ensures your integration gracefully adapts if Passpoint adds new supported currencies or disables existing ones for your account.
                        </p>
                    </div>
                </div>
            </section>

            {/* API Endpoint */}
            <section>
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <Globe className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Get collection currency</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
                    Retrieve the list of supported currencies for collection operations.
                </p>

                <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2 px-4 py-3 bg-muted/30 dark:bg-card/50 border border-border rounded-2xl">
                        <span className="px-2 py-0.5 rounded text-xs font-semibold bg-brand-50 text-brand dark:bg-brand-950/40 dark:text-brand/80">GET</span>
                        <code className="text-xs text-muted-foreground break-all">
                            https://{"{{baseUrl}}"}/{"{{paymentContext}}"}/ft-app/currency-list/bank?type=collection
                        </code>
                    </div>

                    <div className="bg-white dark:bg-card border border-border rounded-2xl overflow-hidden">
                        <div className="px-5 py-3 border-b border-border bg-muted/30">
                            <h4 className="text-sm font-semibold text-foreground">Query parameters</h4>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                <tr className="border-b border-border">
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Parameter</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Value</th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                <tr className="hover:bg-muted/20 transition-colors">
                                    <td className="px-5 py-3.5 font-mono text-xs text-foreground">type</td>
                                    <td className="px-5 py-3.5 text-muted-foreground">collection</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
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
                                    <td className="px-5 py-3.5 font-mono text-xs text-foreground">x-merchant-id</td>
                                    <td className="px-5 py-3.5 text-muted-foreground">your-merchant-id</td>
                                </tr>
                                <tr className="hover:bg-muted/20 transition-colors">
                                    <td className="px-5 py-3.5 font-mono text-xs text-foreground">x-channel-id</td>
                                    <td className="px-5 py-3.5 text-muted-foreground">2</td>
                                </tr>
                                <tr className="hover:bg-muted/20 transition-colors">
                                    <td className="px-5 py-3.5 font-mono text-xs text-foreground">x-channel-code</td>
                                    <td className="px-5 py-3.5 text-muted-foreground">passpoint-merchant-user</td>
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

export default GetCollectionCurrency;
