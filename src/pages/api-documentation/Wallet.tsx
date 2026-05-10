import {
  Wallet as WalletIcon,
  BarChart3,
  History,
  FileText,
  Layers,
  AlertCircle,
  Info,
  CheckCircle2,
  RefreshCw,
  AlertTriangle,
} from "lucide-react";
import CodeBlock from "@/components/CodeBlock.tsx";

const Wallet = () => {
  const getWalletBalanceEndpointCode = () =>
    `GET https://{{baseUrl}}/{{paymentContext}}/wallet-app/get-wallet-balance`;

  const getWalletBalanceHeadersCode = () =>
    `x-channel-id: CHANNEL_ID
x-channel-code: CHANNEL_CODE
x-merchant-id: YOUR_MERCHANT_ID
Authorization: Bearer [your-access-token]`;

  const getWalletBalanceCurlCode = () =>
    `curl --location 'https://{{baseUrl}}/{{paymentContext}}/wallet-app/get-wallet-balance/all'
--header 'x-channel-id: CHANNEL_ID'
--header 'x-channel-code: CHANNEL_CODE'
--header 'x-merchant-id: YOUR_MERCHANT_ID'`;

  const getWalletBalanceResponseCode = () => `{
  "responseCode": "00",
  "responseDescription": "Successful",
  "responseMessage": "2 wallet balance found",
  "data": [
    {
      "currency": "NGN",
      "availableBalance": 54015.77
    },
    {
      "currency": "USD",
      "availableBalance": 15420.50
    }
  ]
}`;

  const getWalletDetailsEndpointCode = () =>
    `GET https://{{baseUrl}}/{{paymentContext}}/wallet-app/get-wallet-details`;

  const getWalletDetailsHeadersCode = () =>
    `x-channel-id: CHANNEL_ID
x-channel-code: CHANNEL_CODE
x-merchant-id: YOUR_MERCHANT_ID
Authorization: Bearer [your-access-token]`;

  const getWalletDetailsCurlCode = () =>
    `curl --location 'https://{{baseUrl}}/{{paymentContext}}/wallet-app/get-wallet-details'
--header 'x-channel-id: CHANNEL_ID'
--header 'x-channel-code: CHANNEL_CODE'
--header 'x-merchant-id: YOUR_MERCHANT_ID'`;

  const getWalletDetailsResponseCode = () => `{
  "responseCode": "00",
  "responseDescription": "Successful",
  "responseMessage": "12 wallet statement item(s) found.",
  "totalCount": 12,
  "currentBalance": 54015.77,
  "pageCount": 1,
  "pageSize": 20,
  "currentPage": 1,
  "data": [
    {
      "merchantId": "string",
      "walletId": "string",
      "walletName": "string",
      "active": true,
      "dateCreated": "2024-04-29T21:11:06.3329516",
      "walletAccount": {}
    }
  ]
}`;

  const getWalletHistoryEndpointCode = () =>
    `POST https://{{baseUrl}}/{{paymentContext}}/wallet-app/wallet-history?type=all`;

  const getWalletHistoryHeadersCode = () =>
    `x-channel-id: CHANNEL_ID
x-channel-code: CHANNEL_CODE
x-merchant-id: YOUR_MERCHANT_ID
Authorization: Bearer [your-access-token]`;

  const getWalletHistoryRequestBodyCode = () => `{
  "startDate": "2023-10-15",
  "endDate": "2023-11-30",
  "currency": "NGN",
  "pageNumber": 1,
  "pageSize": 5
}`;

  const getWalletHistoryCurlCode = () =>
    `curl --location 'https://{{baseUrl}}/{{paymentContext}}/wallet-app/wallet-history?type=all'
--header 'x-channel-id: CHANNEL_ID'
--header 'x-channel-code: CHANNEL_CODE'
--header 'x-merchant-id: YOUR_MERCHANT_ID'
--data '{
    "startDate": "2023-10-15",
    "endDate": "2023-11-30",
    "currency": "NGN",
    "pageNumber": 1,
    "pageSize": 5
}'`;

  const getWalletHistoryResponseCode = () => `{
  "responseCode": "00",
  "responseDescription": "Successful",
  "responseMessage": "5 wallet history found.",
  "data": []
}`;

  const getWalletStatementEndpointCode = () =>
    `POST https://{{baseUrl}}/{{paymentContext}}/wallet-app/get-wallet-statement`;

  const getWalletStatementHeadersCode = () =>
    `x-channel-id: CHANNEL_ID
x-channel-code: CHANNEL_CODE
x-merchant-id: YOUR_MERCHANT_ID
Authorization: Bearer [your-access-token]`;

  const getWalletStatementRequestBodyCode = () => `{
  "startDate": "2024-04-20",
  "endDate": "2024-12-31",
  "currency": "USD",
  "transMode": "credit",
  "pageNumber": 1,
  "pageSize": 5
}`;

  const getWalletStatementCurlCode = () =>
    `curl --location 'https://{{baseUrl}}/{{paymentContext}}/wallet-app/get-wallet-statement'
--header 'x-channel-id: CHANNEL_ID'
--header 'x-channel-code: CHANNEL_CODE'
--header 'x-merchant-id: YOUR_MERCHANT_ID'
--data '{
    "startDate": "2024-04-20",
    "endDate": "2024-12-31",
    "currency": "USD",
    "transMode": "credit",
    "pageNumber": 1,
    "pageSize": 5
}'`;

  const getWalletStatementResponseCode = () => `{
  "responseCode": "00",
  "responseDescription": "Successful",
  "responseMessage": "12 wallet statement item(s) found.",
  "totalCount": 12,
  "currentBalance": 54015.77,
  "pageCount": 1,
  "pageSize": 20,
  "currentPage": 1,
  "data": [
    {
      "accountName": "Chinedu Ojiteli",
      "currency": "USD",
      "transactionId": "UBNDd0ce7901454242129ac8a33491e14102171417252204261102421573db267747909c0564ed3321b8e7",
      "runningBalance": "54700.27",
      "narration": "Lien of 100.50 for VIRTUAL CARD FUNDING",
      "amount": 100.5,
      "transactionType": "Transfer",
      "transactionDate": "2024-04-26T23:45:26.1828248",
      "debit": true,
      "transMode": "debit"
    }
  ]
}`;

  return (
    <div className="py-8 sm:py-10 space-y-16">
      {/* Hero */}
      <section>
        <div className="inline-flex items-center gap-2 bg-brand-50 dark:bg-brand-950/40 text-brand text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
          <Layers className="h-3.5 w-3.5" />
          API Reference
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
          Wallet
        </h1>
        <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl">
          The Wallet module provides endpoints for managing merchant wallet
          operations  including checking balances across multiple currencies,
          retrieving wallet metadata, and generating paginated transaction
          history and statements. All endpoints require a valid Bearer Token.
        </p>
      </section>

      {/* How Wallet Management Works */}
      <section>
        <div className="flex items-center gap-3 mb-3">
          <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
            <WalletIcon className="h-4 w-4 text-brand" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            How wallet management works
          </h2>
        </div>
        <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
          Passpoint wallets are multi-currency digital wallets that hold your merchant funds across
          different currencies simultaneously. Understanding how they work is foundational to every
          Passpoint integration.
        </p>

        <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-5">
          {/* Multi-currency model */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-2">Multi-currency wallet model</h3>
            <p className="text-xs text-muted-foreground leading-relaxed mb-3">
              Each currency (NGN, USD, GHS, KES, etc.) has its own isolated wallet balance. You can hold
              and operate multiple currency wallets simultaneously under a single merchant account.
            </p>
            <div className="grid sm:grid-cols-4 gap-3">
              {["NGN", "USD", "GHS", "KES"].map((currency) => (
                <div key={currency} className="bg-muted/40 dark:bg-background/40 border border-border rounded-xl p-3 text-center">
                  <span className="text-sm font-bold text-foreground">{currency}</span>
                  <p className="text-xs text-muted-foreground mt-0.5">wallet</p>
                </div>
              ))}
            </div>
          </div>

          {/* Wallet as backbone */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-2">Wallets power all Passpoint services</h3>
            <div className="space-y-2">
              {[
                { label: "Collections", desc: "Inbound payments (dynamic VAs, MoMo, cards) credit your wallet upon settlement." },
                { label: "Payouts", desc: "Outbound transfers (bank, MoMo, foreign) debit your wallet balance." },
                { label: "Fund conversion", desc: "Moves funds between your currency wallets using live Passpoint FX rates." },
              ].map(({ label, desc }) => (
                <div key={label} className="flex items-start gap-3">
                  <span className="text-xs font-semibold text-brand shrink-0 mt-0.5 w-28">{label}</span>
                  <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Key operations */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Key operations</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                {
                  icon: <WalletIcon className="h-3.5 w-3.5 text-brand" />,
                  title: "Get wallet balance",
                  desc: "Check current available balance for all currencies or a specific one in a single call.",
                },
                {
                  icon: <History className="h-3.5 w-3.5 text-brand" />,
                  title: "Wallet transactions",
                  desc: "View paginated inflow and outflow history filtered by currency, date range, and direction.",
                },
                {
                  icon: <RefreshCw className="h-3.5 w-3.5 text-brand" />,
                  title: "Fund conversion",
                  desc: "Exchange between your currency wallets at live Passpoint FX rates. Balances update instantly.",
                },
                {
                  icon: <FileText className="h-3.5 w-3.5 text-brand" />,
                  title: "Wallet statement",
                  desc: "Generate detailed statements for reconciliation with debit/credit filtering.",
                },
              ].map(({ icon, title, desc }) => (
                <div key={title} className="bg-muted/40 dark:bg-background/40 border border-border rounded-xl p-4 flex gap-3">
                  <div className="bg-brand-50 dark:bg-brand-950/40 w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    {icon}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-foreground mb-0.5">{title}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4 space-y-3">
          <div className="bg-muted/40 dark:bg-background/40 border border-border rounded-xl p-4 flex items-start gap-3">
            <Info className="h-4 w-4 text-brand shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground leading-relaxed">
              <span className="font-semibold text-foreground">Real-time balance:</span> Wallet balance updates
              immediately upon settlement of transactions  no polling needed. Use the wallet balance endpoint
              to check available funds before initiating payouts.
            </p>
          </div>
          <div className="bg-muted/40 dark:bg-background/40 border border-border rounded-xl p-4 flex items-start gap-3">
            <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground leading-relaxed">
              <span className="font-semibold text-foreground">Reconciliation:</span> Periodically reconcile
              your wallet balance against your transaction ledger using wallet statements. Configure low balance
              alerts via your Passpoint dashboard to receive notifications before funds run out.
            </p>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section>
        <div className="flex items-center gap-3 mb-3">
          <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
            <Info className="h-4 w-4 text-brand" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            Overview
          </h2>
        </div>
        <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
          Passpoint merchants operate multi-currency wallets. The Wallet API
          lets you inspect live balances, retrieve account details, and pull
          historical records filtered by currency, date range, and transaction
          direction (debit / credit).
        </p>

        <div className="grid sm:grid-cols-2 gap-4">
          {[
            {
              icon: <WalletIcon className="h-3.5 w-3.5 text-brand" />,
              title: "Multi-currency balances",
              body: 'Use currency = "all" to fetch the available balance across every wallet in a single call, or pass a specific currency code to target one wallet.',
            },
            {
              icon: <BarChart3 className="h-3.5 w-3.5 text-brand" />,
              title: "Wallet details",
              body: "Retrieve full wallet metadata including wallet ID, name, account details, activation status, and creation date.",
            },
            {
              icon: <History className="h-3.5 w-3.5 text-brand" />,
              title: "Transaction history",
              body: "Query paginated transaction history filtered by currency and date range. Supports a type query parameter to narrow results.",
            },
            {
              icon: <FileText className="h-3.5 w-3.5 text-brand" />,
              title: "Wallet statement",
              body: "Generate a detailed statement filtered by currency, date range, and transaction mode (debit or credit). Fully paginated.",
            },
          ].map(({ icon, title, body }) => (
            <div
              key={title}
              className="bg-white dark:bg-card border border-border rounded-2xl p-5 flex gap-4"
            >
              <div className="bg-brand-50 dark:bg-brand-950/40 w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                {icon}
              </div>
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-1">
                  {title}
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* APIs in this module */}
      <section>
        <div className="flex items-center gap-3 mb-3">
          <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
            <Layers className="h-4 w-4 text-brand" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            APIs in this module
          </h2>
        </div>
        <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
          Summary of all endpoints available under Wallet.
        </p>

        <div className="bg-white dark:bg-card border border-border rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Endpoint
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Method
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  {
                    endpoint: "/wallet-app/get-wallet-balance/{currency}",
                    method: "GET",
                    desc: "Get available balance for one or all currency wallets",
                  },
                  {
                    endpoint: "/wallet-app/get-wallet-details",
                    method: "GET",
                    desc: "Get wallet metadata including account info and status",
                  },
                  {
                    endpoint: "/wallet-app/wallet-history?type=all",
                    method: "POST",
                    desc: "Get paginated transaction history filtered by currency and date range",
                  },
                  {
                    endpoint: "/wallet-app/get-wallet-statement",
                    method: "POST",
                    desc: "Get a detailed transaction statement with debit/credit filtering",
                  },
                ].map(({ endpoint, method, desc }) => (
                  <tr key={endpoint} className="hover:bg-muted/20 transition-colors">
                    <td className="px-5 py-3.5 font-mono text-xs text-foreground break-all">
                      {endpoint}
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className={`px-2 py-0.5 rounded text-xs font-semibold ${
                          method === "GET"
                            ? "bg-brand-50 text-brand dark:bg-brand-950/40 dark:text-brand/80"
                            : "bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400"
                        }`}
                      >
                        {method}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-xs text-muted-foreground">
                      {desc}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Key notes */}
      <section>
        <div className="flex items-center gap-3 mb-3">
          <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
            <AlertCircle className="h-4 w-4 text-brand" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            Key notes
          </h2>
        </div>
        <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
          Important points to keep in mind when integrating with the Wallet
          module.
        </p>

        <div className="space-y-3">
          {[
            {
              title: "Bearer Token required on all endpoints",
              body: 'All Wallet endpoints require a valid Bearer Token in the Authorization header. Obtain this from the Authentication module before calling any Wallet API.',
            },
            {
              title: "Required headers",
              body: "Every request must include x-channel-id, x-channel-code, x-merchant-id, and Authorization: Bearer <token>. Missing any of these will result in a 401 or 403 response.",
            },
            {
              title: 'currency = "all" fetches all wallets',
              body: 'On the Get Wallet Balance endpoint, passing "all" as the currency path parameter returns the balance for every currency wallet associated with the merchant in a single response.',
            },
            {
              title: "Pagination is required for history and statements",
              body: "The Wallet History and Wallet Statement endpoints are paginated. Always supply pageNumber and pageSize in the request body. Results without pagination parameters may be rejected or return defaults.",
            },
            {
              title: "transMode filter on statements",
              body: 'Use the transMode field in the Wallet Statement request body to filter by "debit" or "credit". Omit it to retrieve all transaction directions.',
            },
            {
              title: "Different base URL context",
              body: "Wallet endpoints use {{paymentContext}} in the base URL path  not {{userAppContext}} used by Authentication. Ensure you are using the correct context for your environment.",
            },
          ].map(({ title, body }) => (
            <div
              key={title}
              className="flex gap-4 bg-white dark:bg-card border border-border rounded-2xl px-5 py-4"
            >
              <CheckCircle2 className="h-4 w-4 text-brand shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-foreground mb-1">
                  {title}
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Base URL */}
      <section>
        <div className="flex items-center gap-3 mb-3">
          <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
            <Info className="h-4 w-4 text-brand" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            Base URL
          </h2>
        </div>
        <p className="text-muted-foreground text-sm sm:text-base mb-6 max-w-xl">
          All Wallet endpoints share the same base URL pattern. Replace{" "}
          <code className="font-mono text-xs">{"{{baseUrl}}"}</code> and{" "}
          <code className="font-mono text-xs">{"{{paymentContext}}"}</code> with
          the values provided in your merchant onboarding details.
        </p>
        <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6">
          <CodeBlock>
            {`https://{{baseUrl}}/{{paymentContext}}/wallet-app/`}
          </CodeBlock>
          <p className="text-xs text-muted-foreground mt-3">
            Sandbox base URL:{" "}
            <code className="font-mono">
              https://payment-sandbox.mypasspoint.com/passpoint-payserv/v1
            </code>
          </p>
        </div>
      </section>

      {/* Get Wallet Balance */}
      <section>
        <div className="flex items-center gap-3 mb-3">
          <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
            <WalletIcon className="h-4 w-4 text-brand" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            Get wallet balance
          </h2>
        </div>
        <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
          Retrieve the available balance for all wallets or a specific currency
          wallet.
        </p>

        <div className="space-y-4">
          {/* Endpoint display */}
          <div className="flex flex-wrap items-center gap-2 px-4 py-3 bg-muted/30 dark:bg-card/50 border border-border rounded-2xl">
            <span className="px-2 py-0.5 rounded text-xs font-semibold bg-brand-50 text-brand dark:bg-brand-950/40 dark:text-brand/80">
              GET
            </span>
            <code className="text-xs text-muted-foreground break-all">
              https://{"{{baseUrl}}"}/{"{{paymentContext}}"}
              /wallet-app/get-wallet-balance/all
            </code>
          </div>

          {/* Path parameters */}
          <div className="bg-white dark:bg-card border border-border rounded-2xl overflow-hidden">
            <div className="px-5 py-3 border-b border-border bg-muted/30">
              <h4 className="text-sm font-semibold text-foreground">
                Path parameters
              </h4>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Parameter
                    </th>
                    <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Required
                    </th>
                    <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Default
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-5 py-3.5 font-mono text-xs text-foreground">
                      currency
                    </td>
                    <td className="px-5 py-3.5 text-muted-foreground">
                      string
                    </td>
                    <td className="px-5 py-3.5 text-muted-foreground">
                      mandatory
                    </td>
                    <td className="px-5 py-3.5 text-muted-foreground">
                      The currency of the wallet. When currency = all, retrieves
                      the balance of all wallets.
                    </td>
                    <td className="px-5 py-3.5 font-mono text-xs text-muted-foreground">
                      all
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Response parameters */}
          <div className="bg-white dark:bg-card border border-border rounded-2xl overflow-hidden">
            <div className="px-5 py-3 border-b border-border bg-muted/30">
              <h4 className="text-sm font-semibold text-foreground">
                Response parameters
              </h4>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Parameter
                    </th>
                    <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr className="hover:bg-muted/20 transition-colors">
                    <td className="px-5 py-3.5 font-mono text-xs text-foreground">
                      responseCode
                    </td>
                    <td className="px-5 py-3.5 text-muted-foreground">
                      string
                    </td>
                    <td className="px-5 py-3.5 text-muted-foreground">
                      Response code indicating request success.
                    </td>
                  </tr>
                  <tr className="hover:bg-muted/20 transition-colors">
                    <td className="px-5 py-3.5 font-mono text-xs text-foreground">
                      responseDescription
                    </td>
                    <td className="px-5 py-3.5 text-muted-foreground">
                      string
                    </td>
                    <td className="px-5 py-3.5 text-muted-foreground">
                      Description of the response code.
                    </td>
                  </tr>
                  <tr className="hover:bg-muted/20 transition-colors">
                    <td className="px-5 py-3.5 font-mono text-xs text-foreground">
                      responseMessage
                    </td>
                    <td className="px-5 py-3.5 text-muted-foreground">
                      string
                    </td>
                    <td className="px-5 py-3.5 text-muted-foreground">
                      Human-readable response message.
                    </td>
                  </tr>
                  <tr className="hover:bg-muted/20 transition-colors">
                    <td className="px-5 py-3.5 font-mono text-xs text-foreground">
                      data
                    </td>
                    <td className="px-5 py-3.5 text-muted-foreground">Array</td>
                    <td className="px-5 py-3.5 text-muted-foreground">
                      List of balances for each wallet belonging to the
                      customer.
                    </td>
                  </tr>
                  <tr className="hover:bg-muted/20 transition-colors">
                    <td className="px-5 py-3.5 font-mono text-xs text-foreground">
                      data.currency
                    </td>
                    <td className="px-5 py-3.5 text-muted-foreground">
                      string
                    </td>
                    <td className="px-5 py-3.5 text-muted-foreground">
                      The wallet currency.
                    </td>
                  </tr>
                  <tr className="hover:bg-muted/20 transition-colors">
                    <td className="px-5 py-3.5 font-mono text-xs text-foreground">
                      data.availableBalance
                    </td>
                    <td className="px-5 py-3.5 text-muted-foreground">
                      decimal
                    </td>
                    <td className="px-5 py-3.5 text-muted-foreground">
                      The available balance of the wallet.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Code examples */}
          <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-5">
            <div>
              <h4 className="text-sm font-medium text-foreground mb-3">
                Endpoint
              </h4>
              <CodeBlock>{getWalletBalanceEndpointCode()}</CodeBlock>
            </div>
            <div>
              <h4 className="text-sm font-medium text-foreground mb-3">
                Headers
              </h4>
              <CodeBlock language="bash">
                {getWalletBalanceHeadersCode()}
              </CodeBlock>
            </div>
            <div>
              <h4 className="text-sm font-medium text-foreground mb-3">
                cURL example
              </h4>
              <CodeBlock language="bash">
                {getWalletBalanceCurlCode()}
              </CodeBlock>
            </div>
            <div>
              <h4 className="text-sm font-medium text-foreground mb-3">
                Response
              </h4>
              <CodeBlock language="json">
                {getWalletBalanceResponseCode()}
              </CodeBlock>
            </div>
          </div>
        </div>
      </section>

      {/* Get Wallet Details */}
      <section>
        <div className="flex items-center gap-3 mb-3">
          <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
            <BarChart3 className="h-4 w-4 text-brand" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            Get wallet details
          </h2>
        </div>
        <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
          Retrieve detailed wallet information including account metadata and
          activation status.
        </p>

        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2 px-4 py-3 bg-muted/30 dark:bg-card/50 border border-border rounded-2xl">
            <span className="px-2 py-0.5 rounded text-xs font-semibold bg-brand-50 text-brand dark:bg-brand-950/40 dark:text-brand/80">
              GET
            </span>
            <code className="text-xs text-muted-foreground break-all">
              https://{"{{baseUrl}}"}/{"{{paymentContext}}"}
              /wallet-app/get-wallet-details
            </code>
          </div>

          <div className="bg-white dark:bg-card border border-border rounded-2xl overflow-hidden">
            <div className="px-5 py-3 border-b border-border bg-muted/30">
              <h4 className="text-sm font-semibold text-foreground">
                Response parameters
              </h4>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Parameter
                    </th>
                    <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    {
                      param: "responseCode",
                      type: "string",
                      desc: "Response code indicating request success.",
                    },
                    {
                      param: "responseDescription",
                      type: "string",
                      desc: "Description of the response code.",
                    },
                    {
                      param: "responseMessage",
                      type: "string",
                      desc: "Human-readable response message.",
                    },
                    {
                      param: "data",
                      type: "Object",
                      desc: "The details of the wallet.",
                    },
                    {
                      param: "data.merchantId",
                      type: "string",
                      desc: "The wallet merchant ID.",
                    },
                    {
                      param: "data.walletId",
                      type: "string",
                      desc: "The wallet ID.",
                    },
                    {
                      param: "data.walletName",
                      type: "string",
                      desc: "The wallet name.",
                    },
                    {
                      param: "data.active",
                      type: "boolean",
                      desc: "Whether the wallet is active or inactive.",
                    },
                    {
                      param: "data.dateCreated",
                      type: "datetime",
                      desc: "The date and time the wallet was created.",
                    },
                    {
                      param: "data.walletAccount",
                      type: "Dictionary",
                      desc: "The wallet account details.",
                    },
                  ].map(({ param, type, desc }) => (
                    <tr
                      key={param}
                      className="hover:bg-muted/20 transition-colors"
                    >
                      <td className="px-5 py-3.5 font-mono text-xs text-foreground">
                        {param}
                      </td>
                      <td className="px-5 py-3.5 text-muted-foreground">
                        {type}
                      </td>
                      <td className="px-5 py-3.5 text-muted-foreground">
                        {desc}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-5">
            <div>
              <h4 className="text-sm font-medium text-foreground mb-3">
                Endpoint
              </h4>
              <CodeBlock>{getWalletDetailsEndpointCode()}</CodeBlock>
            </div>
            <div>
              <h4 className="text-sm font-medium text-foreground mb-3">
                Headers
              </h4>
              <CodeBlock language="bash">
                {getWalletDetailsHeadersCode()}
              </CodeBlock>
            </div>
            <div>
              <h4 className="text-sm font-medium text-foreground mb-3">
                cURL example
              </h4>
              <CodeBlock language="bash">
                {getWalletDetailsCurlCode()}
              </CodeBlock>
            </div>
            <div>
              <h4 className="text-sm font-medium text-foreground mb-3">
                Response
              </h4>
              <CodeBlock language="json">
                {getWalletDetailsResponseCode()}
              </CodeBlock>
            </div>
          </div>
        </div>
      </section>

      {/* Wallet History */}
      <section>
        <div className="flex items-center gap-3 mb-3">
          <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
            <History className="h-4 w-4 text-brand" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            Wallet history
          </h2>
        </div>
        <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
          Retrieve a paginated list of transactions for a specific currency
          wallet within a date range.
        </p>

        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2 px-4 py-3 bg-muted/30 dark:bg-card/50 border border-border rounded-2xl">
            <span className="px-2 py-0.5 rounded text-xs font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400">
              POST
            </span>
            <code className="text-xs text-muted-foreground break-all">
              https://{"{{baseUrl}}"}/{"{{paymentContext}}"}
              /wallet-app/wallet-history?type=all
            </code>
          </div>

          <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-5">
            <div>
              <h4 className="text-sm font-medium text-foreground mb-3">
                Endpoint
              </h4>
              <CodeBlock>{getWalletHistoryEndpointCode()}</CodeBlock>
            </div>
            <div>
              <h4 className="text-sm font-medium text-foreground mb-3">
                Headers
              </h4>
              <CodeBlock language="bash">
                {getWalletHistoryHeadersCode()}
              </CodeBlock>
            </div>
            <div>
              <h4 className="text-sm font-medium text-foreground mb-3">
                Request body
              </h4>
              <CodeBlock language="json">
                {getWalletHistoryRequestBodyCode()}
              </CodeBlock>
            </div>
            <div>
              <h4 className="text-sm font-medium text-foreground mb-3">
                cURL example
              </h4>
              <CodeBlock language="bash">
                {getWalletHistoryCurlCode()}
              </CodeBlock>
            </div>
            <div>
              <h4 className="text-sm font-medium text-foreground mb-3">
                Response
              </h4>
              <CodeBlock language="json">
                {getWalletHistoryResponseCode()}
              </CodeBlock>
            </div>
          </div>
        </div>
      </section>

      {/* Get Wallet Statement */}
      <section>
        <div className="flex items-center gap-3 mb-3">
          <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
            <FileText className="h-4 w-4 text-brand" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            Get wallet statement
          </h2>
        </div>
        <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
          Generate a detailed transaction statement filtered by currency,
          transaction mode, and date range.
        </p>

        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2 px-4 py-3 bg-muted/30 dark:bg-card/50 border border-border rounded-2xl">
            <span className="px-2 py-0.5 rounded text-xs font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400">
              POST
            </span>
            <code className="text-xs text-muted-foreground break-all">
              https://{"{{baseUrl}}"}/{"{{paymentContext}}"}
              /wallet-app/get-wallet-statement
            </code>
          </div>

          <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-5">
            <div>
              <h4 className="text-sm font-medium text-foreground mb-3">
                Endpoint
              </h4>
              <CodeBlock>{getWalletStatementEndpointCode()}</CodeBlock>
            </div>
            <div>
              <h4 className="text-sm font-medium text-foreground mb-3">
                Headers
              </h4>
              <CodeBlock language="bash">
                {getWalletStatementHeadersCode()}
              </CodeBlock>
            </div>
            <div>
              <h4 className="text-sm font-medium text-foreground mb-3">
                Request body
              </h4>
              <CodeBlock language="json">
                {getWalletStatementRequestBodyCode()}
              </CodeBlock>
            </div>
            <div>
              <h4 className="text-sm font-medium text-foreground mb-3">
                cURL example
              </h4>
              <CodeBlock language="bash">
                {getWalletStatementCurlCode()}
              </CodeBlock>
            </div>
            <div>
              <h4 className="text-sm font-medium text-foreground mb-3">
                Response
              </h4>
              <CodeBlock language="json">
                {getWalletStatementResponseCode()}
              </CodeBlock>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Wallet;
