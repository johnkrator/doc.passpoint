import { FileText, Info, Search } from "lucide-react";
import CodeBlock from "@/components/CodeBlock.tsx";

const CardStatementByTransactionId = () => {
    const endpointCode = () => `POST https://{{baseUrl}}/{{cardContext}}/get-card-statement`;
    const requestBodyCode = () => `{
    "startDate":"2024-04-20",
    "endDate":"2024-12-31",
    "cardId":"b9c336d6-ec8d-4153-bd36-433b079461ee",
    "transMode":"ref::xxxxx",
    "pageNumber": 1,
    "pageSize": 20
}`;
    const curlCode = () => `curl --location --request GET 'https://{{baseUrl}}/{{cardContext}}/get-card-statement'
--header 'Content-Type: application/json'
--data '{
    "startDate":"2024-04-20",
    "endDate":"2024-12-31",
    "cardId":"b9c336d6-ec8d-4153-bd36-433b079461ee",
    "transMode":"ref::xxxxx",
    "pageNumber": 1,
    "pageSize": 20
}
/**
* where xxxxx = transaction id
* the transaction id must be prefixed with ref::
*/'`;
    const responseCode = () => `{
  "responseCode": "00",
  "responseDescription": "Successful",
  "responseMessage": "1 statement items found.",
  "totalCount": 1,
  "pageCount": 1,
  "pageSize": 1,
  "currentPage": 1,
  "data": [
    {
      "cbaReference": "M2",
      "cardId": "c222d8a1-6aea-4938-b948-5ed8263daa40",
      "currency": "USD",
      "openingBalance": "0.00",
      "amount": 150,
      "runningBalance": "150.00",
      "narration": "Card Funding of 150 - Card Funding - Funding IFO - 809dae1e-eebc-4f56-9480-dfd06b5fe5a4",
      "transactionType": "FundCard",
      "transactionDate": "2024-04-27 03:18:36",
      "credit": true
    }
  ]
}`;

    return (
        <div className="py-8 sm:py-10 space-y-16">

            {/* Hero */}
            <section>
                <div className="inline-flex items-center gap-2 bg-brand-50 dark:bg-brand-950/40 text-brand text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
                    <FileText className="h-3.5 w-3.5" />
                    API Reference
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
                    Get Card Statement by Transaction ID
                </h1>
                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl">
                    Fetch a single card statement ledger entry by transaction ID using the <code className="text-xs">ref::</code> prefix.
                </p>
            </section>

            {/* How Statement by Transaction ID Works */}
            <section>
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <Search className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">How Statement by Transaction ID Works</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-6 max-w-2xl">
                    This is a filtered variant of the Card Statement endpoint that pinpoints a single ledger entry by its transaction ID. Use it when you need the exact ledger impact  opening balance, amount, closing balance  for one specific transaction.
                </p>

                <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-4 mb-4">
                    <div className="space-y-3">
                        <div className="flex items-start gap-3">
                            <Info className="h-4 w-4 text-brand shrink-0 mt-0.5" />
                            <div>
                                <p className="text-sm font-semibold text-foreground mb-0.5">The ref:: prefix is required</p>
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                    Set <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">transMode</code> to <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">ref::&lt;transactionId&gt;</code>  for example <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">ref::M2</code> or <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">ref::809dae1e-eebc-4f56-9480-dfd06b5fe5a4</code>. The prefix tells the API you are filtering by transaction reference rather than by debit/credit direction.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <Info className="h-4 w-4 text-brand shrink-0 mt-0.5" />
                            <div>
                                <p className="text-sm font-semibold text-foreground mb-0.5">Date range is still required</p>
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                    Even when filtering by transaction ID, you must supply <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">startDate</code> and <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">endDate</code>. Set a broad range (e.g., last 12 months) if you are unsure when the transaction occurred.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <Info className="h-4 w-4 text-brand shrink-0 mt-0.5" />
                            <div>
                                <p className="text-sm font-semibold text-foreground mb-0.5">Use for dispute evidence</p>
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                    This endpoint provides the <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">openingBalance</code>, <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">amount</code>, and <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">runningBalance</code>  the exact ledger footprint of the transaction. This is the authoritative source for resolving balance discrepancies and providing evidence in cardholder disputes.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-muted/40 dark:bg-background/40 border border-border rounded-xl p-4 flex items-start gap-3">
                    <Info className="h-4 w-4 text-brand shrink-0 mt-0.5" />
                    <p className="text-xs text-muted-foreground">
                        This endpoint uses the same URL as <strong className="text-foreground">Card Statement</strong>  the <code className="font-mono text-xs">ref::</code> prefix in <code className="font-mono text-xs">transMode</code> is what changes the behavior.
                    </p>
                </div>
            </section>

            {/* API Endpoint */}
            <section>
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <FileText className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Statement by transaction ID</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
                    Set <code className="text-xs">transMode</code> to <code className="text-xs">ref::&lt;transactionId&gt;</code> to retrieve a specific ledger entry.
                </p>

                <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2 px-4 py-3 bg-muted/30 dark:bg-card/50 border border-border rounded-2xl">
                        <span className="px-2 py-0.5 rounded text-xs font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400">POST</span>
                        <code className="text-xs text-muted-foreground break-all">
                            https://{"{{baseUrl}}"}/{"{{cardContext}}"}/get-card-statement
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

export default CardStatementByTransactionId;
