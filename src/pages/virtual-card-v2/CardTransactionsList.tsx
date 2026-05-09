import { FileText, Info, List } from "lucide-react";
import CodeBlock from "@/components/CodeBlock.tsx";

const CardTransactionsList = () => {
    const endpointCode = () => `POST https://{{baseUrl}}/{{cardContext}}/card-trans-list`;
    const requestBodyCode = () => `{
    "pageNumber": 1,
    "startDate": "2024-04-02",
    "endDate": "2024-05-02",
    "pageSize": 10,
    "id": "aa806cff-73b3-4fae-ae21-b8c38ade22ca"
}`;
    const curlCode = () => `curl --location 'https://{{baseUrl}}/{{cardContext}}/card-trans-list'
--header 'x-channel-id: CHANNEL_ID'
--header 'x-channel-code: CHANNEL_CODE'
--header 'x-merchant-id: YOUR_MERCHANT_ID'
--data '{
    "startDate":"2024-04-25",
    "endDate":"2024-04-30",
    "id":"c222d8a1-6aea-4938-b948-5ed8263daa40",
    "pageNumber": "1",
    "pageSize":"20"
}'`;
    const responseCode = () => `{
  "responseCode": "00",
  "responseDescription": "Successful",
  "responseMessage": "4 virtual card transaction(s) found.",
  "totalCount": 4,
  "pageCount": 1,
  "pageSize": 10,
  "currentPage": 1,
  "data": [
    {
      "merchantId": "e0b157a2-9245-40b9-8117-d25cadfdcfaa",
      "merchantName": "Chinedu Ojiteli",
      "walletId": "chinedu37dz@gmail.com",
      "transactionId": "df2b3b47-b02e-4f3a-8e7f-16c22af572ad",
      "amount": 4,
      "transactionCharge": 0.5,
      "currency": "USD",
      "cardId": "a1b46c40-efbc-4062-b896-9d67d88b7d62",
      "clientOrderId": "d639c5d7-29df-41da-ade4-20cebaee7c01",
      "cardAcceptorName": "Passpoint Limited",
      "cardAcceptorCity": "Dover County",
      "cardAcceptorState": "Delaware",
      "cardAcceptorCountry": "US",
      "authorizationMessage": "Approved or completed successfully",
      "authorizationStatus": "APPROVED",
      "expired": false,
      "transType": "WITHDRAWAL",
      "transMode": "DEBIT",
      "narration": "Card Withdrawal : USD 4/Charge/USD 0.50/OrderId/d639c5d7-29df-41da-ade4-20cebaee7c01/CardId/a1b46c40-efbc-4062-b896-9d67d88b7d62",
      "eligibleForCrossborder": false,
      "version": 3,
      "dateCreated": "2025-05-22 06:44:28",
      "linkingReference": "M3681"
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
                    Get Card Transactions List
                </h1>
                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl">
                    Retrieve all transactions on a card within a specified date range, paginated.
                </p>
            </section>

            {/* How Card Transactions List Works */}
            <section>
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <List className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">How Transactions List Works</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-6 max-w-2xl">
                    This endpoint returns a paginated list of all transactions for a specific virtual card within a defined date range. Use it for generating card statements, expense reports, fraud monitoring, and reconciliation workflows.
                </p>

                <div className="bg-white dark:bg-card border border-border rounded-2xl overflow-hidden mb-4">
                    <div className="px-5 py-3 border-b border-border bg-muted/30">
                        <h4 className="text-sm font-semibold text-foreground">Request fields explained</h4>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-border">
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Field</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Meaning</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {([
                                    { field: "id", meaning: "The card UUID. Returns transactions for this specific card only." },
                                    { field: "startDate / endDate", meaning: "Date range filter in YYYY-MM-DD format. Narrow this range for faster responses." },
                                    { field: "pageNumber", meaning: "1-based page index. Start with 1 and increment to fetch subsequent pages." },
                                    { field: "pageSize", meaning: "Number of records per page. Recommended: 20–50 for UI display, up to 100 for bulk exports." },
                                ] as { field: string; meaning: string }[]).map(({ field, meaning }) => (
                                    <tr key={field} className="hover:bg-muted/20 transition-colors">
                                        <td className="px-5 py-3.5">
                                            <span className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">{field}</span>
                                        </td>
                                        <td className="px-5 py-3.5 text-muted-foreground text-xs">{meaning}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="bg-white dark:bg-card border border-border rounded-2xl overflow-hidden mb-4">
                    <div className="px-5 py-3 border-b border-border bg-muted/30">
                        <h4 className="text-sm font-semibold text-foreground">Key response fields</h4>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-border">
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Field</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Meaning</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {([
                                    { field: "transType", meaning: "WITHDRAWAL (purchase), FUNDING (card load), REVERSAL (cancelled auth), REFUND (returned purchase)." },
                                    { field: "transMode", meaning: "DEBIT (money left card) or CREDIT (money added to card)." },
                                    { field: "authorizationStatus", meaning: "APPROVED or DECLINED. Declined transactions have an authorizationMessage explaining why." },
                                    { field: "transactionCharge", meaning: "The fee charged for this specific transaction (e.g., withdrawal fee)." },
                                    { field: "cardAcceptorName", meaning: "The merchant where the purchase was made." },
                                    { field: "totalCount", meaning: "Total number of transactions matching the filter. Use with pageSize to calculate totalCount / pageSize = total pages." },
                                ] as { field: string; meaning: string }[]).map(({ field, meaning }) => (
                                    <tr key={field} className="hover:bg-muted/20 transition-colors">
                                        <td className="px-5 py-3.5">
                                            <span className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">{field}</span>
                                        </td>
                                        <td className="px-5 py-3.5 text-muted-foreground text-xs">{meaning}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="bg-muted/40 dark:bg-background/40 border border-border rounded-xl p-4 flex items-start gap-3">
                    <Info className="h-4 w-4 text-brand shrink-0 mt-0.5" />
                    <p className="text-xs text-muted-foreground">
                        For a single specific transaction by ID, use <strong className="text-foreground">Card Transaction</strong>. For ledger-style balance entries including funding events, use <strong className="text-foreground">Card Statement</strong>.
                    </p>
                </div>
            </section>

            {/* API Endpoint */}
            <section>
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <FileText className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Card transactions list</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
                    Filter by card ID and date range to retrieve paginated transaction history.
                </p>

                <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2 px-4 py-3 bg-muted/30 dark:bg-card/50 border border-border rounded-2xl">
                        <span className="px-2 py-0.5 rounded text-xs font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400">POST</span>
                        <code className="text-xs text-muted-foreground break-all">
                            https://{"{{baseUrl}}"}/{"{{cardContext}}"}/card-trans-list
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

export default CardTransactionsList;
