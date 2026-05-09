import { useState, useCallback } from "react";
import {
    Terminal,
    Key,
    Globe,
    AlertTriangle,
    CheckCircle,
    ArrowRight,
    Code,
    BookOpen,
    XCircle,
    Zap,
    DollarSign,
    Copy,
    Check,
    Plug,
} from "lucide-react";
import CodeBlock from "@/components/CodeBlock.tsx";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const ApiIntegrations = () => {
    const [copiedDev, setCopiedDev] = useState(false);
    const [copiedProd, setCopiedProd] = useState(false);

    const handleCopy = useCallback((url: string, env: "dev" | "prod"): void => {
        navigator.clipboard.writeText(url).then(() => {
            if (env === "dev") {
                setCopiedDev(true);
                setTimeout(() => setCopiedDev(false), 2000);
            } else {
                setCopiedProd(true);
                setTimeout(() => setCopiedProd(false), 2000);
            }
        }).catch(() => {
            toast.error("Failed to copy URL. Please copy it manually.");
        });
    }, []);

    const getRestApiExampleCode = () => {
        return `curl --location 'https://{{baseUrl}}/{{paymentContext}}/wallet-app/get-wallet-balance?currency=all'
  --header 'Authorization: Bearer YOUR_ACCESS_TOKEN'
  --header 'x-channel-id: CHANNEL_ID'
  --header 'x-channel-code: CHANNEL_CODE'
  --header 'x-merchant-id: YOUR_MERCHANT_ID'`;
    };

    const getRequiredHeadersCode = () => {
        return `Authorization: Bearer YOUR_ACCESS_TOKEN
Content-Type: application/json
x-channel-id: CHANNEL_ID
x-channel-code: CHANNEL_CODE
x-merchant-id: YOUR_MERCHANT_ID`;
    };

    const getAuthenticationExampleCode = () => {
        return `const axios = require('axios');

// Get access token
async function getAccessToken() {
  try {
    const response = await axios.post('https://{{baseUrl}}/{{userAppContext}}/merchant-app/get-auth-token', {
      merchantId: process.env.MERCHANT_ID,
      apiKey: process.env.API_KEY
    });

    const { accessToken, expiresIn } = response.data.data;
    console.log('Access token obtained, expires in:', expiresIn, 'seconds');
    return accessToken;
  } catch (error) {
    console.error('Authentication failed:', error.response.data);
    throw error;
  }
}`;
    };

    const getCreateWalletExampleCode = () => {
        return `// Get wallet balance
async function getWalletBalance(accessToken) {
  try {
    const response = await axios.get('https://{{baseUrl}}/{{paymentContext}}/wallet-app/get-wallet-balance?currency=all', {
      headers: {
        'Authorization': \`Bearer \${accessToken}\`,
        'x-channel-id': 'CHANNEL_ID',
        'x-channel-code': 'CHANNEL_CODE',
        'x-merchant-id': process.env.MERCHANT_ID
      }
    });

    const balances = response.data.data;
    console.log('Wallet balances:', balances);
    return balances;
  } catch (error) {
    console.error('Fetch wallet balance failed:', error.response.data);
    throw error;
  }
}`;
    };

    const getCompleteIntegrationCode = () => {
        return `// Complete integration example
async function integratePasspoint() {
  try {
    // Step 1: Authenticate
    const accessToken = await getAccessToken();

    // Step 2: Create wallet
    const wallet = await createWallet(accessToken);

    // Step 3: Perform operations (transfer, payout, etc.)
    console.log('Integration complete. Wallet ID:', wallet.walletId);

  } catch (error) {
    console.error('Integration error:', error.message);
  }
}

// Start integration
integratePasspoint();`;
    };

    const getErrorHandlingCode = () => {
        return `async function makeApiCallWithErrorHandling() {
  try {
    const response = await axios.post(apiUrl, requestData, { headers });

    // Check response code
    if (response.data.responseCode === '00') {
      // Success - check data.status for processing result
      if (response.data.data.status === '00') {
        console.log('Transaction successful:', response.data.data);
        return response.data.data;
      } else if (response.data.data.status === '01') {
        console.log('Transaction pending:', response.data.data);
        // Handle pending status - wait for webhook
      } else {
        console.error('Transaction failed:', response.data.data);
        throw new Error(response.data.responseMessage);
      }
    } else if (response.data.responseCode === '02') {
      // Request failed
      throw new Error(\`Request failed: \${response.data.responseMessage}\`);
    }
  } catch (error) {
    if (error.response) {
      // API returned error response
      const { responseCode, responseMessage } = error.response.data;

      switch(responseCode) {
        case '30':
        case '31':
          console.error('Validation error:', responseMessage);
          break;
        case '60':
          console.error('Security violation - check credentials');
          break;
        case '06':
          console.error('Session timeout - refresh token');
          await refreshToken();
          break;
        default:
          console.error('API error:', responseMessage);
      }
    } else if (error.request) {
      // Network error
      console.error('Network error - no response received');
    } else {
      console.error('Request setup error:', error.message);
    }
    throw error;
  }
}`;
    };

    const getTokenRefreshCode = () => {
        return `let accessToken = null;
let tokenExpiryTime = null;

async function getValidToken() {
  const now = Date.now();

  // Check if token exists and is still valid (with 1 minute buffer)
  if (accessToken && tokenExpiryTime && now < tokenExpiryTime - 60000) {
    return accessToken;
  }

  // Token expired or doesn't exist - get new one
  const response = await axios.post(
    'https://{{baseUrl}}/{{userAppContext}}/merchant-app/get-auth-token',
    {
      merchantId: process.env.MERCHANT_ID,
      apiKey: process.env.API_KEY
    }
  );

  accessToken = response.data.data.accessToken;
  const expiresIn = response.data.data.expiresIn; // in seconds
  tokenExpiryTime = now + (expiresIn * 1000);

  console.log(\`New token obtained, expires at \${new Date(tokenExpiryTime).toISOString()}\`);
  return accessToken;
}

// Use in your API calls
async function makeApiCall(endpoint, data) {
  const token = await getValidToken();
  return axios.post(endpoint, data, {
    headers: {
      'Authorization': \`Bearer \${token}\`,
      'Content-Type': 'application/json',
      'x-channel-id: CHANNEL_ID',
      'x-channel-code: CHANNEL_CODE',
      'x-merchant-id': process.env.MERCHANT_ID
    }
  });
}`;
    };

    const getWebhookSetupCode = () => {
        return `const express = require('express');
const crypto = require('crypto');
const app = express();

app.use(express.json());

// Webhook endpoint
app.post('/webhooks/passpoint', (req, res) => {
  try {
    const webhookData = req.body;

    console.log('Webhook received:', webhookData);

    // Process webhook based on event type
    switch(webhookData.eventType) {
      case 'payment.success':
        handlePaymentSuccess(webhookData);
        break;
      case 'payment.failed':
        handlePaymentFailure(webhookData);
        break;
      case 'payout.completed':
        handlePayoutCompleted(webhookData);
        break;
      case 'wallet.credited':
        handleWalletCredited(webhookData);
        break;
      default:
        console.log('Unknown event type:', webhookData.eventType);
    }

    // Respond immediately to acknowledge receipt
    res.status(200).json({ received: true });

  } catch (error) {
    console.error('Webhook processing error:', error);
    res.status(500).json({ error: 'Processing failed' });
  }
});

async function handlePaymentSuccess(data) {
  // Update your database
  // Send confirmation email
  // Trigger fulfillment process
  console.log('Processing successful payment:', data);
}

app.listen(3000, () => {
  console.log('Webhook server running on port 3000');
});`;
    };

    const getRetryLogicCode = () => {
        return `async function makeApiCallWithRetry(endpoint, data, maxRetries = 3) {
  let lastError;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await makeApiCall(endpoint, data);
      return response.data;
    } catch (error) {
      lastError = error;

      // Don't retry on client errors (4xx)
      if (error.response && error.response.status >= 400 && error.response.status < 500) {
        throw error;
      }

      // Don't retry on validation errors
      if (error.response?.data?.responseCode === '30' || error.response?.data?.responseCode === '31') {
        throw error;
      }

      if (attempt < maxRetries) {
        // Exponential backoff: 1s, 2s, 4s
        const delay = Math.pow(2, attempt - 1) * 1000;
        console.log(\`Retry attempt \${attempt} after \${delay}ms\`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }

  throw lastError;
}`;
    };

    return (
        <div className="py-8 sm:py-10 space-y-16">

            {/* ── Hero ───────────────────────────────────────────────── */}
            <section>
                <div className="inline-flex items-center gap-2 bg-brand-50 dark:bg-brand-950/40 text-brand text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
                    <Plug className="h-3.5 w-3.5" />
                    Developer guide
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground dark:text-foreground tracking-tight mb-4">
                    API Integrations
                </h1>
                <p className="text-muted-foreground dark:text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl">
                    Integrate Passpoint APIs into your application with comprehensive guides, code examples, and
                    best practices for secure payment processing, wallet management, and transfer operations.
                </p>
            </section>

            {/* ── Important Notices ──────────────────────────────────── */}
            <section className="grid gap-4 sm:grid-cols-2">
                <div className="bg-muted/40 dark:bg-background/40 border border-border rounded-2xl p-5 flex items-start gap-4">
                    <div className="bg-brand/10 dark:bg-brand/15 w-9 h-9 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle className="h-4.5 w-4.5 text-brand" />
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-brand mb-1">Dashboard Access</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Your <strong className="text-foreground">API keys</strong> and <strong className="text-foreground">merchant IDs</strong> are in the{" "}
                            <strong className="text-foreground">Developers section</strong> of your Passpoint dashboard.
                        </p>
                    </div>
                </div>

                <div className="bg-muted/40 dark:bg-background/40 border border-border rounded-2xl p-5 flex items-start gap-4">
                    <div className="bg-amber-100 dark:bg-amber-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                        <AlertTriangle className="h-4.5 w-4.5 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-amber-700 dark:text-amber-400 mb-1">Token Expiry</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Bearer tokens expire after <strong className="text-foreground">10 min</strong> (dev) and{" "}
                            <strong className="text-foreground">1 hour</strong> (production). Plan your refresh strategy accordingly.
                        </p>
                    </div>
                </div>
            </section>

            {/* ── Integration Methods ────────────────────────────────── */}
            <section>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground dark:text-foreground mb-3">
                    Integration methods
                </h2>
                <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
                    Three primary ways to connect your application to the Passpoint infrastructure.
                </p>

                <div className="space-y-6">
                    {/* REST API */}
                    <div className="bg-white dark:bg-card border border-border dark:border-border rounded-2xl p-6 lg:p-8">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="bg-brand-50 dark:bg-brand-950/40 w-10 h-10 rounded-full flex items-center justify-center shrink-0">
                                <Terminal className="h-5 w-5 text-brand" />
                            </div>
                            <h3 className="text-lg font-semibold text-foreground">REST API</h3>
                        </div>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                            Direct HTTP calls to Passpoint RESTful endpoints with JSON payloads. Perfect for custom
                            integrations and server-side applications.
                        </p>
                        <CodeBlock language="bash">{getRestApiExampleCode()}</CodeBlock>
                    </div>

                    {/* SDKs */}
                    <div className="bg-white dark:bg-card border border-border dark:border-border rounded-2xl p-6 lg:p-8">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="bg-brand-50 dark:bg-brand-950/40 w-10 h-10 rounded-full flex items-center justify-center shrink-0">
                                <Key className="h-5 w-5 text-brand" />
                            </div>
                            <h3 className="text-lg font-semibold text-foreground">SDKs & HTTP clients</h3>
                        </div>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                            Passpoint provides comprehensive REST APIs you can wrap into language-specific libraries
                            with built-in error handling and retry logic.
                        </p>
                        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                            {[
                                { lang: "Node.js", client: "axios / fetch" },
                                { lang: "Python", client: "requests" },
                                { lang: "Java", client: "OkHttp / HttpClient" },
                                { lang: "PHP", client: "cURL / Guzzle" },
                                { lang: "C#", client: "HttpClient" },
                                { lang: "Go", client: "net/http" },
                            ].map(({ lang, client }) => (
                                <div
                                    key={lang}
                                    className="bg-muted/40 dark:bg-background/40 border border-border rounded-xl p-4"
                                >
                                    <div className="text-sm font-semibold text-foreground mb-1">{lang}</div>
                                    <div className="text-xs text-muted-foreground font-mono">{client}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Webhooks */}
                    <div className="bg-white dark:bg-card border border-border dark:border-border rounded-2xl p-6 lg:p-8">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="bg-brand-50 dark:bg-brand-950/40 w-10 h-10 rounded-full flex items-center justify-center shrink-0">
                                <Globe className="h-5 w-5 text-brand" />
                            </div>
                            <h3 className="text-lg font-semibold text-foreground">Webhooks</h3>
                        </div>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                            Configure global callbacks to receive real-time notifications about transaction events,
                            payment status changes, and system updates.
                        </p>
                        <div className="grid gap-2.5 sm:grid-cols-2">
                            {[
                                "Payment transaction status",
                                "Wallet balance updates",
                                "Transfer confirmations",
                                "Payout notifications",
                                "Collection receipts",
                                "Security alerts",
                            ].map((item) => (
                                <div key={item} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                                    <div className="w-1.5 h-1.5 bg-brand rounded-full shrink-0" />
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Authentication & Headers ───────────────────────────── */}
            <section>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground dark:text-foreground mb-8">
                    Authentication &amp; headers
                </h2>

                {/* Security callout */}
                <div className="bg-muted/40 dark:bg-background/40 border border-border rounded-2xl p-5 flex items-start gap-4 mb-8">
                    <div className="bg-amber-100 dark:bg-amber-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                        <AlertTriangle className="h-4.5 w-4.5 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-amber-700 dark:text-amber-400 mb-1">Security best practice</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Never expose access tokens in client-side code. Always make API calls from your secure
                            server and implement proper token refresh strategies.
                        </p>
                    </div>
                </div>

                <div className="space-y-8">
                    {/* Required headers */}
                    <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Required headers</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                            Every API request to Passpoint must include these headers:
                        </p>
                        <CodeBlock>{getRequiredHeadersCode()}</CodeBlock>
                    </div>

                    {/* Environment URLs */}
                    <div>
                        <h3 className="text-lg font-semibold text-foreground mb-4">Environment URLs</h3>
                        <div className="grid gap-4 md:grid-cols-2">
                            {/* Development */}
                            <div className="rounded-2xl border border-border bg-white dark:bg-card p-5">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full border border-border bg-background text-foreground shrink-0">
                                        <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5" aria-hidden="true">
                                            <circle cx="8" cy="8" r="3" fill="currentColor" opacity=".45" />
                                            <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.2" />
                                        </svg>
                                    </span>
                                    <span className="text-sm font-semibold text-foreground">Development</span>
                                    <span className="ml-auto text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground uppercase tracking-wide">Dev</span>
                                </div>
                                <div className="flex items-center gap-2 mb-2">
                                    <code className="flex-1 text-xs font-mono text-foreground bg-muted/50 rounded-lg px-2.5 py-1.5 truncate border border-border">
                                        https://dev.mypasspoint.com/
                                    </code>
                                    <button
                                        type="button"
                                        onClick={() => handleCopy("https://dev.mypasspoint.com/", "dev")}
                                        className="shrink-0 p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                                        aria-label={copiedDev ? "Copied" : "Copy development URL"}
                                    >
                                        {copiedDev
                                            ? <Check className="w-3.5 h-3.5 text-brand" aria-hidden="true" />
                                            : <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                                        }
                                    </button>
                                </div>
                                <p className="text-xs text-muted-foreground">Safe for development and testing</p>
                            </div>

                            {/* Production */}
                            <div className="rounded-2xl border border-border bg-white dark:bg-card p-5">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full border border-brand/30 bg-brand/5 text-brand shrink-0">
                                        <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5" aria-hidden="true">
                                            <circle cx="8" cy="8" r="3" fill="currentColor" opacity=".6" />
                                            <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.2" />
                                        </svg>
                                    </span>
                                    <span className="text-sm font-semibold text-foreground">Production</span>
                                    <span className="ml-auto text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-brand/10 text-brand uppercase tracking-wide">Live</span>
                                </div>
                                <div className="flex items-center gap-2 mb-2">
                                    <code className="flex-1 text-xs font-mono text-foreground bg-muted/50 rounded-lg px-2.5 py-1.5 truncate border border-border">
                                        https://app.mypasspoint.com/
                                    </code>
                                    <button
                                        type="button"
                                        onClick={() => handleCopy("https://app.mypasspoint.com/", "prod")}
                                        className="shrink-0 p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                                        aria-label={copiedProd ? "Copied" : "Copy production URL"}
                                    >
                                        {copiedProd
                                            ? <Check className="w-3.5 h-3.5 text-brand" aria-hidden="true" />
                                            : <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                                        }
                                    </button>
                                </div>
                                <p className="text-xs text-muted-foreground">Processes real transactions</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Quick Start Examples ───────────────────────────────── */}
            <section>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground dark:text-foreground mb-3">
                    Quick start examples
                </h2>
                <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
                    A minimal end-to-end integration in three steps — authenticate, create a wallet, and run your first operation.
                </p>

                <div className="space-y-8">
                    {[
                        {
                            step: "01",
                            label: "Get access token",
                            title: "Authentication (Node.js)",
                            lang: "javascript" as const,
                            code: getAuthenticationExampleCode(),
                        },
                        {
                            step: "02",
                            label: "Create wallet",
                            title: "Create Wallet (Node.js)",
                            lang: "javascript" as const,
                            code: getCreateWalletExampleCode(),
                        },
                        {
                            step: "03",
                            label: "Complete integration",
                            title: "Full Integration Example (Node.js)",
                            lang: "javascript" as const,
                            code: getCompleteIntegrationCode(),
                        },
                    ].map(({ step, label, title, lang, code }) => (
                        <div key={step} className="flex gap-5">
                            <div className="text-4xl font-extrabold text-brand-100 dark:text-brand-950 leading-none select-none shrink-0 pt-1">
                                {step}
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="text-base font-semibold text-foreground mb-3 capitalize">{label}</h3>
                                <CodeBlock title={title} language={lang}>{code}</CodeBlock>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── Error Handling ─────────────────────────────────────── */}
            <section>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground dark:text-foreground mb-8">
                    Error handling
                </h2>

                <div className="bg-white dark:bg-card border border-border rounded-2xl p-6 lg:p-8 mb-6">
                    <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                        Implement robust error handling to gracefully manage API failures, validation errors, and network
                        issues. Always check both{" "}
                        <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">responseCode</code> and{" "}
                        <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">data.status</code> for
                        comprehensive error detection.
                    </p>
                    <CodeBlock title="Error Handling Example (Node.js)" language="javascript">
                        {getErrorHandlingCode()}
                    </CodeBlock>
                </div>

                {/* Common error codes */}
                <div className="bg-white dark:bg-card border border-border rounded-2xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-border flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                        <h3 className="text-sm font-semibold text-foreground">Common error codes</h3>
                    </div>
                    <div className="divide-y divide-border">
                        {[
                            { code: "30 / 31", desc: "Validation errors — check request parameters", color: "text-amber-600 dark:text-amber-400" },
                            { code: "06", desc: "Session timeout — refresh your token", color: "text-blue-600 dark:text-blue-400" },
                            { code: "60", desc: "Security violation — verify credentials", color: "text-red-600 dark:text-red-400" },
                            { code: "50 / 51", desc: "Server errors — implement retry logic", color: "text-muted-foreground" },
                        ].map(({ code, desc, color }) => (
                            <div key={code} className="flex items-center justify-between px-6 py-3.5 hover:bg-muted/30 transition-colors">
                                <code className="font-mono text-sm font-semibold text-foreground">{code}</code>
                                <span className={`text-sm ${color}`}>{desc}</span>
                            </div>
                        ))}
                    </div>
                    <div className="px-6 py-4 border-t border-border">
                        <Link
                            to="/status-responses"
                            className="inline-flex items-center gap-1.5 text-brand text-sm font-medium hover:underline"
                        >
                            View complete status code reference
                            <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* ── Token Management ───────────────────────────────────── */}
            <section>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground dark:text-foreground mb-8">
                    Token management &amp; refresh
                </h2>

                <div className="bg-white dark:bg-card border border-border rounded-2xl p-6 lg:p-8 mb-6">
                    <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                        Implement automatic token refresh to avoid session timeouts. Tokens expire after{" "}
                        <strong className="text-foreground">10 minutes</strong> (dev) or{" "}
                        <strong className="text-foreground">1 hour</strong> (production).
                    </p>
                    <CodeBlock title="Token Refresh Strategy (Node.js)" language="javascript">
                        {getTokenRefreshCode()}
                    </CodeBlock>
                </div>

                <div className="bg-muted/40 dark:bg-background/40 border border-border rounded-2xl p-6">
                    <h3 className="text-sm font-semibold text-brand mb-4">Best practices</h3>
                    <ul className="space-y-3">
                        {[
                            "Cache tokens in memory with expiry tracking",
                            "Refresh tokens proactively before expiry (1 minute buffer)",
                            "Handle 06 (session_timeout) errors with automatic retry",
                            "Never store tokens in client-side code or version control",
                        ].map((item) => (
                            <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                                <CheckCircle className="h-4 w-4 text-brand shrink-0 mt-0.5" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* ── Webhook Setup ──────────────────────────────────────── */}
            <section>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground dark:text-foreground mb-8">
                    Webhook setup
                </h2>

                <div className="bg-white dark:bg-card border border-border rounded-2xl p-6 lg:p-8 mb-6">
                    <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                        Configure webhooks to receive real-time notifications about transaction status changes.
                        Set up your webhook URL in the Passpoint dashboard under{" "}
                        <strong className="text-foreground">Global Callback Setup</strong>.
                    </p>
                    <CodeBlock title="Webhook Handler (Node.js + Express)" language="javascript">
                        {getWebhookSetupCode()}
                    </CodeBlock>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    <div className="bg-white dark:bg-card border border-border rounded-2xl p-6">
                        <h3 className="text-sm font-semibold text-foreground mb-4">Requirements</h3>
                        <ul className="space-y-2.5">
                            {[
                                "HTTPS endpoint (SSL certificate required)",
                                "Publicly accessible URL",
                                "Respond with 200 OK within 5 seconds",
                                "Idempotent processing (handle duplicates)",
                            ].map((item) => (
                                <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                                    <Code className="h-4 w-4 text-brand shrink-0 mt-0.5" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-white dark:bg-card border border-border rounded-2xl p-6">
                        <h3 className="text-sm font-semibold text-foreground mb-4">Configuration steps</h3>
                        <ol className="space-y-2.5">
                            {[
                                "Deploy your webhook endpoint",
                                "Navigate to Global Callback Setup in dashboard",
                                "Enter your webhook URL",
                                "Test with sandbox transactions",
                                "Monitor webhook logs for errors",
                            ].map((item, i) => (
                                <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-brand/10 text-brand text-[10px] font-bold shrink-0 mt-0.5">
                                        {i + 1}
                                    </span>
                                    {item}
                                </li>
                            ))}
                        </ol>
                        <Link
                            to="/api-documentation/global-callback-setup"
                            className="inline-flex items-center gap-1.5 mt-5 text-brand text-sm font-medium hover:underline"
                        >
                            View callback setup guide
                            <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* ── Testing & Best Practices ───────────────────────────── */}
            <section>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground dark:text-foreground mb-8">
                    Testing &amp; best practices
                </h2>

                <div className="grid gap-4 sm:grid-cols-2 mb-6">
                    <div className="bg-white dark:bg-card border border-border rounded-2xl p-6">
                        <div className="flex items-center gap-2.5 mb-4">
                            <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                                <Zap className="h-4 w-4 text-brand" />
                            </div>
                            <h3 className="text-sm font-semibold text-foreground">Sandbox testing</h3>
                        </div>
                        <ul className="space-y-2.5">
                            {[
                                "Always test in sandbox before production",
                                "Use test credentials from dashboard",
                                "Test all payment flows and edge cases",
                                "Verify webhook delivery and processing",
                                "Test error handling scenarios",
                            ].map((item) => (
                                <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                                    <div className="w-1.5 h-1.5 bg-brand rounded-full shrink-0 mt-1.5" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-white dark:bg-card border border-border rounded-2xl p-6">
                        <div className="flex items-center gap-2.5 mb-4">
                            <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                                <CheckCircle className="h-4 w-4 text-brand" />
                            </div>
                            <h3 className="text-sm font-semibold text-foreground">Production checklist</h3>
                        </div>
                        <ul className="space-y-2.5">
                            {[
                                "API credentials secured in environment variables",
                                "Error handling and retry logic implemented",
                                "Webhook endpoint properly configured",
                                "Logging and monitoring in place",
                                "Transaction reconciliation process defined",
                            ].map((item) => (
                                <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                                    <input type="checkbox" className="mt-0.5 accent-brand" readOnly />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="bg-white dark:bg-card border border-border rounded-2xl p-6 lg:p-8">
                    <h3 className="text-base font-semibold text-foreground mb-2">Retry logic with exponential backoff</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                        Implement exponential backoff for transient failures. Do not retry on validation errors
                        (30, 31) or authentication failures (60).
                    </p>
                    <CodeBlock title="Retry Logic (Node.js)" language="javascript">
                        {getRetryLogicCode()}
                    </CodeBlock>
                </div>
            </section>

            {/* ── Common Pitfalls ────────────────────────────────────── */}
            <section>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground dark:text-foreground mb-3">
                    Common integration pitfalls
                </h2>
                <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
                    Avoid these recurring mistakes that cause broken integrations or security issues.
                </p>

                <div className="space-y-4">
                    {[
                        {
                            title: "Ignoring token expiry",
                            body: "Tokens expire after 10 min (dev) or 1 hour (prod). Failing to refresh causes 06 (session_timeout) errors.",
                            fix: "Implement automatic token refresh with expiry tracking.",
                        },
                        {
                            title: "Not handling pending status",
                            body: 'Some transactions return status "01" (pending) and complete asynchronously. You must wait for webhooks.',
                            fix: "Implement webhook handlers and status polling for pending transactions.",
                        },
                        {
                            title: "Missing mandatory headers",
                            body: "All requests require x-channel-id, x-channel-code, and x-merchant-id headers. Missing headers cause authentication failures.",
                            fix: "Create a request wrapper that automatically includes all required headers.",
                        },
                        {
                            title: "Exposing credentials client-side",
                            body: "API keys and merchant IDs should never appear in frontend code, mobile apps, or public repositories.",
                            fix: "Always make API calls from your secure backend server.",
                        },
                        {
                            title: "No idempotency for webhooks",
                            body: "Webhooks may be sent multiple times. Processing duplicates can lead to incorrect balance updates or double fulfillment.",
                            fix: "Use transaction IDs to track processed webhooks and prevent duplicate processing.",
                        },
                    ].map(({ title, body, fix }) => (
                        <div
                            key={title}
                            className="bg-white dark:bg-card border border-border rounded-2xl p-5 flex items-start gap-4"
                        >
                            <div className="bg-red-50 dark:bg-red-950/30 w-9 h-9 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                                <XCircle className="h-4.5 w-4.5 text-red-500 dark:text-red-400" />
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-red-600 dark:text-red-400 mb-1">{title}</h3>
                                <p className="text-sm text-muted-foreground mb-2 leading-relaxed">{body}</p>
                                <p className="text-xs font-medium text-brand">
                                    ✓ {fix}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── Next Steps ─────────────────────────────────────────── */}
            <section>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground dark:text-foreground mb-3">
                    Next steps
                </h2>
                <p className="text-muted-foreground text-sm sm:text-base mb-8">
                    Ready to go deeper? Explore the API modules that power your integration.
                </p>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {[
                        {
                            icon: <BookOpen className="h-5 w-5 text-brand" />,
                            title: "Collections API",
                            desc: "Accept payments via bank transfers, mobile money, and virtual accounts.",
                            href: "/collection",
                            cta: "Explore Collections",
                        },
                        {
                            icon: <DollarSign className="h-5 w-5 text-brand" />,
                            title: "Payouts API",
                            desc: "Send money to bank accounts and mobile wallets locally and internationally.",
                            href: "/payout",
                            cta: "Explore Payouts",
                        },
                        {
                            icon: <Code className="h-5 w-5 text-brand" />,
                            title: "Wallet API",
                            desc: "Create and manage digital wallets with multi-currency support.",
                            href: "/wallet",
                            cta: "Explore Wallets",
                        },
                    ].map(({ icon, title, desc, href, cta }) => (
                        <Link
                            key={title}
                            to={href}
                            className="group bg-white dark:bg-card border border-border rounded-2xl p-5 hover:border-brand/40 hover:shadow-md transition-all"
                        >
                            <div className="bg-brand-50 dark:bg-brand-950/40 w-10 h-10 rounded-full flex items-center justify-center mb-4">
                                {icon}
                            </div>
                            <h3 className="text-sm font-semibold text-foreground mb-2">{title}</h3>
                            <p className="text-xs text-muted-foreground leading-relaxed mb-4">{desc}</p>
                            <span className="inline-flex items-center gap-1 text-brand text-xs font-medium group-hover:gap-2 transition-all">
                                {cta} <ArrowRight className="h-3.5 w-3.5" />
                            </span>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default ApiIntegrations;
