import { useState, useEffect, useCallback } from "react";
import {
  Code,
  Settings,
  ChevronDown,
  ChevronUp,
  KeyRound,
  CirclePlus,
  CheckCircle2,
  Loader2,
  LogIn,
  AlertCircle,
  Copy,
  Check,
} from "lucide-react";
import SandboxTextEditor from "@/components/SandboxTextEditor.tsx";

type AuthStatus = "idle" | "loading" | "authenticated" | "error";

interface AuthState {
  authUrl: string;
  merchantId: string;
  channelId: string;
  channelCode: string;
  token: string;
  status: AuthStatus;
  error: string;
  showToken: boolean;
}

interface Endpoint {
  id: string;
  name: string;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  path: string;
  description: string;
  defaultBody: Record<string, unknown> | null;
}

const ENDPOINTS: Endpoint[] = [
  {
    id: "wallet/balance",
    name: "Get Wallet Balance",
    method: "GET",
    path: "/wallet-app/get-wallet-balance/all",
    description: "Retrieve balance for all wallets",
    defaultBody: null,
  },
  {
    id: "momo/transfer",
    name: "Mobile Money Transfer",
    method: "POST",
    path: "/momo-app/transfer",
    description: "Send funds via mobile money",
    defaultBody: {
      amount: "1000",
      narration: "Transfer to mobile wallet",
      serviceCode: "mtn",
      transactionCurrency: "NGN",
      accountName: "John Doe",
      bankCode: "000000",
      channel: "3",
      msisdn: "2348123456789",
      clientReference: `REF_${Date.now()}`,
      countryCode: "NG",
    },
  },
  {
    id: "collection/virtual-account",
    name: "Generate Virtual Account",
    method: "POST",
    path: "/collection-app/virtual-account/generate",
    description: "Generate a virtual account for collections",
    defaultBody: {
      currency: "NGN",
      accountType: "individual",
      customerName: "John Doe",
      customerEmail: "john.doe@example.com",
    },
  },
  {
    id: "wallet/payout",
    name: "Wallet Payout",
    method: "POST",
    path: "/foreign-ft-app/make-payment/bank",
    description: "International payout from wallet",
    defaultBody: {
      clientReference: `REF_${Date.now()}`,
      amount: "1700.00",
      narration: "International payout",
      transactionCurrency: "EUR",
      baseCurrency: "EUR",
      countryCode: "FR",
      paymentInfo: {
        senderFirstName: "John",
        senderLastName: "Doe",
        senderAddress: "123 Main Street",
        senderCity: "Lagos",
        senderZipCode: "100001",
        senderOccupation: "03",
        senderIdType: "03",
        senderIdNumber: "A12345678",
        senderBeneficiaryRelationship: "02",
        remitterType: "I",
        beneficiaryType: "I",
        receiverFirstName: "Jane",
        receiverLastName: "Smith",
      },
    },
  },
];

const BLANK_TEMPLATE = JSON.stringify(
  {
    method: "POST",
    url: "https://YOUR_BASE_URL/YOUR_PATH",
    headers: {
      Authorization: "Bearer {{token}}",
      "Content-Type": "application/json",
      "X-Channel-Id": "3",
      "X-Channel-Code": "legacy-api-user",
    },
    body: {},
  },
  null,
  2,
);

function buildRequestJson(endpoint: Endpoint): string {
  const url = `YOUR_BASE_URL${endpoint.path}`;

  const req: Record<string, unknown> = {
    method: endpoint.method,
    url,
    headers: {
      Authorization: "Bearer {{token}}",
      "Content-Type": "application/json",
      "X-Channel-Id": "3",
      "X-Channel-Code": "legacy-api-user",
    },
  };

  if (endpoint.defaultBody && endpoint.method !== "GET") {
    req.body = endpoint.defaultBody;
  }

  return JSON.stringify(req, null, 2);
}

function extractToken(data: unknown): string | null {
  if (!data || typeof data !== "object") return null;
  const d = data as Record<string, unknown>;

  const candidates = [
    d?.token,
    d?.access_token,
    (d?.data as Record<string, unknown>)?.token,
    (d?.data as Record<string, unknown>)?.accessToken,
    (d?.data as Record<string, unknown>)?.access_token,
  ];

  for (const candidate of candidates) {
    if (typeof candidate === "string" && candidate.length > 0) return candidate;
  }
  return null;
}

const SandboxPlayground = () => {
  const [selectedEndpoint, setSelectedEndpoint] =
    useState<string>("wallet/balance");
  const [requestData, setRequestData] = useState<string>("");
  const [showAuth, setShowAuth] = useState<boolean>(false);
  const [tokenCopied, setTokenCopied] = useState<boolean>(false);

  const [auth, setAuth] = useState<AuthState>({
    authUrl: "",
    merchantId: "",
    channelId: "",
    channelCode: "",
    token: "",
    status: "idle",
    error: "",
    showToken: false,
  });

  const isAuthenticated = auth.token.trim().length > 0;

  const updateAuth = useCallback(
    <K extends keyof AuthState>(key: K, value: AuthState[K]) => {
      setAuth((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const selectedEndpointData = ENDPOINTS.find(
    (ep) => ep.id === selectedEndpoint,
  );

  useEffect(() => {
    if (selectedEndpoint === "custom") {
      setRequestData(BLANK_TEMPLATE);
      return;
    }
    if (selectedEndpointData) {
      setRequestData(buildRequestJson(selectedEndpointData));
    }
  }, [selectedEndpoint, selectedEndpointData]);

  const handleAuthenticate = async () => {
    const targetUrl = auth.authUrl.trim();
    if (
      !targetUrl ||
      !auth.merchantId.trim() ||
      !auth.channelId.trim() ||
      !auth.channelCode.trim()
    )
      return;

    updateAuth("status", "loading");
    updateAuth("error", "");

    try {
      const response = await fetch(targetUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-merchant-id": auth.merchantId.trim(),
          "x-channel-id": auth.channelId.trim(),
          "x-channel-code": auth.channelCode.trim(),
        },
      });

      const data: unknown = await response.json();
      const token = extractToken(data);

      if (token) {
        setAuth((prev) => ({
          ...prev,
          token,
          status: "authenticated",
          error: "",
        }));
      } else {
        setAuth((prev) => ({
          ...prev,
          status: "error",
          error:
            "Token not found in response. Verify the auth endpoint and credentials.",
        }));
      }
    } catch (err) {
      setAuth((prev) => ({
        ...prev,
        status: "error",
        error:
          err instanceof Error ? err.message : "Authentication request failed.",
      }));
    }
  };

  const handleCopyToken = async () => {
    if (!auth.token) return;
    try {
      await navigator.clipboard.writeText(auth.token);
      setTokenCopied(true);
      setTimeout(() => setTokenCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  const canGenerate =
    auth.authUrl.trim().length > 0 &&
    auth.merchantId.trim().length > 0 &&
    auth.channelId.trim().length > 0 &&
    auth.channelCode.trim().length > 0;

  return (
    <div className="py-8 sm:py-10">
      <div>
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-brand-50 dark:bg-brand-950/40 text-brand text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
            <Code className="h-3.5 w-3.5" />
            Interactive testing
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-3">
            Sandbox playground
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl">
            Test API endpoints interactively with real-time responses, no real
            funds involved.
          </p>
        </div>

        {/* Auth Panel */}
        <div className="mb-5 border border-border rounded-2xl overflow-hidden">
          <button
            type="button"
            onClick={() => setShowAuth((v) => !v)}
            className="w-full flex items-center justify-between px-4 py-3.5 bg-muted/40 dark:bg-card/60 hover:bg-muted/70 dark:hover:bg-card transition-colors"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <KeyRound className="h-4 w-4 text-muted-foreground shrink-0" />
              <span className="font-medium text-sm text-foreground">
                Authentication
              </span>
              {isAuthenticated ? (
                <span className="hidden sm:inline-flex items-center gap-1 text-xs text-green-600 dark:text-green-400 font-medium">
                  <CheckCircle2 className="h-3 w-3" /> Token active  requests
                  authorized
                </span>
              ) : (
                <span className="hidden sm:block text-xs text-muted-foreground truncate">
                  Authenticate to make real API calls
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {isAuthenticated && (
                <span className="sm:hidden inline-flex items-center gap-1 text-xs text-green-600 dark:text-green-400 font-medium">
                  <CheckCircle2 className="h-3 w-3" /> Active
                </span>
              )}
              {showAuth ? (
                <ChevronUp className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              )}
            </div>
          </button>

          {showAuth && (
            <div className="p-4 bg-card border-t border-border space-y-4">
              {/* Bearer token  editable directly or generated */}
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">
                  Bearer Token
                </label>
                <div className="relative">
                  <input
                    type={auth.showToken ? "text" : "password"}
                    value={auth.token}
                    onChange={(e) => updateAuth("token", e.target.value)}
                    placeholder="Paste your token here, or use Generate Token below"
                    autoCapitalize="none"
                    autoCorrect="off"
                    spellCheck={false}
                    className="w-full px-3 py-2.5 pr-20 text-sm bg-muted/40 dark:bg-background/60 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/30 text-foreground placeholder:text-muted-foreground/50 font-mono"
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                    {auth.token && (
                      <button
                        type="button"
                        onClick={handleCopyToken}
                        className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                        aria-label="Copy token"
                      >
                        {tokenCopied ? (
                          <Check className="h-3.5 w-3.5 text-green-500" />
                        ) : (
                          <Copy className="h-3.5 w-3.5" />
                        )}
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => updateAuth("showToken", !auth.showToken)}
                      className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                      aria-label={auth.showToken ? "Hide token" : "Show token"}
                    >
                      {auth.showToken ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3.5 w-3.5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                          <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                          <line x1="1" y1="1" x2="23" y2="23" />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3.5 w-3.5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
                {isAuthenticated && (
                  <p className="flex items-center gap-1 text-[11px] text-green-600 dark:text-green-400 mt-1">
                    <CheckCircle2 className="h-3 w-3" /> Token active  requests
                    will be authorized
                  </p>
                )}
              </div>

              {/* Generate token section */}
              <div className="border border-border rounded-xl overflow-hidden">
                <div className="px-3 py-2 bg-muted/30 border-b border-border">
                  <p className="text-xs font-semibold text-foreground">
                    Generate token automatically
                  </p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    Enter the auth endpoint and credentials  the token will be
                    fetched and filled above.
                  </p>
                </div>
                <div className="p-3 space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-foreground mb-1">
                      Auth Endpoint URL
                    </label>
                    <input
                      type="text"
                      value={auth.authUrl}
                      onChange={(e) => updateAuth("authUrl", e.target.value)}
                      placeholder="https://dev.mypasspoint.com/userapp/merchant-app/get-auth-token"
                      autoComplete="url"
                      autoCapitalize="none"
                      autoCorrect="off"
                      spellCheck={false}
                      className="w-full px-3 py-2 text-sm bg-muted/40 dark:bg-background/60 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand/30 text-foreground placeholder:text-muted-foreground/50 font-mono"
                    />
                  </div>
                  <div className="grid gap-3 sm:grid-cols-3">
                    <div>
                      <label className="block text-xs font-medium text-foreground mb-1">
                        x-merchant-id
                      </label>
                      <input
                        type="text"
                        value={auth.merchantId}
                        onChange={(e) =>
                          updateAuth("merchantId", e.target.value)
                        }
                        placeholder="YOUR_MERCHANT_ID"
                        autoCapitalize="none"
                        autoCorrect="off"
                        spellCheck={false}
                        className="w-full px-3 py-2 text-sm bg-muted/40 dark:bg-background/60 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand/30 text-foreground placeholder:text-muted-foreground/50 font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-foreground mb-1">
                        x-channel-id
                      </label>
                      <input
                        type="text"
                        value={auth.channelId}
                        onChange={(e) =>
                          updateAuth("channelId", e.target.value)
                        }
                        placeholder="CHANNEL_ID"
                        autoCapitalize="none"
                        autoCorrect="off"
                        spellCheck={false}
                        className="w-full px-3 py-2 text-sm bg-muted/40 dark:bg-background/60 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand/30 text-foreground placeholder:text-muted-foreground/50 font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-foreground mb-1">
                        x-channel-code
                      </label>
                      <input
                        type="text"
                        value={auth.channelCode}
                        onChange={(e) =>
                          updateAuth("channelCode", e.target.value)
                        }
                        placeholder="CHANNEL_CODE"
                        autoCapitalize="none"
                        autoCorrect="off"
                        spellCheck={false}
                        className="w-full px-3 py-2 text-sm bg-muted/40 dark:bg-background/60 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand/30 text-foreground placeholder:text-muted-foreground/50 font-mono"
                      />
                    </div>
                  </div>

                  {auth.status === "error" && auth.error && (
                    <div className="flex items-start gap-2 p-2.5 bg-destructive/10 border border-destructive/20 rounded-lg">
                      <AlertCircle className="h-3.5 w-3.5 text-destructive shrink-0 mt-0.5" />
                      <p className="text-xs text-destructive">{auth.error}</p>
                    </div>
                  )}

                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={handleAuthenticate}
                      disabled={!canGenerate || auth.status === "loading"}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-brand text-white text-xs font-semibold rounded-lg hover:bg-brand/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {auth.status === "loading" ? (
                        <>
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          Fetching token
                        </>
                      ) : (
                        <>
                          <LogIn className="h-3.5 w-3.5" />
                          Generate Token
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Endpoint Selection */}
        <div className="mb-4 sm:mb-6">
          <label className="block text-sm font-medium text-foreground mb-2 sm:mb-3">
            Select API Endpoint
          </label>
          <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0 sm:grid sm:grid-cols-3 lg:grid-cols-5 sm:gap-3 -mx-4 px-4 sm:mx-0 sm:px-0 snap-x snap-mandatory">
            {ENDPOINTS.map((endpoint) => (
              <button
                key={endpoint.id}
                onClick={() => setSelectedEndpoint(endpoint.id)}
                className={`shrink-0 snap-start w-36 sm:w-auto p-3 sm:p-4 rounded-2xl border-2 text-left transition-all ${
                  selectedEndpoint === endpoint.id
                    ? "border-brand/50 bg-brand-50/60 dark:bg-brand-950/20 dark:border-brand/30"
                    : "border-border bg-white dark:bg-card hover:border-brand/30 active:bg-muted/40"
                }`}
              >
                <span
                  className={`inline-block px-1.5 py-0.5 text-[10px] font-semibold rounded mb-2 ${
                    endpoint.method === "GET"
                      ? "bg-brand/10 text-brand dark:bg-brand/20"
                      : "bg-muted text-muted-foreground dark:bg-muted/30"
                  }`}
                >
                  {endpoint.method}
                </span>
                <h3 className="font-medium text-foreground text-xs leading-snug mb-1">
                  {endpoint.name}
                </h3>
                <p className="text-[11px] text-muted-foreground line-clamp-2 leading-snug">
                  {endpoint.description}
                </p>
              </button>
            ))}

            {/* Custom request tile */}
            <button
              onClick={() => setSelectedEndpoint("custom")}
              className={`shrink-0 snap-start w-36 sm:w-auto p-3 sm:p-4 rounded-2xl border-2 text-left transition-all ${
                selectedEndpoint === "custom"
                  ? "border-brand/50 bg-brand-50/60 dark:bg-brand-950/20 dark:border-brand/30"
                  : "border-dashed border-border bg-white dark:bg-card hover:border-brand/30 active:bg-muted/40"
              }`}
            >
              <CirclePlus className="h-4 w-4 text-muted-foreground mb-2" />
              <h3 className="font-medium text-foreground text-xs leading-snug mb-1">
                Custom Request
              </h3>
              <p className="text-[11px] text-muted-foreground line-clamp-2 leading-snug">
                Paste from the docs or your own config
              </p>
            </button>
          </div>
        </div>

        {/* Main Editor */}
        <div className="space-y-4 sm:space-y-6">
          <div className="w-full">
            <div className="bg-white dark:bg-card border border-border dark:border-border rounded-2xl overflow-hidden shadow-sm">
              {/* Request Header */}
              <div className="flex items-center gap-2 px-4 sm:px-6 py-3 sm:py-4 bg-muted dark:bg-card/30 border-b border-border dark:border-border">
                <Settings className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground dark:text-muted-foreground" />
                <h2 className="text-base sm:text-lg font-semibold text-foreground dark:text-foreground">
                  API Testing Environment
                </h2>
                {isAuthenticated && (
                  <span className="ml-auto inline-flex items-center gap-1 text-xs text-green-600 dark:text-green-400 font-medium">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Authorized
                  </span>
                )}
              </div>

              <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                {/* Endpoint info banner */}
                {selectedEndpoint === "custom" ? (
                  <div className="p-3 sm:p-4 bg-muted/30 dark:bg-background/40 rounded-lg border border-dashed border-border">
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Paste any request JSON below from the docs or your own config. Use{" "}
                      <code className="text-brand font-mono">
                        {"{{token}}"}
                      </code>{" "}
                      in the Authorization header and it will be replaced with
                      your active token automatically.
                    </p>
                  </div>
                ) : selectedEndpointData ? (
                  <div className="p-3 sm:p-4 bg-white dark:bg-card rounded-lg border border-border dark:border-border">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded ${
                            selectedEndpointData.method === "GET"
                              ? "bg-muted text-brand dark:bg-muted/30 dark:text-brand/60"
                              : "bg-muted text-foreground dark:bg-muted/30 dark:text-muted-foreground"
                          }`}
                        >
                          {selectedEndpointData.method}
                        </span>
                        <span className="text-sm font-medium text-foreground dark:text-foreground">
                          {selectedEndpointData.name}
                        </span>
                      </div>
                    </div>
                    <code className="text-xs text-muted-foreground dark:text-muted-foreground break-all block overflow-x-auto">
                      YOUR_BASE_URL{selectedEndpointData.path}
                    </code>
                    {!isAuthenticated && (
                      <p className="text-xs text-amber-600 dark:text-amber-400 mt-2">
                        Authenticate above to generate a Bearer token and make
                        real requests.
                      </p>
                    )}
                  </div>
                ) : null}

                {/* Editor */}
                <div>
                  <h3 className="text-sm font-medium text-foreground dark:text-foreground mb-3">
                    Request Configuration &amp; Response
                  </h3>
                  <SandboxTextEditor
                    value={requestData}
                    onChange={setRequestData}
                    placeholder="Paste or type your API request JSON here..."
                    title={
                      selectedEndpoint === "custom"
                        ? "Custom Request"
                        : "API Request"
                    }
                    minHeight="400px"
                    maxHeight="600px"
                    envVars={{ token: auth.token }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SandboxPlayground;
