import { PiggyBank, Info, Building2, AlertCircle } from "lucide-react";
import CodeBlock from "@/components/CodeBlock.tsx";

const PayoutBankForeignAccountDepositCny = () => {
    const getEndpointCode = () => {
        return `POST https://{{baseUrl}}/{{paymentContext}}/foreign-ft-app/make-payment/bank`;
    };

    const getRequestBodyCode = () => {
        return `{
    "clientReference": "1736193968197",
    "amount": "1350.00",
    "narration": "test cny payout",
    "transactionCurrency": "CNY",
    "baseCurrency": "USD",
    "countryCode": "CN",
    "paymentInfo": {
        "remitterType": "I",
        "senderFirstName": "Josh Travels",
        "senderLastName": "Ghaju",
        "senderAddress": "Plot 331, Raji Rasaki Estate",
        "senderMobile": "5678761918",
        "senderGender": "Male",
        "senderDateOfBirth": "1998-09-10",
        "senderCity": "Lagos",
        "senderZipCode": "5005",
        "senderIdType": "03",
        "senderIdNumber": "46543345322",
        "senderIdIssueCountry": "NGA",
        "senderBeneficiaryRelationship": "02",
        "beneficiaryType": "I",
        "receiverFirstName": "SEEA",
        "receiverLastName": "MOI",
        "receiverNativeFirstname": "试账户",
        "receiverNativeLastname": "测",
        "receiverNativeAddress": "山东省德州市德城区新湖街道1243号202室",
        "receiverContactNumber": "13333333333",
        "receiverGender": "Male",
        "receiverDateOfBirth": "1998-09-10",
        "receiverCity": "rec-city",
        "receiverZipCode": "5005",
        "receiverOccupation": "03",
        "receiverIdType": "01",
        "receiverIdNumber": "330602198201220041",
        "receiverIdIssueCountry": "CHN",
        "receiverIdIssueDate": "2022-08-28",
        "receiverIdExpireDate": "2026-12-12",
        "bankAccountNumber": "6210281010000312",
        "bankBranchCode": "067014822",
        "purposeOfRemittance": "06",
        "senderSourceOfFund": "04",
        "payoutCurrency": "CNY"
    }
}`;
    };

    const getCurlExampleCode = () => {
        return `curl --location 'https://{{baseUrl}}/{{paymentContext}}/foreign-ft-app/make-payment/bank'
--header 'x-channel-id: CHANNEL_ID'
--header 'x-channel-code: CHANNEL_CODE'
--header 'x-merchant-id: YOUR_MERCHANT_ID'
--data-raw '{
    "clientReference": "1736193968197",
    "amount": "1350.00",
    "narration": "test cny payout",
    "transactionCurrency": "CNY",
    "baseCurrency": "USD",
    "countryCode": "CN",
    "paymentInfo": {
        "remitterType": "I",
        "senderFirstName": "Josh Travels",
        "senderLastName": "Ghaju",
        "senderAddress": "Plot 331, Raji Rasaki Estate",
        "senderMobile": "5678761918",
        "senderGender": "Male",
        "senderDateOfBirth": "1998-09-10",
        "senderCity": "Lagos",
        "senderZipCode": "5005",
        "senderIdType": "03",
        "senderIdNumber": "46543345322",
        "senderIdIssueCountry": "NGA",
        "senderBeneficiaryRelationship": "02",
        "beneficiaryType": "I",
        "receiverFirstName": "SEEA",
        "receiverLastName": "MOI",
        "receiverNativeFirstname": "试账户",
        "receiverNativeLastname": "测",
        "receiverNativeAddress": "山东省德州市德城区新湖街道1243号202室",
        "receiverContactNumber": "13333333333",
        "receiverGender": "Male",
        "receiverDateOfBirth": "1998-09-10",
        "receiverCity": "rec-city",
        "receiverZipCode": "5005",
        "receiverOccupation": "03",
        "receiverIdType": "01",
        "receiverIdNumber": "330602198201220041",
        "receiverIdIssueCountry": "CHN",
        "receiverIdIssueDate": "2022-08-28",
        "receiverIdExpireDate": "2026-12-12",
        "bankAccountNumber": "6210281010000312",
        "bankBranchCode": "067014822",
        "purposeOfRemittance": "06",
        "senderSourceOfFund": "04",
        "payoutCurrency": "CNY"
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
                    Account Deposit  CNY
                </h1>
                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl">
                    Deposit funds to bank accounts in Chinese Yuan (CNY).
                </p>
            </section>

            {/* How CNY Account Deposit Works */}
            <section>
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <Building2 className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">How CNY Account Deposit Works</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-6 max-w-2xl">
                    The CNY account deposit endpoint deposits Chinese Yuan (CNY/RMB) directly into a recipient's Chinese bank account. This is the standard individual bank-to-bank CNY transfer for paying Chinese individuals directly to their bank accounts.
                </p>

                <div className="grid gap-4 sm:grid-cols-3 mb-6">
                    {[
                        { label: "Settlement time",  value: "1–2 business days" },
                        { label: "Currency",          value: "CNY (RMB)" },
                        { label: "Recipient country", value: "China (CN)" },
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
                                title: "Major Chinese banks are supported",
                                body: "The recipient must hold an account at a Chinese bank. Supported institutions include ICBC (Industrial and Commercial Bank of China), CCB (China Construction Bank), ABC (Agricultural Bank of China), BOC (Bank of China), and other major Chinese banks.",
                            },
                            {
                                title: "Native name and address fields are required",
                                body: "The paymentInfo object requires Chinese-language fields for the recipient: receiverNativeFirstname and receiverNativeLastname (Chinese characters), and receiverNativeAddress in Chinese. These are required for cross-border CNY compliance.",
                            },
                            {
                                title: "Recipient ID verification is mandatory",
                                body: "Chinese cross-border payment regulations require full beneficiary ID verification. Provide receiverIdType, receiverIdNumber (Chinese national ID is 18 characters), receiverIdIssueCountry (CHN), and ID validity dates.",
                            },
                            {
                                title: "transactionCurrency must be CNY",
                                body: "Set transactionCurrency to \"CNY\" and countryCode to \"CN\". The baseCurrency reflects your wallet's funding currency  Passpoint handles the cross-currency conversion.",
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
                        For paying Chinese businesses rather than individuals, use the B2B CNY transfer endpoint. For mobile wallet deposits (WeChat Pay or Alipay), use the MoMo CNY endpoint. This endpoint is specifically for individual-to-bank-account transfers.
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
                    Initiate a CNY bank deposit to a verified beneficiary account.
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

export default PayoutBankForeignAccountDepositCny;
