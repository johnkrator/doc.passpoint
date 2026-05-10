import { Smartphone, Info, Users, AlertCircle } from "lucide-react";
import CodeBlock from "@/components/CodeBlock.tsx";

const PayoutBankForeignMomoDepositCny = () => {
    const getEndpointCode = () => {
        return `POST https://{{baseUrl}}/{{paymentContext}}/foreign-ft-app/make-payment/momo`;
    };

    const getRequestBodyCode = () => {
        return `{
    "clientReference": "1736193968181",
    "amount": "15.00",
    "narration": "test cny momo transfer",
    "transactionCurrency": "CNY",
    "baseCurrency": "USD",
    "countryCode": "CN",
    "paymentInfo": {
        "senderFirstName": "Josh Travels",
        "senderLastName": "Ghaju",
        "senderGender": "Male",
        "senderAddress": "Plot 331, Raji Rasaki Estate",
        "senderMobile": "5678761918",
        "senderEmail": "test@inficare.com.my",
        "senderDateOfBirth": "1998-09-10",
        "senderCity": "Lagos",
        "senderZipCode": "5005",
        "senderIdType": "03",
        "senderIdNumber": "46543345322",
        "senderIdIssueCountry": "NGA",
        "senderBeneficiaryRelationship": "02",
        "remitterType": "I",
        "beneficiaryType": "I",
        "receiverFirstName": "LEI",
        "receiverLastName": "LI",
        "receiverContactNumber": "13721473389",
        "receiverDateOfBirth": "1998-09-10",
        "receiverAddress": "Plot 331, Raji Rasak",
        "receiverIdType": "03",
        "receiverIdNumber": "440902198806032838",
        "receiverIdIssueCountry": "CHN",
        "bankAccountNumber": "13721473389",
        "purposeOfRemittance": "06",
        "senderSourceOfFund": "04",
        "payoutCurrency": "CNY"
    }
}`;
    };

    const getCurlExampleCode = () => {
        return `curl --location 'https://{{baseUrl}}/{{paymentContext}}/foreign-ft-app/make-payment/momo'
--header 'x-channel-id: CHANNEL_ID'
--header 'x-channel-code: CHANNEL_CODE'
--header 'x-merchant-id: YOUR_MERCHANT_ID'
--data '{
    "clientReference": "1736193968181",
    "amount": "15.00",
    "narration": "test cny momo transfer",
    "transactionCurrency": "CNY",
    "baseCurrency": "USD",
    "countryCode": "CN",
    "paymentInfo": {
        "senderFirstName": "Josh Travels",
        "senderLastName": "Ghaju",
        "senderGender": "Male",
        "senderAddress": "Plot 331, Raji Rasaki Estate",
        "senderMobile": "5678761918",
        "senderEmail": "test@inficare.com.my",
        "senderDateOfBirth": "1998-09-10",
        "senderCity": "Lagos",
        "senderZipCode": "5005",
        "senderIdType": "03",
        "senderIdNumber": "46543345322",
        "senderIdIssueCountry": "NGA",
        "senderBeneficiaryRelationship": "02",
        "remitterType": "I",
        "beneficiaryType": "I",
        "receiverFirstName": "LEI",
        "receiverLastName": "LI",
        "receiverContactNumber": "13721473389",
        "receiverDateOfBirth": "1998-09-10",
        "receiverAddress": "Plot 331, Raji Rasak",
        "receiverIdType": "03",
        "receiverIdNumber": "440902198806032838",
        "receiverIdIssueCountry": "CHN",
        "bankAccountNumber": "13721473389",
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
                    <Smartphone className="h-3.5 w-3.5" />
                    API Reference
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
                    MoMo Deposit  CNY
                </h1>
                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl">
                    Deposit funds via mobile money (MoMo) in Chinese Yuan (CNY).
                </p>
            </section>

            {/* How CNY MoMo Deposit Works */}
            <section>
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <Users className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">How CNY MoMo Deposit Works</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-6 max-w-2xl">
                    The CNY MoMo deposit endpoint sends Chinese Yuan directly into a recipient's Chinese mobile wallet  WeChat Pay or Alipay. These platforms have hundreds of millions of active users in China and are the dominant payment method for Chinese individuals.
                </p>

                <div className="grid gap-4 sm:grid-cols-3 mb-6">
                    {[
                        { label: "Settlement time",  value: "Near-instant" },
                        { label: "Currency",          value: "CNY (RMB)" },
                        { label: "Destination",       value: "WeChat Pay / Alipay" },
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
                                title: "Mobile number as wallet identifier",
                                body: "Unlike bank account deposits, MoMo transfers use the recipient's mobile phone number as the wallet identifier. Pass the recipient's Chinese mobile number as bankAccountNumber in the paymentInfo object (e.g. 13721473389).",
                            },
                            {
                                title: "Preferred for: gig workers, freelancers, small business suppliers",
                                body: "MoMo is the ideal payment method for Chinese individuals who prefer mobile wallets over bank accounts  common among gig economy workers, freelancers, influencers (KOL), and small business owners operating informally.",
                            },
                            {
                                title: "Recipient ID verification is required",
                                body: "Chinese mobile wallet regulations require beneficiary identity verification. Provide receiverIdType, receiverIdNumber, and receiverIdIssueCountry (CHN) in the paymentInfo object. The receiver's contact number must match the registered wallet mobile number.",
                            },
                            {
                                title: "transactionCurrency must be CNY, countryCode must be CN",
                                body: "Set transactionCurrency to \"CNY\" and countryCode to \"CN\". The baseCurrency reflects your wallet's funding currency  Passpoint performs the FX conversion automatically.",
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
                        For payments to Chinese bank accounts rather than mobile wallets, use the CNY account deposit endpoint. For business-to-business CNY transfers, use the B2B CNY endpoint. MoMo is designed specifically for consumer mobile wallet payouts.
                    </p>
                </div>
            </section>

            {/* API Endpoint */}
            <section>
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <Smartphone className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">MoMo deposit</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
                    Initiate a CNY mobile money deposit to a verified beneficiary.
                </p>

                <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2 px-4 py-3 bg-muted/30 dark:bg-card/50 border border-border rounded-2xl">
                        <span className="px-2 py-0.5 rounded text-xs font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400">POST</span>
                        <code className="text-xs text-muted-foreground break-all">
                            https://{"{{baseUrl}}"}/{"{{paymentContext}}"}/foreign-ft-app/make-payment/momo
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

export default PayoutBankForeignMomoDepositCny;
