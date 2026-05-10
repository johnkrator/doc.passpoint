import {FileText} from "lucide-react";
import CodeBlock from "@/components/CodeBlock.tsx";

const Report = () => {
    const getTransactionHistoryEndpoint = () => {
        return `POST https://{{baseUrl}}/{{paymentContext}}/ft-app/transaction-history?type=payout`;
    };

    const getTransactionHistoryRequestBodyNGNNotPaginated = () => {
        return `{
    "startDate": "2023-10-15",
    "endDate": "2023-10-30",
    "currency": "NGN",
    "pageNumber": 0,
    "pageSize": 0
}`;
    };

    const getTransactionHistoryRequestBodyNGNPaginated = () => {
        return `{
    "startDate": "2023-10-15",
    "endDate": "2023-10-30",
    "currency": "NGN",
    "pageNumber": 1,
    "pageSize": 5
}`;
    };

    const getTransactionHistoryRequestBodyAllPaginated = () => {
        return `{
    "startDate": "2023-10-15",
    "endDate": "2023-10-30",
    "currency": "all",
    "pageNumber": 1,
    "pageSize": 5
}`;
    };

    const getTransactionHistoryRequestBodyAllNotPaginated = () => {
        return `{
    "startDate": "2023-10-15",
    "endDate": "2023-10-30",
    "currency": "all",
    "pageNumber": 0,
    "pageSize": 0
}`;
    };

    const getTransactionHistoryCurlExampleNGNNotPaginated = () => {
        return `curl --location 'https://{{baseUrl}}/{{paymentContext}}/ft-app/transaction-history?type=payout'
--header 'x-channel-id: CHANNEL_ID'
--header 'x-channel-code: CHANNEL_CODE'
--header 'x-merchant-id: YOUR_MERCHANT_ID'
--header 'Authorization: Bearer YOUR_TOKEN'
--data '{
    "startDate": "2023-10-15",
    "endDate": "2023-10-30",
    "currency": "NGN",
    "pageNumber": 0,
    "pageSize": 0
}'`;
    };

    const getTransactionHistoryCurlExampleNGNPaginated = () => {
        return `curl --location 'https://{{baseUrl}}/{{paymentContext}}/ft-app/transaction-history?type=payout'
--header 'x-channel-id: CHANNEL_ID'
--header 'x-channel-code: CHANNEL_CODE'
--header 'x-merchant-id: YOUR_MERCHANT_ID'
--header 'Authorization: Bearer YOUR_TOKEN'
--data '{
    "startDate": "2023-10-15",
    "endDate": "2023-10-30",
    "currency": "NGN",
    "pageNumber": 1,
    "pageSize": 5
}'`;
    };

    const getTransactionHistoryCurlExampleAllPaginated = () => {
        return `curl --location 'https://{{baseUrl}}/{{paymentContext}}/ft-app/transaction-history?type=payout'
--header 'x-channel-id: CHANNEL_ID'
--header 'x-channel-code: CHANNEL_CODE'
--header 'x-merchant-id: YOUR_MERCHANT_ID'
--header 'Authorization: Bearer YOUR_TOKEN'
--data '{
    "startDate": "2023-10-15",
    "endDate": "2023-10-30",
    "currency": "all",
    "pageNumber": 1,
    "pageSize": 5
}'`;
    };

    const getTransactionHistoryCurlExampleAllNotPaginated = () => {
        return `curl --location 'https://{{baseUrl}}/{{paymentContext}}/ft-app/transaction-history?type=payout'
--header 'x-channel-id: CHANNEL_ID'
--header 'x-channel-code: CHANNEL_CODE'
--header 'x-merchant-id: YOUR_MERCHANT_ID'
--header 'Authorization: Bearer YOUR_TOKEN'
--data '{
    "startDate": "2023-10-15",
    "endDate": "2023-10-30",
    "currency": "all",
    "pageNumber": 0,
    "pageSize": 0
}'`;
    };

    const getExampleResponsePaginated = () => {
        return `{
  "responseCode": "00",
  "responseDescription": "Successful",
  "responseMessage": "5 transaction(s) found.",
  "count": 5,
  "data": [
    {
      "transactionId": "65eef400-fa65-46da-b5f9-e68c6d8d9b85",
      "paymentRef": "S58",
      "merchantId": "e0b157a2-9245-40b9-8117-d25cadfdcfaa",
      "walletId": "chinedu37dz@gmail.com",
      "beneficiaryWalletId": "josh@mypasspoint.com",
      "fee": 0,
      "vat": 0,
      "currency": "NGN",
      "narration": "Test Transfer",
      "senderAccountNumber": "9977657822",
      "senderAccountName": "MERCHANT(Kelechi Motors)",
      "senderBankName": "Providus Bank",
      "beneficiaryAccountNumber": "",
      "beneficiaryAccountName": "MERCHANT(Josh Merchant)",
      "beneficiaryBankCode": "000000",
      "beneficiaryBankName": "Providus Bank",
      "finalResponseCode": "00",
      "finalResponseMessage": "Successful",
      "transactionStatus": "SUCCESSFUL",
      "dateCreated": "2023-10-30T04:29:16.000+00:00",
      "dateUpdated": "2023-10-30T04:29:18.000+00:00",
      "transactionCategory": "PAYOUT",
      "amount": 2150
    }
    // ... more transactions
  ]
}`;
    };

    return (
        <div className="py-8 sm:py-10 space-y-16">

            {/* Hero */}
            <section>
                <div className="inline-flex items-center gap-2 bg-brand-50 dark:bg-brand-950/40 text-brand text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
                    <FileText className="h-3.5 w-3.5" />
                    API Reference
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
                    Report
                </h1>
                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl">
                    Retrieve transaction history and reports for payout transactions. All variants share the same endpoint with different body parameters.
                </p>
            </section>

            {/* Transaction History  NGN Not Paginated */}
            <section>
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <FileText className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Transaction history  NGN  not paginated</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
                    Returns all NGN payout transactions in the specified date range without pagination.
                </p>

                <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2 px-4 py-3 bg-muted/30 dark:bg-card/50 border border-border rounded-2xl">
                        <span className="px-2 py-0.5 rounded text-xs font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400">POST</span>
                        <code className="text-xs text-muted-foreground break-all">
                            https://{"{{baseUrl}}"}/{"{{paymentContext}}"}/ft-app/transaction-history?type=payout
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
                                    <td className="px-5 py-3.5 text-muted-foreground">3</td>
                                </tr>
                                <tr className="hover:bg-muted/20 transition-colors">
                                    <td className="px-5 py-3.5 font-mono text-xs text-foreground">x-channel-code</td>
                                    <td className="px-5 py-3.5 text-muted-foreground">legacy-api-user</td>
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
                            <CodeBlock>{getTransactionHistoryEndpoint()}</CodeBlock>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">Request body</h4>
                            <CodeBlock language="json">{getTransactionHistoryRequestBodyNGNNotPaginated()}</CodeBlock>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">cURL example</h4>
                            <CodeBlock language="bash">{getTransactionHistoryCurlExampleNGNNotPaginated()}</CodeBlock>
                        </div>
                    </div>
                </div>
            </section>

            {/* Transaction History  NGN Paginated */}
            <section>
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <FileText className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Transaction history  NGN  paginated</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
                    Returns NGN payout transactions with pagination enabled.
                </p>

                <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2 px-4 py-3 bg-muted/30 dark:bg-card/50 border border-border rounded-2xl">
                        <span className="px-2 py-0.5 rounded text-xs font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400">POST</span>
                        <code className="text-xs text-muted-foreground break-all">
                            https://{"{{baseUrl}}"}/{"{{paymentContext}}"}/ft-app/transaction-history?type=payout
                        </code>
                    </div>

                    <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-5">
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">Request body</h4>
                            <CodeBlock language="json">{getTransactionHistoryRequestBodyNGNPaginated()}</CodeBlock>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">cURL example</h4>
                            <CodeBlock language="bash">{getTransactionHistoryCurlExampleNGNPaginated()}</CodeBlock>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">Response</h4>
                            <CodeBlock language="json">{getExampleResponsePaginated()}</CodeBlock>
                        </div>
                    </div>
                </div>
            </section>

            {/* Transaction History  All Currencies Paginated */}
            <section>
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <FileText className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Transaction history  all currencies  paginated</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
                    Returns payout transactions for all currencies with pagination enabled.
                </p>

                <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2 px-4 py-3 bg-muted/30 dark:bg-card/50 border border-border rounded-2xl">
                        <span className="px-2 py-0.5 rounded text-xs font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400">POST</span>
                        <code className="text-xs text-muted-foreground break-all">
                            https://{"{{baseUrl}}"}/{"{{paymentContext}}"}/ft-app/transaction-history?type=payout
                        </code>
                    </div>

                    <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-5">
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">Request body</h4>
                            <CodeBlock language="json">{getTransactionHistoryRequestBodyAllPaginated()}</CodeBlock>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">cURL example</h4>
                            <CodeBlock language="bash">{getTransactionHistoryCurlExampleAllPaginated()}</CodeBlock>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">Response</h4>
                            <CodeBlock language="json">{getExampleResponsePaginated()}</CodeBlock>
                        </div>
                    </div>
                </div>
            </section>

            {/* Transaction History  All Currencies Not Paginated */}
            <section>
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <FileText className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Transaction history  all currencies  not paginated</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
                    Returns all payout transactions for all currencies without pagination.
                </p>

                <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2 px-4 py-3 bg-muted/30 dark:bg-card/50 border border-border rounded-2xl">
                        <span className="px-2 py-0.5 rounded text-xs font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400">POST</span>
                        <code className="text-xs text-muted-foreground break-all">
                            https://{"{{baseUrl}}"}/{"{{paymentContext}}"}/ft-app/transaction-history?type=payout
                        </code>
                    </div>

                    <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-5">
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">Request body</h4>
                            <CodeBlock language="json">{getTransactionHistoryRequestBodyAllNotPaginated()}</CodeBlock>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">cURL example</h4>
                            <CodeBlock language="bash">{getTransactionHistoryCurlExampleAllNotPaginated()}</CodeBlock>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">Response</h4>
                            <CodeBlock language="json">{getExampleResponsePaginated()}</CodeBlock>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Report;
