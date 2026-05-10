import {Send, Info, Webhook, ShieldCheck, ArrowRight, CheckCircle} from "lucide-react";
import CodeBlock from "@/components/CodeBlock.tsx";

const PayoutMomoTransfer = () => {
    const getEndpointCode = () => {
        return `POST https://{{baseUrl}}/{{paymentContext}}/momo-app/transfer`;
    };

    const getExampleRequestCode = () => {
        return `{
    "amount": "50",
    "narration": "test KES transfer",
    "serviceCode": "airtel",
    "transactionCurrency": "KES",
    "accountName": "Momo Customer",
    "bankCode": "000000",
    "channel": "3",
    "msisdn": "254726679188",
    "clientReference": "12237546",
    "countryCode" : "KE"
}`;
    };

    const getCurlExampleCode = () => {
        return `curl --location 'https://{{baseUrl}}/{{paymentContext}}/momo-app/transfer'
--data '{
    "amount": "50",
    "narration": "test KES transfer",
    "serviceCode": "airtel",
    "transactionCurrency": "KES",
    "accountName": "Momo Customer",
    "bankCode": "000000",
    "channel": "3",
    "msisdn": "254726679188",
    "clientReference": "12237546",
    "countryCode" : "KE"
}'`;
    };

    const getExampleResponseCode = () => {
        return `{
  "responseCode": "00",
  "responseDescription": "string",
  "responseMessage": "strng",
  "data": {
    "status": "string",
    "transactionId": "string"
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
                    Momo Transfer
                </h1>
                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl">
                    Initiates a payout request to a momo wallet account holder.
                </p>
            </section>

            {/* How MoMo Transfer Works */}
            <section>
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <Send className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">How MoMo Transfer Works</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-6 max-w-2xl">
                    This endpoint initiates an outbound mobile money payment, dispatching funds directly to the recipient's mobile money wallet. Calling it successfully submits the transfer  it does not guarantee immediate completion.
                </p>

                <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-4 mb-4">
                    <div className="flex items-center gap-2 mb-1">
                        <Webhook className="h-4 w-4 text-brand shrink-0" />
                        <h3 className="text-sm font-semibold text-foreground">Asynchronous by design</h3>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                        A <code className="font-mono bg-muted px-1 py-0.5 rounded">responseCode: "00"</code> only confirms the transfer was <strong className="text-foreground">submitted successfully</strong>  not that it has completed. The transaction begins in <code className="font-mono bg-muted px-1 py-0.5 rounded">NEW</code> status and progresses asynchronously.
                    </p>
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                        {["NEW", "PENDING", "PROCESSING", "SUCCESSFUL / FAILED"].map((status, index, arr) => (
                            <div key={status} className="flex items-center gap-2">
                                <span className="font-mono text-xs font-semibold text-brand bg-brand-50 dark:bg-brand-950/40 px-2 py-1 rounded">{status}</span>
                                {index < arr.length - 1 && <ArrowRight className="h-3 w-3 text-muted-foreground" />}
                            </div>
                        ))}
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                        Final status is delivered via webhook callback. Subscribe to fund transfer callbacks in your integration to receive completion notifications without polling.
                    </p>
                </div>

                <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-3 mb-4">
                    <div className="flex items-center gap-2 mb-1">
                        <ShieldCheck className="h-4 w-4 text-brand shrink-0" />
                        <h3 className="text-sm font-semibold text-foreground">Required prerequisites and field notes</h3>
                    </div>
                    <ul className="space-y-2.5">
                        {[
                            {label: "serviceCode", note: "Must come from the Get MoMo Network endpoint response for the target currency. Do not hardcode this value."},
                            {label: "clientReference", note: "Must be unique per transaction. This is your system's idempotency key  duplicate references may cause request rejection."},
                            {label: "msisdn", note: "Always validate the recipient's phone number with the Validate MSISDN endpoint before calling this."},
                            {label: "channel", note: "Identifies your integration type. Use the channel value assigned to your merchant account."},
                        ].map(({label, note}) => (
                            <li key={label} className="flex items-start gap-2.5">
                                <CheckCircle className="h-3.5 w-3.5 text-brand shrink-0 mt-0.5" />
                                <span className="text-xs text-muted-foreground leading-relaxed">
                                    <code className="font-mono bg-muted px-1 py-0.5 rounded text-foreground">{label}</code>  {note}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="bg-muted/40 dark:bg-background/40 border border-border rounded-xl p-4 flex items-start gap-3">
                    <Info className="h-4 w-4 text-brand shrink-0 mt-0.5" />
                    <p className="text-xs text-muted-foreground">
                        <strong className="text-foreground">Recommended flow:</strong> Get Currency → Get Network → Validate MSISDN → Initiate Transfer → Listen for webhook. Do not call this endpoint without completing the preceding validation steps.
                    </p>
                </div>
            </section>

            {/* Transfer */}
            <section>
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <Send className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Transfer</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
                    Send funds to a mobile money wallet in a supported corridor.
                </p>

                <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2 px-4 py-3 bg-muted/30 dark:bg-card/50 border border-border rounded-2xl">
                        <span className="px-2 py-0.5 rounded text-xs font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400">POST</span>
                        <code className="text-xs text-muted-foreground break-all">
                            https://{"{{baseUrl}}"}/{"{{paymentContext}}"}/momo-app/transfer
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
                            <CodeBlock language="json">{getExampleRequestCode()}</CodeBlock>
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

                    <div className="bg-white dark:bg-card border border-border rounded-2xl overflow-hidden">
                        <div className="px-5 py-3 border-b border-border bg-muted/30">
                            <h4 className="text-sm font-semibold text-foreground">Response field reference</h4>
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
                                <tr className="hover:bg-muted/20 transition-colors">
                                    <td className="px-5 py-3.5 font-mono text-xs text-foreground whitespace-nowrap">status: "NEW"</td>
                                    <td className="px-5 py-3.5 text-xs text-muted-foreground">Transaction submitted. Poll the Transfer Status endpoint or wait for a webhook callback to receive the final status.</td>
                                </tr>
                                <tr className="hover:bg-muted/20 transition-colors">
                                    <td className="px-5 py-3.5 font-mono text-xs text-foreground whitespace-nowrap">transactionId</td>
                                    <td className="px-5 py-3.5 text-xs text-muted-foreground">Passpoint's unique identifier for this transaction. Store this immediately  it is required for status checks and reconciliation.</td>
                                </tr>
                                <tr className="hover:bg-muted/20 transition-colors">
                                    <td className="px-5 py-3.5 font-mono text-xs text-foreground whitespace-nowrap">amount</td>
                                    <td className="px-5 py-3.5 text-xs text-muted-foreground">The amount submitted for transfer, as passed in the request body.</td>
                                </tr>
                                <tr className="hover:bg-muted/20 transition-colors">
                                    <td className="px-5 py-3.5 font-mono text-xs text-foreground whitespace-nowrap">charges</td>
                                    <td className="px-5 py-3.5 text-xs text-muted-foreground">The fees deducted for this transaction. Review this to understand the total cost of the payout.</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default PayoutMomoTransfer;
