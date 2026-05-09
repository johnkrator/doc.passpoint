import { Banknote, Info, Zap, AlertCircle } from "lucide-react";
import CodeBlock from "@/components/CodeBlock.tsx";

const PayoutBankForeignFednowUsd = () => {
    const getEndpointCode = () => {
        return `POST https://{{baseUrl}}/{{paymentContext}}/foreign-ft-app/make-payment/fednow`;
    };

    const getRequestBodyCode = () => {
        return `{
    "clientReference": "17361939681900",
    "amount": "10.00",
    "narration": "test fednow usd payout of 10",
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
        return `curl --location 'https://{{baseUrl}}/{{paymentContext}}/foreign-ft-app/make-payment/fednow'
--header 'x-channel-id: CHANNEL_ID'
--header 'x-channel-code: CHANNEL_CODE'
--header 'x-merchant-id: YOUR_MERCHANT_ID'
--data '{
    "clientReference": "17361939681900",
    "amount": "10.00",
    "narration": "test fednow usd payout of 10",
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
                    <Banknote className="h-3.5 w-3.5" />
                    API Reference
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
                    FedNow — USD
                </h1>
                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl">
                    Process FedNow instant payments in US Dollar (USD) for real-time settlements.
                </p>
            </section>

            {/* How FedNow USD Transfer Works */}
            <section>
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <Zap className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">How FedNow USD Transfer Works</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-6 max-w-2xl">
                    FedNow is the Federal Reserve's instant payment network, launched in 2023. It provides near-instant USD settlement 24/7/365, including weekends and federal holidays, and is operated by the same institution that underpins the US banking system.
                </p>

                <div className="grid gap-4 sm:grid-cols-3 mb-6">
                    {[
                        { label: "Settlement time", value: "Seconds (24/7/365)" },
                        { label: "Currency",         value: "USD only" },
                        { label: "Network",          value: "Federal Reserve" },
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
                                title: "Backed by the Federal Reserve",
                                body: "Unlike RTP which is operated by The Clearing House (a private entity), FedNow is a Federal Reserve service. This gives it broad institutional support and growing adoption among US financial institutions of all sizes.",
                            },
                            {
                                title: "Use FedNow as a complement to RTP",
                                body: "Not all banks support both RTP and FedNow. By offering both instant payment options, you maximize reach across US financial institutions. Check the Get Payment Methods response for both options and route accordingly.",
                            },
                            {
                                title: "Best for: instant USD payments with broad coverage",
                                body: "FedNow is well-suited for any time-sensitive USD payout, particularly to community banks and credit unions that may participate in FedNow but not RTP. Ideal for on-demand payments, insurance disbursements, and emergency payouts.",
                            },
                            {
                                title: "Asynchronous from Passpoint's side",
                                body: "The initial API response returns status \"NEW\" confirming the transfer is queued. Even though FedNow settles within seconds at the banking network level, always rely on the webhook callback for confirmed settlement status in your system.",
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
                        FedNow adoption is growing rapidly since its 2023 launch. If your Get Payment Methods response shows FedNow available for a destination, it is a strong indicator that the recipient's bank supports instant payment receipt. Pair with RTP for maximum instant payment coverage across the US banking system.
                    </p>
                </div>
            </section>

            {/* API Endpoint */}
            <section>
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <Banknote className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">FedNow payment</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
                    Initiate a USD FedNow instant payment to a US bank account.
                </p>

                <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2 px-4 py-3 bg-muted/30 dark:bg-card/50 border border-border rounded-2xl">
                        <span className="px-2 py-0.5 rounded text-xs font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400">POST</span>
                        <code className="text-xs text-muted-foreground break-all">
                            https://{"{{baseUrl}}"}/{"{{paymentContext}}"}/foreign-ft-app/make-payment/fednow
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

export default PayoutBankForeignFednowUsd;
