import {Globe, Info, Coins, ArrowRight} from "lucide-react";
import CodeBlock from "@/components/CodeBlock.tsx";

const PayoutMomoGetCurrency = () => {
    const getEndpointCode = () => {
        return `GET https://{{baseUrl}}/{{paymentContext}}/ft-app/currency-list/momo?type=payout`;
    };

    const getExampleResponseCode = () => {
        return `{
  "responseCode": "00",
  "responseDescription": "Successful",
  "responseMessage": "4 payout currency(ies) found.",
  "count": 4,
  "data": [
    {
      "name": "Ghanian Cedis",
      "code": "GHS",
      "currencyType": "FIAT",
      "countryCode": "GH",
      "logoUrl": "https://asset.mypasspoint.com/img/payoutCurrency/GHS.png"
    },
    {
      "name": "Kenyan Shillings",
      "code": "KES",
      "currencyType": "FIAT",
      "countryCode": "KE",
      "logoUrl": "https://asset.mypasspoint.com/img/payoutCurrency/KES.png"
    },
    {
      "name": "Ugandan Shillings",
      "code": "UGX",
      "currencyType": "FIAT",
      "countryCode": "UG",
      "logoUrl": "https://asset.mypasspoint.com/img/payoutCurrency/UGX.png"
    },
    {
      "name": "Zambian Kwacha",
      "code": "ZMW",
      "currencyType": "FIAT",
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
                    Get Momo Payout Currency
                </h1>
                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl">
                    List available payout currencies for mobile money transfers.
                </p>
            </section>

            {/* How Currency Lookup Works */}
            <section>
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <Coins className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">How Currency Lookup Works</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-6 max-w-2xl">
                    This is the <strong className="text-foreground">first step</strong> in any MoMo payout flow. Before you can send funds, you need to know which currencies are supported for mobile money payouts and retrieve their currency codes  which are required in every subsequent step.
                </p>

                <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-4 mb-4">
                    <h3 className="text-sm font-semibold text-foreground">Supported MoMo payout currencies</h3>
                    <div className="grid gap-3 sm:grid-cols-2">
                        {[
                            {code: "GHS", name: "Ghanaian Cedis", country: "Ghana", flag: "GH"},
                            {code: "KES", name: "Kenyan Shillings", country: "Kenya", flag: "KE"},
                            {code: "UGX", name: "Ugandan Shillings", country: "Uganda", flag: "UG"},
                            {code: "ZMW", name: "Zambian Kwacha", country: "Zambia", flag: "ZM"},
                        ].map(({code, name, country, flag}) => (
                            <div key={code} className="flex items-center gap-3 p-3 bg-muted/30 dark:bg-muted/10 rounded-xl border border-border">
                                <span className="font-mono text-xs font-bold text-brand bg-brand-50 dark:bg-brand-950/40 px-2 py-1 rounded">{code}</span>
                                <div>
                                    <p className="text-xs font-semibold text-foreground">{name}</p>
                                    <p className="text-xs text-muted-foreground">{country} · {flag}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-4 mb-4">
                    <h3 className="text-sm font-semibold text-foreground">Understanding the response fields</h3>
                    <div className="space-y-3">
                        <div className="flex items-start gap-3">
                            <ArrowRight className="h-3.5 w-3.5 text-brand shrink-0 mt-0.5" />
                            <div>
                                <p className="text-xs font-semibold text-foreground mb-0.5"><code className="font-mono bg-muted px-1 py-0.5 rounded">code</code></p>
                                <p className="text-xs text-muted-foreground leading-relaxed">The ISO 4217 currency code. Pass this as <code className="font-mono bg-muted px-1 py-0.5 rounded">transactionCurrency</code> in both the Get Payout Network and Initiate Transfer requests.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <ArrowRight className="h-3.5 w-3.5 text-brand shrink-0 mt-0.5" />
                            <div>
                                <p className="text-xs font-semibold text-foreground mb-0.5"><code className="font-mono bg-muted px-1 py-0.5 rounded">currencyType</code></p>
                                <p className="text-xs text-muted-foreground leading-relaxed">Indicates whether this is a <code className="font-mono bg-muted px-1 py-0.5 rounded">FIAT</code> currency or a digital asset. All current MoMo payout currencies are <code className="font-mono bg-muted px-1 py-0.5 rounded">FIAT</code>.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <ArrowRight className="h-3.5 w-3.5 text-brand shrink-0 mt-0.5" />
                            <div>
                                <p className="text-xs font-semibold text-foreground mb-0.5"><code className="font-mono bg-muted px-1 py-0.5 rounded">countryCode</code></p>
                                <p className="text-xs text-muted-foreground leading-relaxed">ISO 2-letter code for the country where this MoMo network operates. Use this alongside the currency code when calling the Get Payout Network endpoint.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-muted/40 dark:bg-background/40 border border-border rounded-xl p-4 flex items-start gap-3">
                    <Info className="h-4 w-4 text-brand shrink-0 mt-0.5" />
                    <p className="text-xs text-muted-foreground">
                        <strong className="text-foreground">Start here:</strong> Always call this endpoint first in your MoMo payout integration. The <code className="font-mono bg-muted px-1 py-0.5 rounded">code</code> value from the response is the <code className="font-mono bg-muted px-1 py-0.5 rounded">transactionCurrency</code> you will pass into every subsequent MoMo payout API call.
                    </p>
                </div>
            </section>

            {/* API Endpoint */}
            <section>
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <Globe className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Get payout currency</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
                    Retrieve the list of supported currencies for momo payout operations.
                </p>

                <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2 px-4 py-3 bg-muted/30 dark:bg-card/50 border border-border rounded-2xl">
                        <span className="px-2 py-0.5 rounded text-xs font-semibold bg-brand-50 text-brand dark:bg-brand-950/40 dark:text-brand/80">GET</span>
                        <code className="text-xs text-muted-foreground break-all">
                            https://{"{{baseUrl}}"}/{"{{paymentContext}}"}/ft-app/currency-list/momo?type=payout
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
                                    <td className="px-5 py-3.5 font-mono text-xs text-foreground">x-merchant-id</td>
                                    <td className="px-5 py-3.5 text-muted-foreground">your-merchant-id</td>
                                </tr>
                                <tr className="hover:bg-muted/20 transition-colors">
                                    <td className="px-5 py-3.5 font-mono text-xs text-foreground">x-channel-id</td>
                                    <td className="px-5 py-3.5 text-muted-foreground">3</td>
                                </tr>
                                <tr className="hover:bg-muted/20 transition-colors">
                                    <td className="px-5 py-3.5 font-mono text-xs text-foreground">x-channel-code</td>
                                    <td className="px-5 py-3.5 text-muted-foreground">legacy-api-user</td>
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
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Value</th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                <tr className="hover:bg-muted/20 transition-colors">
                                    <td className="px-5 py-3.5 font-mono text-xs text-foreground">type</td>
                                    <td className="px-5 py-3.5 text-muted-foreground">payout</td>
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
                            <h4 className="text-sm font-medium text-foreground mb-3">Response</h4>
                            <CodeBlock language="json">{getExampleResponseCode()}</CodeBlock>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PayoutMomoGetCurrency;
