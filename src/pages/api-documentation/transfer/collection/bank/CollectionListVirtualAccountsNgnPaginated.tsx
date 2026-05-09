import {List, Info, Filter} from "lucide-react";
import CodeBlock from "@/components/CodeBlock.tsx";

const CollectionListVirtualAccountsNgnPaginated = () => {
    const getEndpoint = () => `POST https://{{baseUrl}}/{{paymentContext}}/ft-app/acct-list`;

    const getRequestBody = () => `{
    "startDate": "2024-06-04",
    "endDate": "2024-06-04",
    "currency": "NGN",
    "pageNumber": 1,
    "pageSize": 5
}`;

    const getCurlRequest = () => `curl --location 'https://{{baseUrl}}/{{paymentContext}}/ft-app/acct-list'
--header 'x-channel-id: CHANNEL_ID'
--header 'x-channel-code: CHANNEL_CODE'
--header 'x-merchant-id: YOUR_MERCHANT_ID'
--data '{
    "startDate": "2024-06-04",
    "endDate": "2024-06-04",
    "currency": "NGN",
    "pageNumber": 1,
    "pageSize": 5
}'`;

    const getResponse = () => `{
  "responseCode": "00",
  "responseDescription": "Successful",
  "responseMessage": "5 virtual account(s) found.",
  "totalCount": 28,
  "pageCount": 6,
  "pageSize": 5,
  "currentPage": 1,
  "data": [
    {
      "accountName": "PASSPOINT (divine-will ekpo)",
      "accountNumber": "9637681398",
      "bankName": "Providus Bank",
      "bankCode": "000023",
      "currency": "NGN",
      "merchantId": "8b6ea099-1d9e-4e42-94ef-2ae4dac503f2",
      "transactionReference": "c9c090b2-cb3b-4fbe-ba3f-c0055255c772",
      "dateCreated": "2024-06-04T09:10:21.000+00:00",
      "processed": false,
      "dynamic": false
    },
    {
      "accountName": "PASSPOINT (michael evarist-ch)",
      "accountNumber": "9623652344",
      "bankName": "Providus Bank",
      "bankCode": "000023",
      "currency": "NGN",
      "merchantId": "8b6ea099-1d9e-4e42-94ef-2ae4dac503f2",
      "transactionReference": "3718c80d-ab59-4a08-a96c-d133a8457c22",
      "dateCreated": "2024-06-04T09:05:06.000+00:00",
      "processed": false,
      "dynamic": false
    },
    {
      "accountName": "PASSPOINT (michael evarist-ch)",
      "accountNumber": "9622645004",
      "bankName": "Providus Bank",
      "bankCode": "000023",
      "currency": "NGN",
      "merchantId": "8b6ea099-1d9e-4e42-94ef-2ae4dac503f2",
      "transactionReference": "7e79c4e2-d071-43d7-8028-69a4cc8b8061",
      "dateCreated": "2024-06-04T08:35:53.000+00:00",
      "processed": false,
      "dynamic": false
    },
    {
      "accountName": "PASSPOINT (michael evarist-ch)",
      "accountNumber": "9631619348",
      "bankName": "Providus Bank",
      "bankCode": "000023",
      "currency": "NGN",
      "merchantId": "8b6ea099-1d9e-4e42-94ef-2ae4dac503f2",
      "transactionReference": "8bd33431-5df3-4236-ad44-73e30411bed2",
      "dateCreated": "2024-06-04T08:35:34.000+00:00",
      "processed": false,
      "dynamic": false
    },
    {
      "accountName": "PASSPOINT (michael evarist-ch)",
      "accountNumber": "9619679445",
      "bankName": "Providus Bank",
      "bankCode": "000023",
      "currency": "NGN",
      "merchantId": "8b6ea099-1d9e-4e42-94ef-2ae4dac503f2",
      "transactionReference": "1d62137b-bf59-4d3d-a5be-ca0df46b6cbb",
      "dateCreated": "2024-06-04T08:35:22.000+00:00",
      "processed": false,
      "dynamic": false
    }
  ]
}`;

    return (
        <div className="py-8 sm:py-10 space-y-16">

            {/* Hero */}
            <section>
                <div className="inline-flex items-center gap-2 bg-brand-50 dark:bg-brand-950/40 text-brand text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
                    <List className="h-3.5 w-3.5" />
                    API Reference
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
                    List Virtual Accounts — NGN Paginated
                </h1>
                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl">
                    Retrieve a paginated list of NGN virtual accounts created within a specified date range.
                    Supports filtering by currency and custom page size.
                </p>
            </section>

            {/* How Virtual Account Listing Works */}
            <section>
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <Filter className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">How Virtual Account Listing Works</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-6 max-w-2xl">
                    Retrieves a paginated list of all NGN virtual accounts — both static and dynamic — generated under your merchant account within a specified date range. Use this for admin dashboards, reconciliation reports, and auditing account status.
                </p>

                <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-5">

                    {/* Response field reference */}
                    <div>
                        <h3 className="text-base font-semibold text-foreground mb-3">Response field reference</h3>
                        <div className="overflow-x-auto border border-border rounded-xl">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-border bg-muted/30">
                                        <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Field</th>
                                        <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Description</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    <tr className="hover:bg-muted/20 transition-colors">
                                        <td className="px-5 py-3.5 font-mono text-xs text-foreground">dynamic</td>
                                        <td className="px-5 py-3.5 text-xs text-muted-foreground"><code className="bg-muted px-1 py-0.5 rounded">true</code> — this is a one-time dynamic account. <code className="bg-muted px-1 py-0.5 rounded">false</code> — this is a permanent static account.</td>
                                    </tr>
                                    <tr className="hover:bg-muted/20 transition-colors">
                                        <td className="px-5 py-3.5 font-mono text-xs text-foreground">processed</td>
                                        <td className="px-5 py-3.5 text-xs text-muted-foreground">Whether the expected payment was received and processed for this account. For dynamic accounts: <code className="bg-muted px-1 py-0.5 rounded">true</code> means the transaction is complete.</td>
                                    </tr>
                                    <tr className="hover:bg-muted/20 transition-colors">
                                        <td className="px-5 py-3.5 font-mono text-xs text-foreground">active</td>
                                        <td className="px-5 py-3.5 text-xs text-muted-foreground">Whether the account is currently accepting payments. Dynamic accounts with <code className="bg-muted px-1 py-0.5 rounded">processed: true</code> will typically have <code className="bg-muted px-1 py-0.5 rounded">active: false</code>.</td>
                                    </tr>
                                    <tr className="hover:bg-muted/20 transition-colors">
                                        <td className="px-5 py-3.5 font-mono text-xs text-foreground">transactionReference</td>
                                        <td className="px-5 py-3.5 text-xs text-muted-foreground">The order or payment reference this account was tied to. Use this to cross-reference payments against your internal order system.</td>
                                    </tr>
                                    <tr className="hover:bg-muted/20 transition-colors">
                                        <td className="px-5 py-3.5 font-mono text-xs text-foreground">pageCount</td>
                                        <td className="px-5 py-3.5 text-xs text-muted-foreground">Total number of pages available. Use with <code className="bg-muted px-1 py-0.5 rounded">pageNumber</code> and <code className="bg-muted px-1 py-0.5 rounded">pageSize</code> to paginate through results.</td>
                                    </tr>
                                    <tr className="hover:bg-muted/20 transition-colors">
                                        <td className="px-5 py-3.5 font-mono text-xs text-foreground">totalCount</td>
                                        <td className="px-5 py-3.5 text-xs text-muted-foreground">Total number of virtual accounts matching the query across all pages.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Pagination */}
                    <div>
                        <h3 className="text-base font-semibold text-foreground mb-3">Pagination &amp; filtering</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {[
                                { label: "pageNumber", desc: "The page index to retrieve, starting from 1." },
                                { label: "pageSize", desc: "Number of records per page. Adjust to balance response size and performance." },
                                { label: "startDate / endDate", desc: "Filter accounts created within this date range (YYYY-MM-DD format)." },
                                { label: "Filter by active", desc: "Post-filter the response to show only accounts where active: true to display currently accepting accounts." },
                            ].map(({ label, desc }) => (
                                <div key={label} className="flex items-start gap-3 px-4 py-3 bg-muted/30 dark:bg-background/30 border border-border rounded-xl">
                                    <Filter className="h-4 w-4 text-brand shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-xs font-semibold text-foreground font-mono">{label}</p>
                                        <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-muted/40 dark:bg-background/40 border border-border rounded-xl p-4 flex items-start gap-3">
                        <Info className="h-4 w-4 text-brand shrink-0 mt-0.5" />
                        <p className="text-xs text-muted-foreground">
                            For reconciliation, cross-reference <code className="bg-muted px-1 py-0.5 rounded">transactionReference</code> values against your order management system. Accounts with <code className="bg-muted px-1 py-0.5 rounded">dynamic: true</code> and <code className="bg-muted px-1 py-0.5 rounded">processed: false</code> that are past their expected expiry may represent abandoned checkouts.
                        </p>
                    </div>
                </div>
            </section>

            {/* API Endpoint */}
            <section>
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <List className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">List virtual accounts</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
                    Retrieve a paginated list of virtual accounts filtered by date range and currency.
                </p>

                <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2 px-4 py-3 bg-muted/30 dark:bg-card/50 border border-border rounded-2xl">
                        <span className="px-2 py-0.5 rounded text-xs font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400">POST</span>
                        <code className="text-xs text-muted-foreground break-all">
                            https://{"{{baseUrl}}"}/{"{{paymentContext}}"}/ft-app/acct-list
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

export default CollectionListVirtualAccountsNgnPaginated;
