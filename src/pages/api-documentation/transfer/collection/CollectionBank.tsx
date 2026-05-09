import {Building2, Shield, CreditCard, CheckCircle, Globe} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {Link} from "react-router-dom";
import CodeBlock from "@/components/CodeBlock.tsx";

const CollectionBank = () => {
    // Code block methods

    const getBankVerificationRequestBody = () => `{
  "account_holder_name": "John Doe",
  "account_number": "1234567890",
  "routing_number": "021000021",
  "account_type": "checking",
  "bank_name": "Chase Bank",
  "verification_method": "open_banking"
}`;

    const getBankVerificationResponse = () => `{
  "verification_id": "verify_bank_abc123",
  "status": "verified",
  "account_status": "active",
  "account_holder_match": "exact_match",
  "bank_details": {
    "bank_name": "JPMorgan Chase Bank",
    "routing_number": "021000021",
    "account_type": "checking",
    "account_number_last_4": "7890"
  },
  "capabilities": {
    "supports_ach": true,
    "supports_open_banking": true,
    "real_time_verification": true
  },
  "verified_at": "2024-01-15T14:30:00Z"
}`;


    const getPaymentRequestBody = () => `{
  "amount": 250.00,
  "currency": "USD",
  "description": "Monthly subscription payment",
  "customer": {
    "email": "john.doe@example.com",
    "name": "John Doe",
    "phone": "+1234567890"
  },
  "payment_methods": ["open_banking", "ach"],
  "expires_at": "2024-01-22T14:30:00Z",
  "return_url": "https://yourapp.com/payment/success",
  "webhook_url": "https://yourapp.com/webhooks/payment",
  "reference": "SUB-2024-001",
  "metadata": {
    "subscription_id": "sub_123",
    "customer_id": "cust_456"
  }
}`;

    const getPaymentRequestResponse = () => `{
  "payment_request_id": "preq_abc123def456",
  "status": "pending",
  "amount": 250.00,
  "currency": "USD",
  "payment_url": "https://pay.passpoint.com/preq_abc123def456",
  "expires_at": "2024-01-22T14:30:00Z",
  "available_payment_methods": [
    {
      "type": "open_banking",
      "banks": ["chase", "bofa", "wells_fargo"],
      "processing_time": "instant"
    },
    {
      "type": "ach",
      "processing_time": "1-3 business days"
    }
  ],
  "created_at": "2024-01-15T14:30:00Z"
}`;

    return (
        <div className="py-8 sm:py-10 space-y-16">
            {/* Hero */}
            <section>
                <div className="inline-flex items-center gap-2 bg-brand-50 dark:bg-brand-950/40 text-brand text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
                    <Building2 className="h-3.5 w-3.5" />
                    API Reference
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
                    Bank Collections
                </h1>
                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl">
                    Collect payments from bank accounts worldwide using Open Banking APIs and direct bank
                    connections. Support for real-time account verification, payment requests, and automated
                    settlement with comprehensive fraud protection.
                </p>
            </section>

            {/* Collection Methods Overview */}
            <section>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">Collection Methods</h2>
                <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">Choose from Open Banking or Direct Bank integrations based on your needs.</p>

                <div className="grid gap-6 md:grid-cols-2">
                    {/* Open Banking */}
                    <div className="bg-white dark:bg-card border border-border rounded-2xl p-6 lg:p-8">
                        <div className="flex items-center mb-4">
                            <Shield className="h-12 w-12 text-brand-500 mr-3"/>
                            <h3 className="md:text-xl text-lg font-semibold text-foreground">Open Banking</h3>
                        </div>
                        <p className="text-muted-foreground text-sm mb-4">
                            Secure bank-to-bank payments using Open Banking APIs with instant account
                            verification and real-time payment confirmation.
                        </p>
                        <div className="space-y-2 text-sm mb-6">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Processing Time:</span>
                                <span className="text-foreground">Instant - 2 hours</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Success Rate:</span>
                                <span className="text-foreground">98.5%</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Supported Regions:</span>
                                <span className="text-foreground">EU, UK, US</span>
                            </div>
                        </div>
                        <Link to="/collection/bank/open-banking">
                            <Button className="w-full">
                                View Open Banking Options
                            </Button>
                        </Link>
                    </div>

                    {/* Direct Bank Integration */}
                    <div className="bg-white dark:bg-card border border-border rounded-2xl p-6 lg:p-8">
                        <div className="flex items-center mb-4">
                            <Building2 className="h-12 w-12 text-brand mr-3"/>
                            <h3 className="md:text-xl text-lg font-semibold text-foreground">Direct Bank Options</h3>
                        </div>
                        <p className="text-muted-foreground text-sm mb-4">
                            Virtual account generation and direct bank integrations for automated collections
                            with ACH, SEPA, and local clearing systems.
                        </p>
                        <div className="space-y-2 text-sm mb-6">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Virtual Accounts:</span>
                                <span className="text-foreground">Unlimited</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Auto-Settlement:</span>
                                <span className="text-foreground">Real-time</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Currencies:</span>
                                <span className="text-foreground">USD, EUR, GBP, NGN</span>
                            </div>
                        </div>
                        <Link to="/collection/bank/direct">
                            <Button className="w-full">
                                View Direct Bank Options
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Account Verification */}
            <section>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">Account Verification</h2>
                <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">Verify bank account ownership before processing payments to reduce failed transactions and fraud.</p>

                <div className="bg-white dark:bg-card border border-border rounded-2xl overflow-hidden">
                    <div className="px-5 py-3.5 bg-muted/30 dark:bg-card/50 border-b border-border flex flex-wrap items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-xs font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400">POST</span>
                        <code className="text-xs text-muted-foreground break-all">/ft-app/account-enquiry</code>
                    </div>
                    <div className="p-5 sm:p-6 space-y-5">
                        <p className="text-muted-foreground leading-relaxed">
                            Verify customer bank account ownership and validity before processing payment
                            requests to reduce failed payments and fraud.
                        </p>

                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">Request Body</h4>
                            <CodeBlock language="json">{getBankVerificationRequestBody()}</CodeBlock>
                        </div>

                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">Response</h4>
                            <CodeBlock language="json">{getBankVerificationResponse()}</CodeBlock>
                        </div>
                    </div>
                </div>
            </section>

            {/* Collection Features */}
            <section>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">Collection Features</h2>
                <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">Industry-leading capabilities built into every bank collection.</p>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <div className="bg-white dark:bg-card border border-border rounded-2xl p-6 lg:p-8">
                        <CheckCircle className="h-8 w-8 text-brand mb-4"/>
                        <h3 className="text-base font-semibold text-foreground mb-3">Real-Time Verification</h3>
                        <p className="text-muted-foreground text-sm">
                            Instantly verify bank account ownership and balance availability before processing
                            payment requests.
                        </p>
                    </div>

                    <div className="bg-white dark:bg-card border border-border rounded-2xl p-6 lg:p-8">
                        <Building2 className="h-8 w-8 text-brand-500 mb-4"/>
                        <h3 className="text-base font-semibold text-foreground mb-3">Auto Reconciliation</h3>
                        <p className="text-muted-foreground text-sm">
                            Automatically match incoming payments to invoices and customer accounts with
                            transaction references.
                        </p>
                    </div>

                    <div className="bg-white dark:bg-card border border-border rounded-2xl p-6 lg:p-8">
                        <Globe className="h-8 w-8 text-foreground mb-4"/>
                        <h3 className="text-base font-semibold text-foreground mb-3">Multi-Currency</h3>
                        <p className="text-muted-foreground text-sm">
                            Collect payments in multiple currencies with automatic conversion and competitive
                            exchange rates.
                        </p>
                    </div>

                    <div className="bg-white dark:bg-card border border-border rounded-2xl p-6 lg:p-8">
                        <Shield className="h-8 w-8 text-destructive mb-4"/>
                        <h3 className="text-base font-semibold text-foreground mb-3">Fraud Protection</h3>
                        <p className="text-muted-foreground text-sm">
                            Advanced machine learning algorithms detect suspicious patterns and prevent
                            fraudulent transactions.
                        </p>
                    </div>

                    <div className="bg-white dark:bg-card border border-border rounded-2xl p-6 lg:p-8">
                        <CreditCard className="h-8 w-8 text-foreground mb-4"/>
                        <h3 className="text-base font-semibold text-foreground mb-3">Instant Notifications</h3>
                        <p className="text-muted-foreground text-sm">
                            Real-time webhooks and notifications for payment confirmations, failures, and status
                            updates.
                        </p>
                    </div>

                    <div className="bg-white dark:bg-card border border-border rounded-2xl p-6 lg:p-8">
                        <CheckCircle className="h-8 w-8 text-teal-500 mb-4"/>
                        <h3 className="text-base font-semibold text-foreground mb-3">Compliance Ready</h3>
                        <p className="text-muted-foreground text-sm">
                            Built-in AML, KYC, and regulatory compliance for all supported jurisdictions and
                            payment methods.
                        </p>
                    </div>
                </div>
            </section>

            {/* Payment Request Flow */}
            <section>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">Payment Request Flow</h2>
                <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">Create secure payment requests customers can fulfill using their preferred bank account.</p>

                <div className="bg-white dark:bg-card border border-border rounded-2xl overflow-hidden">
                    <div className="px-5 py-3.5 bg-muted/30 dark:bg-card/50 border-b border-border flex flex-wrap items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-xs font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400">POST</span>
                        <code className="text-xs text-muted-foreground break-all">/foreign-ft-app/request-payment</code>
                    </div>
                    <div className="p-5 sm:p-6 space-y-5">
                        <p className="text-muted-foreground leading-relaxed">
                            Create secure payment requests that customers can fulfill using their preferred
                            bank account with optional tokenization for recurring payments.
                        </p>

                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">Request Body</h4>
                            <CodeBlock language="json">{getPaymentRequestBody()}</CodeBlock>
                        </div>

                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">Response</h4>
                            <CodeBlock language="json">{getPaymentRequestResponse()}</CodeBlock>
                        </div>
                    </div>
                </div>
            </section>

            {/* Success Rates by Method */}
            <section>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">Success Rates by Method</h2>
                <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">Industry-leading success rates with advanced fraud detection and real-time verification.</p>

                <div className="bg-white dark:bg-card border border-border rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                            <tr className="border-b border-border bg-muted/30">
                                <th className="px-5 py-3.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Payment Method</th>
                                <th className="px-5 py-3.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Success Rate</th>
                                <th className="px-5 py-3.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Processing Time</th>
                                <th className="px-5 py-3.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Typical Fee</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                            <tr className="hover:bg-muted/20 transition-colors">
                                <td className="px-5 py-3.5 font-mono text-xs text-foreground">Open Banking</td>
                                <td className="px-5 py-3.5 text-sm text-muted-foreground">98.5%</td>
                                <td className="px-5 py-3.5 text-sm text-muted-foreground">Instant - 2 hours</td>
                                <td className="px-5 py-3.5 text-sm text-muted-foreground">0.5% + $0.25</td>
                            </tr>
                            <tr className="hover:bg-muted/20 transition-colors">
                                <td className="px-5 py-3.5 font-mono text-xs text-foreground">ACH Direct Debit</td>
                                <td className="px-5 py-3.5 text-sm text-muted-foreground">92.3%</td>
                                <td className="px-5 py-3.5 text-sm text-muted-foreground">1-3 business days</td>
                                <td className="px-5 py-3.5 text-sm text-muted-foreground">1.0% + $0.30</td>
                            </tr>
                            <tr className="hover:bg-muted/20 transition-colors">
                                <td className="px-5 py-3.5 font-mono text-xs text-foreground">SEPA Direct Debit</td>
                                <td className="px-5 py-3.5 text-sm text-muted-foreground">94.7%</td>
                                <td className="px-5 py-3.5 text-sm text-muted-foreground">1-2 business days</td>
                                <td className="px-5 py-3.5 text-sm text-muted-foreground">0.8% + €0.35</td>
                            </tr>
                            <tr className="hover:bg-muted/20 transition-colors">
                                <td className="px-5 py-3.5 font-mono text-xs text-foreground">Virtual Accounts</td>
                                <td className="px-5 py-3.5 text-sm text-muted-foreground">99.1%</td>
                                <td className="px-5 py-3.5 text-sm text-muted-foreground">Real-time</td>
                                <td className="px-5 py-3.5 text-sm text-muted-foreground">0.3% + $0.15</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Compliance & Security */}
            <section>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">Compliance & Security</h2>
                <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">All bank collections are subject to regional banking regulations, Open Banking standards, and consumer protection laws.</p>

                <div className="grid gap-6 md:grid-cols-2">
                    <div className="bg-white dark:bg-card border border-border rounded-2xl p-6 lg:p-8">
                        <Shield className="h-8 w-8 text-brand-500 mb-4"/>
                        <h3 className="text-base font-semibold text-foreground mb-3">Data Protection</h3>
                        <p className="text-muted-foreground text-sm mb-4">
                            Bank-grade security with PSD2 compliance, Strong Customer Authentication (SCA), and
                            encrypted data transmission.
                        </p>
                        <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• PCI DSS Level 1 certified</li>
                            <li>• 256-bit SSL encryption</li>
                            <li>• GDPR compliant data handling</li>
                        </ul>
                    </div>

                    <div className="bg-white dark:bg-card border border-border rounded-2xl p-6 lg:p-8">
                        <CheckCircle className="h-8 w-8 text-brand mb-4"/>
                        <h3 className="text-base font-semibold text-foreground mb-3">Regulatory Compliance</h3>
                        <p className="text-muted-foreground text-sm mb-4">
                            Licensed and regulated in all operating jurisdictions with full compliance to local
                            banking and payment regulations.
                        </p>
                        <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• FCA regulated (UK)</li>
                            <li>• PSD2 licensed (EU)</li>
                            <li>• Money transmitter licenses (US)</li>
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CollectionBank;
