import { Smartphone, Banknote, Clock, CheckCircle, XCircle, QrCode, Layers } from "lucide-react";
import CodeBlock from "@/components/CodeBlock.tsx";

const Collection = () => {
    const getVirtualAccountEndpointCode = () =>
        `POST https://{{baseUrl}}/{{paymentContext}}/ft-app/generate-virtual-account?type=dynamic`;

    const getVirtualAccountHeadersCode = () =>
        `x-channel-id: CHANNEL_ID
x-channel-code: CHANNEL_CODE
x-merchant-id: YOUR_MERCHANT_ID
Authorization: Bearer [your-access-token]
Content-Type: application/json`;

    const getVirtualAccountRequestBodyCode = () => `{
  "narration": "Payment for services",
  "accountName": "John Doe",
  "email": "john.doe@example.com",
  "phoneNumber": "08030000000",
  "amount": "5000"
}`;

    const getVirtualAccountCurlCode = () =>
        `curl --location 'https://{{baseUrl}}/{{paymentContext}}/ft-app/generate-virtual-account?type=dynamic' \\
--header 'x-channel-id: CHANNEL_ID' \\
--header 'x-channel-code: CHANNEL_CODE' \\
--header 'x-merchant-id: YOUR_MERCHANT_ID' \\
--data-raw '{
    "narration": "Payment for services",
    "accountName": "John Doe",
    "email": "john.doe@example.com",
    "phoneNumber": "08030000000",
    "amount": "5000"
}'`;

    const getVirtualAccountResponseCode = () => `{
  "responseCode": "00",
  "responseDescription": "Successful",
  "responseMessage": "virtual account has been created successfully",
  "data": {
    "accountName": "John Doe",
    "accountNumber": "0185487837",
    "bankName": "9 Payment Service Bank",
    "bankCode": "120001",
    "transactionReference": "string",
    "dynamic": true,
    "active": false
  }
}`;

    const getMobileMoneyEndpointCode = () =>
        `POST https://{{baseUrl}}/{{paymentContext}}/momo-app/request-payment`;

    const getMobileMoneyHeadersCode = () =>
        `x-channel-id: CHANNEL_ID
x-channel-code: CHANNEL_CODE
x-merchant-id: YOUR_MERCHANT_ID
Authorization: Bearer [your-access-token]
Content-Type: application/json`;

    const getMobileMoneyRequestBodyCode = () => `{
  "amount": "100",
  "transactionCurrency": "KES",
  "accountName": "John Doe",
  "bankCode": "000000",
  "serviceCode": "airtel",
  "channel": "3",
  "msisdn": "254714748036",
  "clientReference": "12237546",
  "countryCode": "KE",
  "callbackUrl": "https://yourapp.com/webhooks/momo-collection"
}`;

    const getMobileMoneyCurlCode = () =>
        `curl --location 'https://{{baseUrl}}/{{paymentContext}}/momo-app/request-payment' \\
--header 'x-channel-id: CHANNEL_ID' \\
--header 'x-channel-code: CHANNEL_CODE' \\
--header 'x-merchant-id: YOUR_MERCHANT_ID' \\
--header 'Content-Type: application/json' \\
--user 'username:password' \\
--data '{
    "amount": "100",
    "transactionCurrency": "KES",
    "accountName": "John Doe",
    "bankCode": "000000",
    "serviceCode": "airtel",
    "channel": "3",
    "msisdn": "254714748036",
    "clientReference": "12237546",
    "countryCode": "KE"
}'`;

    const getMobileMoneyResponseCode = () => `{
  "responseCode": "00",
  "responseDescription": "Successful",
  "responseMessage": "mobile money payment request initiated successfully"
}`;

    const getCollectionStatusResponseCode = () => `{
  "responseCode": "00",
  "responseDescription": "Successful",
  "responseMessage": "transaction found",
  "data": {
    "status": "SUCCESSFUL",
    "transactionId": "00000423060111141481697464946545699112233",
    "senderAccountNumber": "2025143050",
    "senderAccountName": "JOHN DOE",
    "senderBankName": "UNITED BANK FOR AFRICA",
    "beneficiaryAccountNumber": "9977658111",
    "beneficiaryAccountName": "MERCHANT (QA Test Merchant)",
    "beneficiaryBankCode": "000023",
    "amount": 5000,
    "paymentType": "COLLECTION"
  }
}`;

    const COLLECTION_CHANNELS = [
        {
            icon: <Banknote className="h-5 w-5 text-brand" />,
            name: "Bank Transfer",
            desc: "Receive payments via direct bank transfer into a merchant-assigned virtual account.",
            processingTime: "Instant",
            currencies: "NGN, USD",
        },
        {
            icon: <Smartphone className="h-5 w-5 text-brand" />,
            name: "Mobile Money",
            desc: "Accept inbound payments from MTN, Airtel, and other mobile money networks.",
            processingTime: "Instant",
            currencies: "NGN",
        },
        {
            icon: <QrCode className="h-5 w-5 text-brand" />,
            name: "Virtual Account",
            desc: "Issue unique virtual account numbers mapped to individual customers or transactions.",
            processingTime: "Instant",
            currencies: "NGN, USD",
        },
    ] as const;

    const COLLECTION_STATUSES = [
        { icon: <Clock className="h-4 w-4 text-muted-foreground" />, label: "pending", desc: "Collection initiated, awaiting payment", color: "text-muted-foreground" },
        { icon: <Clock className="h-4 w-4 text-brand" />, label: "processing", desc: "Payment received, being confirmed on the network", color: "text-brand" },
        { icon: <CheckCircle className="h-4 w-4 text-brand" />, label: "successful", desc: "Payment confirmed and credited to your wallet", color: "text-brand" },
        { icon: <XCircle className="h-4 w-4 text-destructive" />, label: "failed", desc: "Collection failed or the virtual account expired", color: "text-destructive" },
    ] as const;

    const VIRTUAL_ACCOUNT_PARAMS = [
        { param: "narration", type: "string", req: "mandatory", desc: "Description or narration for the virtual account." },
        { param: "accountName", type: "string", req: "mandatory", desc: "Name of the account holder." },
        { param: "email", type: "string", req: "mandatory", desc: "Email address of the account holder." },
        { param: "phoneNumber", type: "string", req: "mandatory", desc: "Phone number of the account holder." },
        { param: "amount", type: "string", req: "mandatory", desc: "Expected collection amount." },
    ] as const;

    const MOBILE_MONEY_PARAMS = [
        { param: "amount", type: "string", req: "mandatory", desc: "Amount to collect." },
        { param: "transactionCurrency", type: "string", req: "mandatory", desc: "Currency code (e.g. KES, GHS)." },
        { param: "accountName", type: "string", req: "mandatory", desc: "Name of the account holder." },
        { param: "bankCode", type: "string", req: "mandatory", desc: "Bank or operator code." },
        { param: "serviceCode", type: "string", req: "mandatory", desc: "Mobile money service code (e.g. airtel, mtn)." },
        { param: "channel", type: "string", req: "mandatory", desc: "Channel identifier." },
        { param: "msisdn", type: "string", req: "mandatory", desc: "Customer's mobile number in international format." },
        { param: "clientReference", type: "string", req: "mandatory", desc: "Your unique transaction reference." },
        { param: "countryCode", type: "string", req: "mandatory", desc: "ISO country code (e.g. KE, GH)." },
        { param: "callbackUrl", type: "string", req: "optional", desc: "Webhook URL to receive payment notifications." },
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
                    Collection
                </h1>
                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl">
                    Accept payments via bank transfer, mobile money, and virtual accounts across multiple currencies.
                    Generate virtual accounts, initiate mobile money collections, and track status in real time.
                </p>
            </section>

            {/* Generate Virtual Account */}
            <section>
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <QrCode className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Generate virtual account</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
                    Generate a unique virtual account number for a customer. Payments made to this account are
                    automatically detected and credited to your merchant wallet.
                </p>

                <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2 px-4 py-3 bg-muted/30 dark:bg-card/50 border border-border rounded-2xl">
                        <span className="px-2 py-0.5 rounded text-xs font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400">POST</span>
                        <code className="text-xs text-muted-foreground break-all">
                            https://{"{{baseUrl}}"}/{"{{paymentContext}}"}/ft-app/generate-virtual-account?type=dynamic
                        </code>
                    </div>

                    <div className="bg-white dark:bg-card border border-border rounded-2xl overflow-hidden">
                        <div className="px-5 py-3 border-b border-border bg-muted/30">
                            <h4 className="text-sm font-semibold text-foreground">Request parameters</h4>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-border">
                                        <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Parameter</th>
                                        <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Type</th>
                                        <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Required</th>
                                        <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Description</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    {VIRTUAL_ACCOUNT_PARAMS.map(({ param, type, req, desc }) => (
                                        <tr key={param} className="hover:bg-muted/20 transition-colors">
                                            <td className="px-5 py-3.5 font-mono text-xs text-foreground">{param}</td>
                                            <td className="px-5 py-3.5 text-muted-foreground">{type}</td>
                                            <td className="px-5 py-3.5 text-muted-foreground">{req}</td>
                                            <td className="px-5 py-3.5 text-muted-foreground">{desc}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-5">
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">Endpoint</h4>
                            <CodeBlock>{getVirtualAccountEndpointCode()}</CodeBlock>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">Headers</h4>
                            <CodeBlock language="bash">{getVirtualAccountHeadersCode()}</CodeBlock>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">Request body</h4>
                            <CodeBlock language="json">{getVirtualAccountRequestBodyCode()}</CodeBlock>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">cURL example</h4>
                            <CodeBlock language="bash">{getVirtualAccountCurlCode()}</CodeBlock>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">Response</h4>
                            <CodeBlock language="json">{getVirtualAccountResponseCode()}</CodeBlock>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mobile Money Collection */}
            <section>
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <Smartphone className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Mobile money collection</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
                    Initiate a mobile money collection request. The customer receives a prompt on their device
                    to approve the payment directly from their mobile wallet.
                </p>

                <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2 px-4 py-3 bg-muted/30 dark:bg-card/50 border border-border rounded-2xl">
                        <span className="px-2 py-0.5 rounded text-xs font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400">POST</span>
                        <code className="text-xs text-muted-foreground break-all">
                            https://{"{{baseUrl}}"}/{"{{paymentContext}}"}/momo-app/request-payment
                        </code>
                    </div>

                    <div className="bg-white dark:bg-card border border-border rounded-2xl overflow-hidden">
                        <div className="px-5 py-3 border-b border-border bg-muted/30">
                            <h4 className="text-sm font-semibold text-foreground">Request parameters</h4>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-border">
                                        <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Parameter</th>
                                        <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Type</th>
                                        <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Required</th>
                                        <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Description</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    {MOBILE_MONEY_PARAMS.map(({ param, type, req, desc }) => (
                                        <tr key={param} className="hover:bg-muted/20 transition-colors">
                                            <td className="px-5 py-3.5 font-mono text-xs text-foreground">{param}</td>
                                            <td className="px-5 py-3.5 text-muted-foreground">{type}</td>
                                            <td className="px-5 py-3.5 text-muted-foreground">{req}</td>
                                            <td className="px-5 py-3.5 text-muted-foreground">{desc}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-5">
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">Endpoint</h4>
                            <CodeBlock>{getMobileMoneyEndpointCode()}</CodeBlock>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">Headers</h4>
                            <CodeBlock language="bash">{getMobileMoneyHeadersCode()}</CodeBlock>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">Request body</h4>
                            <CodeBlock language="json">{getMobileMoneyRequestBodyCode()}</CodeBlock>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">cURL example</h4>
                            <CodeBlock language="bash">{getMobileMoneyCurlCode()}</CodeBlock>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">Response</h4>
                            <CodeBlock language="json">{getMobileMoneyResponseCode()}</CodeBlock>
                        </div>
                    </div>
                </div>
            </section>

            {/* Supported Collection Channels */}
            <section>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">Supported collection channels</h2>
                <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
                    Accept inbound payments across all major channels with instant confirmation and real-time
                    wallet credit.
                </p>
                <div className="grid sm:grid-cols-3 gap-4">
                    {COLLECTION_CHANNELS.map(({ icon, name, desc, processingTime, currencies }) => (
                        <div key={name} className="bg-white dark:bg-card border border-border rounded-2xl p-5">
                            <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center mb-3">
                                {icon}
                            </div>
                            <h3 className="text-sm font-semibold text-foreground mb-2">{name}</h3>
                            <p className="text-xs text-muted-foreground leading-relaxed mb-4">{desc}</p>
                            <div className="space-y-2 text-xs">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Processing time</span>
                                    <span className="text-foreground font-medium">{processingTime}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Currencies</span>
                                    <span className="text-foreground font-medium">{currencies}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Collection Status */}
            <section>
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <Clock className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Collection status</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
                    Query the status of any collection by its reference. Use this to poll for payment confirmation
                    or reconcile transactions.
                </p>

                <div className="bg-white dark:bg-card border border-border rounded-2xl overflow-hidden mb-6">
                    <div className="px-5 py-3.5 bg-muted/30 dark:bg-card/50 border-b border-border flex flex-wrap items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-xs font-semibold bg-brand-50 text-brand dark:bg-brand-950/40 dark:text-brand/80">GET</span>
                        <code className="text-xs text-muted-foreground break-all">
                            https://{"{{baseUrl}}"}/{"{{paymentContext}}"}/ft-app/transfer-status?reference={"{reference}"}
                        </code>
                    </div>
                    <div className="p-5 sm:p-6">
                        <h4 className="text-sm font-medium text-foreground mb-3">Response</h4>
                        <CodeBlock language="json">{getCollectionStatusResponseCode()}</CodeBlock>
                    </div>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {COLLECTION_STATUSES.map(({ icon, label, desc, color }) => (
                        <div key={label} className="bg-white dark:bg-card border border-border rounded-2xl p-4">
                            <div className={`flex items-center gap-2 mb-2 ${color}`}>
                                {icon}
                                <code className="text-xs font-semibold">{label}</code>
                            </div>
                            <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Collection;
