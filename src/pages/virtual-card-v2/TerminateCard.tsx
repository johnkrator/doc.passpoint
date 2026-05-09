import { Settings, AlertTriangle, Info, XCircle } from "lucide-react";
import CodeBlock from "@/components/CodeBlock.tsx";

const TerminateCard = () => {
    const endpointCode = () => `POST https://{{baseUrl}}/{{cardContext}}/terminate`;
    const requestBodyCode = () => `{
    "cardId": "string",
    "orderId": "string",
    "reason": "string",
    "callbackUrl": "string"
}`;
    const curlCode = () => `curl --location 'https://{{baseUrl}}/{{cardContext}}/terminate'
--header 'Content-Type: application/json'
--data '{
    "cardId": "string",
    "orderId": "string",
    "reason": "string",
    "callbackUrl": "string"
}'`;
    const responseCode = () => `{
  "responseCode": "00",
  "responseDescription": "string",
  "responseMessage": "string"
}`;

    return (
        <div className="py-8 sm:py-10 space-y-16">

            {/* Hero */}
            <section>
                <div className="inline-flex items-center gap-2 bg-brand-50 dark:bg-brand-950/40 text-brand text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
                    <Settings className="h-3.5 w-3.5" />
                    API Reference
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
                    Terminate Card
                </h1>
                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl">
                    Permanently terminate a virtual card. Once terminated, no further actions can be performed on the card.
                </p>
            </section>

            {/* How Card Termination Works */}
            <section>
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <XCircle className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">How Card Termination Works</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-6 max-w-2xl">
                    Termination permanently and irreversibly closes a virtual card. All future transaction attempts on the card number are declined immediately. Use this endpoint only when you are certain the card will never be used again.
                </p>

                <div className="bg-muted/40 dark:bg-background/40 border border-amber-200 dark:border-amber-800/30 rounded-xl p-4 flex items-start gap-3 mb-6">
                    <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                    <p className="text-xs text-muted-foreground">
                        <strong className="text-foreground">Termination is irreversible.</strong> Unlike Freeze Card, a terminated card cannot be reactivated. Once terminated, the card number is permanently invalid. If you need a temporary block, use <strong className="text-foreground">Freeze Card</strong> instead.
                    </p>
                </div>

                <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-4 mb-4">
                    <div className="space-y-4">
                        {[
                            {
                                title: "Remaining balance is automatically returned",
                                body: "Any unspent balance on the card is automatically credited back to your Passpoint merchant wallet upon successful termination. You do not need to manually withdraw the balance first.",
                            },
                            {
                                title: "reason field documents the closure",
                                body: "The reason field is required and creates an audit record for the termination. Provide a clear, descriptive reason (e.g., \"Employee offboarding - John Smith\", \"Campaign ended\", \"Card compromised\"). This is for compliance and audit trail purposes.",
                            },
                            {
                                title: "orderId is your idempotency key",
                                body: "Use a unique UUID or string as the orderId. This prevents duplicate termination requests from being processed more than once.",
                            },
                        ].map(({ title, body }) => (
                            <div key={title} className="flex items-start gap-3">
                                <Info className="h-4 w-4 text-brand shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-sm font-semibold text-foreground mb-0.5">{title}</p>
                                    <p className="text-xs text-muted-foreground leading-relaxed">{body}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white dark:bg-card border border-border rounded-2xl overflow-hidden">
                    <div className="px-5 py-3 border-b border-border bg-muted/30">
                        <h4 className="text-sm font-semibold text-foreground">Valid termination scenarios</h4>
                    </div>
                    <div className="p-5 grid gap-2 sm:grid-cols-2">
                        {[
                            "Employee has left the organization",
                            "Card number confirmed compromised",
                            "Campaign or program has ended",
                            "Customer account permanently closed",
                            "Card expired and not being renewed",
                            "Regulatory or compliance closure",
                        ].map((item) => (
                            <div key={item} className="flex items-center gap-2 text-xs text-muted-foreground">
                                <span className="text-brand text-xs">▸</span>
                                {item}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* API Endpoint */}
            <section>
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <Settings className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Terminate card</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
                    Provide the card ID, a unique order ID, and a reason to permanently close the card.
                </p>

                <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2 px-4 py-3 bg-muted/30 dark:bg-card/50 border border-border rounded-2xl">
                        <span className="px-2 py-0.5 rounded text-xs font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400">POST</span>
                        <code className="text-xs text-muted-foreground break-all">
                            https://{"{{baseUrl}}"}/{"{{cardContext}}"}/terminate
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
                                    <td className="px-5 py-3.5 text-muted-foreground">CHANNEL_ID</td>
                                </tr>
                                <tr className="hover:bg-muted/20 transition-colors">
                                    <td className="px-5 py-3.5 font-mono text-xs text-foreground">x-channel-code</td>
                                    <td className="px-5 py-3.5 text-muted-foreground">CHANNEL_CODE</td>
                                </tr>
                                <tr className="hover:bg-muted/20 transition-colors">
                                    <td className="px-5 py-3.5 font-mono text-xs text-foreground">x-merchant-id</td>
                                    <td className="px-5 py-3.5 text-muted-foreground">YOUR_MERCHANT_ID</td>
                                </tr>
                                <tr className="hover:bg-muted/20 transition-colors">
                                    <td className="px-5 py-3.5 font-mono text-xs text-foreground">Authorization</td>
                                    <td className="px-5 py-3.5 text-muted-foreground">Bearer [your-access-token]</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-5">
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">Endpoint</h4>
                            <CodeBlock>{endpointCode()}</CodeBlock>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">Request body</h4>
                            <CodeBlock language="json">{requestBodyCode()}</CodeBlock>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">cURL example</h4>
                            <CodeBlock language="bash">{curlCode()}</CodeBlock>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">Response</h4>
                            <CodeBlock language="json">{responseCode()}</CodeBlock>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default TerminateCard;
