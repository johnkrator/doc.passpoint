import {Globe} from "lucide-react";
import CodeBlock from "@/components/CodeBlock.tsx";

const CollectionBankOpenBanking = () => {
    const getBanksEndpoint = () => `GET https://{{baseUrl}}/{{paymentContext}}/foreign-ft-app/retrieve-bank-list`;

    const getBanksParams = () => `{
  "country": "GB",
  "supports_instant_payments": true,
  "supports_recurring": true,
  "limit": 50
}`;

    const getBanksResponse = () => `{
  "banks": [
    {
      "bank_id": "gb_hsbc",
      "name": "HSBC UK",
      "country": "GB",
      "logo_url": "https://cdn.passpoint.com/banks/hsbc-logo.png",
      "capabilities": {
        "instant_payments": true,
        "recurring_payments": true,
        "refunds": true,
        "balance_inquiry": true
      },
      "processing_times": {
        "instant": "0-10 seconds",
        "standard": "1-2 hours"
      },
      "success_rate": 98.7,
      "status": "active"
    },
    {
      "bank_id": "gb_lloyds",
      "name": "Lloyds Bank",
      "country": "GB",
      "logo_url": "https://cdn.passpoint.com/banks/lloyds-logo.png",
      "capabilities": {
        "instant_payments": true,
        "recurring_payments": false,
        "refunds": true,
        "balance_inquiry": true
      },
      "processing_times": {
        "instant": "0-15 seconds",
        "standard": "1-3 hours"
      },
      "success_rate": 97.2,
      "status": "active"
    }
  ],
  "total_banks": 147,
  "supported_countries": ["GB", "IE", "DE", "FR", "NL", "ES"]
}`;

    const getPaymentRequestEndpoint = () => `POST https://{{baseUrl}}/{{paymentContext}}/foreign-ft-app/request-payment`;

    const getPaymentRequestBody = () => `{
  "amount": 150.00,
  "currency": "GBP",
  "description": "Monthly subscription payment",
  "customer": {
    "email": "customer@example.com",
    "name": "John Smith",
    "phone": "+447700900123"
  },
  "bank_id": "gb_hsbc",
  "payment_reference": "SUB-2024-003",
  "return_url": "https://yourapp.com/payment/success",
  "webhook_url": "https://yourapp.com/webhooks/open-banking",
  "expires_at": "2024-01-22T14:30:00Z",
  "metadata": {
    "customer_id": "cust_789",
    "subscription_plan": "premium"
  }
}`;

    const getPaymentRequestResponse = () => `{
  "payment_request_id": "preq_ob_abc123",
  "status": "pending_authorization",
  "amount": 150.00,
  "currency": "GBP",
  "bank": {
    "bank_id": "gb_hsbc",
    "name": "HSBC UK"
  },
  "authorization_url": "https://banking.hsbc.co.uk/openbanking/authorize?token=xyz789",
  "expires_at": "2024-01-22T14:30:00Z",
  "created_at": "2024-01-15T14:30:00Z"
}`;

    const getTokenizedPaymentEndpoint = () => `POST https://{{baseUrl}}/{{paymentContext}}/foreign-ft-app/request-payment`;

    const getTokenizedPaymentBody = () => `{
  "amount": 75.00,
  "currency": "EUR",
  "description": "Weekly service payment",
  "customer_token": "token_cust_abc123",
  "bank_token": "bank_token_hsbc_456",
  "payment_reference": "WEEKLY-2024-012",
  "webhook_url": "https://yourapp.com/webhooks/recurring",
  "metadata": {
    "service_period": "2024-01-15_to_2024-01-21",
    "auto_renewal": true
  }
}`;

    const getTokenizedPaymentResponse = () => `{
  "payment_request_id": "preq_token_def456",
  "status": "processing",
  "amount": 75.00,
  "currency": "EUR",
  "estimated_completion": "2024-01-15T14:32:00Z",
  "customer": {
    "name": "John Smith",
    "customer_token": "token_cust_abc123"
  },
  "bank": {
    "bank_id": "gb_hsbc",
    "name": "HSBC UK"
  },
  "created_at": "2024-01-15T14:30:00Z"
}`;

    const getOnboardAndPayEndpoint = () => `POST https://{{baseUrl}}/{{paymentContext}}/foreign-ft-app/request-payment`;

    const getOnboardAndPayBody = () => `{
  "customer": {
    "first_name": "Sarah",
    "last_name": "Johnson",
    "email": "sarah.johnson@example.com",
    "phone": "+447700900456",
    "address": {
      "line1": "123 High Street",
      "city": "London",
      "postal_code": "SW1A 1AA",
      "country": "GB"
    }
  },
  "payment": {
    "amount": 299.99,
    "currency": "GBP",
    "description": "First-time purchase + setup",
    "reference": "ONBOARD-2024-001"
  },
  "bank_preference": {
    "country": "GB",
    "instant_payment_preferred": true
  },
  "tokenization": {
    "enabled": true,
    "purpose": "recurring_subscriptions",
    "max_amount_per_payment": 500.00,
    "frequency": "monthly"
  },
  "return_url": "https://yourapp.com/onboarding/complete",
  "webhook_url": "https://yourapp.com/webhooks/onboarding"
}`;

    const getOnboardAndPayResponse = () => `{
  "onboarding_id": "onboard_ghi789",
  "customer_id": "cust_new_012",
  "payment_request_id": "preq_onboard_345",
  "status": "pending_bank_selection",
  "customer_token": "token_cust_new_012",
  "onboarding_url": "https://pay.passpoint.com/onboard/ghi789",
  "available_banks": [
    {
      "bank_id": "gb_hsbc",
      "name": "HSBC UK",
      "supports_instant": true
    },
    {
      "bank_id": "gb_lloyds",
      "name": "Lloyds Bank",
      "supports_instant": true
    }
  ],
  "expires_at": "2024-01-16T14:30:00Z",
  "created_at": "2024-01-15T14:30:00Z"
}`;

    return (
        <div className="py-8 sm:py-10 space-y-16">

            {/* Hero */}
            <section>
                <div className="inline-flex items-center gap-2 bg-brand-50 dark:bg-brand-950/40 text-brand text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
                    <Globe className="h-3.5 w-3.5" />
                    API Reference
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
                    Open Banking Collections
                </h1>
                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl">
                    Secure bank-to-bank payments using Open Banking APIs with instant account verification,
                    real-time payment confirmation, and optional tokenization for recurring payments across EU, UK, and US markets.
                </p>
            </section>

            {/* Get Supported Banks */}
            <section>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">Get Supported Banks</h2>
                <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
                    Retrieve a comprehensive list of banks that support Open Banking payments.
                </p>
                <div className="bg-white dark:bg-card border border-border rounded-2xl overflow-hidden">
                    <div className="px-5 py-3.5 bg-muted/30 dark:bg-card/50 border-b border-border flex flex-wrap items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-xs font-semibold bg-brand-50 text-brand dark:bg-brand-950/40 dark:text-brand/80">GET</span>
                        <code className="text-xs text-muted-foreground break-all">/foreign-ft-app/retrieve-bank-list</code>
                    </div>
                    <div className="p-5 sm:p-6 space-y-5">
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">Endpoint</h4>
                            <CodeBlock>{getBanksEndpoint()}</CodeBlock>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">Query Parameters</h4>
                            <CodeBlock language="json">{getBanksParams()}</CodeBlock>
                        </div>
                        <div>
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-brand-50 text-brand dark:bg-brand-950/40 dark:text-brand/80 mb-3">200 OK</span>
                            <CodeBlock language="json">{getBanksResponse()}</CodeBlock>
                        </div>
                    </div>
                </div>
            </section>

            {/* Create Payment Request */}
            <section>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">Create Payment Request</h2>
                <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
                    Create a secure Open Banking payment request with bank selection and customer authorization flow.
                </p>
                <div className="bg-white dark:bg-card border border-border rounded-2xl overflow-hidden">
                    <div className="px-5 py-3.5 bg-muted/30 dark:bg-card/50 border-b border-border flex flex-wrap items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-xs font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400">POST</span>
                        <code className="text-xs text-muted-foreground break-all">/foreign-ft-app/request-payment</code>
                    </div>
                    <div className="p-5 sm:p-6 space-y-5">
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">Endpoint</h4>
                            <CodeBlock>{getPaymentRequestEndpoint()}</CodeBlock>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">Request Body</h4>
                            <CodeBlock language="json">{getPaymentRequestBody()}</CodeBlock>
                        </div>
                        <div>
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-brand-50 text-brand dark:bg-brand-950/40 dark:text-brand/80 mb-3">200 OK</span>
                            <CodeBlock language="json">{getPaymentRequestResponse()}</CodeBlock>
                        </div>
                    </div>
                </div>
            </section>

            {/* Tokenized Payments */}
            <section>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">Tokenized Payments</h2>
                <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
                    Process payments using previously authorized customer and bank tokens for seamless recurring payments.
                </p>
                <div className="bg-white dark:bg-card border border-border rounded-2xl overflow-hidden">
                    <div className="px-5 py-3.5 bg-muted/30 dark:bg-card/50 border-b border-border flex flex-wrap items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-xs font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400">POST</span>
                        <code className="text-xs text-muted-foreground break-all">/foreign-ft-app/request-payment</code>
                    </div>
                    <div className="p-5 sm:p-6 space-y-5">
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">Endpoint</h4>
                            <CodeBlock>{getTokenizedPaymentEndpoint()}</CodeBlock>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">Request Body</h4>
                            <CodeBlock language="json">{getTokenizedPaymentBody()}</CodeBlock>
                        </div>
                        <div>
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-brand-50 text-brand dark:bg-brand-950/40 dark:text-brand/80 mb-3">200 OK</span>
                            <CodeBlock language="json">{getTokenizedPaymentResponse()}</CodeBlock>
                        </div>
                    </div>
                </div>
            </section>

            {/* Onboard and Pay */}
            <section>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">Onboard and Pay</h2>
                <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
                    Streamlined customer onboarding with immediate payment processing and optional tokenization for future transactions.
                </p>
                <div className="bg-white dark:bg-card border border-border rounded-2xl overflow-hidden">
                    <div className="px-5 py-3.5 bg-muted/30 dark:bg-card/50 border-b border-border flex flex-wrap items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-xs font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400">POST</span>
                        <code className="text-xs text-muted-foreground break-all">/foreign-ft-app/request-payment</code>
                    </div>
                    <div className="p-5 sm:p-6 space-y-5">
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">Endpoint</h4>
                            <CodeBlock>{getOnboardAndPayEndpoint()}</CodeBlock>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">Request Body</h4>
                            <CodeBlock language="json">{getOnboardAndPayBody()}</CodeBlock>
                        </div>
                        <div>
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-brand-50 text-brand dark:bg-brand-950/40 dark:text-brand/80 mb-3">200 OK</span>
                            <CodeBlock language="json">{getOnboardAndPayResponse()}</CodeBlock>
                        </div>
                    </div>
                </div>
            </section>

            {/* Open Banking Benefits */}
            <section>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">Open Banking Benefits</h2>
                <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">Key advantages of using Open Banking for payment collection.</p>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <div className="bg-white dark:bg-card border border-border rounded-2xl p-6">
                        <h3 className="text-base font-semibold text-foreground mb-2">Instant Verification</h3>
                        <p className="text-sm text-muted-foreground">Real-time account verification and balance checks prevent failed payments and reduce fraud.</p>
                    </div>
                    <div className="bg-white dark:bg-card border border-border rounded-2xl p-6">
                        <h3 className="text-base font-semibold text-foreground mb-2">98.5% Success Rate</h3>
                        <p className="text-sm text-muted-foreground">Industry-leading success rates with secure bank-grade authentication and processing.</p>
                    </div>
                    <div className="bg-white dark:bg-card border border-border rounded-2xl p-6">
                        <h3 className="text-base font-semibold text-foreground mb-2">Lower Costs</h3>
                        <p className="text-sm text-muted-foreground">Reduced processing fees compared to card payments with transparent, predictable pricing.</p>
                    </div>
                    <div className="bg-white dark:bg-card border border-border rounded-2xl p-6">
                        <h3 className="text-base font-semibold text-foreground mb-2">Faster Settlement</h3>
                        <p className="text-sm text-muted-foreground">Same-day settlement with instant payment confirmation and reduced settlement risk.</p>
                    </div>
                    <div className="bg-white dark:bg-card border border-border rounded-2xl p-6">
                        <h3 className="text-base font-semibold text-foreground mb-2">Enhanced Security</h3>
                        <p className="text-sm text-muted-foreground">Strong Customer Authentication (SCA) and PSD2 compliance provide maximum security.</p>
                    </div>
                    <div className="bg-white dark:bg-card border border-border rounded-2xl p-6">
                        <h3 className="text-base font-semibold text-foreground mb-2">No Chargebacks</h3>
                        <p className="text-sm text-muted-foreground">Irreversible payments eliminate chargeback risk and associated fees for merchants.</p>
                    </div>
                </div>
            </section>

            {/* Supported Regions */}
            <section>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">Supported Regions</h2>
                <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">Open Banking payments supported across EU, UK, and US markets with over 2,500 connected banks.</p>

                <div className="rounded-2xl overflow-hidden border border-border">
                    <table className="w-full text-sm">
                        <thead>
                        <tr className="border-b border-border bg-muted/30">
                            <th className="px-5 py-3.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Region</th>
                            <th className="px-5 py-3.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Connected Banks</th>
                            <th className="px-5 py-3.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Regulation</th>
                            <th className="px-5 py-3.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Processing Time</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                        <tr className="hover:bg-muted/20 transition-colors">
                            <td className="px-5 py-3.5 font-mono text-xs text-foreground">United Kingdom</td>
                            <td className="px-5 py-3.5 text-sm text-muted-foreground">147 banks</td>
                            <td className="px-5 py-3.5 text-sm text-muted-foreground">PSD2, FCA</td>
                            <td className="px-5 py-3.5 text-sm text-muted-foreground">Instant – 2 hours</td>
                        </tr>
                        <tr className="hover:bg-muted/20 transition-colors">
                            <td className="px-5 py-3.5 font-mono text-xs text-foreground">European Union</td>
                            <td className="px-5 py-3.5 text-sm text-muted-foreground">1,847 banks</td>
                            <td className="px-5 py-3.5 text-sm text-muted-foreground">PSD2, EBA</td>
                            <td className="px-5 py-3.5 text-sm text-muted-foreground">Instant – 1 hour</td>
                        </tr>
                        <tr className="hover:bg-muted/20 transition-colors">
                            <td className="px-5 py-3.5 font-mono text-xs text-foreground">United States</td>
                            <td className="px-5 py-3.5 text-sm text-muted-foreground">587 banks</td>
                            <td className="px-5 py-3.5 text-sm text-muted-foreground">FedNow, RTP</td>
                            <td className="px-5 py-3.5 text-sm text-muted-foreground">Instant – 30 mins</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Compliance */}
            <section>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">Compliance & Regulation</h2>
                <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">Open Banking payments must comply with Strong Customer Authentication requirements and regional regulations.</p>

                <div className="grid gap-4 md:grid-cols-2">
                    <div className="bg-white dark:bg-card border border-border rounded-2xl p-6">
                        <h3 className="text-base font-semibold text-foreground mb-3">PSD2 Compliance</h3>
                        <p className="text-sm text-muted-foreground mb-4">Fully compliant with PSD2 regulations across all EU markets with licensed PISP status.</p>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li className="flex items-start gap-2"><span className="text-brand mt-0.5">•</span><span>Licensed Payment Institution</span></li>
                            <li className="flex items-start gap-2"><span className="text-brand mt-0.5">•</span><span>Strong Customer Authentication</span></li>
                            <li className="flex items-start gap-2"><span className="text-brand mt-0.5">•</span><span>Data protection compliant</span></li>
                        </ul>
                    </div>
                    <div className="bg-white dark:bg-card border border-border rounded-2xl p-6">
                        <h3 className="text-base font-semibold text-foreground mb-3">Security Standards</h3>
                        <p className="text-sm text-muted-foreground mb-4">Bank-grade security with end-to-end encryption and certified security standards.</p>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li className="flex items-start gap-2"><span className="text-brand mt-0.5">•</span><span>PCI DSS Level 1</span></li>
                            <li className="flex items-start gap-2"><span className="text-brand mt-0.5">•</span><span>ISO 27001 certified</span></li>
                            <li className="flex items-start gap-2"><span className="text-brand mt-0.5">•</span><span>SOC 2 Type II compliant</span></li>
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CollectionBankOpenBanking;
