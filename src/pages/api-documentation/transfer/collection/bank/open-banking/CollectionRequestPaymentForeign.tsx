import {CreditCard, Globe, Info} from "lucide-react";
import CodeBlock from "@/components/CodeBlock.tsx";

const CollectionRequestPaymentForeign = () => {
    const getEndpoint = () => `POST https://{{baseUrl}}/{{paymentContext}}/foreign-ft-app/request-payment`;

    const getRequestBody = () => `{
  "amount": "5",
  "transactionCurrency": "GBP",
  "narration": "test gbp collection",
  "email": "customeremail@yahoo.com",
  "phone": "08034954100",
  "channel": "4",
  "redirectUrl": "https://webhook.site/983b3ed0-6090-4f07-9159-fed826b507c5",
  "clientReference": "202501271220"
}`;

    const getCurlRequest = () => `curl --location 'https://{{baseUrl}}/{{paymentContext}}/foreign-ft-app/request-payment'
--header 'x-channel-id: CHANNEL_ID'
--header 'x-channel-code: CHANNEL_CODE'
--header 'x-merchant-id: YOUR_MERCHANT_ID'
--header 'Authorization: Bearer {your_token}'
--header 'Content-Type: application/json'
--data-raw '{
  "amount": "1000",
  "transactionCurrency": "GBP",
  "narration": "test eur collection",
  "email": "customeremail@yahoo.com",
  "phone": "08034954100",
  "channel": "4",
  "redirectUrl": "https://webhook.site/7a772620-c37a-49c9-9425-9b8e442e1ebf",
  "clientReference": "202501271214"
}'`;

    const getResponse = () => `{
  "responseCode": "00",
  "responseDescription": "Successful",
  "responseMessage": "payment is pending authorization",
  "data": {
    "url": "https://payment-sandbox.mypasspoint.com/passpoint-payserv/v1/payment-simulator?token=4abf92d1d70eb0745516c4d06b99bb4842f79fa8c739192f082f7f61aa7d00cf7f49c07970b5a7922f16188f8f4728de",
    "transactionId": "26b7ae4c-724f-49d2-9088-3e34f5ddcf96",
    "message": "proceed to process payment",
    "status": "pending"
  }
}`;

    return (
        <div className="py-8 sm:py-10 space-y-16">

            {/* Hero */}
            <section>
                <div className="inline-flex items-center gap-2 bg-brand-50 dark:bg-brand-950/40 text-brand text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
                    <CreditCard className="h-3.5 w-3.5" />
                    API Reference
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
                    Request Payment  Foreign
                </h1>
                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl">
                    Initiate a foreign payment request via Open Banking. Creates a payment session and returns a payment URL for the customer to complete the transaction through their bank.
                </p>
            </section>

            {/* How Foreign Open Banking Payment Requests Work */}
            <section>
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <Globe className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">How Foreign Open Banking Payment Requests Work</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-6 max-w-2xl">
                    This endpoint creates a hosted payment session for foreign currency collection via Open Banking. Instead of requiring the customer to manually initiate a bank transfer, Passpoint generates a secure, time-limited payment URL that walks the customer through authorizing the payment directly from their own online banking.
                </p>

                <div className="space-y-4 mb-8">
                    <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-3">
                        <h3 className="text-sm font-semibold text-foreground mb-2">Payment flow</h3>
                        <div className="space-y-3">
                            {[
                                { step: "1", label: "Create session", detail: "Call this endpoint with the amount, currency, and redirectUrl. Passpoint returns a hosted payment URL and a transactionId." },
                                { step: "2", label: "Redirect customer", detail: "Send the customer to the returned data.url. They select their bank on the Passpoint-hosted page and authorize the payment via Open Banking." },
                                { step: "3", label: "Customer authorizes", detail: "The customer completes the payment through their bank's Open Banking interface. Passpoint receives the authorization result." },
                                { step: "4", label: "Redirect back", detail: "Passpoint redirects the customer to your redirectUrl with the payment outcome." },
                                { step: "5", label: "Receive webhook", detail: "Passpoint sends a callback to your configured URL with the final authoritative payment status. Always verify status via webhook, not the redirect." },
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

                    <div className="bg-muted/40 dark:bg-background/40 border border-border rounded-xl p-4 flex items-start gap-3">
                        <Info className="h-4 w-4 text-brand shrink-0 mt-0.5" />
                        <p className="text-xs text-muted-foreground">
                            <strong className="text-foreground">redirectUrl and clientReference are critical.</strong> The <code className="font-mono bg-muted px-1 py-0.5 rounded">redirectUrl</code> must be a valid HTTPS URL  embed enough context (e.g., your order ID) in the URL to identify the session. The <code className="font-mono bg-muted px-1 py-0.5 rounded">clientReference</code> must be unique per transaction and is the key used to match the webhook callback to your internal records.
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
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Request payment</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
                    Create a payment request for foreign currency collections. The customer selects their bank during checkout on the provided payment URL.
                </p>

                <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2 px-4 py-3 bg-muted/30 dark:bg-card/50 border border-border rounded-2xl">
                        <span className="px-2 py-0.5 rounded text-xs font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400">POST</span>
                        <code className="text-xs text-muted-foreground break-all">
                            https://{"{{baseUrl}}"}/{"{{paymentContext}}"}/foreign-ft-app/request-payment
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
                                    <td className="px-5 py-3.5 text-muted-foreground">your-merchant-id</td>
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
                            <h4 className="text-sm font-medium text-foreground mb-3">Request body</h4>
                            <CodeBlock language="json">{getRequestBody()}</CodeBlock>
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

export default CollectionRequestPaymentForeign;
