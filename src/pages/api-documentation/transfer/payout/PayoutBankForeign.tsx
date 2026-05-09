import {MapPin, CreditCard, Banknote, Zap, ArrowDownToLine, ArrowRightLeft, Globe, AlertTriangle} from "lucide-react";
import CodeBlock from "@/components/CodeBlock.tsx";

const PayoutBankForeign = () => {
    const getAvailableCountriesEndpointCode = () => {
        return `GET https://{{baseUrl}}/{{paymentContext}}/foreign-ft-app/country-list`;
    };

    const getAvailableCountriesQueryParamsCode = () => {
        return `{
  "region": "europe",
  "currency": "EUR",
  "payment_method": "wire",
  "limit": 50
}`;
    };

    const getAvailableCountriesResponseCode = () => {
        return `{
  "countries": [
    {
      "country_code": "GB",
      "country_name": "United Kingdom",
      "region": "europe",
      "currencies": ["GBP", "EUR", "USD"],
      "payment_methods": ["wire", "faster_payments", "sepa"],
      "processing_times": {
        "wire": "1-2 business days",
        "faster_payments": "instant",
        "sepa": "1 business day"
      },
      "compliance_level": "standard",
      "status": "active"
    }
  ],
  "total_countries": 247,
  "supported_currencies": 40
}`;
    };

    const getPaymentMethodsEndpointCode = () => {
        return `GET https://{{baseUrl}}/{{paymentContext}}/foreign-ft-app/available-payment-methods?countryCode=NG`;
    };

    const getPaymentMethodsQueryParamsCode = () => {
        return `{
  "country": "GB",
  "currency": "GBP",
  "amount": 1000.00
}`;
    };

    const getPaymentMethodsResponseCode = () => {
        return `{
  "payment_methods": [
    {
      "method_id": "wire_gbp",
      "name": "Wire Transfer",
      "type": "wire",
      "currency": "GBP",
      "processing_time": "1-2 business days",
      "fees": {
        "fixed_fee": 25.00,
        "percentage_fee": 0.0015,
        "total_estimated_fee": 26.50
      },
      "limits": {
        "min_amount": 1.00,
        "max_amount": 1000000.00
      },
      "required_fields": ["iban", "swift_code", "beneficiary_name"],
      "status": "active"
    }
  ]
}`;
    };

    const getInternationalTransferEndpointCode = () => {
        return `POST https://{{baseUrl}}/{{paymentContext}}/foreign-ft-app/make-payment/bank`;
    };

    const getInternationalTransferRequestBodyCode = () => {
        return `{
  "recipient": {
    "country": "GB",
    "currency": "GBP",
    "payment_method": "wire",
    "bank_details": {
      "iban": "GB29NWBK60161331926819",
      "swift_code": "NWBKGB2L",
      "account_holder_name": "John Smith",
      "bank_name": "NatWest Bank"
    },
    "address": {
      "street": "123 High Street",
      "city": "London",
      "postal_code": "SW1A 1AA",
      "country": "GB"
    }
  },
  "amount": 1000.00,
  "source_currency": "USD",
  "target_currency": "GBP",
  "purpose": "freelancer_payment",
  "description": "Website development services",
  "reference": "INV-2024-001",
  "callback_url": "https://yourapp.com/webhooks/payout"
}`;
    };

    const getInternationalTransferResponseCode = () => {
        return `{
  "transfer_id": "transfer_intl_abc123",
  "status": "pending_compliance",
  "recipient": {
    "country": "GB",
    "currency": "GBP",
    "bank_details": {
      "iban": "GB29****1331926819",
      "swift_code": "NWBKGB2L",
      "account_holder_name": "John Smith",
      "bank_name": "NatWest Bank"
    }
  },
  "amount": 1000.00,
  "source_currency": "USD",
  "target_currency": "GBP",
  "exchange_rate": 0.7850,
  "target_amount": 785.00,
  "fees": {
    "transfer_fee": 25.00,
    "fx_spread": 0.0025,
    "total_fees": 26.96
  },
  "compliance_checks": {
    "aml_status": "pending",
    "sanctions_check": "clear"
  },
  "estimated_delivery": "2024-01-17T16:00:00Z",
  "created_at": "2024-01-15T14:30:00Z"
}`;
    };

    return (
        <div className="py-8 sm:py-10 space-y-16">

            {/* Hero */}
            <section>
                <div className="inline-flex items-center gap-2 bg-brand-50 dark:bg-brand-950/40 text-brand text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
                    <Globe className="h-3.5 w-3.5" />
                    API Reference
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
                    International Bank Transfers
                </h1>
                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl">
                    Send money globally with multiple payment methods including wire transfers, ACH, RTP, FedNow, and local payment networks across 200+ countries and territories.
                </p>
            </section>

            {/* Get Available Countries */}
            <section>
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <MapPin className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Get available countries</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
                    Retrieve a comprehensive list of countries where international payouts are supported, including payment methods and processing times.
                </p>

                <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2 px-4 py-3 bg-muted/30 dark:bg-card/50 border border-border rounded-2xl">
                        <span className="px-2 py-0.5 rounded text-xs font-semibold bg-brand-50 text-brand dark:bg-brand-950/40 dark:text-brand/80">GET</span>
                        <code className="text-xs text-muted-foreground break-all">/foreign-ft-app/country-list</code>
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
                                    { param: "region", type: "string", desc: "Filter by region (e.g., europe, africa)" },
                                    { param: "currency", type: "string", desc: "Filter by supported currency code" },
                                    { param: "payment_method", type: "string", desc: "Filter by payment method (e.g., wire, sepa)" },
                                    { param: "limit", type: "number", desc: "Max results to return" },
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
                            <CodeBlock>{getAvailableCountriesEndpointCode()}</CodeBlock>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">Query parameters</h4>
                            <CodeBlock language="json">{getAvailableCountriesQueryParamsCode()}</CodeBlock>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">Response</h4>
                            <CodeBlock language="json">{getAvailableCountriesResponseCode()}</CodeBlock>
                        </div>
                    </div>
                </div>
            </section>

            {/* Get Payment Methods */}
            <section>
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <CreditCard className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Get payment methods</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
                    Get available payment methods for a specific country and currency combination with detailed fee structures and processing times.
                </p>

                <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2 px-4 py-3 bg-muted/30 dark:bg-card/50 border border-border rounded-2xl">
                        <span className="px-2 py-0.5 rounded text-xs font-semibold bg-brand-50 text-brand dark:bg-brand-950/40 dark:text-brand/80">GET</span>
                        <code className="text-xs text-muted-foreground break-all">/foreign-ft-app/available-payment-methods?countryCode=NG</code>
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
                                    { param: "country", type: "string", desc: "ISO 3166-1 alpha-2 country code" },
                                    { param: "currency", type: "string", desc: "Target currency code" },
                                    { param: "amount", type: "number", desc: "Transfer amount (for fee estimation)" },
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
                            <CodeBlock>{getPaymentMethodsEndpointCode()}</CodeBlock>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">Query parameters</h4>
                            <CodeBlock language="json">{getPaymentMethodsQueryParamsCode()}</CodeBlock>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">Response</h4>
                            <CodeBlock language="json">{getPaymentMethodsResponseCode()}</CodeBlock>
                        </div>
                    </div>
                </div>
            </section>

            {/* International Transfer */}
            <section>
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <Globe className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">International transfer</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
                    Execute international bank transfers with automatic currency conversion, compliance checks, and real-time status tracking.
                </p>

                <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2 px-4 py-3 bg-muted/30 dark:bg-card/50 border border-border rounded-2xl">
                        <span className="px-2 py-0.5 rounded text-xs font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400">POST</span>
                        <code className="text-xs text-muted-foreground break-all">/foreign-ft-app/make-payment/bank</code>
                    </div>

                    <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-5">
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">Endpoint</h4>
                            <CodeBlock>{getInternationalTransferEndpointCode()}</CodeBlock>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">Request body</h4>
                            <CodeBlock language="json">{getInternationalTransferRequestBodyCode()}</CodeBlock>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">Response</h4>
                            <CodeBlock language="json">{getInternationalTransferResponseCode()}</CodeBlock>
                        </div>
                    </div>
                </div>
            </section>

            {/* Supported Payment Methods */}
            <section>
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <Banknote className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Supported payment methods</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
                    Choose the payment method that best fits your use case and destination.
                </p>

                <div className="bg-white dark:bg-card border border-border rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                            <tr className="border-b border-border">
                                <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Method</th>
                                <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Type</th>
                                <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Speed</th>
                                <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Fee</th>
                                <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Coverage</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                            {[
                                { icon: <Banknote className="h-4 w-4 text-brand" />, method: "Wire Transfer", type: "Bank-to-bank", speed: "Instant - T+3", fee: "$5-7", coverage: "Global" },
                                { icon: <ArrowRightLeft className="h-4 w-4 text-brand" />, method: "ACH", type: "Automated clearing", speed: "Instant - T+1", fee: "$5", coverage: "US only" },
                                { icon: <Zap className="h-4 w-4 text-brand" />, method: "RTP", type: "Real-time payments", speed: "Instant", fee: "$5", coverage: "US real-time network" },
                                { icon: <ArrowDownToLine className="h-4 w-4 text-brand" />, method: "FedNow", type: "Federal Reserve", speed: "Instant", fee: "$5", coverage: "US Fed network" },
                            ].map(({ method, type, speed, fee, coverage }) => (
                                <tr key={method} className="hover:bg-muted/20 transition-colors">
                                    <td className="px-5 py-3.5 font-mono text-xs text-foreground">{method}</td>
                                    <td className="px-5 py-3.5 text-muted-foreground">{type}</td>
                                    <td className="px-5 py-3.5 text-muted-foreground">{speed}</td>
                                    <td className="px-5 py-3.5 text-muted-foreground">{fee}</td>
                                    <td className="px-5 py-3.5 text-muted-foreground">{coverage}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Compliance */}
            <section>
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <AlertTriangle className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Compliance requirements</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
                    International transfers are subject to additional compliance checks.
                </p>

                <div className="bg-white dark:bg-card border border-border rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                            <tr className="border-b border-border">
                                <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Requirement</th>
                                <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Details</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                            <tr className="hover:bg-muted/20 transition-colors">
                                <td className="px-5 py-3.5 font-mono text-xs text-foreground">High-Value Transfers</td>
                                <td className="px-5 py-3.5 text-muted-foreground">Transfers over $3,000 USD may require additional documentation and compliance review</td>
                            </tr>
                            <tr className="hover:bg-muted/20 transition-colors">
                                <td className="px-5 py-3.5 font-mono text-xs text-foreground">Sanctions Screening</td>
                                <td className="px-5 py-3.5 text-muted-foreground">All international transfers are screened against global sanctions lists</td>
                            </tr>
                            <tr className="hover:bg-muted/20 transition-colors">
                                <td className="px-5 py-3.5 font-mono text-xs text-foreground">Documentation</td>
                                <td className="px-5 py-3.5 text-muted-foreground">Purpose of payment and beneficiary information required for all international transfers</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PayoutBankForeign;
