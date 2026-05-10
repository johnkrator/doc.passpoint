import { DollarSign, Info, CheckCircle } from "lucide-react";
import CodeBlock from "@/components/CodeBlock.tsx";

const FundCard = () => {
    const endpointCode = () => `POST https://{{baseUrl}}/{{cardContext}}/fund`;
    const requestBodyCode = () => `{
    "cardId": "c222d8a1-6aea-4938-b948-5ed8263daa40",
    "amount": "175",
    "orderId": "4c90addb-376a-45a6-9519-7426a50f4cb7",
    "callbackUrl": "string"
}`;
    const curlCode = () => `curl --location 'https://{{baseUrl}}/{{cardContext}}/fund'
--data '{
    "cardId": "9d84b6a4-12f4-4cad-b2fe-d39b4f910717",
    "amount": "10",
    "orderId": "fff8640c-c24f-4e3b-8781-61f5fc2d0691",
    "callbackUrl":"string"
}'`;
    const responseCode = () => `{
  "responseCode": "00",
  "responseDescription": "Successful",
  "responseMessage": "string",
  "reference": "string"
}`;

    return (
        <div className="py-8 sm:py-10 space-y-16">

            {/* Hero */}
            <section>
                <div className="inline-flex items-center gap-2 bg-brand-50 dark:bg-brand-950/40 text-brand text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
                    <DollarSign className="h-3.5 w-3.5" />
                    API Reference
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
                    Fund Card
                </h1>
                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl">
                    Add funds to a customer's virtual card balance.
                </p>
            </section>

            {/* How Card Funding Works */}
            <section>
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <DollarSign className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">How Card Funding Works</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-6 max-w-2xl">
                    Funding a card moves USD balance from your Passpoint merchant wallet to a specific virtual card. The card balance updates immediately, making funds available for purchases right away.
                </p>

                <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-4 mb-4">
                    <div className="space-y-4">
                        {[
                            {
                                title: "Funds are debited from your merchant wallet",
                                body: "The amount you specify is deducted from your Passpoint USD wallet balance and credited to the card's spending balance. Ensure your wallet has sufficient funds before calling this endpoint.",
                            },
                            {
                                title: "Card must be ACTIVE to receive funding",
                                body: "Only cards in ACTIVE status can be funded. TERMINATED cards cannot receive funds. FROZEN cards can receive funds (the balance will be available after unfreezing).",
                            },
                            {
                                title: "orderId is your idempotency key",
                                body: "The orderId field is your unique reference for this funding operation. Use a UUID or other unique identifier. Duplicate orderIds are rejected  this prevents accidental double-funding.",
                            },
                            {
                                title: "callbackUrl receives the funding confirmation",
                                body: "Provide a publicly accessible HTTPS URL to receive a webhook notification when the funding operation completes. If omitted, no callback is sent  you rely solely on the synchronous response.",
                            },
                        ].map(({ title, body }) => (
                            <div key={title} className="flex items-start gap-3">
                                <CheckCircle className="h-4 w-4 text-brand shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-sm font-semibold text-foreground mb-0.5">{title}</p>
                                    <p className="text-xs text-muted-foreground leading-relaxed">{body}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white dark:bg-card border border-border rounded-2xl overflow-hidden mb-4">
                    <div className="px-5 py-3 border-b border-border bg-muted/30">
                        <h4 className="text-sm font-semibold text-foreground">Common funding use cases</h4>
                    </div>
                    <div className="p-5 grid gap-2 sm:grid-cols-2">
                        {[
                            "Topping up an employee expense card",
                            "Loading a specific project budget",
                            "Refilling a depleted gift card",
                            "Loading a prepaid travel allowance",
                            "Adding funds to a rewards card",
                            "Funding a contractor's spending card",
                        ].map((item) => (
                            <div key={item} className="flex items-center gap-2 text-xs text-muted-foreground">
                                <span className="text-brand text-xs">▸</span>
                                {item}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-muted/40 dark:bg-background/40 border border-border rounded-xl p-4 flex items-start gap-3">
                    <Info className="h-4 w-4 text-brand shrink-0 mt-0.5" />
                    <p className="text-xs text-muted-foreground">
                        To issue a card and fund it in a single step, use the <strong className="text-foreground">Issue and Fund Card</strong> endpoint. This endpoint is for funding cards that already exist.
                    </p>
                </div>
            </section>

            {/* API Endpoint */}
            <section>
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <DollarSign className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Fund card</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
                    Deposit a specified amount to a virtual card using the card ID and a unique order reference.
                </p>

                <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2 px-4 py-3 bg-muted/30 dark:bg-card/50 border border-border rounded-2xl">
                        <span className="px-2 py-0.5 rounded text-xs font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400">POST</span>
                        <code className="text-xs text-muted-foreground break-all">
                            https://{"{{baseUrl}}"}/{"{{cardContext}}"}/fund
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

export default FundCard;
