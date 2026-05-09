import { CreditCard, Info, Zap } from "lucide-react";
import CodeBlock from "@/components/CodeBlock.tsx";

const IssueAndFundCardClientBilling = () => {
    const endpointCode = () => {
        return `POST https://{{baseUrl}}/{{cardContext}}/issue-and-fund`;
    };

    const requestBodyCode = () => {
        return `{
    "firstName": "John",
    "lastName": "Deep",
    "email": "teli2x@yahoo.ca",
    "phoneNumber": "08038276746",
    "currency": "USD",
    "scheme": "2",
    "cardType": "0",
    "orderId": "5a927e39-9f93-47bc-b7f8-0173110dca41",
    "useBillingDetails": "client",
    "address": "9 milton drive",
    "city": "Beverly hills",
    "state": "California",
    "country": "US",
    "zipCode": "19901",
    "amount": "10",
    "callbackUrl": "string",
    "is3d": "no",
    "tokenization": "no",
    "useCardAsChargeBearer" : "no",
    "limit": "3000",
}`;
    };

    const curlCode = () => {
        return `curl --location 'https://{{baseUrl}}/{{cardContext}}/issue-and-fund'
--data-raw '{
    "firstName": "John",
    "lastName": "Deep",
    "email": "teli2x@yahoo.ca",
    "phoneNumber": "08038276746",
    "currency": "USD",
    "scheme": "1",
    "cardType": "0",
    "orderId": "1c4cafe6-a183-41d8-a538-8a37b7815511",
    "useBillingDetails": "client",
    "address": "9 milton drive",
    "city": "Beverly hills",
    "state": "California",
    "country": "US",
    "zipCode": "19901",
    "amount": "10",
    "callbackUrl": "string",
    "is3d": "no",
    "tokenization": "no",
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
                    Issue and Fund Card — Client Billing Details
                </h1>
                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl">
                    Create and fund a virtual card in a single operation using a custom client billing address.
                </p>
            </section>

            {/* How This Endpoint Works */}
            <section>
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <Zap className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">How This Endpoint Works</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-6 max-w-xl">
                    This endpoint combines card issuance and initial funding into a single atomic API call.
                </p>

                <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-5">
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <p className="text-xs font-semibold text-foreground uppercase tracking-wider">Atomic Issuance + Funding</p>
                            <p className="text-xs text-muted-foreground">Rather than calling Issue Card and Fund Card as separate requests, this endpoint completes both operations in one call. The card is created and funded in a single transaction — reducing latency and eliminating the risk of a card existing in an unfunded state.</p>
                        </div>
                        <div className="space-y-1.5">
                            <p className="text-xs font-semibold text-foreground uppercase tracking-wider">The <code className="font-mono text-xs">amount</code> Field</p>
                            <p className="text-xs text-muted-foreground">The <code className="font-mono text-xs bg-muted/60 px-1 py-0.5 rounded">amount</code> field specifies the initial USD balance to load onto the card. This amount is immediately debited from your Passpoint merchant wallet at the time of issuance. The card is ready to use for purchases as soon as the API call succeeds.</p>
                        </div>
                        <div className="space-y-1.5">
                            <p className="text-xs font-semibold text-foreground uppercase tracking-wider">Best Fit For</p>
                            <p className="text-xs text-muted-foreground">Gift cards with a fixed denomination, single-use expense cards with a known budget, prepaid allowances for employees or contractors, and any scenario where you know the card's initial balance upfront.</p>
                        </div>
                        <div className="space-y-1.5">
                            <p className="text-xs font-semibold text-foreground uppercase tracking-wider">Card is Immediately Active</p>
                            <p className="text-xs text-muted-foreground">No separate funding step is needed after this call. The card's balance is set at issuance and the card is in ACTIVE status, ready for the cardholder to use immediately. A webhook callback will confirm both the creation and funding events.</p>
                        </div>
                    </div>
                    <div className="bg-muted/40 dark:bg-background/40 border border-border rounded-xl p-4 flex items-start gap-3">
                        <Info className="h-4 w-4 text-brand shrink-0 mt-0.5" />
                        <p className="text-xs text-muted-foreground">
                            This endpoint uses client billing details. Set <code className="font-mono text-xs">useBillingDetails: "client"</code> and supply <code className="font-mono text-xs">address</code>, <code className="font-mono text-xs">city</code>, <code className="font-mono text-xs">state</code>, <code className="font-mono text-xs">country</code>, and <code className="font-mono text-xs">zipCode</code> to ensure the card passes AVS checks at merchants that verify billing address.
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
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Issue &amp; fund card</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
                    Issues a virtual card and funds it with an initial balance in one API call.
                </p>

                <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2 px-4 py-3 bg-muted/30 dark:bg-card/50 border border-border rounded-2xl">
                        <span className="px-2 py-0.5 rounded text-xs font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400">POST</span>
                        <code className="text-xs text-muted-foreground break-all">
                            https://{"{{baseUrl}}"}/{"{{cardContext}}"}/issue-and-fund
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

export default IssueAndFundCardClientBilling;
