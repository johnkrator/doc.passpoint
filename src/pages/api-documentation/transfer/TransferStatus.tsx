import { Search, Info, Bell, ArrowRight, Clock } from "lucide-react";
import CodeBlock from "@/components/CodeBlock.tsx";

type QueryRow = {
    name: string;
    type: string;
    description: string;
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
        name: "data.status",
        type: "string",
        description: "the status of the transaction",
        values: "e.g. NEW, PENDING, PROCESSING, SUCCESSFUL, FAILED",
    },
    {
        name: "data.transactionId",
        type: "string",
        description: "the transaction id",
    },
    {
        name: "data.amount",
        type: "decimal",
        description: "the transaction amount",
    },
    {
        name: "data.senderAccountNumber",
        type: "string",
        description: "the sender account number",
    },
    {
        name: "data.senderAccountName",
        type: "string",
        description: "the sender account name",
    },
    {
        name: "data.senderBankName",
        type: "string",
        description: "the sender bank name",
    },
    {
        name: "data.beneficiaryAccountNumber",
        type: "string",
        description: "the beneficiary account number",
    },
    {
        name: "data.beneficiaryAccountName",
        type: "string",
        description: "the beneficiary account name",
    },
    {
        name: "data.paymentType",
        type: "string",
        description: "the payment type",
        values: "e.g. PAYOUT, COLLECTION",
    },
];

const getEndpoint = () =>
    `GET https://{{baseUrl}}/{{paymentContext}}/ft-app/transfer-status`;

const getCurlExample = () =>
    `curl --location 'https://{{baseUrl}}/{{paymentContext}}/ft-app/transfer-status?reference=00000423060111141481697464946545699112233' \\
--header 'x-channel-id: CHANNEL_ID' \\
--header 'x-channel-code: CHANNEL_CODE' \\
--header 'x-merchant-id: YOUR_MERCHANT_ID'`;

const getResponseExample = () =>
    `{
  "responseCode": "00",
  "responseDescription": "Successful",
  "responseMessage": "transaction found",
  "data": {
    "status": "SUCCESSFUL",
    "transactionId": "00000423060111141481697464946545699112233",
    "amount": 50000,
    "senderAccountNumber": "2025143050",
    "senderAccountName": "OLANIYAN CAXTON-MARTINS",
    "senderBankName": "UNITED BANK FOR AFRICA",
    "beneficiaryAccountNumber": "9977658111",
    "beneficiaryAccountName": "MERCHANT(QA Test Merchant)",
    "paymentType": "COLLECTION"
  }
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

const TransferStatus = () => {
    return (
        <div className="py-8 sm:py-10 space-y-16">

            {/* Hero */}
            <section>
                <div className="inline-flex items-center gap-2 bg-brand-50 dark:bg-brand-950/40 text-brand text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
                    <Search className="h-3.5 w-3.5" />
                    API Reference
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
                    Transfer Status
                </h1>
                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl">
                    Gets transaction status. Retrieve the current status of a transaction using the transaction ID or client reference.
                </p>
            </section>

            {/* How Transfer Status Works */}
            <section>
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <Search className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">How Transfer Status Works</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-6 max-w-2xl">
                    This endpoint allows you to poll the current state of any transfer transaction by its <code className="font-mono bg-muted px-1.5 py-0.5 rounded text-foreground text-xs">transactionId</code>. Passpoint processes transfers asynchronously — the initial response only confirms submission, not final outcome.
                </p>

                <div className="space-y-4">
                    {/* Async model callout */}
                    <div className="bg-muted/40 dark:bg-background/40 border border-border rounded-xl p-4 flex items-start gap-3">
                        <Info className="h-4 w-4 text-brand shrink-0 mt-0.5" />
                        <p className="text-xs text-muted-foreground">
                            Passpoint uses an asynchronous processing model. The initial transfer response returns <code className="font-mono bg-muted px-1 py-0.5 rounded">status: "NEW"</code>, which only confirms the transfer was submitted. The final outcome — <code className="font-mono bg-muted px-1 py-0.5 rounded">SUCCESSFUL</code> or <code className="font-mono bg-muted px-1 py-0.5 rounded">FAILED</code> — arrives later. Store the <code className="font-mono bg-muted px-1 py-0.5 rounded">transactionId</code> from the initial response to query status.
                        </p>
                    </div>

                    {/* Transaction lifecycle card */}
                    <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-4">
                        <div className="flex items-center gap-2 mb-1">
                            <ArrowRight className="h-4 w-4 text-brand shrink-0" />
                            <h3 className="text-sm font-semibold text-foreground">Transaction lifecycle</h3>
                        </div>
                        <p className="text-xs text-muted-foreground mb-4">
                            Every transfer moves through the following states in sequence. Poll this endpoint to track progress.
                        </p>
                        <div className="flex flex-wrap items-center gap-2">
                            <div className="flex flex-col items-center gap-1">
                                <span className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-muted text-muted-foreground border border-border">NEW</span>
                                <span className="text-xs text-muted-foreground">Submitted</span>
                            </div>
                            <ArrowRight className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                            <div className="flex flex-col items-center gap-1">
                                <span className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-brand-50 dark:bg-brand-950/40 text-brand border border-brand/20">PENDING</span>
                                <span className="text-xs text-muted-foreground">Accepted</span>
                            </div>
                            <ArrowRight className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                            <div className="flex flex-col items-center gap-1">
                                <span className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-900">PROCESSING</span>
                                <span className="text-xs text-muted-foreground">In transit</span>
                            </div>
                            <ArrowRight className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                            <div className="flex flex-col items-center gap-1 min-w-0">
                                <div className="flex items-center gap-1.5">
                                    <span className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-900">SUCCESSFUL</span>
                                    <span className="text-xs text-muted-foreground">/</span>
                                    <span className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-900">FAILED</span>
                                </div>
                                <span className="text-xs text-muted-foreground">Terminal</span>
                            </div>
                        </div>
                        <div className="overflow-x-auto mt-4">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-border">
                                        <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                                        <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Meaning</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    <tr className="hover:bg-muted/20 transition-colors">
                                        <td className="px-4 py-3"><span className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">NEW</span></td>
                                        <td className="px-4 py-3 text-muted-foreground text-xs">Transfer submitted to Passpoint. Processing has not yet begun.</td>
                                    </tr>
                                    <tr className="hover:bg-muted/20 transition-colors">
                                        <td className="px-4 py-3"><span className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">PENDING</span></td>
                                        <td className="px-4 py-3 text-muted-foreground text-xs">Accepted by the payment network. Awaiting further processing.</td>
                                    </tr>
                                    <tr className="hover:bg-muted/20 transition-colors">
                                        <td className="px-4 py-3"><span className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">PROCESSING</span></td>
                                        <td className="px-4 py-3 text-muted-foreground text-xs">Transfer is actively in transit to the recipient.</td>
                                    </tr>
                                    <tr className="hover:bg-muted/20 transition-colors">
                                        <td className="px-4 py-3"><span className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">SUCCESSFUL</span></td>
                                        <td className="px-4 py-3 text-muted-foreground text-xs">Funds have been delivered to the recipient. Terminal state.</td>
                                    </tr>
                                    <tr className="hover:bg-muted/20 transition-colors">
                                        <td className="px-4 py-3"><span className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">FAILED</span></td>
                                        <td className="px-4 py-3 text-muted-foreground text-xs">Transfer was rejected or could not be completed. Terminal state. Do not retry without investigating the cause.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Webhooks vs polling */}
                    <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-3">
                        <div className="flex items-center gap-2 mb-1">
                            <Bell className="h-4 w-4 text-brand shrink-0" />
                            <h3 className="text-sm font-semibold text-foreground">Webhooks vs. polling — when to use each</h3>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">
                            Webhooks (callbacks) are the primary mechanism for receiving transfer status updates. Use this polling endpoint only as a secondary tool:
                        </p>
                        <ul className="space-y-2">
                            {[
                                "Manual reconciliation — when you need to verify a specific transaction on demand",
                                "Re-syncing after a webhook outage — to recover missed status updates",
                                "User-initiated status checks — when a user requests a refresh in your UI",
                            ].map((item) => (
                                <li key={item} className="flex items-start gap-2">
                                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand shrink-0" />
                                    <span className="text-xs text-muted-foreground">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Polling guidance */}
                    <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-3">
                        <div className="flex items-center gap-2 mb-1">
                            <Clock className="h-4 w-4 text-brand shrink-0" />
                            <h3 className="text-sm font-semibold text-foreground">Polling best practices</h3>
                        </div>
                        <ul className="space-y-2">
                            {[
                                "Poll at reasonable intervals — every 10 to 30 seconds is appropriate. Do not hammer the endpoint.",
                                "Stop polling once the status reaches a terminal state: SUCCESSFUL or FAILED.",
                                "Store the transactionId from the initial transfer response — it is required for every status query.",
                                "A status of SUCCESSFUL means funds have been delivered to the recipient.",
                            ].map((item) => (
                                <li key={item} className="flex items-start gap-2">
                                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand shrink-0" />
                                    <span className="text-xs text-muted-foreground">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* Endpoint + Tables */}
            <section className="space-y-6">
                <div className="flex flex-wrap items-center gap-2 px-4 py-3 bg-muted/30 dark:bg-card/50 border border-border rounded-2xl">
                    <span className="px-2 py-0.5 rounded text-xs font-semibold bg-brand-50 text-brand dark:bg-brand-950/40 dark:text-brand/80">GET</span>
                    <code className="text-xs text-muted-foreground break-all">
                        https://dev.mypasspoint.com/paypass/ft-app/transfer-status
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
                        <Search className="h-4 w-4 text-brand" />
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

export default TransferStatus;
