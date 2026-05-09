import {Send} from "lucide-react";
import CodeBlock from "@/components/CodeBlock.tsx";

const InitiatePaymentExistingCustomer = () => {
    const endpointCode = () => `POST https://{{baseUrl}}/{{paymentContext}}/acq-app/initiate-payment`;
    const requestBodyCode = () => `{
    "clientReference": "11111",
    "amount": "0.5",
    "narration": "pilot card payment 17",
    "transactionCurrency": "USD",
    "existingCustomer": true,
    "customerId": "PP-CUS828AoQGaz6",
    "redirectUrl": "https://webhook.site/51a77012-4ed1-40dc-bd88-67e4cacc464a",
    "billingDetails": {
        "countryCode": "US",
        "state": "cardholder state",
        "city": "cardhodler city",
        "address": "cardholder address",
        "zipCode": "11111"
    },
    "paymentDetails": {
        "cardNumber": "4104290687925390",
        "cardHolderName": "John Doe",
        "securityCode": "123",
        "expirationMonth": "12",
        "expirationYear": "31"
    }
}`;
    const curlCode = () => `curl --location 'https://{{baseUrl}}/{{paymentContext}}/acq-app/initiate-payment'
--header 'x-channel-id: CHANNEL_ID'
--header 'x-channel-code: CHANNEL_CODE'
--header 'x-merchant-id: YOUR_MERCHANT_ID'
--data '{
    "clientReference": "11111",
    "amount": "0.5",
    "narration": "pilot card payment 17",
    "transactionCurrency": "USD",
    "existingCustomer": true,
    "customerId": "PP-CUS828AoQGaz6",
    "redirectUrl": "https://webhook.site/51a77012-4ed1-40dc-bd88-67e4cacc464a",
    "billingDetails": {
        "countryCode": "US",
        "state": "cardholder state",
        "city": "cardhodler city",
        "address": "cardholder address",
        "zipCode": "11111"
    },
    "paymentDetails": {
        "cardNumber": "4104290687925390",
        "cardHolderName": "John Doe",
        "securityCode": "123",
        "expirationMonth": "12",
        "expirationYear": "31"
    }
}'`;
    const responseCode = () => `{
  "responseCode": "00",
  "responseDescription": "Successful",
  "responseMessage": "payment is pending 3ds challenge",
  "data": {
    "url": "string",
    "transactionId": "26b7ae4c-724f-49d2-9088-3e34f5ddcf96",
    "message": "proceed to challenge page",
    "status": "pending"
  }
}`;

    return (
        <div className="py-8 sm:py-10 space-y-16">
            <section>
                <div className="inline-flex items-center gap-2 bg-brand-50 dark:bg-brand-950/40 text-brand text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
                    <Send className="h-3.5 w-3.5" />
                    API Reference
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
                    Initiate Payment - Existing Customer
                </h1>
                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl">
                    This endpoint is used to initiate a payment for an existing customer. A bearer token is required in the Authorization header. The request includes the customer ID, billing details, and payment card information.
                </p>
            </section>

            <section>
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <Send className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Initiate payment</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
                    Initiate a card payment for a returning customer using their existing customer ID.
                </p>

                <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2 px-4 py-3 bg-muted/30 dark:bg-card/50 border border-border rounded-2xl">
                        <span className="px-2 py-0.5 rounded text-xs font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400">POST</span>
                        <code className="text-xs text-muted-foreground break-all">
                            https://{"{{baseUrl}}"}/{"{{paymentContext}}"}/acq-app/initiate-payment
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

export default InitiatePaymentExistingCustomer;
