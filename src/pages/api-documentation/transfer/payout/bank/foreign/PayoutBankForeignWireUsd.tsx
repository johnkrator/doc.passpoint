import { Zap, Info, AlertCircle, Globe } from "lucide-react";
import CodeBlock from "@/components/CodeBlock.tsx";

const PayoutBankForeignWireUsd = () => {
    const getEndpointCode = () => {
        return `POST https://{{baseUrl}}/{{paymentContext}}/foreign-ft-app/make-payment/wire`;
    };

    const getRequestBodyCode = () => {
        return `{
    "clientReference": "17361939681900",
    "amount": "10.00",
    "narration": "test usd payout of 10",
    "transactionCurrency": "USD",
    "baseCurrency": "USD",
    "countryCode": "US",
    "paymentInfo": {
        "accountType": "savings",
        "accountName": "Ghaju",
        "countryCode": "US",
        "state": "Newyork",
        "city": "Minnesota",
        "address": "Plot 331, Raji Rasaki Estate",
        "postalCode": "5005",
        "accountNumber": "99999999993",
        "routingNumber": "067014822",
        "bankName": "JP Morgan",
        "payoutCurrency": "USD"
    }
}`;
    };

    const getCurlExampleCode = () => {
        return `curl --location 'https://{{baseUrl}}/{{paymentContext}}/foreign-ft-app/make-payment/wire'
--header 'x-channel-id: CHANNEL_ID'
--header 'x-channel-code: CHANNEL_CODE'
--header 'x-merchant-id: YOUR_MERCHANT_ID'
--data '{
    "clientReference": "17361939681900",
    "amount": "10.00",
    "narration": "test usd payout of 10",
    "transactionCurrency": "USD",
    "baseCurrency": "USD",
    "countryCode": "US",
    "paymentInfo": {
        "accountType": "savings",
        "accountName": "Ghaju",
        "countryCode": "US",
        "state": "Newyork",
        "city": "Minnesota",
        "address": "Plot 331, Raji Rasaki Estate",
        "postalCode": "5005",
        "accountNumber": "99999999993",
        "routingNumber": "067014822",
        "bankName": "JP Morgan",
        "payoutCurrency": "USD"
    }
}'`;
    };

    const getExampleResponseCode = () => {
        return `{
  "responseCode": "00",
  "responseDescription": "Successful",
  "responseMessage": "Your transfer to HABEEB ADEBOWALE ADEDEJI is on the way",
  "data": {
    "status": "NEW",
    "transactionId": "c7035d4d-a0b2-4dab-951c-1f949a4a2731",
    "amount": 1000,
    "charges": 10.8
  }
}`;
    };

    return (
        <div className="py-8 sm:py-10 space-y-16">

            {/* Hero */}
            <section>
                <div className="inline-flex items-center gap-2 bg-brand-50 dark:bg-brand-950/40 text-brand text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
                    <Zap className="h-3.5 w-3.5" />
                    API Reference
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
                    Wire — USD
                </h1>
                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl">
                    Process wire transfers in US Dollar (USD) for international payments.
                </p>
            </section>

            {/* How Wire Transfer (USD) Works */}
            <section>
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <Globe className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">How Wire Transfer (USD) Works</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-6 max-w-2xl">
                    Wire transfers are the international bank transfer standard, used for large-value and cross-border USD payments. Unlike ACH which is domestic-only, Wire supports international USD transfers routed through the global correspondent banking network.
                </p>

                <div className="grid gap-4 sm:grid-cols-3 mb-6">
                    {[
                        { label: "Settlement time", value: "1–5 business days" },
                        { label: "Currency",         value: "USD" },
                        { label: "Reach",            value: "International" },
                    ].map(({ label, value }) => (
                        <div key={label} className="bg-white dark:bg-card border border-border rounded-2xl p-4 text-center">
                            <p className="text-xs text-muted-foreground mb-1">{label}</p>
                            <p className="text-sm font-bold text-foreground">{value}</p>
                        </div>
                    ))}
                </div>

                <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-4 mb-4">
                    <div className="space-y-4">
                        {[
                            {
                                title: "Best for: high-value international USD payments",
                                body: "Wire is the preferred method when sending large amounts internationally or when ACH is not available at the recipient's bank. It is the standard for cross-border business payments, large supplier invoices, and inter-company transfers in USD.",
                            },
                            {
                                title: "Settlement time varies by correspondent banking route",
                                body: "Wire settlement of 1–5 business days depends on the number of intermediary (correspondent) banks involved in routing the payment. Direct routes to major banks settle faster; payments routed through multiple intermediaries take longer.",
                            },
                            {
                                title: "Fees are higher than ACH",
                                body: "Wire transfers carry higher processing fees than ACH due to correspondent banking costs. Check the Rate endpoint for current wire fee schedules before quoting transfer costs to your users.",
                            },
                            {
                                title: "routingNumber is still required",
                                body: "For international USD wires, the routingNumber field is required. Depending on the destination, SWIFT/BIC codes may also be needed in the paymentInfo object. Ensure your paymentInfo contains all required bank identification details for the destination country.",
                            },
                            {
                                title: "Fully asynchronous",
                                body: "A status of \"NEW\" confirms the wire transfer is queued. Final settlement status is delivered via webhook. Do not treat the initial 200 response as confirmation of delivery.",
                            },
                        ].map(({ title, body }) => (
                            <div key={title} className="flex items-start gap-3">
                                <AlertCircle className="h-4 w-4 text-brand shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-sm font-semibold text-foreground mb-0.5">{title}</p>
                                    <p className="text-xs text-muted-foreground leading-relaxed">{body}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-muted/40 dark:bg-background/40 border border-border rounded-xl p-4 flex items-start gap-3">
                    <Info className="h-4 w-4 text-brand shrink-0 mt-0.5" />
                    <p className="text-xs text-muted-foreground">
                        Wire transfers are irrevocable once processed by the banking network. Verify all recipient account details carefully before submitting. Passpoint cannot recall a wire transfer once it has been dispatched to the banking network.
                    </p>
                </div>
            </section>

            {/* API Endpoint */}
            <section>
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <Zap className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Wire transfer</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
                    Initiate a USD wire transfer to an international bank account.
                </p>

                <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2 px-4 py-3 bg-muted/30 dark:bg-card/50 border border-border rounded-2xl">
                        <span className="px-2 py-0.5 rounded text-xs font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400">POST</span>
                        <code className="text-xs text-muted-foreground break-all">
                            https://{"{{baseUrl}}"}/{"{{paymentContext}}"}/foreign-ft-app/make-payment/wire
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
                            <CodeBlock>{getEndpointCode()}</CodeBlock>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">Request body</h4>
                            <CodeBlock language="json">{getRequestBodyCode()}</CodeBlock>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">cURL example</h4>
                            <CodeBlock language="bash">{getCurlExampleCode()}</CodeBlock>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">Response</h4>
                            <CodeBlock language="json">{getExampleResponseCode()}</CodeBlock>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PayoutBankForeignWireUsd;
