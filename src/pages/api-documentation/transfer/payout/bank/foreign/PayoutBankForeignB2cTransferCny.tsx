import { Send, Info, Users, AlertCircle } from "lucide-react";
import CodeBlock from "@/components/CodeBlock.tsx";

const PayoutBankForeignB2cTransferCny = () => {
    const getEndpointCode = () => {
        return `POST https://{{baseUrl}}/{{paymentContext}}/foreign-ft-app/make-payment/b2c`;
    };

    const getRequestBodyCode = () => {
        return `{
    "clientReference": "1736193968177",
    "amount": "17.00",
    "narration": "test cny b2c transfer",
    "transactionCurrency": "CNY",
    "baseCurrency": "USD",
    "countryCode": "CN",
    "paymentInfo": {
        "remitterType": "B",
        "senderFirstName": "Josh Travels",
        "senderAddress": "Plot 331, Raji Rasaki Estate",
        "senderCity": "Lagos",
        "senderIdType": "03",
        "senderIdNumber": "46543345322",
        "senderIdIssueCountry": "NGA",
        "senderBeneficiaryRelationship": "02",
        "beneficiaryType": "I",
        "receiverFirstName": "Test",
        "receiverLastName": "Name",
        "receiverNativeFirstname": "试账户",
        "receiverNativeLastname": "测",
        "receiverIdType": "01",
        "receiverIdNumber": "440902198806032838",
        "receiverIdIssueCountry": "CHN",
        "bankAccountNumber": "6217003090002505420",
        "bankBranchCode": "067014822",
        "purposeOfRemittance": "06",
        "senderSourceOfFund": "04",
        "payoutCurrency": "CNY",
        "uploadRef": "b7d69246-9e23-481c-85f0-4b8bca55c2cb"
    }
}`;
    };

    const getCurlExampleCode = () => {
        return `curl --location 'https://{{baseUrl}}/{{paymentContext}}/foreign-ft-app/make-payment/b2c'
--header 'x-channel-id: CHANNEL_ID'
--header 'x-channel-code: CHANNEL_CODE'
--header 'x-merchant-id: YOUR_MERCHANT_ID'
--data '{
    "clientReference": "1736193968177",
    "amount": "17.00",
    "narration": "test cny b2c transfer",
    "transactionCurrency": "CNY",
    "baseCurrency": "USD",
    "countryCode": "CN",
    "paymentInfo": {
        "remitterType": "B",
        "senderFirstName": "Josh Travels",
        "senderAddress": "Plot 331, Raji Rasaki Estate",
        "senderCity": "Lagos",
        "senderIdType": "03",
        "senderIdNumber": "46543345322",
        "senderIdIssueCountry": "NGA",
        "senderBeneficiaryRelationship": "02",
        "beneficiaryType": "I",
        "receiverFirstName": "Test",
        "receiverLastName": "Name",
        "receiverNativeFirstname": "试账户",
        "receiverNativeLastname": "测",
        "receiverIdType": "01",
        "receiverIdNumber": "440902198806032838",
        "receiverIdIssueCountry": "CHN",
        "bankAccountNumber": "6217003090002505420",
        "bankBranchCode": "067014822",
        "purposeOfRemittance": "06",
        "senderSourceOfFund": "04",
        "payoutCurrency": "CNY",
        "uploadRef": "b7d69246-9e23-481c-85f0-4b8bca55c2cb"
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
                    <Send className="h-3.5 w-3.5" />
                    API Reference
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
                    B2C Transfer — CNY
                </h1>
                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl">
                    Process business-to-consumer transfers in Chinese Yuan (CNY) to bank accounts.
                </p>
            </section>

            {/* How B2C CNY Transfer Works */}
            <section>
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <Users className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">How B2C CNY Transfer Works</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-6 max-w-2xl">
                    The B2C CNY transfer endpoint sends Chinese Yuan from your business account to an individual's Chinese bank account. Use this for all consumer-facing payouts: salary disbursements, freelancer payments, customer refunds, loyalty rewards, and prize payouts.
                </p>

                <div className="grid gap-4 sm:grid-cols-3 mb-6">
                    {[
                        { label: "Settlement time",  value: "1–2 business days" },
                        { label: "Currency",          value: "CNY (RMB)" },
                        { label: "Recipient type",    value: "Individual (beneficiaryType: I)" },
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
                                title: "Business sender, individual recipient",
                                body: "Set remitterType to \"B\" (Business) and beneficiaryType to \"I\" (Individual). The sender is your business entity; the recipient is an individual Chinese bank account holder. This combination is what distinguishes B2C from B2B transfers.",
                            },
                            {
                                title: "Chinese native name fields are required",
                                body: "You must provide receiverNativeFirstname and receiverNativeLastname in Chinese characters — these must match exactly as they appear on the recipient's national ID and bank account. Mismatches will cause the transfer to be rejected by the recipient bank.",
                            },
                            {
                                title: "Full ID verification is mandatory",
                                body: "Chinese cross-border regulations require individual beneficiary identity verification. Provide receiverIdType (use \"01\" for Chinese national ID), receiverIdNumber (18-digit national ID number), and receiverIdIssueCountry (CHN). This is not optional — omitting these fields will cause the request to fail.",
                            },
                            {
                                title: "uploadRef may be required for certain amounts",
                                body: "The uploadRef field references supporting documents (e.g. payroll records, service contracts) that may be required for cross-border B2C CNY transfers above certain thresholds. Consult Passpoint's compliance guidance for the current documentation thresholds.",
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

                {/* Response field explanation */}
                <div className="bg-white dark:bg-card border border-border rounded-2xl overflow-hidden mb-4">
                    <div className="px-5 py-3 border-b border-border bg-muted/30">
                        <h4 className="text-sm font-semibold text-foreground">Response fields explained</h4>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-border">
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Field</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Meaning</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {[
                                    { field: 'status: "NEW"',  meaning: "Transfer queued successfully. This is not final — monitor via webhook callback for the settled state." },
                                    { field: "transactionId",  meaning: "Passpoint's unique identifier for this transaction. Store this value — it is required for status lookups and reconciliation." },
                                    { field: "amount",         meaning: "The submitted transfer amount as confirmed by Passpoint at the time of queuing." },
                                    { field: "charges",        meaning: "The processing fee deducted from your wallet for this B2C CNY transaction. Check the Rate endpoint for current fee schedules." },
                                ].map(({ field, meaning }) => (
                                    <tr key={field} className="hover:bg-muted/20 transition-colors">
                                        <td className="px-5 py-3.5">
                                            <span className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">{field}</span>
                                        </td>
                                        <td className="px-5 py-3.5 text-muted-foreground text-xs">{meaning}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="bg-muted/40 dark:bg-background/40 border border-border rounded-xl p-4 flex items-start gap-3">
                    <Info className="h-4 w-4 text-brand shrink-0 mt-0.5" />
                    <p className="text-xs text-muted-foreground">
                        For paying Chinese individuals via mobile wallet (WeChat Pay or Alipay) instead of a bank account, use the MoMo CNY endpoint. For business-to-business corporate payments in CNY, use the B2B CNY endpoint. B2C is specifically for business-to-individual bank account transfers.
                    </p>
                </div>
            </section>

            {/* API Endpoint */}
            <section>
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <Send className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">B2C transfer</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
                    Initiate a CNY business-to-consumer bank transfer.
                </p>

                <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2 px-4 py-3 bg-muted/30 dark:bg-card/50 border border-border rounded-2xl">
                        <span className="px-2 py-0.5 rounded text-xs font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400">POST</span>
                        <code className="text-xs text-muted-foreground break-all">
                            https://{"{{baseUrl}}"}/{"{{paymentContext}}"}/foreign-ft-app/make-payment/b2c
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

export default PayoutBankForeignB2cTransferCny;
