import {Globe, Info, ArrowRight, CheckCircle2} from "lucide-react";
import CodeBlock from "@/components/CodeBlock.tsx";

const GetMomoCollectionCurrency = () => {
    const getEndpointCode = () => {
        return `GET https://{{baseUrl}}/{{paymentContext}}/ft-app/currency-list/momo?type=collection`;
    };

    const getCurlCode = () => {
        return `curl --location 'https://{{baseUrl}}/{{paymentContext}}/ft-app/currency-list/momo?type=collection'`;
    };

    const getResponseCode = () => {
        return `{
  "responseCode": "00",
  "responseDescription": "Successful",
  "responseMessage": "8 payout currency(ies) found.",
  "count": 8,
  "data": [
    {
      "name": "Central African CFA Franc",
      "code": "XAF",
      "momoPayoutEnabled": true,
      "bankPayoutEnabled": false,
      "active": true,
      "countryCode": "",
      "countryIso3Code": "XAF",
      "logoUrl": "https://asset.mypasspoint.com/img/payoutCurrency/XAF.png"
    },
    {
      "name": "Congolese Franc",
      "code": "CDF",
      "momoPayoutEnabled": true,
      "bankPayoutEnabled": false,
      "active": true,
      "countryCode": "CD",
      "logoUrl": "https://asset.mypasspoint.com/img/payoutCurrency/CUR.png"
    },
    {
      "name": "Kenyan Shillings",
      "code": "KES",
      "momoPayoutEnabled": true,
      "bankPayoutEnabled": false,
      "active": true,
      "countryCode": "KE",
      "logoUrl": "https://asset.mypasspoint.com/img/payoutCurrency/KES.png"
    },
    {
      "name": "South African Rand",
      "code": "ZAR",
      "momoPayoutEnabled": true,
      "bankPayoutEnabled": false,
      "active": true,
      "countryCode": "SA",
      "logoUrl": "https://asset.mypasspoint.com/img/payoutCurrency/ZAR.png"
    },
    {
      "name": "Tanzanian Shillings",
      "code": "TZS",
      "momoPayoutEnabled": true,
      "bankPayoutEnabled": false,
      "active": true,
      "countryCode": "TZ",
      "logoUrl": "https://asset.mypasspoint.com/img/payoutCurrency/TZS.png"
    },
    {
      "name": "Ugandan Shillings",
      "code": "UGX",
      "momoPayoutEnabled": true,
      "bankPayoutEnabled": false,
      "active": true,
      "countryCode": "UG",
      "logoUrl": "https://asset.mypasspoint.com/img/payoutCurrency/UGX.png"
    },
    {
      "name": "West African CFA Franc",
      "code": "XOF",
      "momoPayoutEnabled": true,
      "bankPayoutEnabled": false,
      "active": true,
      "countryCode": "",
      "countryIso3Code": "XOF",
      "logoUrl": "https://asset.mypasspoint.com/img/payoutCurrency/XOF.png"
    },
    {
      "name": "Zambian Kwacha",
      "code": "ZMW",
      "momoPayoutEnabled": true,
      "bankPayoutEnabled": false,
      "active": true,
      "countryCode": "ZM",
      "logoUrl": "https://asset.mypasspoint.com/img/payoutCurrency/ZMW.png"
    }
  ]
}`;
    };

    return (
        <div className="py-8 sm:py-10 space-y-16">

            {/* Hero */}
            <section>
                <div className="inline-flex items-center gap-2 bg-brand-50 dark:bg-brand-950/40 text-brand text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
                    <Globe className="h-3.5 w-3.5" />
                    API Reference
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
                    Get Momo Collection Currency
                </h1>
                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl">
                    List all mobile money currencies available for collection. Returns supported currencies with their country codes, logo URLs, and capability flags.
                </p>
            </section>

            {/* How MoMo Collection Currency Works */}
            <section>
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <ArrowRight className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">How MoMo Collection Currency Works</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-6 max-w-2xl">
                    This is <strong className="text-foreground">Step 1</strong> of the MoMo collection (inbound payment) flow. Before you can accept a mobile money payment, you must retrieve the list of currencies that Passpoint supports for collection. The currency code you obtain here is passed directly into the <strong className="text-foreground">Get MoMo Collection Network</strong> call in Step 2.
                </p>

                <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-5">

                    {/* Supported currencies */}
                    <div>
                        <h3 className="text-base font-semibold text-foreground mb-3">Commonly supported currencies</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {[
                                { code: "GHS", label: "Ghanaian Cedi", country: "Ghana" },
                                { code: "KES", label: "Kenyan Shilling", country: "Kenya" },
                                { code: "UGX", label: "Ugandan Shilling", country: "Uganda" },
                                { code: "ZMW", label: "Zambian Kwacha", country: "Zambia" },
                            ].map(({ code, label, country }) => (
                                <div key={code} className="flex items-center gap-3 px-4 py-3 bg-muted/30 dark:bg-background/30 border border-border rounded-xl">
                                    <CheckCircle2 className="h-4 w-4 text-brand shrink-0" />
                                    <div>
                                        <span className="font-mono text-xs font-semibold text-foreground">{code}</span>
                                        <span className="text-xs text-muted-foreground ml-2"> {label} ({country})</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <p className="text-xs text-muted-foreground mt-3">
                            The full list of active currencies is returned dynamically by the API and may differ based on your account configuration.
                        </p>
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
                                        <td className="px-5 py-3.5 font-mono text-xs text-foreground">momoPayoutEnabled</td>
                                        <td className="px-5 py-3.5 text-xs text-muted-foreground">Whether you can <strong className="text-foreground">send</strong> to mobile wallets in this currency (outbound payout).</td>
                                    </tr>
                                    <tr className="hover:bg-muted/20 transition-colors">
                                        <td className="px-5 py-3.5 font-mono text-xs text-foreground">momoCollectionEnabled</td>
                                        <td className="px-5 py-3.5 text-xs text-muted-foreground">Whether you can <strong className="text-foreground">receive</strong> from mobile wallets in this currency (inbound collection).</td>
                                    </tr>
                                    <tr className="hover:bg-muted/20 transition-colors">
                                        <td className="px-5 py-3.5 font-mono text-xs text-foreground">bankPayoutEnabled</td>
                                        <td className="px-5 py-3.5 text-xs text-muted-foreground">Whether bank payouts are also available for this currency.</td>
                                    </tr>
                                    <tr className="hover:bg-muted/20 transition-colors">
                                        <td className="px-5 py-3.5 font-mono text-xs text-foreground">active</td>
                                        <td className="px-5 py-3.5 text-xs text-muted-foreground">Whether this currency is currently enabled for your account. Only show currencies where <code className="bg-muted px-1 py-0.5 rounded">active: true</code> to end users.</td>
                                    </tr>
                                    <tr className="hover:bg-muted/20 transition-colors">
                                        <td className="px-5 py-3.5 font-mono text-xs text-foreground">countryIso3Code</td>
                                        <td className="px-5 py-3.5 text-xs text-muted-foreground">The 3-letter ISO country code associated with this currency.</td>
                                    </tr>
                                    <tr className="hover:bg-muted/20 transition-colors">
                                        <td className="px-5 py-3.5 font-mono text-xs text-foreground">code</td>
                                        <td className="px-5 py-3.5 text-xs text-muted-foreground">The currency code (e.g., <code className="bg-muted px-1 py-0.5 rounded">GHS</code>). Pass this as the <code className="bg-muted px-1 py-0.5 rounded">currencyCode</code> path parameter in the Get MoMo Collection Network call.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Integration tip */}
                    <div className="bg-muted/40 dark:bg-background/40 border border-border rounded-xl p-4 flex items-start gap-3">
                        <Info className="h-4 w-4 text-brand shrink-0 mt-0.5" />
                        <p className="text-xs text-muted-foreground">
                            <strong className="text-foreground">Integration tip:</strong> Call this endpoint at initialization or when building your payment method selector. The result changes infrequently  cache it for a reasonable period (e.g., 1 hour) to avoid unnecessary API calls. Only present currencies where both <code className="bg-muted px-1 py-0.5 rounded">momoCollectionEnabled</code> and <code className="bg-muted px-1 py-0.5 rounded">active</code> are <code className="bg-muted px-1 py-0.5 rounded">true</code>.
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
                    Retrieve the list of supported momo currencies for collection operations.
                </p>

                <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2 px-4 py-3 bg-muted/30 dark:bg-card/50 border border-border rounded-2xl">
                        <span className="px-2 py-0.5 rounded text-xs font-semibold bg-brand-50 text-brand dark:bg-brand-950/40 dark:text-brand/80">GET</span>
                        <code className="text-xs text-muted-foreground break-all">
                            https://{"{{baseUrl}}"}/{"{{paymentContext}}"}/ft-app/currency-list/momo?type=collection
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

                    <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-5">
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">Endpoint</h4>
                            <CodeBlock>{getEndpointCode()}</CodeBlock>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">cURL example</h4>
                            <CodeBlock language="bash">{getCurlCode()}</CodeBlock>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">Response</h4>
                            <CodeBlock language="json">{getResponseCode()}</CodeBlock>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default GetMomoCollectionCurrency;
