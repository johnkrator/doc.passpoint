import {Send, Info, ArrowRightLeft, TableProperties} from "lucide-react";
import CodeBlock from "@/components/CodeBlock.tsx";

const TRANSFER_RESPONSE_FIELDS: { field: string; description: string }[] = [
    {
        field: 'status: "NEW"',
        description:
            "Queued for processing. Not yet completed. Monitor the final outcome via webhook (fund transfer callback) or the Transfer Status endpoint.",
    },
    {
        field: "transactionId",
        description:
            "Passpoint's unique transaction identifier. Store this for reconciliation and status polling.",
    },
    {
        field: "amount",
        description: "The amount submitted for the transfer.",
    },
    {
        field: "charges",
        description: "Service fee charged for this transfer.",
    },
];

const PayoutBankLocalAccountTransferNgn = () => {
    const getEndpointCode = () => {
        return `POST https://{{baseUrl}}/{{paymentContext}}/ft-app/dart-account-transfer`;
    };

    const getRequestBodyCode = () => {
        return `{
    "clientReference": "string",
    "amount": "number",
    "narration": "string",
    "transactionCurrency": "string",
    "beneficiaryBankCode": "number",
    "beneficiaryAccountName": "string",
    "beneficiaryAccountNumber": "number"
}`;
    };

    const getCurlExampleCode = () => {
        return `curl --location 'https://{{baseUrl}}/{{paymentContext}}/ft-app/dart-account-transfer'
--header 'x-channel-id: CHANNEL_ID'
--header 'x-channel-code: CHANNEL_CODE'
--header 'x-merchant-id: YOUR_MERCHANT_ID'
--data '{
    "clientReference":"8661baa4-8048-4a1d-b91d-96ca4a0bcf5c",
    "amount":"4500",
    "narration":"Test Transfer",
    "transactionCurrency":"NGN",
    "beneficiaryAccountName":"MFY / ByteLabs Technologies Limited",
    "beneficiaryBankCode":"035",
    "beneficiaryAccountNumber":"7433170834"
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
    "amount": 1000
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
                    Account Transfer  NGN
                </h1>
                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl">
                    Process account transfers in Nigerian Naira (NGN) to local bank accounts.
                </p>
            </section>

            {/* How NGN Bank Transfer Works */}
            <section>
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <ArrowRightLeft className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">How NGN Bank Transfer Works</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-6 max-w-2xl">
                    This endpoint initiates an outbound NGN transfer to any Nigerian bank account. The transfer is <strong className="text-foreground">fully asynchronous</strong>  submission and completion are separate events. A successful response means the transfer is queued, not settled. Final status arrives via webhook.
                </p>

                <div className="space-y-4">
                    <div className="grid sm:grid-cols-3 gap-4">
                        {[
                            {
                                icon: <ArrowRightLeft className="h-4 w-4 text-brand" />,
                                title: "Enquiry first, always",
                                desc: "Account Enquiry is a mandatory pre-step. Call it, display the returned accountName for the user to confirm, then proceed. Never skip this check.",
                            },
                            {
                                icon: <Send className="h-4 w-4 text-brand" />,
                                title: "Fully asynchronous",
                                desc: "responseCode: \"00\" confirms the transfer was accepted and queued  not completed. The initial status is always \"NEW\". Monitor the final outcome via webhook.",
                            },
                            {
                                icon: <Info className="h-4 w-4 text-brand" />,
                                title: "clientReference is your key",
                                desc: "Use a unique clientReference per transfer as an idempotency key. Duplicate references are rejected. Never reuse a reference unless the original is confirmed failed.",
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
                            <h4 className="text-sm font-semibold text-foreground">Transfer status lifecycle</h4>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-border">
                                        <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                                        <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Meaning</th>
                                        <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    {[
                                        { status: "NEW", meaning: "Accepted and queued for processing", action: "Wait  do not retry", color: "bg-muted text-foreground" },
                                        { status: "PENDING", meaning: "Being validated and prepared", action: "Wait  monitor webhook", color: "bg-muted text-foreground" },
                                        { status: "PROCESSING", meaning: "Submitted to destination bank", action: "Wait  settlement imminent", color: "bg-muted text-foreground" },
                                        { status: "SUCCESSFUL", meaning: "Settled at recipient's bank", action: "Update records, notify user", color: "bg-green-50 text-green-700 dark:bg-green-950/30 dark:text-green-400" },
                                        { status: "FAILED", meaning: "Could not be completed", action: "Check reason, retry if appropriate", color: "bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-400" },
                                    ].map(({ status, meaning, action, color }) => (
                                        <tr key={status} className="hover:bg-muted/20 transition-colors">
                                            <td className="px-5 py-3.5"><span className={`font-mono text-xs px-1.5 py-0.5 rounded ${color}`}>{status}</span></td>
                                            <td className="px-5 py-3.5 text-muted-foreground text-xs">{meaning}</td>
                                            <td className="px-5 py-3.5 text-muted-foreground text-xs font-medium">{action}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="bg-muted/40 dark:bg-background/40 border border-border rounded-xl p-4 flex items-start gap-3">
                        <Info className="h-4 w-4 text-brand shrink-0 mt-0.5" />
                        <div>
                            <p className="text-xs font-semibold text-foreground mb-1">Webhook is the source of truth</p>
                            <p className="text-xs text-muted-foreground">
                                Never rely solely on the API response to determine transfer success. Configure a webhook (Fund Transfer Callback) to receive the authoritative final status. Do not update your user's balance or records until a <code className="font-mono bg-muted px-1 py-0.5 rounded">SUCCESSFUL</code> webhook is received.
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
                            {TRANSFER_RESPONSE_FIELDS.map(({ field, description }) => (
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
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Account transfer</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
                    Initiate a NGN bank transfer to a verified beneficiary account.
                </p>

                <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2 px-4 py-3 bg-muted/30 dark:bg-card/50 border border-border rounded-2xl">
                        <span className="px-2 py-0.5 rounded text-xs font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400">POST</span>
                        <code className="text-xs text-muted-foreground break-all">
                            https://{"{{baseUrl}}"}/{"{{paymentContext}}"}/ft-app/dart-account-transfer
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

export default PayoutBankLocalAccountTransferNgn;
