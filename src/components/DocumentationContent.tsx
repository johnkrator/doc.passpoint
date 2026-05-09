import {Globe, Shield, Zap, CreditCard} from "lucide-react";
import CodeBlock from "@/components/CodeBlock";
import PaginationNavigation from "@/components/PaginationNavigation";

const DocumentationContent = () => {
    // Code block methods
    const getStandardResponseFormat = () => `{
  "responseCode": "00",
  "responseDescription": "Success",
  "responseMessage": "Operation completed successfully",
  "data": {
    "success": true,
    "status": "00",
    // ... additional response data
  }
}`;

    return (
        <div className="min-h-screen bg-white dark:bg-background">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                <div className="max-w-none">
                    <h1 className="text-3xl sm:text-4xl font-bold text-foreground dark:text-foreground mb-6">Passpoint Payment
                        Service</h1>

                    <p className="text-foreground dark:text-muted-foreground text-lg mb-12 leading-relaxed max-w-4xl">
                        Welcome to the Passpoint Payment Service API documentation. This comprehensive guide contains
                        API requests and responses for seamless integration of payment, wallet, transfer, and payout
                        services across multiple currencies and regions.
                    </p>

                    {/* Service Overview */}
                    <section className="mb-16">
                        <h2 className="text-2xl sm:text-3xl font-bold text-foreground dark:text-foreground mb-8">Service
                            Overview</h2>

                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
                            <div
                                className="bg-white dark:bg-card/50 border border-border dark:border-border rounded-xl p-6 lg:p-8 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex items-center mb-4">
                                    <Globe className="h-8 w-8 text-brand mr-3"/>
                                    <h3 className="text-lg font-semibold text-foreground dark:text-foreground">Multi-Region
                                        Support</h3>
                                </div>
                                <p className="text-foreground dark:text-muted-foreground text-sm mb-4">
                                    Operate across multiple countries with region-specific payment methods, currencies,
                                    and compliance requirements.
                                </p>
                            </div>

                            <div
                                className="bg-white dark:bg-card/50 border border-border dark:border-border rounded-xl p-6 lg:p-8 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex items-center mb-4">
                                    <CreditCard className="h-8 w-8 text-brand mr-3"/>
                                    <h3 className="text-lg font-semibold text-foreground dark:text-foreground">Comprehensive
                                        Payment Solutions</h3>
                                </div>
                                <p className="text-foreground dark:text-muted-foreground text-sm mb-4">
                                    From wallet management to bank transfers, mobile money, and card processing - all in
                                    one unified API.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Environment Configuration */}
                    <section className="mb-16">
                        <h2 className="text-2xl sm:text-3xl font-bold text-foreground dark:text-foreground mb-8">Environment
                            Configuration</h2>

                        <div
                            className="bg-white dark:bg-card/50 border border-border dark:border-border rounded-xl p-6 lg:p-8 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex flex-col lg:flex-row lg:items-start gap-6 max-w-none">
                                <div
                                    className="flex items-center gap-4 lg:flex-col lg:items-center lg:text-center lg:min-w-0 lg:w-48 flex-shrink-0">
                                    <Shield className="h-12 w-12 text-brand-500"/>
                                    <h3 className="text-xl lg:text-2xl font-semibold text-foreground dark:text-foreground lg:mt-3">Base
                                        URLs</h3>
                                </div>
                                <div className="flex-1 min-w-0 lg:max-w-4xl">
                                    <p className="text-foreground dark:text-muted-foreground text-lg mb-6 leading-relaxed">
                                        Configure your integration using the appropriate base URLs for sandbox testing
                                        and production environments.
                                    </p>

                                    <div className="space-y-4">
                                        <div>
                                            <h4 className="text-sm font-semibold text-foreground dark:text-foreground mb-2">Environment
                                                URLs</h4>
                                            <div className="overflow-x-auto">
                                                <table className="w-full text-sm">
                                                    <thead>
                                                    <tr className="border-b border-border dark:border-border">
                                                        <th className="text-left py-2 text-foreground dark:text-foreground font-medium">Service</th>
                                                        <th className="text-left py-2 text-foreground dark:text-foreground font-medium">Sandbox</th>
                                                        <th className="text-left py-2 text-foreground dark:text-foreground font-medium">Production</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody className="text-foreground dark:text-muted-foreground">
                                                    <tr className="border-b border-border dark:border-border">
                                                        <td className="py-2 font-medium">Client User</td>
                                                        <td className="py-2 font-mono text-xs">https://API_BASE_URL/userapp/</td>
                                                        <td className="py-2 font-mono text-xs">https://app.mypasspoint.com/userapp/</td>
                                                    </tr>
                                                    <tr className="border-b border-border dark:border-border">
                                                        <td className="py-2 font-medium">Payment</td>
                                                        <td className="py-2 font-mono text-xs">https://API_BASE_URL/paypass/</td>
                                                        <td className="py-2 font-mono text-xs">https://app.mypasspoint.com/paypass/</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="py-2 font-medium">Card</td>
                                                        <td className="py-2 font-mono text-xs">https://API_BASE_URL/cardapp/</td>
                                                        <td className="py-2 font-mono text-xs">https://app.mypasspoint.com/cardapp/</td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Response Format */}
                    <section className="mb-16">
                        <h2 className="text-2xl sm:text-3xl font-bold text-foreground dark:text-foreground mb-8">Standard
                            Response Format</h2>

                        <div
                            className="bg-white dark:bg-card/50 border border-border dark:border-border rounded-xl p-6 lg:p-8 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex flex-col lg:flex-row lg:items-start gap-6 max-w-none">
                                <div
                                    className="flex items-center gap-4 lg:flex-col lg:items-center lg:text-center lg:min-w-0 lg:w-48 flex-shrink-0">
                                    <Zap className="h-12 w-12 text-brand-500"/>
                                    <h3 className="text-xl lg:text-2xl font-semibold text-foreground dark:text-foreground lg:mt-3">Response
                                        Structure</h3>
                                </div>
                                <div className="flex-1 min-w-0 lg:max-w-4xl">
                                    <p className="text-foreground dark:text-muted-foreground text-lg mb-6 leading-relaxed">
                                        All API responses follow a consistent structure to ensure predictable
                                        integration and error handling.
                                    </p>

                                    <div className="space-y-4">
                                        <div>
                                            <h4 className="text-sm font-semibold text-foreground dark:text-foreground mb-2">Standard
                                                Response Format</h4>
                                            <CodeBlock language="json">{getStandardResponseFormat()}</CodeBlock>
                                        </div>

                                        <div>
                                            <h4 className="text-sm font-semibold text-foreground dark:text-foreground mb-2">Response
                                                Codes</h4>
                                            <div className="grid gap-3 sm:grid-cols-1">
                                                <div
                                                    className="bg-muted dark:bg-brand/10 border border-border dark:border-border rounded p-3">
                                                    <div
                                                        className="font-mono text-sm font-medium text-foreground dark:text-foreground">00
                                                        - Success
                                                    </div>
                                                    <div
                                                        className="text-xs text-muted-foreground dark:text-muted-foreground mt-1">Request
                                                        submitted successfully
                                                    </div>
                                                </div>
                                                <div
                                                    className="bg-muted dark:bg-muted/20 border border-border dark:border-border rounded p-3">
                                                    <div
                                                        className="font-mono text-sm font-medium text-foreground dark:text-foreground">01
                                                        - Pending
                                                    </div>
                                                    <div
                                                        className="text-xs text-muted-foreground dark:text-muted-foreground mt-1">Request
                                                        is being processed
                                                    </div>
                                                </div>
                                                <div
                                                    className="bg-destructive/10 dark:bg-destructive/10 border border-destructive/30 dark:border-destructive/50 rounded p-3">
                                                    <div
                                                        className="font-mono text-sm font-medium text-foreground dark:text-foreground">02
                                                        - Failed
                                                    </div>
                                                    <div
                                                        className="text-xs text-muted-foreground dark:text-muted-foreground mt-1">Request
                                                        failed to process
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Getting Started */}
                    <section className="mb-16">
                        <h2 className="text-2xl sm:text-3xl font-bold text-foreground dark:text-foreground mb-8">Getting
                            Started</h2>

                        <div className="space-y-6">
                            <div
                                className="bg-muted dark:bg-muted/30 border border-border dark:border-border rounded-xl p-6 lg:p-8 shadow-sm">
                                <h3 className="text-lg font-semibold text-foreground dark:text-foreground mb-4">Quick Start
                                    Guide</h3>
                                <div className="space-y-3 text-foreground dark:text-muted-foreground">
                                    <div className="flex items-start">
                                        <span
                                            className="bg-brand text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">1</span>
                                        <div>
                                            <strong>Authentication:</strong> Get your merchant credentials and API keys
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <span
                                            className="bg-brand text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">2</span>
                                        <div>
                                            <strong>Wallet Setup:</strong> Create and manage your payment wallets
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <span
                                            className="bg-brand text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">3</span>
                                        <div>
                                            <strong>Integration:</strong> Implement transfers, payouts, and collections
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <span
                                            className="bg-brand text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">4</span>
                                        <div>
                                            <strong>Webhooks:</strong> Configure global callbacks for real-time
                                            notifications
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Pagination Navigation */}
                <PaginationNavigation
                    previousPage={{
                        title: "Introduction",
                        href: "/introduction"
                    }}
                    nextPage={{
                        title: "Authentication",
                        href: "/authentication"
                    }}
                />

                {/* Footer */}
                <footer className="mt-16 pt-8 border-t border-border dark:border-border text-center">
                    <p className="text-muted-foreground text-sm">All rights reserved</p>
                </footer>
            </div>
        </div>
    );
};

export default DocumentationContent;

