import { Link } from "react-router-dom";
import {
  Send,
  ArrowDownToLine,
  ArrowUpToLine,
  Globe,
  AlertCircle,
  Info,
  CheckCircle2,
  MessageSquare,
  Building2,
  Webhook,
  Key,
  ExternalLink,
  ArrowRight,
} from "lucide-react";

const TransferIntroduction = () => {
  return (
    <div className="py-8 sm:py-10 space-y-16">
      {/* Hero */}
      <section>
        <div className="inline-flex items-center gap-2 bg-brand-50 dark:bg-brand-950/40 text-brand text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
          <Send className="h-3.5 w-3.5" />
          API Reference
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
          Transfer
        </h1>
        <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl">
          The Transfer module is a set of endpoints for moving funds — either
          between Passpoint wallets, from a Passpoint wallet to a NUBAN bank
          account, or to and from mobile money accounts. It is organized into
          two main sub-modules: <strong>Payout</strong> (outbound) and{" "}
          <strong>Collection</strong> (inbound), plus shared utility endpoints
          for status tracking and webhook management.
        </p>
      </section>

      {/* Sub-modules overview */}
      <section>
        <div className="flex items-center gap-3 mb-3">
          <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
            <Info className="h-4 w-4 text-brand" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            Overview
          </h2>
        </div>
        <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
          Transfer is split into two directions of money flow, plus a set of
          shared utility endpoints available across the whole module.
        </p>

        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 flex gap-4">
            <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0 mt-0.5">
              <ArrowUpToLine className="h-4 w-4 text-brand" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-1">
                Payout — outbound transfers
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Send funds from a Passpoint wallet to external destinations.
                Supports local NGN bank transfers, foreign bank payouts (ACH,
                WIRE, RTP, FedNow, account deposits in USD/GBP/EUR/CNY), and
                mobile money (MoMo) payouts.
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 flex gap-4">
            <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0 mt-0.5">
              <ArrowDownToLine className="h-4 w-4 text-brand" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-1">
                Collection — inbound transfers
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Receive funds into a Passpoint wallet. Supports MoMo
                request-to-pay, NGN virtual account generation (static and
                dynamic), USD virtual accounts, and open banking payment
                requests across supported regions.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 flex gap-4">
          <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0 mt-0.5">
            <Webhook className="h-4 w-4 text-brand" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-1">
              Shared utilities
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Endpoints shared across the Transfer module: list supported
              countries, check transfer status, retrieve payment status reports,
              resend single or bulk webhooks, and confirm MoMo payments.
            </p>
          </div>
        </div>
      </section>

      {/* Getting credentials */}
      <section>
        <div className="flex items-center gap-3 mb-3">
          <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
            <Key className="h-4 w-4 text-brand" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            Getting started
          </h2>
        </div>
        <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
          Before making any API calls you need to retrieve your authentication
          credentials and configure your callback setup from your dashboard.
        </p>

        <div className="space-y-4">
          {/* Step 1 - credentials */}
          <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-brand-50 dark:bg-brand-950/40 w-7 h-7 rounded-full flex items-center justify-center shrink-0">
                <span className="text-brand text-xs font-bold">1</span>
              </div>
              <h4 className="text-sm font-semibold text-foreground">
                Retrieve your credentials
              </h4>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed mb-4">
              Go to the <strong>Developers</strong> section of your dashboard to
              retrieve your <strong>Merchant ID</strong> and{" "}
              <strong>API Key</strong>. You are also expected to set up your
              callback URL and callback secret here.
            </p>
            <a
              href="https://go-dev.mypasspoint.com/account-settings/developers"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-brand hover:underline"
            >
              go-dev.mypasspoint.com → Account Settings → Developers
              <ExternalLink className="h-3 w-3" />
            </a>

            <div className="grid sm:grid-cols-2 gap-3 mt-5">
              {[
                {
                  label: "Merchant ID",
                  desc: "Your unique merchant identifier. Used in every API request.",
                },
                {
                  label: "API Key",
                  desc: "Your secret API key. Used alongside the Merchant ID to obtain a Bearer Token.",
                },
                {
                  label: "Callback URL",
                  desc: "The endpoint on your server where Passpoint will POST transaction status notifications.",
                },
                {
                  label: "Callback Secret",
                  desc: "Used to sign webhook payloads so you can verify they originated from Passpoint.",
                },
              ].map(({ label, desc }) => (
                <div
                  key={label}
                  className="flex gap-3 bg-muted/30 dark:bg-muted/10 border border-border rounded-xl px-4 py-3"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-brand shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-foreground font-mono">
                      {label}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Step 2 - authenticate */}
          <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-brand-50 dark:bg-brand-950/40 w-7 h-7 rounded-full flex items-center justify-center shrink-0">
                <span className="text-brand text-xs font-bold">2</span>
              </div>
              <h4 className="text-sm font-semibold text-foreground">
                Authenticate to get a Bearer Token
              </h4>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed mb-4">
              Use your Merchant ID and API Key to call the authentication
              endpoint and receive a time-limited Bearer Token. Attach this
              token to all subsequent API requests.
            </p>
            <Link
              to="/authentication"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-brand hover:underline"
            >
              Authentication — API reference
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </section>

      {/* MoMo flow */}
      <section>
        <div className="flex items-center gap-3 mb-3">
          <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
            <MessageSquare className="h-4 w-4 text-brand" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            MoMo payout &amp; collection flow
          </h2>
        </div>
        <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
          Step-by-step guide for transacting via mobile money — both sending
          (payout) and receiving (collection).
        </p>

        <div className="grid sm:grid-cols-2 gap-6">
          {/* Payout flow */}
          <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6">
            <div className="flex items-center gap-2 mb-5">
              <div className="bg-brand-50 dark:bg-brand-950/40 w-7 h-7 rounded-full flex items-center justify-center shrink-0">
                <ArrowUpToLine className="h-3.5 w-3.5 text-brand" />
              </div>
              <h4 className="text-sm font-semibold text-foreground">
                Payout flow
              </h4>
            </div>
            <ol className="space-y-4">
              {[
                {
                  step: 1,
                  label: "Get MoMo Payout Network",
                  desc: "Fetch the list of supported mobile money networks for the target country.",
                  to: "/payout/momo/get-network",
                },
                {
                  step: 2,
                  label: "Get MoMo Payout Currency",
                  desc: "Retrieve the currencies available for the selected network.",
                  to: "/payout/momo/get-payout-network",
                },
                {
                  step: 3,
                  label: "Validate MoMo MSISDN",
                  desc: "Validate the recipient's mobile number before initiating the transfer.",
                  to: "/payout/momo/validate-msisdn",
                },
                {
                  step: 4,
                  label: "MoMo Transfer",
                  desc: "Initiate the mobile money payout to the validated recipient.",
                  to: "/payout/momo/transfer",
                },
              ].map(({ step, label, desc, to }) => (
                <li key={step} className="flex gap-3">
                  <div className="bg-brand-50 dark:bg-brand-950/40 w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-brand text-[10px] font-bold">{step}</span>
                  </div>
                  <div className="min-w-0">
                    <Link
                      to={to}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-brand hover:underline"
                    >
                      {label}
                      <ArrowRight className="h-3 w-3 shrink-0" />
                    </Link>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                      {desc}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Collection flow */}
          <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6">
            <div className="flex items-center gap-2 mb-5">
              <div className="bg-brand-50 dark:bg-brand-950/40 w-7 h-7 rounded-full flex items-center justify-center shrink-0">
                <ArrowDownToLine className="h-3.5 w-3.5 text-brand" />
              </div>
              <h4 className="text-sm font-semibold text-foreground">
                Collection flow
              </h4>
            </div>
            <ol className="space-y-4">
              {[
                {
                  step: 1,
                  label: "Get MoMo Collection Currency",
                  desc: "Fetch available currencies for MoMo collection in the target market.",
                  to: "/collection/momo/get-currency",
                },
                {
                  step: 2,
                  label: "Get MoMo Collection Network",
                  desc: "Retrieve the supported MoMo networks for the collection currency.",
                  to: "/collection/momo/get-network",
                },
                {
                  step: 3,
                  label: "MoMo Request to Pay",
                  desc: "Send a payment request to the customer's mobile money wallet. Funds are credited to your Passpoint wallet on acceptance.",
                  to: "/collection/momo/request-to-pay",
                },
              ].map(({ step, label, desc, to }) => (
                <li key={step} className="flex gap-3">
                  <div className="bg-brand-50 dark:bg-brand-950/40 w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-brand text-[10px] font-bold">{step}</span>
                  </div>
                  <div className="min-w-0">
                    <Link
                      to={to}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-brand hover:underline"
                    >
                      {label}
                      <ArrowRight className="h-3 w-3 shrink-0" />
                    </Link>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                      {desc}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Shared MoMo utilities */}
        <div className="grid sm:grid-cols-2 gap-4 mt-4">
          <div className="bg-white dark:bg-card border border-border rounded-2xl px-5 py-4 flex gap-3">
            <ArrowRight className="h-3.5 w-3.5 text-brand shrink-0 mt-0.5" />
            <div>
              <Link
                to="/transfer/transfer-status"
                className="inline-flex items-center gap-1 text-xs font-semibold text-brand hover:underline"
              >
                Check bank transfer status
                <ArrowRight className="h-3 w-3 shrink-0" />
              </Link>
              <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                Poll the status of a bank or MoMo transfer using its reference.
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-card border border-border rounded-2xl px-5 py-4 flex gap-3">
            <ArrowRight className="h-3.5 w-3.5 text-brand shrink-0 mt-0.5" />
            <div>
              <Link
                to="/transfer/confirm-momo-payment"
                className="inline-flex items-center gap-1 text-xs font-semibold text-brand hover:underline"
              >
                Confirm MoMo pay-in
                <ArrowRight className="h-3 w-3 shrink-0" />
              </Link>
              <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                Confirm the final status of a MoMo collection (pay-in) request.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* NGN flow */}
      <section>
        <div className="flex items-center gap-3 mb-3">
          <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
            <Building2 className="h-4 w-4 text-brand" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            NGN transaction flow
          </h2>
        </div>
        <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
          Step-by-step guide for transacting in Nigerian Naira (NGN) — both
          receiving via virtual accounts (collection) and sending to bank
          accounts (payout).
        </p>

        <div className="grid sm:grid-cols-2 gap-6">
          {/* NGN Collection */}
          <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-brand-50 dark:bg-brand-950/40 w-7 h-7 rounded-full flex items-center justify-center shrink-0">
                <ArrowDownToLine className="h-3.5 w-3.5 text-brand" />
              </div>
              <h4 className="text-sm font-semibold text-foreground">
                Collection — virtual accounts
              </h4>
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed mb-5">
              Generate a virtual account and share the details with your
              customers. Funds sent to these accounts are automatically credited
              to your Passpoint wallet, and you'll receive a webhook
              notification on each successful transaction.
            </p>

            <div className="space-y-3">
              <div className="flex gap-3 bg-muted/30 dark:bg-muted/10 border border-border rounded-xl px-4 py-3">
                <span className="text-brand text-[10px] font-bold mt-0.5 shrink-0">A</span>
                <div className="min-w-0">
                  <Link
                    to="/collection/bank/generate-ngn-static-virtual-account"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-brand hover:underline"
                  >
                    Generate NGN Static Virtual Account
                    <ArrowRight className="h-3 w-3 shrink-0" />
                  </Link>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                    A permanent account number assigned to a specific customer.
                    All payments to this number credit the same wallet.
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-center py-1">
                <span className="text-xs text-muted-foreground font-medium px-3">
                  OR
                </span>
              </div>

              <div className="flex gap-3 bg-muted/30 dark:bg-muted/10 border border-border rounded-xl px-4 py-3">
                <span className="text-brand text-[10px] font-bold mt-0.5 shrink-0">B</span>
                <div className="min-w-0">
                  <Link
                    to="/collection/bank/generate-ngn-dynamic-virtual-account"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-brand hover:underline"
                  >
                    Generate NGN Dynamic Virtual Account
                    <ArrowRight className="h-3 w-3 shrink-0" />
                  </Link>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                    A one-time account number tied to a specific transaction.
                    Best for checkout or payment-per-order flows.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* NGN Payout */}
          <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-brand-50 dark:bg-brand-950/40 w-7 h-7 rounded-full flex items-center justify-center shrink-0">
                <ArrowUpToLine className="h-3.5 w-3.5 text-brand" />
              </div>
              <h4 className="text-sm font-semibold text-foreground">
                Payout — bank transfers
              </h4>
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed mb-5">
              Use Account Enquiry to validate recipient details before
              initiating a transfer. Once validated, proceed with either Account
              Transfer for bank payouts or Passpoint Wallet Transfer for
              internal wallet transactions.
            </p>

            <ol className="space-y-4">
              {[
                {
                  step: 1,
                  label: "Account Enquiry",
                  desc: "Resolve and validate the recipient's bank account details before sending funds.",
                  to: "/payout/bank/local/account-enquiry",
                },
                {
                  step: 2,
                  label: "Account Transfer (NGN)",
                  desc: "Send NGN from your Passpoint wallet to any Nigerian bank account.",
                  to: "/payout/bank/local/account-transfer-ngn",
                },
                {
                  step: 3,
                  label: "Passpoint Wallet Transfer",
                  desc: "Transfer funds directly between Passpoint wallets without going through a bank.",
                  to: "/payout/bank/local/passpoint-wallet-transfer",
                },
              ].map(({ step, label, desc, to }) => (
                <li key={step} className="flex gap-3">
                  <div className="bg-brand-50 dark:bg-brand-950/40 w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-brand text-[10px] font-bold">{step}</span>
                  </div>
                  <div className="min-w-0">
                    <Link
                      to={to}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-brand hover:underline"
                    >
                      {label}
                      <ArrowRight className="h-3 w-3 shrink-0" />
                    </Link>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                      {desc}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Payout sub-modules */}
      <section>
        <div className="flex items-center gap-3 mb-3">
          <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
            <ArrowUpToLine className="h-4 w-4 text-brand" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            Payout
          </h2>
        </div>
        <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
          The Payout sub-module covers all outbound payment channels available
          from a Passpoint wallet.
        </p>

        <div className="grid sm:grid-cols-3 gap-4">
          {[
            {
              icon: <MessageSquare className="h-3.5 w-3.5 text-brand" />,
              title: "Momo",
              items: [
                "Get MoMo payout network",
                "Get MoMo payout currency",
                "Validate MoMo MSISDN",
                "Initiate MoMo transfer",
              ],
            },
            {
              icon: <Building2 className="h-3.5 w-3.5 text-brand" />,
              title: "Bank — Local",
              items: [
                "Get supported banks",
                "Account enquiry",
                "Account transfer (NGN)",
                "Passpoint enquiry",
                "Passpoint wallet transfer",
              ],
            },
            {
              icon: <Globe className="h-3.5 w-3.5 text-brand" />,
              title: "Bank — Foreign",
              items: [
                "Get available countries",
                "Get payment methods",
                "ACH, WIRE, RTP, FedNow (USD)",
                "Account deposits (USD/GBP/EUR/CNY)",
                "MoMo deposit (CNY)",
                "B2B / B2C transfers (USD/CNY)",
              ],
            },
          ].map(({ icon, title, items }) => (
            <div
              key={title}
              className="bg-white dark:bg-card border border-border rounded-2xl p-5"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="bg-brand-50 dark:bg-brand-950/40 w-7 h-7 rounded-full flex items-center justify-center shrink-0">
                  {icon}
                </div>
                <h4 className="text-sm font-semibold text-foreground">
                  {title}
                </h4>
              </div>
              <ul className="space-y-1.5">
                {items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-xs text-muted-foreground"
                  >
                    <span className="mt-1.5 h-1 w-1 rounded-full bg-brand shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 gap-4 mt-4">
          {[
            {
              label: "Rate",
              desc: "Get FX rate for a currency pair before initiating a transfer",
            },
            {
              label: "Report",
              desc: "Retrieve a paginated payout transaction report",
            },
            {
              label: "Convert Funds",
              desc: "Convert funds between currencies within the Passpoint wallet",
            },
            {
              label: "Fund Transfer Callback Sample",
              desc: "Sample webhook payload for fund transfer events",
            },
          ].map(({ label, desc }) => (
            <div
              key={label}
              className="bg-white dark:bg-card border border-border rounded-2xl px-5 py-4 flex gap-3"
            >
              <Send className="h-3.5 w-3.5 text-brand shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-foreground">{label}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Collection sub-modules */}
      <section>
        <div className="flex items-center gap-3 mb-3">
          <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
            <ArrowDownToLine className="h-4 w-4 text-brand" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            Collection
          </h2>
        </div>
        <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
          The Collection sub-module covers all inbound payment channels for
          receiving funds into a Passpoint wallet.
        </p>

        <div className="grid sm:grid-cols-3 gap-4">
          {[
            {
              icon: <MessageSquare className="h-3.5 w-3.5 text-brand" />,
              title: "Momo",
              items: [
                "Get MoMo collection currency",
                "Get MoMo collection network",
                "Request to Pay",
              ],
            },
            {
              icon: <Building2 className="h-3.5 w-3.5 text-brand" />,
              title: "Bank",
              items: [
                "Get collection currency",
                "Generate NGN static virtual account",
                "Generate NGN dynamic virtual account",
                "Generate NGN dynamic VA (with other info)",
                "Generate USD virtual account (individual)",
                "Generate USD virtual account (business)",
                "List NGN virtual accounts (paginated)",
                "Get virtual account",
              ],
            },
            {
              icon: <Globe className="h-3.5 w-3.5 text-brand" />,
              title: "Open Banking",
              items: [
                "Request payment — foreign",
                "Get banks (preselect)",
                "Get countries (preselect)",
                "Request payment foreign with bank preselect",
              ],
            },
          ].map(({ icon, title, items }) => (
            <div
              key={title}
              className="bg-white dark:bg-card border border-border rounded-2xl p-5"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="bg-brand-50 dark:bg-brand-950/40 w-7 h-7 rounded-full flex items-center justify-center shrink-0">
                  {icon}
                </div>
                <h4 className="text-sm font-semibold text-foreground">
                  {title}
                </h4>
              </div>
              <ul className="space-y-1.5">
                {items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-xs text-muted-foreground"
                  >
                    <span className="mt-1.5 h-1 w-1 rounded-full bg-brand shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 gap-4 mt-4">
          {[
            {
              label: "Report",
              desc: "Retrieve a paginated collection transaction report",
            },
            {
              label: "Wallet credit callback sample",
              desc: "Sample webhook payload sent when a wallet is credited via collection",
            },
          ].map(({ label, desc }) => (
            <div
              key={label}
              className="bg-white dark:bg-card border border-border rounded-2xl px-5 py-4 flex gap-3"
            >
              <Webhook className="h-3.5 w-3.5 text-brand shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-foreground">{label}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Key notes */}
      <section>
        <div className="flex items-center gap-3 mb-3">
          <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
            <AlertCircle className="h-4 w-4 text-brand" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            Key notes
          </h2>
        </div>
        <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
          Important points to keep in mind when integrating with the Transfer
          module.
        </p>

        <div className="space-y-3">
          {[
            {
              title: "Bearer Token required on all endpoints",
              body: "All Transfer, Payout, and Collection endpoints require a Bearer Token from the Passpoint Payment Service collection. Obtain the token from the Authentication module before calling any endpoint in this module.",
            },
            {
              title: "Required headers",
              body: "Every request must include x-channel-id, x-channel-code, x-merchant-id, and Authorization: Bearer <token>. Missing any of these will result in a 401 or 403 response.",
            },
            {
              title: "Transfers are asynchronous — use callbacks",
              body: "Payout and Collection requests are processed asynchronously. The initial response confirms the request was submitted (responseCode: 00), not that funds have moved. Configure a global or per-request callbackUrl to receive final status notifications.",
            },
            {
              title: "Unique orderId / reference per request",
              body: "Always supply a unique orderId or reference for every request. Reusing a reference may result in duplicate rejection or incorrect status matching on webhook callbacks.",
            },
            {
              title: "Webhook security — verify signatures",
              body: "Where a callback secret is configured, Passpoint signs the webhook payload. Always verify the signature before processing callback data to prevent spoofed callbacks from affecting your system.",
            },
            {
              title: "Check supported countries and currencies before initiating",
              body: "Not all currencies and countries are supported on every payment rail. Use the List Countries, Get Available Countries, Get Momo Network, and Get Collection Currency endpoints to confirm support before building your request.",
            },
          ].map(({ title, body }) => (
            <div
              key={title}
              className="flex gap-4 bg-white dark:bg-card border border-border rounded-2xl px-5 py-4"
            >
              <CheckCircle2 className="h-4 w-4 text-brand shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-foreground mb-1">
                  {title}
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default TransferIntroduction;
