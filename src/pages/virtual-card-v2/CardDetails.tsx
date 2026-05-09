import { FileText, Info, Database } from "lucide-react";
import CodeBlock from "@/components/CodeBlock.tsx";

const CardDetails = () => {
    const endpointCode = () => {
        return `GET https://{{baseUrl}}/{{cardContext}}/get-card-details?id=`;
    };

    const curlCode = () => {
        return `curl --location 'https://{{baseUrl}}/{{cardContext}}/get-card-details?id='`;
    };

    const responseCode = () => {
        return `{
  "responseCode": "00",
  "responseDescription": "Successful",
  "responseMessage": "virtual card found",
  "data": {
    "cardId": "2654cf7c-089b-4a8b-a6e7-8b422649d956",
    "merchantId": "e0b157a2-9245-40b9-8117-d25cadfdcfaa",
    "phoneNumber": "08038276746",
    "email": "chinedu37dz+123456@gmail.com",
    "firstName": "Bogus",
    "lastName": "Pokus",
    "address": "8 The Green Ste R",
    "city": "Dover County",
    "state": "Delaware",
    "zipCode": "19901",
    "country": "US",
    "displayName": "Bogus Pokus",
    "clientOrderId": "ba7b9a81-e868-42fc-be0f-aa935446b860",
    "maskedPan": "XXXXXXXXXXXX8796",
    "cardScheme": "VISA",
    "cardType": "VIRTUAL",
    "currency": "USD",
    "expiryDisplay": "0526",
    "dateCreated": "2025-05-21 19:14:35",
    "dateUpdated": "2025-05-21T18:14:40.000+00:00"
  }
}`;
    };

    return (
        <div className="py-8 sm:py-10 space-y-16">

            {/* Hero */}
            <section>
                <div className="inline-flex items-center gap-2 bg-brand-50 dark:bg-brand-950/40 text-brand text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
                    <FileText className="h-3.5 w-3.5" />
                    API Reference
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
                    Get Card Details
                </h1>
                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl">
                    Retrieve comprehensive details of a virtual card by card UUID.
                </p>
            </section>

            {/* How This Endpoint Works */}
            <section>
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <Database className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">How This Endpoint Works</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-6 max-w-xl">
                    Retrieve the full profile and current state of a virtual card by its card ID.
                </p>

                <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-5">
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <p className="text-xs font-semibold text-foreground uppercase tracking-wider">What Is Returned</p>
                            <p className="text-xs text-muted-foreground">The response includes masked PAN (last 4 digits only), expiry date in <code className="font-mono text-xs bg-muted/60 px-1 py-0.5 rounded">MMYY</code> format, card status, billing details, card scheme (VISA / MASTERCARD), and timestamps for creation and last update.</p>
                        </div>
                        <div className="space-y-1.5">
                            <p className="text-xs font-semibold text-foreground uppercase tracking-wider">Sensitive Data NOT Returned</p>
                            <p className="text-xs text-muted-foreground">This endpoint does <span className="font-medium text-foreground">not</span> return the full card number or CVV. To reveal those credentials to a cardholder, use the <strong>Get Card Full PAN</strong> endpoint, which requires explicit PCI-compliant handling on your side.</p>
                        </div>
                        <div className="space-y-1.5">
                            <p className="text-xs font-semibold text-foreground uppercase tracking-wider">Common Use Cases</p>
                            <p className="text-xs text-muted-foreground">Display card status and masked number to users in your app, check whether a card is ACTIVE or FROZEN before attempting a transaction, audit card records, or look up billing details attached to a card.</p>
                        </div>
                        <div className="space-y-1.5">
                            <p className="text-xs font-semibold text-foreground uppercase tracking-wider">The Card ID</p>
                            <p className="text-xs text-muted-foreground">The <code className="font-mono text-xs bg-muted/60 px-1 py-0.5 rounded">cardId</code> is returned when the card is issued. Store it in your database — it is the primary identifier for all subsequent card operations including funding, freezing, and termination.</p>
                        </div>
                    </div>
                    <div className="bg-muted/40 dark:bg-background/40 border border-border rounded-xl p-4 flex items-start gap-3">
                        <Info className="h-4 w-4 text-brand shrink-0 mt-0.5" />
                        <p className="text-xs text-muted-foreground">
                            The <code className="font-mono text-xs">id</code> query parameter accepts the card's UUID (<code className="font-mono text-xs">cardId</code>) returned at issuance. This endpoint is safe to call frequently — it does not expose sensitive card credentials and is appropriate for status polling and display purposes.
                        </p>
                    </div>
                </div>
            </section>

            {/* API Endpoint */}
            <section>
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <FileText className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Card details</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
                    Pass the card's UUID as a query parameter to retrieve its full profile.
                </p>

                <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2 px-4 py-3 bg-muted/30 dark:bg-card/50 border border-border rounded-2xl">
                        <span className="px-2 py-0.5 rounded text-xs font-semibold bg-brand-50 text-brand dark:bg-brand-950/40 dark:text-brand/80">GET</span>
                        <code className="text-xs text-muted-foreground break-all">
                            https://{"{{baseUrl}}"}/{"{{cardContext}}"}/get-card-details?id=
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
                                    <td className="px-5 py-3.5 font-mono text-xs text-foreground">x-channel-id</td>
                                    <td className="px-5 py-3.5 text-muted-foreground">CHANNEL_ID</td>
                                </tr>
                                <tr className="hover:bg-muted/20 transition-colors">
                                    <td className="px-5 py-3.5 font-mono text-xs text-foreground">x-channel-code</td>
                                    <td className="px-5 py-3.5 text-muted-foreground">CHANNEL_CODE</td>
                                </tr>
                                <tr className="hover:bg-muted/20 transition-colors">
                                    <td className="px-5 py-3.5 font-mono text-xs text-foreground">x-merchant-id</td>
                                    <td className="px-5 py-3.5 text-muted-foreground">YOUR_MERCHANT_ID</td>
                                </tr>
                                <tr className="hover:bg-muted/20 transition-colors">
                                    <td className="px-5 py-3.5 font-mono text-xs text-foreground">Authorization</td>
                                    <td className="px-5 py-3.5 text-muted-foreground">Bearer [your-access-token]</td>
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
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Description</th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                <tr className="hover:bg-muted/20 transition-colors">
                                    <td className="px-5 py-3.5 font-mono text-xs text-foreground">id</td>
                                    <td className="px-5 py-3.5 text-muted-foreground">The card UUID obtained at card creation</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-5">
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">Endpoint</h4>
                            <CodeBlock>{endpointCode()}</CodeBlock>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">cURL example</h4>
                            <CodeBlock language="bash">{curlCode()}</CodeBlock>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">Response</h4>
                            <CodeBlock language="json">{responseCode()}</CodeBlock>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CardDetails;
