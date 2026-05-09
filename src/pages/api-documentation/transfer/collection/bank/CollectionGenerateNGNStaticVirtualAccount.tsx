import {CreditCard, Info, Infinity, CheckCircle2} from "lucide-react";
import CodeBlock from "@/components/CodeBlock.tsx";

const CollectionGenerateNgnStaticVirtualAccount = () => {
    const getEndpoint = () => `POST https://{{baseUrl}}/{{paymentContext}}/ft-app/generate-virtual-account?type=static`;

    const getRequestBody = () => `{
    "accountName": "Chinedu Ojiteli",
    "email": "chinedu37dz@yahoo.com",
    "phoneNumber": "08116070111",
    "bvn": "22222222224"
}`;

    const getCurlRequest = () => `curl --location 'https://{{baseUrl}}/{{paymentContext}}/ft-app/generate-virtual-account?type=static'
--header 'x-channel-id: CHANNEL_ID'
--header 'x-channel-code: CHANNEL_CODE'
--header 'x-merchant-id: YOUR_MERCHANT_ID'
--data-raw '{
    "accountName": "Chinedu Ojiteli",
    "email": "chinedu37dz@yahoo.com",
    "phoneNumber": "08116070111",
    "bvn": "22222222224"
}'`;

    return (
        <div className="py-8 sm:py-10 space-y-16">

            {/* Hero */}
            <section>
                <div className="inline-flex items-center gap-2 bg-brand-50 dark:bg-brand-950/40 text-brand text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
                    <CreditCard className="h-3.5 w-3.5" />
                    API Reference
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
                    Generate NGN Static Virtual Account
                </h1>
                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl">
                    Generate a permanent NGN virtual account for collecting payments. Static accounts remain active
                    indefinitely and can receive multiple payments.
                </p>
            </section>

            {/* How NGN Static Virtual Accounts Work */}
            <section>
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <Infinity className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">How NGN Static Virtual Accounts Work</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-6 max-w-2xl">
                    A static virtual account is a <strong className="text-foreground">permanent bank account number</strong> assigned exclusively to a specific customer. Unlike dynamic accounts, static accounts can receive unlimited payments over their lifetime and never expire.
                </p>

                <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-5">

                    {/* Key characteristics */}
                    <div>
                        <h3 className="text-base font-semibold text-foreground mb-3">Key characteristics</h3>
                        <div className="space-y-2">
                            {[
                                { title: "Permanent", desc: "Once generated, the account number is permanent. You never need to regenerate it per payment." },
                                { title: "Exclusive", desc: "Each account number is uniquely tied to one customer — payments always route to the correct customer record." },
                                { title: "Unlimited payments", desc: "The same account can receive as many payments as needed over its lifetime, with no expiry." },
                                { title: "Webhook-driven", desc: "Every payment to this account triggers the Wallet Credit Callback webhook with full transaction details." },
                            ].map(({ title, desc }) => (
                                <div key={title} className="flex items-start gap-3 px-4 py-3 bg-muted/30 dark:bg-background/30 border border-border rounded-xl">
                                    <CheckCircle2 className="h-4 w-4 text-brand shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-xs font-semibold text-foreground">{title}</p>
                                        <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* BVN note */}
                    <div className="bg-muted/40 dark:bg-background/40 border border-border rounded-xl p-4 flex items-start gap-3">
                        <Info className="h-4 w-4 text-brand shrink-0 mt-0.5" />
                        <p className="text-xs text-muted-foreground">
                            <strong className="text-foreground">BVN (Bank Verification Number)</strong> is Nigeria's biometric bank identity number. It is required by Nigerian banking regulations for KYC compliance and links the virtual account to a verified individual. Always collect and validate a customer's BVN before generating their static account.
                        </p>
                    </div>

                    {/* Ideal use cases */}
                    <div>
                        <h3 className="text-base font-semibold text-foreground mb-3">Ideal use cases</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {[
                                { label: "Subscription billing", desc: "Customers reuse the same account each billing cycle." },
                                { label: "Loyalty programs", desc: "Permanent reference for recurring customer top-ups." },
                                { label: "Regular payroll collection", desc: "Employers or institutions collecting regular inflows." },
                            ].map(({ label, desc }) => (
                                <div key={label} className="px-4 py-3 bg-muted/30 dark:bg-background/30 border border-border rounded-xl">
                                    <p className="text-xs font-semibold text-foreground">{label}</p>
                                    <p className="text-xs text-muted-foreground mt-1">{desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Response example */}
                    <div>
                        <h4 className="text-sm font-medium text-foreground mb-3">Response example</h4>
                        <CodeBlock language="json">{`{
  "responseCode": "00",
  "responseDescription": "Successful",
  "responseMessage": "Virtual account generated successfully",
  "data": {
    "accountNumber": "9876543210",
    "accountName": "PASSPOINT/JOHN DOE",
    "bankName": "Wema Bank",
    "bankCode": "035",
    "currency": "NGN",
    "type": "static",
    "active": true
  }
}`}</CodeBlock>
                    </div>
                </div>
            </section>

            {/* API Endpoint */}
            <section>
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <CreditCard className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Generate static virtual account</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
                    Create a permanent virtual account number for receiving NGN payments.
                </p>

                <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2 px-4 py-3 bg-muted/30 dark:bg-card/50 border border-border rounded-2xl">
                        <span className="px-2 py-0.5 rounded text-xs font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400">POST</span>
                        <code className="text-xs text-muted-foreground break-all">
                            https://{"{{baseUrl}}"}/{"{{paymentContext}}"}/ft-app/generate-virtual-account?type=static
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
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CollectionGenerateNgnStaticVirtualAccount;
