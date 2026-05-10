import {
  CreditCard,
  DollarSign,
  FileText,
  Lock,
  Webhook,
  Info,
  AlertCircle,
  History,
  XCircle,
  Layers,
  Zap,
} from "lucide-react";
import CodeBlock from "@/components/CodeBlock.tsx";
import {
  issueCardRequestParams,
  basicResponseParams,
  fundWithdrawRequestParams,
  cardDetailsResponseParams,
  cardProfileStatusResponseParams,
  cardTransactionResponseParams,
  cardListResponseParams,
  cardEventCallbackParams,
  webhookParameterDescription,
} from "./CardIntroductionData";

const CardIntroduction = () => {
  const ParameterTable = ({
    columns,
    data,
  }: {
    columns: string[];
    data: Record<string, React.ReactNode>[];
  }) => (
    <div className="bg-white dark:bg-card border border-border rounded-2xl overflow-hidden mb-5">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {data.map((row, idx) => (
              <tr key={idx} className="hover:bg-muted/20 transition-colors">
                {Object.values(row).map((val, cellIdx) => (
                  <td
                    key={cellIdx}
                    className="px-5 py-3.5 text-xs wrap-break-words"
                  >
                    {cellIdx === 0 ? (
                      <code className="font-mono text-xs text-foreground break-all">
                        {val}
                      </code>
                    ) : (
                      <span className="text-muted-foreground">{val}</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="py-8 sm:py-10 space-y-16">
      {/* Hero */}
      <section>
        <div className="inline-flex items-center gap-2 bg-brand-50 dark:bg-brand-950/40 text-brand text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
          <CreditCard className="h-3.5 w-3.5" />
          API Reference
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
          Virtual Card v2
        </h1>
        <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl">
          API requests and responses for virtual card issuance and all card
          operations. All endpoints require a Bearer Token from the Passpoint
          Payment Service collection.
        </p>
      </section>

      {/* Platform Overview */}
      <section>
        <div className="flex items-center gap-3 mb-3">
          <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
            <Layers className="h-4 w-4 text-brand" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            How Virtual Cards Work
          </h2>
        </div>
        <p className="text-muted-foreground text-sm sm:text-base mb-6 max-w-xl">
          Everything you need to understand before integrating the Passpoint Virtual Card v2 API.
        </p>

        <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-5">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <p className="text-xs font-semibold text-foreground uppercase tracking-wider">Card Network</p>
              <p className="text-xs text-muted-foreground">USD-denominated virtual Visa and Mastercard cards issued programmatically via API. Cards can be used for online purchases anywhere that accepts virtual cards.</p>
            </div>
            <div className="space-y-1.5">
              <p className="text-xs font-semibold text-foreground uppercase tracking-wider">Issuance Modes</p>
              <p className="text-xs text-muted-foreground"><span className="font-medium text-foreground">Default Billing</span>  uses Passpoint's pre-configured billing address (simpler). <span className="font-medium text-foreground">Client Billing</span>  accepts a custom billing address supplied by your customer (required for AVS-verified merchants).</p>
            </div>
            <div className="space-y-1.5">
              <p className="text-xs font-semibold text-foreground uppercase tracking-wider">Funding Model</p>
              <p className="text-xs text-muted-foreground">Cards are not automatically funded at issuance. Use the Fund Card endpoint to load balance from your Passpoint merchant wallet. Balance can be withdrawn back to your wallet at any time.</p>
            </div>
            <div className="space-y-1.5">
              <p className="text-xs font-semibold text-foreground uppercase tracking-wider">Card Lifecycle States</p>
              <p className="text-xs text-muted-foreground">
                <code className="font-mono text-xs bg-muted/60 px-1 py-0.5 rounded">ACTIVE</code>  card can transact normally.{" "}
                <code className="font-mono text-xs bg-muted/60 px-1 py-0.5 rounded">FROZEN</code>  temporarily blocked, reversible.{" "}
                <code className="font-mono text-xs bg-muted/60 px-1 py-0.5 rounded">TERMINATED</code>  permanently closed, cannot be reactivated.
              </p>
            </div>
          </div>

          <div className="border-t border-border pt-4 space-y-3">
            <div className="flex items-start gap-3">
              <Zap className="h-4 w-4 text-brand shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-foreground mb-0.5">Real-time Authorization Decisions</p>
                <p className="text-xs text-muted-foreground">When a cardholder attempts a purchase, Passpoint can forward the authorization request to your webhook endpoint in real time. Your system can respond with <code className="font-mono text-xs">approve</code> or <code className="font-mono text-xs">decline</code>  enabling custom logic such as blocking specific merchant categories, enforcing spending limits, or applying time-of-day restrictions.</p>
              </div>
            </div>
          </div>

          <div className="bg-muted/40 dark:bg-background/40 border border-border rounded-xl p-4 flex items-start gap-3">
            <Info className="h-4 w-4 text-brand shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground">
              <span className="font-semibold text-foreground">Required first step:</span> Call the <strong>Get Card Profile Status</strong> endpoint before issuing any cards. This verifies your merchant account is approved and enabled for card issuance. Attempting to issue cards on a non-active profile will result in an error.
            </p>
          </div>
        </div>
      </section>

      {/* APIs Section */}
      <section>
        <div className="flex items-center gap-3 mb-3">
          <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
            <CreditCard className="h-4 w-4 text-brand" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            APIs
          </h2>
        </div>
        <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
          Complete parameter reference for all virtual card API endpoints.
        </p>

        <div className="space-y-8">
          {/* Issue Card */}
          <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="bg-brand-50 dark:bg-brand-950/40 w-8 h-8 rounded-full flex items-center justify-center shrink-0">
                <CreditCard className="h-3.5 w-3.5 text-brand" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-foreground">
                  Issue Card
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  POST &nbsp;
                  <code className="font-mono">/issue</code>
                  &nbsp;·&nbsp; When funding at creation:{" "}
                  <code className="font-mono">/issue-and-fund</code>
                </p>
              </div>
            </div>
            <h4 className="text-sm font-medium text-foreground mb-3">
              Request parameters
            </h4>
            <ParameterTable
              columns={[
                "Parameter",
                "Type",
                "Required",
                "Description",
                "Default Value",
              ]}
              data={issueCardRequestParams}
            />
            <h4 className="text-sm font-medium text-foreground mb-3">
              Response parameters
            </h4>
            <ParameterTable
              columns={["Parameter", "Type", "Description"]}
              data={basicResponseParams}
            />
          </div>

          {/* Fund Card */}
          <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="bg-brand-50 dark:bg-brand-950/40 w-8 h-8 rounded-full flex items-center justify-center shrink-0">
                <DollarSign className="h-3.5 w-3.5 text-brand" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-foreground">
                  Fund Card
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  POST &nbsp;<code className="font-mono">/fund</code>
                </p>
              </div>
            </div>
            <h4 className="text-sm font-medium text-foreground mb-3">
              Request parameters
            </h4>
            <ParameterTable
              columns={[
                "Parameter",
                "Type",
                "Required",
                "Description",
                "Default Value",
              ]}
              data={fundWithdrawRequestParams}
            />
            <h4 className="text-sm font-medium text-foreground mb-3">
              Response parameters
            </h4>
            <ParameterTable
              columns={["Parameter", "Type", "Description"]}
              data={basicResponseParams}
            />
          </div>

          {/* Withdraw From Card */}
          <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="bg-brand-50 dark:bg-brand-950/40 w-8 h-8 rounded-full flex items-center justify-center shrink-0">
                <DollarSign className="h-3.5 w-3.5 text-brand" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-foreground">
                  Withdraw From Card
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  POST &nbsp;<code className="font-mono">/withdraw</code>
                </p>
              </div>
            </div>
            <h4 className="text-sm font-medium text-foreground mb-3">
              Request parameters
            </h4>
            <ParameterTable
              columns={[
                "Parameter",
                "Type",
                "Required",
                "Description",
                "Default Value",
              ]}
              data={fundWithdrawRequestParams}
            />
            <h4 className="text-sm font-medium text-foreground mb-3">
              Response parameters
            </h4>
            <ParameterTable
              columns={["Parameter", "Type", "Description"]}
              data={basicResponseParams}
            />
          </div>

          {/* Get Card Balance */}
          <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="bg-brand-50 dark:bg-brand-950/40 w-8 h-8 rounded-full flex items-center justify-center shrink-0">
                <DollarSign className="h-3.5 w-3.5 text-brand" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-foreground">
                  Get Card Balance
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  GET &nbsp;<code className="font-mono">/get-card-balance</code>
                </p>
              </div>
            </div>
            <h4 className="text-sm font-medium text-foreground mb-3">
              Query parameters
            </h4>
            <ParameterTable
              columns={[
                "Parameter",
                "Type",
                "Required",
                "Description",
                "Default Value",
              ]}
              data={[
                {
                  parameter: "id",
                  type: "string",
                  required: "mandatory",
                  description: "the unique id of the card",
                  defaultValue: "",
                },
              ]}
            />
            <h4 className="text-sm font-medium text-foreground mb-3">
              Response parameters
            </h4>
            <ParameterTable
              columns={["Parameter", "Type", "Description"]}
              data={[
                ...basicResponseParams.slice(0, 3),
                {
                  parameter: "otherInfo",
                  type: "string",
                  description: "the current available balance of the card",
                },
              ]}
            />
          </div>

          {/* Get Card Details */}
          <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="bg-brand-50 dark:bg-brand-950/40 w-8 h-8 rounded-full flex items-center justify-center shrink-0">
                <FileText className="h-3.5 w-3.5 text-brand" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-foreground">
                  Get Card Details
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  GET &nbsp;<code className="font-mono">/get-card-details</code>
                </p>
              </div>
            </div>
            <h4 className="text-sm font-medium text-foreground mb-3">
              Query parameters
            </h4>
            <ParameterTable
              columns={[
                "Parameter",
                "Type",
                "Required",
                "Description",
                "Default Value",
              ]}
              data={[
                {
                  parameter: "id",
                  type: "string",
                  required: "mandatory",
                  description: "the unique id of the card",
                  defaultValue: "",
                },
              ]}
            />
            <h4 className="text-sm font-medium text-foreground mb-3">
              Response parameters
            </h4>
            <ParameterTable
              columns={["Parameter", "Type", "Description", "Example"]}
              data={cardDetailsResponseParams}
            />
          </div>

          {/* Get Card Full Pan */}
          <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="bg-brand-50 dark:bg-brand-950/40 w-8 h-8 rounded-full flex items-center justify-center shrink-0">
                <Lock className="h-3.5 w-3.5 text-brand" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-foreground">
                  Get Card Full Pan
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  GET &nbsp;<code className="font-mono">/show-card</code>
                </p>
              </div>
            </div>
            <h4 className="text-sm font-medium text-foreground mb-3">
              Query parameters
            </h4>
            <ParameterTable
              columns={[
                "Parameter",
                "Type",
                "Required",
                "Description",
                "Default Value",
              ]}
              data={[
                {
                  parameter: "id",
                  type: "string",
                  required: "mandatory",
                  description: "the unique id of the card",
                  defaultValue: "",
                },
              ]}
            />
            <h4 className="text-sm font-medium text-foreground mb-3">
              Response parameters
            </h4>
            <ParameterTable
              columns={["Parameter", "Type", "Description"]}
              data={[
                ...basicResponseParams.slice(0, 3),
                {
                  parameter: "otherInfo",
                  type: "string",
                  description: "the card clear pan",
                },
                {
                  parameter: "securityCode",
                  type: "number",
                  description: "the card cvv",
                },
                {
                  parameter: "expiryInfo",
                  type: "string",
                  description: "the card expiry details",
                },
              ]}
            />
          </div>

          {/* Get Card Profile Status */}
          <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="bg-brand-50 dark:bg-brand-950/40 w-8 h-8 rounded-full flex items-center justify-center shrink-0">
                <Info className="h-3.5 w-3.5 text-brand" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-foreground">
                  Get Card Profile Status
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  GET &nbsp;<code className="font-mono">/get-card-status</code>
                </p>
              </div>
            </div>
            <h4 className="text-sm font-medium text-foreground mb-3">
              Query parameters
            </h4>
            <ParameterTable
              columns={[
                "Parameter",
                "Type",
                "Required",
                "Description",
                "Default Value",
              ]}
              data={[
                {
                  parameter: "id",
                  type: "string",
                  required: "mandatory",
                  description: "the unique id of the card",
                  defaultValue: "",
                },
              ]}
            />
            <h4 className="text-sm font-medium text-foreground mb-3">
              Response parameters
            </h4>
            <ParameterTable
              columns={["Parameter", "Type", "Description", "Support Values"]}
              data={cardProfileStatusResponseParams}
            />
          </div>

          {/* Freeze Card */}
          <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="bg-brand-50 dark:bg-brand-950/40 w-8 h-8 rounded-full flex items-center justify-center shrink-0">
                <AlertCircle className="h-3.5 w-3.5 text-brand" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-foreground">
                  Freeze Card
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  PUT &nbsp;
                  <code className="font-mono">
                    /update-card-status/deactivate
                  </code>
                </p>
              </div>
            </div>
            <h4 className="text-sm font-medium text-foreground mb-3">
              Query parameters
            </h4>
            <ParameterTable
              columns={[
                "Parameter",
                "Type",
                "Required",
                "Description",
                "Default Value",
              ]}
              data={[
                {
                  parameter: "id",
                  type: "string",
                  required: "mandatory",
                  description: "the unique id of the card",
                  defaultValue: "",
                },
              ]}
            />
            <h4 className="text-sm font-medium text-foreground mb-3">
              Response parameters
            </h4>
            <ParameterTable
              columns={["Parameter", "Type", "Description"]}
              data={basicResponseParams.slice(0, 3)}
            />
          </div>

          {/* Unfreeze Card */}
          <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="bg-brand-50 dark:bg-brand-950/40 w-8 h-8 rounded-full flex items-center justify-center shrink-0">
                <AlertCircle className="h-3.5 w-3.5 text-brand" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-foreground">
                  Unfreeze Card
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  PUT &nbsp;
                  <code className="font-mono">
                    /update-card-status/activate
                  </code>
                </p>
              </div>
            </div>
            <h4 className="text-sm font-medium text-foreground mb-3">
              Query parameters
            </h4>
            <ParameterTable
              columns={[
                "Parameter",
                "Type",
                "Required",
                "Description",
                "Default Value",
              ]}
              data={[
                {
                  parameter: "id",
                  type: "string",
                  required: "mandatory",
                  description: "the unique id of the card",
                  defaultValue: "",
                },
              ]}
            />
            <h4 className="text-sm font-medium text-foreground mb-3">
              Response parameters
            </h4>
            <ParameterTable
              columns={["Parameter", "Type", "Description"]}
              data={basicResponseParams.slice(0, 3)}
            />
          </div>

          {/* Terminate Card */}
          <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="bg-brand-50 dark:bg-brand-950/40 w-8 h-8 rounded-full flex items-center justify-center shrink-0">
                <XCircle className="h-3.5 w-3.5 text-brand" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-foreground">
                  Terminate Card
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  POST &nbsp;<code className="font-mono">/terminate</code>
                </p>
              </div>
            </div>
            <h4 className="text-sm font-medium text-foreground mb-3">
              Request parameters
            </h4>
            <ParameterTable
              columns={[
                "Parameter",
                "Type",
                "Required",
                "Description",
                "Default Value",
              ]}
              data={[
                {
                  parameter: "cardId",
                  type: "string",
                  required: "mandatory",
                  description: "the unique id of the card",
                  defaultValue: "",
                },
                {
                  parameter: "orderId",
                  type: "string",
                  required: "mandatory",
                  description: "the order id of the termination request",
                  defaultValue: "",
                },
                {
                  parameter: "reason",
                  type: "string",
                  required: "mandatory",
                  description: "the reason for termination",
                  defaultValue: "",
                },
                {
                  parameter: "callbackUrl",
                  type: "string",
                  required: "optional",
                  description:
                    "the callback url where the status of the card termination will be sent to. If absent, the system will default to the global callback set for the merchant",
                  defaultValue: "",
                },
              ]}
            />
            <h4 className="text-sm font-medium text-foreground mb-3">
              Response parameters
            </h4>
            <ParameterTable
              columns={["Parameter", "Type", "Description"]}
              data={basicResponseParams.slice(0, 3)}
            />
          </div>

          {/* Get Card Transaction */}
          <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="bg-brand-50 dark:bg-brand-950/40 w-8 h-8 rounded-full flex items-center justify-center shrink-0">
                <History className="h-3.5 w-3.5 text-brand" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-foreground">
                  Get Card Transaction
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  GET &nbsp;<code className="font-mono">/get-card-trans</code>
                </p>
              </div>
            </div>
            <h4 className="text-sm font-medium text-foreground mb-3">
              Query parameters
            </h4>
            <ParameterTable
              columns={[
                "Parameter",
                "Type",
                "Required",
                "Description",
                "Default Value",
              ]}
              data={[
                {
                  parameter: "id",
                  type: "string",
                  required: "mandatory",
                  description: "the unique id of the transaction",
                  defaultValue: "",
                },
              ]}
            />
            <h4 className="text-sm font-medium text-foreground mb-3">
              Response parameters
            </h4>
            <ParameterTable
              columns={["Parameter", "Type", "Description", "Example"]}
              data={cardTransactionResponseParams}
            />
          </div>

          {/* Get Card List */}
          <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="bg-brand-50 dark:bg-brand-950/40 w-8 h-8 rounded-full flex items-center justify-center shrink-0">
                <FileText className="h-3.5 w-3.5 text-brand" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-foreground">
                  Get Card List
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  GET &nbsp;<code className="font-mono">/-card-list</code>
                </p>
              </div>
            </div>
            <h4 className="text-sm font-medium text-foreground mb-3">
              Query parameters
            </h4>
            <ParameterTable
              columns={[
                "Parameter",
                "Type",
                "Required",
                "Description",
                "Default Value",
              ]}
              data={[
                {
                  parameter: "id",
                  type: "string",
                  required: "optional",
                  description:
                    "the unique id of the card or the order id used to create the card",
                  defaultValue: "",
                },
                {
                  parameter: "pageNumber",
                  type: "number",
                  required: "mandatory",
                  description: "the number of the page being viewed",
                  defaultValue: "0",
                },
                {
                  parameter: "pageSize",
                  type: "number",
                  required: "mandatory",
                  description: "the number records per page",
                  defaultValue: "0",
                },
              ]}
            />
            <h4 className="text-sm font-medium text-foreground mb-3">
              Response parameters
            </h4>
            <ParameterTable
              columns={["Parameter", "Type", "Description", "Example"]}
              data={cardListResponseParams}
            />
          </div>

          {/* Card Event Callback */}
          <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="bg-brand-50 dark:bg-brand-950/40 w-8 h-8 rounded-full flex items-center justify-center shrink-0">
                <Webhook className="h-3.5 w-3.5 text-brand" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-foreground">
                  Card Event Callback
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  POST &nbsp;
                  <code className="font-mono">https://merchant_url</code>
                </p>
              </div>
            </div>
            <h4 className="text-sm font-medium text-foreground mb-3">
              Header parameters
            </h4>
            <ParameterTable
              columns={[
                "Parameter",
                "Type",
                "Required",
                "Description",
                "Default Value",
              ]}
              data={[
                {
                  parameter: "signature",
                  type: "string",
                  required: "conditional",
                  description:
                    "this is a SHA512 hash of the callback data. It is only available when the callback secret is set via the Update Card Callback Details api",
                  defaultValue: "",
                },
              ]}
            />
            <h4 className="text-sm font-medium text-foreground mb-3">
              Callback parameters
            </h4>
            <ParameterTable
              columns={[
                "Parameter",
                "Type",
                "Required",
                "Description",
                "Example",
              ]}
              data={cardEventCallbackParams}
            />
          </div>

          {/* Get Card Statement */}
          <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="bg-brand-50 dark:bg-brand-950/40 w-8 h-8 rounded-full flex items-center justify-center shrink-0">
                <FileText className="h-3.5 w-3.5 text-brand" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-foreground">
                  Get Card Statement
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  POST &nbsp;
                  <code className="font-mono">/get-card-statement</code>
                </p>
              </div>
            </div>
            <h4 className="text-sm font-medium text-foreground mb-3">
              Request parameters
            </h4>
            <ParameterTable
              columns={[
                "Parameter",
                "Type",
                "Required",
                "Description",
                "Default Value",
              ]}
              data={[
                {
                  parameter: "startDate",
                  type: "date",
                  required: "mandatory",
                  description: "the start date",
                  defaultValue: "",
                },
                {
                  parameter: "endDate",
                  type: "date",
                  required: "mandatory",
                  description: "the end date",
                  defaultValue: "",
                },
                {
                  parameter: "cardId",
                  type: "string",
                  required: "mandatory",
                  description: "the card id",
                  defaultValue: "",
                },
                {
                  parameter: "transMode",
                  type: "string",
                  required: "conditional",
                  description:
                    'this indicates whether it is a debit or credit. To search for a single ledger, transMode is the transaction id prefixed with "ref::" e.g ref::xxxxx',
                  defaultValue: "",
                },
                {
                  parameter: "pageNumber",
                  type: "int",
                  required: "mandatory",
                  description: "the current page number",
                  defaultValue: "0",
                },
                {
                  parameter: "pageSize",
                  type: "int",
                  required: "mandatory",
                  description: "the page size",
                  defaultValue: "0",
                },
              ]}
            />
            <h4 className="text-sm font-medium text-foreground mb-3">
              Response parameters
            </h4>
            <ParameterTable
              columns={["Parameter", "Type", "Description", "Example"]}
              data={[
                {
                  parameter: "responseCode",
                  type: "string",
                  description:
                    "the response code of the operation. this indicates that the request was submitted successfully",
                  example: "",
                },
                {
                  parameter: "responseDescription",
                  type: "string",
                  description: "the description of the response code",
                  example: "",
                },
                {
                  parameter: "responseMessage",
                  type: "",
                  description: "",
                  example: "",
                },
                {
                  parameter: "data",
                  type: "Object",
                  description: "this object contains the details of the card",
                  example: "",
                },
                {
                  parameter: "data.cardId",
                  type: "string",
                  description: "the card id",
                  example: "",
                },
                {
                  parameter: "data.cbaReference",
                  type: "string",
                  description:
                    "the reference linking the transaction to the transaction ledger",
                  example: "",
                },
                {
                  parameter: "data.narration",
                  type: "string",
                  description: "the transaction narration",
                  example: "",
                },
                {
                  parameter: "data.amount",
                  type: "decimal",
                  description: "the transaction amount",
                  example: "",
                },
                {
                  parameter: "data.openingBalance",
                  type: "decimal",
                  description: "the balance before the transaction",
                  example: "",
                },
                {
                  parameter: "data.runningBalance",
                  type: "decimal",
                  description: "the balance after the transaction",
                  example: "",
                },
                {
                  parameter: "data.transactionType",
                  type: "string",
                  description: "the transaction ledger type",
                  example: "",
                },
                {
                  parameter: "data.transactionDate",
                  type: "datetime",
                  description: "the date transaction ledger was created",
                  example: "",
                },
                {
                  parameter: "data.currency",
                  type: "string",
                  description: "the transaction currency",
                  example: "",
                },
                {
                  parameter: "data.debit",
                  type: "boolean",
                  description: "indicates if the transaction is a debit",
                  example: "",
                },
                {
                  parameter: "data.credit",
                  type: "boolean",
                  description: "indicates if the transaction is a credit",
                  example: "",
                },
              ]}
            />
          </div>
        </div>
      </section>

      {/* Webhook Event Types */}
      <section>
        <div className="flex items-center gap-3 mb-3">
          <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
            <Webhook className="h-4 w-4 text-brand" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            Webhook Event Types
          </h2>
        </div>
        <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
          Sample payloads for each card event type sent to your webhook URL.
        </p>

        <div className="space-y-6">
          <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-3">
            <h4 className="text-sm font-medium text-foreground">
              CARD CREATION WITHOUT FUNDING
            </h4>
            <CodeBlock language="json">{`{ "eventId": "string", "amount": "0", "merchantCity": "string", "orderId": "string", "cardScheme": "string", "transactionMode": "nil", "cardProfileStatus": "approved", "eventType": "VIRTUAL_CARD_CREATION", "merchantState": "string", "transactionId": "string", "cardCreationStatus": "approved", "transactionType": "card_creation", "cardId": "string", "currency": "string", "merchantCountry": "string", "responseMessage": "string" }`}</CodeBlock>
          </div>

          <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-3">
            <h4 className="text-sm font-medium text-foreground">
              CARD CREATION WITH FUNDING
            </h4>
            <CodeBlock language="json">{`{ "eventId": "string", "amount": "decimal", "charge": "decimal", "merchantCity": "string", "orderId": "string", "cardScheme": "string", "transactionMode": "credit", "eventType": "VIRTUAL_CARD_CREATION", "merchantState": "string", "transactionId": "string", "cardCreationStatus": "approved", "transactionType": "card_creation", "cardId": "string", "amountDebited": "decimal", "currency": "string", "merchantCountry": "string", "responseMessage": "string", "cardFundStatus": "approved" }`}</CodeBlock>
          </div>

          <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-3">
            <h4 className="text-sm font-medium text-foreground">FUNDING</h4>
            <CodeBlock language="json">{`{ "eventId": "string", "amount": "decimal", "charge": "decimal", "merchantCity": "string", "orderId": "string", "cardScheme": "string", "eventType": "VIRTUAL_CARD_FUNDING", "merchantState": "string", "transactionId": "string", "transactionType": "funding", "cardId": "string", "amountDebited": "debited", "currency": "string", "merchantCountry": "string", "responseMessage": "string", "cardFundStatus": "approved" }`}</CodeBlock>
          </div>

          <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-3">
            <h4 className="text-sm font-medium text-foreground">WITHDRAWAL</h4>
            <CodeBlock language="json">{`{ "eventId": "string", "amount": "decimal", "eventType": "VIRTUAL_CARD_WITHDRAWAL", "transactionId": "string", "cardId": "string", "orderId": "string", "cardScheme": "string", "transactionMode": "debit", "merchantCity": "string", "merchantState": "string", "merchantCountry": "string", "transactionType": "withdrawal", "currency": "string", "responseMessage": "string", "cardWithdrawalStatus": "approved", "charge": "decimal", "amountDebited": "decimal" }`}</CodeBlock>
          </div>

          <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-3">
            <h4 className="text-sm font-medium text-foreground">
              AUTHORIZATION  NON CROSSBORDER
            </h4>
            <CodeBlock language="json">{`{
"eventId": "string",
"amount": "decimal",
"amountDebited": "decimal",
"charge": "decimal",
"chargeBearer":"string",
"merchantCity": "string",
"orderId": "string",
"cardScheme": "string",
"transactionMode": "debit",
"eventType": "VIRTUAL_CARD_AUTHORIZATION",
"mcc": "string",
"transactionId": "string",
"cardAuthorizationStatus": "approved",
"merchantName": "string",
"transactionType": "authorization",
"cardId": "string",
"currency": "string",
"merchantCountry": "string",
"responseMessage": "string",
"isCrossborder":"boolean"
}`}</CodeBlock>
          </div>

          <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-3">
            <h4 className="text-sm font-medium text-foreground">
              AUTHORIZATION  CROSSBORDER
            </h4>
            <CodeBlock language="json">{`{
"eventId": "string",
"amount": "decimal",
"merchantCity": "string",
"orderId": "string",
"cardScheme": "string",
"transactionMode": "debit",
"eventType": "VIRTUAL_CARD_AUTHORIZATION",
"mcc": "string",
"transactionId": "string",
"cardAuthorizationStatus": "approved",
"merchantName": "string",
"transactionType": "authorization",
"cardId": "string",
"currency": "string",
"merchantCountry": "string",
"responseMessage": "string",
"isCrossborder":"boolean",
"crossborderChargeSuccessful":"boolean",
"crossborderCharge":"decimal",
"crossborderChargeBearer":"string",
"crossborderChargeDebitRef":"string"
}`}</CodeBlock>
          </div>

          <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-3">
            <h4 className="text-sm font-medium text-foreground">REVERSAL</h4>
            <CodeBlock language="json">{`{
"eventId": "string", "amount": "decimal", "merchantCity": "string", "orderId": "string", "cardScheme": "string", "transactionMode": "credit", "eventType": "VIRTUAL_CARD_REVERSAL", "mcc": "string", "transactionId": "string", "originalTransactionId": "string", "merchantName": "string", "transactionType": "reversal", "cardReversalStatus": "approved", "cardId": "string", "currency": "string", "merchantCountry": "string", "responseMessage": "string", "isCrossborder":"boolean", "crossborderChargeReversalSuccessful":"boolean", "crossborderCharge":"decimal", "crossborderChargeBearer", "string", "crossborderChargeReversalReference":"string" }`}</CodeBlock>
          </div>

          <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-3">
            <h4 className="text-sm font-medium text-foreground">
              EXPIRED AUTHORIZATION
            </h4>
            <CodeBlock language="json">{`{
"eventId": "string", "amount": "decimal", "merchantCity": "string", "orderId": "string", "cardScheme": "string", "transactionMode": "credit", "eventType": "VIRTUAL_CARD_EXPIRED_AUTHORIZATION_REFUND", "mcc": "string", "transactionId": "string", "originalTransactionId": "string", "merchantName": "string", "transactionType": "reversal", "cardReversalStatus": "approved", "cardId": "string", "currency": "string", "narration": "string", "merchantCountry": "string", "responseMessage": "string", "isCrossborder":"boolean", "crossborderChargeReversalSuccessful":"boolean", "crossborderCharge":"decimal", "crossborderChargeBearer", "string", "crossborderChargeReversalReference":"string" }`}</CodeBlock>
          </div>

          <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-3">
            <h4 className="text-sm font-medium text-foreground">REFUND</h4>
            <CodeBlock language="json">{`{
"eventId": "string", "amount": "decimal", "merchantCity": "string", "orderId": "string", "cardScheme": "string", "transactionMode": "credit", "eventType": "VIRTUAL_CARD_REFUND", "mcc": "string", "merchantState": "string", "transactionId": "string", "merchantName": "string", "transactionType": "refund", "cardRefundStatus": "approved", "cardId": "string", "currency": "string", "merchantCountry": "string", "responseMessage": "string" }`}</CodeBlock>
          </div>

          <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-3">
            <h4 className="text-sm font-medium text-foreground">DECLINE</h4>
            <CodeBlock language="json">{`{ "cardDeclineStatus": "declined", "eventId": "string", "amount": "decimal", "merchantCity": "string", "orderId": "string", "cardScheme": "string", "eventType": "VIRTUAL_CARD_DECLINE", "mcc": "string", "transactionId": "string", "merchantName": "string", "transactionType": "decline", "cardId": "string", "currency": "string", "merchantCountry": "string", "responseMessage": "string", "isPassthrough", "boolean", "passthroughChargeBearer":"string", "passthroughChargeSuccessful":"boolean", "passthroughChargeDebitReference":"string", "passthroughCharge": "decimal" }`}</CodeBlock>
          </div>

          <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-3">
            <h4 className="text-sm font-medium text-foreground">
              CARD TERMINATION
            </h4>
            <CodeBlock language="json">{`{
"eventId": "string", "amountWithdrawn": "decimal", "merchantId": "string", "maskedPan": "string", "cardId": "string", "dateCardDeactivated": "2024-07-15 16:51:36", "eventType": "VIRTUAL_CARD_TERMINATION", "cardProfileStatus": "terminated", "cardCreationStatus": "terminated", "transactionId": "string", "cardStatus": "deactivated" }`}</CodeBlock>
          </div>

          <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-3">
            <h4 className="text-sm font-medium text-foreground">
              REFUND AFTER CARD TERMINATION
            </h4>
            <CodeBlock language="json">{`{ "eventId": "string", "amount": "decimal", "authorizationCurrency": "string", "merchantCity": "string", "orderId": "string", "cardScheme": "string", "transactionMode": "credit", "authorizationCode": "string", "eventType": "VIRTUAL_CARD_EXPIRED_AUTHORIZATION_REFUND", "mcc": "string", "transactionId": "string", "merchantName": "string", "transactionType": "refund", "cardRefundStatus": "approved", "originalTransactionId": "string", "cardId": "string", "narration": "string", "currency": "string", "merchantCountry": "string", "responseMessage": "string" }`}</CodeBlock>
          </div>
        </div>
      </section>

      {/* Webhook Parameter Description */}
      <section>
        <div className="flex items-center gap-3 mb-3">
          <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
            <Webhook className="h-4 w-4 text-brand" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            Webhook Parameter Description
          </h2>
        </div>
        <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
          Field-level description for all webhook payload parameters.
        </p>
        <ParameterTable
          columns={["Parameter", "Type", "Required", "Description"]}
          data={webhookParameterDescription}
        />
      </section>

      {/* Webhook Sample Response */}
      <section>
        <div className="flex items-center gap-3 mb-3">
          <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
            <Webhook className="h-4 w-4 text-brand" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            Webhook Sample Response
          </h2>
        </div>
        <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
          Expected acknowledgement response your endpoint should return to
          Passpoint.
        </p>
        <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6">
          <CodeBlock language="json">{`{
"code": "00",
"status": "successful",
"message": "callback received successfully"
}`}</CodeBlock>
        </div>
      </section>
    </div>
  );
};

export default CardIntroduction;
