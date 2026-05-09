import {MapPin, Globe, Shield, CheckCircle, AlertTriangle} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {Link} from "react-router-dom";
import CodeBlock from "@/components/CodeBlock.tsx";

const PayoutBank = () => {
    const getVerifyBankAccountEndpointCode = () => {
        return `POST https://{{baseUrl}}/{{paymentContext}}/ft-app/account-enquiry`;
    };

    const getVerifyBankAccountRequestBodyCode = () => {
        return `{
  "account_number": "1234567890",
  "routing_number": "021000021",
  "account_type": "checking",
  "account_holder_name": "John Doe",
  "verification_method": "instant"
}`;
    };

    const getVerifyBankAccountResponseCode = () => {
        return `{
  "verification_id": "verify_abc123",
  "status": "verified",
  "account_details": {
    "account_number": "****7890",
    "routing_number": "021000021",
    "account_type": "checking",
    "account_holder_name": "John Doe",
    "bank_name": "JPMorgan Chase Bank",
    "bank_address": "New York, NY"
  },
  "verification_method": "instant",
  "verified_at": "2024-01-15T14:30:00Z"
}`;
    };

    return (
        <div className="py-8 sm:py-10 space-y-16">

            {/* Hero */}
            <section>
                <div className="inline-flex items-center gap-2 bg-brand-50 dark:bg-brand-950/40 text-brand text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
                    <Shield className="h-3.5 w-3.5" />
                    API Reference
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
                    Bank Payouts
                </h1>
                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl">
                    Process secure bank transfers for both local and international recipients. Support for ACH, wire transfers, and real-time payment networks with comprehensive compliance and fraud protection.
                </p>
            </section>

            {/* Bank Transfer Methods */}
            <section>
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <Globe className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Bank transfer methods</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
                    Choose between local and international bank transfer options based on your recipient's location.
                </p>

                <div className="grid gap-5 md:grid-cols-2">
                    <div className="bg-white dark:bg-card border border-border rounded-2xl p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                                <MapPin className="h-4 w-4 text-brand" />
                            </div>
                            <h3 className="text-base font-semibold text-foreground">Local Bank Transfers</h3>
                        </div>
                        <p className="text-muted-foreground text-sm mb-4">
                            Fast, low-cost transfers to domestic bank accounts via ACH and wire networks with same-day processing options.
                        </p>
                        <div className="space-y-2 text-sm mb-6">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Processing Time</span>
                                <span className="text-foreground font-medium">Instant - T+1</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Fee</span>
                                <span className="text-foreground font-medium">$5 - $7</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Daily Limit</span>
                                <span className="text-foreground font-medium">Varies by corridor</span>
                            </div>
                        </div>
                        <Link to="/payout/bank/local">
                            <Button className="w-full">View Local Bank Options</Button>
                        </Link>
                    </div>

                    <div className="bg-white dark:bg-card border border-border rounded-2xl p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                                <Globe className="h-4 w-4 text-brand" />
                            </div>
                            <h3 className="text-base font-semibold text-foreground">International Transfers</h3>
                        </div>
                        <p className="text-muted-foreground text-sm mb-4">
                            Global payment network supporting wire transfers, RTP, FedNow, and local payment methods across 200+ countries.
                        </p>
                        <div className="space-y-2 text-sm mb-6">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Processing Time</span>
                                <span className="text-foreground font-medium">Instant - T+3</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Fee</span>
                                <span className="text-foreground font-medium">1.5% - 3.0%</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Daily Limit</span>
                                <span className="text-foreground font-medium">Varies by corridor</span>
                            </div>
                        </div>
                        <Link to="/payout/bank/foreign">
                            <Button className="w-full">View International Options</Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Bank Account Verification */}
            <section>
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <Shield className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Bank account verification</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
                    Verify bank account ownership before processing payouts to prevent fraud and ensure compliance with regulatory requirements.
                </p>

                <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2 px-4 py-3 bg-muted/30 dark:bg-card/50 border border-border rounded-2xl">
                        <span className="px-2 py-0.5 rounded text-xs font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400">POST</span>
                        <code className="text-xs text-muted-foreground break-all">/ft-app/account-enquiry</code>
                    </div>

                    <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-5">
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">Endpoint</h4>
                            <CodeBlock>{getVerifyBankAccountEndpointCode()}</CodeBlock>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">Request body</h4>
                            <CodeBlock language="json">{getVerifyBankAccountRequestBodyCode()}</CodeBlock>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">Response</h4>
                            <CodeBlock language="json">{getVerifyBankAccountResponseCode()}</CodeBlock>
                        </div>
                    </div>
                </div>
            </section>

            {/* Transfer Methods Comparison */}
            <section>
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <CheckCircle className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Transfer methods comparison</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
                    Compare processing times, fees, and best-use cases for each transfer method.
                </p>

                <div className="bg-white dark:bg-card border border-border rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                            <tr className="border-b border-border">
                                <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Method</th>
                                <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Type</th>
                                <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Processing Time</th>
                                <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Fee Range</th>
                                <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Best For</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                            <tr className="hover:bg-muted/20 transition-colors">
                                <td className="px-5 py-3.5 font-mono text-xs text-foreground">ACH Same-Day</td>
                                <td className="px-5 py-3.5 text-muted-foreground">Local</td>
                                <td className="px-5 py-3.5 text-muted-foreground">4-6 hours</td>
                                <td className="px-5 py-3.5 text-muted-foreground">$5</td>
                                <td className="px-5 py-3.5 text-muted-foreground">Urgent domestic payroll</td>
                            </tr>
                            <tr className="hover:bg-muted/20 transition-colors">
                                <td className="px-5 py-3.5 font-mono text-xs text-foreground">Wire Transfer</td>
                                <td className="px-5 py-3.5 text-muted-foreground">Local/International</td>
                                <td className="px-5 py-3.5 text-muted-foreground">2-4 hours (local), 1-3 days (intl)</td>
                                <td className="px-5 py-3.5 text-muted-foreground">$5 - $7</td>
                                <td className="px-5 py-3.5 text-muted-foreground">High-value transfers</td>
                            </tr>
                            <tr className="hover:bg-muted/20 transition-colors">
                                <td className="px-5 py-3.5 font-mono text-xs text-foreground">RTP</td>
                                <td className="px-5 py-3.5 text-muted-foreground">Local</td>
                                <td className="px-5 py-3.5 text-muted-foreground">Instant</td>
                                <td className="px-5 py-3.5 text-muted-foreground">$1.25</td>
                                <td className="px-5 py-3.5 text-muted-foreground">Real-time payments</td>
                            </tr>
                            <tr className="hover:bg-muted/20 transition-colors">
                                <td className="px-5 py-3.5 font-mono text-xs text-foreground">FedNow</td>
                                <td className="px-5 py-3.5 text-muted-foreground">Local</td>
                                <td className="px-5 py-3.5 text-muted-foreground">Instant</td>
                                <td className="px-5 py-3.5 text-muted-foreground">$1.25</td>
                                <td className="px-5 py-3.5 text-muted-foreground">Federal Reserve network</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Security & Compliance */}
            <section>
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <AlertTriangle className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Security & compliance</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
                    All bank transfers are subject to security screening and compliance checks.
                </p>

                <div className="bg-white dark:bg-card border border-border rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                            <tr className="border-b border-border">
                                <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Feature</th>
                                <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Description</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                            <tr className="hover:bg-muted/20 transition-colors">
                                <td className="px-5 py-3.5 font-mono text-xs text-foreground">End-to-End Encryption</td>
                                <td className="px-5 py-3.5 text-muted-foreground">All bank transfer data is encrypted using AES-256 encryption</td>
                            </tr>
                            <tr className="hover:bg-muted/20 transition-colors">
                                <td className="px-5 py-3.5 font-mono text-xs text-foreground">Fraud Detection</td>
                                <td className="px-5 py-3.5 text-muted-foreground">Real-time fraud scoring and monitoring for all bank transfer requests</td>
                            </tr>
                            <tr className="hover:bg-muted/20 transition-colors">
                                <td className="px-5 py-3.5 font-mono text-xs text-foreground">KYC</td>
                                <td className="px-5 py-3.5 text-muted-foreground">Beneficiary verification required for transfers over $1,000</td>
                            </tr>
                            <tr className="hover:bg-muted/20 transition-colors">
                                <td className="px-5 py-3.5 font-mono text-xs text-foreground">AML Screening</td>
                                <td className="px-5 py-3.5 text-muted-foreground">All transfers are subject to AML screening and reporting</td>
                            </tr>
                            <tr className="hover:bg-muted/20 transition-colors">
                                <td className="px-5 py-3.5 font-mono text-xs text-foreground">OFAC Screening</td>
                                <td className="px-5 py-3.5 text-muted-foreground">Automatic sanctions list screening for all international transfers</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PayoutBank;
