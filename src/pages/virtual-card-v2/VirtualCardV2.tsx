import {
  CreditCard,
  ArrowRight,
  FileText,
  DollarSign,
  Settings,
  Shield,
} from "lucide-react";
import { Link } from "react-router-dom";

const VirtualCardV2 = () => {
  return (
    <div className="py-8 sm:py-10 space-y-16">
      <section>
        <div className="inline-flex items-center gap-2 bg-brand-50 dark:bg-brand-950/40 text-brand text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
          <CreditCard className="h-3.5 w-3.5" />
          API Reference
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
          Virtual Card v2
        </h1>
        <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl">
          Comprehensive API suite for managing virtual cards. Issue, fund,
          freeze, and manage virtual cards with real-time transaction monitoring
          and authorization controls.
        </p>
      </section>

      {/* Card Issuance Section */}
      <section>
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
          Card Issuance
        </h2>
        <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
          Create and fund virtual cards for your customers with flexible billing
          options.
        </p>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Link
            to="/virtual-card-v2/issue-card-default-billing"
            className="bg-white dark:bg-card border border-border rounded-2xl p-6 hover:shadow-md transition-all hover:border-brand-500/50"
          >
            <div className="flex items-start gap-4">
              <CreditCard className="h-8 w-8 text-brand-500 shrink-0" />
              <div>
                <h3 className="text-base font-semibold text-foreground mb-2">
                  Issue Card (Default Billing)
                </h3>
                <p className="text-muted-foreground text-sm mb-3">
                  Issue a virtual card using default merchant billing details
                </p>
                <span className="text-brand-500 text-sm font-medium inline-flex items-center gap-1">
                  View API <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </div>
          </Link>

          <Link
            to="/virtual-card-v2/issue-card-client-billing"
            className="bg-white dark:bg-card border border-border rounded-2xl p-6 hover:shadow-md transition-all hover:border-green-500/50"
          >
            <div className="flex items-start gap-4">
              <CreditCard className="h-8 w-8 text-brand shrink-0" />
              <div>
                <h3 className="text-base font-semibold text-foreground mb-2">
                  Issue Card (Client Billing)
                </h3>
                <p className="text-muted-foreground text-sm mb-3">
                  Issue a virtual card with custom client billing address
                </p>
                <span className="text-brand text-sm font-medium inline-flex items-center gap-1">
                  View API <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </div>
          </Link>

          <Link
            to="/virtual-card-v2/issue-and-fund-card-client-billing"
            className="bg-white dark:bg-card border border-border rounded-2xl p-6 hover:shadow-md transition-all hover:border-blue-500/50"
          >
            <div className="flex items-start gap-4">
              <CreditCard className="h-8 w-8 text-brand-500 shrink-0" />
              <div>
                <h3 className="text-base font-semibold text-foreground mb-2">
                  Issue &amp; Fund Card
                </h3>
                <p className="text-muted-foreground text-sm mb-3">
                  Issue and fund a card with initial balance in one operation
                </p>
                <span className="text-brand-500 text-sm font-medium inline-flex items-center gap-1">
                  View API <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Card Information Section */}
      <section>
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
          Card Information
        </h2>
        <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
          Retrieve card details, balances, PAN data, and status information.
        </p>
        <div className="grid gap-6 md:grid-cols-2">
          <Link
            to="/virtual-card-v2/card-details"
            className="bg-white dark:bg-card border border-border rounded-2xl p-6 hover:shadow-md transition-all hover:border-brand-500/50"
          >
            <div className="flex items-start gap-4">
              <FileText className="h-8 w-8 text-brand-500 shrink-0" />
              <div>
                <h3 className="text-base font-semibold text-foreground mb-2">
                  Card Details
                </h3>
                <p className="text-muted-foreground text-sm">
                  Retrieve comprehensive card information
                </p>
              </div>
            </div>
          </Link>

          <Link
            to="/virtual-card-v2/card-full-pan"
            className="bg-white dark:bg-card border border-border rounded-2xl p-6 hover:shadow-md transition-all hover:border-red-500/50"
          >
            <div className="flex items-start gap-4">
              <FileText className="h-8 w-8 text-destructive shrink-0" />
              <div>
                <h3 className="text-base font-semibold text-foreground mb-2">
                  Card Full PAN
                </h3>
                <p className="text-muted-foreground text-sm">
                  Retrieve full unmasked card number
                </p>
              </div>
            </div>
          </Link>

          <Link
            to="/virtual-card-v2/card-balance"
            className="bg-white dark:bg-card border border-border rounded-2xl p-6 hover:shadow-md transition-all hover:border-green-500/50"
          >
            <div className="flex items-start gap-4">
              <DollarSign className="h-8 w-8 text-brand shrink-0" />
              <div>
                <h3 className="text-base font-semibold text-foreground mb-2">
                  Card Balance
                </h3>
                <p className="text-muted-foreground text-sm">
                  Check available card balance
                </p>
              </div>
            </div>
          </Link>

          <Link
            to="/virtual-card-v2/card-profile-status"
            className="bg-white dark:bg-card border border-border rounded-2xl p-6 hover:shadow-md transition-all hover:border-blue-500/50"
          >
            <div className="flex items-start gap-4">
              <Shield className="h-8 w-8 text-brand-500 shrink-0" />
              <div>
                <h3 className="text-base font-semibold text-foreground mb-2">
                  Card Profile Status
                </h3>
                <p className="text-muted-foreground text-sm">
                  Check card status and profile
                </p>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Card Management Section */}
      <section>
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
          Card Management
        </h2>
        <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
          Fund, withdraw, freeze, unfreeze, terminate, and configure callbacks
          on virtual cards.
        </p>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Link
            to="/virtual-card-v2/freeze-card"
            className="bg-white dark:bg-card border border-border rounded-2xl p-6 hover:shadow-md transition-all"
          >
            <div className="flex items-start gap-4">
              <Settings className="h-8 w-8 text-cyan-500 shrink-0" />
              <div>
                <h3 className="text-base font-semibold text-foreground mb-2">
                  Freeze Card
                </h3>
              </div>
            </div>
          </Link>

          <Link
            to="/virtual-card-v2/unfreeze-card"
            className="bg-white dark:bg-card border border-border rounded-2xl p-6 hover:shadow-md transition-all"
          >
            <div className="flex items-start gap-4">
              <Settings className="h-8 w-8 text-foreground shrink-0" />
              <div>
                <h3 className="text-base font-semibold text-foreground mb-2">
                  Unfreeze Card
                </h3>
              </div>
            </div>
          </Link>

          <Link
            to="/virtual-card-v2/fund-card"
            className="bg-white dark:bg-card border border-border rounded-2xl p-6 hover:shadow-md transition-all"
          >
            <div className="flex items-start gap-4">
              <DollarSign className="h-8 w-8 text-brand shrink-0" />
              <div>
                <h3 className="text-base font-semibold text-foreground mb-2">
                  Fund Card
                </h3>
              </div>
            </div>
          </Link>

          <Link
            to="/virtual-card-v2/withdraw-from-card"
            className="bg-white dark:bg-card border border-border rounded-2xl p-6 hover:shadow-md transition-all"
          >
            <div className="flex items-start gap-4">
              <DollarSign className="h-8 w-8 text-destructive shrink-0" />
              <div>
                <h3 className="text-base font-semibold text-foreground mb-2">
                  Withdraw from Card
                </h3>
              </div>
            </div>
          </Link>

          <Link
            to="/virtual-card-v2/terminate-card"
            className="bg-white dark:bg-card border border-border rounded-2xl p-6 hover:shadow-md transition-all"
          >
            <div className="flex items-start gap-4">
              <Settings className="h-8 w-8 text-destructive shrink-0" />
              <div>
                <h3 className="text-base font-semibold text-foreground mb-2">
                  Terminate Card
                </h3>
              </div>
            </div>
          </Link>

          <Link
            to="/virtual-card-v2/update-card-callback-details"
            className="bg-white dark:bg-card border border-border rounded-2xl p-6 hover:shadow-md transition-all"
          >
            <div className="flex items-start gap-4">
              <Settings className="h-8 w-8 text-muted-foreground shrink-0" />
              <div>
                <h3 className="text-base font-semibold text-foreground mb-2">
                  Update Callback Details
                </h3>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Transactions & Reporting Section */}
      <section>
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
          Transactions &amp; Reporting
        </h2>
        <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
          Access transaction history, card statements, and ledger details.
        </p>
        <div className="grid gap-6 md:grid-cols-2">
          <Link
            to="/virtual-card-v2/card-transaction"
            className="bg-white dark:bg-card border border-border rounded-2xl p-6 hover:shadow-md transition-all"
          >
            <h3 className="text-base font-semibold text-foreground mb-2">
              Card Transaction
            </h3>
          </Link>

          <Link
            to="/virtual-card-v2/card-transactions-list"
            className="bg-white dark:bg-card border border-border rounded-2xl p-6 hover:shadow-md transition-all"
          >
            <h3 className="text-base font-semibold text-foreground mb-2">
              Card Transactions List
            </h3>
          </Link>

          <Link
            to="/virtual-card-v2/card-statement"
            className="bg-white dark:bg-card border border-border rounded-2xl p-6 hover:shadow-md transition-all"
          >
            <h3 className="text-base font-semibold text-foreground mb-2">
              Card Statement
            </h3>
          </Link>

          <Link
            to="/virtual-card-v2/card-statement-by-transaction-id"
            className="bg-white dark:bg-card border border-border rounded-2xl p-6 hover:shadow-md transition-all"
          >
            <h3 className="text-base font-semibold text-foreground mb-2">
              Card Statement by Transaction ID
            </h3>
          </Link>
        </div>
      </section>

      {/* Advanced Features Section */}
      <section>
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
          Advanced Features
        </h2>
        <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
          Real-time authorization controls for advanced card transaction
          management.
        </p>
        <Link
          to="/virtual-card-v2/realtime-authorization-decision-maker"
          className="bg-white dark:bg-card border border-border rounded-2xl p-6 hover:shadow-md transition-all block"
        >
          <div className="flex items-start gap-4">
            <Shield className="h-10 w-10 text-brand dark:text-brand/80 shrink-0" />
            <div>
              <h3 className="text-base font-semibold text-foreground mb-2">
                Realtime Authorization Decision Maker
              </h3>
              <p className="text-muted-foreground text-sm">
                Make real-time authorization decisions for card transactions
                with custom rules and controls
              </p>
            </div>
          </div>
        </Link>
      </section>
    </div>
  );
};

export default VirtualCardV2;
