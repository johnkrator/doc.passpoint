import {Globe, Info, Network, ArrowRight} from "lucide-react";
import CodeBlock from "@/components/CodeBlock.tsx";

const PayoutMomoGetNetwork = () => {
    const getEndpointCode = () => {
        return `GET https://{{baseUrl}}/{{paymentContext}}/momo-app/momo-networks/KES?type=payout&countryCode=KE`;
    };

    const getCurlExampleCode = () => {
        return `curl --location 'https://{{baseUrl}}/{{paymentContext}}/momo-app/momo-networks/KES?type=payout&countryCode=KE' \\
--header 'x-merchant-id: your-merchant-id' \\
--header 'x-channel-id: 3' \\
--header 'x-channel-code: legacy-api-user'`;
    };

    const getExampleResponseCode = () => {
        return `{
  "responseCode": "00",
  "responseDescription": "Successful",
  "responseMessage": "Networks found",
  "data": [
    {
      "serviceCode": "MTN_GH",
      "serviceName": "MTN Ghana",
      "countryCode": "GH",
      "currencyCode": "GHS"
    },
    {
      "serviceCode": "AIRTEL_GH",
      "serviceName": "Airtel Ghana",
      "countryCode": "GH",
      "currencyCode": "GHS"
    }
  ]
}`;
    };

    const responseFields: Array<{ field: string; description: string }> = [
        {
            field: "serviceCode",
            description: "The network identifier. Pass this as the serviceCode field when initiating a MoMo transfer.",
        },
        {
            field: "serviceName",
            description: "Human-readable name of the mobile money network.",
        },
        {
            field: "countryCode",
            description: "ISO 2-letter country code for the network.",
        },
        {
            field: "currencyCode",
            description: "Currency associated with the network.",
        },
    ];

    return (
        <div className="py-8 sm:py-10 space-y-16">

            {/* Hero */}
            <section>
                <div className="inline-flex items-center gap-2 bg-brand-50 dark:bg-brand-950/40 text-brand text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
                    <Globe className="h-3.5 w-3.5" />
                    API Reference
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
                    Get Momo Payout Network
                </h1>
                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl">
                    List all momo networks available in a particular momo payout enabled corridor.
                </p>
            </section>

            {/* How Network Lookup Works */}
            <section>
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <Network className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">How Network Lookup Works</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-6 max-w-2xl">
                    Before initiating a MoMo transfer, you need to know which networks are available in the target corridor. This endpoint lists all active mobile money networks for a given currency and country.
                </p>

                <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-4 mb-4">
                    <h3 className="text-sm font-semibold text-foreground">Where this fits in the MoMo payout flow</h3>
                    <ol className="space-y-3">
                        {[
                            {step: "1", label: "Get Currency List", note: "Retrieve supported MoMo payout currencies and select the target currency code."},
                            {step: "2", label: "Get Payout Network (this step)", note: "Pass the currency code to this endpoint to retrieve available networks. The serviceCode from the response is required in the next step."},
                            {step: "3", label: "Validate MSISDN", note: "Confirm the recipient's phone number is active before sending funds."},
                            {step: "4", label: "Initiate MoMo Transfer", note: "Submit the transfer using the serviceCode from this response."},
                        ].map(({step, label, note}) => (
                            <li key={step} className="flex items-start gap-3">
                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-50 dark:bg-brand-950/40 text-brand text-xs font-bold flex items-center justify-center">{step}</span>
                                <div>
                                    <p className="text-xs font-semibold text-foreground">{label}</p>
                                    <p className="text-xs text-muted-foreground leading-relaxed">{note}</p>
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>

                <div className="bg-muted/40 dark:bg-background/40 border border-border rounded-xl p-4 flex items-start gap-3">
                    <Info className="h-4 w-4 text-brand shrink-0 mt-0.5" />
                    <p className="text-xs text-muted-foreground">
                        <strong className="text-foreground">Key dependency:</strong> The <code className="font-mono bg-muted px-1 py-0.5 rounded">serviceCode</code> returned by this endpoint is a required field in the MoMo Transfer request body. Without calling this endpoint first, you cannot determine which network to route the payout through.
                    </p>
                </div>
            </section>

            {/* Response Field Reference */}
            <section>
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <ArrowRight className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Response Fields</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-6 max-w-xl">
                    Each object in the <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">data</code> array represents one available network for the requested corridor.
                </p>
                <div className="bg-white dark:bg-card border border-border rounded-2xl overflow-hidden">
                    <div className="px-5 py-3 border-b border-border bg-muted/30">
                        <h4 className="text-sm font-semibold text-foreground">Field reference</h4>
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
                            {responseFields.map(({field, description}) => (
                                <tr key={field} className="hover:bg-muted/20 transition-colors">
                                    <td className="px-5 py-3.5 font-mono text-xs text-foreground whitespace-nowrap">{field}</td>
                                    <td className="px-5 py-3.5 text-xs text-muted-foreground">{description}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* API Endpoint */}
            <section>
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <Globe className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Get payout network</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
                    Retrieve supported momo networks for a specific currency and country corridor.
                </p>

                <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2 px-4 py-3 bg-muted/30 dark:bg-card/50 border border-border rounded-2xl">
                        <span className="px-2 py-0.5 rounded text-xs font-semibold bg-brand-50 text-brand dark:bg-brand-950/40 dark:text-brand/80">GET</span>
                        <code className="text-xs text-muted-foreground break-all">
                            https://{"{{baseUrl}}"}/{"{{paymentContext}}"}/momo-app/momo-networks/KES?type=payout&amp;countryCode=KE
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
                                    <td className="px-5 py-3.5 text-muted-foreground">payout</td>
                                </tr>
                                <tr className="hover:bg-muted/20 transition-colors">
                                    <td className="px-5 py-3.5 font-mono text-xs text-foreground">countryCode</td>
                                    <td className="px-5 py-3.5 text-muted-foreground">KE</td>
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

export default PayoutMomoGetNetwork;
