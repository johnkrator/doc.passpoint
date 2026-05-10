import {Globe} from "lucide-react";
import CodeBlock from "@/components/CodeBlock.tsx";

const CollectionGetCountries = () => {
    const getEndpoint = () => `GET https://{{baseUrl}}/{{paymentContext}}/foreign-ft-app/ob-country-list`;

    const getCurlRequest = () => `curl --location 'https://{{baseUrl}}/{{paymentContext}}/foreign-ft-app/ob-country-list'
--header 'Authorization: Bearer {your_token}'`;

    const getResponse = () => `{
  "data": [
    {
      "name": "United Kingdom",
      "code": "GB",
      "currencyCode": "GBP"
    },
    {
      "name": "Germany",
      "code": "DE",
      "currencyCode": "EUR"
    },
    {
      "name": "France",
      "code": "FR",
      "currencyCode": "EUR"
    },
    {
      "name": "Finland",
      "code": "FI",
      "currencyCode": "EUR"
    },
    {
      "name": "Ireland",
      "code": "IE",
      "currencyCode": "EUR"
    },
    {
      "name": "Italy",
      "code": "IT",
      "currencyCode": "EUR"
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
                    Get Countries
                </h1>
                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl">
                    Retrieve a list of countries supported for Open Banking foreign collections, including their ISO codes and associated currency codes.
                </p>
            </section>

            {/* How Open Banking Country Lookup Works */}
            <section>
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <Globe className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">How Open Banking Country Lookup Works</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-6 max-w-2xl">
                    Before building a bank preselection or Open Banking payment flow, always call this endpoint to discover which countries are supported. The response provides the ISO country codes and currency codes you need to fetch the correct bank list and initiate payment requests in the right currency.
                </p>

                <div className="space-y-4 mb-8">
                    <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-3">
                        <h3 className="text-sm font-semibold text-foreground mb-2">Integration order</h3>
                        <div className="space-y-3">
                            {[
                                { step: "1", label: "Get supported countries (this endpoint)", detail: "Retrieve the list of countries and their currency codes. Use code as the countryCode when fetching banks." },
                                { step: "2", label: "Get banks by country", detail: "Call the Get Banks endpoint with the countryCode to retrieve banks available in that country." },
                                { step: "3", label: "Request payment with bank preselect", detail: "Initiate the payment request with the selected bank's id, letting Passpoint skip the bank selection step on the hosted page." },
                            ].map(({ step, label, detail }) => (
                                <div key={step} className="flex items-start gap-3">
                                    <div className="bg-brand-50 dark:bg-brand-950/40 w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                                        <span className="text-xs font-bold text-brand">{step}</span>
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold text-foreground mb-0.5">{label}</p>
                                        <p className="text-xs text-muted-foreground">{detail}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white dark:bg-card border border-border rounded-2xl overflow-hidden">
                        <div className="px-5 py-3 border-b border-border bg-muted/30">
                            <h4 className="text-sm font-semibold text-foreground">Response field reference</h4>
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
                                    {[
                                        { field: "data[].name", desc: "Country display name  use for your country selector UI." },
                                        { field: "data[].code", desc: "ISO 2-letter country code  pass as countryCode in the Get Banks endpoint." },
                                        { field: "data[].currencyCode", desc: "The currency used for collections in this country. Pass as transactionCurrency when creating payment requests." },
                                    ].map(({ field, desc }) => (
                                        <tr key={field} className="hover:bg-muted/20 transition-colors">
                                            <td className="px-5 py-3.5"><span className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">{field}</span></td>
                                            <td className="px-5 py-3.5 text-muted-foreground text-xs">{desc}</td>
                                        </tr>
                                    ))}
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
                        <Globe className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Get countries</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
                    Fetch the list of supported countries for Open Banking payments. Each entry includes the ISO code and associated currency for foreign transactions.
                </p>

                <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2 px-4 py-3 bg-muted/30 dark:bg-card/50 border border-border rounded-2xl">
                        <span className="px-2 py-0.5 rounded text-xs font-semibold bg-brand-50 text-brand dark:bg-brand-950/40 dark:text-brand/80">GET</span>
                        <code className="text-xs text-muted-foreground break-all">
                            https://{"{{baseUrl}}"}/{"{{paymentContext}}"}/foreign-ft-app/ob-country-list
                        </code>
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

export default CollectionGetCountries;
