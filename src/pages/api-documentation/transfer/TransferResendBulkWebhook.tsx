import {RefreshCcw, Info, AlertTriangle, ShieldCheck, Clock} from "lucide-react";
import CodeBlock from "@/components/CodeBlock.tsx";

const TransferResendBulkWebhook = () => {
    const getEndpoint = () => `POST https://{{baseUrl}}/{{paymentContext}}/ft-app/resend-bulk-webhook`;

    const getRequestBodyExample = () => `{
  "startDate": "yyyy-MM-dd",
  "endDate": "yyyy-MM-dd",
  "currency": "string"
}`;

    const getRequestExample = () => `curl --location 'https://{{baseUrl}}/{{paymentContext}}/ft-app/resend-bulk-webhook'
--header 'x-channel-id: CHANNEL_ID'
--header 'x-channel-code: CHANNEL_CODE'
--header 'x-merchant-id: YOUR_MERCHANT_ID'
--data '{
  "startDate": "yyyy-MM-dd",
  "endDate": "yyyy-MM-dd",
  "currency": "string"
}'`;

    const getResponseExample = () => `{
  "responseCode": "00",
  "responseDescription": "Successful",
  "responseMessage": "transactions have been queued for webhook resending"
}`;

    return (
        <div className="py-8 sm:py-10 space-y-16">

            {/* Hero */}
            <section>
                <div className="inline-flex items-center gap-2 bg-brand-50 dark:bg-brand-950/40 text-brand text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
                    <RefreshCcw className="h-3.5 w-3.5" />
                    API Reference
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
                    Resend Bulk Webhook
                </h1>
                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl">
                    Queue multiple transactions for webhook resending based on date range and currency filters.
                    This endpoint processes webhooks asynchronously to handle large batches efficiently.
                </p>
            </section>

            {/* How Bulk Webhook Resend Works */}
            <section>
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <RefreshCcw className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">How Bulk Webhook Resend Works</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-6 max-w-2xl">
                    This endpoint queues a bulk resend of webhook notifications for all transactions within a specified date range. It is the recovery tool of choice after a webhook outage  when your callback endpoint was down for a period and missed multiple notifications simultaneously.
                </p>

                <div className="space-y-4">
                    {/* Async processing notice */}
                    <div className="bg-muted/40 dark:bg-background/40 border border-border rounded-xl p-4 flex items-start gap-3">
                        <Info className="h-4 w-4 text-brand shrink-0 mt-0.5" />
                        <p className="text-xs text-muted-foreground">
                            The response <code className="font-mono bg-muted px-1 py-0.5 rounded">"transactions have been queued"</code> means the resend jobs are enqueued  they will be dispatched asynchronously, not immediately. Delivery to your webhook endpoint will happen in the background after the API call returns.
                        </p>
                    </div>

                    {/* Use cases */}
                    <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-3">
                        <div className="flex items-center gap-2 mb-1">
                            <Clock className="h-4 w-4 text-brand shrink-0" />
                            <h3 className="text-sm font-semibold text-foreground">When to use this endpoint</h3>
                        </div>
                        <ul className="space-y-2">
                            {[
                                "After server downtime or a sustained webhook endpoint unavailability window",
                                "After fixing a bug in your webhook handler that caused silent processing failures  reprocess the affected window",
                                "For reconciliation during end-of-day or end-of-month batch processes to ensure all statuses are synced",
                                "When a deployment caused your handler to return non-2xx responses, causing Passpoint to mark deliveries as failed",
                            ].map((item) => (
                                <li key={item} className="flex items-start gap-2">
                                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand shrink-0" />
                                    <span className="text-xs text-muted-foreground">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Request parameters explained */}
                    <div className="bg-white dark:bg-card border border-border rounded-2xl overflow-hidden">
                        <div className="px-5 py-3 border-b border-border bg-muted/30">
                            <h4 className="text-sm font-semibold text-foreground">Request field reference</h4>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-border">
                                        <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Field</th>
                                        <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Type</th>
                                        <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Description</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    <tr className="hover:bg-muted/20 transition-colors">
                                        <td className="px-5 py-3.5"><span className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">startDate</span></td>
                                        <td className="px-5 py-3.5 text-muted-foreground text-xs">string</td>
                                        <td className="px-5 py-3.5 text-muted-foreground text-xs">Start of the date range for transactions to resend (format: <code className="font-mono bg-muted px-1 py-0.5 rounded">yyyy-MM-dd</code>). Inclusive.</td>
                                    </tr>
                                    <tr className="hover:bg-muted/20 transition-colors">
                                        <td className="px-5 py-3.5"><span className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">endDate</span></td>
                                        <td className="px-5 py-3.5 text-muted-foreground text-xs">string</td>
                                        <td className="px-5 py-3.5 text-muted-foreground text-xs">End of the date range for transactions to resend (format: <code className="font-mono bg-muted px-1 py-0.5 rounded">yyyy-MM-dd</code>). Inclusive.</td>
                                    </tr>
                                    <tr className="hover:bg-muted/20 transition-colors">
                                        <td className="px-5 py-3.5"><span className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">currency</span></td>
                                        <td className="px-5 py-3.5 text-muted-foreground text-xs">string (optional)</td>
                                        <td className="px-5 py-3.5 text-muted-foreground text-xs">Filter resends to only transactions in a specific currency (e.g., <code className="font-mono bg-muted px-1 py-0.5 rounded">"NGN"</code>). Omit to resend for all currencies in the date range.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Idempotency + volume warning */}
                    <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-3">
                        <div className="flex items-center gap-2 mb-1">
                            <ShieldCheck className="h-4 w-4 text-brand shrink-0" />
                            <h3 className="text-sm font-semibold text-foreground">Idempotency requirement</h3>
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Your webhook handler must be idempotent. Any transaction that had a previously successful delivery will receive a duplicate notification. Use the <code className="font-mono bg-muted px-1.5 py-0.5 rounded">transactionId</code> as an idempotency key in your handler to safely ignore or deduplicate already-processed events.
                        </p>
                    </div>

                    {/* Volume warning */}
                    <div className="bg-muted/40 dark:bg-background/40 border border-border rounded-xl p-4 flex items-start gap-3">
                        <AlertTriangle className="h-4 w-4 text-brand shrink-0 mt-0.5" />
                        <p className="text-xs text-muted-foreground">
                            <strong className="text-foreground">Volume warning:</strong> Large date ranges can trigger a high volume of simultaneous webhook deliveries. Narrow the <code className="font-mono bg-muted px-1 py-0.5 rounded">startDate</code> to <code className="font-mono bg-muted px-1 py-0.5 rounded">endDate</code> window as precisely as possible  ideally to the actual outage window  to avoid overwhelming your endpoint with unnecessary retries.
                        </p>
                    </div>
                </div>
            </section>

            {/* API Endpoint */}
            <section>
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <RefreshCcw className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Resend bulk webhook</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
                    Trigger webhook resending for multiple transactions within a specified date range.
                </p>

                <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2 px-4 py-3 bg-muted/30 dark:bg-card/50 border border-border rounded-2xl">
                        <span className="px-2 py-0.5 rounded text-xs font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400">POST</span>
                        <code className="text-xs text-muted-foreground break-all">
                            https://{"{{baseUrl}}"}/{"{{paymentContext}}"}/ft-app/resend-bulk-webhook
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
                            <h4 className="text-sm font-medium text-foreground mb-3">Request body</h4>
                            <CodeBlock language="json">{getRequestBodyExample()}</CodeBlock>
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

export default TransferResendBulkWebhook;
