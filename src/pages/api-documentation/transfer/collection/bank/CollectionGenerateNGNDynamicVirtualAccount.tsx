import {Wallet, Info, AlertTriangle, RotateCcw} from "lucide-react";
import CodeBlock from "@/components/CodeBlock.tsx";

const CollectionGenerateNgnDynamicVirtualAccount = () => {
    const getEndpoint = () => `POST https://{{baseUrl}}/{{paymentContext}}/ft-app/generate-virtual-account?type=dynamic`;

    const getRequestBody = () => `{
    "narration": "payment for services 12",
    "accountName": "Johnny Jones",
    "email": "client@gmail.com",
    "phoneNumber": "08030000000",
    "amount": "1000"
}`;

    const getCurlRequest = () => `curl --location 'https://{{baseUrl}}/{{paymentContext}}/ft-app/generate-virtual-account?type=dynamic'
--header 'x-channel-id: CHANNEL_ID'
--header 'x-channel-code: CHANNEL_CODE'
--header 'x-merchant-id: YOUR_MERCHANT_ID'
--data-raw '{
    "narration": "payment for services 12",
    "accountName": "Johnny Jones",
    "email": "client@gmail.com",
    "phoneNumber": "08030000000",
    "amount": "1000"
}'`;

    const getResponse = () => `{
  "responseCode": "00",
  "responseDescription": "Successful",
  "responseMessage": "virtual account has been created successfully",
  "data": {
    "accountName": "John Benson",
    "accountNumber": "0185487837",
    "bankName": "9 Payment Service Bank",
    "bankCode": "120001",
    "transactionReference": "string",
    "dynamic": true,
    "active": false
  }
}`;

    return (
        <div className="py-8 sm:py-10 space-y-16">

            {/* Hero */}
            <section>
                <div className="inline-flex items-center gap-2 bg-brand-50 dark:bg-brand-950/40 text-brand text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
                    <Wallet className="h-3.5 w-3.5" />
                    API Reference
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
                    Generate NGN Dynamic Virtual Account
                </h1>
                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl">
                    Generate a temporary NGN virtual account for one-time payment collection. Dynamic accounts are
                    created for specific amounts and expire after payment or timeout.
                </p>
            </section>

            {/* How NGN Dynamic Virtual Accounts Work */}
            <section>
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <RotateCcw className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">How NGN Dynamic Virtual Accounts Work</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-6 max-w-2xl">
                    A dynamic virtual account is a <strong className="text-foreground">one-time bank account number</strong> generated for a single specific payment. It is tied to a specific <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">transactionReference</code> and a specific <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">amount</code>. Once the expected payment is received — or the timeout expires — the account automatically deactivates.
                </p>

                <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-5">

                    {/* Key behaviours */}
                    <div>
                        <h3 className="text-base font-semibold text-foreground mb-3">Key behaviours</h3>
                        <div className="space-y-2">
                            {[
                                { title: "active: false on creation is expected", desc: "The account isn't active immediately after generation. It activates only after the expected payment is received or the timeout period begins." },
                                { title: "Auto-deactivates after payment or timeout", desc: "After the payment is received — or the timeout expires — the account automatically deactivates and cannot receive further payments." },
                                { title: "Linked to a specific order", desc: "The transactionReference ties this account to a specific order or invoice in your system. It appears in the Wallet Credit Callback when payment arrives." },
                                { title: "Never reuse dynamic accounts", desc: "Generate a fresh dynamic account for every new transaction. Reusing accounts leads to payment attribution errors." },
                            ].map(({ title, desc }) => (
                                <div key={title} className="flex items-start gap-3 px-4 py-3 bg-muted/30 dark:bg-background/30 border border-border rounded-xl">
                                    <Info className="h-4 w-4 text-brand shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-xs font-semibold text-foreground">{title}</p>
                                        <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Response field explanations */}
                    <div>
                        <h3 className="text-base font-semibold text-foreground mb-3">Response field reference</h3>
                        <div className="overflow-x-auto border border-border rounded-xl">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-border bg-muted/30">
                                        <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Field</th>
                                        <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Description</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    <tr className="hover:bg-muted/20 transition-colors">
                                        <td className="px-5 py-3.5 font-mono text-xs text-foreground">active</td>
                                        <td className="px-5 py-3.5 text-xs text-muted-foreground"><strong className="text-foreground">Normal to be <code className="bg-muted px-1 py-0.5 rounded">false</code> on creation.</strong> The account activates when the customer initiates their bank transfer to the account number.</td>
                                    </tr>
                                    <tr className="hover:bg-muted/20 transition-colors">
                                        <td className="px-5 py-3.5 font-mono text-xs text-foreground">transactionReference</td>
                                        <td className="px-5 py-3.5 text-xs text-muted-foreground">The order or payment reference this account was generated for. This value will be included in the Wallet Credit Callback webhook when payment arrives, letting you match the payment to the order.</td>
                                    </tr>
                                    <tr className="hover:bg-muted/20 transition-colors">
                                        <td className="px-5 py-3.5 font-mono text-xs text-foreground">dynamic</td>
                                        <td className="px-5 py-3.5 text-xs text-muted-foreground">Always <code className="bg-muted px-1 py-0.5 rounded">true</code> for accounts generated via this endpoint, confirming this is a one-time account.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Ideal use cases */}
                    <div>
                        <h3 className="text-base font-semibold text-foreground mb-3">Ideal use cases</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {[
                                { label: "E-commerce checkout", desc: "Generate one account per order so each payment maps precisely to a cart." },
                                { label: "Invoice payments", desc: "Tie each invoice to its own account for clean reconciliation." },
                                { label: "One-time top-ups", desc: "Allow customers to fund a specific amount in a single transaction." },
                            ].map(({ label, desc }) => (
                                <div key={label} className="px-4 py-3 bg-muted/30 dark:bg-background/30 border border-border rounded-xl">
                                    <p className="text-xs font-semibold text-foreground">{label}</p>
                                    <p className="text-xs text-muted-foreground mt-1">{desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-muted/40 dark:bg-background/40 border border-border rounded-xl p-4 flex items-start gap-3">
                        <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                        <p className="text-xs text-muted-foreground">
                            <strong className="text-foreground">Do not reuse dynamic accounts.</strong> Generate a new dynamic account for each transaction. Reusing an expired or already-paid account will result in unreconcilable payments.
                        </p>
                    </div>
                </div>
            </section>

            {/* API Endpoint */}
            <section>
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <Wallet className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Generate dynamic virtual account</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
                    Create a temporary virtual account for a specific payment amount.
                </p>

                <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2 px-4 py-3 bg-muted/30 dark:bg-card/50 border border-border rounded-2xl">
                        <span className="px-2 py-0.5 rounded text-xs font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400">POST</span>
                        <code className="text-xs text-muted-foreground break-all">
                            https://{"{{baseUrl}}"}/{"{{paymentContext}}"}/ft-app/generate-virtual-account?type=dynamic
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
                            <CodeBlock>{getEndpoint()}</CodeBlock>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">Request body</h4>
                            <CodeBlock language="json">{getRequestBody()}</CodeBlock>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">cURL example</h4>
                            <CodeBlock language="bash">{getCurlRequest()}</CodeBlock>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">Response</h4>
                            <CodeBlock language="json">{getResponse()}</CodeBlock>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CollectionGenerateNgnDynamicVirtualAccount;
