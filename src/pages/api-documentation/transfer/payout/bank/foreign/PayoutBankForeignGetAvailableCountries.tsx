import { Globe, Info, MapPin, AlertCircle } from "lucide-react";
import CodeBlock from "@/components/CodeBlock.tsx";

const PayoutBankForeignGetAvailableCountries = () => {
    const getEndpointCode = () => {
        return `GET https://{{baseUrl}}/{{paymentContext}}/foreign-ft-app/country-list`;
    };

    const getCurlExampleCode = () => {
        return `curl --location 'https://{{baseUrl}}/{{paymentContext}}/foreign-ft-app/country-list'`;
    };

    const getExampleResponseCode = () => {
        return `{
  "responseCode": "00",
  "responseDescription": "Successful",
  "responseMessage": "country(ies) found",
  "data": [
    {
      "name": "Nigeria",
      "value": "NGA",
      "code": "NG",
      "iso3code": "NGA",
      "currencyCode": "NGN",
      "dialingCode": "234"
    },
    {
      "name": "United States",
      "value": "USA",
      "code": "US",
      "iso3code": "USA",
      "currencyCode": "USD",
      "dialingCode": "1"
    },
    {
      "name": "Kenya",
      "value": "KEN",
      "code": "KE",
      "iso3code": "KEN",
      "dialingCode": "254"
    },
    {
      "name": "Tanzania",
      "value": "TZA",
      "code": "TZ",
      "iso3code": "TZA",
      "currencyCode": "TZS",
      "dialingCode": "255"
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
                    Get Available Countries
                </h1>
                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl">
                    Retrieve all countries available for foreign payout transactions.
                </p>
            </section>

            {/* How Available Countries Works */}
            <section>
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <MapPin className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">How Available Countries Works</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-6 max-w-2xl">
                    This is step 1 of the foreign transfer flow. Call this endpoint to confirm which countries Passpoint supports for foreign payouts before attempting any transfer.
                </p>

                <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-5 mb-4">
                    <div className="space-y-4">
                        {[
                            {
                                title: "Validate before you transfer",
                                body: "Without calling this first, you risk initiating a transfer to an unsupported destination. The request will fail and you will have wasted an API call. Always treat this as the gateway to any foreign payout flow.",
                            },
                            {
                                title: "countryCode is reused downstream",
                                body: "The code field returned for each country (e.g. \"US\", \"GB\", \"CN\") is the same countryCode you must pass in the Get Payment Methods call and in the transfer request body. Store it — do not hard-code country codes.",
                            },
                            {
                                title: "Supported destinations change",
                                body: "Passpoint's supported country list may expand or change. Cache the response for a reasonable TTL (e.g. 24 hours) rather than calling on every page load, but do not treat it as static configuration.",
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

                <div className="bg-white dark:bg-card border border-border rounded-2xl overflow-hidden mb-4">
                    <div className="px-5 py-3 border-b border-border bg-muted/30">
                        <h4 className="text-sm font-semibold text-foreground">Response fields — what to use</h4>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-border">
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Field</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Use</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {[
                                    { field: "code",         use: "Pass as countryCode in the Get Payment Methods request and in the transfer body." },
                                    { field: "name",         use: "Display to end users in country selection UI." },
                                    { field: "currencyCode", use: "Use to pre-populate or validate the transactionCurrency field in your transfer request." },
                                    { field: "dialingCode",  use: "Use when collecting recipient phone numbers in your sender/receiver forms." },
                                    { field: "iso3code",     use: "Use as senderIdIssueCountry and receiverIdIssueCountry in paymentInfo where 3-letter codes are required." },
                                ].map(({ field, use }) => (
                                    <tr key={field} className="hover:bg-muted/20 transition-colors">
                                        <td className="px-5 py-3.5">
                                            <span className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">{field}</span>
                                        </td>
                                        <td className="px-5 py-3.5 text-muted-foreground text-xs">{use}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="bg-muted/40 dark:bg-background/40 border border-border rounded-xl p-4 flex items-start gap-3">
                    <Info className="h-4 w-4 text-brand shrink-0 mt-0.5" />
                    <p className="text-xs text-muted-foreground">
                        This endpoint requires no request body or query parameters. It returns the full list of supported countries. If you need to narrow results (e.g. for a country picker UI), filter client-side on the name or code fields.
                    </p>
                </div>
            </section>

            {/* API Endpoint */}
            <section>
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <Globe className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Get countries</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
                    Returns a list of all supported countries for foreign bank payout operations.
                </p>

                <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2 px-4 py-3 bg-muted/30 dark:bg-card/50 border border-border rounded-2xl">
                        <span className="px-2 py-0.5 rounded text-xs font-semibold bg-brand-50 text-brand dark:bg-brand-950/40 dark:text-brand/80">GET</span>
                        <code className="text-xs text-muted-foreground break-all">
                            https://{"{{baseUrl}}"}/{"{{paymentContext}}"}/foreign-ft-app/country-list
                        </code>
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

export default PayoutBankForeignGetAvailableCountries;
