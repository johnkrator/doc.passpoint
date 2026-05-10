import { CreditCard, Info, Database } from "lucide-react";
import CodeBlock from "@/components/CodeBlock.tsx";

const IssueCardDefaultBilling = () => {
    const endpointCode = () => {
        return `POST https://{{baseUrl}}/{{cardContext}}/issue`;
    };

    const requestBodyCode = () => {
        return `{
    "firstName":"Bogus",
    "lastName":"Pokus",
    "email":"chinedu37dz+123456@gmail.com",
    "phoneNumber":"08038276746",
    "currency":"USD",
    "scheme":"2",
    "cardType" : "0",
    "orderId":"39737957-7af4-4b8a-b289-51b3315bc7f1",
    "pin":"1234",
    "is3d" : "no",
    "tokenization" : "no",
    "useCardAsChargeBearer" : "no",
    "limit" : "3000",
}`;
    };

    const curlCode = () => {
        return `curl --location 'https://{{baseUrl}}/{{cardContext}}/issue'
--data-raw '{
    "firstName":"Bogus",
    "lastName":"Pokus",
    "email":"chinedu37dz+123456@gmail.com",
    "phoneNumber":"08038276746",
    "currency":"USD",
    "scheme":"2",
    "cardType" : "0",
    "orderId":"827c8156-55ab-4917-8f5c-19d90cc64780",
    "is3d" : "no",
    "tokenization" : "no",
    "useCardAsChargeBearer" : "no"
}'`;
    };

    const responseCode = () => {
        return `{
  "responseCode": "00",
  "responseDescription": "Successful",
  "responseMessage": "string",
  "reference": "string"
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
                    Issue Card  Default Billing Details
                </h1>
                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl">
                    Create a virtual card using the merchant's default billing details. Scheme: 1 = Mastercard, 2 = Visa.
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
                    Understand the issuance flow and key behaviors before calling this endpoint.
                </p>

                <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-5">
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <p className="text-xs font-semibold text-foreground uppercase tracking-wider">Billing Mode</p>
                            <p className="text-xs text-muted-foreground">This is the simpler of the two issuance modes. No billing address fields are required  Passpoint uses your merchant's pre-configured default billing address for all cards issued this way.</p>
                        </div>
                        <div className="space-y-1.5">
                            <p className="text-xs font-semibold text-foreground uppercase tracking-wider">What Is Returned</p>
                            <p className="text-xs text-muted-foreground">The response includes a card ID, a reference, and a success status. Store the card ID in your database  you will need it to fund, freeze, retrieve details, or terminate the card.</p>
                        </div>
                        <div className="space-y-1.5">
                            <p className="text-xs font-semibold text-foreground uppercase tracking-wider">Funding</p>
                            <p className="text-xs text-muted-foreground">Cards issued through this endpoint are <span className="font-medium text-foreground">not automatically funded</span>. You must call the Fund Card endpoint separately after issuance to add a USD balance to the card.</p>
                        </div>
                        <div className="space-y-1.5">
                            <p className="text-xs font-semibold text-foreground uppercase tracking-wider">Best Fit For</p>
                            <p className="text-xs text-muted-foreground">Internal expense cards, developer or test cards, and any scenario where the cardholder's real address does not need to match the billing details on file with merchants.</p>
                        </div>
                    </div>
                    <div className="border-t border-border pt-4 space-y-2">
                        <p className="text-xs font-semibold text-foreground">Card scheme values</p>
                        <p className="text-xs text-muted-foreground">
                            Pass <code className="font-mono text-xs bg-muted/60 px-1 py-0.5 rounded">scheme: "1"</code> for Mastercard or <code className="font-mono text-xs bg-muted/60 px-1 py-0.5 rounded">scheme: "2"</code> for Visa.
                            The <code className="font-mono text-xs bg-muted/60 px-1 py-0.5 rounded">orderId</code> must be a unique UUID per request and serves as your system's idempotency key for this issuance.
                        </p>
                    </div>
                    <div className="bg-muted/40 dark:bg-background/40 border border-border rounded-xl p-4 flex items-start gap-3">
                        <Info className="h-4 w-4 text-brand shrink-0 mt-0.5" />
                        <p className="text-xs text-muted-foreground">
                            After issuance, call <strong>Get Card Details</strong> to verify the card's current state, masked PAN, expiry, and billing details. A real-time webhook callback will also be sent to your configured callback URL confirming the creation event.
                        </p>
                    </div>
                </div>
            </section>

            {/* API Endpoint */}
            <section>
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <CreditCard className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Issue virtual card</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
                    Issues a virtual card for a customer using the merchant's pre-configured billing address.
                </p>

                <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2 px-4 py-3 bg-muted/30 dark:bg-card/50 border border-border rounded-2xl">
                        <span className="px-2 py-0.5 rounded text-xs font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400">POST</span>
                        <code className="text-xs text-muted-foreground break-all">
                            https://{"{{baseUrl}}"}/{"{{cardContext}}"}/issue
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

                    <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-5">
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">Endpoint</h4>
                            <CodeBlock>{endpointCode()}</CodeBlock>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">Request body</h4>
                            <CodeBlock language="json">{requestBodyCode()}</CodeBlock>
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

export default IssueCardDefaultBilling;
