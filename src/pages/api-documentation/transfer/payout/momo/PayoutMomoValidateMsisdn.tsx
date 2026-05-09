import {CheckCircle, Info, PhoneCall, ShieldCheck} from "lucide-react";
import CodeBlock from "@/components/CodeBlock.tsx";

const PayoutMomoValidateMsisdn = () => {
    const getEndpointCode = () => {
        return `GET https://{{baseUrl}}/{{paymentContext}}/momo-app/validate-msisdn?msisdn=2347038025722`;
    };

    const getExampleResponseCode = () => {
        return `{
  "responseCode": "00",
  "responseDescription": "Successful",
  "responseMessage": "MSISDN validation successful",
  "data": {
    "msisdn": "2347038025722",
    "valid": true,
    "accountName": "JOHN DOE",
    "network": "MTN"
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
                    Validate Momo MSISDN
                </h1>
                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl">
                    Validate a mobile money phone number (MSISDN) before initiating a payout transfer.
                </p>
            </section>

            {/* How MSISDN Validation Works */}
            <section>
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <ShieldCheck className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">How MSISDN Validation Works</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-6 max-w-2xl">
                    MSISDN stands for <strong className="text-foreground">Mobile Station International Subscriber Directory Number</strong> — it is the full international phone number of a mobile subscriber, including the country dialing code, with no leading <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">+</code> symbol.
                </p>

                <div className="grid gap-4 sm:grid-cols-2 mb-6">
                    <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 space-y-2">
                        <div className="flex items-center gap-2 mb-1">
                            <PhoneCall className="h-4 w-4 text-brand shrink-0" />
                            <h3 className="text-sm font-semibold text-foreground">Number format</h3>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                            Pass the full international number without a leading <code className="font-mono bg-muted px-1 py-0.5 rounded">+</code>. For example, a Nigerian number uses country code <code className="font-mono bg-muted px-1 py-0.5 rounded">234</code> followed by the local subscriber number: <code className="font-mono bg-muted px-1 py-0.5 rounded">2347038025722</code>.
                        </p>
                    </div>
                    <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 space-y-2">
                        <div className="flex items-center gap-2 mb-1">
                            <CheckCircle className="h-4 w-4 text-brand shrink-0" />
                            <h3 className="text-sm font-semibold text-foreground">What the response confirms</h3>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                            The endpoint confirms whether the phone number is registered and currently active on a mobile money network. The response includes the resolved <code className="font-mono bg-muted px-1 py-0.5 rounded">accountName</code> and the <code className="font-mono bg-muted px-1 py-0.5 rounded">network</code> the number belongs to.
                        </p>
                    </div>
                </div>

                <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-4 mb-4">
                    <h3 className="text-sm font-semibold text-foreground">Why validation is required before transfer</h3>
                    <ul className="space-y-2.5">
                        {[
                            "Prevents failed transactions to incorrect or inactive numbers, saving you the transaction fee on a rejected payout.",
                            "Improves payout success rates by confirming the number is live on a mobile money network before funds are dispatched.",
                            "Lets you surface the resolved account name to the sender for confirmation — reducing user error.",
                            "This is a real-time check — results are not cached. Always call it fresh within the same transfer flow.",
                        ].map((point) => (
                            <li key={point} className="flex items-start gap-2.5">
                                <CheckCircle className="h-3.5 w-3.5 text-brand shrink-0 mt-0.5" />
                                <span className="text-xs text-muted-foreground leading-relaxed">{point}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="bg-muted/40 dark:bg-background/40 border border-border rounded-xl p-4 flex items-start gap-3">
                    <Info className="h-4 w-4 text-brand shrink-0 mt-0.5" />
                    <p className="text-xs text-muted-foreground">
                        <strong className="text-foreground">Prerequisite step:</strong> Always call Validate MSISDN once per transfer flow, before calling the Payout MoMo Transfer endpoint. Skipping this step may result in irreversible payouts to inactive or incorrect numbers.
                    </p>
                </div>
            </section>

            {/* API Endpoint */}
            <section>
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <CheckCircle className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Validate MSISDN</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
                    Verify that a mobile money phone number is valid and active before sending funds.
                </p>

                <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2 px-4 py-3 bg-muted/30 dark:bg-card/50 border border-border rounded-2xl">
                        <span className="px-2 py-0.5 rounded text-xs font-semibold bg-brand-50 text-brand dark:bg-brand-950/40 dark:text-brand/80">GET</span>
                        <code className="text-xs text-muted-foreground break-all">
                            https://{"{{baseUrl}}"}/{"{{paymentContext}}"}/momo-app/validate-msisdn?msisdn=2347038025722
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

                    <div className="bg-white dark:bg-card border border-border rounded-2xl overflow-hidden">
                        <div className="px-5 py-3 border-b border-border bg-muted/30">
                            <h4 className="text-sm font-semibold text-foreground">Query parameters</h4>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                <tr className="border-b border-border">
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Parameter</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Value</th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                <tr className="hover:bg-muted/20 transition-colors">
                                    <td className="px-5 py-3.5 font-mono text-xs text-foreground">msisdn</td>
                                    <td className="px-5 py-3.5 text-muted-foreground">2347038025722</td>
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
                            <h4 className="text-sm font-medium text-foreground mb-3">Response</h4>
                            <CodeBlock language="json">{getExampleResponseCode()}</CodeBlock>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PayoutMomoValidateMsisdn;
