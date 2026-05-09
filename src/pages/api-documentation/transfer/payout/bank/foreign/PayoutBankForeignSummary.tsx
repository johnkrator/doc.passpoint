import { Globe, Search, Info, AlertCircle, ArrowRight, Clock } from "lucide-react";

const BASE_URL = "https://dev.mypasspoint.com/paypass";

type ParamRow = {
    name: string;
    type: string;
    required?: boolean;
    defaultVal?: string;
    description: string;
};

type ResponseRow = {
    name: string;
    type: string;
    description: string;
};

const PAYOUT_APIS = [
    { method: "POST", path: "foreign-ft-app/make-payment/bank",   desc: "Account deposit — USD, EUR, GBP, CNY" },
    { method: "POST", path: "foreign-ft-app/make-payment/ach",    desc: "ACH transfer — USD" },
    { method: "POST", path: "foreign-ft-app/make-payment/rtp",    desc: "Real-time payment (RTP) — USD" },
    { method: "POST", path: "foreign-ft-app/make-payment/fednow", desc: "FedNow instant payment — USD" },
    { method: "POST", path: "foreign-ft-app/make-payment/wire",   desc: "Wire transfer — USD" },
    { method: "POST", path: "foreign-ft-app/make-payment/b2b",    desc: "Business-to-business transfer — CNY, USD" },
    { method: "POST", path: "foreign-ft-app/make-payment/b2c",    desc: "Business-to-consumer transfer — CNY" },
    { method: "POST", path: "foreign-ft-app/make-payment/momo",   desc: "Mobile money deposit — CNY" },
];

function MethodBadge({ method }: { method: string }) {
    const isGet = method === "GET";
    return (
        <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
            isGet
                ? "bg-brand-50 text-brand dark:bg-brand-950/40 dark:text-brand/80"
                : "bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400"
        }`}>
            {method}
        </span>
    );
}

function ParamsTable({ rows }: { rows: ParamRow[] }) {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm">
                <thead>
                    <tr className="border-b border-border">
                        <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Parameter</th>
                        <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Type</th>
                        <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Required</th>
                        <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Description</th>
                        <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Default Value</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-border">
                    {rows.map((r) => (
                        <tr key={r.name} className="hover:bg-muted/20 transition-colors">
                            <td className="px-5 py-3.5">
                                <span className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">{r.name}</span>
                            </td>
                            <td className="px-5 py-3.5 text-muted-foreground text-xs">{r.type}</td>
                            <td className="px-5 py-3.5">
                                {r.required
                                    ? <span className="text-xs font-semibold text-red-600 dark:text-red-400">mandatory</span>
                                    : <span className="text-xs text-muted-foreground">optional</span>}
                            </td>
                            <td className="px-5 py-3.5 text-muted-foreground text-sm">{r.description}</td>
                            <td className="px-5 py-3.5 font-mono text-xs text-muted-foreground">{r.defaultVal ?? "—"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function ResponseTable({ rows }: { rows: ResponseRow[] }) {
    return (
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
                    {rows.map((r) => (
                        <tr key={r.name} className="hover:bg-muted/20 transition-colors">
                            <td className="px-5 py-3.5">
                                <span className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">{r.name}</span>
                            </td>
                            <td className="px-5 py-3.5 text-muted-foreground text-xs">{r.type}</td>
                            <td className="px-5 py-3.5 text-muted-foreground text-sm">{r.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="bg-white dark:bg-card border border-border rounded-2xl overflow-hidden">
            <div className="px-5 py-3 border-b border-border bg-muted/30">
                <h4 className="text-sm font-semibold text-foreground">{title}</h4>
            </div>
            {children}
        </div>
    );
}

const PayoutBankForeignSummary = () => {
    return (
        <div className="py-8 sm:py-10 space-y-16">

            {/* Hero */}
            <section>
                <div className="inline-flex items-center gap-2 bg-brand-50 dark:bg-brand-950/40 text-brand text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
                    <Globe className="h-3.5 w-3.5" />
                    API Reference
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
                    Foreign Bank Payouts
                </h1>
                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl">
                    This section of the documentation contains API requests and responses for foreign payouts in USD, GBP, EUR and CNY.
                </p>

                <div className="mt-6 bg-muted/40 border border-border rounded-xl px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-2">
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider shrink-0">Base URL</span>
                    <code className="font-mono text-sm text-foreground break-all">{BASE_URL}</code>
                </div>
            </section>

            {/* How Foreign Transfers Work */}
            <section>
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <Globe className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">How Foreign Transfers Work</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-2xl">
                    Foreign payouts are outbound cross-border payments sent to international bank accounts and mobile money wallets. Understanding the flow before initiating a transfer ensures reliable delivery and avoids common errors.
                </p>

                <div className="grid gap-4 sm:grid-cols-2 mb-6">
                    <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 space-y-3">
                        <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-brand shrink-0" />
                            <h3 className="text-sm font-semibold text-foreground">Fully Asynchronous</h3>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                            All foreign transfers are asynchronous. A successful API response means the transfer is queued — not completed. Final settlement status is delivered via webhook callback. Always implement webhook handling before going live.
                        </p>
                    </div>
                    <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 space-y-3">
                        <div className="flex items-center gap-2">
                            <ArrowRight className="h-4 w-4 text-brand shrink-0" />
                            <h3 className="text-sm font-semibold text-foreground">Payment Rail Must Match</h3>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                            The payment method (ACH, Wire, RTP, FedNow, etc.) must match the recipient's country and their bank's supported rails. Use the Get Payment Methods endpoint to confirm what is available before initiating any transfer.
                        </p>
                    </div>
                </div>

                {/* Required Flow */}
                <div className="bg-white dark:bg-card border border-border rounded-2xl overflow-hidden mb-6">
                    <div className="px-5 py-3 border-b border-border bg-muted/30">
                        <h4 className="text-sm font-semibold text-foreground">Required integration flow</h4>
                    </div>
                    <div className="p-5 space-y-3">
                        {[
                            { step: "1", title: "Get Available Countries", desc: "Call GET foreign-ft-app/country-list to retrieve all countries Passpoint supports for foreign payouts. Use the returned countryCode in subsequent calls." },
                            { step: "2", title: "Get Payment Methods", desc: "Call GET foreign-ft-app/available-payment-methods?countryCode= with your destination country code to discover which payment rails are available (ACH, Wire, RTP, FedNow, bank deposit, MoMo, B2B, B2C)." },
                            { step: "3", title: "Initiate the Transfer", desc: "Use the endpoint that corresponds to the chosen payment method. Supply clientReference, amount, transactionCurrency, baseCurrency, countryCode, and the full paymentInfo object." },
                        ].map(({ step, title, desc }) => (
                            <div key={step} className="flex items-start gap-4">
                                <span className="mt-0.5 h-6 w-6 rounded-full bg-brand-50 dark:bg-brand-950/40 flex items-center justify-center shrink-0 text-xs font-bold text-brand">{step}</span>
                                <div>
                                    <p className="text-sm font-semibold text-foreground mb-0.5">{title}</p>
                                    <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Universal required fields */}
                <div className="bg-white dark:bg-card border border-border rounded-2xl overflow-hidden mb-6">
                    <div className="px-5 py-3 border-b border-border bg-muted/30">
                        <h4 className="text-sm font-semibold text-foreground">Universal required fields</h4>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-border">
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Field</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Description</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {[
                                    { field: "clientReference", desc: "Your unique transaction identifier. Must be unique per request. Used for idempotency and reconciliation." },
                                    { field: "amount", desc: "Transfer amount as a string. Must be within the min/max limits for the chosen payment method." },
                                    { field: "transactionCurrency", desc: "Currency code of the funds being sent (e.g. USD, GBP, EUR, CNY)." },
                                    { field: "baseCurrency", desc: "Currency code of your wallet being debited. May differ from transactionCurrency for cross-currency transfers." },
                                    { field: "countryCode", desc: "ISO 2-letter code for the recipient's country. Must match a code returned by the country list endpoint." },
                                    { field: "paymentInfo", desc: "Object containing full sender and recipient details. Required fields vary by payment method — see individual endpoint pages." },
                                ].map(({ field, desc }) => (
                                    <tr key={field} className="hover:bg-muted/20 transition-colors">
                                        <td className="px-5 py-3.5">
                                            <span className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">{field}</span>
                                        </td>
                                        <td className="px-5 py-3.5 text-muted-foreground text-xs">{desc}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Settlement timelines */}
                <div className="bg-white dark:bg-card border border-border rounded-2xl overflow-hidden">
                    <div className="px-5 py-3 border-b border-border bg-muted/30">
                        <h4 className="text-sm font-semibold text-foreground">Settlement timelines by payment method</h4>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-border">
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Method</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Timeline</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Best For</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {[
                                    { method: "RTP",     timeline: "Near-instant (seconds)",   best: "Time-sensitive payouts, gig economy, emergency disbursements" },
                                    { method: "FedNow",  timeline: "Near-instant (seconds)",   best: "Instant USD payments where RTP is unavailable" },
                                    { method: "ACH",     timeline: "1–3 business days",        best: "Payroll, vendor payments, regular business payments" },
                                    { method: "Wire",    timeline: "1–5 business days",        best: "Large-value or international USD payments" },
                                    { method: "Bank deposit (GBP)", timeline: "Instant–3 business days", best: "UK bank account transfers via Faster Payments or BACS" },
                                    { method: "Bank deposit (EUR)", timeline: "Instant–1 business day",  best: "SEPA zone EUR transfers to European bank accounts" },
                                    { method: "Bank deposit (CNY)", timeline: "1–2 business days",       best: "Direct CNY payments to Chinese bank accounts" },
                                    { method: "MoMo (CNY)",         timeline: "Near-instant",            best: "WeChat Pay / Alipay wallet deposits in China" },
                                ].map(({ method, timeline, best }) => (
                                    <tr key={method} className="hover:bg-muted/20 transition-colors">
                                        <td className="px-5 py-3.5">
                                            <span className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">{method}</span>
                                        </td>
                                        <td className="px-5 py-3.5 text-muted-foreground text-xs font-medium">{timeline}</td>
                                        <td className="px-5 py-3.5 text-muted-foreground text-xs">{best}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="mt-4 bg-muted/40 dark:bg-background/40 border border-border rounded-xl p-4 flex items-start gap-3">
                    <Info className="h-4 w-4 text-brand shrink-0 mt-0.5" />
                    <p className="text-xs text-muted-foreground">
                        Settlement timelines are indicative and may vary based on the recipient bank's processing schedule, national holidays, and intermediary bank routing. Always communicate estimated timelines to your end users, not guaranteed windows.
                    </p>
                </div>
            </section>

            {/* Lookup APIs overview */}
            <section>
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <Search className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Lookup APIs</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-2xl">
                    Use these endpoints to retrieve supported countries, payment methods, and metadata values required when building a foreign payout request.
                </p>

                <SectionCard title="Available endpoints">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-border">
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Method</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Endpoint</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Description</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {[
                                    { path: "foreign-ft-app/country-list",                                  desc: "Get available payout countries" },
                                    { path: "foreign-ft-app/available-payment-methods?countryCode=",        desc: "Get payment methods by country" },
                                    { path: "foreign-ft-app/retrieve-metadata?type=acct",                   desc: "Get list of account types" },
                                    { path: "foreign-ft-app/retrieve-metadata?type=idt",                    desc: "Get identity type list" },
                                    { path: "foreign-ft-app/retrieve-metadata?type=sbr",                    desc: "Get sender-beneficiary relationships list" },
                                    { path: "foreign-ft-app/retrieve-metadata?type=pop",                    desc: "Get purpose of payment list" },
                                    { path: "foreign-ft-app/retrieve-metadata?type=sof",                    desc: "Get source of funds list" },
                                    { path: "foreign-ft-app/retrieve-metadata?type=ocu",                    desc: "Get list of occupations" },
                                    { path: "foreign-ft-app/retrieve-metadata?type=cny",                    desc: "Get list of bank locations (CNY B2B payout)" },
                                ].map(({ path, desc }) => (
                                    <tr key={path} className="hover:bg-muted/20 transition-colors">
                                        <td className="px-5 py-3.5"><MethodBadge method="GET" /></td>
                                        <td className="px-5 py-3.5 font-mono text-xs text-foreground">{path}</td>
                                        <td className="px-5 py-3.5 text-muted-foreground">{desc}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </SectionCard>
            </section>

            {/* ── 1. Get Available Payout Countries ── */}
            <section className="space-y-4">
                <div className="flex items-center gap-3 mb-1">
                    <MethodBadge method="GET" />
                    <code className="font-mono text-sm text-foreground">foreign-ft-app/country-list</code>
                </div>
                <h3 className="text-xl font-bold text-foreground">Get Available Payout Countries</h3>
                <p className="text-muted-foreground text-sm">
                    Returns the list of countries currently supported for foreign payouts.
                </p>

                <SectionCard title="Response Parameters">
                    <ResponseTable rows={[
                        { name: "responseCode",        type: "string", description: "Response status code." },
                        { name: "responseDescription", type: "string", description: "Human-readable response description." },
                        { name: "responseMessage",     type: "string", description: "Additional response message." },
                        { name: "data",                type: "Array",  description: "List of supported countries." },
                        { name: "data.name",           type: "string", description: "Country name." },
                        { name: "data.code",           type: "string", description: "ISO 2-letter country code." },
                        { name: "data.dialingCode",    type: "string", description: "International dialing code for the country." },
                        { name: "data.currencyCode",   type: "string", description: "Currency code used in this country." },
                        { name: "data.iso3code",       type: "string", description: "ISO 3-letter country code." },
                    ]} />
                </SectionCard>
            </section>

            {/* ── 2. Get Payment Methods by Country ── */}
            <section className="space-y-4">
                <div className="flex items-center gap-3 mb-1">
                    <MethodBadge method="GET" />
                    <code className="font-mono text-sm text-foreground">foreign-ft-app/available-payment-methods?countryCode=</code>
                </div>
                <h3 className="text-xl font-bold text-foreground">Get Payment Methods by Country</h3>
                <p className="text-muted-foreground text-sm">
                    Returns the available payment methods for the specified country.
                </p>

                <SectionCard title="Request Parameters">
                    <ParamsTable rows={[
                        {
                            name: "countryCode",
                            type: "string",
                            required: true,
                            description: "ISO 2-letter code of the target country. Append as a query parameter.",
                        },
                    ]} />
                </SectionCard>

                <SectionCard title="Response Parameters">
                    <ResponseTable rows={[
                        { name: "responseCode",        type: "string", description: "Response status code." },
                        { name: "responseDescription", type: "string", description: "Human-readable response description." },
                        { name: "responseMessage",     type: "string", description: "Additional response message." },
                        { name: "data",                type: "Array",  description: "List of available payment methods." },
                        { name: "data.name",           type: "string", description: "Display name of the payment method." },
                        { name: "data.alias",          type: "string", description: "Short alias used to identify the payment method in payout requests." },
                        { name: "data.minLimit",       type: "number", description: "Minimum transaction amount for this payment method." },
                        { name: "data.maxLimit",       type: "number", description: "Maximum transaction amount for this payment method." },
                    ]} />
                </SectionCard>
            </section>

            {/* ── Metadata Lookup section heading ── */}
            <section>
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <Info className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Metadata Lookup Endpoints</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base max-w-2xl">
                    All metadata endpoints share the URL pattern <code className="font-mono text-xs">foreign-ft-app/retrieve-metadata?type=</code>. Pass the <code className="font-mono text-xs">value</code> returned by each endpoint as the corresponding field in your payout request body.
                </p>
            </section>

            {/* ── 3. Get List of Account Type ── */}
            <section className="space-y-4">
                <div className="flex items-center gap-3 mb-1">
                    <MethodBadge method="GET" />
                    <code className="font-mono text-sm text-foreground">foreign-ft-app/retrieve-metadata?type=acct</code>
                </div>
                <h3 className="text-xl font-bold text-foreground">Get List of Account Type</h3>
                <p className="text-muted-foreground text-sm">Get List of Account Type</p>

                <SectionCard title="Request Parameters">
                    <ParamsTable rows={[
                        {
                            name: "type",
                            type: "string",
                            required: true,
                            description: "the param name for account type",
                            defaultVal: "acct",
                        },
                    ]} />
                </SectionCard>

                <SectionCard title="Response Parameters">
                    <ResponseTable rows={[
                        { name: "name",  type: "Array object", description: "the name of the account type" },
                        { name: "value", type: "Array object", description: "the code for the account type. this code should be passed in the request" },
                    ]} />
                </SectionCard>
            </section>

            {/* ── 4. Get Identity Type List ── */}
            <section className="space-y-4">
                <div className="flex items-center gap-3 mb-1">
                    <MethodBadge method="GET" />
                    <code className="font-mono text-sm text-foreground">foreign-ft-app/retrieve-metadata?type=idt</code>
                </div>
                <h3 className="text-xl font-bold text-foreground">Get Identity Type List</h3>
                <p className="text-muted-foreground text-sm">Get List of ID type</p>

                <SectionCard title="Request Parameters">
                    <ParamsTable rows={[
                        {
                            name: "type",
                            type: "string",
                            required: true,
                            description: "the param name for id type",
                            defaultVal: "idt",
                        },
                    ]} />
                </SectionCard>

                <SectionCard title="Response Parameters">
                    <ResponseTable rows={[
                        { name: "name",  type: "Array object", description: "the name of the id type" },
                        { name: "value", type: "Array object", description: "the code for the id type. this code should be passed in the request" },
                    ]} />
                </SectionCard>
            </section>

            {/* ── 5. Get Sender-Beneficiary Relationships List ── */}
            <section className="space-y-4">
                <div className="flex items-center gap-3 mb-1">
                    <MethodBadge method="GET" />
                    <code className="font-mono text-sm text-foreground">foreign-ft-app/retrieve-metadata?type=sbr</code>
                </div>
                <h3 className="text-xl font-bold text-foreground">Get Sender-Beneficiary Relationships List</h3>
                <p className="text-muted-foreground text-sm">Get List of Sender/Beneficiary Relationship</p>

                <SectionCard title="Request Parameters">
                    <ParamsTable rows={[
                        {
                            name: "type",
                            type: "string",
                            required: true,
                            description: "the param name for sender/beneficiary relationships",
                            defaultVal: "sbr",
                        },
                    ]} />
                </SectionCard>

                <SectionCard title="Response Parameters">
                    <ResponseTable rows={[
                        { name: "name",  type: "Array object", description: "the name of the sender/beneficiary relationships" },
                        { name: "value", type: "Array object", description: "the code for the sender/beneficiary relationships. this code should be passed in the request" },
                    ]} />
                </SectionCard>
            </section>

            {/* ── 6. Get Purpose of Payment List ── */}
            <section className="space-y-4">
                <div className="flex items-center gap-3 mb-1">
                    <MethodBadge method="GET" />
                    <code className="font-mono text-sm text-foreground">foreign-ft-app/retrieve-metadata?type=pop</code>
                </div>
                <h3 className="text-xl font-bold text-foreground">Get Purpose of Payment List</h3>
                <p className="text-muted-foreground text-sm">Get List of Purpose of Payment</p>

                <SectionCard title="Request Parameters">
                    <ParamsTable rows={[
                        {
                            name: "type",
                            type: "string",
                            required: true,
                            description: "the param name for purpose of payment",
                            defaultVal: "pop",
                        },
                    ]} />
                </SectionCard>

                <SectionCard title="Response Parameters">
                    <ResponseTable rows={[
                        { name: "name",  type: "Array object", description: "the name of the payment purpose" },
                        { name: "value", type: "Array object", description: "the code for the payment purpose. this code should be passed in the request" },
                    ]} />
                </SectionCard>
            </section>

            {/* ── 7. Get Source of Funds List ── */}
            <section className="space-y-4">
                <div className="flex items-center gap-3 mb-1">
                    <MethodBadge method="GET" />
                    <code className="font-mono text-sm text-foreground">foreign-ft-app/retrieve-metadata?type=sof</code>
                </div>
                <h3 className="text-xl font-bold text-foreground">Get Source of Funds List</h3>
                <p className="text-muted-foreground text-sm">Get List of Sources of Funds</p>

                <SectionCard title="Request Parameters">
                    <ParamsTable rows={[
                        {
                            name: "type",
                            type: "string",
                            required: true,
                            description: "the param name for source of funds",
                            defaultVal: "sof",
                        },
                    ]} />
                </SectionCard>

                <SectionCard title="Response Parameters">
                    <ResponseTable rows={[
                        { name: "name",  type: "Array object", description: "the name of the source of funds" },
                        { name: "value", type: "Array object", description: "the code for the source of funds. this code should be passed in the request" },
                    ]} />
                </SectionCard>
            </section>

            {/* ── 8. Get List of Occupations ── */}
            <section className="space-y-4">
                <div className="flex items-center gap-3 mb-1">
                    <MethodBadge method="GET" />
                    <code className="font-mono text-sm text-foreground">foreign-ft-app/retrieve-metadata?type=ocu</code>
                </div>
                <h3 className="text-xl font-bold text-foreground">Get List of Occupations</h3>
                <p className="text-muted-foreground text-sm">Get List of Occupations</p>

                <SectionCard title="Request Parameters">
                    <ParamsTable rows={[
                        {
                            name: "type",
                            type: "string",
                            required: true,
                            description: "the param name for occupation",
                            defaultVal: "ocu",
                        },
                    ]} />
                </SectionCard>

                <SectionCard title="Response Parameters">
                    <ResponseTable rows={[
                        { name: "name",  type: "Array object", description: "the name of the occupation" },
                        { name: "value", type: "Array object", description: "the code for the occupation. this code should be passed in the request" },
                    ]} />
                </SectionCard>
            </section>

            {/* ── 9. Get List of Bank Locations (CNY B2B) ── */}
            <section className="space-y-4">
                <div className="flex items-center gap-3 mb-1">
                    <MethodBadge method="GET" />
                    <code className="font-mono text-sm text-foreground">foreign-ft-app/retrieve-metadata?type=cny</code>
                </div>
                <h3 className="text-xl font-bold text-foreground">Get List of Bank Locations (for CNY B2B Payout)</h3>
                <p className="text-muted-foreground text-sm">Get List of Bank Locations</p>

                <SectionCard title="Request Parameters">
                    <ParamsTable rows={[
                        {
                            name: "type",
                            type: "string",
                            required: true,
                            description: "the param name for bank location",
                            defaultVal: "cny",
                        },
                    ]} />
                </SectionCard>

                <SectionCard title="Response Parameters">
                    <ResponseTable rows={[
                        { name: "name",  type: "Array object", description: "the name of the bank location" },
                        { name: "value", type: "Array object", description: "the code for the bank location. this code should be passed in the request" },
                    ]} />
                </SectionCard>
            </section>

            {/* ── Payout APIs ── */}
            <section className="space-y-4">
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <Globe className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Payout APIs</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base max-w-2xl">
                    Initiate foreign payouts across multiple currencies and payment rails. Detailed request and response schemas for each endpoint are documented in the individual sub-pages.
                </p>

                <SectionCard title="Available endpoints">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-border">
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Method</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Endpoint</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Description</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {PAYOUT_APIS.map(({ method, path, desc }) => (
                                    <tr key={path + desc} className="hover:bg-muted/20 transition-colors">
                                        <td className="px-5 py-3.5"><MethodBadge method={method} /></td>
                                        <td className="px-5 py-3.5 font-mono text-xs text-foreground">{path}</td>
                                        <td className="px-5 py-3.5 text-muted-foreground">{desc}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </SectionCard>
            </section>

            {/* Key notes */}
            <section>
                <div className="flex items-center gap-3 mb-6">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <AlertCircle className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Key notes</h2>
                </div>
                <ul className="space-y-3">
                    {[
                        "Always call the country list and payment methods endpoints before initiating a payout — supported countries and methods can change.",
                        "The countryCode query parameter for available-payment-methods must be an ISO 2-letter code matching an entry from the country list response.",
                        "All metadata endpoints (type=acct, idt, sbr, pop, sof, ocu, cny) return a name/value pair array. Always pass the value field — not the name — in your payout request body.",
                        "minLimit and maxLimit in the payment methods response are in the currency of the target country. Validate your payout amount against these bounds before submitting.",
                        "CNY B2B payouts require a bank location code from the retrieve-metadata?type=cny endpoint.",
                        "All payout requests must include a valid Bearer token. Refer to the Authentication section for how to obtain and use tokens.",
                    ].map((note, i) => (
                        <li key={i} className="flex items-start gap-3">
                            <span className="mt-0.5 h-5 w-5 rounded-full bg-brand-50 dark:bg-brand-950/40 flex items-center justify-center shrink-0 text-xs font-semibold text-brand">{i + 1}</span>
                            <span className="text-muted-foreground text-sm leading-relaxed">{note}</span>
                        </li>
                    ))}
                </ul>
            </section>

        </div>
    );
};

export default PayoutBankForeignSummary;
