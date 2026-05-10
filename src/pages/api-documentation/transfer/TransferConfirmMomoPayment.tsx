import { CheckCircle2, Info, Smartphone, ArrowRight, AlertTriangle } from "lucide-react";
import CodeBlock from "@/components/CodeBlock.tsx";

type RequestRow = {
    name: string;
    type: string;
    description: string;
};

const REQUEST_PARAMS: RequestRow[] = [
    {
        name: "reference",
        type: "string",
        description: "the transaction id or client reference",
    },
    {
        name: "otp",
        type: "string",
        description: "this is required for momo networks that require otp e.g. Orange",
    },
];

const getEndpoint = () =>
    `POST https://{{baseUrl}}/{{paymentContext}}/momo-app/confirm-payment`;

const getRequestBody = () =>
    `{
  "reference": "string",
  "otp": "string"
}`;

const getCurlExample = () =>
    `curl --location 'https://{{baseUrl}}/{{paymentContext}}/momo-app/confirm-payment' \\
--header 'x-channel-id: CHANNEL_ID' \\
--header 'x-channel-code: CHANNEL_CODE' \\
--header 'x-merchant-id: YOUR_MERCHANT_ID' \\
--header 'Content-Type: application/json' \\
--data '{
  "reference": "string",
  "otp": "string"
}'`;

const getResponseExample = () =>
    `{
  "responseCode": "00",
  "responseDescription": "Successful",
  "responseMessage": "transaction confirmation successful"
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

const TransferConfirmMomoPayment = () => {
    return (
        <div className="py-8 sm:py-10 space-y-16">

            {/* Hero */}
            <section>
                <div className="inline-flex items-center gap-2 bg-brand-50 dark:bg-brand-950/40 text-brand text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    API Reference
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
                    Confirm Momo Payment
                </h1>
                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl">
                    This is used to confirm a momo payin. Used for momo networks that require OTP verification e.g. Orange.
                </p>
            </section>

            {/* How MoMo OTP Confirmation Works */}
            <section>
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <Smartphone className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">How MoMo OTP Confirmation Works</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-6 max-w-2xl">
                    Some mobile money networks require a two-step authorization flow: first initiate the transfer, then confirm it with a One-Time Password (OTP) sent to the customer's phone. This endpoint completes the second step for networks that mandate OTP verification.
                </p>

                <div className="space-y-4">
                    {/* Networks requiring OTP */}
                    <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-3">
                        <div className="flex items-center gap-2 mb-1">
                            <Smartphone className="h-4 w-4 text-brand shrink-0" />
                            <h3 className="text-sm font-semibold text-foreground">Which networks require OTP</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-border">
                                        <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Network</th>
                                        <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Authorization method</th>
                                        <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">OTP required?</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    <tr className="hover:bg-muted/20 transition-colors">
                                        <td className="px-4 py-3 text-xs text-foreground font-medium">Orange (West Africa)</td>
                                        <td className="px-4 py-3 text-muted-foreground text-xs">SMS OTP sent to customer's phone</td>
                                        <td className="px-4 py-3"><span className="px-2 py-0.5 rounded text-xs font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400">Yes  use this endpoint</span></td>
                                    </tr>
                                    <tr className="hover:bg-muted/20 transition-colors">
                                        <td className="px-4 py-3 text-xs text-foreground font-medium">MTN</td>
                                        <td className="px-4 py-3 text-muted-foreground text-xs">In-app push approval on the customer's device</td>
                                        <td className="px-4 py-3"><span className="px-2 py-0.5 rounded text-xs font-semibold bg-muted text-muted-foreground">No  push only</span></td>
                                    </tr>
                                    <tr className="hover:bg-muted/20 transition-colors">
                                        <td className="px-4 py-3 text-xs text-foreground font-medium">Airtel</td>
                                        <td className="px-4 py-3 text-muted-foreground text-xs">In-app push approval on the customer's device</td>
                                        <td className="px-4 py-3"><span className="px-2 py-0.5 rounded text-xs font-semibold bg-muted text-muted-foreground">No  push only</span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* When it's triggered */}
                    <div className="bg-muted/40 dark:bg-background/40 border border-border rounded-xl p-4 flex items-start gap-3">
                        <Info className="h-4 w-4 text-brand shrink-0 mt-0.5" />
                        <p className="text-xs text-muted-foreground">
                            This endpoint is only called when the initial MoMo transfer response returns <code className="font-mono bg-muted px-1 py-0.5 rounded">responseCode: "01OTP"</code>. This code signals that the transfer is pending OTP verification. The customer has received an OTP to their registered phone number and must submit it through your UI.
                        </p>
                    </div>

                    {/* Two-step authorization flow */}
                    <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-4">
                        <div className="flex items-center gap-2 mb-1">
                            <ArrowRight className="h-4 w-4 text-brand shrink-0" />
                            <h3 className="text-sm font-semibold text-foreground">Two-step authorization flow</h3>
                        </div>
                        <p className="text-xs text-muted-foreground mb-3">
                            Implement the following flow for Orange MoMo transfers that require OTP confirmation:
                        </p>
                        <div className="space-y-3">
                            {[
                                { step: "1", label: "Initiate transfer", detail: "Call the PayoutMomoTransfer endpoint. If the response returns responseCode: \"01OTP\", proceed to step 2. Save the returned transactionId." },
                                { step: "2", label: "Customer receives OTP", detail: "The customer receives a one-time password via SMS on their registered mobile number. OTPs are valid for approximately 3–5 minutes  prompt the customer to enter it immediately." },
                                { step: "3", label: "Customer enters OTP in your UI", detail: "Present an OTP input field in your interface. Do not store or log the OTP value." },
                                { step: "4", label: "Submit OTP confirmation", detail: "Call this endpoint with the transactionId from step 1 and the otp the customer entered. If the OTP is wrong or expired, the transaction is rejected and a new transfer must be initiated." },
                                { step: "5", label: "Await final status via webhook", detail: "After a successful OTP submission, the transfer proceeds asynchronously. The final SUCCESSFUL or FAILED status is delivered to your webhook endpoint." },
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

                    {/* OTP expiry warning */}
                    <div className="bg-muted/40 dark:bg-background/40 border border-border rounded-xl p-4 flex items-start gap-3">
                        <AlertTriangle className="h-4 w-4 text-brand shrink-0 mt-0.5" />
                        <p className="text-xs text-muted-foreground">
                            <strong className="text-foreground">OTP expiry:</strong> OTPs are typically valid for 3–5 minutes. If the customer does not submit their OTP within the validity window, the transaction will be rejected on confirmation and must be restarted from the initial transfer call. Display a countdown timer in your UI to prompt timely entry.
                        </p>
                    </div>
                </div>
            </section>

            {/* Endpoint + Tables */}
            <section className="space-y-6">
                <div className="flex flex-wrap items-center gap-2 px-4 py-3 bg-muted/30 dark:bg-card/50 border border-border rounded-2xl">
                    <span className="px-2 py-0.5 rounded text-xs font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400">POST</span>
                    <code className="text-xs text-muted-foreground break-all">
                        https://dev.mypasspoint.com/paypass/momo-app/confirm-payment
                    </code>
                </div>

                {/* Request Body Parameters */}
                <SectionCard title="Request Body Parameters">
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
                                {REQUEST_PARAMS.map((row) => (
                                    <tr key={row.name} className="hover:bg-muted/20 transition-colors">
                                        <td className="px-5 py-3.5">
                                            <span className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">{row.name}</span>
                                        </td>
                                        <td className="px-5 py-3.5 text-muted-foreground text-xs">{row.type}</td>
                                        <td className="px-5 py-3.5 text-muted-foreground text-sm">{row.description}</td>
                                        <td className="px-5 py-3.5 text-muted-foreground"></td>
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
                        <CheckCircle2 className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Code examples</h2>
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
                        <CodeBlock language="bash">{getCurlExample()}</CodeBlock>
                    </div>
                    <div>
                        <h4 className="text-sm font-medium text-foreground mb-3">Response</h4>
                        <CodeBlock language="json">{getResponseExample()}</CodeBlock>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default TransferConfirmMomoPayment;
