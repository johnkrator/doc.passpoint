import {DollarSign, BarChart3, Building2, CheckCircle, Globe, Clock, Shield} from "lucide-react";
import CodeBlock from "@/components/CodeBlock.tsx";

const CollectionBankDirect = () => {
    // Code block methods

    const getCollectionCurrencyParams = () => `{
  "country": "US",
  "account_type": "virtual",
  "settlement_method": "real_time"
}`;

    const getCollectionCurrencyResponse = () => `{
  "currencies": [
    {
      "currency": "USD",
      "country": "US",
      "name": "US Dollar",
      "symbol": "$",
      "collection_methods": ["ach", "wire", "rtp", "fednow"],
      "virtual_account_support": true,
      "settlement_times": {
        "ach": "1-3 business days",
        "wire": "same day",
        "rtp": "instant",
        "fednow": "instant"
      },
      "fees": {
        "virtual_account_monthly": 0.00,
        "ach_collection": 0.75,
        "wire_collection": 15.00,
        "instant_collection": 1.25
      },
      "limits": {
        "min_amount": 0.01,
        "max_amount_ach": 500000.00,
        "max_amount_wire": 10000000.00
      },
      "status": "active"
    }
  ],
  "total_currencies": 12,
  "supported_regions": ["US", "EU", "UK", "NG"]
}`;


    const getNgnStaticVirtualAccountRequest = () => `{
  "account_name": "John Doe Collections",
  "account_reference": "JD-STATIC-001",
  "customer": {
    "first_name": "John",
    "last_name": "Doe",
    "email": "john.doe@example.com",
    "phone": "+234801234567",
    "address": {
      "street": "123 Victoria Island",
      "city": "Lagos",
      "state": "Lagos",
      "postal_code": "101001",
      "country": "NG"
    }
  },
  "webhook_url": "https://yourapp.com/webhooks/collections",
  "auto_settlement": true,
  "settlement_account": "settlement_acc_123"
}`;

    const getNgnStaticVirtualAccountResponse = () => `{
  "virtual_account_id": "va_ngn_static_abc123",
  "account_name": "John Doe Collections",
  "account_number": "2234567890",
  "bank_name": "Passpoint Microfinance Bank",
  "bank_code": "50746",
  "currency": "NGN",
  "type": "static",
  "status": "active",
  "reference": "JD-STATIC-001",
  "settlement_account": "settlement_acc_123",
  "auto_settlement_enabled": true,
  "created_at": "2024-01-15T14:30:00Z",
  "expires_at": null
}`;


    const getUsdIndividualVirtualAccountRequest = () => `{
  "customer": {
    "first_name": "John",
    "last_name": "Doe",
    "email": "john.doe@example.com",
    "ssn_last_4": "1234",
    "date_of_birth": "1990-05-15",
    "address": {
      "street": "123 Main St",
      "city": "New York",
      "state": "NY",
      "zip": "10001"
    }
  },
  "account_purpose": "freelancer_payments"
}`;


    const getUsdBusinessVirtualAccountRequest = () => `{
  "business": {
    "name": "Doe Consulting LLC",
    "ein": "12-3456789",
    "address": {
      "street": "456 Business Ave",
      "city": "New York",
      "state": "NY",
      "zip": "10002"
    },
    "business_type": "llc",
    "industry": "consulting"
  },
  "account_purpose": "client_payments"
}`;


    const getListVirtualAccountsParams = () => `{
  "limit": 25,
  "offset": 0,
  "status": "active",
  "customer_id": "cust_ngn_001",
  "created_after": "2024-01-01T00:00:00Z",
  "sort": "created_at",
  "order": "desc"
}`;

    const getListVirtualAccountsResponse = () => `{
  "virtual_accounts": [
    {
      "virtual_account_id": "va_ngn_abc123",
      "account_number": "2034567890",
      "account_name": "John Doe Collections",
      "bank_name": "Passpoint Bank",
      "currency": "NGN",
      "status": "active",
      "balance": 150000.00,
      "customer": {
        "name": "John Doe",
        "customer_id": "cust_ngn_001"
      },
      "stats": {
        "total_collections": 45,
        "total_amount_collected": 2500000.00,
        "last_collection": "2024-01-14T16:22:00Z"
      },
      "created_at": "2024-01-10T14:30:00Z"
    }
  ],
  "pagination": {
    "total_count": 237,
    "limit": 25,
    "offset": 0,
    "has_more": true
  }
}`;


    const getVirtualAccountDetailsResponse = () => `{
  "virtual_account_id": "va_ngn_abc123",
  "account_number": "2034567890",
  "account_name": "John Doe Collections",
  "bank_name": "Passpoint Bank",
  "bank_code": "999999",
  "currency": "NGN",
  "status": "active",
  "balance": {
    "available": 150000.00,
    "pending": 25000.00,
    "total": 175000.00
  },
  "customer": {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "phone": "+2348012345678",
    "customer_id": "cust_ngn_001"
  },
  "settings": {
    "auto_settlement": {
      "enabled": true,
      "threshold": 100000.00,
      "settlement_account": "main_wallet"
    },
    "webhook_url": "https://yourapp.com/webhooks/ngn-collection"
  },
  "statistics": {
    "total_collections": 45,
    "total_amount_collected": 2500000.00,
    "average_collection_amount": 55555.56,
    "last_collection": "2024-01-14T16:22:00Z",
    "this_month": {
      "collections_count": 12,
      "collections_amount": 650000.00
    }
  },
  "recent_transactions": [
    {
      "transaction_id": "txn_ngn_xyz789",
      "amount": 75000.00,
      "description": "Customer payment",
      "sender_name": "Jane Smith",
      "sender_account": "****6789",
      "status": "completed",
      "created_at": "2024-01-14T16:22:00Z"
    }
  ],
  "created_at": "2024-01-10T14:30:00Z",
  "updated_at": "2024-01-14T16:22:00Z"
}`;

    return (
        <div className="py-8 sm:py-10 space-y-16">
            {/* Hero */}
            <section>
                <div className="inline-flex items-center gap-2 bg-brand-50 dark:bg-brand-950/40 text-brand text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
                    <DollarSign className="h-3.5 w-3.5" />
                    API Reference
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
                    Direct Bank Options
                </h1>
                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl">
                    Generate virtual accounts and manage direct bank integrations for automated collections. Support
                    for ACH, SEPA, local clearing systems, and real-time settlement across multiple currencies and
                    regions.
                </p>
            </section>

            {/* Get Collection Currency */}
            <section>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">Get Collection Currency</h2>
                <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">Retrieve supported currencies for direct bank collections, including exchange rates, processing fees, and settlement times.</p>

                <div className="bg-white dark:bg-card border border-border rounded-2xl overflow-hidden">
                    <div className="px-5 py-3.5 bg-muted/30 dark:bg-card/50 border-b border-border flex flex-wrap items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-xs font-semibold bg-brand-50 text-brand dark:bg-brand-950/40 dark:text-brand/80">GET</span>
                        <code className="text-xs text-muted-foreground break-all">/ft-app/currency-list/bank?type=collection</code>
                    </div>
                    <div className="p-5 sm:p-6 space-y-5">
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">Query Parameters</h4>
                            <CodeBlock language="json">{getCollectionCurrencyParams()}</CodeBlock>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">Response</h4>
                            <CodeBlock language="json">{getCollectionCurrencyResponse()}</CodeBlock>
                        </div>
                    </div>
                </div>
            </section>

            {/* Generate NGN Static Virtual Account */}
            <section>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">Generate NGN Static Virtual Account</h2>
                <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">Generate a static NGN virtual account for collecting Nigerian Naira payments with automatic settlement.</p>

                <div className="bg-white dark:bg-card border border-border rounded-2xl overflow-hidden">
                    <div className="px-5 py-3.5 bg-muted/30 dark:bg-card/50 border-b border-border flex flex-wrap items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-xs font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400">POST</span>
                        <code className="text-xs text-muted-foreground break-all">/ft-app/generate-virtual-account?type=static</code>
                    </div>
                    <div className="p-5 sm:p-6 space-y-5">
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">Request Body</h4>
                            <CodeBlock language="json">{getNgnStaticVirtualAccountRequest()}</CodeBlock>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">Response</h4>
                            <CodeBlock language="json">{getNgnStaticVirtualAccountResponse()}</CodeBlock>
                        </div>
                    </div>
                </div>
            </section>

            {/* USD Virtual Accounts */}
            <section>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">USD Virtual Accounts</h2>
                <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">Generate USD virtual accounts for individuals or businesses with ACH, wire, and RTP support.</p>

                <div className="space-y-6 lg:grid lg:gap-6 lg:grid-cols-2 lg:space-y-0">
                    {/* Individual Account */}
                    <div className="bg-white dark:bg-card border border-border rounded-2xl overflow-hidden">
                        <div className="px-5 py-3.5 bg-muted/30 dark:bg-card/50 border-b border-border flex flex-wrap items-center gap-2">
                            <span className="px-2 py-0.5 rounded text-xs font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400">POST</span>
                            <code className="text-xs text-muted-foreground break-all">/ft-app/generate-virtual-account?type=individual</code>
                        </div>
                        <div className="p-5 sm:p-6 space-y-5">
                            <p className="text-muted-foreground text-sm">
                                Generate USD virtual accounts for individual customers with ACH, wire, and RTP
                                support.
                            </p>
                            <div>
                                <h4 className="text-sm font-medium text-foreground mb-3">Request Body</h4>
                                <CodeBlock language="json">{getUsdIndividualVirtualAccountRequest()}</CodeBlock>
                            </div>
                        </div>
                    </div>

                    {/* Business Account */}
                    <div className="bg-white dark:bg-card border border-border rounded-2xl overflow-hidden">
                        <div className="px-5 py-3.5 bg-muted/30 dark:bg-card/50 border-b border-border flex flex-wrap items-center gap-2">
                            <span className="px-2 py-0.5 rounded text-xs font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400">POST</span>
                            <code className="text-xs text-muted-foreground break-all">/ft-app/generate-virtual-account?type=business</code>
                        </div>
                        <div className="p-5 sm:p-6 space-y-5">
                            <p className="text-muted-foreground text-sm">
                                Generate USD virtual accounts for business customers with enhanced limits and
                                compliance features.
                            </p>
                            <div>
                                <h4 className="text-sm font-medium text-foreground mb-3">Request Body</h4>
                                <CodeBlock language="json">{getUsdBusinessVirtualAccountRequest()}</CodeBlock>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* List Virtual Accounts */}
            <section>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">List Virtual Accounts - NGN - Paginated</h2>
                <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">Retrieve a paginated list of all NGN virtual accounts with status, balance information, and collection statistics.</p>

                <div className="bg-white dark:bg-card border border-border rounded-2xl overflow-hidden">
                    <div className="px-5 py-3.5 bg-muted/30 dark:bg-card/50 border-b border-border flex flex-wrap items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-xs font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400">POST</span>
                        <code className="text-xs text-muted-foreground break-all">/ft-app/acct-list</code>
                    </div>
                    <div className="p-5 sm:p-6 space-y-5">
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">Query Parameters</h4>
                            <CodeBlock language="json">{getListVirtualAccountsParams()}</CodeBlock>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">Response</h4>
                            <CodeBlock language="json">{getListVirtualAccountsResponse()}</CodeBlock>
                        </div>
                    </div>
                </div>
            </section>

            {/* Get Virtual Account */}
            <section>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">Get Virtual Account</h2>
                <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">Retrieve detailed information about a specific virtual account including balance, transaction history, and collection statistics.</p>

                <div className="bg-white dark:bg-card border border-border rounded-2xl overflow-hidden">
                    <div className="px-5 py-3.5 bg-muted/30 dark:bg-card/50 border-b border-border flex flex-wrap items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-xs font-semibold bg-brand-50 text-brand dark:bg-brand-950/40 dark:text-brand/80">GET</span>
                        <code className="text-xs text-muted-foreground break-all">/ft-app/get-virtual-account?id={"{account_id}"}</code>
                    </div>
                    <div className="p-5 sm:p-6 space-y-5">
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">Response</h4>
                            <CodeBlock language="json">{getVirtualAccountDetailsResponse()}</CodeBlock>
                        </div>
                    </div>
                </div>
            </section>

            {/* Virtual Account Benefits */}
            <section>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">Virtual Account Benefits</h2>
                <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">Powerful features built into every virtual account for seamless collection management.</p>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <div className="bg-white dark:bg-card border border-border rounded-2xl p-6">
                        <CheckCircle className="h-8 w-8 text-brand mb-4"/>
                        <h3 className="text-base font-semibold text-foreground mb-3">Automated Collection</h3>
                        <p className="text-muted-foreground text-sm">
                            Automatic payment collection with real-time settlement and instant balance updates.
                        </p>
                    </div>

                    <div className="bg-white dark:bg-card border border-border rounded-2xl p-6">
                        <Building2 className="h-8 w-8 text-brand-500 mb-4"/>
                        <h3 className="text-base font-semibold text-foreground mb-3">Unique Identifiers</h3>
                        <p className="text-muted-foreground text-sm">
                            Each virtual account has a unique number for easy payment tracking and
                            reconciliation.
                        </p>
                    </div>

                    <div className="bg-white dark:bg-card border border-border rounded-2xl p-6">
                        <Globe className="h-8 w-8 text-foreground mb-4"/>
                        <h3 className="text-base font-semibold text-foreground mb-3">Multi-Currency</h3>
                        <p className="text-muted-foreground text-sm">
                            Support for USD, EUR, GBP, NGN and other major currencies with local clearing.
                        </p>
                    </div>

                    <div className="bg-white dark:bg-card border border-border rounded-2xl p-6">
                        <Clock className="h-8 w-8 text-foreground mb-4"/>
                        <h3 className="text-base font-semibold text-foreground mb-3">Real-Time Settlement</h3>
                        <p className="text-muted-foreground text-sm">
                            Instant settlement to your main wallet with configurable thresholds and schedules.
                        </p>
                    </div>

                    <div className="bg-white dark:bg-card border border-border rounded-2xl p-6">
                        <Shield className="h-8 w-8 text-destructive mb-4"/>
                        <h3 className="text-base font-semibold text-foreground mb-3">Compliance Ready</h3>
                        <p className="text-muted-foreground text-sm">
                            Built-in AML monitoring and regulatory compliance for all supported jurisdictions.
                        </p>
                    </div>

                    <div className="bg-white dark:bg-card border border-border rounded-2xl p-6">
                        <BarChart3 className="h-8 w-8 text-teal-500 mb-4"/>
                        <h3 className="text-base font-semibold text-foreground mb-3">Detailed Reporting</h3>
                        <p className="text-muted-foreground text-sm">
                            Comprehensive transaction reporting with export capabilities and real-time
                            analytics.
                        </p>
                    </div>
                </div>
            </section>

            {/* Fees & Limits */}
            <section>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">Fees & Limits</h2>
                <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">Industry-leading collection fees with no setup costs and transparent pricing across all currencies.</p>

                <div className="bg-white dark:bg-card border border-border rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                            <tr className="border-b border-border bg-muted/30">
                                <th className="px-5 py-3.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Currency</th>
                                <th className="px-5 py-3.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Collection Fee</th>
                                <th className="px-5 py-3.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Settlement Time</th>
                                <th className="px-5 py-3.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Daily Limit</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                            <tr className="hover:bg-muted/20 transition-colors">
                                <td className="px-5 py-3.5 font-mono text-xs text-foreground">USD</td>
                                <td className="px-5 py-3.5 text-sm text-muted-foreground">0.5% + $0.25</td>
                                <td className="px-5 py-3.5 text-sm text-muted-foreground">Real-time</td>
                                <td className="px-5 py-3.5 text-sm text-muted-foreground">$500,000</td>
                            </tr>
                            <tr className="hover:bg-muted/20 transition-colors">
                                <td className="px-5 py-3.5 font-mono text-xs text-foreground">EUR</td>
                                <td className="px-5 py-3.5 text-sm text-muted-foreground">0.4% + €0.30</td>
                                <td className="px-5 py-3.5 text-sm text-muted-foreground">Real-time</td>
                                <td className="px-5 py-3.5 text-sm text-muted-foreground">€400,000</td>
                            </tr>
                            <tr className="hover:bg-muted/20 transition-colors">
                                <td className="px-5 py-3.5 font-mono text-xs text-foreground">GBP</td>
                                <td className="px-5 py-3.5 text-sm text-muted-foreground">0.4% + £0.25</td>
                                <td className="px-5 py-3.5 text-sm text-muted-foreground">Real-time</td>
                                <td className="px-5 py-3.5 text-sm text-muted-foreground">£300,000</td>
                            </tr>
                            <tr className="hover:bg-muted/20 transition-colors">
                                <td className="px-5 py-3.5 font-mono text-xs text-foreground">NGN</td>
                                <td className="px-5 py-3.5 text-sm text-muted-foreground">0.75% + ₦50</td>
                                <td className="px-5 py-3.5 text-sm text-muted-foreground">Instant</td>
                                <td className="px-5 py-3.5 text-sm text-muted-foreground">₦50,000,000</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Security & Compliance */}
            <section>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">Security & Compliance</h2>
                <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">Virtual accounts are subject to banking regulations and AML requirements in each supported jurisdiction.</p>

                <div className="grid gap-6 md:grid-cols-2">
                    <div className="bg-white dark:bg-card border border-border rounded-2xl p-6 lg:p-8">
                        <Shield className="h-8 w-8 text-brand-500 mb-4"/>
                        <h3 className="text-base font-semibold text-foreground mb-3">Bank-Grade Security</h3>
                        <p className="text-muted-foreground text-sm mb-4">
                            All virtual accounts are protected by the same security measures as traditional bank
                            accounts.
                        </p>
                        <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• 256-bit SSL encryption</li>
                            <li>• Multi-factor authentication</li>
                            <li>• Real-time fraud monitoring</li>
                        </ul>
                    </div>

                    <div className="bg-white dark:bg-card border border-border rounded-2xl p-6 lg:p-8">
                        <Building2 className="h-8 w-8 text-brand mb-4"/>
                        <h3 className="text-base font-semibold text-foreground mb-3">Licensed & Regulated</h3>
                        <p className="text-muted-foreground text-sm mb-4">
                            Licensed as a money service business with full regulatory compliance in all
                            operating jurisdictions.
                        </p>
                        <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• FDIC insured (US accounts)</li>
                            <li>• FCA regulated (UK accounts)</li>
                            <li>• CBN licensed (Nigerian accounts)</li>
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CollectionBankDirect;
