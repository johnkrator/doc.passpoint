import {Send, Info, Wallet, TableProperties} from "lucide-react";
import CodeBlock from "@/components/CodeBlock.tsx";

const WALLET_TRANSFER_RESPONSE_FIELDS: { field: string; description: string }[] = [
    {
        field: 'status: "NEW"',
        description:
            "Queued for processing. Even for wallet-to-wallet transfers, the async pattern applies  confirm the final outcome via webhook or the Transfer Status endpoint.",
    },
    {
        field: "transactionId",
        description:
            "Passpoint's unique transaction identifier. Store this for reconciliation and status polling.",
    },
];

const PayoutBankLocalPasspointWalletTransfer = () => {
    const getEndpointCode = () => {
        return `POST https://{{baseUrl}}/{{paymentContext}}/ft-app/account-transfer`;
    };

    const getRequestBodyCode = () => {
        return `{
    "clientReference":"12344354534534545423",
    "amount":"10000",
    "narration":"test wallet to wallet credit notification",
    "transactionCurrency":"NGN",
    "accountName":"MERCHANT(Victor Spicey)",
    "bankCode":"000000",
    "accountId":"victor@mypasspoint.com",
    "channel":"3"
}`;
    };

    const getCurlExampleCode = () => {
        return `curl --location 'https://{{baseUrl}}/{{paymentContext}}/ft-app/account-transfer'
--header 'x-merchant-id: YOUR_MERCHANT_ID'
--header 'x-channel-id: CHANNEL_ID'
--header 'x-channel-code: CHANNEL_CODE'
--data-raw '{
    "clientReference":"12344354534534545423",
    "amount":"10000",
    "narration":"test wallet to wallet credit notification",
    "transactionCurrency":"NGN",
    "accountName":"MERCHANT(Victor Spicey)",
    "bankCode":"000000",
    "accountId":"victor@mypasspoint.com",
    "channel":"3"
}'`;
    };

    const getExampleResponseCode = () => {
        return `{
  "responseCode": "00",
  "responseDescription": "Successful",
  "responseMessage": "Transfer successful to MERCHANT(Josh Merchant)",
  "data": {
    "status": "NEW",
    "transactionId": "65eef400-fa65-46da-b5f9-e68c6d8d9b85"
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
                    Passpoint Wallet Transfer
                </h1>
                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl">
                    Transfer funds from your wallet to another Passpoint wallet. Supports channels: 1-MOBILE_ANDROID, 2-MOBILE_IOS, 3-WEB, 4-THIRDPARTY, 5-USSD.
                </p>
            </section>

            {/* How Passpoint Wallet Transfer Works */}
            <section>
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <Wallet className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">How Passpoint Wallet Transfer Works</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-6 max-w-2xl">
                    This endpoint moves funds from your merchant wallet directly into another Passpoint user's wallet. Unlike bank transfers, wallet-to-wallet transfers on Passpoint settle <strong className="text-foreground">near-instantly</strong>  but the async response pattern still applies. Always confirm via webhook before treating the transfer as complete.
                </p>

                <div className="space-y-4">
                    <div className="grid sm:grid-cols-3 gap-4">
                        {[
                            {
                                icon: <Wallet className="h-4 w-4 text-brand" />,
                                title: "bankCode: 000000",
                                desc: "Always use bankCode \"000000\" for wallet transfers. This is Passpoint's internal code that routes the payment within the Passpoint network instead of to an external bank.",
                            },
                            {
                                icon: <Send className="h-4 w-4 text-brand" />,
                                title: "accountId = email address",
                                desc: "The accountId field must be the recipient's registered Passpoint email address  the same walletId used in the preceding Passpoint Enquiry call. Never use an account number here.",
                            },
                            {
                                icon: <Info className="h-4 w-4 text-brand" />,
                                title: "Enquiry is mandatory first",
                                desc: "Always call Passpoint Enquiry before this endpoint. Confirm the returned accountName with your user before initiating  this is the key safeguard against misdirected transfers.",
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
                            <h4 className="text-sm font-semibold text-foreground">Channel reference</h4>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-border">
                                        <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Value</th>
                                        <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Channel</th>
                                        <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Use when</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    {[
                                        { value: "1", channel: "MOBILE_ANDROID", use: "Initiated from an Android mobile app" },
                                        { value: "2", channel: "MOBILE_IOS", use: "Initiated from an iOS mobile app" },
                                        { value: "3", channel: "WEB / API", use: "Initiated from a web app or backend API  use this for server-to-server integrations" },
                                        { value: "4", channel: "THIRDPARTY", use: "Initiated via a third-party platform integration" },
                                        { value: "5", channel: "USSD", use: "Initiated via USSD session" },
                                    ].map(({ value, channel, use }) => (
                                        <tr key={value} className="hover:bg-muted/20 transition-colors">
                                            <td className="px-5 py-3.5"><span className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">{value}</span></td>
                                            <td className="px-5 py-3.5 text-muted-foreground text-xs font-medium">{channel}</td>
                                            <td className="px-5 py-3.5 text-muted-foreground text-xs">{use}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="bg-muted/40 dark:bg-background/40 border border-border rounded-xl p-4 flex items-start gap-3">
                        <Info className="h-4 w-4 text-brand shrink-0 mt-0.5" />
                        <div>
                            <p className="text-xs font-semibold text-foreground mb-1">Idempotency & webhook confirmation</p>
                            <p className="text-xs text-muted-foreground">
                                Use a unique <code className="font-mono bg-muted px-1 py-0.5 rounded">clientReference</code> for every transfer  duplicate references are rejected to prevent double-transfers. Even though wallet transfers are near-instant, <code className="font-mono bg-muted px-1 py-0.5 rounded">status: "NEW"</code> in the response is not a final confirmation. Always verify the outcome via webhook callback.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Response Field Explanation */}
            <section>
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <TableProperties className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Response Fields</h2>
                </div>

                <div className="bg-white dark:bg-card border border-border rounded-2xl overflow-hidden">
                    <div className="px-5 py-3 border-b border-border bg-muted/30">
                        <h4 className="text-sm font-semibold text-foreground">Key response fields explained</h4>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                            <tr className="border-b border-border">
                                <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Field</th>
                                <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Description</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                            {WALLET_TRANSFER_RESPONSE_FIELDS.map(({ field, description }) => (
                                <tr key={field} className="hover:bg-muted/20 transition-colors">
                                    <td className="px-5 py-3.5 font-mono text-xs text-foreground whitespace-nowrap">{field}</td>
                                    <td className="px-5 py-3.5 text-xs text-muted-foreground">{description}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* API Endpoint */}
            <section>
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <Send className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Wallet transfer</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
                    Initiate a wallet-to-wallet transfer to a verified Passpoint beneficiary.
                </p>

                <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2 px-4 py-3 bg-muted/30 dark:bg-card/50 border border-border rounded-2xl">
                        <span className="px-2 py-0.5 rounded text-xs font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400">POST</span>
                        <code className="text-xs text-muted-foreground break-all">
                            https://{"{{baseUrl}}"}/{"{{paymentContext}}"}/ft-app/account-transfer
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

export default PayoutBankLocalPasspointWalletTransfer;
