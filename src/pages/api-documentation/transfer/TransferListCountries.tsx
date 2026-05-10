import {Globe2, Info, Filter, ArrowRight, Database} from "lucide-react";
import CodeBlock from "@/components/CodeBlock.tsx";

const TransferListCountries = () => {
    const getEndpoint = () => `GET https://{{baseUrl}}/{{paymentContext}}/admin-app/country-list`;

    const getRequestExample = () => `curl --location 'https://{{baseUrl}}/{{paymentContext}}/admin-app/country-list?filter='`;

    return (
        <div className="py-8 sm:py-10 space-y-16">

            {/* Hero */}
            <section>
                <div className="inline-flex items-center gap-2 bg-brand-50 dark:bg-brand-950/40 text-brand text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
                    <Globe2 className="h-3.5 w-3.5" />
                    API Reference
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
                    List Countries
                </h1>
                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl">
                    Retrieve the list of supported countries for international transfers and mobile money
                    operations. Use the optional filter parameter to search for specific countries.
                </p>
            </section>

            {/* How Country Listing Works */}
            <section>
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <Globe2 className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">How Country Listing Works</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-6 max-w-2xl">
                    This endpoint returns all countries where Passpoint supports transfer operations  both outbound payouts and inbound collections. Use it as a preliminary check before initiating any international transfer to confirm the destination country is supported.
                </p>

                <div className="space-y-4">
                    {/* Filter parameter explanation */}
                    <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-4">
                        <div className="flex items-center gap-2 mb-1">
                            <Filter className="h-4 w-4 text-brand shrink-0" />
                            <h3 className="text-sm font-semibold text-foreground">The filter parameter</h3>
                        </div>
                        <p className="text-xs text-muted-foreground mb-3">
                            The <code className="font-mono bg-muted px-1.5 py-0.5 rounded">filter</code> query parameter controls which countries are returned based on the transfer direction:
                        </p>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-border">
                                        <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Value</th>
                                        <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Description</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    <tr className="hover:bg-muted/20 transition-colors">
                                        <td className="px-4 py-3"><span className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">"payout"</span></td>
                                        <td className="px-4 py-3 text-muted-foreground text-xs">Returns only countries that support outbound transfers (sending funds to recipients)</td>
                                    </tr>
                                    <tr className="hover:bg-muted/20 transition-colors">
                                        <td className="px-4 py-3"><span className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">"collection"</span></td>
                                        <td className="px-4 py-3 text-muted-foreground text-xs">Returns only countries that support inbound transfers (receiving funds from customers)</td>
                                    </tr>
                                    <tr className="hover:bg-muted/20 transition-colors">
                                        <td className="px-4 py-3"><span className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">(omitted)</span></td>
                                        <td className="px-4 py-3 text-muted-foreground text-xs">Returns all supported countries regardless of transfer direction</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Country code usage */}
                    <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-3">
                        <div className="flex items-center gap-2 mb-1">
                            <ArrowRight className="h-4 w-4 text-brand shrink-0" />
                            <h3 className="text-sm font-semibold text-foreground">Using countryCode in transfer requests</h3>
                        </div>
                        <p className="text-xs text-muted-foreground">
                            The <code className="font-mono bg-muted px-1.5 py-0.5 rounded">countryCode</code> field returned by this endpoint is in ISO 3-letter format (e.g., <code className="font-mono bg-muted px-1.5 py-0.5 rounded">NGA</code> for Nigeria, <code className="font-mono bg-muted px-1.5 py-0.5 rounded">GHA</code> for Ghana). This value is used directly in transfer initiation payloads to specify the destination or source country  do not use the 2-letter ISO code for this purpose.
                        </p>
                    </div>

                    {/* Caching guidance */}
                    <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-3">
                        <div className="flex items-center gap-2 mb-1">
                            <Database className="h-4 w-4 text-brand shrink-0" />
                            <h3 className="text-sm font-semibold text-foreground">Caching guidance</h3>
                        </div>
                        <p className="text-xs text-muted-foreground">
                            The supported countries list is relatively stable and does not change frequently. It is safe to call this endpoint at application startup and cache the result in memory for the duration of a session. However, do not hardcode the list  always fetch it dynamically so your integration automatically reflects any additions or removals without requiring a code change.
                        </p>
                    </div>

                    {/* Info callout */}
                    <div className="bg-muted/40 dark:bg-background/40 border border-border rounded-xl p-4 flex items-start gap-3">
                        <Info className="h-4 w-4 text-brand shrink-0 mt-0.5" />
                        <p className="text-xs text-muted-foreground">
                            Always call this endpoint before presenting a destination country selector in your UI. Filtering to only supported countries prevents users from selecting a destination that would result in a failed transfer.
                        </p>
                    </div>

                    {/* Response field table */}
                    <div className="bg-white dark:bg-card border border-border rounded-2xl overflow-hidden">
                        <div className="px-5 py-3 border-b border-border bg-muted/30">
                            <h4 className="text-sm font-semibold text-foreground">Response field reference</h4>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-border">
                                        <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Field</th>
                                        <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Type</th>
                                        <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Description</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    <tr className="hover:bg-muted/20 transition-colors">
                                        <td className="px-5 py-3.5"><span className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">countryName</span></td>
                                        <td className="px-5 py-3.5 text-muted-foreground text-xs">string</td>
                                        <td className="px-5 py-3.5 text-muted-foreground text-xs">Full display name of the country (e.g., "Nigeria", "Ghana")</td>
                                    </tr>
                                    <tr className="hover:bg-muted/20 transition-colors">
                                        <td className="px-5 py-3.5"><span className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">countryCode</span></td>
                                        <td className="px-5 py-3.5 text-muted-foreground text-xs">string</td>
                                        <td className="px-5 py-3.5 text-muted-foreground text-xs">ISO 3-letter country code (e.g., "NGA", "GHA"). Use this value in transfer request payloads.</td>
                                    </tr>
                                    <tr className="hover:bg-muted/20 transition-colors">
                                        <td className="px-5 py-3.5"><span className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">countryIso2Code</span></td>
                                        <td className="px-5 py-3.5 text-muted-foreground text-xs">string</td>
                                        <td className="px-5 py-3.5 text-muted-foreground text-xs">ISO 2-letter country code (e.g., "NG", "GH"). Useful for flag icons or locale libraries that use the 2-letter standard.</td>
                                    </tr>
                                    <tr className="hover:bg-muted/20 transition-colors">
                                        <td className="px-5 py-3.5"><span className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">supportedCurrencies</span></td>
                                        <td className="px-5 py-3.5 text-muted-foreground text-xs">string[]</td>
                                        <td className="px-5 py-3.5 text-muted-foreground text-xs">Array of currency codes available for transfers in this country (e.g., ["NGN"] or ["GHS", "USD"]). Use this to present valid currency options to users.</td>
                                    </tr>
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
                        <Globe2 className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">List countries</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
                    Get a comprehensive list of countries where Passpoint services are available.
                </p>

                <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2 px-4 py-3 bg-muted/30 dark:bg-card/50 border border-border rounded-2xl">
                        <span className="px-2 py-0.5 rounded text-xs font-semibold bg-brand-50 text-brand dark:bg-brand-950/40 dark:text-brand/80">GET</span>
                        <code className="text-xs text-muted-foreground break-all">
                            https://{"{{baseUrl}}"}/{"{{paymentContext}}"}/admin-app/country-list
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
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Description</th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                <tr className="hover:bg-muted/20 transition-colors">
                                    <td className="px-5 py-3.5 font-mono text-xs text-foreground">filter</td>
                                    <td className="px-5 py-3.5 text-muted-foreground">Optional search filter for country name or code</td>
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
                            <CodeBlock language="bash">{getRequestExample()}</CodeBlock>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default TransferListCountries;
