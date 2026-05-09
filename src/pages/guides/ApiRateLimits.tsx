import { Clock, AlertTriangle, CheckCircle, TrendingUp, Shield, Zap, Gauge } from "lucide-react";
import CodeBlock from "@/components/CodeBlock.tsx";

const ApiRateLimits = () => {
    const getRateLimitHeadersCode = () => {
        return `X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1640995200
Retry-After: 60`;
    };

    const get429ResponseCode = () => {
        return `{
  "error": "Rate limit exceeded",
  "message": "Too many requests. Please retry after 60 seconds.",
  "retryAfter": 60
}`;
    };

    const getBackoffImplementationCode = () => {
        return `async function makeRequestWithBackoff(url, options, maxRetries = 3) {
  let retries = 0;

  while (retries < maxRetries) {
    try {
      const response = await fetch(url, options);

      // Check rate limit headers
      const remaining = parseInt(response.headers.get('X-RateLimit-Remaining'));
      const limit = parseInt(response.headers.get('X-RateLimit-Limit'));

      // Warn if approaching limit
      if (remaining < limit * 0.1) {
        console.warn(\`Approaching rate limit: \${remaining}/\${limit} requests remaining\`);
      }

      // Handle rate limit
      if (response.status === 429) {
        const retryAfter = parseInt(response.headers.get('Retry-After')) || 60;
        const jitter = Math.random() * 1000; // Add jitter (0-1s)
        const delay = (retryAfter * 1000) + jitter;

        console.log(\`Rate limited. Retrying after \${retryAfter}s...\`);
        await sleep(delay);
        retries++;
        continue;
      }

      return response;

    } catch (error) {
      // Exponential backoff for network errors
      const delay = Math.min(1000 * Math.pow(2, retries), 30000);
      console.error(\`Request failed, retrying in \${delay}ms\`, error);
      await sleep(delay);
      retries++;
    }
  }

  throw new Error('Max retries exceeded');
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}`;
    };

    const getRateLimitMonitoringCode = () => {
        return `class RateLimitMonitor {
  constructor() {
    this.limits = {};
  }

  updateFromHeaders(apiKey, headers) {
    this.limits[apiKey] = {
      limit: parseInt(headers.get('X-RateLimit-Limit')),
      remaining: parseInt(headers.get('X-RateLimit-Remaining')),
      reset: parseInt(headers.get('X-RateLimit-Reset')),
      timestamp: Date.now()
    };
  }

  canMakeRequest(apiKey, threshold = 0.1) {
    const limit = this.limits[apiKey];
    if (!limit) return true;

    // Check if limit has reset
    if (Date.now() / 1000 > limit.reset) {
      return true;
    }

    // Check if we have enough remaining requests
    return limit.remaining > (limit.limit * threshold);
  }

  getWaitTime(apiKey) {
    const limit = this.limits[apiKey];
    if (!limit) return 0;

    const now = Date.now() / 1000;
    return Math.max(0, limit.reset - now);
  }
}

// Usage
const monitor = new RateLimitMonitor();

async function apiCall(url, options) {
  const apiKey = options.headers['x-api-key'];

  // Check if we should wait
  if (!monitor.canMakeRequest(apiKey)) {
    const waitTime = monitor.getWaitTime(apiKey);
    console.log(\`Waiting \${waitTime}s before making request\`);
    await sleep(waitTime * 1000);
  }

  const response = await fetch(url, options);
  monitor.updateFromHeaders(apiKey, response.headers);

  return response;
}`;
    };

    const RATE_TIERS = [
        {
            icon: <Zap className="h-5 w-5 text-brand" />,
            label: "Standard API",
            count: "1,000",
            unit: "requests / minute / API key",
            desc: "Covers all standard API operations including wallet management, transfers, and transaction queries.",
        },
        {
            icon: <Shield className="h-5 w-5 text-brand" />,
            label: "Webhooks",
            count: "100",
            unit: "deliveries / minute / endpoint",
            desc: "Limits the rate of webhook events sent to configured endpoints to prevent overwhelming your servers.",
        },
        {
            icon: <TrendingUp className="h-5 w-5 text-brand" />,
            label: "File Uploads",
            count: "50",
            unit: "uploads / minute / API key",
            desc: "Applies to document uploads, receipt attachments, and other file-based operations.",
        },
        {
            icon: <Clock className="h-5 w-5 text-brand" />,
            label: "Bulk Operations",
            count: "10",
            unit: "operations / minute / API key",
            desc: "Batch operations like bulk transfers have stricter limits due to their resource intensity.",
        },
    ] as const;

    const HEADERS_INFO = [
        {
            name: "X-RateLimit-Limit",
            desc: "The maximum number of requests allowed in the current time window (typically 1 minute).",
        },
        {
            name: "X-RateLimit-Remaining",
            desc: "The number of requests remaining in the current time window. Use this to avoid hitting the limit.",
        },
        {
            name: "X-RateLimit-Reset",
            desc: "Unix timestamp (seconds) indicating when the rate limit window resets and your quota refreshes.",
        },
        {
            name: "Retry-After",
            desc: "Number of seconds to wait before retrying. Only included in 429 Too Many Requests responses.",
        },
    ] as const;

    const BEST_PRACTICES = [
        {
            title: "Monitor rate limit headers",
            body: "Always check X-RateLimit-Remaining in responses. Implement warnings when you're approaching the limit (e.g., when remaining requests drop below 10% of the limit).",
        },
        {
            title: "Implement exponential backoff with jitter",
            body: "Use exponential backoff with random jitter (0–1 second) to avoid thundering herd problems when multiple clients retry simultaneously after rate limit resets.",
        },
        {
            title: "Use bulk endpoints when available",
            body: "Batch multiple operations into a single bulk request instead of making individual calls. This reduces API call volume and improves efficiency.",
        },
        {
            title: "Implement client-side caching",
            body: "Cache frequently accessed data (like wallet balances, transaction lists) to minimize redundant API calls. Use appropriate TTLs based on your use case.",
        },
        {
            title: "Prefer webhooks over polling",
            body: "Use webhooks for real-time transaction updates instead of polling the status endpoint repeatedly. This significantly reduces API call volume.",
        },
        {
            title: "Distribute load across multiple API keys",
            body: "For high-volume applications, create separate API keys for different services or microservices to distribute the rate limit load.",
        },
        {
            title: "Log and alert on rate limit events",
            body: "Set up monitoring and alerts when you receive 429 responses or when remaining requests drop below a threshold. This helps you identify usage patterns proactively.",
        },
    ] as const;

    const TROUBLESHOOTING = [
        {
            title: "Frequently hitting rate limits",
            desc: "If you're consistently exceeding rate limits, consider these solutions:",
            bullets: [
                "Review your integration architecture — are you polling when you could use webhooks?",
                "Implement caching to reduce redundant API calls",
                "Use bulk endpoints to batch operations",
                "Consider using multiple API keys to distribute load",
                "Contact Passpoint support to discuss increasing your rate limits for production use",
            ],
        },
        {
            title: "Unexpected 429 responses",
            desc: "If you receive unexpected rate limit errors:",
            bullets: [
                "Check if multiple services are using the same API key",
                "Verify you're not making parallel requests that exceed the limit",
                "Review logs to identify which endpoints are consuming your quota",
                "Ensure retry logic isn't creating a feedback loop of failed requests",
            ],
        },
        {
            title: "Rate limit resets not matching expectations",
            desc: "Rate limits are calculated per minute with sliding windows:",
            bullets: [
                "Check the X-RateLimit-Reset header for the exact reset time",
                "Ensure your system clock is synchronized (use NTP)",
                "Remember that the limit is per API key, not per IP address",
                "Verify you're converting Unix timestamps correctly (seconds, not milliseconds)",
            ],
        },
    ] as const;

    return (
        <div className="py-8 sm:py-10 space-y-16">

            {/* ── Hero ───────────────────────────────────────────────── */}
            <section>
                <div className="inline-flex items-center gap-2 bg-brand-50 dark:bg-brand-950/40 text-brand text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
                    <Gauge className="h-3.5 w-3.5" />
                    Guides
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
                    API rate limits
                </h1>
                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl">
                    Understand how rate limiting works, best practices for handling limits, and strategies for
                    optimal API usage in production applications.
                </p>
            </section>

            {/* ── Rate Limit Structure ────────────────────────────────── */}
            <section>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">Rate limit structure</h2>
                <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
                    Passpoint uses a token bucket algorithm to ensure fair usage. Rate limits are applied per API
                    key and reset every minute.
                </p>

                <div className="grid sm:grid-cols-2 gap-4">
                    {RATE_TIERS.map(({ icon, label, count, unit, desc }) => (
                        <div
                            key={label}
                            className="bg-white dark:bg-card border border-border rounded-2xl p-6"
                        >
                            <div className="flex items-center gap-3 mb-3">
                                <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                                    {icon}
                                </div>
                                <h3 className="text-sm font-semibold text-foreground">{label}</h3>
                            </div>
                            <div className="text-3xl font-extrabold text-brand mb-1">{count}</div>
                            <p className="text-xs text-muted-foreground mb-3">{unit}</p>
                            <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── Response Headers ───────────────────────────────────── */}
            <section>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">Rate limit response headers</h2>
                <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
                    Every API response includes rate limit information in the headers. Monitor these to implement
                    proactive rate limit management.
                </p>

                <CodeBlock language="http" title="Rate Limit Headers">
                    {getRateLimitHeadersCode()}
                </CodeBlock>

                <div className="mt-6 grid sm:grid-cols-2 gap-4">
                    {HEADERS_INFO.map(({ name, desc }) => (
                        <div key={name} className="bg-white dark:bg-card border border-border rounded-2xl p-5">
                            <code className="text-xs font-mono font-semibold text-foreground">{name}</code>
                            <p className="text-xs text-muted-foreground leading-relaxed mt-2">{desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── Handling 429 ───────────────────────────────────────── */}
            <section>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-8">Handling rate limit errors</h2>

                <div className="bg-muted/40 dark:bg-background/40 border border-border rounded-2xl p-5 flex items-start gap-4 mb-6">
                    <div className="bg-amber-100 dark:bg-amber-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                        <AlertTriangle className="h-4.5 w-4.5 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-amber-700 dark:text-amber-400 mb-1">
                            HTTP 429 Too Many Requests
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            This response indicates you've exceeded your rate limit. Always respect the{" "}
                            <code className="bg-amber-100/60 dark:bg-amber-950/30 px-1 rounded text-xs font-mono">Retry-After</code>{" "}
                            header and implement exponential backoff to avoid being blocked.
                        </p>
                    </div>
                </div>

                <CodeBlock language="json" title="429 Error Response">
                    {get429ResponseCode()}
                </CodeBlock>

                <div className="mt-6">
                    <CodeBlock language="javascript" title="Exponential Backoff Implementation">
                        {getBackoffImplementationCode()}
                    </CodeBlock>
                </div>
            </section>

            {/* ── Monitoring ─────────────────────────────────────────── */}
            <section>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">Rate limit monitoring</h2>
                <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
                    Implement proactive monitoring to track usage across multiple API keys and prevent hitting
                    limits before they occur.
                </p>

                <CodeBlock language="javascript" title="Rate Limit Monitoring Class">
                    {getRateLimitMonitoringCode()}
                </CodeBlock>
            </section>

            {/* ── Best Practices ─────────────────────────────────────── */}
            <section>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-8">Best practices</h2>

                <div className="space-y-3">
                    {BEST_PRACTICES.map(({ title, body }) => (
                        <div
                            key={title}
                            className="bg-white dark:bg-card border border-border rounded-2xl p-5 flex items-start gap-4"
                        >
                            <div className="bg-brand-50 dark:bg-brand-950/40 w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                                <CheckCircle className="h-4 w-4 text-brand" />
                            </div>
                            <div>
                                <h4 className="text-sm font-semibold text-foreground mb-1">{title}</h4>
                                <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── Troubleshooting ────────────────────────────────────── */}
            <section>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-8">Troubleshooting</h2>

                <div className="space-y-4">
                    {TROUBLESHOOTING.map(({ title, desc, bullets }) => (
                        <div key={title} className="bg-white dark:bg-card border border-border rounded-2xl p-6">
                            <h3 className="text-sm font-semibold text-foreground mb-2">{title}</h3>
                            <p className="text-sm text-muted-foreground mb-3">{desc}</p>
                            <ul className="space-y-2">
                                {bullets.map((b) => (
                                    <li key={b} className="flex items-start gap-2 text-sm text-muted-foreground">
                                        <div className="w-1.5 h-1.5 bg-brand rounded-full shrink-0 mt-1.5" />
                                        {b}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default ApiRateLimits;
