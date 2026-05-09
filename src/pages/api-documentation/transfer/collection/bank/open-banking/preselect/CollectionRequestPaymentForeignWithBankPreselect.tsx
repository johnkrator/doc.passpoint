import {Send} from "lucide-react";
import CodeBlock from "@/components/CodeBlock.tsx";

const CollectionRequestPaymentForeignWithBankPreselect = () => {
    const getEndpoint = () => `POST https://{{baseUrl}}/{{paymentContext}}/foreign-ft-app/request-payment`;

    const getRequestBody = () => `{
  "amount": "100",
  "transactionCurrency": "GBP",
  "narration": "test gbp collection",
  "email": "customeremail@yahoo.com",
  "phone": "08034954100",
  "channel": "4",
  "redirectUrl": "https://webhook.site/fcae55cd-54e1-4d34-9780-4e247c0abf1c",
  "clientReference": "58d1ac16-fe79-445b-bc15-2edc823e33c3",
  "paymentInfo": {
    "bankId": "gb-token-natwestsandbox"
  }
}`;

    const getCurlRequest = () => `curl --location 'https://{{baseUrl}}/{{paymentContext}}/foreign-ft-app/request-payment'
--header 'x-channel-id: CHANNEL_ID'
--header 'x-channel-code: CHANNEL_CODE'
--header 'x-merchant-id: YOUR_MERCHANT_ID'
--header 'Authorization: Bearer {your_token}'
--header 'Content-Type: application/json'
--data-raw '{
  "amount": "100",
  "transactionCurrency": "GBP",
  "narration": "test gbp collection",
  "email": "customeremail@yahoo.com",
  "phone": "08034954100",
  "channel": "4",
  "redirectUrl": "https://webhook.site/fcae55cd-54e1-4d34-9780-4e247c0abf1c",
  "clientReference": "46d2f6da-da00-4866-b75f-c986c8a2502c",
  "paymentInfo": {
    "bankId": "gb-token-natwestsandbox"
  }
}'`;

    const getResponse = () => `{
  "responseCode": "00",
  "responseDescription": "Successful",
  "responseMessage": "payment is pending authorization",
  "data": {
    "url": "https://dev.themansa.net/{{paymentContext}}/webpay?token=05ffcbe877cf397866c3981487970e82e8593d3f7791f6d76eb9262576e13cf8c20f2b155c3877778184a6c002cbcd80",
    "transactionId": "84ccea27-3b5f-46e0-967d-20426ed2945f",
    "message": "please launch the link and proceed to process payment",
    "status": "new"
  }
}`;

    return (
        <div className="py-8 sm:py-10 space-y-16">

            {/* Hero */}
            <section>
                <div className="inline-flex items-center gap-2 bg-brand-50 dark:bg-brand-950/40 text-brand text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
                    <Send className="h-3.5 w-3.5" />
                    API Reference
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
                    Request Payment — Foreign (Bank Pre-select)
                </h1>
                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl">
                    Initiate a foreign payment request with bank preselection. Allows you to create a payment with a specific bank already selected, streamlining the customer checkout experience.
                </p>
            </section>

            {/* API Endpoint */}
            <section>
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <Send className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Request payment</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
                    Create a payment request with a pre-selected bank for faster processing. Include the bank ID in the <code className="bg-muted px-1.5 py-0.5 rounded text-xs">paymentInfo</code> object to skip bank selection during checkout.
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

export default CollectionRequestPaymentForeignWithBankPreselect;
