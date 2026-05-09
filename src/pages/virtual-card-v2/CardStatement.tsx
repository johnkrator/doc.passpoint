import { FileText, Info, BookOpen } from "lucide-react";
import CodeBlock from "@/components/CodeBlock.tsx";

const CardStatement = () => {
    const endpointCode = () => `POST https://{{baseUrl}}/{{cardContext}}/get-card-statement`;
    const requestBodyCode = () => `{
    "startDate":"2024-04-20",
    "endDate":"2024-12-31",
    "cardId":"b9c336d6-ec8d-4153-bd36-433b079461ee",
    "pageNumber": 1,
    "pageSize": 20
}`;
    const curlCode = () => `curl --location 'https://{{baseUrl}}/{{cardContext}}/get-card-statement'
--header 'x-channel-id: CHANNEL_ID'
--header 'x-channel-code: CHANNEL_CODE'
--header 'x-merchant-id: YOUR_MERCHANT_ID'
--data '{
    "startDate":"2024-04-25",
    "endDate":"2024-12-31",
    "cardId":"c222d8a1-6aea-4938-b948-5ed8263daa40",
    "transMode":"debit|credit",
    "pageNumber": 1,
    "pageSize": 20
}'`;
    const responseCode = () => `{
  "responseCode": "00",
  "responseDescription": "Successful",
  "responseMessage": "4 statement items found.",
  "totalCount": 4,
  "pageCount": 1,
  "pageSize": 20,
  "currentPage": 1,
  "data": [
    {
      "cbaReference": "M8",
      "cardId": "c222d8a1-6aea-4938-b948-5ed8263daa40",
      "currency": "USD",
      "openingBalance": "123.00",
      "amount": 175,
      "runningBalance": "298.00",
      "narration": "Card Funding of 175 - Unblocked and Debited Successfully - Funding IFO - b692fbef-8ed3-4046-9159-34191351717d",
      "transactionType": "FundCard",
      "transactionDate": "2024-04-27 07:51:02",
      "credit": true
    },
    {
      "cbaReference": "S9",
      "cardId": "c222d8a1-6aea-4938-b948-5ed8263daa40",
      "currency": "USD",
      "openingBalance": "123.50",
      "amount": 0.5,
      "runningBalance": "123.00",
      "narration": "Charge for Debit Card of 160 - Withdrawal IFO - 63be3c63-a746-4f09-9e32-d98e347afbef",
      "transactionType": "DebitCardCharge",
      "transactionDate": "2024-04-27 07:53:32",
      "debit": true
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
                    Get Card Statement
                </h1>
                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl">
                    Retrieve paginated card statement entries within a specified date range.
                </p>
            </section>

            {/* How Card Statement Works */}
            <section>
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <BookOpen className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">How Card Statement Works</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-6 max-w-2xl">
                    The card statement endpoint returns a ledger-style view of all balance movements on a card — including funding events, purchases, withdrawal charges, and refunds. Unlike the Transactions List which shows authorization events, this shows the actual balance impact of each operation.
                </p>

                <div className="bg-white dark:bg-card border border-border rounded-2xl overflow-hidden mb-4">
                    <div className="px-5 py-3 border-b border-border bg-muted/30">
                        <h4 className="text-sm font-semibold text-foreground">Statement vs. Transactions List</h4>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-border">
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Endpoint</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Shows</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Best for</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {([
                                    { ep: "Card Statement", shows: "All balance movements: funding, charges, purchases, refunds with running balance", best: "Accounting, expense reports, cardholder statements" },
                                    { ep: "Transactions List", shows: "Card authorization events at merchants with auth status", best: "Fraud monitoring, purchase history, dispute investigation" },
                                ] as { ep: string; shows: string; best: string }[]).map(({ ep, shows, best }) => (
                                    <tr key={ep} className="hover:bg-muted/20 transition-colors">
                                        <td className="px-5 py-3.5 font-medium text-sm text-foreground">{ep}</td>
                                        <td className="px-5 py-3.5 text-muted-foreground text-xs">{shows}</td>
                                        <td className="px-5 py-3.5 text-muted-foreground text-xs">{best}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="bg-white dark:bg-card border border-border rounded-2xl overflow-hidden mb-4">
                    <div className="px-5 py-3 border-b border-border bg-muted/30">
                        <h4 className="text-sm font-semibold text-foreground">Response fields explained</h4>
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
                                    { field: "openingBalance", meaning: "Card balance before this transaction was applied." },
                                    { field: "amount", meaning: "The value of this specific ledger entry." },
                                    { field: "runningBalance", meaning: "Card balance after this transaction. Use this to track balance over time." },
                                    { field: "transactionType", meaning: "FundCard (balance added), DebitCardCharge (fee charged), Purchase (merchant charge), Refund (money returned)." },
                                    { field: "credit", meaning: "true if this entry increased the card balance (funding, refund)." },
                                    { field: "debit", meaning: "true if this entry decreased the card balance (purchase, fee, withdrawal)." },
                                    { field: "transMode", meaning: "Use ref::<transactionId> to filter a specific transaction. Use debit or credit to filter by direction." },
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
                        To fetch a statement for a specific transaction by ID, use <strong className="text-foreground">Card Statement by Transaction ID</strong> — set <code className="font-mono text-xs">transMode</code> to <code className="font-mono text-xs">ref::&lt;transactionId&gt;</code>.
                    </p>
                </div>
            </section>

            {/* API Endpoint */}
            <section>
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <FileText className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Card statement</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
                    Fetch card statement ledger entries filtered by date range and optional transaction mode.
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

export default CardStatement;
