import { Smartphone, Info, AlertTriangle, ArrowRight } from "lucide-react";
import CodeBlock from "@/components/CodeBlock.tsx";

type RequestRow = {
    name: string;
    type: string;
    required: boolean;
    description: string;
    values?: string;
};

type ResponseRow = {
    name: string;
    type: string;
    description: string;
    values?: string;
};

const REQUEST_PARAMS: RequestRow[] = [
    {
        name: "amount",
        type: "string",
        required: true,
        description: "the transaction amount",
    },
    {
        name: "transactionCurrency",
        type: "string",
        required: true,
        description: "the transaction currency",
        values: "e.g. KES, GHS",
    },
    {
        name: "channel",
        type: "string",
        required: true,
        description: "the channel through which the request is sent",
        values: "1 - MOBILE_ANDROID, 2 - MOBILE_IOS, 3 - WEB, 4 - THIRDPARTY, 5 - USSD",
    },
    {
        name: "msisdn",
        type: "string",
        required: true,
        description: "the momo phone number",
    },
    {
        name: "serviceCode",
        type: "string",
        required: true,
        description: "the momo network service code. This can be obtained from the Get Momo Collection Network endpoint.",
    },
    {
        name: "bankCode",
        type: "string",
        required: true,
        description: "passpoint default bank code",
        values: "e.g. 000000",
    },
    {
        name: "clientReference",
        type: "string",
        required: true,
        description: "uniquely generated reference used by the merchant to identify the transaction",
    },
    {
        name: "countryCode",
        type: "string",
        required: true,
        description: "the payer country code",
    },
    {
        name: "accountName",
        type: "string",
        required: true,
        description: "the payer name",
    },
    {
        name: "callbackUrl",
        type: "string",
        required: false,
        description: "the callback url where the final status of transaction will be sent",
    },
];

const RESPONSE_PARAMS: ResponseRow[] = [
    {
        name: "responseCode",
        type: "string",
        description: "the response code",
        values: "e.g. 00 - successful, 01 - pending, 02 - failed",
    },
    {
        name: "responseDescription",
        type: "string",
        description: "the response description",
    },
    {
        name: "responseMessage",
        type: "string",
        description: "the response message",
    },
];

const getEndpointCode = () =>
    `POST https://{{baseUrl}}/{{paymentContext}}/momo-app/request-payment`;

const getRequestBodyCode = () =>
    `{
  "amount": "100",
  "transactionCurrency": "KES",
  "accountName": "Tom Mcforth",
  "bankCode": "000000",
  "serviceCode": "airtel",
  "channel": "3",
  "msisdn": "254714748036",
  "clientReference": "12237546",
  "countryCode": "KE",
  "callbackUrl": "https://yourapp.com/webhooks/momo-collection"
}`;

const getCurlCode = () =>
    `curl --location 'https://{{baseUrl}}/{{paymentContext}}/momo-app/request-payment' \\
--header 'x-channel-id: CHANNEL_ID' \\
--header 'x-channel-code: CHANNEL_CODE' \\
--header 'x-merchant-id: YOUR_MERCHANT_ID' \\
--header 'Content-Type: application/json' \\
--user 'username:password' \\
--data '{
  "amount": "100",
  "transactionCurrency": "KES",
  "accountName": "Tom Mcforth",
  "bankCode": "000000",
  "serviceCode": "airtel",
  "channel": "3",
  "msisdn": "254714748036",
  "clientReference": "12237546",
  "countryCode": "KE"
}'`;

const getResponseCode = () =>
    `{
  "responseCode": "00",
  "responseDescription": "Successful",
  "responseMessage": "mobile money payment request initiated successfully"
}`;

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="bg-white dark:bg-card border border-border rounded-2xl overflow-hidden">
            <div className="px-5 py-3 border-b border-border bg-muted/30">
                <h4 className="text-sm font-semibold text-foreground">{title}</h4>
            </div>
            {children}
        </div>
    );
}

const CollectionMomoRequestToPay = () => {
    return (
        <div className="py-8 sm:py-10 space-y-16">

            {/* Hero */}
            <section>
                <div className="inline-flex items-center gap-2 bg-brand-50 dark:bg-brand-950/40 text-brand text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
                    <Smartphone className="h-3.5 w-3.5" />
                    API Reference
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
                    Momo Request to Pay
                </h1>
                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl">
                    Initiates a request to receive funds from a momo wallet account holder.
                </p>
            </section>

            {/* How MoMo Request to Pay Works */}
            <section>
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <ArrowRight className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">How MoMo Request to Pay Works</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-6 max-w-2xl">
                    This endpoint initiates an inbound mobile money payment. Passpoint sends a payment request (push notification) to the customer's mobile money wallet  the customer must approve the request on their phone to complete the payment.
                </p>

                <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-5">

                    {/* Async nature */}
                    <div className="bg-muted/40 dark:bg-background/40 border border-border rounded-xl p-4 flex items-start gap-3">
                        <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                        <p className="text-xs text-muted-foreground">
                            <strong className="text-foreground">Fully asynchronous:</strong> A <code className="bg-muted px-1 py-0.5 rounded">responseCode: "00"</code> confirms the request was <em>submitted</em> to the network  not that payment was received. Final payment confirmation arrives via the <strong className="text-foreground">Wallet Credit Callback</strong> webhook. Never fulfill an order on the initial API response alone.
                        </p>
                    </div>

                    {/* Key fields */}
                    <div>
                        <h3 className="text-base font-semibold text-foreground mb-3">Key request fields explained</h3>
                        <div className="overflow-x-auto border border-border rounded-xl">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-border bg-muted/30">
                                        <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Field</th>
                                        <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Notes</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    <tr className="hover:bg-muted/20 transition-colors">
                                        <td className="px-5 py-3.5 font-mono text-xs text-foreground">serviceCode</td>
                                        <td className="px-5 py-3.5 text-xs text-muted-foreground">Must come from the Get MoMo Collection Network response. Identifies which mobile network to send the request to.</td>
                                    </tr>
                                    <tr className="hover:bg-muted/20 transition-colors">
                                        <td className="px-5 py-3.5 font-mono text-xs text-foreground">msisdn</td>
                                        <td className="px-5 py-3.5 text-xs text-muted-foreground">Customer's mobile number in full international format without the leading <code className="bg-muted px-1 py-0.5 rounded">+</code>. Example: <code className="bg-muted px-1 py-0.5 rounded">233241234567</code> for Ghana, <code className="bg-muted px-1 py-0.5 rounded">254714748036</code> for Kenya.</td>
                                    </tr>
                                    <tr className="hover:bg-muted/20 transition-colors">
                                        <td className="px-5 py-3.5 font-mono text-xs text-foreground">bankCode</td>
                                        <td className="px-5 py-3.5 text-xs text-muted-foreground">Always <code className="bg-muted px-1 py-0.5 rounded">"000000"</code>  the special code designating the Passpoint wallet as the collection destination.</td>
                                    </tr>
                                    <tr className="hover:bg-muted/20 transition-colors">
                                        <td className="px-5 py-3.5 font-mono text-xs text-foreground">channel</td>
                                        <td className="px-5 py-3.5 text-xs text-muted-foreground">Integration channel identifier: <code className="bg-muted px-1 py-0.5 rounded">1</code> Android, <code className="bg-muted px-1 py-0.5 rounded">2</code> iOS, <code className="bg-muted px-1 py-0.5 rounded">3</code> Web, <code className="bg-muted px-1 py-0.5 rounded">4</code> Third-party, <code className="bg-muted px-1 py-0.5 rounded">5</code> USSD.</td>
                                    </tr>
                                    <tr className="hover:bg-muted/20 transition-colors">
                                        <td className="px-5 py-3.5 font-mono text-xs text-foreground">clientReference</td>
                                        <td className="px-5 py-3.5 text-xs text-muted-foreground">Your unique idempotency reference for this collection request. Passpoint uses this to deduplicate retries  always generate a unique value per transaction attempt.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Customer flow */}
                    <div>
                        <h3 className="text-base font-semibold text-foreground mb-3">Customer experience</h3>
                        <div className="space-y-2">
                            {[
                                "The customer receives a push notification or USSD prompt on their phone from their MoMo provider.",
                                "The customer typically has 60–120 seconds to approve or decline the request.",
                                "If approved, Passpoint receives the funds and sends a Wallet Credit Callback to your webhook URL.",
                                "If the customer declines or the request times out, the transaction status updates to FAILED via webhook.",
                            ].map((step, i) => (
                                <div key={i} className="flex items-start gap-3 px-4 py-3 bg-muted/30 dark:bg-background/30 border border-border rounded-xl">
                                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-brand-50 dark:bg-brand-950/40 text-brand text-xs font-bold flex items-center justify-center">{i + 1}</span>
                                    <p className="text-xs text-muted-foreground">{step}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* UX tip */}
                    <div className="bg-muted/40 dark:bg-background/40 border border-border rounded-xl p-4 flex items-start gap-3">
                        <Info className="h-4 w-4 text-brand shrink-0 mt-0.5" />
                        <p className="text-xs text-muted-foreground">
                            <strong className="text-foreground">UX best practice:</strong> After submitting the request, display a clear message to the customer such as <em>"Please check your phone for a payment prompt from your mobile money provider and approve it within 2 minutes."</em> This significantly reduces abandonment and support contacts.
                        </p>
                    </div>
                </div>
            </section>

            {/* Endpoint */}
            <section className="space-y-6">
                <div className="flex flex-wrap items-center gap-2 px-4 py-3 bg-muted/30 dark:bg-card/50 border border-border rounded-2xl">
                    <span className="px-2 py-0.5 rounded text-xs font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400">POST</span>
                    <code className="text-xs text-muted-foreground break-all">
                        https://dev.mypasspoint.com/paypass/momo-app/request-payment
                    </code>
                </div>

                {/* Request Parameters */}
                <SectionCard title="Request Parameters">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-border">
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Parameter</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Type</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Required</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Description</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Values</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {REQUEST_PARAMS.map((row) => (
                                    <tr key={row.name} className="hover:bg-muted/20 transition-colors">
                                        <td className="px-5 py-3.5">
                                            <span className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">{row.name}</span>
                                        </td>
                                        <td className="px-5 py-3.5 text-muted-foreground text-xs">{row.type}</td>
                                        <td className="px-5 py-3.5">
                                            {row.required
                                                ? <span className="text-xs font-semibold text-red-600 dark:text-red-400">mandatory</span>
                                                : <span className="text-xs text-muted-foreground">optional</span>}
                                        </td>
                                        <td className="px-5 py-3.5 text-muted-foreground text-sm">{row.description}</td>
                                        <td className="px-5 py-3.5">
                                            {row.values
                                                ? <span className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">{row.values}</span>
                                                : <span className="text-muted-foreground"></span>}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </SectionCard>

                {/* Response Parameters */}
                <SectionCard title="Response Parameters">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-border">
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Parameter</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Type</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Description</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Values</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {RESPONSE_PARAMS.map((row) => (
                                    <tr key={row.name} className="hover:bg-muted/20 transition-colors">
                                        <td className="px-5 py-3.5">
                                            <span className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">{row.name}</span>
                                        </td>
                                        <td className="px-5 py-3.5 text-muted-foreground text-xs">{row.type}</td>
                                        <td className="px-5 py-3.5 text-muted-foreground text-sm">{row.description}</td>
                                        <td className="px-5 py-3.5">
                                            {row.values
                                                ? <span className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">{row.values}</span>
                                                : <span className="text-muted-foreground"></span>}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </SectionCard>
            </section>

            {/* Code examples */}
            <section>
                <div className="flex items-center gap-3 mb-6">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <Smartphone className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Code examples</h2>
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
                        <CodeBlock language="bash">{getCurlCode()}</CodeBlock>
                    </div>
                    <div>
                        <h4 className="text-sm font-medium text-foreground mb-3">Response</h4>
                        <CodeBlock language="json">{getResponseCode()}</CodeBlock>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default CollectionMomoRequestToPay;
