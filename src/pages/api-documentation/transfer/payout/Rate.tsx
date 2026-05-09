import {DollarSign, TrendingUp, Info, AlertTriangle} from "lucide-react";
import CodeBlock from "@/components/CodeBlock.tsx";

const Rate = () => {
    const getTransferFeeEndpoint = () => {
        return `POST https://{{baseUrl}}/{{paymentContext}}/ft-app/get-rate?type=fee`;
    };

    const getTransferFeeCurlExample = () => {
        return `curl --location 'https://{{baseUrl}}/{{paymentContext}}/ft-app/get-rate?type=fee'
--data '{
    "srcCurrency": "string",
    "destCurrency": "string",
    "countryCode": "string",
    "amount": "number"
}'`;
    };

    const getTransferFeeRequestBody = () => {
        return `{
    "srcCurrency": "USD",
    "destCurrency": "NGN",
    "countryCode": "NG",
    "amount": "10000"
}`;
    };

    const getTransferFeeResponse = () => {
        return `{
  "responseCode": "00",
  "responseDescription": "Successful",
  "responseMessage": "rate retrieved successfully",
  "data": {
    "srcCurrency": "string",
    "destCurrency": "string",
    "rate": "decimal",
    "vat": "decimal",
    "fee": "number",
    "srcAmount": "decimal",
    "destAmount": "decimal",
    "totalDebitAmount": "decimal"
  }
}`;
    };

    const getExchangeRateEndpoint = () => {
        return `POST https://{{baseUrl}}/{{paymentContext}}/ft-app/get-rate?type=rate`;
    };

    const getExchangeRateRequestBody = () => {
        return `{
    "srcCurrency": "USD",
    "destCurrency": "NGN",
    "countryCode": "NG"
}`;
    };


    return (
        <div className="py-8 sm:py-10 space-y-16">

            {/* Hero */}
            <section>
                <div className="inline-flex items-center gap-2 bg-brand-50 dark:bg-brand-950/40 text-brand text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
                    <TrendingUp className="h-3.5 w-3.5" />
                    API Reference
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
                    Rates
                </h1>
                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl">
                    Get exchange rates and transaction fees for currency conversions and transfers.
                </p>
            </section>

            {/* How Rates and Fees Work */}
            <section>
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <Info className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">How rates and fees work</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
                    This module exposes two distinct lookup operations — one for transfer cost estimation and one for
                    live currency conversion rates. Neither moves any funds.
                </p>

                <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-5">
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div className="bg-muted/40 dark:bg-background/40 border border-border rounded-xl p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="bg-brand-50 dark:bg-brand-950/40 w-7 h-7 rounded-full flex items-center justify-center shrink-0">
                                    <DollarSign className="h-3.5 w-3.5 text-brand" />
                                </div>
                                <p className="text-xs font-semibold text-foreground">Transfer Fee lookup</p>
                            </div>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                                Call this <span className="font-semibold text-foreground">before</span> initiating a transfer
                                to show users the exact fee they will be charged. This is a preview — no funds are moved.
                                Fees vary by transfer method (MoMo, Bank, Foreign), amount, currency, and destination country.
                            </p>
                        </div>
                        <div className="bg-muted/40 dark:bg-background/40 border border-border rounded-xl p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="bg-brand-50 dark:bg-brand-950/40 w-7 h-7 rounded-full flex items-center justify-center shrink-0">
                                    <TrendingUp className="h-3.5 w-3.5 text-brand" />
                                </div>
                                <p className="text-xs font-semibold text-foreground">Exchange Rate lookup</p>
                            </div>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                                Use this to display live currency conversion rates in your UI (e.g., "1 USD = 1,580 NGN at
                                current rate"). This is informational only — it does not lock or reserve a rate.
                            </p>
                        </div>
                    </div>

                    <div className="bg-muted/40 dark:bg-background/40 border border-border rounded-xl p-4 flex items-start gap-3">
                        <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                        <p className="text-xs text-muted-foreground leading-relaxed">
                            <span className="font-semibold text-foreground">Exchange rates are live market rates — they fluctuate.</span> Always
                            re-fetch before displaying to users. The <span className="font-semibold text-foreground">Convert Funds</span> endpoint
                            executes the actual conversion at the live rate at the moment of execution, which may differ slightly from
                            a rate you previewed earlier. The exact rate used is returned in the conversion response.
                        </p>
                    </div>
                </div>
            </section>

            {/* Get Transfer Fee */}
            <section>
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <DollarSign className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Get transfer fee</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
                    Returns the transaction fee for an amount and currency pair.
                </p>

                <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2 px-4 py-3 bg-muted/30 dark:bg-card/50 border border-border rounded-2xl">
                        <span className="px-2 py-0.5 rounded text-xs font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400">POST</span>
                        <code className="text-xs text-muted-foreground break-all">
                            https://{"{{baseUrl}}"}/{"{{paymentContext}}"}/ft-app/get-rate?type=fee
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
                            <CodeBlock>{getTransferFeeEndpoint()}</CodeBlock>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">Request body</h4>
                            <CodeBlock language="json">{getTransferFeeRequestBody()}</CodeBlock>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">cURL example</h4>
                            <CodeBlock language="bash">{getTransferFeeCurlExample()}</CodeBlock>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">Response</h4>
                            <CodeBlock language="json">{getTransferFeeResponse()}</CodeBlock>
                        </div>
                    </div>
                </div>
            </section>

            {/* Get Exchange Rate */}
            <section>
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <TrendingUp className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Get exchange rate</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
                    Gets conversion rates for a currency pair. An authorization header is required.
                </p>

                <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2 px-4 py-3 bg-muted/30 dark:bg-card/50 border border-border rounded-2xl">
                        <span className="px-2 py-0.5 rounded text-xs font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400">POST</span>
                        <code className="text-xs text-muted-foreground break-all">
                            https://{"{{baseUrl}}"}/{"{{paymentContext}}"}/ft-app/get-rate?type=rate
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
                            <CodeBlock>{getExchangeRateEndpoint()}</CodeBlock>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">Request body</h4>
                            <CodeBlock language="json">{getExchangeRateRequestBody()}</CodeBlock>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Rate;
