import {
    Rocket,
    Shield,
    CreditCard,
    Bell,
    AlertTriangle,
    TestTube2,
    CheckCircle,
    Code,
    Zap,
    BookOpen,
    ArrowRight,
    ListChecks,
} from "lucide-react";
import CodeBlock from "@/components/CodeBlock.tsx";
import { Link } from "react-router-dom";

const QuickGuides = () => {
    const getQuickStartCode = () => {
        return `// 1. Obtain access token
const authResponse = await fetch('https://{{baseUrl}}/{{userAppContext}}/merchant-app/get-auth-token', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    merchantId: process.env.MERCHANT_ID,
    apiKey: process.env.API_KEY
  })
});

const { accessToken } = (await authResponse.json()).data;

// 2. Make your first API call
const response = await fetch('https://{{baseUrl}}/{{paymentContext}}/wallet-app/get-wallet-balance', {
  method: 'GET',
  headers: {
    'Authorization': \`Bearer \${accessToken}\`,
    'x-channel-id: CHANNEL_ID',
    'x-channel-code: CHANNEL_CODE',
    'x-merchant-id': process.env.MERCHANT_ID
  }
});

const data = await response.json();
console.log('Wallet Balance:', data);`;
    };

    const getWebhookHandlerCode = () => {
        return `const crypto = require('crypto');

app.post('/webhooks/passpoint', (req, res) => {
  // 1. Verify webhook signature
  const signature = req.headers['x-passpoint-signature'];
  const payload = JSON.stringify(req.body);

  const expectedSignature = crypto
    .createHmac('sha256', process.env.WEBHOOK_SECRET)
    .update(payload)
    .digest('hex');

  if (signature !== expectedSignature) {
    return res.status(401).send('Invalid signature');
  }

  // 2. Handle the webhook event
  const event = req.body;

  switch(event.eventType) {
    case 'TRANSACTION_SUCCESSFUL':
      console.log('Transaction succeeded:', event.data.transactionId);
      // Update your database, notify customer
      break;

    case 'TRANSACTION_FAILED':
      console.log('Transaction failed:', event.data.transactionId);
      // Log failure, notify customer
      break;

    case 'VIRTUAL_CARD_AUTHORIZATION':
      console.log('Card authorization:', event.data.cardId);
      // Handle real-time authorization
      break;
  }

  // 3. Always return 200 to acknowledge receipt
  res.status(200).send('Webhook received');
});`;
    };

    const getErrorHandlingCode = () => {
        return `async function handlePasspointRequest(url, options) {
  try {
    const response = await fetch(url, options);
    const result = await response.json();

    // Check Passpoint response code
    switch(result.responseCode) {
      case '00':
        // Success
        return result.data;

      case '01':
        // Pending - monitor via webhook
        console.log('Transaction pending, awaiting completion');
        return result;

      case '06':
        // Session timeout - refresh token and retry
        console.warn('Session expired, refreshing token...');
        await refreshAccessToken();
        return handlePasspointRequest(url, options);

      case '30':
      case '31':
        // Validation errors
        throw new Error(\`Validation error: \${result.responseMessage}\`);

      case '60':
        // Security violation
        throw new Error(\`Authentication failed: \${result.responseMessage}\`);

      default:
        // Other errors
        throw new Error(\`API error (\${result.responseCode}): \${result.responseMessage}\`);
    }

  } catch (error) {
    console.error('Request failed:', error);
    throw error;
  }
}`;
    };

    const GUIDE_CARDS = [
        {
            icon: <Rocket className="h-5 w-5 text-brand" />,
            title: "5-Minute Quickstart",
            desc: "Set up your development environment and make your first API call in under 5 minutes.",
            href: "/getting-started/introduction",
            bullets: ["Create API credentials", "Configure authentication", "Make test requests"],
        },
        {
            icon: <Shield className="h-5 w-5 text-brand" />,
            title: "Authentication Setup",
            desc: "Securely authenticate with Passpoint APIs using API keys and access tokens.",
            href: "/getting-started/api-integrations",
            bullets: ["API key management", "Token lifecycle", "Security best practices"],
        },
        {
            icon: <CreditCard className="h-5 w-5 text-brand" />,
            title: "Transaction Processing",
            desc: "Process payments, refunds, and handle transaction states with confidence.",
            href: "/guides/transaction-dynamics",
            bullets: ["Create transactions", "Handle callbacks", "Process refunds"],
        },
        {
            icon: <Bell className="h-5 w-5 text-brand" />,
            title: "Webhook Integration",
            desc: "Set up webhooks to receive real-time notifications about transaction events.",
            href: null,
            bullets: ["Configure endpoints", "Verify signatures", "Handle retries"],
        },
        {
            icon: <AlertTriangle className="h-5 w-5 text-brand" />,
            title: "Error Handling",
            desc: "Implement robust error handling and recovery strategies for production systems.",
            href: "/status-responses",
            bullets: ["Error response formats", "Retry mechanisms", "Logging strategies"],
        },
        {
            icon: <TestTube2 className="h-5 w-5 text-brand" />,
            title: "Testing & Sandbox",
            desc: "Use Passpoint's sandbox environment to test your integration before going live.",
            href: null,
            bullets: ["Sandbox setup", "Test scenarios", "Production deployment"],
        },
    ] as const;

    const INTEGRATION_PATTERNS = [
        {
            icon: <Code className="h-5 w-5 text-brand" />,
            title: "E-commerce integration",
            desc: "Integrate Passpoint with your e-commerce platform for seamless payment processing at checkout.",
            bullets: [
                "Create wallet for new customers during registration",
                "Initiate transfer/payout at checkout",
                "Monitor transaction status via webhooks",
                "Update order status based on payment completion",
            ],
        },
        {
            icon: <BookOpen className="h-5 w-5 text-brand" />,
            title: "Virtual card implementation",
            desc: "Issue virtual cards to customers for secure online payments and spending control.",
            bullets: [
                "Create customer profile and virtual card",
                "Fund card from wallet or external source",
                "Receive real-time authorization webhooks",
                "Manage card lifecycle (freeze, unfreeze, terminate)",
            ],
        },
        {
            icon: <Zap className="h-5 w-5 text-brand" />,
            title: "Bulk payout system",
            desc: "Process high-volume payouts efficiently for marketplace sellers, contractors, or affiliates.",
            bullets: [
                "Validate recipient bank details before processing",
                "Use bulk transfer endpoints to minimize API calls",
                "Implement idempotency with unique client references",
                "Monitor payout status and reconcile failed transactions",
            ],
        },
    ] as const;

    return (
        <div className="py-8 sm:py-10 space-y-16">

            {/* ── Hero ───────────────────────────────────────────────── */}
            <section>
                <div className="inline-flex items-center gap-2 bg-brand-50 dark:bg-brand-950/40 text-brand text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
                    <ListChecks className="h-3.5 w-3.5" />
                    Guides
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground dark:text-foreground tracking-tight mb-4">
                    Quick start guides
                </h1>
                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl">
                    Get up and running with Passpoint APIs in minutes. Step-by-step guides for common integration
                    scenarios — from authentication to transaction processing.
                </p>
            </section>

            {/* ── Guide Cards ────────────────────────────────────────── */}
            <section>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">Getting started</h2>
                <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
                    Pick a guide that matches where you are in the integration journey.
                </p>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {GUIDE_CARDS.map(({ icon, title, desc, href, bullets }) => {
                        const inner = (
                            <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 h-full hover:border-brand/40 hover:shadow-md transition-all group">
                                <div className="bg-brand-50 dark:bg-brand-950/40 w-10 h-10 rounded-full flex items-center justify-center mb-4">
                                    {icon}
                                </div>
                                <h3 className="text-sm font-semibold text-foreground mb-2 group-hover:text-brand transition-colors">
                                    {title}
                                </h3>
                                <p className="text-xs text-muted-foreground leading-relaxed mb-4">{desc}</p>
                                <ul className="space-y-1.5">
                                    {bullets.map((b) => (
                                        <li key={b} className="flex items-center gap-2 text-xs text-muted-foreground">
                                            <CheckCircle className="h-3.5 w-3.5 text-brand shrink-0" />
                                            {b}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        );
                        return href ? (
                            <Link key={title} to={href}>{inner}</Link>
                        ) : (
                            <div key={title}>{inner}</div>
                        );
                    })}
                </div>
            </section>

            {/* ── 5-Minute Integration ────────────────────────────────── */}
            <section>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">5-minute integration</h2>
                <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
                    Authenticate and make your first API call. This example uses JavaScript — the same concepts
                    apply to any language.
                </p>

                <CodeBlock language="javascript" title="Quick Start Example">
                    {getQuickStartCode()}
                </CodeBlock>

                <div className="mt-6 bg-muted/40 dark:bg-background/40 border border-border rounded-2xl p-5">
                    <div className="flex items-center gap-2 mb-3">
                        <Zap className="h-4 w-4 text-brand" />
                        <h3 className="text-sm font-semibold text-brand">Next steps</h3>
                    </div>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>
                            • Review the{" "}
                            <Link to="/api-documentation/authentication" className="text-brand hover:underline font-medium">
                                Authentication documentation
                            </Link>{" "}
                            for token management details
                        </li>
                        <li>• Set up webhooks to receive real-time transaction updates</li>
                        <li>
                            • Explore the{" "}
                            <Link to="/api-documentation/wallet" className="text-brand hover:underline font-medium">
                                Wallet API
                            </Link>{" "}
                            to manage customer wallets
                        </li>
                        <li>• Implement error handling for production readiness</li>
                        <li>• Review rate limits and implement retry logic</li>
                    </ul>
                </div>
            </section>

            {/* ── Webhook Integration ─────────────────────────────────── */}
            <section>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">Webhook integration</h2>
                <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
                    Webhooks provide real-time notifications about transaction events — the recommended approach
                    over polling for status updates.
                </p>

                <CodeBlock language="javascript" title="Webhook Handler Implementation">
                    {getWebhookHandlerCode()}
                </CodeBlock>

                <div className="mt-6 grid md:grid-cols-2 gap-4">
                    <div className="bg-white dark:bg-card border border-border rounded-2xl p-5">
                        <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-brand" />
                            Best practices
                        </h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            {[
                                "Always verify webhook signatures to prevent spoofing",
                                "Return 200 immediately to acknowledge receipt",
                                "Process webhook data asynchronously using queues",
                                "Implement idempotency to handle duplicate webhooks",
                                "Log all webhook events for debugging",
                            ].map((item) => (
                                <li key={item} className="flex items-start gap-2">
                                    <div className="w-1.5 h-1.5 bg-brand rounded-full shrink-0 mt-1.5" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-white dark:bg-card border border-border rounded-2xl p-5">
                        <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                            Common webhook events
                        </h4>
                        <ul className="space-y-2">
                            {[
                                "TRANSACTION_SUCCESSFUL",
                                "TRANSACTION_FAILED",
                                "TRANSACTION_PENDING",
                                "VIRTUAL_CARD_AUTHORIZATION",
                                "WALLET_BALANCE_UPDATED",
                            ].map((evt) => (
                                <li key={evt}>
                                    <code className="text-xs bg-muted dark:bg-muted/30 px-2 py-0.5 rounded font-mono text-foreground">
                                        {evt}
                                    </code>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* ── Error Handling ─────────────────────────────────────── */}
            <section>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
                    Production-ready error handling
                </h2>
                <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
                    Passpoint uses response codes to indicate the status of each request. Always check the{" "}
                    <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">responseCode</code> field.
                </p>

                <CodeBlock language="javascript" title="Comprehensive Error Handling">
                    {getErrorHandlingCode()}
                </CodeBlock>
            </section>

            {/* ── Integration Patterns ────────────────────────────────── */}
            <section>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">Common integration patterns</h2>
                <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
                    Real-world patterns to guide how you structure your Passpoint integration.
                </p>

                <div className="space-y-4">
                    {INTEGRATION_PATTERNS.map(({ icon, title, desc, bullets }) => (
                        <div
                            key={title}
                            className="bg-white dark:bg-card border border-border rounded-2xl p-6 flex items-start gap-4"
                        >
                            <div className="bg-brand-50 dark:bg-brand-950/40 w-10 h-10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                                {icon}
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-foreground mb-1 capitalize">{title}</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed mb-3">{desc}</p>
                                <ul className="space-y-1.5">
                                    {bullets.map((b) => (
                                        <li key={b} className="flex items-center gap-2 text-xs text-muted-foreground">
                                            <CheckCircle className="h-3.5 w-3.5 text-brand shrink-0" />
                                            {b}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── Sandbox Environment ─────────────────────────────────── */}
            <section>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">Sandbox environment</h2>
                <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
                    Test your integration without affecting real data or processing actual transactions.
                </p>

                <div className="bg-muted/40 dark:bg-background/40 border border-border rounded-2xl p-6 mb-6">
                    <h3 className="text-sm font-semibold text-brand mb-3">Development environment</h3>
                    <div className="font-mono text-xs space-y-1 text-muted-foreground">
                        <div>Base URL: <span className="text-foreground">{"https://{{baseUrl}}"}</span></div>
                        <div>Sandbox: <span className="text-foreground">https://payment-sandbox.mypasspoint.com</span></div>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white dark:bg-card border border-border rounded-2xl p-5">
                        <h4 className="text-sm font-semibold text-foreground mb-3">Test scenarios</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            {[
                                "Create test wallets and virtual cards",
                                "Simulate successful and failed transactions",
                                "Test webhook delivery and signature verification",
                                "Verify error handling for all response codes",
                                "Load test rate limiting behavior",
                            ].map((item) => (
                                <li key={item} className="flex items-start gap-2">
                                    <div className="w-1.5 h-1.5 bg-brand rounded-full shrink-0 mt-1.5" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-white dark:bg-card border border-border rounded-2xl p-5">
                        <h4 className="text-sm font-semibold text-foreground mb-3">Production checklist</h4>
                        <ul className="space-y-2">
                            {[
                                "Webhooks configured and tested",
                                "Error handling implemented",
                                "Rate limiting strategy in place",
                                "Logging and monitoring configured",
                                "Security review completed",
                            ].map((item) => (
                                <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <CheckCircle className="h-4 w-4 text-brand shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="mt-6 text-center">
                    <Link
                        to="/sandbox-playground"
                        className="inline-flex items-center gap-2 bg-brand hover:bg-brand-600 text-white px-6 py-2.5 rounded-lg font-semibold text-sm transition-colors shadow-sm"
                    >
                        Open sandbox playground
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default QuickGuides;
