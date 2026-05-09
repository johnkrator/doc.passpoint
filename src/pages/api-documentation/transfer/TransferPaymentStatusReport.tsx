import { FileBarChart, Info, Layers, Bell, ArrowDownUp } from "lucide-react";
import CodeBlock from "@/components/CodeBlock.tsx";

type QueryRow = {
    name: string;
    type: string;
    description: string;
    values?: string;
};

type ResponseRow = {
    name: string;
    type: string;
    description: string;
    values?: string;
};

const QUERY_PARAMS: QueryRow[] = [
    {
        name: "reference",
        type: "string",
        description: "the transaction id or client reference",
    },
    {
        name: "mode",
        type: "string",
        description: "this determines whether all the stages are requested or the latest stage",
        values: "e.g. all or latest",
    },
];

const RESPONSE_PARAMS: ResponseRow[] = [
    {
        name: "responseCode",
        type: "string",
        description: "the response code",
        values: "e.g. 00- successful, 01-pending, 02-failed",
    },
    {
        name: "responseDescription",
        type: "string",
        description: "the response description",
    },
    {
        name: "responseMessage",
        type: "string",
        description: "the response message",
    },
    {
        name: "data",
        type: "Array",
        description: "An array of payment status reports",
    },
    {
        name: "data.transactionStatus",
        type: "string",
        description: "the status of the transaction",
        values: "e.g. NEW, PENDING, SUCCESSFUL, FAILED",
    },
    {
        name: "data.transactionId",
        type: "string",
        description: "the transaction id",
    },
    {
        name: "data.responseDescription",
        type: "string",
        description: "the response description of the payment stage",
    },
    {
        name: "data.responseMessage",
        type: "string",
        description: "the response message of the payment stage",
    },
    {
        name: "data.callbackSent",
        type: "boolean",
        description: "indicates whether callback was sent or not",
    },
    {
        name: "data.paymentOrder",
        type: "int",
        description: "the order of the payment",
    },
    {
        name: "data.dateCreated",
        type: "datetime",
        description: "the date and time of the payment stage",
    },
];

const getEndpoint = () =>
    `GET https://{{baseUrl}}/v1/ft-app/payment-status-report`;

const getCurlExample = () =>
    `curl --location 'https://{{baseUrl}}/v1/ft-app/payment-status-report?reference=82c46400-3655-4e41-8413-1cfdec579c77&mode=all' \\
--header 'x-channel-id: CHANNEL_ID' \\
--header 'x-channel-code: CHANNEL_CODE' \\
--header 'x-merchant-id: YOUR_MERCHANT_ID'`;

const getResponseExample = () =>
    `{
  "responseCode": "00",
  "responseDescription": "Successful",
  "responseMessage": "payment cycle found",
  "data": [
    {
      "transactionId": "82c46400-3655-4e41-8413-1cfdec579c77",
      "paymentOrder": 3,
      "callbackSent": true,
      "transactionStatus": "SUCCESSFUL",
      "responseMessage": "Successful",
      "responseDescription": "Merchant notified via callback on Tue Mar 18 17:45:40 WAT 2025",
      "dateCreated": "2025-03-18 17:45:40"
    },
    {
      "transactionId": "82c46400-3655-4e41-8413-1cfdec579c77",
      "paymentOrder": 2,
      "callbackSent": false,
      "transactionStatus": "SUCCESSFUL",
      "responseMessage": "payment successful",
      "responseDescription": "Transaction has been completed",
      "dateCreated": "2025-03-18 17:45:38"
    },
    {
      "transactionId": "82c46400-3655-4e41-8413-1cfdec579c77",
      "paymentOrder": 1,
      "callbackSent": false,
      "transactionStatus": "NEW",
      "responseMessage": "New",
      "responseDescription": "Transaction has been submitted",
      "dateCreated": "2025-03-18 17:45:21"
    }
  ]
}`;

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="bg-white dark:bg-card border border-border rounded-2xl overflow-hidden">
            <div className="px-5 py-3 border-b border-border bg-muted/30">
                <h4 className="text-sm font-semibold text-foreground">{title}</h4>
            </div>
            {children}
        </div>
    );
}

const TransferPaymentStatusReport = () => {
    return (
        <div className="py-8 sm:py-10 space-y-16">

            {/* Hero */}
            <section>
                <div className="inline-flex items-center gap-2 bg-brand-50 dark:bg-brand-950/40 text-brand text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
                    <FileBarChart className="h-3.5 w-3.5" />
                    API Reference
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
                    Payment Status Report
                </h1>
                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl">
                    Gets transaction status. Retrieve detailed payment cycle information showing all stages of transaction processing.
                </p>
            </section>

            {/* How Payment Status Report Works */}
            <section>
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <FileBarChart className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">How Payment Status Report Works</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-6 max-w-2xl">
                    This endpoint generates a comprehensive status report for transfers, returning the full processing history for a transaction. Unlike Transfer Status — which queries a single transaction in real time — this endpoint is designed for batch reconciliation and audit workflows.
                </p>

                <div className="space-y-4">
                    {/* mode parameter */}
                    <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-4">
                        <div className="flex items-center gap-2 mb-1">
                            <ArrowDownUp className="h-4 w-4 text-brand shrink-0" />
                            <h3 className="text-sm font-semibold text-foreground">The mode parameter</h3>
                        </div>
                        <p className="text-xs text-muted-foreground mb-3">
                            The <code className="font-mono bg-muted px-1.5 py-0.5 rounded">mode</code> parameter controls how much history is returned for each transaction:
                        </p>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-border">
                                        <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Value</th>
                                        <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Description</th>
                                        <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Best for</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    <tr className="hover:bg-muted/20 transition-colors">
                                        <td className="px-4 py-3"><span className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">"all"</span></td>
                                        <td className="px-4 py-3 text-muted-foreground text-xs">Returns every processing stage for each transaction in the period — the full history array</td>
                                        <td className="px-4 py-3 text-muted-foreground text-xs">Audit trails, debugging, full reconciliation</td>
                                    </tr>
                                    <tr className="hover:bg-muted/20 transition-colors">
                                        <td className="px-4 py-3"><span className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">"latest"</span></td>
                                        <td className="px-4 py-3 text-muted-foreground text-xs">Returns only the most recent status record for each transaction — one entry per <code className="font-mono bg-muted px-1 py-0.5 rounded">transactionId</code></td>
                                        <td className="px-4 py-3 text-muted-foreground text-xs">Deduplication, end-of-day status snapshots</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* paymentOrder explanation */}
                    <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-3">
                        <div className="flex items-center gap-2 mb-1">
                            <Layers className="h-4 w-4 text-brand shrink-0" />
                            <h3 className="text-sm font-semibold text-foreground">Understanding paymentOrder and callbackSent</h3>
                        </div>
                        <p className="text-xs text-muted-foreground mb-3">
                            When <code className="font-mono bg-muted px-1.5 py-0.5 rounded">mode=all</code> is used, the response contains multiple records per transaction — one for each processing stage. Two fields help you interpret the sequence and notification state:
                        </p>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-border">
                                        <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Field</th>
                                        <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Type</th>
                                        <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Description</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    <tr className="hover:bg-muted/20 transition-colors">
                                        <td className="px-4 py-3"><span className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">paymentOrder</span></td>
                                        <td className="px-4 py-3 text-muted-foreground text-xs">integer</td>
                                        <td className="px-4 py-3 text-muted-foreground text-xs">The sequential processing stage number. Higher values represent more recent stages. Sort by this field descending to find the latest state.</td>
                                    </tr>
                                    <tr className="hover:bg-muted/20 transition-colors">
                                        <td className="px-4 py-3"><span className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">callbackSent</span></td>
                                        <td className="px-4 py-3 text-muted-foreground text-xs">boolean</td>
                                        <td className="px-4 py-3 text-muted-foreground text-xs"><code className="font-mono bg-muted px-1 py-0.5 rounded">true</code> if the webhook notification was dispatched for this stage. <code className="font-mono bg-muted px-1 py-0.5 rounded">false</code> means the callback has not fired yet or failed — use this to identify missed notifications that need manual recovery.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Batch reconciliation vs real-time */}
                    <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-3">
                        <div className="flex items-center gap-2 mb-1">
                            <Bell className="h-4 w-4 text-brand shrink-0" />
                            <h3 className="text-sm font-semibold text-foreground">Payment Status Report vs. Transfer Status</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-border">
                                        <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Endpoint</th>
                                        <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Use case</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    <tr className="hover:bg-muted/20 transition-colors">
                                        <td className="px-4 py-3 text-muted-foreground text-xs">Payment Status Report (this endpoint)</td>
                                        <td className="px-4 py-3 text-muted-foreground text-xs">Batch reconciliation — end-of-day reports, identifying missed callbacks across multiple transactions, full audit history</td>
                                    </tr>
                                    <tr className="hover:bg-muted/20 transition-colors">
                                        <td className="px-4 py-3 text-muted-foreground text-xs">Transfer Status</td>
                                        <td className="px-4 py-3 text-muted-foreground text-xs">Real-time single-transaction lookup — polling for a specific transaction's current state</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Info callout */}
                    <div className="bg-muted/40 dark:bg-background/40 border border-border rounded-xl p-4 flex items-start gap-3">
                        <Info className="h-4 w-4 text-brand shrink-0 mt-0.5" />
                        <p className="text-xs text-muted-foreground">
                            Date range filtering is supported for historical reporting. Narrow the date range as much as possible for large-volume merchants to keep response payloads manageable. Combine with <code className="font-mono bg-muted px-1 py-0.5 rounded">mode=latest</code> to produce clean, deduplicated end-of-day snapshots.
                        </p>
                    </div>
                </div>
            </section>

            {/* Endpoint + Tables */}
            <section className="space-y-6">
                <div className="flex flex-wrap items-center gap-2 px-4 py-3 bg-muted/30 dark:bg-card/50 border border-border rounded-2xl">
                    <span className="px-2 py-0.5 rounded text-xs font-semibold bg-brand-50 text-brand dark:bg-brand-950/40 dark:text-brand/80">GET</span>
                    <code className="text-xs text-muted-foreground break-all">
                        https://dev.mypasspoint.com/paypass/v1/ft-app/payment-status-report
                    </code>
                </div>

                {/* Query Parameters */}
                <SectionCard title="Query Parameters">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-border">
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Parameter</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Type</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Description</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Values</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {QUERY_PARAMS.map((row) => (
                                    <tr key={row.name} className="hover:bg-muted/20 transition-colors">
                                        <td className="px-5 py-3.5">
                                            <span className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">{row.name}</span>
                                        </td>
                                        <td className="px-5 py-3.5 text-muted-foreground text-xs">{row.type}</td>
                                        <td className="px-5 py-3.5 text-muted-foreground text-sm">{row.description}</td>
                                        <td className="px-5 py-3.5">
                                            {row.values
                                                ? <span className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">{row.values}</span>
                                                : <span className="text-muted-foreground">—</span>}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </SectionCard>

                {/* Response Parameters */}
                <SectionCard title="Response Parameters">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-border">
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Parameter</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Type</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Description</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Values</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {RESPONSE_PARAMS.map((row) => (
                                    <tr key={row.name} className="hover:bg-muted/20 transition-colors">
                                        <td className="px-5 py-3.5">
                                            <span className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">{row.name}</span>
                                        </td>
                                        <td className="px-5 py-3.5 text-muted-foreground text-xs">{row.type}</td>
                                        <td className="px-5 py-3.5 text-muted-foreground text-sm">{row.description}</td>
                                        <td className="px-5 py-3.5">
                                            {row.values
                                                ? <span className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">{row.values}</span>
                                                : <span className="text-muted-foreground">—</span>}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </SectionCard>
            </section>

            {/* Code examples */}
            <section>
                <div className="flex items-center gap-3 mb-6">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <FileBarChart className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Code examples</h2>
                </div>

                <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-5">
                    <div>
                        <h4 className="text-sm font-medium text-foreground mb-3">Endpoint</h4>
                        <CodeBlock>{getEndpoint()}</CodeBlock>
                    </div>
                    <div>
                        <h4 className="text-sm font-medium text-foreground mb-3">cURL example</h4>
                        <CodeBlock language="bash">{getCurlExample()}</CodeBlock>
                    </div>
                    <div>
                        <h4 className="text-sm font-medium text-foreground mb-3">Response</h4>
                        <CodeBlock language="json">{getResponseExample()}</CodeBlock>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default TransferPaymentStatusReport;
