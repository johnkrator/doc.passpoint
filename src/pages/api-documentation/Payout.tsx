import {
  DollarSign,
  Smartphone,
  Banknote,
  Clock,
  CheckCircle,
  Layers,
} from "lucide-react";
import CodeBlock from "@/components/CodeBlock.tsx";

const Payout = () => {
  const getMoMoPayoutEndpointCode = () =>
    `POST https://{{baseUrl}}/{{paymentContext}}/momo/transfer`;

  const getMoMoPayoutHeadersCode = () =>
    `x-channel-id: CHANNEL_ID
x-channel-code: CHANNEL_CODE
x-merchant-id: YOUR_MERCHANT_ID
Authorization: Bearer [your-access-token]
Content-Type: application/json`;

  const getMoMoPayoutRequestBodyCode = () => `{
  "amount": "5000",
  "currency": "NGN",
  "recipientPhone": "+2348123456789",
  "network": "MTN",
  "reference": "PAYOUT_20240115_001",
  "description": "Vendor settlement  January 2024"
}`;

  const getMoMoPayoutCurlCode = () =>
    `curl --location 'https://{{baseUrl}}/{{paymentContext}}/momo/transfer' \\
--header 'x-channel-id: CHANNEL_ID' \\
--header 'x-channel-code: CHANNEL_CODE' \\
--header 'x-merchant-id: YOUR_MERCHANT_ID' \\
--header 'Authorization: Bearer [your-access-token]' \\
--header 'Content-Type: application/json' \\
--data '{
    "amount": "5000",
    "currency": "NGN",
    "recipientPhone": "+2348123456789",
    "network": "MTN",
    "reference": "PAYOUT_20240115_001",
    "description": "Vendor settlement  January 2024"
}'`;

  const getMoMoPayoutResponseCode = () => `{
  "responseCode": "00",
  "responseDescription": "Successful",
  "responseMessage": "Payout initiated successfully",
  "data": {
    "reference": "PAYOUT_20240115_001",
    "transactionId": "TXN_MTN_20240115_001",
    "status": "pending",
    "amount": "5000",
    "currency": "NGN",
    "recipientPhone": "+2348123456789",
    "network": "MTN"
  }
}`;

  const getBankPayoutEndpointCode = () =>
    `POST https://{{baseUrl}}/{{paymentContext}}/bank/transfer`;

  const getBankPayoutHeadersCode = () =>
    `x-channel-id: CHANNEL_ID
x-channel-code: CHANNEL_CODE
x-merchant-id: YOUR_MERCHANT_ID
Authorization: Bearer [your-access-token]
Content-Type: application/json`;

  const getBankPayoutRequestBodyCode = () => `{
  "amount": "25000",
  "currency": "NGN",
  "accountNumber": "0123456789",
  "bankCode": "058",
  "accountName": "Jane Smith",
  "reference": "PAYOUT_BANK_20240115_001",
  "description": "Contractor payment  project #PRJ-009"
}`;

  const getBankPayoutCurlCode = () =>
    `curl --location 'https://{{baseUrl}}/{{paymentContext}}/bank/transfer' \\
--header 'x-channel-id: CHANNEL_ID' \\
--header 'x-channel-code: CHANNEL_CODE' \\
--header 'x-merchant-id: YOUR_MERCHANT_ID' \\
--header 'Authorization: Bearer [your-access-token]' \\
--header 'Content-Type: application/json' \\
--data '{
    "amount": "25000",
    "currency": "NGN",
    "accountNumber": "0123456789",
    "bankCode": "058",
    "accountName": "Jane Smith",
    "reference": "PAYOUT_BANK_20240115_001",
    "description": "Contractor payment  project #PRJ-009"
}'`;

  const getBankPayoutResponseCode = () => `{
  "responseCode": "00",
  "responseDescription": "Successful",
  "responseMessage": "Bank payout initiated successfully",
  "data": {
    "reference": "PAYOUT_BANK_20240115_001",
    "transactionId": "TXN_BANK_20240115_001",
    "status": "pending",
    "amount": "25000",
    "currency": "NGN",
    "accountNumber": "0123456789",
    "bankCode": "058",
    "accountName": "Jane Smith"
  }
}`;

  const getPayoutStatusEndpointCode = () =>
    `GET https://{{baseUrl}}/{{paymentContext}}/{reference}`;

  const getPayoutStatusResponseCode = () => `{
  "responseCode": "00",
  "responseDescription": "Successful",
  "responseMessage": "Payout details retrieved",
  "data": {
    "reference": "PAYOUT_20240115_001",
    "transactionId": "TXN_MTN_20240115_001",
    "status": "successful",
    "amount": "5000",
    "currency": "NGN",
    "channel": "mobile-money",
    "recipientPhone": "+2348123456789",
    "network": "MTN",
    "createdAt": "2024-01-15T14:30:00",
    "completedAt": "2024-01-15T14:30:18"
  }
}`;

  const getBulkPayoutEndpointCode = () =>
    `POST https://{{baseUrl}}/{{paymentContext}}/bulk`;

  const getBulkPayoutRequestBodyCode = () => `{
  "batchReference": "BATCH_PAYOUT_20240115",
  "description": "Monthly vendor settlements",
  "payouts": [
    {
      "amount": "5000",
      "currency": "NGN",
      "recipientPhone": "+2348123456789",
      "network": "MTN",
      "reference": "PAYOUT_001",
      "description": "Vendor A settlement"
    },
    {
      "amount": "25000",
      "currency": "NGN",
      "accountNumber": "0123456789",
      "bankCode": "058",
      "accountName": "Jane Smith",
      "reference": "PAYOUT_002",
      "description": "Contractor B payment"
    }
  ]
}`;

  const getBulkPayoutResponseCode = () => `{
  "responseCode": "00",
  "responseDescription": "Successful",
  "responseMessage": "Bulk payout accepted for processing",
  "data": {
    "batchReference": "BATCH_PAYOUT_20240115",
    "batchId": "BATCH_20240115_XYZ",
    "totalPayouts": 2,
    "totalAmount": "30000",
    "currency": "NGN",
    "status": "processing"
  }
}`;

  const PAYOUT_METHODS = [
    {
      icon: <Smartphone className="h-5 w-5 text-brand" />,
      name: "Mobile Money",
      desc: "Instant payouts to MTN, Airtel, and other mobile money wallets.",
      processingTime: "Instant",
      currencies: "NGN",
    },
    {
      icon: <Banknote className="h-5 w-5 text-brand" />,
      name: "Bank Account",
      desc: "Direct bank transfers to any local bank account using the bank code and account number.",
      processingTime: "Instant – T+1",
      currencies: "NGN, USD",
    },
    {
      icon: <DollarSign className="h-5 w-5 text-brand" />,
      name: "Bulk Payout",
      desc: "Process multiple payouts in a single batch  mix mobile money and bank transfers.",
      processingTime: "Instant – T+1",
      currencies: "NGN, USD",
    },
  ] as const;

  const MOMO_PAYOUT_PARAMS = [
    {
      param: "amount",
      type: "string",
      req: "mandatory",
      desc: "Amount to send.",
    },
    {
      param: "currency",
      type: "string",
      req: "mandatory",
      desc: "Currency code (e.g. NGN).",
    },
    {
      param: "recipientPhone",
      type: "string",
      req: "mandatory",
      desc: "Recipient's mobile money number in international format.",
    },
    {
      param: "network",
      type: "string",
      req: "mandatory",
      desc: "Mobile network operator (e.g. MTN, Airtel).",
    },
    {
      param: "reference",
      type: "string",
      req: "mandatory",
      desc: "Your unique transaction reference.",
    },
    {
      param: "description",
      type: "string",
      req: "optional",
      desc: "Purpose or narration for the payout.",
    },
  ] as const;

  const BANK_PAYOUT_PARAMS = [
    {
      param: "amount",
      type: "string",
      req: "mandatory",
      desc: "Amount to send.",
    },
    {
      param: "currency",
      type: "string",
      req: "mandatory",
      desc: "Currency code (e.g. NGN).",
    },
    {
      param: "accountNumber",
      type: "string",
      req: "mandatory",
      desc: "Recipient's bank account number.",
    },
    {
      param: "bankCode",
      type: "string",
      req: "mandatory",
      desc: "Recipient's bank code.",
    },
    {
      param: "accountName",
      type: "string",
      req: "mandatory",
      desc: "Name on the recipient's bank account.",
    },
    {
      param: "reference",
      type: "string",
      req: "mandatory",
      desc: "Your unique transaction reference.",
    },
    {
      param: "description",
      type: "string",
      req: "optional",
      desc: "Purpose or narration for the payout.",
    },
  ] as const;

  return (
    <div className="py-8 sm:py-10 space-y-16">
      {/* Hero */}
      <section>
        <div className="inline-flex items-center gap-2 bg-brand-50 dark:bg-brand-950/40 text-brand text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
          <Layers className="h-3.5 w-3.5" />
          API Reference
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
          Payouts &amp; Transfers
        </h1>
        <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl">
          Send money to bank accounts and mobile wallets locally and
          internationally with bulk payout support. Initiate single or batch
          payouts and track status in real time.
        </p>
      </section>

      {/* Mobile Money Payout */}
      <section>
        <div className="flex items-center gap-3 mb-3">
          <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
            <Smartphone className="h-4 w-4 text-brand" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            Mobile money payout
          </h2>
        </div>
        <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
          Send funds directly to a mobile money wallet. Supports MTN, Airtel,
          and other network operators with instant delivery.
        </p>

        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2 px-4 py-3 bg-muted/30 dark:bg-card/50 border border-border rounded-2xl">
            <span className="px-2 py-0.5 rounded text-xs font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400">
              POST
            </span>
            <code className="text-xs text-muted-foreground break-all">
              https://{"{{baseUrl}}"}/{"{{paymentContext}}"}
              /momo/transfer
            </code>
          </div>

          <div className="bg-white dark:bg-card border border-border rounded-2xl overflow-hidden">
            <div className="px-5 py-3 border-b border-border bg-muted/30">
              <h4 className="text-sm font-semibold text-foreground">
                Request parameters
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
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {MOMO_PAYOUT_PARAMS.map(({ param, type, req, desc }) => (
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
                        {req}
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
              <CodeBlock>{getMoMoPayoutEndpointCode()}</CodeBlock>
            </div>
            <div>
              <h4 className="text-sm font-medium text-foreground mb-3">
                Headers
              </h4>
              <CodeBlock language="bash">
                {getMoMoPayoutHeadersCode()}
              </CodeBlock>
            </div>
            <div>
              <h4 className="text-sm font-medium text-foreground mb-3">
                Request body
              </h4>
              <CodeBlock language="json">
                {getMoMoPayoutRequestBodyCode()}
              </CodeBlock>
            </div>
            <div>
              <h4 className="text-sm font-medium text-foreground mb-3">
                cURL example
              </h4>
              <CodeBlock language="bash">{getMoMoPayoutCurlCode()}</CodeBlock>
            </div>
            <div>
              <h4 className="text-sm font-medium text-foreground mb-3">
                Response
              </h4>
              <CodeBlock language="json">
                {getMoMoPayoutResponseCode()}
              </CodeBlock>
            </div>
          </div>
        </div>
      </section>

      {/* Bank Account Payout */}
      <section>
        <div className="flex items-center gap-3 mb-3">
          <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
            <Banknote className="h-4 w-4 text-brand" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            Bank account payout
          </h2>
        </div>
        <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
          Transfer funds to any local bank account using the recipient's account
          number and bank code.
        </p>

        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2 px-4 py-3 bg-muted/30 dark:bg-card/50 border border-border rounded-2xl">
            <span className="px-2 py-0.5 rounded text-xs font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400">
              POST
            </span>
            <code className="text-xs text-muted-foreground break-all">
              https://{"{{baseUrl}}"}/{"{{paymentContext}}"}
              /bank/transfer
            </code>
          </div>

          <div className="bg-white dark:bg-card border border-border rounded-2xl overflow-hidden">
            <div className="px-5 py-3 border-b border-border bg-muted/30">
              <h4 className="text-sm font-semibold text-foreground">
                Request parameters
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
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {BANK_PAYOUT_PARAMS.map(({ param, type, req, desc }) => (
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
                        {req}
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
              <CodeBlock>{getBankPayoutEndpointCode()}</CodeBlock>
            </div>
            <div>
              <h4 className="text-sm font-medium text-foreground mb-3">
                Headers
              </h4>
              <CodeBlock language="bash">
                {getBankPayoutHeadersCode()}
              </CodeBlock>
            </div>
            <div>
              <h4 className="text-sm font-medium text-foreground mb-3">
                Request body
              </h4>
              <CodeBlock language="json">
                {getBankPayoutRequestBodyCode()}
              </CodeBlock>
            </div>
            <div>
              <h4 className="text-sm font-medium text-foreground mb-3">
                cURL example
              </h4>
              <CodeBlock language="bash">{getBankPayoutCurlCode()}</CodeBlock>
            </div>
            <div>
              <h4 className="text-sm font-medium text-foreground mb-3">
                Response
              </h4>
              <CodeBlock language="json">
                {getBankPayoutResponseCode()}
              </CodeBlock>
            </div>
          </div>
        </div>
      </section>

      {/* Payout Methods */}
      <section>
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
          Payout methods
        </h2>
        <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
          Choose the right channel based on your recipient's preference and the
          required delivery speed.
        </p>
        <div className="grid sm:grid-cols-3 gap-4">
          {PAYOUT_METHODS.map(
            ({ icon, name, desc, processingTime, currencies }) => (
              <div
                key={name}
                className="bg-white dark:bg-card border border-border rounded-2xl p-5"
              >
                <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center mb-3">
                  {icon}
                </div>
                <h3 className="text-sm font-semibold text-foreground mb-2">
                  {name}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                  {desc}
                </p>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Processing time
                    </span>
                    <span className="text-foreground font-medium">
                      {processingTime}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Currencies</span>
                    <span className="text-foreground font-medium">
                      {currencies}
                    </span>
                  </div>
                </div>
              </div>
            ),
          )}
        </div>
      </section>

      {/* Get Payout Status */}
      <section>
        <div className="flex items-center gap-3 mb-3">
          <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
            <Clock className="h-4 w-4 text-brand" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            Get payout status
          </h2>
        </div>
        <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
          Retrieve the current status and full details of a payout by its
          reference.
        </p>
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2 px-4 py-3 bg-muted/30 dark:bg-card/50 border border-border rounded-2xl">
            <span className="px-2 py-0.5 rounded text-xs font-semibold bg-brand-50 text-brand dark:bg-brand-950/40 dark:text-brand/80">
              GET
            </span>
            <code className="text-xs text-muted-foreground break-all">
              https://{"{{baseUrl}}"}/{"{{paymentContext}}"}/{"{reference}"}
            </code>
          </div>
          <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6">
            <div>
              <h4 className="text-sm font-medium text-foreground mb-3">
                Endpoint
              </h4>
              <CodeBlock>{getPayoutStatusEndpointCode()}</CodeBlock>
            </div>
            <div className="mt-5">
              <h4 className="text-sm font-medium text-foreground mb-3">
                Response
              </h4>
              <CodeBlock language="json">
                {getPayoutStatusResponseCode()}
              </CodeBlock>
            </div>
          </div>
        </div>
      </section>

      {/* Bulk Payout */}
      <section>
        <div className="flex items-center gap-3 mb-3">
          <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
            <CheckCircle className="h-4 w-4 text-brand" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            Bulk payout
          </h2>
        </div>
        <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
          Process multiple payouts in a single request. Mix mobile money and
          bank transfer recipients in the same batch.
        </p>
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2 px-4 py-3 bg-muted/30 dark:bg-card/50 border border-border rounded-2xl">
            <span className="px-2 py-0.5 rounded text-xs font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400">
              POST
            </span>
            <code className="text-xs text-muted-foreground break-all">
              https://{"{{baseUrl}}"}/{"{{paymentContext}}"}/bulk
            </code>
          </div>
          <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-5">
            <div>
              <h4 className="text-sm font-medium text-foreground mb-3">
                Endpoint
              </h4>
              <CodeBlock>{getBulkPayoutEndpointCode()}</CodeBlock>
            </div>
            <div>
              <h4 className="text-sm font-medium text-foreground mb-3">
                Request body
              </h4>
              <CodeBlock language="json">
                {getBulkPayoutRequestBodyCode()}
              </CodeBlock>
            </div>
            <div>
              <h4 className="text-sm font-medium text-foreground mb-3">
                Response
              </h4>
              <CodeBlock language="json">
                {getBulkPayoutResponseCode()}
              </CodeBlock>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Payout;
