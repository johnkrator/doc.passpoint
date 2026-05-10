import { Key, Shield, Lock, ArrowRight, AlertCircle, Info, CheckCircle2, AlertTriangle } from "lucide-react";
import CodeBlock from "@/components/CodeBlock.tsx";

const Authentication = () => {
  const getAuthClientEndpointCode = () => {
    return `POST https://{{baseUrl}}/{{userAppContext}}/merchant-app/get-auth-token`;
  };

  const getAuthClientRequestBodyCode = () => {
    return `{
  "merchantId": "string",
  "apiKey": "string"
}`;
  };

  const getAuthClientCurlCode = () => {
    return `curl --location 'https://{{baseUrl}}/{{userAppContext}}/merchant-app/get-auth-token'
--data '{
    "merchantId":"string",
    "apiKey":"string"
}'`;
  };

  const getAuthClientResponseCode = () => {
    return `{
  "responseCode": "00",
  "responseDescription": "Successful",
  "responseMessage": "Client token obtained successful",
  "data": {
    "accessToken": "string",
    "expiresIn": 0
  }
}`;
  };

  const getWhitelistIpsEndpointCode = () => {
    return `GET https://{{baseUrl}}/{{userAppContext}}/merchant-app/get-all-whitelisted-ip`;
  };

  const getWhitelistIpsCurlCode = () => {
    return `curl --location 'https://{{baseUrl}}/{{userAppContext}}/merchant-app/get-all-whitelisted-ip'
--header 'x-channel-id: CHANNEL_ID'
--header 'x-channel-code: CHANNEL_CODE'
--header 'x-merchant-id: YOUR_MERCHANT_ID'`;
  };

  const getWhitelistIpsResponseCode = () => {
    return `{
  "responseCode": "00",
  "responseDescription": "Successful",
  "responseMessage": "1 ip address(es) found",
  "data": [
    "127.0.0.1"
  ]
}`;
  };

  return (
    <div className="py-8 sm:py-10 space-y-16">
      {/* Hero */}
      <section>
        <div className="inline-flex items-center gap-2 bg-brand-50 dark:bg-brand-950/40 text-brand text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
          <Key className="h-3.5 w-3.5" />
          API Reference
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
          Authentication
        </h1>
        <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl">
          The Authentication module provides the APIs needed to obtain merchant
          credentials and a Bearer Token. Every subsequent API call to Passpoint
          requires this token, so this is the required first step before using
          any other endpoint.
        </p>
      </section>

      {/* How Authentication Works */}
      <section>
        <div className="flex items-center gap-3 mb-3">
          <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
            <Shield className="h-4 w-4 text-brand" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            How authentication works
          </h2>
        </div>
        <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
          Passpoint uses a two-layer authentication model. Every integration follows the same
          two-step sequence before any payment API call can be made.
        </p>

        <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-5">
          {/* Layer 1 */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">
              Layer 1  Obtain a Bearer token
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed mb-3">
              Call <code className="font-mono bg-muted px-1.5 py-0.5 rounded">POST /{"{{userAppContext}}"}/merchant-app/get-auth-token</code> with
              your <code className="font-mono bg-muted px-1.5 py-0.5 rounded">merchantId</code> and <code className="font-mono bg-muted px-1.5 py-0.5 rounded">apiKey</code>.
              The response returns an <code className="font-mono bg-muted px-1.5 py-0.5 rounded">accessToken</code> and an <code className="font-mono bg-muted px-1.5 py-0.5 rounded">expiresIn</code> value (in seconds).
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="bg-muted/40 dark:bg-background/40 border border-border rounded-xl p-4">
                <p className="text-xs font-semibold text-foreground mb-1">Development token expiry</p>
                <p className="text-xs text-muted-foreground">10 minutes  short lifespan for sandbox testing.</p>
              </div>
              <div className="bg-muted/40 dark:bg-background/40 border border-border rounded-xl p-4">
                <p className="text-xs font-semibold text-foreground mb-1">Production token expiry</p>
                <p className="text-xs text-muted-foreground">1 hour  implement proactive refresh to avoid interruptions.</p>
              </div>
            </div>
          </div>

          {/* Layer 2 */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">
              Layer 2  Use the token with channel headers
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed mb-3">
              Every subsequent payment API call must include the <code className="font-mono bg-muted px-1.5 py-0.5 rounded">Authorization: Bearer {"{"} accessToken {"}"}</code> header
              alongside three mandatory channel identity headers.
            </p>
            <div className="grid sm:grid-cols-3 gap-3">
              {[
                { name: "x-channel-id", desc: "Identifies the integration channel." },
                { name: "x-channel-code", desc: "Channel code for routing." },
                { name: "x-merchant-id", desc: "Your unique merchant identifier." },
              ].map(({ name, desc }) => (
                <div key={name} className="bg-muted/40 dark:bg-background/40 border border-border rounded-xl p-4">
                  <code className="text-xs font-mono font-semibold text-foreground block mb-1">{name}</code>
                  <p className="text-xs text-muted-foreground">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Token refresh strategy */}
          <div className="bg-muted/40 dark:bg-background/40 border border-border rounded-xl p-4 flex items-start gap-3">
            <Info className="h-4 w-4 text-brand shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground leading-relaxed">
              <span className="font-semibold text-foreground">Token refresh strategy:</span> Do not wait for a 401 error to re-authenticate.
              Track the token's <code className="font-mono bg-muted px-1 py-0.5 rounded">expiresIn</code> value and refresh proactively when the
              token is within 2 minutes of expiry. This prevents mid-request failures on live transactions.
            </p>
          </div>

          {/* IP Whitelisting */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-2">IP whitelisting</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Passpoint can restrict API access to specific IP addresses for additional security. Use the whitelist
              management endpoints to view and configure your permitted IP addresses. Requests originating from
              non-whitelisted IPs will be rejected with a <code className="font-mono bg-muted px-1 py-0.5 rounded">60 SECURITY_VIOLATION</code> response.
            </p>
          </div>
        </div>

        {/* Security best practices */}
        <div className="mt-6 space-y-3">
          <div className="bg-muted/40 dark:bg-background/40 border border-border rounded-xl p-4 flex items-start gap-3">
            <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 mb-1">
                Never expose your apiKey in client-side code
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Your <code className="font-mono bg-muted px-1 py-0.5 rounded">apiKey</code> and the resulting
                Bearer token must only ever exist on your server. Always call the authentication endpoint from
                your backend  tokens should never reach the browser.
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-3">
            {[
              {
                title: "Environment variables",
                body: "Store merchantId and apiKey in environment variables  never commit them to source code or version control.",
              },
              {
                title: "Server-side token management",
                body: "Manage token lifecycle on the server. Implement a token cache so all backend requests share the same valid token.",
              },
              {
                title: "Authentication monitoring",
                body: "Log authentication failures with appropriate alerting. Repeated 60 SECURITY_VIOLATION codes may indicate a credential leak.",
              },
            ].map(({ title, body }) => (
              <div key={title} className="bg-white dark:bg-card border border-border rounded-2xl p-4">
                <p className="text-xs font-semibold text-foreground mb-1">{title}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Overview */}
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
          Authentication is a two-step process. You must first retrieve your API
          key, then exchange it for a time-limited Bearer Token used on all
          subsequent requests.
        </p>

        {/* Auth flow steps */}
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 flex gap-4">
            <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0 mt-0.5">
              <span className="text-brand text-sm font-bold">1</span>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-1">
                Get User Credentials
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Call <code className="font-mono">/merchant-app/init-credentials</code> with
                your <code className="font-mono">merchantId</code> to retrieve your
                API key (<code className="font-mono">apiKey</code>).
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 flex gap-4">
            <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0 mt-0.5">
              <span className="text-brand text-sm font-bold">2</span>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-1">
                Authenticate Merchant
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Call <code className="font-mono">/merchant-app/get-auth-token</code> with
                your <code className="font-mono">merchantId</code> and <code className="font-mono">apiKey</code> to
                receive your Bearer Token and its expiry time.
              </p>
            </div>
          </div>
        </div>

        {/* Token usage callout */}
        <div className="flex gap-3 px-5 py-4 bg-brand-50 dark:bg-brand-950/30 border border-brand/20 rounded-2xl">
          <ArrowRight className="h-4 w-4 text-brand shrink-0 mt-0.5" />
          <p className="text-sm text-foreground/80">
            Once obtained, pass the Bearer Token in the{" "}
            <code className="font-mono text-xs">Authorization</code> header of
            every subsequent API request:{" "}
            <code className="font-mono text-xs">
              Authorization: Bearer {"<token>"}
            </code>
          </p>
        </div>
      </section>

      {/* APIs in this module */}
      <section>
        <div className="flex items-center gap-3 mb-3">
          <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
            <Key className="h-4 w-4 text-brand" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            APIs in this module
          </h2>
        </div>
        <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
          Summary of all endpoints available under Authentication.
        </p>

        <div className="bg-white dark:bg-card border border-border rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Endpoint
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Method
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Auth required
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr className="hover:bg-muted/20 transition-colors">
                  <td className="px-5 py-3.5 font-mono text-xs text-foreground break-all">
                    /merchant-app/init-credentials
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="px-2 py-0.5 rounded text-xs font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400">
                      POST
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-xs text-muted-foreground">
                    Retrieves merchant API key
                  </td>
                  <td className="px-5 py-3.5 text-xs text-muted-foreground">
                    No
                  </td>
                </tr>
                <tr className="hover:bg-muted/20 transition-colors">
                  <td className="px-5 py-3.5 font-mono text-xs text-foreground break-all">
                    /merchant-app/get-auth-token
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="px-2 py-0.5 rounded text-xs font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400">
                      POST
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-xs text-muted-foreground">
                    Retrieves merchant Bearer Token
                  </td>
                  <td className="px-5 py-3.5 text-xs text-muted-foreground">
                    No
                  </td>
                </tr>
                <tr className="hover:bg-muted/20 transition-colors">
                  <td className="px-5 py-3.5 font-mono text-xs text-foreground break-all">
                    /merchant-app/get-all-whitelisted-ip
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="px-2 py-0.5 rounded text-xs font-semibold bg-brand-50 text-brand dark:bg-brand-950/40 dark:text-brand/80">
                      GET
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-xs text-muted-foreground">
                    Returns all whitelisted IP addresses for the merchant
                  </td>
                  <td className="px-5 py-3.5 text-xs text-muted-foreground">
                    Yes  Bearer Token
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
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
          Important points to keep in mind when integrating with the
          Authentication module.
        </p>

        <div className="space-y-3">
          {[
            {
              title: "Token expiry",
              body: "The Bearer Token is time-limited. The response includes an expiresIn field (in seconds). Re-authenticate before the token expires to avoid 401 errors on live requests.",
            },
            {
              title: "IP whitelisting",
              body: "Passpoint enforces IP whitelisting. Requests from non-whitelisted IPs will be rejected. Use the Get Whitelisted IPs endpoint to confirm which addresses are permitted for your merchant account.",
            },
            {
              title: "Required headers",
              body: "Endpoints that require authentication expect the following headers: Authorization: Bearer <token>, x-channel-id, x-channel-code, and x-merchant-id. Missing headers will result in a 401 or 403 response.",
            },
            {
              title: "Credentials are sensitive",
              body: "Never expose your apiKey or Bearer Token in client-side code or version control. Store credentials securely on the server side and rotate them if you suspect exposure.",
            },
            {
              title: "Response code 00 = success",
              body: 'A responseCode of "00" indicates a successful operation. Any other value should be treated as a failure and handled accordingly in your integration.',
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

      {/* Base URL note */}
      <section>
        <div className="flex items-center gap-3 mb-3">
          <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
            <Info className="h-4 w-4 text-brand" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            Base URL
          </h2>
        </div>
        <p className="text-muted-foreground text-sm sm:text-base mb-6 max-w-xl">
          All Authentication endpoints share the same base URL pattern. Replace{" "}
          <code className="font-mono text-xs">{"{{baseUrl}}"}</code> and{" "}
          <code className="font-mono text-xs">{"{{userAppContext}}"}</code> with
          the values provided in your merchant onboarding details.
        </p>
        <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6">
          <CodeBlock>
            {`https://{{baseUrl}}/{{userAppContext}}/merchant-app/`}
          </CodeBlock>
          <p className="text-xs text-muted-foreground mt-3">
            Sandbox base URL:{" "}
            <code className="font-mono">
              https://client-sandbox.mypasspoint.com/passpoint-usr/v1
            </code>
          </p>
        </div>
      </section>

      {/* Authenticate Merchant */}
      <section>
        <div className="flex items-center gap-3 mb-3">
          <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
            <Lock className="h-4 w-4 text-brand" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            Authenticate merchant
          </h2>
        </div>
        <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
          Retrieves merchant authorization token.
        </p>

        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2 px-4 py-3 bg-muted/30 dark:bg-card/50 border border-border rounded-2xl">
            <span className="px-2 py-0.5 rounded text-xs font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400">
              POST
            </span>
            <code className="text-xs text-muted-foreground break-all">
              https://{"{{baseUrl}}"}/{"{{userAppContext}}"}
              /merchant-app/get-auth-token
            </code>
          </div>

          <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-5">
            <div>
              <h4 className="text-sm font-medium text-foreground mb-3">
                Endpoint
              </h4>
              <CodeBlock>{getAuthClientEndpointCode()}</CodeBlock>
            </div>
            <div>
              <h4 className="text-sm font-medium text-foreground mb-3">
                Request body
              </h4>
              <CodeBlock language="json">
                {getAuthClientRequestBodyCode()}
              </CodeBlock>
            </div>
            <div>
              <h4 className="text-sm font-medium text-foreground mb-3">
                cURL example
              </h4>
              <CodeBlock language="bash">{getAuthClientCurlCode()}</CodeBlock>
            </div>
            <div>
              <h4 className="text-sm font-medium text-foreground mb-3">
                Response
              </h4>
              <CodeBlock language="json">
                {getAuthClientResponseCode()}
              </CodeBlock>
            </div>
          </div>
        </div>
      </section>

      {/* Get Whitelisted IPs */}
      <section>
        <div className="flex items-center gap-3 mb-3">
          <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
            <Shield className="h-4 w-4 text-brand" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            Get whitelisted IPs
          </h2>
        </div>
        <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
          This endpoint retrieves all whitelisted IP addresses for the merchant.
          Requires proper authentication headers including Bearer token and
          merchant information.
        </p>

        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2 px-4 py-3 bg-muted/30 dark:bg-card/50 border border-border rounded-2xl">
            <span className="px-2 py-0.5 rounded text-xs font-semibold bg-brand-50 text-brand dark:bg-brand-950/40 dark:text-brand/80">
              GET
            </span>
            <code className="text-xs text-muted-foreground break-all">
              https://{"{{baseUrl}}"}/{"{{userAppContext}}"}
              /merchant-app/get-all-whitelisted-ip
            </code>
          </div>

          <div className="bg-white dark:bg-card border border-border rounded-2xl overflow-hidden">
            <div className="px-5 py-3 border-b border-border bg-muted/30">
              <h4 className="text-sm font-semibold text-foreground">Headers</h4>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Header
                    </th>
                    <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Value
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr className="hover:bg-muted/20 transition-colors">
                    <td className="px-5 py-3.5 font-mono text-xs text-foreground">
                      Authorization
                    </td>
                    <td className="px-5 py-3.5 text-muted-foreground">
                      Bearer YOUR_ACCESS_TOKEN
                    </td>
                  </tr>
                  <tr className="hover:bg-muted/20 transition-colors">
                    <td className="px-5 py-3.5 font-mono text-xs text-foreground">
                      x-channel-id
                    </td>
                    <td className="px-5 py-3.5 text-muted-foreground">
                      CHANNEL_ID
                    </td>
                  </tr>
                  <tr className="hover:bg-muted/20 transition-colors">
                    <td className="px-5 py-3.5 font-mono text-xs text-foreground">
                      x-channel-code
                    </td>
                    <td className="px-5 py-3.5 text-muted-foreground">
                      CHANNEL_CODE
                    </td>
                  </tr>
                  <tr className="hover:bg-muted/20 transition-colors">
                    <td className="px-5 py-3.5 font-mono text-xs text-foreground">
                      x-merchant-id
                    </td>
                    <td className="px-5 py-3.5 text-muted-foreground">
                      YOUR_MERCHANT_ID
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-5">
            <div>
              <h4 className="text-sm font-medium text-foreground mb-3">
                Endpoint
              </h4>
              <CodeBlock>{getWhitelistIpsEndpointCode()}</CodeBlock>
            </div>
            <div>
              <h4 className="text-sm font-medium text-foreground mb-3">
                cURL example
              </h4>
              <CodeBlock language="bash">{getWhitelistIpsCurlCode()}</CodeBlock>
            </div>
            <div>
              <h4 className="text-sm font-medium text-foreground mb-3">
                Response
              </h4>
              <CodeBlock language="json">
                {getWhitelistIpsResponseCode()}
              </CodeBlock>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Authentication;
