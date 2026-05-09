import {FileText, Info, BarChart3, List} from "lucide-react";
import CodeBlock from "@/components/CodeBlock.tsx";

const CollectionReport = () => {
    const getTransactionHistoryAllPaginatedEndpoint = () => `POST https://{{baseUrl}}/{{paymentContext}}/ft-app/transaction-history?type=collection`;

    const getTransactionHistoryAllPaginatedRequestBody = () => `{
    "startDate": "2023-10-15",
    "endDate": "2023-10-30",
    "currency": "all",
    "pageNumber": 1,
    "pageSize": 2
}`;

    const getTransactionHistoryAllPaginatedCurlRequest = () => `curl --location 'https://{{baseUrl}}/{{paymentContext}}/ft-app/transaction-history?type=collection'
--header 'x-channel-id: CHANNEL_ID'
--header 'x-channel-code: CHANNEL_CODE'
--header 'x-merchant-id: YOUR_MERCHANT_ID'
--data '{
    "startDate": "2023-10-15",
    "endDate": "2023-10-30",
    "currency": "all",
    "pageNumber": 1,
    "pageSize": 2
}'`;

    const getTransactionHistoryAllPaginatedResponse = () => `{
  "responseCode": "00",
  "responseDescription": "Successful",
  "responseMessage": "2 transaction(s) found.",
  "count": 2,
  "data": [
    {
      "transactionId": "00000423060111141481697464946545699112233",
      "paymentRef": "M47",
      "merchantId": "e0b157a2-9245-40b9-8117-d25cadfdcfaa",
      "walletId": "chinedu37dz@gmail.com",
      "fee": 0,
      "vat": 0,
      "currency": "NGN",
      "narration": "FROM UBA/ OLANIYAN CAXTON-MARTINS-MOB2/UTO/To PASSPOINT Caxton-Ma)/SociaLiga website and mailchimp/0000042306011114185216944910499",
      "senderAccountNumber": "2025143050",
      "senderAccountName": "OLANIYAN CAXTON-MARTINS",
      "senderBankName": "UNITED BANK FOR AFRICA",
      "beneficiaryAccountNumber": "9977657822",
      "beneficiaryAccountName": "MERCHANT(Kelechi Motors)",
      "beneficiaryBankCode": "000023",
      "beneficiaryBankName": "Providus Bank",
      "finalResponseCode": "00",
      "finalResponseMessage": "Successful",
      "transactionStatus": "SUCCESSFUL",
      "dateCreated": "2023-10-28T09:25:51.000+00:00",
      "dateUpdated": "2023-10-28T09:25:51.000+00:00",
      "transactionCategory": "COLLECTION",
      "amount": 50000
    },
    {
      "transactionId": "00000423060111141481697464946545699112",
      "paymentRef": "M33",
      "providerRef": "20923060100165745406005602112",
      "merchantId": "e0b157a2-9245-40b9-8117-d25cadfdcfaa",
      "walletId": "chinedu37dz@gmail.com",
      "fee": 0,
      "vat": 0,
      "currency": "NGN",
      "narration": "FROM UBA/ OLANIYAN CAXTON-MARTINS-MOB2/UTO/To PASSPOINT Caxton-Ma)/SociaLiga website and mailchimp/0000042306011114185216944910499",
      "senderAccountNumber": "2025143050",
      "senderAccountName": "OLANIYAN CAXTON-MARTINS",
      "senderBankName": "UNITED BANK FOR AFRICA",
      "beneficiaryAccountNumber": "9977657822",
      "beneficiaryAccountName": "MERCHANT(Kelechi Motors)",
      "beneficiaryBankCode": "000023",
      "finalResponseCode": "00",
      "finalResponseMessage": "Successful",
      "transactionStatus": "SUCCESSFUL",
      "dateCreated": "2023-10-27T04:44:32.000+00:00",
      "dateUpdated": "2023-10-27T04:44:33.000+00:00",
      "transactionCategory": "COLLECTION",
      "amount": 1000
    }
  ]
}`;

    const getTransactionHistoryNGNPaginatedRequestBody = () => `{
    "startDate": "2023-10-15",
    "endDate": "2023-10-30",
    "currency": "NGN",
    "pageNumber": 1,
    "pageSize": 2
}`;

    const getTransactionHistoryNGNPaginatedCurlRequest = () => `curl --location 'https://{{baseUrl}}/{{paymentContext}}/ft-app/transaction-history?type=collection'
--header 'x-channel-id: CHANNEL_ID'
--header 'x-channel-code: CHANNEL_CODE'
--header 'x-merchant-id: YOUR_MERCHANT_ID'
--data '{
    "startDate": "2023-10-15",
    "endDate": "2023-10-30",
    "currency": "NGN",
    "pageNumber": 1,
    "pageSize": 2
}'`;

    const getTransactionHistoryNGNPaginatedResponse = () => `{
  "responseCode": "00",
  "responseDescription": "Successful",
  "responseMessage": "2 transaction(s) found.",
  "count": 2,
  "data": [
    {
      "transactionId": "00000423060111141481697464946545699112233",
      "paymentRef": "M47",
      "merchantId": "e0b157a2-9245-40b9-8117-d25cadfdcfaa",
      "walletId": "chinedu37dz@gmail.com",
      "transactionAmount": 50000,
      "settledAmount": 50000,
      "fee": 0,
      "vat": 0,
      "currency": "NGN",
      "narration": "FROM UBA/ OLANIYAN CAXTON-MARTINS-MOB2/UTO/To PASSPOINT Caxton-Ma)/SociaLiga website and mailchimp/0000042306011114185216944910499",
      "senderAccountNumber": "2025143050",
      "senderAccountName": "OLANIYAN CAXTON-MARTINS",
      "senderBankName": "UNITED BANK FOR AFRICA",
      "beneficiaryAccountNumber": "9977657822",
      "beneficiaryAccountName": "MERCHANT(Kelechi Motors)",
      "beneficiaryBankCode": "000023",
      "beneficiaryBankName": "Providus Bank",
      "cbaCustId": "b0d2d564-ce1e-4366-36ac-08dbd61ddffb",
      "liened": false,
      "lienRemoved": false,
      "initialResponseCode": "Z01",
      "initialResponseMessage": "New",
      "finalResponseCode": "00",
      "finalResponseMessage": "Successful",
      "dateCreated": "2023-10-28T09:25:51.000+00:00",
      "dateUpdated": "2023-10-28T09:25:51.000+00:00",
      "transactionCategory": "COLLECTION",
      "callbackSent": false
    },
    {
      "transactionId": "00000423060111141481697464946545699112",
      "paymentRef": "M33",
      "providerRef": "20923060100165745406005602112",
      "merchantId": "e0b157a2-9245-40b9-8117-d25cadfdcfaa",
      "walletId": "chinedu37dz@gmail.com",
      "transactionAmount": 1000,
      "settledAmount": 1000,
      "fee": 0,
      "vat": 0,
      "currency": "NGN",
      "narration": "FROM UBA/ OLANIYAN CAXTON-MARTINS-MOB2/UTO/To PASSPOINT Caxton-Ma)/SociaLiga website and mailchimp/0000042306011114185216944910499",
      "senderAccountNumber": "2025143050",
      "senderAccountName": "OLANIYAN CAXTON-MARTINS",
      "senderBankName": "UNITED BANK FOR AFRICA",
      "beneficiaryAccountNumber": "9977657822",
      "beneficiaryAccountName": "MERCHANT(Kelechi Motors)",
      "beneficiaryBankCode": "000023",
      "cbaCustId": "b0d2d564-ce1e-4366-36ac-08dbd61ddffb",
      "liened": false,
      "lienRemoved": false,
      "initialResponseCode": "Z01",
      "initialResponseMessage": "New",
      "finalResponseCode": "00",
      "finalResponseMessage": "Successful",
      "dateCreated": "2023-10-27T04:44:32.000+00:00",
      "dateUpdated": "2023-10-27T04:44:33.000+00:00",
      "transactionCategory": "COLLECTION",
      "callbackSent": false
    }
  ]
}`;

    const getTransactionHistoryAllNotPaginatedRequestBody = () => `{
    "startDate": "2023-10-15",
    "endDate": "2023-10-30",
    "currency": "all",
    "pageNumber": 0,
    "pageSize": 0
}`;

    const getTransactionHistoryAllNotPaginatedCurlRequest = () => `curl --location 'https://{{baseUrl}}/{{paymentContext}}/ft-app/transaction-history?type=collection'
--header 'x-channel-id: CHANNEL_ID'
--header 'x-channel-code: CHANNEL_CODE'
--header 'x-merchant-id: YOUR_MERCHANT_ID'
--data '{
    "startDate": "2023-10-15",
    "endDate": "2023-10-30",
    "currency": "all",
    "pageNumber": 0,
    "pageSize": 0
}'`;

    const getTransactionHistoryAllNotPaginatedResponse = () => `{
  "responseCode": "00",
  "responseDescription": "Successful",
  "responseMessage": "3 transaction(s) found.",
  "count": 3,
  "data": [
    {
      "transactionId": "00000423060111141481697464946545699112233",
      "paymentRef": "M47",
      "merchantId": "e0b157a2-9245-40b9-8117-d25cadfdcfaa",
      "walletId": "chinedu37dz@gmail.com",
      "transactionAmount": 50000,
      "settledAmount": 50000,
      "fee": 0,
      "vat": 0,
      "currency": "NGN",
      "narration": "FROM UBA/ OLANIYAN CAXTON-MARTINS-MOB2/UTO/To PASSPOINT Caxton-Ma)/SociaLiga website and mailchimp/0000042306011114185216944910499",
      "senderAccountNumber": "2025143050",
      "senderAccountName": "OLANIYAN CAXTON-MARTINS",
      "senderBankName": "UNITED BANK FOR AFRICA",
      "beneficiaryAccountNumber": "9977657822",
      "beneficiaryAccountName": "MERCHANT(Kelechi Motors)",
      "beneficiaryBankCode": "000023",
      "beneficiaryBankName": "Providus Bank",
      "cbaCustId": "b0d2d564-ce1e-4366-36ac-08dbd61ddffb",
      "liened": false,
      "lienRemoved": false,
      "initialResponseCode": "Z01",
      "initialResponseMessage": "New",
      "finalResponseCode": "00",
      "finalResponseMessage": "Successful",
      "dateCreated": "2023-10-28T09:25:51.000+00:00",
      "dateUpdated": "2023-10-28T09:25:51.000+00:00",
      "transactionCategory": "COLLECTION",
      "callbackSent": false
    }
  ]
}`;

    const getVirtualAccountsPaginatedEndpoint = () => `POST https://{{baseUrl}}/{{paymentContext}}/ft-app/acct-list`;

    const getVirtualAccountsPaginatedRequestBody = () => `{
    "startDate": "2023-10-15",
    "endDate": "2023-11-08",
    "currency": "all",
    "pageNumber": 1,
    "pageSize": 5
}`;

    const getVirtualAccountsPaginatedCurlRequest = () => `curl --location 'https://{{baseUrl}}/{{paymentContext}}/ft-app/acct-list'
--header 'x-channel-id: CHANNEL_ID'
--header 'x-channel-code: CHANNEL_CODE'
--header 'x-merchant-id: YOUR_MERCHANT_ID'
--data '{
    "startDate": "2023-10-15",
    "endDate": "2023-11-08",
    "currency": "all",
    "pageNumber": 1,
    "pageSize": 5
}'`;

    const getVirtualAccountsNotPaginatedRequestBody = () => `{
    "startDate": "2023-10-15",
    "endDate": "2023-11-05",
    "currency": "all",
    "pageNumber": 0,
    "pageSize": 0
}`;

    const getVirtualAccountsNotPaginatedCurlRequest = () => `curl --location 'https://{{baseUrl}}/{{paymentContext}}/ft-app/acct-list'
--header 'x-channel-id: CHANNEL_ID'
--header 'x-channel-code: CHANNEL_CODE'
--header 'x-merchant-id: YOUR_MERCHANT_ID'
--data '{
    "startDate": "2023-10-15",
    "endDate": "2023-11-05",
    "currency": "all",
    "pageNumber": 0,
    "pageSize": 0
}'`;

    const headersTable = (
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
    );

    return (
        <div className="py-8 sm:py-10 space-y-16">

            {/* Hero */}
            <section>
                <div className="inline-flex items-center gap-2 bg-brand-50 dark:bg-brand-950/40 text-brand text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
                    <FileText className="h-3.5 w-3.5" />
                    API Reference
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
                    Collection Report
                </h1>
                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl">
                    Retrieve comprehensive transaction history and virtual account reports with flexible pagination
                    options. Query by date range, currency, and pagination settings.
                </p>
            </section>

            {/* How Collection Reporting Works */}
            <section>
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <BarChart3 className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">How Collection Reporting Works</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-2xl">
                    This page covers two distinct but related endpoints for querying your collection activity. Understanding when to use each one helps you build accurate reconciliation and auditing workflows.
                </p>

                <div className="space-y-6">
                    {/* Two Endpoints */}
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6">
                            <div className="flex items-center gap-2 mb-3">
                                <span className="px-2 py-0.5 rounded text-xs font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400">POST</span>
                                <code className="text-xs text-muted-foreground">/ft-app/transaction-history</code>
                            </div>
                            <h3 className="text-sm font-semibold text-foreground mb-2">Transaction History</h3>
                            <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                                Reports on MoMo and bank transfer collection transactions. Returns inbound payment records including sender details, amounts, and settlement status.
                            </p>
                            <p className="text-xs font-medium text-foreground mb-1">Use this for:</p>
                            <ul className="text-xs text-muted-foreground space-y-1">
                                <li className="flex items-start gap-1.5"><span className="text-brand mt-0.5">•</span><span>Reconciling received payments</span></li>
                                <li className="flex items-start gap-1.5"><span className="text-brand mt-0.5">•</span><span>Viewing inflows over a date range</span></li>
                                <li className="flex items-start gap-1.5"><span className="text-brand mt-0.5">•</span><span>Investigating a specific collection</span></li>
                            </ul>
                        </div>

                        <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6">
                            <div className="flex items-center gap-2 mb-3">
                                <span className="px-2 py-0.5 rounded text-xs font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400">POST</span>
                                <code className="text-xs text-muted-foreground">/ft-app/acct-list</code>
                            </div>
                            <h3 className="text-sm font-semibold text-foreground mb-2">Virtual Account List</h3>
                            <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                                Lists all virtual bank accounts issued to your merchant. Returns account metadata including type, status, and creation date.
                            </p>
                            <p className="text-xs font-medium text-foreground mb-1">Use this for:</p>
                            <ul className="text-xs text-muted-foreground space-y-1">
                                <li className="flex items-start gap-1.5"><span className="text-brand mt-0.5">•</span><span>Auditing all issued virtual accounts</span></li>
                                <li className="flex items-start gap-1.5"><span className="text-brand mt-0.5">•</span><span>Checking active or inactive status</span></li>
                                <li className="flex items-start gap-1.5"><span className="text-brand mt-0.5">•</span><span>Listing accounts by currency or type</span></li>
                            </ul>
                        </div>
                    </div>

                    {/* Pagination & Date Filtering */}
                    <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-4">
                        <div className="flex items-center gap-2 mb-1">
                            <List className="h-4 w-4 text-brand" />
                            <h3 className="text-sm font-semibold text-foreground">Pagination and Date Filtering</h3>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                            Both endpoints support paginated and non-paginated query modes using the same request body shape.
                        </p>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-border">
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Mode</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">pageNumber</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">pageSize</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Notes</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    <tr className="hover:bg-muted/20 transition-colors">
                                        <td className="px-4 py-3 text-xs font-medium text-foreground">Paginated</td>
                                        <td className="px-4 py-3 font-mono text-xs text-muted-foreground">1, 2, 3…</td>
                                        <td className="px-4 py-3 font-mono text-xs text-muted-foreground">e.g. 25</td>
                                        <td className="px-4 py-3 text-xs text-muted-foreground">Recommended for large date ranges</td>
                                    </tr>
                                    <tr className="hover:bg-muted/20 transition-colors">
                                        <td className="px-4 py-3 text-xs font-medium text-foreground">Non-paginated</td>
                                        <td className="px-4 py-3 font-mono text-xs text-muted-foreground">0</td>
                                        <td className="px-4 py-3 font-mono text-xs text-muted-foreground">0</td>
                                        <td className="px-4 py-3 text-xs text-muted-foreground">Returns all records in date range</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="bg-muted/40 dark:bg-background/40 border border-border rounded-xl p-4 flex items-start gap-3">
                            <Info className="h-4 w-4 text-brand shrink-0 mt-0.5" />
                            <p className="text-xs text-muted-foreground">Use <code className="bg-muted px-1 py-0.5 rounded">startDate</code> and <code className="bg-muted px-1 py-0.5 rounded">endDate</code> to scope queries to a time window. For large date ranges, always use the paginated variant to avoid timeouts and oversized responses.</p>
                        </div>
                    </div>

                    {/* Transaction History Response Field Glossary */}
                    <div className="bg-white dark:bg-card border border-border rounded-2xl overflow-hidden">
                        <div className="px-5 py-3 border-b border-border bg-muted/30">
                            <h3 className="text-sm font-semibold text-foreground">Transaction History — Response Field Reference</h3>
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
                                        <td className="px-5 py-3.5"><span className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">transactionAmount</span></td>
                                        <td className="px-5 py-3.5 text-xs text-muted-foreground">Gross amount received from the sender before any fees or deductions.</td>
                                    </tr>
                                    <tr className="hover:bg-muted/20 transition-colors">
                                        <td className="px-5 py-3.5"><span className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">settledAmount</span></td>
                                        <td className="px-5 py-3.5 text-xs text-muted-foreground">Net amount credited to your wallet after platform fees are deducted.</td>
                                    </tr>
                                    <tr className="hover:bg-muted/20 transition-colors">
                                        <td className="px-5 py-3.5"><span className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">paymentRef</span></td>
                                        <td className="px-5 py-3.5 text-xs text-muted-foreground">The reference tied to the virtual account. For dynamic accounts, this is your original order or client reference.</td>
                                    </tr>
                                    <tr className="hover:bg-muted/20 transition-colors">
                                        <td className="px-5 py-3.5"><span className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">senderAccountName</span></td>
                                        <td className="px-5 py-3.5 text-xs text-muted-foreground">The full name of the sender as registered with their bank.</td>
                                    </tr>
                                    <tr className="hover:bg-muted/20 transition-colors">
                                        <td className="px-5 py-3.5"><span className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">senderAccountNumber</span></td>
                                        <td className="px-5 py-3.5 text-xs text-muted-foreground">The sender's bank account number from which the payment originated.</td>
                                    </tr>
                                    <tr className="hover:bg-muted/20 transition-colors">
                                        <td className="px-5 py-3.5"><span className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">dateCreated</span></td>
                                        <td className="px-5 py-3.5 text-xs text-muted-foreground">Timestamp of when the payment was received and the transaction record was created.</td>
                                    </tr>
                                    <tr className="hover:bg-muted/20 transition-colors">
                                        <td className="px-5 py-3.5"><span className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">transactionStatus</span></td>
                                        <td className="px-5 py-3.5 text-xs text-muted-foreground">
                                            Current status of the transaction.{" "}
                                            <span className="font-mono bg-muted px-1 py-0.5 rounded text-xs">SUCCESSFUL</span>{" "}
                                            means funds have been credited.{" "}
                                            <span className="font-mono bg-muted px-1 py-0.5 rounded text-xs">PENDING</span>{" "}
                                            means processing is in progress.{" "}
                                            <span className="font-mono bg-muted px-1 py-0.5 rounded text-xs">FAILED</span>{" "}
                                            means the payment did not settle.
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>

            {/* Transaction History — All Currency — Paginated */}
            <section>
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <FileText className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Transaction history — all currency — paginated</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
                    Returns the list of transactions across all currencies with pagination support.
                </p>

                <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2 px-4 py-3 bg-muted/30 dark:bg-card/50 border border-border rounded-2xl">
                        <span className="px-2 py-0.5 rounded text-xs font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400">POST</span>
                        <code className="text-xs text-muted-foreground break-all">
                            https://{"{{baseUrl}}"}/{"{{paymentContext}}"}/ft-app/transaction-history?type=collection
                        </code>
                    </div>

                    {headersTable}

                    <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-5">
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">Endpoint</h4>
                            <CodeBlock>{getTransactionHistoryAllPaginatedEndpoint()}</CodeBlock>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">Request body</h4>
                            <CodeBlock language="json">{getTransactionHistoryAllPaginatedRequestBody()}</CodeBlock>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">cURL example</h4>
                            <CodeBlock language="bash">{getTransactionHistoryAllPaginatedCurlRequest()}</CodeBlock>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">Response</h4>
                            <CodeBlock language="json">{getTransactionHistoryAllPaginatedResponse()}</CodeBlock>
                        </div>
                    </div>
                </div>
            </section>

            {/* Transaction History — NGN — Paginated */}
            <section>
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <FileText className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Transaction history — NGN — paginated</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
                    Returns the list of NGN transactions with detailed settlement information.
                </p>

                <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2 px-4 py-3 bg-muted/30 dark:bg-card/50 border border-border rounded-2xl">
                        <span className="px-2 py-0.5 rounded text-xs font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400">POST</span>
                        <code className="text-xs text-muted-foreground break-all">
                            https://{"{{baseUrl}}"}/{"{{paymentContext}}"}/ft-app/transaction-history?type=collection
                        </code>
                    </div>

                    {headersTable}

                    <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-5">
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">Endpoint</h4>
                            <CodeBlock>{getTransactionHistoryAllPaginatedEndpoint()}</CodeBlock>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">Request body</h4>
                            <CodeBlock language="json">{getTransactionHistoryNGNPaginatedRequestBody()}</CodeBlock>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">cURL example</h4>
                            <CodeBlock language="bash">{getTransactionHistoryNGNPaginatedCurlRequest()}</CodeBlock>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">Response</h4>
                            <CodeBlock language="json">{getTransactionHistoryNGNPaginatedResponse()}</CodeBlock>
                        </div>
                    </div>
                </div>
            </section>

            {/* Transaction History — All Currency — Not Paginated */}
            <section>
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <FileText className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Transaction history — all currency — not paginated</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
                    Returns the complete list of transactions without pagination. Set pageNumber and pageSize to 0.
                </p>

                <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2 px-4 py-3 bg-muted/30 dark:bg-card/50 border border-border rounded-2xl">
                        <span className="px-2 py-0.5 rounded text-xs font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400">POST</span>
                        <code className="text-xs text-muted-foreground break-all">
                            https://{"{{baseUrl}}"}/{"{{paymentContext}}"}/ft-app/transaction-history?type=collection
                        </code>
                    </div>

                    {headersTable}

                    <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-5">
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">Endpoint</h4>
                            <CodeBlock>{getTransactionHistoryAllPaginatedEndpoint()}</CodeBlock>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">Request body</h4>
                            <CodeBlock language="json">{getTransactionHistoryAllNotPaginatedRequestBody()}</CodeBlock>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">cURL example</h4>
                            <CodeBlock language="bash">{getTransactionHistoryAllNotPaginatedCurlRequest()}</CodeBlock>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">Response</h4>
                            <CodeBlock language="json">{getTransactionHistoryAllNotPaginatedResponse()}</CodeBlock>
                        </div>
                    </div>
                </div>
            </section>

            {/* List Virtual Accounts — All Currency — Paginated */}
            <section>
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <FileText className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">List virtual accounts — all currency — paginated</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
                    Retrieve a paginated list of virtual accounts across all supported currencies within a specified date range.
                </p>

                <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2 px-4 py-3 bg-muted/30 dark:bg-card/50 border border-border rounded-2xl">
                        <span className="px-2 py-0.5 rounded text-xs font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400">POST</span>
                        <code className="text-xs text-muted-foreground break-all">
                            https://{"{{baseUrl}}"}/{"{{paymentContext}}"}/ft-app/acct-list
                        </code>
                    </div>

                    {headersTable}

                    <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-5">
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">Endpoint</h4>
                            <CodeBlock>{getVirtualAccountsPaginatedEndpoint()}</CodeBlock>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">Request body</h4>
                            <CodeBlock language="json">{getVirtualAccountsPaginatedRequestBody()}</CodeBlock>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">cURL example</h4>
                            <CodeBlock language="bash">{getVirtualAccountsPaginatedCurlRequest()}</CodeBlock>
                        </div>
                    </div>
                </div>
            </section>

            {/* List Virtual Accounts — All Currency — Not Paginated */}
            <section>
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <FileText className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">List virtual accounts — all currency — not paginated</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
                    Retrieve all virtual accounts across all currencies without pagination. Set pageNumber and pageSize to 0.
                </p>

                <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2 px-4 py-3 bg-muted/30 dark:bg-card/50 border border-border rounded-2xl">
                        <span className="px-2 py-0.5 rounded text-xs font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400">POST</span>
                        <code className="text-xs text-muted-foreground break-all">
                            https://{"{{baseUrl}}"}/{"{{paymentContext}}"}/ft-app/acct-list
                        </code>
                    </div>

                    {headersTable}

                    <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-5">
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">Endpoint</h4>
                            <CodeBlock>{getVirtualAccountsPaginatedEndpoint()}</CodeBlock>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">Request body</h4>
                            <CodeBlock language="json">{getVirtualAccountsNotPaginatedRequestBody()}</CodeBlock>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">cURL example</h4>
                            <CodeBlock language="bash">{getVirtualAccountsNotPaginatedCurlRequest()}</CodeBlock>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CollectionReport;
