import {Building2, Info, ListChecks, Code2} from "lucide-react";
import CodeBlock from "@/components/CodeBlock.tsx";

const getBankListResponseCode = () => `{
  "responseCode": "00",
  "responseDescription": "Successful",
  "responseMessage": "Banks retrieved successfully",
  "data": [
    {
      "bankCode": "057",
      "bankName": "Zenith Bank"
    },
    {
      "bankCode": "058",
      "bankName": "GTBank"
    },
    {
      "bankCode": "011",
      "bankName": "First Bank of Nigeria"
    },
    {
      "bankCode": "000000",
      "bankName": "Passpoint Wallet"
    }
  ]
}`;

const RESPONSE_FIELDS: { field: string; description: string }[] = [
    {
        field: "bankCode",
        description:
            'The unique code for the bank. Use this in Account Enquiry and NGN Transfer requests. Note: "000000" is the special Passpoint wallet code used for wallet-to-wallet transfers.',
    },
    {
        field: "bankName",
        description: "Human-readable bank name shown to users for selection.",
    },
];

const PayoutBankLocalGetBanks = () => {
    const getEndpointCode = () => `GET https://{{baseUrl}}/{{paymentContext}}/ft-app/bank-list/NG`;

    const getCurlExampleCode = () =>
        `curl --location 'https://{{baseUrl}}/{{paymentContext}}/ft-app/bank-list/NG'`;

    return (
        <div className="py-8 sm:py-10 space-y-16">

            {/* Hero */}
            <section>
                <div className="inline-flex items-center gap-2 bg-brand-50 dark:bg-brand-950/40 text-brand text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
                    <Building2 className="h-3.5 w-3.5" />
                    API Reference
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
                    Get Banks
                </h1>
                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl">
                    List all financial institutions in a particular bank payout enabled corridor.
                </p>
            </section>

            {/* How Bank List Works */}
            <section>
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <ListChecks className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">How the Bank List Works</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-6 max-w-2xl">
                    Before you can send any local NGN bank transfer or perform an Account Enquiry, you need a valid <code className="font-mono bg-muted px-1.5 py-0.5 rounded text-xs">bankCode</code>. This endpoint is the authoritative source — it returns every financial institution supported in the Nigerian payout corridor, each with the code your requests require.
                </p>

                <div className="space-y-4">

                    {/* Key facts grid */}
                    <div className="grid sm:grid-cols-3 gap-4">
                        {[
                            {
                                icon: <Building2 className="h-4 w-4 text-brand" />,
                                title: "Required first step",
                                desc: "You must call this endpoint before Account Enquiry or initiating an NGN Transfer. The bankCode returned here is a required field in both subsequent requests.",
                            },
                            {
                                icon: <ListChecks className="h-4 w-4 text-brand" />,
                                title: "Full corridor coverage",
                                desc: "Returns every bank active in the Nigerian NGN payout network — including commercial banks, microfinance banks, and the special Passpoint Wallet entry (code 000000) for wallet-to-wallet transfers.",
                            },
                            {
                                icon: <Info className="h-4 w-4 text-brand" />,
                                title: "No auth token required",
                                desc: "Unlike most Passpoint endpoints, this call does not require a Bearer token. Only the standard channel headers are needed: x-merchant-id, x-channel-id, and x-channel-code.",
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

                    {/* Integration flow */}
                    <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6">
                        <h3 className="text-sm font-semibold text-foreground mb-4">Integration flow</h3>
                        <div className="space-y-3">
                            {[
                                {
                                    step: "1",
                                    label: "Fetch the bank list",
                                    detail: "Call GET /ft-app/bank-list/NG. Cache the response — bank codes are stable and the list rarely changes.",
                                },
                                {
                                    step: "2",
                                    label: "Display banks to your user",
                                    detail: "Render a bank picker using the bankName for display and store the corresponding bankCode for use in subsequent API calls.",
                                },
                                {
                                    step: "3",
                                    label: "Use bankCode in Account Enquiry",
                                    detail: "Pass the selected bankCode along with the account number to the Account Enquiry endpoint to validate the recipient account and retrieve the account holder's name.",
                                },
                                {
                                    step: "4",
                                    label: "Use bankCode in NGN Transfer",
                                    detail: "Include the same bankCode in your NGN Transfer request body to route the payment to the correct financial institution.",
                                },
                            ].map(({ step, label, detail }) => (
                                <div key={step} className="flex items-start gap-4">
                                    <div className="bg-brand-50 dark:bg-brand-950/40 w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                                        <span className="text-xs font-bold text-brand">{step}</span>
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold text-foreground mb-0.5">{label}</p>
                                        <p className="text-xs text-muted-foreground leading-relaxed">{detail}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Special wallet code callout */}
                    <div className="bg-white dark:bg-card border border-border rounded-2xl overflow-hidden">
                        <div className="px-5 py-3 border-b border-border bg-muted/30">
                            <h4 className="text-sm font-semibold text-foreground">Special bank code to know</h4>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-border">
                                        <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Bank Code</th>
                                        <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Bank Name</th>
                                        <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">What it means</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    <tr className="hover:bg-muted/20 transition-colors">
                                        <td className="px-5 py-3.5"><span className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">000000</span></td>
                                        <td className="px-5 py-3.5 text-muted-foreground text-xs font-medium">Passpoint Wallet</td>
                                        <td className="px-5 py-3.5 text-muted-foreground text-xs">
                                            Internal wallet-to-wallet transfer within the Passpoint network. Use this code with the recipient's Passpoint wallet account number to transfer between Passpoint users instantly.
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Caching tip */}
                    <div className="bg-muted/40 dark:bg-background/40 border border-border rounded-xl p-4 flex items-start gap-3">
                        <Info className="h-4 w-4 text-brand shrink-0 mt-0.5" />
                        <div>
                            <p className="text-xs font-semibold text-foreground mb-1">Caching recommendation</p>
                            <p className="text-xs text-muted-foreground">
                                Cache the bank list response for up to 24 hours — calling this endpoint on every transaction is unnecessary overhead. However, always invalidate your cache and refetch if a bankCode lookup fails at the Account Enquiry stage, since banks are occasionally added or deactivated.
                            </p>
                        </div>
                    </div>

                </div>
            </section>

            {/* Response Example */}
            <section>
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <Code2 className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Response Example</h2>
                </div>

                <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-5">
                    <div>
                        <h4 className="text-sm font-medium text-foreground mb-3">Sample response</h4>
                        <CodeBlock language="json">{getBankListResponseCode()}</CodeBlock>
                    </div>

                    <div className="bg-white dark:bg-card border border-border rounded-2xl overflow-hidden">
                        <div className="px-5 py-3 border-b border-border bg-muted/30">
                            <h4 className="text-sm font-semibold text-foreground">Response fields</h4>
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
                                {RESPONSE_FIELDS.map(({ field, description }) => (
                                    <tr key={field} className="hover:bg-muted/20 transition-colors">
                                        <td className="px-5 py-3.5 font-mono text-xs text-foreground whitespace-nowrap">{field}</td>
                                        <td className="px-5 py-3.5 text-xs text-muted-foreground">{description}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>

            {/* API Endpoint */}
            <section>
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <Building2 className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Get banks</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
                    Retrieve all supported banks for Nigerian Naira (NGN) payout operations.
                </p>

                <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2 px-4 py-3 bg-muted/30 dark:bg-card/50 border border-border rounded-2xl">
                        <span className="px-2 py-0.5 rounded text-xs font-semibold bg-brand-50 text-brand dark:bg-brand-950/40 dark:text-brand/80">GET</span>
                        <code className="text-xs text-muted-foreground break-all">
                            https://{"{{baseUrl}}"}/{"{{paymentContext}}"}/ft-app/bank-list/NG
                        </code>
                    </div>

                    <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-5">
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">Endpoint</h4>
                            <CodeBlock>{getEndpointCode()}</CodeBlock>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">cURL example</h4>
                            <CodeBlock language="bash">{getCurlExampleCode()}</CodeBlock>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PayoutBankLocalGetBanks;
