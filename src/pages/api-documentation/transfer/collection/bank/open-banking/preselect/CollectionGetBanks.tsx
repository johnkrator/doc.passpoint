import {Building2} from "lucide-react";
import CodeBlock from "@/components/CodeBlock.tsx";

const CollectionGetBanks = () => {
    const getEndpoint = () => `GET https://{{baseUrl}}/{{paymentContext}}/foreign-ft-app/retrieve-bank-list`;

    const getCurlRequest = () => `curl --location 'https://{{baseUrl}}/{{paymentContext}}/foreign-ft-app/retrieve-bank-list?countryCode=GB'
--header 'Authorization: Bearer {your_token}'`;

    const getResponse = () => `{
  "responseCode": "00",
  "responseDescription": "Successful",
  "responseMessage": "2 banks retrieved",
  "dataList": [
    {
      "name": "Natwest Sandbox",
      "url": "https://static.instantbankpayment.com/bank-logos/uk-natwest.png",
      "id": "gb-token-natwestsandbox"
    },
    {
      "name": "Test Bank (GB)",
      "url": "https://static.instantbankpayment.com/bank-logos/testbank.png",
      "id": "gb-testbank"
    }
  ]
}`;

    return (
        <div className="py-8 sm:py-10 space-y-16">

            {/* Hero */}
            <section>
                <div className="inline-flex items-center gap-2 bg-brand-50 dark:bg-brand-950/40 text-brand text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
                    <Building2 className="h-3.5 w-3.5" />
                    API Reference
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
                    Get Banks
                </h1>
                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl">
                    Retrieve a list of banks available for Open Banking payments in a specific country. Use this endpoint to fetch supported banks by country code for bank preselection in payment flows.
                </p>
            </section>

            {/* How Bank Preselection Works */}
            <section>
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <Building2 className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">How Bank Preselection Works</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-6 max-w-2xl">
                    In the standard Open Banking payment flow, the customer selects their bank on the Passpoint-hosted payment page. Bank preselection allows you to <strong className="text-foreground">move the bank selection step into your own UI</strong>  fetching the list of supported banks and letting the customer choose before you create the payment request. This creates a smoother checkout experience within your product.
                </p>

                <div className="space-y-4 mb-8">
                    <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-3">
                        <h3 className="text-sm font-semibold text-foreground mb-2">When to use this endpoint</h3>
                        <ul className="space-y-2">
                            {[
                                "To populate a bank picker UI in your checkout flow before initiating the payment.",
                                "To show bank logos and names to the customer so they can select their preferred institution.",
                                "To obtain the bank id required for the 'Request Payment with Bank Preselect' endpoint.",
                                "Call with the countryCode for the customer's country to return only relevant banks.",
                            ].map((item) => (
                                <li key={item} className="flex items-start gap-2">
                                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand shrink-0" />
                                    <span className="text-xs text-muted-foreground">{item}</span>
                                </li>
                            ))}
                        </ul>
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
                                        { field: "dataList[].name", desc: "Human-readable bank name. Display this in your bank picker UI." },
                                        { field: "dataList[].url", desc: "URL of the bank's logo image. Use this to display the bank's branding in your UI." },
                                        { field: "dataList[].id", desc: "Unique bank identifier. Pass this as the bankId field when calling the Request Payment with Bank Preselect endpoint." },
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
                        <Building2 className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Get banks</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
                    Retrieve supported banks for a specific country. Each bank includes its name, logo URL, and unique identifier required for initiating payments.
                </p>

                <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2 px-4 py-3 bg-muted/30 dark:bg-card/50 border border-border rounded-2xl">
                        <span className="px-2 py-0.5 rounded text-xs font-semibold bg-brand-50 text-brand dark:bg-brand-950/40 dark:text-brand/80">GET</span>
                        <code className="text-xs text-muted-foreground break-all">
                            https://{"{{baseUrl}}"}/{"{{paymentContext}}"}/foreign-ft-app/retrieve-bank-list
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
                                    <td className="px-5 py-3.5 text-muted-foreground">ISO country code (e.g., GB)</td>
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

export default CollectionGetBanks;
