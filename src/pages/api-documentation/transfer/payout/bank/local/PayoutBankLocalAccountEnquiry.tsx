import {CheckCircle, Info, ShieldCheck} from "lucide-react";
import CodeBlock from "@/components/CodeBlock.tsx";

const PayoutBankLocalAccountEnquiry = () => {
    const getEndpointCode = () => {
        return `POST https://{{baseUrl}}/{{paymentContext}}/ft-app/account-enquiry`;
    };

    const getRequestBodyCode = () => {
        return `{
    "bankCode":"120001",
    "accountNumber":"1100000309",
    "countryCode":"NG"
}`;
    };

    const getCurlExampleCode = () => {
        return `curl --location 'https://{{baseUrl}}/{{paymentContext}}/ft-app/account-enquiry' \\
--header 'x-merchant-id: YOUR_MERCHANT_ID' \\
--header 'x-channel-id: 3' \\
--header 'x-channel-code: legacy-api-user' \\
--data '{
    "bankCode":"120001",
    "accountNumber":"1100000309",
    "countryCode":"NG"
}'`;
    };

    const getExampleResponseCode = () => {
        return `{
  "responseCode": "00",
  "responseDescription": "Successful",
  "responseMessage": "account enquiry successful",
  "data": {
    "accountName": "JOHN DOE"
  }
}`;
    };

    return (
        <div className="py-8 sm:py-10 space-y-16">

            {/* Hero */}
            <section>
                <div className="inline-flex items-center gap-2 bg-brand-50 dark:bg-brand-950/40 text-brand text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
                    <CheckCircle className="h-3.5 w-3.5" />
                    API Reference
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
                    Account Enquiry
                </h1>
                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl">
                    Verify a NUBAN beneficiary account details before processing a transfer.
                </p>
            </section>

            {/* How Account Enquiry Works */}
            <section>
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <ShieldCheck className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">How Account Enquiry Works</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-6 max-w-2xl">
                    Account Enquiry is the <strong className="text-foreground">mandatory verification step</strong> that must precede every NGN bank transfer. It confirms the destination account is real, active, and belongs to the correct bank — and returns the account holder's name for your user to review before committing funds.
                </p>

                <div className="space-y-4">

                    {/* Key facts grid */}
                    <div className="grid sm:grid-cols-3 gap-4">
                        {[
                            {
                                icon: <ShieldCheck className="h-4 w-4 text-brand" />,
                                title: "Always call first",
                                desc: "Never call the NGN Transfer endpoint without a successful Account Enquiry. A failed enquiry means the account or bankCode is invalid — proceeding risks a failed or misdirected transfer.",
                            },
                            {
                                icon: <CheckCircle className="h-4 w-4 text-brand" />,
                                title: "Show accountName to user",
                                desc: "The returned accountName is the bank's official registered name. Display it prominently and require confirmation — this is the primary fraud prevention step in the transfer flow.",
                            },
                            {
                                icon: <Info className="h-4 w-4 text-brand" />,
                                title: "bankCode must be dynamic",
                                desc: "Always source the bankCode from the Get Banks endpoint. Never hardcode bank codes — they can change, and hardcoding leads to failed enquiries and broken transfers.",
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
                                    label: "Get bank list",
                                    detail: "Call GET /ft-app/bank-list/NG to obtain a valid bankCode for the recipient's bank.",
                                },
                                {
                                    step: "2",
                                    label: "Call Account Enquiry",
                                    detail: "Submit the bankCode and accountNumber. A responseCode of \"00\" confirms the account exists and is active.",
                                },
                                {
                                    step: "3",
                                    label: "Display accountName for confirmation",
                                    detail: "Show the returned accountName to your user. Require them to confirm it matches their intended recipient before proceeding.",
                                },
                                {
                                    step: "4",
                                    label: "Initiate NGN Transfer",
                                    detail: "Only after successful enquiry and user confirmation, call the Account Transfer endpoint using the same bankCode and accountNumber.",
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

                    {/* Sandbox tip */}
                    <div className="bg-muted/40 dark:bg-background/40 border border-border rounded-xl p-4 flex items-start gap-3">
                        <Info className="h-4 w-4 text-brand shrink-0 mt-0.5" />
                        <div>
                            <p className="text-xs font-semibold text-foreground mb-1">Sandbox testing</p>
                            <p className="text-xs text-muted-foreground">
                                Use bank code <code className="font-mono bg-muted px-1 py-0.5 rounded">120001</code> (9 Payment Service Bank) with any of the test account numbers listed in the endpoint section below to trigger a successful name resolution without touching real funds. These accounts only work in the sandbox environment.
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
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Account enquiry</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
                    Verify that a bank account number is valid and retrieve the account name.
                </p>

                <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2 px-4 py-3 bg-muted/30 dark:bg-card/50 border border-border rounded-2xl">
                        <span className="px-2 py-0.5 rounded text-xs font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400">POST</span>
                        <code className="text-xs text-muted-foreground break-all">
                            https://{"{{baseUrl}}"}/{"{{paymentContext}}"}/ft-app/account-enquiry
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

                    {/* 9PSB test accounts */}
                    <div className="bg-white dark:bg-card border border-border rounded-2xl overflow-hidden">
                        <div className="px-5 py-3 border-b border-border bg-muted/30">
                            <h4 className="text-sm font-semibold text-foreground">9PSB Test Accounts</h4>
                        </div>
                        <div className="px-5 py-4 space-y-2">
                            <p className="text-xs text-muted-foreground mb-3">
                                Use the following 9 Payment Service Bank (<span className="font-mono text-foreground">bankCode: 120001</span>) account numbers to test name enquiry:
                            </p>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b border-border">
                                            <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Account Number</th>
                                            <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Bank</th>
                                            <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Bank Code</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border">
                                        {[
                                            "1100000309",
                                            "1100015371",
                                            "1100011303",
                                            "1100000505",
                                        ].map((acct) => (
                                            <tr key={acct} className="hover:bg-muted/20 transition-colors">
                                                <td className="px-5 py-3.5 font-mono text-xs text-foreground">{acct}</td>
                                                <td className="px-5 py-3.5 text-xs text-muted-foreground">9 Payment Service Bank</td>
                                                <td className="px-5 py-3.5 font-mono text-xs text-foreground">120001</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PayoutBankLocalAccountEnquiry;
