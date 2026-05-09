import { CreditCard, Info, Layers, AlertCircle } from "lucide-react";
import CodeBlock from "@/components/CodeBlock.tsx";

const PayoutBankForeignGetPaymentMethods = () => {
    const getEndpointCode = () => {
        return `GET https://{{baseUrl}}/{{paymentContext}}/foreign-ft-app/available-payment-methods?countryCode=US`;
    };

    const getCurlExampleCode = () => {
        return `curl --location 'https://{{baseUrl}}/{{paymentContext}}/foreign-ft-app/available-payment-methods?countryCode=US'`;
    };

    const getExampleResponseCode = () => {
        return `{
  "responseCode": "00",
  "responseDescription": "Successful",
  "responseMessage": "4 payment method(s) found",
  "data": [
    {
      "name": "ACH",
      "alias": "ach",
      "minLimit": 1,
      "maxLimit": 10000000
    },
    {
      "name": "RTP",
      "alias": "rtp",
      "minLimit": 1,
      "maxLimit": 10000000
    },
    {
      "name": "FEDWIRE",
      "alias": "wire",
      "minLimit": 1,
      "maxLimit": 10000000
    },
    {
      "name": "FEDNOW",
      "alias": "fednow",
      "minLimit": 1,
      "maxLimit": 10000000
    }
  ]
}`;
    };

    return (
        <div className="py-8 sm:py-10 space-y-16">

            {/* Hero */}
            <section>
                <div className="inline-flex items-center gap-2 bg-brand-50 dark:bg-brand-950/40 text-brand text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
                    <CreditCard className="h-3.5 w-3.5" />
                    API Reference
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
                    Get Payment Methods
                </h1>
                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl">
                    Get payment methods available by country for foreign payout transactions.
                </p>
            </section>

            {/* How Payment Method Lookup Works */}
            <section>
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <Layers className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">How Payment Method Lookup Works</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-6 max-w-2xl">
                    This is step 2 of the foreign transfer flow. Call this endpoint after confirming a country is supported to determine exactly which payment rails are available for that destination.
                </p>

                <div className="bg-white dark:bg-card border border-border rounded-2xl overflow-hidden mb-4">
                    <div className="px-5 py-3 border-b border-border bg-muted/30">
                        <h4 className="text-sm font-semibold text-foreground">Payment methods by destination</h4>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-border">
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Destination</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Available methods</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Endpoint to use</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {[
                                    { dest: "US (countryCode: US)", methods: "ACH, Wire, RTP, FedNow", endpoint: "/make-payment/ach | /wire | /rtp | /fednow" },
                                    { dest: "UK (countryCode: GB)",  methods: "Bank deposit (GBP)",     endpoint: "/make-payment/bank with transactionCurrency: GBP" },
                                    { dest: "EU (countryCode: FR, DE, etc.)", methods: "Bank deposit (EUR)", endpoint: "/make-payment/bank with transactionCurrency: EUR" },
                                    { dest: "China (countryCode: CN)", methods: "CNY deposit, B2B, B2C, MoMo", endpoint: "/make-payment/bank | /b2b | /b2c | /momo" },
                                ].map(({ dest, methods, endpoint }) => (
                                    <tr key={dest} className="hover:bg-muted/20 transition-colors">
                                        <td className="px-5 py-3.5 text-sm text-foreground font-medium">{dest}</td>
                                        <td className="px-5 py-3.5 text-muted-foreground text-xs">{methods}</td>
                                        <td className="px-5 py-3.5">
                                            <span className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">{endpoint}</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-4 mb-4">
                    <div className="space-y-4">
                        {[
                            {
                                title: "The alias field tells you which endpoint to use",
                                body: "The alias in each payment method response (e.g. \"ach\", \"rtp\", \"wire\") maps directly to the endpoint path suffix. If alias is \"ach\", use /make-payment/ach. Always use alias — not name — to make this decision programmatically.",
                            },
                            {
                                title: "Validate amount against minLimit and maxLimit",
                                body: "Each method returns a minLimit and maxLimit in the destination currency. Check your transfer amount against these bounds before calling the transfer endpoint. Amounts outside this range will be rejected.",
                            },
                            {
                                title: "Always call this after Get Available Countries",
                                body: "Passing an unsupported countryCode will return an empty or error response. Confirm the country is supported first, then query its payment methods.",
                            },
                        ].map(({ title, body }) => (
                            <div key={title} className="flex items-start gap-3">
                                <AlertCircle className="h-4 w-4 text-brand shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-sm font-semibold text-foreground mb-0.5">{title}</p>
                                    <p className="text-xs text-muted-foreground leading-relaxed">{body}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-muted/40 dark:bg-background/40 border border-border rounded-xl p-4 flex items-start gap-3">
                    <Info className="h-4 w-4 text-brand shrink-0 mt-0.5" />
                    <p className="text-xs text-muted-foreground">
                        Cache payment method responses per country for a reasonable TTL (e.g. 1 hour). Available rails and limits can be updated by Passpoint as network relationships change. Always re-fetch before critical production flows if your cache has expired.
                    </p>
                </div>
            </section>

            {/* API Endpoint */}
            <section>
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <CreditCard className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Get payment methods</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
                    Returns a list of supported payment methods for a given destination country.
                </p>

                <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2 px-4 py-3 bg-muted/30 dark:bg-card/50 border border-border rounded-2xl">
                        <span className="px-2 py-0.5 rounded text-xs font-semibold bg-brand-50 text-brand dark:bg-brand-950/40 dark:text-brand/80">GET</span>
                        <code className="text-xs text-muted-foreground break-all">
                            https://{"{{baseUrl}}"}/{"{{paymentContext}}"}/foreign-ft-app/available-payment-methods?countryCode=US
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
                                    <td className="px-5 py-3.5 font-mono text-xs text-foreground">countryCode</td>
                                    <td className="px-5 py-3.5 text-muted-foreground">The destination country code (e.g., US)</td>
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
                            <CodeBlock language="bash">{getCurlExampleCode()}</CodeBlock>
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

export default PayoutBankForeignGetPaymentMethods;
