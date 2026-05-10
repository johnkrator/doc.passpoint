import { PiggyBank, Info, Shuffle, AlertCircle } from "lucide-react";
import CodeBlock from "@/components/CodeBlock.tsx";

const PayoutBankForeignAccountDepositUsd = () => {
    const getEndpointCode = () => {
        return `POST https://{{baseUrl}}/{{paymentContext}}/foreign-ft-app/make-payment/bank`;
    };

    const getRequestBodyCode = () => {
        return `{
    "clientReference": "17361939681845",
    "amount": "2000.00",
    "narration": "test usd payout of 200",
    "transactionCurrency": "USD",
    "baseCurrency": "USD",
    "countryCode": "US",
    "paymentInfo": {
        "senderFirstName": "Joshua",
        "senderLastName": "Ghaju",
        "senderAddress": "Plot 331, Raji Rasaki Estate",
        "senderMobile": "5678761918",
        "senderEmail": "test@inficare.com.my",
        "senderDateOfBirth": "1998-09-10",
        "senderCity": "Lagos",
        "senderZipCode": "5005",
        "senderOccupation": "03",
        "senderBeneficiaryRelationship": "02",
        "remitterType": "I",
        "senderIdType": "03",
        "senderIdNumber": "46543345322",
        "senderIdIssueCountry": "NGA",
        "senderIdIssueDate": "2022-08-28",
        "senderIdExpireDate": "2025-09-30",
        "beneficiaryType": "I",
        "receiverFirstName": "WIKARNDoA",
        "receiverLastName": "SURATPHAWADEE",
        "receiverAddress": "Plot 331, Raji Rasak",
        "receiverState": "Delaware",
        "receiverCity": "rec-city",
        "receiverZipCode": "5005",
        "bankAccountNumber": "999999999939399393939393939",
        "bankBranchCode": "067014822",
        "receiverContactNumber": "18901669689",
        "purposeOfRemittance": "06",
        "senderSourceOfFund": "04",
        "payoutCurrency": "USD"
    }
}`;
    };

    const getCurlExampleCode = () => {
        return `curl --location 'https://{{baseUrl}}/{{paymentContext}}/foreign-ft-app/make-payment/bank'
--header 'x-channel-id: CHANNEL_ID'
--header 'x-channel-code: CHANNEL_CODE'
--header 'x-merchant-id: YOUR_MERCHANT_ID'
--data-raw '{
    "clientReference": "17361939681845",
    "amount": "2000.00",
    "narration": "test usd payout of 200",
    "transactionCurrency": "USD",
    "baseCurrency": "USD",
    "countryCode": "US",
    "paymentInfo": {
        "senderFirstName": "Joshua",
        "senderLastName": "Ghaju",
        "senderAddress": "Plot 331, Raji Rasaki Estate",
        "senderMobile": "5678761918",
        "senderEmail": "test@inficare.com.my",
        "senderDateOfBirth": "1998-09-10",
        "senderCity": "Lagos",
        "senderZipCode": "5005",
        "senderOccupation": "03",
        "senderBeneficiaryRelationship": "02",
        "remitterType": "I",
        "senderIdType": "03",
        "senderIdNumber": "46543345322",
        "senderIdIssueCountry": "NGA",
        "senderIdIssueDate": "2022-08-28",
        "senderIdExpireDate": "2025-09-30",
        "beneficiaryType": "I",
        "receiverFirstName": "WIKARNDoA",
        "receiverLastName": "SURATPHAWADEE",
        "receiverAddress": "Plot 331, Raji Rasak",
        "receiverState": "Delaware",
        "receiverCity": "rec-city",
        "receiverZipCode": "5005",
        "bankAccountNumber": "999999999939399393939393939",
        "bankBranchCode": "067014822",
        "receiverContactNumber": "18901669689",
        "purposeOfRemittance": "06",
        "senderSourceOfFund": "04",
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
                    <PiggyBank className="h-3.5 w-3.5" />
                    API Reference
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
                    Account Deposit  USD
                </h1>
                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl">
                    Deposit funds to bank accounts in US Dollar (USD).
                </p>
            </section>

            {/* How USD Account Deposit Works */}
            <section>
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <Shuffle className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">How USD Account Deposit Works</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-6 max-w-2xl">
                    The USD account deposit endpoint sends USD funds directly into a US bank account. Unlike the specific rail endpoints (ACH, RTP, Wire, FedNow), this endpoint abstracts the payment rail  Passpoint automatically routes via the optimal available rail for the recipient's bank.
                </p>

                <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-4 mb-4">
                    <div className="space-y-4">
                        {[
                            {
                                title: "Automatic rail selection",
                                body: "When you use this endpoint, you do not specify ACH, RTP, or FedNow directly. Passpoint evaluates the recipient bank's capabilities and routes via the best available rail. This simplifies integration when you want to send USD without managing rail selection logic yourself.",
                            },
                            {
                                title: "Full paymentInfo is required",
                                body: "Unlike the ACH/Wire/RTP endpoints, the USD account deposit requires a comprehensive paymentInfo object including sender identity details (name, address, date of birth, occupation, ID type/number), beneficiary details, purpose of remittance, and source of funds. These are required for compliance.",
                            },
                            {
                                title: "Recipient country must be US",
                                body: "Set countryCode to \"US\" and payoutCurrency to \"USD\" in the paymentInfo object. Both transactionCurrency and baseCurrency must also be \"USD\" for this endpoint.",
                            },
                            {
                                title: "Fully asynchronous",
                                body: "The response returns status \"NEW\" to confirm the transfer is queued. Implement webhook handling to receive the final settlement status. The transactionId in the response is your key for status tracking and reconciliation.",
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
                        If you need control over which specific payment rail is used (e.g. to guarantee instant delivery via RTP or FedNow), use the dedicated endpoint for that rail instead of this general account deposit endpoint.
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
                    Initiate a USD bank deposit to a verified beneficiary account.
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

export default PayoutBankForeignAccountDepositUsd;
