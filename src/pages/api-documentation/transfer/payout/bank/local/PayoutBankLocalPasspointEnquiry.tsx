import {CheckCircle, Info, Wallet} from "lucide-react";
import CodeBlock from "@/components/CodeBlock.tsx";

const PayoutBankLocalPasspointEnquiry = () => {
    const getPasspointEnquiryEndpoint = () => `POST https://{{baseUrl}}/{{paymentContext}}/ft-app/passpoint-enquiry`;

    const getPasspointEnquiryRequestBody = () => `{
    "walletId":"josh@mypasspoint.com",
    "currency":"NGN"
}`;

    const getPasspointEnquiryCurlExample = () => `curl --location 'https://{{baseUrl}}/{{paymentContext}}/ft-app/passpoint-enquiry'
--header 'x-merchant-id: YOUR_MERCHANT_ID'
--header 'x-channel-id: CHANNEL_ID'
--header 'x-channel-code: CHANNEL_CODE'
--data-raw '{
    "walletId":"josh@mypasspoint.com",
    "currency":"NGN"
}'`;

    const getPasspointEnquiryResponse = () => `{
  "responseCode": "00",
  "responseDescription": "Successful",
  "responseMessage": "passpoint enquiry successful",
  "data": {
    "accountName": "MERCHANT(Josh Merchant)"
  }
}`;

    return (
        <div className="py-8 sm:py-10 space-y-16">

            {/* Hero */}
            <section>
                <div className="inline-flex items-center gap-2 bg-brand-50 dark:bg-brand-950/40 text-brand text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
                    <CheckCircle className="h-3.5 w-3.5" />
                    API Reference
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
                    Passpoint Enquiry
                </h1>
                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl">
                    Verify a Passpoint beneficiary wallet before initiating a transfer.
                </p>
            </section>

            {/* How Passpoint Wallet Enquiry Works */}
            <section>
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <Wallet className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">How Passpoint Wallet Enquiry Works</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-6 max-w-2xl">
                    Passpoint Enquiry is the wallet equivalent of Account Enquiry  it verifies a Passpoint wallet holder's identity before a wallet-to-wallet transfer. The <code className="font-mono bg-muted px-1.5 py-0.5 rounded text-xs">walletId</code> is the recipient's <strong className="text-foreground">registered Passpoint email address</strong>, and a successful response returns their name for your user to confirm.
                </p>

                <div className="space-y-4">
                    <div className="grid sm:grid-cols-3 gap-4">
                        {[
                            {
                                icon: <Wallet className="h-4 w-4 text-brand" />,
                                title: "walletId = email address",
                                desc: "The walletId is the recipient's registered Passpoint email. It's the same value used as accountId in the Passpoint Wallet Transfer request  keep them consistent.",
                            },
                            {
                                icon: <CheckCircle className="h-4 w-4 text-brand" />,
                                title: "Always confirm with user",
                                desc: "The returned accountName is the wallet holder's registered display name. Show it to your user before proceeding  this prevents transfers to the wrong Passpoint account.",
                            },
                            {
                                icon: <Info className="h-4 w-4 text-brand" />,
                                title: "Instant settlement",
                                desc: "Wallet-to-wallet transfers settle nearly instantly on Passpoint, unlike bank transfers. Enquiry responses are synchronous  if it returns successfully, the wallet is active and ready to receive.",
                            },
                        ].map(({ icon, title, desc }) => (
                            <div key={title} className="bg-white dark:bg-card border border-border rounded-2xl p-5 space-y-2">
                                <div className="flex items-center gap-2">
                                    <div className="bg-brand-50 dark:bg-brand-950/40 w-7 h-7 rounded-full flex items-center justify-center shrink-0">
                                        {icon}
                                    </div>
                                    <h3 className="text-sm font-semibold text-foreground">{title}</h3>
                                </div>
                                <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="bg-white dark:bg-card border border-border rounded-2xl overflow-hidden">
                        <div className="px-5 py-3 border-b border-border bg-muted/30">
                            <h4 className="text-sm font-semibold text-foreground">Wallet enquiry vs. bank account enquiry</h4>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-border">
                                        <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Aspect</th>
                                        <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Passpoint Enquiry</th>
                                        <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Bank Account Enquiry</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    {[
                                        { aspect: "Identifier used", wallet: "walletId (email address)", bank: "accountNumber + bankCode" },
                                        { aspect: "What it validates", wallet: "Passpoint wallet is active", bank: "NUBAN account exists at bank" },
                                        { aspect: "Settlement speed", wallet: "Near-instant after transfer", bank: "Asynchronous (minutes to hours)" },
                                        { aspect: "Next step", wallet: "Passpoint Wallet Transfer", bank: "NGN Account Transfer" },
                                    ].map(({ aspect, wallet, bank }) => (
                                        <tr key={aspect} className="hover:bg-muted/20 transition-colors">
                                            <td className="px-5 py-3.5 text-xs font-semibold text-foreground">{aspect}</td>
                                            <td className="px-5 py-3.5 text-muted-foreground text-xs">{wallet}</td>
                                            <td className="px-5 py-3.5 text-muted-foreground text-xs">{bank}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="bg-muted/40 dark:bg-background/40 border border-border rounded-xl p-4 flex items-start gap-3">
                        <Info className="h-4 w-4 text-brand shrink-0 mt-0.5" />
                        <div>
                            <p className="text-xs font-semibold text-foreground mb-1">Enquiry failure = invalid wallet</p>
                            <p className="text-xs text-muted-foreground">
                                If the enquiry returns an error, the <code className="font-mono bg-muted px-1 py-0.5 rounded">walletId</code> does not correspond to an active Passpoint wallet. Do not proceed to transfer  prompt your user to verify the email address they entered.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* API Endpoint */}
            <section>
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <CheckCircle className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Passpoint enquiry</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
                    Verify a Passpoint wallet ID and retrieve the associated account name.
                </p>

                <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2 px-4 py-3 bg-muted/30 dark:bg-card/50 border border-border rounded-2xl">
                        <span className="px-2 py-0.5 rounded text-xs font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400">POST</span>
                        <code className="text-xs text-muted-foreground break-all">
                            https://{"{{baseUrl}}"}/{"{{paymentContext}}"}/ft-app/passpoint-enquiry
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
                                    <td className="px-5 py-3.5 font-mono text-xs text-foreground">x-merchant-id</td>
                                    <td className="px-5 py-3.5 text-muted-foreground">your-merchant-id</td>
                                </tr>
                                <tr className="hover:bg-muted/20 transition-colors">
                                    <td className="px-5 py-3.5 font-mono text-xs text-foreground">x-channel-id</td>
                                    <td className="px-5 py-3.5 text-muted-foreground">3</td>
                                </tr>
                                <tr className="hover:bg-muted/20 transition-colors">
                                    <td className="px-5 py-3.5 font-mono text-xs text-foreground">x-channel-code</td>
                                    <td className="px-5 py-3.5 text-muted-foreground">legacy-api-user</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-5">
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">Endpoint</h4>
                            <CodeBlock>{getPasspointEnquiryEndpoint()}</CodeBlock>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">Request body</h4>
                            <CodeBlock language="json">{getPasspointEnquiryRequestBody()}</CodeBlock>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">cURL example</h4>
                            <CodeBlock language="bash">{getPasspointEnquiryCurlExample()}</CodeBlock>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">Response</h4>
                            <CodeBlock language="json">{getPasspointEnquiryResponse()}</CodeBlock>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PayoutBankLocalPasspointEnquiry;
