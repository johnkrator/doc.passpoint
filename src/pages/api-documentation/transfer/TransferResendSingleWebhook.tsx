import {RefreshCw, ShieldCheck, AlertTriangle} from "lucide-react";
import CodeBlock from "@/components/CodeBlock.tsx";

const TransferResendSingleWebhook = () => {
    const getEndpoint = () => `GET https://{{baseUrl}}/{{paymentContext}}/ft-app/resend-webhook`;

    const getRequestExample = () => `curl --location -g 'https://{{baseUrl}}/{{paymentContext}}/ft-app/resend-webhook?reference={{reference}}'
--header 'x-channel-id: CHANNEL_ID'
--header 'x-channel-code: CHANNEL_CODE'
--header 'x-merchant-id: YOUR_MERCHANT_ID'`;

    const getResponseExample = () => `{
  "responseCode": "00",
  "responseDescription": "Successful",
  "responseMessage": "webhook sent successfully again",
  "data": {
    "url": "https://billpoint.co/api/webhook/passpoint",
    "notificationId": "4dfb0080-4c6a-43ff-90b5-099c98bec902",
    "callbackRequest": {
      "srcAccountName": "Passpoint Admin",
      "destAccountNumber": "9415000799",
      "srcBank": "Keystone Bank",
      "srcAccountNumber": "08028485472",
      "eventType": "VIRTUAL_ACCOUNT_CREDIT",
      "transactionId": "0000028855627410545031676223467345423",
      "destAccountName": "Chiemelie",
      "settledAmount": "100",
      "thirdPartyRef": "dbec9306-0824-4d29-a309-0516115da59a",
      "charges": "0",
      "destBank": "Sterling Bank",
      "merchantId": "d4dcc33c-e2f3-4b14-889c-22e9c76d8e7e",
      "narration": "08028485472/9190259488/MDTSession ID: 100004230676457291054432",
      "transactionAmount": "100",
      "currency": "NGN"
    },
    "callbackResponse": {
      "status": "success"
    },
    "successful": true,
    "sent": true,
    "dateSent": "2024-05-31 13:32:28"
  }
}`;

    return (
        <div className="py-8 sm:py-10 space-y-16">

            {/* Hero */}
            <section>
                <div className="inline-flex items-center gap-2 bg-brand-50 dark:bg-brand-950/40 text-brand text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
                    <RefreshCw className="h-3.5 w-3.5" />
                    API Reference
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
                    Resend Single Webhook
                </h1>
                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl">
                    Manually trigger a webhook callback for a specific transaction. Useful for recovering from
                    webhook delivery failures or when your endpoint was temporarily unavailable.
                </p>
            </section>

            {/* How Webhook Resend Works */}
            <section>
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <RefreshCw className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">How Webhook Resend Works</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-6 max-w-2xl">
                    Webhooks (callbacks) are Passpoint's primary mechanism for notifying your system of transfer status changes. This endpoint manually triggers a resend of the webhook notification for a specific transaction when the original delivery was missed or failed.
                </p>

                <div className="space-y-4">
                    {/* When to use */}
                    <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-3">
                        <div className="flex items-center gap-2 mb-1">
                            <RefreshCw className="h-4 w-4 text-brand shrink-0" />
                            <h3 className="text-sm font-semibold text-foreground">When to use this endpoint</h3>
                        </div>
                        <ul className="space-y-2">
                            {[
                                "Your webhook endpoint was temporarily unavailable when the original notification was sent",
                                "Your endpoint returned a non-2xx HTTP response, causing Passpoint to mark the delivery as failed",
                                "Your system received the notification but it was lost before being processed (e.g., a server crash)",
                                "A user or support agent needs to manually trigger a status re-notification for a specific transaction",
                            ].map((item) => (
                                <li key={item} className="flex items-start gap-2">
                                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand shrink-0" />
                                    <span className="text-xs text-muted-foreground">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Idempotency warning */}
                    <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-3">
                        <div className="flex items-center gap-2 mb-1">
                            <ShieldCheck className="h-4 w-4 text-brand shrink-0" />
                            <h3 className="text-sm font-semibold text-foreground">Idempotency  what resend does and does not do</h3>
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Resending the webhook does <strong className="text-foreground">not</strong> reprocess the transaction. Funds are not moved again, and the transaction state is not changed. The endpoint only re-delivers the notification payload for the transaction's <em>current</em> status. Your webhook handler will receive the same payload it would have received originally.
                        </p>
                        <p className="text-xs text-muted-foreground">
                            This also means your webhook handler must be <strong className="text-foreground">idempotent</strong>  it must be able to safely receive and process the same notification more than once without creating duplicate records or side effects. Use the <code className="font-mono bg-muted px-1.5 py-0.5 rounded">transactionId</code> or <code className="font-mono bg-muted px-1.5 py-0.5 rounded">notificationId</code> as an idempotency key.
                        </p>
                    </div>

                    {/* Response field explanation */}
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
                                    <tr className="hover:bg-muted/20 transition-colors">
                                        <td className="px-5 py-3.5"><span className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">responseCode: "00"</span></td>
                                        <td className="px-5 py-3.5 text-muted-foreground text-xs">The resend was successfully queued. Your webhook endpoint will receive the notification shortly. A non-"00" code indicates the resend could not be initiated.</td>
                                    </tr>
                                    <tr className="hover:bg-muted/20 transition-colors">
                                        <td className="px-5 py-3.5"><span className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">data.successful</span></td>
                                        <td className="px-5 py-3.5 text-muted-foreground text-xs"><code className="font-mono bg-muted px-1 py-0.5 rounded">true</code> if the resent notification was delivered to your endpoint and received a 2xx response. Check <code className="font-mono bg-muted px-1 py-0.5 rounded">data.callbackResponse</code> for the raw response your endpoint returned.</td>
                                    </tr>
                                    <tr className="hover:bg-muted/20 transition-colors">
                                        <td className="px-5 py-3.5"><span className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">data.callbackRequest</span></td>
                                        <td className="px-5 py-3.5 text-muted-foreground text-xs">The exact payload that was sent to your webhook endpoint. Inspect this to verify the data your handler received matches expectations.</td>
                                    </tr>
                                    <tr className="hover:bg-muted/20 transition-colors">
                                        <td className="px-5 py-3.5"><span className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">data.dateSent</span></td>
                                        <td className="px-5 py-3.5 text-muted-foreground text-xs">Timestamp of when the resent notification was dispatched.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Best practice callout */}
                    <div className="bg-muted/40 dark:bg-background/40 border border-border rounded-xl p-4 flex items-start gap-3">
                        <AlertTriangle className="h-4 w-4 text-brand shrink-0 mt-0.5" />
                        <p className="text-xs text-muted-foreground">
                            After resending, verify your webhook handler received and processed the notification correctly by checking your own system logs. If <code className="font-mono bg-muted px-1 py-0.5 rounded">data.successful</code> is <code className="font-mono bg-muted px-1 py-0.5 rounded">false</code>, inspect your endpoint's response and fix any handler issues before resending again.
                        </p>
                    </div>
                </div>
            </section>

            {/* API Endpoint */}
            <section>
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <RefreshCw className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Resend single webhook</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
                    Retry webhook delivery for a single transaction by reference ID.
                </p>

                <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2 px-4 py-3 bg-muted/30 dark:bg-card/50 border border-border rounded-2xl">
                        <span className="px-2 py-0.5 rounded text-xs font-semibold bg-brand-50 text-brand dark:bg-brand-950/40 dark:text-brand/80">GET</span>
                        <code className="text-xs text-muted-foreground break-all">
                            https://{"{{baseUrl}}"}/{"{{paymentContext}}"}/ft-app/resend-webhook
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
                                    <td className="px-5 py-3.5 font-mono text-xs text-foreground">reference</td>
                                    <td className="px-5 py-3.5 text-muted-foreground">The transaction reference or ID</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
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
                                    <td className="px-5 py-3.5 text-muted-foreground">2</td>
                                </tr>
                                <tr className="hover:bg-muted/20 transition-colors">
                                    <td className="px-5 py-3.5 font-mono text-xs text-foreground">x-channel-code</td>
                                    <td className="px-5 py-3.5 text-muted-foreground">passpoint-merchant-user</td>
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
                            <h4 className="text-sm font-medium text-foreground mb-3">cURL example</h4>
                            <CodeBlock language="bash">{getRequestExample()}</CodeBlock>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">Response</h4>
                            <CodeBlock language="json">{getResponseExample()}</CodeBlock>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default TransferResendSingleWebhook;
