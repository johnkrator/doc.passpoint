import {RefreshCw, Info, AlertTriangle, Wallet} from "lucide-react";
import CodeBlock from "@/components/CodeBlock.tsx";

const PayoutConvertFunds = () => {
    const getConvertFundsEndpoint = () => {
        return `POST https://{{baseUrl}}/{{paymentContext}}/ft-app/convert-funds`;
    };

    const getConvertFundsRequestBody = () => {
        return `{
    "srcCurrency": "USD",
    "destCurrency": "NGN",
    "amount": 1000.00
}`;
    };

    const getConvertFundsCurlExample = () => {
        return `curl --location 'https://{{baseUrl}}/{{paymentContext}}/ft-app/convert-funds'
--header 'x-channel-id: CHANNEL_ID'
--header 'x-channel-code: CHANNEL_CODE'
--header 'x-merchant-id: YOUR_MERCHANT_ID'
--header 'Authorization: Bearer YOUR_TOKEN'
--data '{
    "srcCurrency": "USD",
    "destCurrency": "NGN",
    "amount": 1000.00
}'`;
    };

    const getConvertFundsResponse = () => {
        return `{
  "responseCode": "00",
  "responseDescription": "Successful",
  "responseMessage": "Funds converted successfully",
  "data": {
    "transactionId": "conv_abc123def456",
    "srcCurrency": "USD",
    "destCurrency": "NGN",
    "srcAmount": 1000.00,
    "destAmount": 850000.00,
    "exchangeRate": 850.00,
    "fee": 5.00,
    "vat": 0.00,
    "totalDebitAmount": 1005.00,
    "status": "SUCCESSFUL",
    "dateCreated": "2024-01-15T14:30:00.000+00:00"
  }
}`;
    };

    return (
        <div className="py-8 sm:py-10 space-y-16">

            {/* Hero */}
            <section>
                <div className="inline-flex items-center gap-2 bg-brand-50 dark:bg-brand-950/40 text-brand text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
                    <RefreshCw className="h-3.5 w-3.5" />
                    API Reference
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
                    Convert Funds
                </h1>
                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl">
                    Convert funds between different currencies in your Passpoint wallet with competitive exchange rates and instant settlement.
                </p>
            </section>

            {/* How Currency Conversion Works */}
            <section>
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <RefreshCw className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">How Currency Conversion Works</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-6 max-w-2xl">
                    This endpoint converts a specified amount from one currency to another within your Passpoint merchant wallet. The conversion executes at the live market rate at the moment of the API call and settles instantly  debiting the source currency balance and crediting the destination currency balance. No funds leave Passpoint during this operation.
                </p>

                <div className="space-y-4 mb-8">
                    {/* How it works */}
                    <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-4">
                        <div className="flex items-center gap-2 mb-1">
                            <Wallet className="h-4 w-4 text-brand shrink-0" />
                            <h3 className="text-sm font-semibold text-foreground">What happens during a conversion</h3>
                        </div>
                        <div className="space-y-3">
                            {[
                                { step: "1", label: "Rate lock", detail: "The live exchange rate is captured at the exact moment the API request is received. The rate used in the conversion is final and returned in the response." },
                                { step: "2", label: "Source debit", detail: "The srcAmount (plus fee) is debited from your source currency wallet balance. The request is rejected if your balance is insufficient." },
                                { step: "3", label: "Destination credit", detail: "The converted destAmount is credited to your destination currency balance immediately after the debit. Settlement is instant." },
                                { step: "4", label: "Transaction record", detail: "A conversion transaction record is created with a unique transactionId. Use this ID for reconciliation and audit purposes." },
                            ].map(({ step, label, detail }) => (
                                <div key={step} className="flex items-start gap-3">
                                    <div className="bg-brand-50 dark:bg-brand-950/40 w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                                        <span className="text-xs font-bold text-brand">{step}</span>
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold text-foreground mb-0.5">{label}</p>
                                        <p className="text-xs text-muted-foreground">{detail}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Rates vs Convert */}
                    <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-3">
                        <div className="flex items-center gap-2 mb-1">
                            <Info className="h-4 w-4 text-brand shrink-0" />
                            <h3 className="text-sm font-semibold text-foreground">Rate preview vs. actual conversion</h3>
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Always use the <strong className="text-foreground">Get Rate</strong> endpoint (<code className="font-mono bg-muted px-1 py-0.5 rounded">type=rate</code>) to display a rate preview to users before calling Convert Funds. The actual conversion rate may differ slightly from the preview because exchange rates fluctuate continuously. The final rate used is always returned in the <code className="font-mono bg-muted px-1 py-0.5 rounded">data.exchangeRate</code> field of the conversion response.
                        </p>
                    </div>

                    {/* Fees */}
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
                                    {[
                                        { field: "data.exchangeRate", desc: "The exact rate applied to this conversion. Use this for reconciliation  it is the authoritative rate, not the preview." },
                                        { field: "data.srcAmount", desc: "The amount debited from your source currency balance, before fees." },
                                        { field: "data.destAmount", desc: "The amount credited to your destination currency balance after conversion." },
                                        { field: "data.fee", desc: "The conversion fee charged in the source currency." },
                                        { field: "data.totalDebitAmount", desc: "The total amount debited from your source balance including fees (srcAmount + fee)." },
                                    ].map(({ field, desc }) => (
                                        <tr key={field} className="hover:bg-muted/20 transition-colors">
                                            <td className="px-5 py-3.5"><span className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">{field}</span></td>
                                            <td className="px-5 py-3.5 text-muted-foreground text-xs">{desc}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Warning */}
                    <div className="bg-muted/40 dark:bg-background/40 border border-border rounded-xl p-4 flex items-start gap-3">
                        <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                        <p className="text-xs text-muted-foreground">
                            <strong className="text-foreground">Conversions are irreversible.</strong> Once executed, a currency conversion cannot be undone through the API. Ensure the source currency, destination currency, and amount are correct before submitting. Always call Get Rate first to show users an accurate quote and obtain their confirmation.
                        </p>
                    </div>
                </div>
            </section>

            {/* Convert Funds */}
            <section>
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <RefreshCw className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Convert funds</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
                    Convert funds between currencies in your wallet.
                </p>

                <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2 px-4 py-3 bg-muted/30 dark:bg-card/50 border border-border rounded-2xl">
                        <span className="px-2 py-0.5 rounded text-xs font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400">POST</span>
                        <code className="text-xs text-muted-foreground break-all">
                            https://{"{{baseUrl}}"}/{"{{paymentContext}}"}/ft-app/convert-funds
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
                            <CodeBlock>{getConvertFundsEndpoint()}</CodeBlock>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">Request body</h4>
                            <CodeBlock language="json">{getConvertFundsRequestBody()}</CodeBlock>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">cURL example</h4>
                            <CodeBlock language="bash">{getConvertFundsCurlExample()}</CodeBlock>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">Response</h4>
                            <CodeBlock language="json">{getConvertFundsResponse()}</CodeBlock>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default PayoutConvertFunds;
