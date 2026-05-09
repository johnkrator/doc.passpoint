import { Users, Shield, Settings, Key, Lock, CheckCircle, XCircle, AlertTriangle, UserCog } from "lucide-react";
import CodeBlock from "@/components/CodeBlock.tsx";

const UserRoles = () => {
    const getRoleCheckExampleCode = () => {
        return `// Example: Checking user roles in your application
async function checkUserPermissions(userId, requiredRole) {
  const user = await getUserById(userId);

  // Role hierarchy: ADMINISTRATOR > MANAGER > EMPLOYEE
  const roleHierarchy = {
    'ADMINISTRATOR': 3,
    'MANAGER': 2,
    'EMPLOYEE': 1
  };

  const userRoleLevel = roleHierarchy[user.role];
  const requiredRoleLevel = roleHierarchy[requiredRole];

  return userRoleLevel >= requiredRoleLevel;
}

// Usage example
if (await checkUserPermissions(currentUserId, 'MANAGER')) {
  // User has manager or administrator privileges
  allowAccessToFinancialReports();
} else {
  throw new Error('Insufficient permissions');
}`;
    };

    const getApiKeyPermissionsCode = () => {
        return `// API key permissions example
const apiKeyConfig = {
  keyId: 'pk_live_abc123',
  merchantId: 'merchant_xyz',
  permissions: {
    'wallet:read': true,
    'wallet:write': true,
    'transfer:create': true,
    'transfer:read': true,
    'settings:modify': false,  // Restricted
    'users:manage': false      // Restricted
  },
  scope: 'LIMITED_WRITE',  // READ_ONLY | LIMITED_WRITE | FULL_ACCESS
  createdBy: 'user_manager_001',
  expiresAt: '2024-12-31T23:59:59Z'
};

// Validate API key permissions before operation
function validateOperation(apiKey, operation) {
  if (!apiKey.permissions[operation]) {
    throw new Error(\`API key lacks permission: \${operation}\`);
  }
  return true;
}`;
    };

    const ROLES = [
        {
            icon: <Shield className="h-5 w-5 text-brand" />,
            name: "Administrator",
            desc: "Complete control over the Passpoint merchant account with unrestricted access to all features, settings, and sensitive operations.",
            permissions: [
                { ok: true, label: "Full user management and role assignment" },
                { ok: true, label: "Unrestricted financial data access" },
                { ok: true, label: "API key and webhook configuration" },
                { ok: true, label: "Account settings and billing management" },
                { ok: true, label: "Audit logs and security monitoring" },
                { ok: true, label: "Transaction approval and reversal rights" },
            ],
        },
        {
            icon: <Users className="h-5 w-5 text-brand" />,
            name: "Manager",
            desc: "Supervisory role with access to team operations, financial oversight, and limited user management for operational efficiency.",
            permissions: [
                { ok: true, label: "Transaction approval workflows" },
                { ok: true, label: "Team financial reporting access" },
                { ok: true, label: "Limited team member management" },
                { ok: true, label: "Spending analytics and insights" },
                { ok: true, label: "Transaction limit configuration" },
                { ok: false, label: "Cannot manage API keys or webhooks" },
            ],
        },
        {
            icon: <Settings className="h-5 w-5 text-brand" />,
            name: "Employee",
            desc: "Basic operational access for individual contributors with permissions limited to personal transactions and assigned resources.",
            permissions: [
                { ok: true, label: "Submit and track personal transactions" },
                { ok: true, label: "View personal transaction history" },
                { ok: true, label: "Access assigned virtual cards/wallets" },
                { ok: true, label: "Update profile and preferences" },
                { ok: false, label: "No access to team data or reports" },
                { ok: false, label: "Cannot manage users or settings" },
            ],
        },
    ] as const;

    const PERMISSION_MATRIX = [
        { feature: "View personal transactions", employee: "yes", manager: "yes", admin: "yes" },
        { feature: "Submit transactions", employee: "yes", manager: "yes", admin: "yes" },
        { feature: "View team transactions & reports", employee: "no", manager: "yes", admin: "yes" },
        { feature: "Approve / reject transactions", employee: "no", manager: "yes", admin: "yes" },
        { feature: "Set transaction limits", employee: "no", manager: "yes", admin: "yes" },
        { feature: "Manage team members (limited)", employee: "no", manager: "limited", admin: "yes" },
        { feature: "Access financial analytics", employee: "no", manager: "yes", admin: "yes" },
        { feature: "Manage API keys", employee: "no", manager: "no", admin: "yes" },
        { feature: "Configure webhooks", employee: "no", manager: "no", admin: "yes" },
        { feature: "Manage all users & roles", employee: "no", manager: "no", admin: "yes" },
        { feature: "Modify account settings", employee: "no", manager: "no", admin: "yes" },
        { feature: "Access audit logs", employee: "no", manager: "no", admin: "yes" },
    ] as const;

    const API_KEY_TYPES = [
        {
            icon: <Lock className="h-5 w-5 text-brand" />,
            name: "Read-Only Keys",
            scope: "READ_ONLY",
            desc: "Can retrieve data but cannot create or modify resources. Ideal for analytics, reporting, and monitoring.",
            can: ["View wallet balances", "Check transaction status", "Generate reports"],
            cannot: ["No write operations"],
            warning: false,
        },
        {
            icon: <Key className="h-5 w-5 text-brand" />,
            name: "Limited Write Keys",
            scope: "LIMITED_WRITE",
            desc: "Can create transactions and manage wallets but cannot modify account settings, webhooks, or user permissions.",
            can: ["Create transactions", "Manage wallets", "Initiate payouts"],
            cannot: ["No settings changes"],
            warning: false,
        },
        {
            icon: <Shield className="h-5 w-5 text-brand" />,
            name: "Full Access Keys",
            scope: "FULL_ACCESS",
            desc: "Complete API access equivalent to administrator-level permissions. Use with extreme caution.",
            can: ["All transaction operations", "Manage webhooks", "Modify account settings"],
            cannot: ["Requires secure storage"],
            warning: true,
        },
    ] as const;

    const PermIcon = ({ value }: { value: "yes" | "no" | "limited" }) => {
        if (value === "yes") return <CheckCircle className="h-4 w-4 text-brand mx-auto" />;
        if (value === "limited") return <AlertTriangle className="h-4 w-4 text-amber-500 mx-auto" />;
        return <XCircle className="h-4 w-4 text-muted-foreground/40 mx-auto" />;
    };

    return (
        <div className="py-8 sm:py-10 space-y-16">

            {/* ── Hero ───────────────────────────────────────────────── */}
            <section>
                <div className="inline-flex items-center gap-2 bg-brand-50 dark:bg-brand-950/40 text-brand text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
                    <UserCog className="h-3.5 w-3.5" />
                    Reference
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
                    User roles &amp; permissions
                </h1>
                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl">
                    Passpoint's role-based access control (RBAC) system manages user permissions and API access.
                    Three hierarchical roles provide appropriate access levels for security and operational efficiency.
                </p>
            </section>

            {/* ── Role Types ─────────────────────────────────────────── */}
            <section>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-8">User role types</h2>

                <div className="space-y-4">
                    {ROLES.map(({ icon, name, desc, permissions }) => (
                        <div key={name} className="bg-white dark:bg-card border border-border rounded-2xl p-6">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="bg-brand-50 dark:bg-brand-950/40 w-10 h-10 rounded-full flex items-center justify-center shrink-0">
                                    {icon}
                                </div>
                                <h3 className="text-base font-semibold text-foreground">{name}</h3>
                            </div>
                            <p className="text-sm text-muted-foreground leading-relaxed mb-4">{desc}</p>
                            <div className="grid sm:grid-cols-2 gap-2">
                                {permissions.map(({ ok, label }) => (
                                    <div key={label} className="flex items-start gap-2 text-sm text-muted-foreground">
                                        {ok
                                            ? <CheckCircle className="h-4 w-4 text-brand shrink-0 mt-0.5" />
                                            : <XCircle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                                        }
                                        {label}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── Permission Matrix ──────────────────────────────────── */}
            <section>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">Permission matrix</h2>
                <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
                    A comprehensive view of which operations each role can perform across the Passpoint system.
                </p>

                <div className="bg-white dark:bg-card border border-border rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-border bg-muted/30">
                                    <th className="px-5 py-3.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Feature / Operation</th>
                                    <th className="px-4 py-3.5 text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider w-28">Employee</th>
                                    <th className="px-4 py-3.5 text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider w-28">Manager</th>
                                    <th className="px-4 py-3.5 text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider w-28">Admin</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {PERMISSION_MATRIX.map(({ feature, employee, manager, admin }) => (
                                    <tr key={feature} className="hover:bg-muted/20 transition-colors">
                                        <td className="px-5 py-3.5 text-sm text-foreground">{feature}</td>
                                        <td className="px-4 py-3.5"><PermIcon value={employee} /></td>
                                        <td className="px-4 py-3.5"><PermIcon value={manager} /></td>
                                        <td className="px-4 py-3.5"><PermIcon value={admin} /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="mt-3 flex items-center gap-5 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5 text-brand" /> Full access</div>
                    <div className="flex items-center gap-1.5"><AlertTriangle className="h-3.5 w-3.5 text-amber-500" /> Limited access</div>
                    <div className="flex items-center gap-1.5"><XCircle className="h-3.5 w-3.5 text-muted-foreground/40" /> No access</div>
                </div>
            </section>

            {/* ── API Key Permission Levels ───────────────────────────── */}
            <section>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">API key permission levels</h2>
                <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
                    Create API keys with specific scopes tailored to your integration needs using the principle of
                    least privilege.
                </p>

                <div className="grid sm:grid-cols-3 gap-4 mb-8">
                    {API_KEY_TYPES.map(({ icon, name, scope, desc, can, cannot, warning }) => (
                        <div
                            key={name}
                            className={`bg-white dark:bg-card border rounded-2xl p-5 ${warning ? "border-red-200 dark:border-red-800/30" : "border-border"}`}
                        >
                            <div className="flex items-center gap-2.5 mb-3">
                                <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${warning ? "bg-red-50 dark:bg-red-950/30" : "bg-brand-50 dark:bg-brand-950/40"}`}>
                                    {icon}
                                </div>
                                <div>
                                    <div className="text-sm font-semibold text-foreground">{name}</div>
                                    <code className="text-[10px] text-muted-foreground font-mono">{scope}</code>
                                </div>
                            </div>
                            <p className={`text-xs leading-relaxed mb-3 ${warning ? "text-red-600 dark:text-red-400" : "text-muted-foreground"}`}>
                                {desc}
                            </p>
                            <ul className="space-y-1.5">
                                {can.map((item) => (
                                    <li key={item} className="flex items-start gap-1.5 text-xs text-muted-foreground">
                                        <CheckCircle className="h-3.5 w-3.5 text-brand shrink-0 mt-0.5" /> {item}
                                    </li>
                                ))}
                                {cannot.map((item) => (
                                    <li key={item} className="flex items-start gap-1.5 text-xs text-muted-foreground">
                                        {warning
                                            ? <AlertTriangle className="h-3.5 w-3.5 text-amber-500 shrink-0 mt-0.5" />
                                            : <XCircle className="h-3.5 w-3.5 text-red-400 shrink-0 mt-0.5" />
                                        }
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <CodeBlock language="javascript" title="API Key Permission Validation Example">
                    {getApiKeyPermissionsCode()}
                </CodeBlock>
            </section>

            {/* ── Implementation Example ─────────────────────────────── */}
            <section>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">Implementation example</h2>
                <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
                    How to implement role-based access control in your application when integrating with Passpoint.
                </p>

                <CodeBlock language="javascript" title="Role-Based Access Control Example">
                    {getRoleCheckExampleCode()}
                </CodeBlock>

                <div className="mt-6 bg-muted/40 dark:bg-background/40 border border-border rounded-2xl p-6">
                    <h3 className="text-sm font-semibold text-brand mb-3">Best practices</h3>
                    <ul className="space-y-2">
                        {[
                            "Follow the principle of least privilege — grant users only the permissions they need",
                            "Use Limited Write API keys for production integrations instead of Full Access keys",
                            "Regularly audit user roles and API key permissions to maintain security",
                            "Implement session management to handle role changes in real-time",
                            "Store API keys securely using environment variables or secret management systems",
                            "Rotate API keys periodically and immediately after any security incident",
                            "Document which team members have which roles for compliance and auditing",
                            "Immediately revoke access when team members change roles or leave the organization",
                        ].map((item) => (
                            <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                                <CheckCircle className="h-4 w-4 text-brand shrink-0 mt-0.5" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </div>
    );
};

export default UserRoles;
