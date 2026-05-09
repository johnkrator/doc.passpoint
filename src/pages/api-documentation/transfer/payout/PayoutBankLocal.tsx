import {Building2, ArrowRightLeft, CheckCircle} from "lucide-react";
import CodeBlock from "@/components/CodeBlock.tsx";

const PayoutBankLocal = () => {
    const getBanksEndpointCode = () => {
        return `GET https://{{baseUrl}}/{{paymentContext}}/ft-app/bank-list/NG`;
    };

    const getBanksQueryParamsCode = () => {
        return `{
  "country": "US",
  "state": "NY",
  "supports_ach": true,
  "supports_wire": true,
  "limit": 100,
  "offset": 0
}`;
    };

    const getBanksResponseCode = () => {
        return `{
  "banks": [
    {
      "bank_id": "bank_chase_us",
      "name": "JPMorgan Chase Bank",
      "routing_number": "021000021",
      "country": "US",
      "state": "NY",
      "capabilities": {
        "ach_same_day": true,
        "ach_next_day": true,
        "wire_domestic": true,
        "rtp": true
      },
      "processing_times": {
        "ach_same_day": "4-6 hours",
        "ach_next_day": "1 business day",
        "wire": "2-4 hours"
      },
      "fees": {
        "ach": 5.00,
        "wire": 7.00
      },
      "status": "active"
    }
  ],
  "total_count": 8547,
  "has_more": true
}`;
    };

    const getAccountEnquiryEndpointCode = () => {
        return `POST https://{{baseUrl}}/{{paymentContext}}/ft-app/account-enquiry`;
    };

    const getAccountEnquiryRequestBodyCode = () => {
        return `{
  "account_number": "1234567890",
  "routing_number": "021000021",
  "account_type": "checking",
  "account_holder_name": "John Doe"
}`;
    };

    const getAccountEnquiryResponseCode = () => {
        return `{
  "verification_id": "verify_abc123",
  "status": "verified",
  "account_details": {
    "account_number": "****7890",
    "routing_number": "021000021",
    "account_type": "checking",
    "account_holder_name": "John Doe",
    "bank_name": "JPMorgan Chase Bank"
  },
  "verification_methods": ["micro_deposits", "instant_verification"],
  "verified_at": "2024-01-15T14:30:00Z"
}`;
    };

    const getLocalTransferEndpointCode = () => {
        return `POST https://{{baseUrl}}/{{paymentContext}}/ft-app/account-transfer`;
    };

    const getLocalTransferRequestBodyCode = () => {
        return `{
  "recipient": {
    "account_number": "1234567890",
    "routing_number": "021000021",
    "account_type": "checking",
    "account_holder_name": "John Doe"
  },
  "amount": 1500.00,
  "currency": "USD",
  "transfer_method": "ach_same_day",
  "description": "Freelancer payment",
  "reference": "invoice_12345",
  "callback_url": "https://yourapp.com/webhooks/payout"
}`;
    };

    const getLocalTransferResponseCode = () => {
        return `{
  "transfer_id": "transfer_local_abc123",
  "status": "processing",
  "recipient": {
    "account_number": "****7890",
    "routing_number": "021000021",
    "account_holder_name": "John Doe",
    "bank_name": "JPMorgan Chase Bank"
  },
  "amount": 1500.00,
  "currency": "USD",
  "transfer_method": "ach_same_day",
  "fees": {
    "processing_fee": 5.00,
    "total_fees": 1.50
  },
  "estimated_delivery": "2024-01-15T20:00:00Z",
  "created_at": "2024-01-15T14:30:00Z"
}`;
    };

    return (
        <div className="py-8 sm:py-10 space-y-16">

            {/* Hero */}
            <section>
                <div className="inline-flex items-center gap-2 bg-brand-50 dark:bg-brand-950/40 text-brand text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
                    <Building2 className="h-3.5 w-3.5" />
                    API Reference
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
                    Local Bank Transfers
                </h1>
                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl">
                    Process domestic bank transfers with same-day ACH, wire transfers, and real-time payment networks. Lower fees and faster processing for domestic recipients.
                </p>
            </section>

            {/* Get Supported Banks */}
            <section>
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <Building2 className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Get supported banks</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
                    Retrieve a list of supported domestic banks with their routing numbers, processing capabilities, and current status.
                </p>

                <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2 px-4 py-3 bg-muted/30 dark:bg-card/50 border border-border rounded-2xl">
                        <span className="px-2 py-0.5 rounded text-xs font-semibold bg-brand-50 text-brand dark:bg-brand-950/40 dark:text-brand/80">GET</span>
                        <code className="text-xs text-muted-foreground break-all">/ft-app/bank-list/NG</code>
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
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Type</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Description</th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                {[
                                    { param: "country", type: "string", desc: "ISO country code (e.g., US)" },
                                    { param: "state", type: "string", desc: "State/province filter" },
                                    { param: "supports_ach", type: "boolean", desc: "Filter banks that support ACH" },
                                    { param: "supports_wire", type: "boolean", desc: "Filter banks that support wire" },
                                    { param: "limit", type: "number", desc: "Max results per page" },
                                    { param: "offset", type: "number", desc: "Pagination offset" },
                                ].map(({ param, type, desc }) => (
                                    <tr key={param} className="hover:bg-muted/20 transition-colors">
                                        <td className="px-5 py-3.5 font-mono text-xs text-foreground">{param}</td>
                                        <td className="px-5 py-3.5 text-muted-foreground">{type}</td>
                                        <td className="px-5 py-3.5 text-muted-foreground">{desc}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-5">
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">Endpoint</h4>
                            <CodeBlock>{getBanksEndpointCode()}</CodeBlock>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">Query parameters</h4>
                            <CodeBlock language="json">{getBanksQueryParamsCode()}</CodeBlock>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">Response</h4>
                            <CodeBlock language="json">{getBanksResponseCode()}</CodeBlock>
                        </div>
                    </div>
                </div>
            </section>

            {/* Account Enquiry */}
            <section>
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <CheckCircle className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Account enquiry</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
                    Verify bank account ownership and validity before processing transfers to reduce failed payments and fraud.
                </p>

                <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2 px-4 py-3 bg-muted/30 dark:bg-card/50 border border-border rounded-2xl">
                        <span className="px-2 py-0.5 rounded text-xs font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400">POST</span>
                        <code className="text-xs text-muted-foreground break-all">/ft-app/account-enquiry</code>
                    </div>

                    <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-5">
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">Endpoint</h4>
                            <CodeBlock>{getAccountEnquiryEndpointCode()}</CodeBlock>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">Request body</h4>
                            <CodeBlock language="json">{getAccountEnquiryRequestBodyCode()}</CodeBlock>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">Response</h4>
                            <CodeBlock language="json">{getAccountEnquiryResponseCode()}</CodeBlock>
                        </div>
                    </div>
                </div>
            </section>

            {/* Local Bank Transfer */}
            <section>
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <ArrowRightLeft className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Local bank transfer</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
                    Execute domestic bank transfers with same-day ACH, next-day ACH, or wire transfer options based on urgency and cost preferences.
                </p>

                <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2 px-4 py-3 bg-muted/30 dark:bg-card/50 border border-border rounded-2xl">
                        <span className="px-2 py-0.5 rounded text-xs font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400">POST</span>
                        <code className="text-xs text-muted-foreground break-all">/ft-app/account-transfer</code>
                    </div>

                    <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-5">
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">Endpoint</h4>
                            <CodeBlock>{getLocalTransferEndpointCode()}</CodeBlock>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">Request body</h4>
                            <CodeBlock language="json">{getLocalTransferRequestBodyCode()}</CodeBlock>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">Response</h4>
                            <CodeBlock language="json">{getLocalTransferResponseCode()}</CodeBlock>
                        </div>
                    </div>
                </div>
            </section>

            {/* Transfer Methods Comparison */}
            <section>
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <ArrowRightLeft className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Transfer methods comparison</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
                    Select the right transfer method based on speed and cost requirements.
                </p>

                <div className="bg-white dark:bg-card border border-border rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                            <tr className="border-b border-border">
                                <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Method</th>
                                <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Processing Time</th>
                                <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Fee</th>
                                <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Limit</th>
                                <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Best For</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                            <tr className="hover:bg-muted/20 transition-colors">
                                <td className="px-5 py-3.5 font-mono text-xs text-foreground">ACH Same-Day</td>
                                <td className="px-5 py-3.5 text-muted-foreground">4-6 hours</td>
                                <td className="px-5 py-3.5 text-muted-foreground">$5</td>
                                <td className="px-5 py-3.5 text-muted-foreground">Varies by corridor</td>
                                <td className="px-5 py-3.5 text-muted-foreground">Urgent payroll</td>
                            </tr>
                            <tr className="hover:bg-muted/20 transition-colors">
                                <td className="px-5 py-3.5 font-mono text-xs text-foreground">ACH Next-Day</td>
                                <td className="px-5 py-3.5 text-muted-foreground">1 business day</td>
                                <td className="px-5 py-3.5 text-muted-foreground">$5</td>
                                <td className="px-5 py-3.5 text-muted-foreground">Varies by corridor</td>
                                <td className="px-5 py-3.5 text-muted-foreground">Regular payments</td>
                            </tr>
                            <tr className="hover:bg-muted/20 transition-colors">
                                <td className="px-5 py-3.5 font-mono text-xs text-foreground">Wire Transfer</td>
                                <td className="px-5 py-3.5 text-muted-foreground">2-4 hours</td>
                                <td className="px-5 py-3.5 text-muted-foreground">$7</td>
                                <td className="px-5 py-3.5 text-muted-foreground">Varies by corridor</td>
                                <td className="px-5 py-3.5 text-muted-foreground">High-value transfers</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PayoutBankLocal;
