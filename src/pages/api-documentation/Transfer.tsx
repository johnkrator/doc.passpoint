import { Globe, ArrowRightLeft, Clock, CheckCircle, XCircle, Layers, Banknote } from "lucide-react";
import CodeBlock from "@/components/CodeBlock.tsx";

const Transfer = () => {
    const getCrossBorderEndpointCode = () =>
        `POST https://{{baseUrl}}/{{paymentContext}}/foreign-ft-app/make-payment/bank`;

    const getCrossBorderHeadersCode = () =>
        `x-channel-id: CHANNEL_ID
x-channel-code: CHANNEL_CODE
x-merchant-id: YOUR_MERCHANT_ID
Authorization: Bearer [your-access-token]
Content-Type: application/json`;

    const getCrossBorderRequestBodyCode = () => `{
  "amount": "1500",
  "sourceCurrency": "NGN",
  "destinationCurrency": "USD",
  "rail": "SWIFT",
  "recipient": {
    "accountName": "John Doe",
    "accountNumber": "000123456789",
    "bankName": "Chase Bank",
    "bankSwiftCode": "CHASUS33",
    "country": "US"
  },
  "reference": "XBORDER_20240115_001",
  "description": "International supplier payment  Invoice INV-2024-001"
}`;

    const getCrossBorderCurlCode = () =>
        `curl --location 'https://{{baseUrl}}/{{paymentContext}}/foreign-ft-app/make-payment/bank' \\
--header 'x-channel-id: CHANNEL_ID' \\
--header 'x-channel-code: CHANNEL_CODE' \\
--header 'x-merchant-id: YOUR_MERCHANT_ID' \\
--header 'Authorization: Bearer [your-access-token]' \\
--header 'Content-Type: application/json' \\
--data '{
    "amount": "1500",
    "sourceCurrency": "NGN",
    "destinationCurrency": "USD",
    "rail": "SWIFT",
    "recipient": {
        "accountName": "John Doe",
        "accountNumber": "000123456789",
        "bankName": "Chase Bank",
        "bankSwiftCode": "CHASUS33",
        "country": "US"
    },
    "reference": "XBORDER_20240115_001",
    "description": "International supplier payment  Invoice INV-2024-001"
}'`;

    const getCrossBorderResponseCode = () => `{
  "responseCode": "00",
  "responseDescription": "Successful",
  "responseMessage": "Cross-border transfer initiated successfully",
  "data": {
    "reference": "XBORDER_20240115_001",
    "transactionId": "TXN_SWIFT_20240115_001",
    "status": "pending",
    "sourceCurrency": "NGN",
    "destinationCurrency": "USD",
    "sourceAmount": "1500",
    "destinationAmount": "0.97",
    "exchangeRate": "1550.24",
    "rail": "SWIFT",
    "estimatedDelivery": "2024-01-17T16:00:00"
  }
}`;

    const getTransferStatusEndpointCode = () =>
        `GET https://{{baseUrl}}/{{paymentContext}}/ft-app/transfer-status?reference={reference}`;

    const getTransferStatusResponseCode = () => `{
  "responseCode": "00",
  "responseDescription": "Successful",
  "responseMessage": "Transfer details retrieved",
  "data": {
    "reference": "XBORDER_20240115_001",
    "transactionId": "TXN_SWIFT_20240115_001",
    "status": "successful",
    "sourceCurrency": "NGN",
    "destinationCurrency": "USD",
    "sourceAmount": "1500",
    "destinationAmount": "0.97",
    "exchangeRate": "1550.24",
    "rail": "SWIFT",
    "createdAt": "2024-01-15T10:30:00",
    "completedAt": "2024-01-17T14:22:00"
  }
}`;

    const PAYMENT_RAILS = [
        {
            icon: <Globe className="h-5 w-5 text-brand" />,
            name: "SWIFT",
            desc: "International wire transfers via the SWIFT network to banks in 200+ countries.",
            deliveryTime: "1–3 business days",
            bestFor: "International B2B payments",
        },
        {
            icon: <ArrowRightLeft className="h-5 w-5 text-brand" />,
            name: "WIRE",
            desc: "High-value domestic and international bank-to-bank wire transfers.",
            deliveryTime: "Same day – T+1",
            bestFor: "High-value transfers",
        },
        {
            icon: <Banknote className="h-5 w-5 text-brand" />,
            name: "ACH",
            desc: "Automated Clearing House transfers for US-based bank accounts at lower cost.",
            deliveryTime: "1–2 business days",
            bestFor: "US bank payouts",
        },
        {
            icon: <Globe className="h-5 w-5 text-brand" />,
            name: "Open Banking",
            desc: "Real-time account-to-account transfers via open banking rails across supported regions.",
            deliveryTime: "Instant",
            bestFor: "Real-time regional transfers",
        },
    ] as const;

    const TRANSFER_STATUSES = [
        { icon: <Clock className="h-4 w-4 text-muted-foreground" />, label: "pending", desc: "Transfer created, awaiting processing", color: "text-muted-foreground" },
        { icon: <ArrowRightLeft className="h-4 w-4 text-brand" />, label: "processing", desc: "Funds in transit through the selected rail", color: "text-brand" },
        { icon: <CheckCircle className="h-4 w-4 text-brand" />, label: "successful", desc: "Transfer completed and funds delivered", color: "text-brand" },
        { icon: <XCircle className="h-4 w-4 text-destructive" />, label: "failed", desc: "Transfer failed, funds returned to wallet", color: "text-destructive" },
    ] as const;

    const CROSS_BORDER_PARAMS = [
        { param: "amount", type: "string", req: "mandatory", desc: "Amount to transfer in the source currency." },
        { param: "sourceCurrency", type: "string", req: "mandatory", desc: "Currency being debited from your wallet (e.g. NGN)." },
        { param: "destinationCurrency", type: "string", req: "mandatory", desc: "Currency the recipient receives (e.g. USD, GBP, EUR)." },
        { param: "rail", type: "string", req: "mandatory", desc: "Payment rail to use: SWIFT, WIRE, ACH, or OPEN_BANKING." },
        { param: "recipient.accountName", type: "string", req: "mandatory", desc: "Name on the recipient's bank account." },
        { param: "recipient.accountNumber", type: "string", req: "mandatory", desc: "Recipient's bank account or IBAN number." },
        { param: "recipient.bankName", type: "string", req: "mandatory", desc: "Name of the recipient's bank." },
        { param: "recipient.bankSwiftCode", type: "string", req: "conditional", desc: "Required for SWIFT and WIRE transfers." },
        { param: "recipient.country", type: "string", req: "mandatory", desc: "ISO 3166-1 alpha-2 country code of the recipient's bank." },
        { param: "reference", type: "string", req: "mandatory", desc: "Your unique transaction reference." },
        { param: "description", type: "string", req: "optional", desc: "Purpose of the transfer  may be required by the receiving bank." },
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
                    Cross-Border
                </h1>
                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl">
                    Move money across borders with competitive FX rates via ACH, WIRE, SWIFT, and open banking
                    rails. Send to 200+ countries with real-time exchange rate application and full status tracking.
                </p>
            </section>

            {/* Cross-Border Transfer */}
            <section>
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <Globe className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Initiate cross-border transfer</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
                    Send funds internationally to a bank account in any supported country. The exchange rate
                    is applied at the time of initiation and locked for the transaction.
                </p>

                <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2 px-4 py-3 bg-muted/30 dark:bg-card/50 border border-border rounded-2xl">
                        <span className="px-2 py-0.5 rounded text-xs font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400">POST</span>
                        <code className="text-xs text-muted-foreground break-all">
                            https://{"{{baseUrl}}"}/{"{{paymentContext}}"}/foreign-ft-app/make-payment/bank
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
                                    {CROSS_BORDER_PARAMS.map(({ param, type, req, desc }) => (
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
                            <CodeBlock>{getCrossBorderEndpointCode()}</CodeBlock>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">Headers</h4>
                            <CodeBlock language="bash">{getCrossBorderHeadersCode()}</CodeBlock>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">Request body</h4>
                            <CodeBlock language="json">{getCrossBorderRequestBodyCode()}</CodeBlock>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">cURL example</h4>
                            <CodeBlock language="bash">{getCrossBorderCurlCode()}</CodeBlock>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">Response</h4>
                            <CodeBlock language="json">{getCrossBorderResponseCode()}</CodeBlock>
                        </div>
                    </div>
                </div>
            </section>

            {/* Supported Payment Rails */}
            <section>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">Supported payment rails</h2>
                <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
                    Choose the rail that matches your corridor, delivery speed, and cost requirements.
                </p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {PAYMENT_RAILS.map(({ icon, name, desc, deliveryTime, bestFor }) => (
                        <div key={name} className="bg-white dark:bg-card border border-border rounded-2xl p-5">
                            <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center mb-3">
                                {icon}
                            </div>
                            <h3 className="text-sm font-semibold text-foreground mb-2">{name}</h3>
                            <p className="text-xs text-muted-foreground leading-relaxed mb-4">{desc}</p>
                            <div className="space-y-2 text-xs">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Delivery</span>
                                    <span className="text-foreground font-medium">{deliveryTime}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Best for</span>
                                    <span className="text-foreground font-medium text-right max-w-[100px]">{bestFor}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Transfer Status */}
            <section>
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <Clock className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Transfer status</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
                    Retrieve the current status and full details of a cross-border transfer by its reference.
                </p>

                <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2 px-4 py-3 bg-muted/30 dark:bg-card/50 border border-border rounded-2xl">
                        <span className="px-2 py-0.5 rounded text-xs font-semibold bg-brand-50 text-brand dark:bg-brand-950/40 dark:text-brand/80">GET</span>
                        <code className="text-xs text-muted-foreground break-all">
                            https://{"{{baseUrl}}"}/{"{{paymentContext}}"}/ft-app/transfer-status?reference={"{reference}"}
                        </code>
                    </div>

                    <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-5">
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">Endpoint</h4>
                            <CodeBlock>{getTransferStatusEndpointCode()}</CodeBlock>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">Response</h4>
                            <CodeBlock language="json">{getTransferStatusResponseCode()}</CodeBlock>
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        {TRANSFER_STATUSES.map(({ icon, label, desc, color }) => (
                            <div key={label} className="bg-white dark:bg-card border border-border rounded-2xl p-4">
                                <div className={`flex items-center gap-2 mb-2 ${color}`}>
                                    {icon}
                                    <code className="text-xs font-semibold">{label}</code>
                                </div>
                                <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Transfer;
