import {Network, Info, ArrowRight} from "lucide-react";
import CodeBlock from "@/components/CodeBlock.tsx";

const GetMomoCollectionNetwork = () => {
    const getEndpointCode = () => {
        return `GET https://{{baseUrl}}/{{paymentContext}}/momo-app/momo-networks/{currencyCode}?type=collection&countryCode={countryCode}`;
    };

    const getCurlCode = () => {
        return `curl --location 'https://{{baseUrl}}/{{paymentContext}}/momo-app/momo-networks/XAF?type=collection&countryCode=CM'
--header 'Authorization: Bearer YOUR_ACCESS_TOKEN'`;
    };

    return (
        <div className="py-8 sm:py-10 space-y-16">

            {/* Hero */}
            <section>
                <div className="inline-flex items-center gap-2 bg-brand-50 dark:bg-brand-950/40 text-brand text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
                    <Network className="h-3.5 w-3.5" />
                    API Reference
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
                    Get Momo Collection Network
                </h1>
                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl">
                    List all mobile money networks available for collection in a specific currency and country corridor. Use the returned service codes when initiating a momo collection request.
                </p>
            </section>

            {/* How MoMo Network Lookup Works */}
            <section>
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <ArrowRight className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">How MoMo Network Lookup Works</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-6 max-w-2xl">
                    This is <strong className="text-foreground">Step 2</strong> of the MoMo collection flow. Once you have a currency code from Step 1 (Get MoMo Collection Currency), call this endpoint to discover all mobile money networks available for that currency. The <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">serviceCode</code> returned here is a required field in the MoMo Request to Pay call.
                </p>

                <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-5">

                    {/* Path parameter note */}
                    <div>
                        <h3 className="text-base font-semibold text-foreground mb-3">Path parameter</h3>
                        <div className="overflow-x-auto border border-border rounded-xl">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-border bg-muted/30">
                                        <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Parameter</th>
                                        <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Notes</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    <tr className="hover:bg-muted/20 transition-colors">
                                        <td className="px-5 py-3.5 font-mono text-xs text-foreground">{"{currency}"}</td>
                                        <td className="px-5 py-3.5 text-xs text-muted-foreground">Must be one of the currency codes returned by Get MoMo Collection Currency (e.g., <code className="bg-muted px-1 py-0.5 rounded">GHS</code>, <code className="bg-muted px-1 py-0.5 rounded">KES</code>). Passing an unsupported code will return an empty or error response.</td>
                                    </tr>
                                    <tr className="hover:bg-muted/20 transition-colors">
                                        <td className="px-5 py-3.5 font-mono text-xs text-foreground">countryCode</td>
                                        <td className="px-5 py-3.5 text-xs text-muted-foreground">2-letter ISO 3166-1 alpha-2 country code (e.g., <code className="bg-muted px-1 py-0.5 rounded">GH</code> for Ghana, <code className="bg-muted px-1 py-0.5 rounded">KE</code> for Kenya, <code className="bg-muted px-1 py-0.5 rounded">UG</code> for Uganda).</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Response field reference */}
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
                                        <td className="px-5 py-3.5 font-mono text-xs text-foreground">serviceCode</td>
                                        <td className="px-5 py-3.5 text-xs text-muted-foreground"><strong className="text-foreground">Network identifier.</strong> Pass this value as <code className="bg-muted px-1 py-0.5 rounded">serviceCode</code> in the MoMo Request to Pay call. Without it, you cannot initiate collection.</td>
                                    </tr>
                                    <tr className="hover:bg-muted/20 transition-colors">
                                        <td className="px-5 py-3.5 font-mono text-xs text-foreground">serviceName</td>
                                        <td className="px-5 py-3.5 text-xs text-muted-foreground">Human-readable display name of the mobile money network (e.g., "MTN Ghana"). Use this in your UI to let customers choose their network.</td>
                                    </tr>
                                    <tr className="hover:bg-muted/20 transition-colors">
                                        <td className="px-5 py-3.5 font-mono text-xs text-foreground">countryCode</td>
                                        <td className="px-5 py-3.5 text-xs text-muted-foreground">2-letter ISO code of the country this network operates in.</td>
                                    </tr>
                                    <tr className="hover:bg-muted/20 transition-colors">
                                        <td className="px-5 py-3.5 font-mono text-xs text-foreground">currencyCode</td>
                                        <td className="px-5 py-3.5 text-xs text-muted-foreground">Currency used by this network. Should match the currency you queried.</td>
                                    </tr>
                                    <tr className="hover:bg-muted/20 transition-colors">
                                        <td className="px-5 py-3.5 font-mono text-xs text-foreground">active</td>
                                        <td className="px-5 py-3.5 text-xs text-muted-foreground">Whether this network is currently available for collection. Only present networks where <code className="bg-muted px-1 py-0.5 rounded">active: true</code> to end users.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Response example */}
                    <div>
                        <h4 className="text-sm font-medium text-foreground mb-3">Response example (GHS)</h4>
                        <CodeBlock language="json">{`{
  "responseCode": "00",
  "responseDescription": "Successful",
  "responseMessage": "Networks found",
  "data": [
    {
      "serviceCode": "MTN_GH",
      "serviceName": "MTN Ghana",
      "countryCode": "GH",
      "currencyCode": "GHS",
      "active": true
    },
    {
      "serviceCode": "AIRTEL_GH",
      "serviceName": "Airtel Ghana",
      "countryCode": "GH",
      "currencyCode": "GHS",
      "active": true
    }
  ]
}`}</CodeBlock>
                    </div>

                    {/* Callout */}
                    <div className="bg-muted/40 dark:bg-background/40 border border-border rounded-xl p-4 flex items-start gap-3">
                        <Info className="h-4 w-4 text-brand shrink-0 mt-0.5" />
                        <p className="text-xs text-muted-foreground">
                            Without completing this step, you cannot know which networks are available for your chosen currency. Always retrieve available networks before presenting payment options to your customer, and only show networks where <code className="bg-muted px-1 py-0.5 rounded">active</code> is <code className="bg-muted px-1 py-0.5 rounded">true</code>.
                        </p>
                    </div>
                </div>
            </section>

            {/* API Endpoint */}
            <section>
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <Network className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Get collection network</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
                    Retrieve supported networks for a specific currency and country combination.
                </p>

                <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2 px-4 py-3 bg-muted/30 dark:bg-card/50 border border-border rounded-2xl">
                        <span className="px-2 py-0.5 rounded text-xs font-semibold bg-brand-50 text-brand dark:bg-brand-950/40 dark:text-brand/80">GET</span>
                        <code className="text-xs text-muted-foreground break-all">
                            https://{"{{baseUrl}}"}/{"{{paymentContext}}"}/momo-app/momo-networks/{"{currencyCode}"}?type=collection&amp;countryCode={"{countryCode}"}
                        </code>
                    </div>

                    <div className="bg-white dark:bg-card border border-border rounded-2xl overflow-hidden">
                        <div className="px-5 py-3 border-b border-border bg-muted/30">
                            <h4 className="text-sm font-semibold text-foreground">Path parameters</h4>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                <tr className="border-b border-border">
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Parameter</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Type</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Description</th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                <tr className="hover:bg-muted/20 transition-colors">
                                    <td className="px-5 py-3.5 font-mono text-xs text-foreground">currencyCode</td>
                                    <td className="px-5 py-3.5 text-muted-foreground">string</td>
                                    <td className="px-5 py-3.5 text-muted-foreground">Currency code (e.g., XAF, KES, UGX)</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
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
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Type</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Description</th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                <tr className="hover:bg-muted/20 transition-colors">
                                    <td className="px-5 py-3.5 font-mono text-xs text-foreground">type</td>
                                    <td className="px-5 py-3.5 text-muted-foreground">string</td>
                                    <td className="px-5 py-3.5 text-muted-foreground">Transaction type  value: <code className="bg-muted px-1.5 py-0.5 rounded text-xs">collection</code></td>
                                </tr>
                                <tr className="hover:bg-muted/20 transition-colors">
                                    <td className="px-5 py-3.5 font-mono text-xs text-foreground">countryCode</td>
                                    <td className="px-5 py-3.5 text-muted-foreground">string</td>
                                    <td className="px-5 py-3.5 text-muted-foreground">ISO 3166-1 alpha-2 country code (e.g., CM)</td>
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
                                    <td className="px-5 py-3.5 font-mono text-xs text-foreground">Authorization</td>
                                    <td className="px-5 py-3.5 text-muted-foreground">Bearer YOUR_ACCESS_TOKEN</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-5">
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">Endpoint</h4>
                            <CodeBlock>{getEndpointCode()}</CodeBlock>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">cURL example</h4>
                            <CodeBlock language="bash">{getCurlCode()}</CodeBlock>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default GetMomoCollectionNetwork;
