import { PiggyBank, Info, Clock, AlertCircle } from "lucide-react";
import CodeBlock from "@/components/CodeBlock.tsx";

const PayoutBankForeignAccountDepositGbp = () => {
    const getEndpointCode = () => {
        return `POST https://{{baseUrl}}/{{paymentContext}}/foreign-ft-app/make-payment/bank`;
    };

    const getRequestBodyCode = () => {
        return `{
    "clientReference": "17361939681860",
    "amount": "1000.00",
    "narration": "test gbp payout",
    "transactionCurrency": "GBP",
    "baseCurrency": "GBP",
    "countryCode": "GB",
    "paymentInfo": {
        "senderFirstName": "Josh",
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
        "bankAccountNumber": "GB17BOFS80055100813796",
        "purposeOfRemittance": "06",
        "senderSourceOfFund": "04",
        "payoutCurrency": "GBP"
    }
}`;
    };

    const getCurlExampleCode = () => {
        return `curl --location 'https://{{baseUrl}}/{{paymentContext}}/foreign-ft-app/make-payment/bank'
--header 'x-channel-id: CHANNEL_ID'
--header 'x-channel-code: CHANNEL_CODE'
--header 'x-merchant-id: YOUR_MERCHANT_ID'
--data '{
    "clientReference": "17361939681860",
    "amount": "1000.00",
    "narration": "test gbp payout",
    "transactionCurrency": "GBP",
    "baseCurrency": "GBP",
    "countryCode": "GB",
    "paymentInfo": {
        "senderFirstName": "Josh",
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
        "bankAccountNumber": "GB17BOFS80055100813796",
        "purposeOfRemittance": "06",
        "senderSourceOfFund": "04",
        "payoutCurrency": "GBP"
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
                    Account Deposit  GBP
                </h1>
                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl">
                    Deposit funds to bank accounts in British Pound (GBP).
                </p>
            </section>

            {/* How GBP Account Deposit Works */}
            <section>
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <Clock className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">How GBP Account Deposit Works</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-6 max-w-2xl">
                    The GBP account deposit endpoint transfers British Pounds to a UK bank account. Passpoint automatically routes through the appropriate UK payment rail  Faster Payments for eligible amounts (typically instant) or BACS (3 business days) depending on the amount and destination bank.
                </p>

                <div className="grid gap-4 sm:grid-cols-3 mb-6">
                    {[
                        { label: "Settlement time",  value: "Instant–3 business days" },
                        { label: "Currency",          value: "GBP only" },
                        { label: "Recipient country", value: "United Kingdom (GB)" },
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
                                title: "IBAN is used instead of US routing number",
                                body: "UK bank accounts are identified by IBAN (International Bank Account Number) rather than a routing number. Pass the recipient's UK IBAN (e.g. GB17BOFS80055100813796) as bankAccountNumber in the paymentInfo object. The Sort Code is embedded within the IBAN.",
                            },
                            {
                                title: "transactionCurrency and baseCurrency",
                                body: "Set transactionCurrency to \"GBP\" and countryCode to \"GB\". The baseCurrency should match your wallet's funding currency. Passpoint handles the FX conversion if your wallet is not in GBP.",
                            },
                            {
                                title: "Compliance fields are required",
                                body: "The paymentInfo object must include sender identity details (occupation, ID type/number, address, city, zip code) and beneficiary details (name, address, city, zip code). Purpose of remittance and source of funds are also mandatory for GBP transfers.",
                            },
                            {
                                title: "Fully asynchronous",
                                body: "The initial API response returns status \"NEW\" to confirm queuing. Final status is delivered via webhook. Store the transactionId for reconciliation.",
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
                        UK Faster Payments support transactions up to £1,000,000, though individual bank limits may be lower. For amounts exceeding your recipient bank's Faster Payments limit, BACS will be used automatically, resulting in a 3 business day settlement.
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
                    Initiate a GBP bank deposit to a verified beneficiary account.
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

export default PayoutBankForeignAccountDepositGbp;
