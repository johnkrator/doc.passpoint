import { CheckCircle, XCircle, AlertTriangle, Radio } from "lucide-react";
import CodeBlock from "@/components/CodeBlock.tsx";

const StatusResponses = () => {
    const getErrorResponseCode = () => {
        return `{
  "responseCode": "31",
  "responseDescription": "Invalid Parameter",
  "responseMessage": "The 'amount' field is required and must be a positive number",
  "data": {
    "success": false,
    "error": "INVALID_PARAMETER",
    "errorDescription": "The amount field contains an invalid value"
  }
}`;
    };

    const getErrorHandlingExampleCode = () => {
        return `async function handlePasspointAPI() {
  try {
    const response = await fetch('https://{{baseUrl}}/{{paymentContext}}/ft-app/transfer-status', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + accessToken,
        'Content-Type': 'application/json',
        'x-channel-id: CHANNEL_ID',
        'x-channel-code: CHANNEL_CODE',
        'x-merchant-id': merchantId
      },
      body: JSON.stringify({ transactionReference: 'TXN123456' })
    });

    const result = await response.json();

    // Check Passpoint response code
    if (result.responseCode === '00') {
      console.log('Success:', result.data);
      return result.data;
    } else if (result.responseCode === '01') {
      console.log('Transaction pending, check again later');
      return result;
    } else if (result.responseCode === '06') {
      // Session timeout - refresh token and retry
      console.warn('Session expired, refreshing token...');
      await refreshAccessToken();
      return handlePasspointAPI(); // Retry
    } else if (result.responseCode === '30' || result.responseCode === '31') {
      // Validation errors
      console.error('Validation error:', result.responseMessage);
      throw new Error(result.responseMessage);
    } else if (result.responseCode === '60') {
      // Security violation
      console.error('Authentication failed:', result.responseMessage);
      throw new Error('Invalid credentials');
    } else {
      // Other errors
      console.error('API error:', result.responseCode, result.responseMessage);
      throw new Error(result.responseMessage);
    }

  } catch (error) {
    console.error('Request failed:', error.message);
    throw error;
  }
}`;
    };

    const HTTP_STATUS_GROUPS = [
        {
            label: "2xx Success",
            variant: "green" as const,
            icon: <CheckCircle className="h-4 w-4" />,
            codes: [
                { code: "200", name: "OK", desc: "Request successful, response contains data" },
                { code: "201", name: "Created", desc: "Resource successfully created" },
                { code: "202", name: "Accepted", desc: "Request accepted for processing" },
                { code: "204", name: "No Content", desc: "Successful deletion or update with no response body" },
            ],
        },
        {
            label: "4xx Client Errors",
            variant: "amber" as const,
            icon: <AlertTriangle className="h-4 w-4" />,
            codes: [
                { code: "400", name: "Bad Request", desc: "Invalid request format or missing required fields" },
                { code: "401", name: "Unauthorized", desc: "Invalid or missing API key" },
                { code: "403", name: "Forbidden", desc: "Valid API key but insufficient permissions" },
                { code: "404", name: "Not Found", desc: "Requested resource does not exist" },
                { code: "429", name: "Too Many Requests", desc: "Rate limit exceeded — retry after specified time" },
            ],
        },
        {
            label: "5xx Server Errors",
            variant: "red" as const,
            icon: <XCircle className="h-4 w-4" />,
            codes: [
                { code: "500", name: "Internal Server Error", desc: "Unexpected server error, retry with exponential backoff" },
                { code: "502", name: "Bad Gateway", desc: "Temporary server issue, safe to retry" },
                { code: "503", name: "Service Unavailable", desc: "Service temporarily down for maintenance" },
            ],
        },
    ] as const;

    const variantStyles = {
        green: {
            header: "text-green-700 dark:text-green-400",
            icon: "bg-green-100 dark:bg-green-950/40 text-green-600 dark:text-green-400",
            badge: "bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800/30",
        },
        amber: {
            header: "text-amber-700 dark:text-amber-400",
            icon: "bg-amber-100 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400",
            badge: "bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800/30",
        },
        red: {
            header: "text-red-600 dark:text-red-400",
            icon: "bg-red-100 dark:bg-red-950/40 text-red-500 dark:text-red-400",
            badge: "bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800/30",
        },
    };

    const PASSPOINT_CODES = [
        {
            code: "00",
            name: "Successful",
            desc: "Request processed successfully. The operation completed without errors.",
            category: "success",
            action: "Proceed normally",
        },
        {
            code: "01",
            name: "Pending",
            desc: "Request accepted, transaction is being processed. Monitor via webhooks or status check endpoint.",
            category: "pending",
            action: "Wait for webhook or poll status",
        },
        {
            code: "01OTP",
            name: "Pending OTP Response",
            desc: "Transaction awaiting OTP verification from the user. Provide the OTP to complete.",
            category: "pending",
            action: "Prompt user for OTP",
        },
        {
            code: "02",
            name: "Failed",
            desc: "Request failed. Check the responseMessage field for specific error details.",
            category: "error",
            action: "Check responseMessage; do not retry automatically",
        },
        {
            code: "03",
            name: "Service Unavailable",
            desc: "The service is temporarily unavailable. Retry after a short delay.",
            category: "error",
            action: "Retry with exponential backoff",
        },
        {
            code: "04",
            name: "Empty Request",
            desc: "The request body is empty or missing required data.",
            category: "validation",
            action: "Validate and resend request",
        },
        {
            code: "05",
            name: "Empty Response",
            desc: "The server returned an empty response, likely a temporary service issue.",
            category: "error",
            action: "Retry with exponential backoff",
        },
        {
            code: "06",
            name: "Session Timeout",
            desc: "Your session has expired. Obtain a new access token and retry.",
            category: "auth",
            action: "Refresh token and retry",
        },
        {
            code: "30",
            name: "Failed Parameter Validation",
            desc: "One or more request parameters failed validation. Check the responseMessage for field errors.",
            category: "validation",
            action: "Fix parameter values; do not retry as-is",
        },
        {
            code: "31",
            name: "Invalid Parameter",
            desc: "A request parameter contains an invalid value or format. Review API docs for correct specs.",
            category: "validation",
            action: "Fix parameter format; do not retry as-is",
        },
        {
            code: "40",
            name: "No Record Found",
            desc: "The requested resource or record does not exist in the system.",
            category: "error",
            action: "Verify the resource ID or reference",
        },
        {
            code: "50",
            name: "Database Exception",
            desc: "A database error occurred. Contact support if this persists.",
            category: "system",
            action: "Retry; escalate if persistent",
        },
        {
            code: "51",
            name: "General Exception",
            desc: "An unexpected server error. Retry with exponential backoff or contact support.",
            category: "system",
            action: "Retry with backoff",
        },
        {
            code: "53",
            name: "Duplicate Exception",
            desc: "The request contains duplicate data conflicting with an existing record.",
            category: "validation",
            action: "Check for duplicate clientReference",
        },
        {
            code: "60",
            name: "Security Violation",
            desc: "Authentication failed or API credentials are invalid. Verify API keys and headers.",
            category: "auth",
            action: "Verify credentials; do not retry",
        },
        {
            code: "99",
            name: "Unknown Error",
            desc: "An unknown error occurred. Contact Passpoint support with the request_id.",
            category: "system",
            action: "Contact support with request_id",
        },
    ] as const;

    const categoryStyles: Record<string, string> = {
        success: "bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800/30",
        pending: "bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800/30",
        error: "bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800/30",
        validation: "bg-orange-50 dark:bg-orange-950/30 text-orange-700 dark:text-orange-400 border border-orange-200 dark:border-orange-800/30",
        auth: "bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800/30",
        system: "bg-muted dark:bg-muted/20 text-muted-foreground border border-border",
    };

    const RESPONSE_FIELDS = [
        { name: "responseCode", desc: 'Numeric code indicating request status (e.g., "00", "01", "31")' },
        { name: "responseDescription", desc: 'Short description of the code (e.g., "Successful", "Invalid Parameter")' },
        { name: "responseMessage", desc: "Detailed human-readable message explaining the response" },
        { name: "data", desc: "Response payload or additional error details (success, error, errorDescription fields)" },
    ] as const;

    return (
        <div className="py-8 sm:py-10 space-y-16">

            {/* ── Hero ───────────────────────────────────────────────── */}
            <section>
                <div className="inline-flex items-center gap-2 bg-brand-50 dark:bg-brand-950/40 text-brand text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
                    <Radio className="h-3.5 w-3.5" />
                    Reference
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
                    Status responses
                </h1>
                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl">
                    All possible API status codes and response patterns — understand what each code means and
                    how to handle it correctly in your integration.
                </p>
            </section>

            {/* ── HTTP Status Codes ──────────────────────────────────── */}
            <section>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-8">HTTP status codes</h2>

                <div className="space-y-4">
                    {HTTP_STATUS_GROUPS.map(({ label, variant, icon, codes }) => {
                        const v = variantStyles[variant];
                        return (
                            <div key={label} className="bg-white dark:bg-card border border-border rounded-2xl overflow-hidden">
                                <div className="px-5 py-3.5 border-b border-border flex items-center gap-2.5">
                                    <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${v.icon}`}>
                                        {icon}
                                    </div>
                                    <h3 className={`text-sm font-semibold ${v.header}`}>{label}</h3>
                                </div>
                                <div className="divide-y divide-border">
                                    {codes.map(({ code, name, desc }) => (
                                        <div key={code} className="flex items-start gap-4 px-5 py-3.5 hover:bg-muted/30 transition-colors">
                                            <span className={`inline-flex px-2 py-0.5 rounded-md text-xs font-mono font-bold shrink-0 mt-0.5 ${v.badge}`}>
                                                {code}
                                            </span>
                                            <div>
                                                <span className="text-sm font-medium text-foreground">{name}</span>
                                                <span className="text-sm text-muted-foreground ml-2">— {desc}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* ── Passpoint Response Codes ───────────────────────────── */}
            <section>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">Passpoint response codes</h2>
                <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
                    All API responses include a{" "}
                    <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">responseCode</code> field.
                    Understanding these is essential for correct error handling and transaction processing.
                </p>

                <div className="bg-white dark:bg-card border border-border rounded-2xl overflow-hidden">
                    <div className="hidden sm:grid grid-cols-[80px_1fr_2fr_1fr] gap-4 px-5 py-3 border-b border-border bg-muted/30">
                        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Code</div>
                        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Name</div>
                        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Description</div>
                        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Recommended action</div>
                    </div>
                    <div className="divide-y divide-border">
                        {PASSPOINT_CODES.map(({ code, name, desc, category, action }) => (
                            <div
                                key={code}
                                className="flex flex-col sm:grid sm:grid-cols-[80px_1fr_2fr_1fr] gap-2 sm:gap-4 px-5 py-4 hover:bg-muted/20 transition-colors"
                            >
                                <div className="sm:pt-0.5">
                                    <span className={`inline-flex px-2 py-0.5 rounded-md text-xs font-mono font-bold ${categoryStyles[category]}`}>
                                        {code}
                                    </span>
                                </div>
                                <div className="text-sm font-semibold text-foreground sm:pt-0.5">{name}</div>
                                <div className="text-xs text-muted-foreground leading-relaxed">{desc}</div>
                                <div className="text-xs text-muted-foreground leading-relaxed italic">{action}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Error Response Format ──────────────────────────────── */}
            <section>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">Error response format</h2>
                <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
                    All error responses follow a consistent structure for programmatic handling.
                </p>

                <CodeBlock language="json">{getErrorResponseCode()}</CodeBlock>

                <div className="mt-6 bg-white dark:bg-card border border-border rounded-2xl overflow-hidden">
                    <div className="divide-y divide-border">
                        {RESPONSE_FIELDS.map(({ name, desc }) => (
                            <div key={name} className="flex items-start gap-4 px-5 py-4 hover:bg-muted/20 transition-colors">
                                <code className="text-xs font-mono font-semibold text-foreground shrink-0 mt-0.5 w-40">{name}</code>
                                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Handling Errors ────────────────────────────────────── */}
            <section>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-8">Handling errors</h2>

                <div className="bg-muted/40 dark:bg-background/40 border border-border rounded-2xl p-6 mb-6">
                    <h3 className="text-sm font-semibold text-brand mb-3">Best practices</h3>
                    <ul className="space-y-2">
                        {[
                            "Always check the responseCode field before processing response data",
                            "Implement retry logic with exponential backoff for codes 03, 50, 51 (service/server errors)",
                            "Handle session timeouts (code 06) by refreshing your access token automatically",
                            "Log responseCode, responseMessage, and transaction references for debugging",
                            "Handle rate limiting (HTTP 429) gracefully using Retry-After headers",
                            "Validate input data before sending requests to avoid codes 30 and 31",
                            "Use webhooks to monitor pending transactions (code 01) instead of polling",
                        ].map((item) => (
                            <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                                <CheckCircle className="h-4 w-4 text-brand shrink-0 mt-0.5" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                <CodeBlock title="Error Handling Example (JavaScript)" language="javascript">
                    {getErrorHandlingExampleCode()}
                </CodeBlock>
            </section>
        </div>
    );
};

export default StatusResponses;
