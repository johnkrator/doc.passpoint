import {
  Globe,
  Shield,
  Zap,
  CreditCard,
  Smartphone,
  DollarSign,
  CheckCircle,
  ArrowRight,
  AlertTriangle,
  BookOpen,
  Code,
  FileText,
} from "lucide-react";
import CodeBlock from "@/components/CodeBlock.tsx";
import { Link } from "react-router-dom";

const Introduction = () => {
  const getSampleApiRequestCode = () => {
    return `curl --location 'https://{{baseUrl}}/{{paymentContext}}/wallet-app/get-wallet-balance?currency=all'
  --header 'Authorization: Bearer YOUR_ACCESS_TOKEN'
  --header 'x-channel-id: CHANNEL_ID'
  --header 'x-channel-code: CHANNEL_CODE'
  --header 'x-merchant-id: YOUR_MERCHANT_ID'`;
  };

  const getStandardResponseCode = () => {
    return `{
  "responseCode": "00",
  "responseDescription": "Successful",
  "responseMessage": "2 wallet balance found",
  "data": [
    {
      "currency": "NGN",
      "availableBalance": 54015.77
    },
    {
      "currency": "USD",
      "availableBalance": 15420.50
    }
  ]
}`;
  };

  return (
    <div className="py-8 sm:py-10 space-y-16">
      {/* ── Hero ──────────────────────────────────────────────────── */}
      <div>
        <div className="inline-flex items-center gap-2 bg-brand-50 dark:bg-brand-950/40 text-brand text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
          <FileText className="h-3.5 w-3.5" />
          Getting Started
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
          Introduction to Passpoint
        </h1>
        <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl">
          A comprehensive API suite for payment, wallet, transfer, and payout
          services across multiple currencies and regions, built for
          enterprise-grade scale.
        </p>
      </div>

      {/* ── What is Passpoint ─────────────────────────────────────── */}
      <section>
        <h2 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight mb-6">
          What is Passpoint?
        </h2>
        <div className="bg-muted/40 dark:bg-background/40 border border-border rounded-2xl p-6 sm:p-8">
          <p className="text-foreground dark:text-muted-foreground leading-relaxed mb-6 text-sm sm:text-base">
            Passpoint is a modern payment infrastructure platform that empowers
            businesses to accept payments, send payouts, and manage digital
            wallets across Africa and beyond. Built on RESTful API architecture,
            Passpoint seamlessly integrates with your existing systems to unlock
            powerful payment capabilities.
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "RESTful API Architecture",
              "Multi-Currency Support",
              "Real-Time Processing",
              "Webhook Notifications",
              "Sandbox Environment",
              "Enterprise Security",
            ].map((feat) => (
              <div key={feat} className="flex items-center gap-2.5">
                <CheckCircle className="h-4 w-4 text-brand shrink-0" />
                <span className="text-foreground dark:text-muted-foreground text-sm">
                  {feat}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Prerequisites ─────────────────────────────────────────── */}
      <section>
        <h2 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight mb-6">
          Prerequisites
        </h2>
        <div className="space-y-4">
          <div className="bg-white dark:bg-card border border-border rounded-2xl p-6 sm:p-8">
            <h3 className="font-semibold text-foreground text-base mb-5">
              Before you begin
            </h3>
            <div className="space-y-5">
              {[
                {
                  n: "1",
                  title: "Active Merchant Account",
                  body: "Sign up for a Passpoint merchant account and complete KYC verification.",
                },
                {
                  n: "2",
                  title: "API Credentials",
                  body: "Obtain your Merchant ID and API Key from the Developers section of your dashboard.",
                },
                {
                  n: "3",
                  title: "Development Environment",
                  body: "Server-side application capable of making HTTPS requests (Node.js, Python, PHP, Java, etc.).",
                },
                {
                  n: "4",
                  title: "HTTPS Endpoint",
                  body: "(Optional) A publicly accessible HTTPS endpoint for receiving webhook notifications.",
                },
              ].map(({ n, title, body }) => (
                <div key={n} className="flex items-start gap-4">
                  <div className="bg-brand/10 dark:bg-brand/20 rounded-full w-7 h-7 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-brand text-xs font-bold">{n}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground mb-0.5">
                      {title}
                    </p>
                    <p className="text-sm text-muted-foreground">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-muted/40 dark:bg-background/40 border border-border rounded-2xl p-5 flex items-start gap-4">
            <CheckCircle className="h-5 w-5 text-brand shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-foreground mb-1">
                Dashboard Access
              </p>
              <p className="text-sm text-muted-foreground">
                Your <strong className="text-foreground">API keys</strong> and{" "}
                <strong className="text-foreground">merchant IDs</strong> can be
                found in the{" "}
                <strong className="text-foreground">Developers section</strong>{" "}
                of your Passpoint dashboard.{" "}
                <a
                  href="https://go.mypasspoint.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand font-medium hover:underline"
                >
                  go.mypasspoint.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Core Services ─────────────────────────────────────────── */}
      <section>
        <h2 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight mb-6">
          Core Services
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            {
              icon: <CreditCard className="h-5 w-5 text-brand" />,
              title: "Payment Processing",
              desc: "Accept payments through multiple channels including bank transfers, mobile money, and card processing with real-time settlement.",
              href: "/collection",
            },
            {
              icon: <DollarSign className="h-5 w-5 text-brand" />,
              title: "Wallet Management",
              desc: "Create and manage digital wallets with multi-currency support, balance tracking, and transaction history.",
              href: "/wallet",
            },
            {
              icon: <Smartphone className="h-5 w-5 text-brand" />,
              title: "Transfer Services",
              desc: "Facilitate secure money transfers between wallets, banks, and mobile money accounts with transparent fees.",
              href: "/transfer",
            },
            {
              icon: <Globe className="h-5 w-5 text-brand" />,
              title: "Global Payouts",
              desc: "Operate across multiple countries with region-specific payment methods, currencies, and compliance requirements.",
              href: "/payout",
            },
          ].map(({ icon, title, desc, href }) => (
            <Link
              key={title}
              to={href}
              className="group bg-white dark:bg-card border border-border rounded-2xl p-5 hover:border-brand/40 hover:shadow-md transition-all"
            >
              <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center mb-4">
                {icon}
              </div>
              <h3 className="font-semibold text-foreground text-sm mb-2">
                {title}
              </h3>
              <p className="text-muted-foreground text-xs leading-relaxed mb-3">
                {desc}
              </p>
              <span className="inline-flex items-center gap-1 text-brand text-xs font-medium group-hover:gap-2 transition-all">
                Learn more <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Use Cases ─────────────────────────────────────────────── */}
      <section>
        <h2 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight mb-6">
          Common Use Cases
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "E-commerce Platforms",
              desc: "Accept payments from customers via bank transfers, mobile money, and cards with automatic reconciliation.",
            },
            {
              title: "Marketplace Solutions",
              desc: "Split payments between sellers, handle escrow, and process bulk payouts to vendors automatically.",
            },
            {
              title: "Fintech Applications",
              desc: "Build neobanks, lending platforms, or remittance services with wallet infrastructure and transfers.",
            },
            {
              title: "Subscription Services",
              desc: "Automate recurring billing, manage subscription payments, and handle failed payment retries.",
            },
            {
              title: "Payroll Systems",
              desc: "Process salary disbursements, contractor payments, and expense reimbursements at scale.",
            },
            {
              title: "Gaming & Betting",
              desc: "Handle player deposits, instant withdrawals, and real-time wallet balance management.",
            },
          ].map(({ title, desc }) => (
            <div
              key={title}
              className="bg-white dark:bg-card border border-border rounded-2xl p-5"
            >
              <h3 className="font-semibold text-foreground text-sm mb-2">
                {title}
              </h3>
              <p className="text-muted-foreground text-xs leading-relaxed">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Key Features ──────────────────────────────────────────── */}
      <section>
        <h2 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight mb-6">
          Key Features
        </h2>
        <div className="space-y-4">
          {[
            {
              icon: <Shield className="h-5 w-5 text-brand" />,
              title: "Enterprise Security",
              desc: "Bank-level security with comprehensive encryption, fraud detection, and regulatory compliance across all supported regions.",
              bullets: [
                "End-to-end encryption for all transactions",
                "Real-time fraud monitoring and prevention",
                "Regulatory compliance (PCI DSS, KYC, AML)",
                "Comprehensive audit trails and logging",
              ],
            },
            {
              icon: <Zap className="h-5 w-5 text-brand" />,
              title: "Real-Time Processing",
              desc: "Fast transaction processing with instant notifications and real-time status updates through webhooks.",
              bullets: [
                "Sub-second API response times",
                "Real-time transaction status updates",
                "Instant webhook notifications",
                "High availability (99.9% uptime SLA)",
              ],
            },
          ].map(({ icon, title, desc, bullets }) => (
            <div
              key={title}
              className="bg-white dark:bg-card border border-border rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                  {icon}
                </div>
                <h3 className="font-semibold text-foreground text-base">
                  {title}
                </h3>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                {desc}
              </p>
              <ul className="space-y-1.5">
                {bullets.map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <span className="text-brand mt-1 text-xs">▸</span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ── Environment Configuration ─────────────────────────────── */}
      <section>
        <h2 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight mb-6">
          Environment Configuration
        </h2>
        <div className="space-y-4">
          <div className="bg-white dark:bg-card border border-border rounded-2xl p-6">
            <p className="text-muted-foreground text-sm leading-relaxed mb-5">
              Passpoint provides separate environments for development and
              production. Use the appropriate base URLs for your integration
              environment.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-border">
                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Service
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Description
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Base URL
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    {
                      svc: "Client User",
                      desc: "API key and token generation",
                      url: "{{baseUrl}}/{{userAppContext}}",
                    },
                    {
                      svc: "Payment",
                      desc: "Payment operations",
                      url: "{{baseUrl}}/{{paymentContext}}",
                    },
                    {
                      svc: "Card",
                      desc: "Card services",
                      url: "{{baseUrl}}/{{cardContext}}",
                    },
                  ].map(({ svc, desc, url }) => (
                    <tr
                      key={svc}
                      className="hover:bg-muted/30 dark:hover:bg-muted/10 transition-colors"
                    >
                      <td className="py-3 px-4 font-medium text-foreground text-sm">
                        {svc}
                      </td>
                      <td className="py-3 px-4 text-muted-foreground text-sm">
                        {desc}
                      </td>
                      <td className="py-3 px-4 font-mono text-xs text-foreground bg-muted/30 dark:bg-muted/10">
                        {url}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-muted/40 dark:bg-background/40 border border-border rounded-2xl p-5 flex items-start gap-4">
            <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-foreground mb-1">
                Token Expiry Notice
              </p>
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Development:</strong> Bearer
                tokens expire after 10 minutes.{" "}
                <strong className="text-foreground">Production:</strong> Bearer
                tokens expire after 1 hour. Plan your token refresh strategy
                accordingly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── API Integration Overview ───────────────────────────────── */}
      <section>
        <h2 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight mb-6">
          API Integration Overview
        </h2>
        <div className="space-y-6">
          <div className="bg-white dark:bg-card border border-border rounded-2xl p-6">
            <h3 className="font-semibold text-foreground text-base mb-5">
              Quick integration steps
            </h3>
            <div className="space-y-4">
              {[
                {
                  n: "1",
                  title: "Get API Credentials",
                  body: "Obtain your merchant credentials and API keys from the Developers section of your dashboard.",
                },
                {
                  n: "2",
                  title: "Environment Setup",
                  body: "Configure sandbox or production environment URLs.",
                },
                {
                  n: "3",
                  title: "Implement Authentication",
                  body: "Secure your API calls with proper authentication headers.",
                },
                {
                  n: "4",
                  title: "Test Integration",
                  body: "Use sandbox environment for comprehensive testing before going live.",
                },
              ].map(({ n, title, body }) => (
                <div key={n} className="flex items-start gap-4">
                  <div className="bg-brand text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    {n}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-foreground">{title}:</strong> {body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-foreground text-sm mb-3">
              Sample API Request
            </h3>
            <CodeBlock language="bash">{getSampleApiRequestCode()}</CodeBlock>
          </div>

          <div>
            <h3 className="font-semibold text-foreground text-sm mb-3">
              Standard Response Format
            </h3>
            <CodeBlock language="json">{getStandardResponseCode()}</CodeBlock>
          </div>
        </div>
      </section>

      {/* ── Authentication Methods ─────────────────────────────────── */}
      <section>
        <h2 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight mb-3">
          Authentication Methods
        </h2>
        <p className="text-muted-foreground text-sm leading-relaxed mb-6">
          Endpoints requiring authorization support either Basic Authentication
          or Bearer Token Authentication.
        </p>
        <div className="space-y-4">
          <div className="bg-white dark:bg-card border border-border rounded-2xl p-6">
            <h3 className="font-semibold text-foreground text-sm mb-4">
              1. Basic Authentication
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-border">
                    <th className="text-left py-2.5 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Parameter
                    </th>
                    <th className="text-left py-2.5 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Type
                    </th>
                    <th className="text-left py-2.5 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Description
                    </th>
                    <th className="text-left py-2.5 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Value
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr className="hover:bg-muted/30 dark:hover:bg-muted/10 transition-colors">
                    <td className="py-3 px-4 font-mono text-xs text-foreground">
                      username
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">string</td>
                    <td className="py-3 px-4 text-muted-foreground">
                      Basic auth username
                    </td>
                    <td className="py-3 px-4 font-mono text-xs text-foreground">
                      PVTL3CYSKG
                    </td>
                  </tr>
                  <tr className="hover:bg-muted/30 dark:hover:bg-muted/10 transition-colors">
                    <td className="py-3 px-4 font-mono text-xs text-foreground">
                      password
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">string</td>
                    <td className="py-3 px-4 text-muted-foreground">
                      Basic auth password
                    </td>
                    <td className="py-3 px-4 font-mono text-xs text-foreground break-all">
                      -Zi-pIyZX9Udr0ms-13mS4Z6PcGuzLdvYC9VRgq6
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white dark:bg-card border border-border rounded-2xl p-6">
            <h3 className="font-semibold text-foreground text-sm mb-4">
              2. Bearer Token Authentication{" "}
              <span className="text-brand text-xs font-medium ml-2">
                Recommended
              </span>
            </h3>
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-border">
                    <th className="text-left py-2.5 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Parameter
                    </th>
                    <th className="text-left py-2.5 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Type
                    </th>
                    <th className="text-left py-2.5 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr className="hover:bg-muted/30 dark:hover:bg-muted/10 transition-colors">
                    <td className="py-3 px-4 font-mono text-xs text-foreground">
                      merchantId
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">string</td>
                    <td className="py-3 px-4 text-muted-foreground">
                      The merchant ID
                    </td>
                  </tr>
                  <tr className="hover:bg-muted/30 dark:hover:bg-muted/10 transition-colors">
                    <td className="py-3 px-4 font-mono text-xs text-foreground">
                      apiKey
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">string</td>
                    <td className="py-3 px-4 text-muted-foreground">
                      The merchant's API key
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="bg-muted/40 dark:bg-background/40 border border-border rounded-xl p-4 flex items-start gap-3">
              <AlertTriangle className="h-4 w-4 text-brand shrink-0 mt-0.5" />
              <p className="text-xs text-muted-foreground">
                <strong className="text-foreground">Best Practice:</strong> Use
                Bearer Token authentication for better security and easier token
                management. See the{" "}
                <Link
                  to="/api-integrations"
                  className="text-brand font-medium hover:underline"
                >
                  API Integrations
                </Link>{" "}
                page for implementation examples.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Mandatory Headers ─────────────────────────────────────── */}
      <section>
        <h2 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight mb-6">
          Mandatory Headers
        </h2>
        <div className="bg-white dark:bg-card border border-border rounded-2xl p-6">
          <p className="text-muted-foreground text-sm leading-relaxed mb-5">
            The following header parameters are required for all API requests to
            Passpoint Payment Service.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-border">
                  <th className="text-left py-2.5 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Parameter
                  </th>
                  <th className="text-left py-2.5 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Type
                  </th>
                  <th className="text-left py-2.5 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Required
                  </th>
                  <th className="text-left py-2.5 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Description
                  </th>
                  <th className="text-left py-2.5 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Value
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  {
                    param: "x-channel-id",
                    type: "string",
                    req: "mandatory",
                    desc: "The channel ID (based on the channel used by the merchant to connect to our services)",
                    val: "3",
                  },
                  {
                    param: "x-channel-code",
                    type: "string",
                    req: "mandatory",
                    desc: "The channel code",
                    val: "legacy-api-user",
                  },
                  {
                    param: "x-merchant-id",
                    type: "string",
                    req: "mandatory",
                    desc: "The merchant ID",
                    val: "—",
                  },
                  {
                    param: "x-submerchant-id",
                    type: "string",
                    req: "conditional",
                    desc: "The sub merchant ID. Only required for card acquiring",
                    val: "—",
                  },
                ].map(({ param, type, req, desc, val }) => (
                  <tr
                    key={param}
                    className="hover:bg-muted/30 dark:hover:bg-muted/10 transition-colors"
                  >
                    <td className="py-3 px-4 font-mono text-xs text-foreground">
                      {param}
                    </td>
                    <td className="py-3 px-4 text-muted-foreground text-xs">
                      {type}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
                          req === "mandatory"
                            ? "bg-brand/10 dark:bg-brand/15 text-brand"
                            : "bg-muted dark:bg-muted/30 text-muted-foreground"
                        }`}
                      >
                        {req}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground text-xs">
                      {desc}
                    </td>
                    <td className="py-3 px-4 font-mono text-xs text-foreground">
                      {val}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── Response Parameters ───────────────────────────────────── */}
      <section>
        <h2 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight mb-6">
          Response Parameters
        </h2>
        <div className="bg-white dark:bg-card border border-border rounded-2xl p-6">
          <p className="text-muted-foreground text-sm leading-relaxed mb-5">
            All API responses follow a consistent structure with the following
            parameters to indicate request status and processing results.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-border">
                  <th className="text-left py-2.5 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Parameter
                  </th>
                  <th className="text-left py-2.5 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Type
                  </th>
                  <th className="text-left py-2.5 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Description
                  </th>
                  <th className="text-left py-2.5 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Values
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  {
                    param: "responseCode",
                    type: "string",
                    desc: "Determines whether the request was submitted successfully",
                    val: "00 → submitted · 01 → pending · 02 → failed",
                  },
                  {
                    param: "responseDescription",
                    type: "string",
                    desc: "The description of the response code",
                    val: "—",
                  },
                  {
                    param: "responseMessage",
                    type: "string",
                    desc: "The message from the submission of the request",
                    val: "—",
                  },
                  {
                    param: "data",
                    type: "Object",
                    desc: "Contains response data and processing details",
                    val: "—",
                  },
                  {
                    param: "data.success",
                    type: "boolean",
                    desc: "Tells us whether the processing was successful",
                    val: "true or false",
                  },
                  {
                    param: "data.status",
                    type: "string",
                    desc: "The status code of the request",
                    val: "00 ↔ successful",
                  },
                ].map(({ param, type, desc, val }) => (
                  <tr
                    key={param}
                    className="hover:bg-muted/30 dark:hover:bg-muted/10 transition-colors"
                  >
                    <td className="py-3 px-4 font-mono text-xs text-foreground">
                      {param}
                    </td>
                    <td className="py-3 px-4 text-muted-foreground text-xs">
                      {type}
                    </td>
                    <td className="py-3 px-4 text-muted-foreground text-xs">
                      {desc}
                    </td>
                    <td className="py-3 px-4 font-mono text-xs text-foreground">
                      {val}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── Status Codes ──────────────────────────────────────────── */}
      <section>
        <h2 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight mb-6">
          Complete Status Codes
        </h2>
        <div className="bg-white dark:bg-card border border-border rounded-2xl p-6">
          <p className="text-muted-foreground text-sm leading-relaxed mb-6">
            Comprehensive list of all status codes used throughout the Passpoint
            Payment Service API.
          </p>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">
                Success &amp; Processing
              </h4>
              <div className="space-y-2">
                {[
                  {
                    code: "00",
                    label: "successful",
                    color:
                      "bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800/30",
                  },
                  {
                    code: "01",
                    label: "pending",
                    color:
                      "bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800/30",
                  },
                  {
                    code: "01OTP",
                    label: "pending_OTP_response",
                    color:
                      "bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800/30",
                  },
                ].map(({ code, label, color }) => (
                  <div
                    key={code}
                    className={`${color} rounded-lg px-3 py-2 font-mono text-xs`}
                  >
                    <span className="font-bold">{code}</span> · {label}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">
                Error Codes
              </h4>
              <div className="space-y-2">
                {[
                  { code: "02", label: "failed" },
                  { code: "03", label: "service_unavailable" },
                  { code: "04", label: "empty_request" },
                  { code: "05", label: "empty_response" },
                  { code: "06", label: "session_timeout" },
                ].map(({ code, label }) => (
                  <div
                    key={code}
                    className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/20 text-red-700 dark:text-red-400 rounded-lg px-3 py-2 font-mono text-xs"
                  >
                    <span className="font-bold">{code}</span> · {label}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">
                Validation Errors
              </h4>
              <div className="space-y-2">
                {[
                  { code: "30", label: "failed_parameter_validation" },
                  { code: "31", label: "invalid_parameter" },
                  { code: "40", label: "no_record_found" },
                ].map(({ code, label }) => (
                  <div
                    key={code}
                    className="bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800/20 text-orange-700 dark:text-orange-400 rounded-lg px-3 py-2 font-mono text-xs"
                  >
                    <span className="font-bold">{code}</span> · {label}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">
                System Errors
              </h4>
              <div className="space-y-2">
                {[
                  { code: "50", label: "database_exception" },
                  { code: "51", label: "general_exception" },
                  { code: "53", label: "duplicate_exception" },
                  { code: "60", label: "security_violation" },
                  { code: "99", label: "unknown_error" },
                ].map(({ code, label }) => (
                  <div
                    key={code}
                    className="bg-muted dark:bg-muted/20 border border-border rounded-lg px-3 py-2 font-mono text-xs text-foreground"
                  >
                    <span className="font-bold">{code}</span> · {label}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-6 bg-muted/40 dark:bg-background/40 border border-border rounded-xl p-4 flex items-start gap-3">
            <BookOpen className="h-4 w-4 text-brand shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground">
              For detailed error handling strategies and troubleshooting, visit
              the{" "}
              <Link
                to="/status-responses"
                className="text-brand font-medium hover:underline"
              >
                Status Responses
              </Link>{" "}
              page.
            </p>
          </div>
        </div>
      </section>

      {/* ── Next Steps ────────────────────────────────────────────── */}
      <section>
        <h2 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight mb-6">
          Next Steps
        </h2>
        <Link
          to="/api-integrations"
          className="group flex items-start gap-4 bg-white dark:bg-card border border-border rounded-2xl p-6 hover:border-brand/40 hover:shadow-md transition-all max-w-sm"
        >
          <div className="bg-brand-50 dark:bg-brand-950/40 w-10 h-10 rounded-full flex items-center justify-center shrink-0">
            <Code className="h-5 w-5 text-brand" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground text-sm mb-1.5">
              API Integration Guide
            </h3>
            <p className="text-muted-foreground text-xs leading-relaxed mb-3">
              Learn how to integrate Passpoint APIs with code examples,
              authentication setup, and best practices.
            </p>
            <span className="inline-flex items-center gap-1 text-brand text-xs font-medium group-hover:gap-2 transition-all">
              Start Integrating <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </div>
        </Link>
      </section>
    </div>
  );
};

export default Introduction;
