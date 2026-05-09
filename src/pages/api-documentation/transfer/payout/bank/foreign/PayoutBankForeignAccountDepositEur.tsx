import { PiggyBank, Info, Globe, AlertCircle } from "lucide-react";
import CodeBlock from "@/components/CodeBlock.tsx";

const PayoutBankForeignAccountDepositEur = () => {
    const getEndpointCode = () => {
        return `POST https://{{baseUrl}}/{{paymentContext}}/foreign-ft-app/make-payment/bank`;
    };

    const getRequestBodyCode = () => {
        return `{
    "clientReference": "17361939681871",
    "amount": "1700.00",
    "narration": "test eur payout from ngn wallet",
    "transactionCurrency": "EUR",
    "baseCurrency": "EUR",
    "countryCode": "FR",
    "paymentInfo": {
        "senderFirstName": "Josh Travels",
        "senderLastName": "Ghaju",
        "senderAddress": "Plot 331, Raji Rasaki Estate",
        "senderCity": "Lagos",
        "senderZipCode": "5005",
        "senderOccupation": "03",
        "senderIdType": "03",
        "senderIdNumber": "46543345322",
        "senderBeneficiaryRelationship": "02",
        "remitterType": "I",
        "beneficiaryType": "I",
        "receiverFirstName": "WIKARNDoA",
        "receiverLastName": "SURATPHAWADEE",
        "receiverAddress": "Plot 331, Raji Rasak",
        "receiverCity": "rec-city",
        "receiverZipCode": "5005",
        "bankAccountNumber": "DK4900401234567892",
        "purposeOfRemittance": "06",
        "senderSourceOfFund": "04",
        "payoutCurrency": "EUR"
    }
}`;
    };

    const getCurlExampleCode = () => {
        return `curl --location 'https://{{baseUrl}}/{{paymentContext}}/foreign-ft-app/make-payment/bank'
--header 'x-channel-id: CHANNEL_ID'
--header 'x-channel-code: CHANNEL_CODE'
--header 'x-merchant-id: YOUR_MERCHANT_ID'
--data '{
    "clientReference": "17361939681871",
    "amount": "1700.00",
    "narration": "test eur payout from ngn wallet",
    "transactionCurrency": "EUR",
    "baseCurrency": "EUR",
    "countryCode": "FR",
    "paymentInfo": {
        "senderFirstName": "Josh Travels",
        "senderLastName": "Ghaju",
        "senderAddress": "Plot 331, Raji Rasaki Estate",
        "senderCity": "Lagos",
        "senderZipCode": "5005",
        "senderOccupation": "03",
        "senderIdType": "03",
        "senderIdNumber": "46543345322",
        "senderBeneficiaryRelationship": "02",
        "remitterType": "I",
        "beneficiaryType": "I",
        "receiverFirstName": "WIKARNDoA",
        "receiverLastName": "SURATPHAWADEE",
        "receiverAddress": "Plot 331, Raji Rasak",
        "receiverCity": "rec-city",
        "receiverZipCode": "5005",
        "bankAccountNumber": "DK4900401234567892",
        "purposeOfRemittance": "06",
        "senderSourceOfFund": "04",
        "payoutCurrency": "EUR"
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
                    <PiggyBank className="h-3.5 w-3.5" />
                    API Reference
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
                    Account Deposit — EUR
                </h1>
                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl">
                    Deposit funds to bank accounts in Euro (EUR).
                </p>
            </section>

            {/* How EUR Account Deposit Works */}
            <section>
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <Globe className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">How EUR Account Deposit Works</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-6 max-w-2xl">
                    The EUR account deposit endpoint transfers Euros to European bank accounts within the SEPA (Single Euro Payments Area) zone — enabling EUR payments across 36+ European countries using a single, standardized payment infrastructure.
                </p>

                <div className="grid gap-4 sm:grid-cols-3 mb-6">
                    {[
                        { label: "Settlement time",  value: "Instant–1 business day" },
                        { label: "Currency",          value: "EUR only" },
                        { label: "Coverage",          value: "36+ SEPA member states" },
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
                                title: "IBAN is required — not account number + routing number",
                                body: "All SEPA transfers use IBAN (International Bank Account Number) for recipient identification. Pass the recipient's IBAN as bankAccountNumber in the paymentInfo object. US-style routing numbers are not applicable here.",
                            },
                            {
                                title: "SEPA Credit Transfer vs SEPA Instant",
                                body: "Standard SEPA Credit Transfers (SCT) settle within 1 business day. SEPA Instant Credit Transfer (SCT Inst) settles within 10 seconds where supported by the recipient bank. Passpoint routes via the optimal method available.",
                            },
                            {
                                title: "Coverage: all SEPA member states",
                                body: "SEPA covers all EU countries plus Norway, Iceland, Liechtenstein, Switzerland, Monaco, San Marino, Andorra, and the Vatican. Set countryCode to the recipient's country ISO 2-letter code (e.g. FR for France, DE for Germany, ES for Spain).",
                            },
                            {
                                title: "transactionCurrency must be EUR",
                                body: "Set transactionCurrency to \"EUR\" for all SEPA transfers. The baseCurrency reflects your wallet's funding currency. Passpoint handles FX conversion if your wallet holds a different currency.",
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
                        SEPA transfers are available Monday to Friday during TARGET2 operating hours for standard SCT. SEPA Instant operates 24/7/365 where supported. Standard SCT transfers submitted outside banking hours will be processed the next business day.
                    </p>
                </div>
            </section>

            {/* API Endpoint */}
            <section>
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <PiggyBank className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Account deposit</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
                    Initiate a EUR bank deposit to a verified beneficiary account.
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

export default PayoutBankForeignAccountDepositEur;
