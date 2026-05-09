import React from "react";
import {
  RefreshCw,
  Home,
  AlertCircle,
  Bug,
  ShieldAlert,
  ServerCrash,
  ArrowUpRight,
} from "lucide-react";
import { useRouteError, isRouteErrorResponse } from "react-router-dom";
import type { LucideIcon } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ResolvedErrorInfo {
  code: string;
  title: string;
  description: string;
  Icon: LucideIcon;
}

// ─── Shared editorial primitives ──────────────────────────────────────────────

interface EyebrowProps {
  children: React.ReactNode;
}

const Eyebrow: React.FC<EyebrowProps> = ({ children }) => (
  <div className="inline-flex items-center gap-2.5 mb-6 text-muted-foreground">
    <span
      className="inline-block w-1.5 h-1.5 rounded-full bg-brand"
      aria-hidden="true"
    />
    <span className="font-['JetBrains_Mono',monospace] text-[11px] uppercase tracking-[0.22em]">
      {children}
    </span>
  </div>
);

interface PrimaryButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  icon?: LucideIcon;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  onClick,
  children,
  icon: Icon,
}) => (
  <button
    type="button"
    onClick={onClick}
    className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-[14px] font-medium text-white bg-foreground transition-all"
    style={{
      boxShadow:
        "inset 0 1px 0 rgba(255,255,255,.08), 0 1px 2px rgba(15,15,20,.10), 0 8px 22px -8px rgba(15,15,20,.30)",
    }}
  >
    {Icon && (
      <Icon
        className="w-3.5 h-3.5 transition-transform group-hover:rotate-180"
        strokeWidth={1.8}
      />
    )}
    {children}
  </button>
);

interface SecondaryButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  icon?: LucideIcon;
}

const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  onClick,
  children,
  icon: Icon,
}) => (
  <button
    type="button"
    onClick={onClick}
    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-[14px] font-medium border border-border bg-card text-foreground transition-all hover:border-foreground/30"
  >
    {Icon && <Icon className="w-3.5 h-3.5" strokeWidth={1.8} />}
    {children}
  </button>
);

// ─── 404 — editorial layout ──────────────────────────────────────────────────

const POPULAR_LINKS: ReadonlyArray<{ label: string; href: string }> = [
  { label: "Introduction", href: "/introduction" },
  { label: "Authentication", href: "/authentication" },
  { label: "API integrations", href: "/api-integrations" },
  { label: "Quick guides", href: "/quick-guides" },
  { label: "Wallets", href: "/wallet" },
  { label: "Transfer", href: "/transfer" },
];

const NotFoundView: React.FC<{ pathname: string }> = ({ pathname }) => (
  <main className="min-h-screen bg-background text-foreground flex items-center justify-center px-6 py-20">
    <div className="w-full max-w-3xl">
      <Eyebrow>Error · 404</Eyebrow>

      <h1
        className="font-['Fraunces',serif] font-medium leading-[0.96] tracking-[-0.035em] mb-8"
        style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}
      >
        Page <em className="not-italic font-normal italic text-brand">missing.</em>
      </h1>

      <p className="text-[17px] leading-[1.65] text-muted-foreground max-w-[560px] mb-3">
        We couldn't find anything at this address.
      </p>
      <p className="text-[15px] text-muted-foreground mb-10">
        <code className="font-['JetBrains_Mono',monospace] text-[13px] px-2 py-1 rounded border border-border bg-muted/60 text-foreground">
          {pathname}
        </code>
      </p>

      <div className="flex flex-col sm:flex-row gap-3 mb-16">
        <PrimaryButton
          onClick={() => {
            window.location.href = "/";
          }}
          icon={Home}
        >
          Go home
        </PrimaryButton>
        <SecondaryButton
          onClick={() => window.history.back()}
          icon={RefreshCw}
        >
          Go back
        </SecondaryButton>
      </div>

      <div className="border-t border-border pt-8">
        <div className="font-['JetBrains_Mono',monospace] text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-5">
          Popular pages
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-1">
          {POPULAR_LINKS.map(({ label, href }) => (
            <li key={href} className="border-b border-border">
              <a
                href={href}
                className="group flex items-center justify-between py-3 text-[14.5px] text-foreground transition-colors hover:text-brand"
              >
                <span>{label}</span>
                <ArrowUpRight
                  className="w-3.5 h-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand"
                  strokeWidth={1.8}
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </main>
);

// ─── Generic editorial error shell ────────────────────────────────────────────

interface ErrorShellProps {
  resolved: ResolvedErrorInfo;
  errorMessage: string;
  stack?: string;
  showStack: boolean;
  onRefresh: () => void;
  onGoHome: () => void;
}

const ErrorShell: React.FC<ErrorShellProps> = ({
  resolved,
  errorMessage,
  stack,
  showStack,
  onRefresh,
  onGoHome,
}) => {
  const { code, title, description, Icon } = resolved;
  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center px-6 py-20">
      <div className="w-full max-w-3xl">
        <Eyebrow>Error · {code}</Eyebrow>

        <div className="flex items-start gap-5 mb-8">
          <span
            className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-border bg-card shrink-0 text-brand"
            aria-hidden="true"
          >
            <Icon className="w-5 h-5" strokeWidth={1.6} />
          </span>
          <h1
            className="font-['Fraunces',serif] font-medium leading-[1] tracking-[-0.03em]"
            style={{ fontSize: "clamp(2.4rem, 5.6vw, 4.4rem)" }}
          >
            {title.split(" ").slice(0, -1).join(" ")}{" "}
            <em className="not-italic font-normal italic text-brand">
              {title.split(" ").slice(-1)[0]}
            </em>
          </h1>
        </div>

        <p className="text-[17px] leading-[1.65] text-muted-foreground max-w-[560px] mb-10">
          {description}
        </p>

        {/* Error details — hairline editorial card */}
        <div className="border-y border-border py-6 mb-10">
          <div className="flex items-start gap-3">
            <AlertCircle
              className="w-4 h-4 text-brand shrink-0 mt-0.5"
              strokeWidth={1.8}
            />
            <div className="flex-1 min-w-0">
              <div className="font-['JetBrains_Mono',monospace] text-[10.5px] uppercase tracking-[0.18em] text-muted-foreground mb-2">
                Error details
              </div>
              <p className="font-['JetBrains_Mono',monospace] text-[13px] leading-[1.6] text-foreground break-words">
                {errorMessage}
              </p>
              {showStack && stack && (
                <details className="mt-4">
                  <summary className="font-['JetBrains_Mono',monospace] text-[11px] uppercase tracking-[0.16em] text-muted-foreground cursor-pointer hover:text-foreground transition-colors">
                    Stack trace · development only
                  </summary>
                  <pre className="mt-3 font-['JetBrains_Mono',monospace] text-[11.5px] leading-[1.6] text-muted-foreground bg-muted/60 border border-border rounded-lg p-4 overflow-auto max-h-56">
                    {stack}
                  </pre>
                </details>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-12">
          <PrimaryButton onClick={onRefresh} icon={RefreshCw}>
            Refresh page
          </PrimaryButton>
          <SecondaryButton onClick={onGoHome} icon={Home}>
            Go home
          </SecondaryButton>
        </div>

        <div className="border-t border-border pt-6">
          <div className="font-['JetBrains_Mono',monospace] text-[10.5px] uppercase tracking-[0.18em] text-muted-foreground mb-3">
            What you can try
          </div>
          <ul className="space-y-1.5">
            {[
              "Refresh the page",
              "Check your internet connection",
              "Clear your browser cache",
              "Return to the homepage",
            ].map((tip) => (
              <li
                key={tip}
                className="flex items-start gap-2.5 text-[14.5px] text-muted-foreground leading-[1.65]"
              >
                <span
                  className="mt-2.5 w-1 h-1 rounded-full bg-brand shrink-0"
                  aria-hidden="true"
                />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="text-[13px] text-muted-foreground mt-10 font-['Fraunces',serif] italic">
          If this persists, please contact our support team.
        </p>
      </div>
    </main>
  );
};

// ─── Resolvers ────────────────────────────────────────────────────────────────

const resolveRouteError = (error: unknown): ResolvedErrorInfo => {
  if (isRouteErrorResponse(error)) {
    switch (error.status) {
      case 403:
        return {
          code: "403",
          title: "Access forbidden",
          description:
            "You don't have permission to access this page or resource. If you think this is wrong, contact your account administrator.",
          Icon: ShieldAlert,
        };
      case 500:
        return {
          code: "500",
          title: "Server error",
          description:
            "Our servers are experiencing issues. Please try again in a few moments — the team has been notified.",
          Icon: ServerCrash,
        };
      default:
        return {
          code: String(error.status),
          title: `Error ${error.status}`,
          description:
            error.statusText ||
            "An unexpected error occurred while loading this page.",
          Icon: Bug,
        };
    }
  }

  if (error instanceof Error) {
    return {
      code: "Navigation",
      title: "Navigation error",
      description:
        error.message || "Something went wrong while navigating to this page.",
      Icon: Bug,
    };
  }

  return {
    code: "Unknown",
    title: "Unexpected error",
    description:
      "An unknown error occurred while loading this page. Please try refreshing or go back to the homepage.",
    Icon: Bug,
  };
};

const extractErrorMessage = (error: unknown): string => {
  if (isRouteErrorResponse(error)) {
    return `${error.status} ${error.statusText}`.trim();
  }
  if (error instanceof Error) {
    return error.message;
  }
  return "An unexpected error occurred";
};

// ─── Router error boundary ────────────────────────────────────────────────────

export const RouterErrorBoundary: React.FC = () => {
  const error = useRouteError();

  const is404Error =
    (isRouteErrorResponse(error) && error.status === 404) ||
    (!isRouteErrorResponse(error) && window.location.pathname !== "/");

  if (is404Error) {
    return <NotFoundView pathname={window.location.pathname} />;
  }

  const resolved = resolveRouteError(error);
  const errorMessage = extractErrorMessage(error);

  return (
    <ErrorShell
      resolved={resolved}
      errorMessage={errorMessage}
      showStack={false}
      onRefresh={(): void => window.location.reload()}
      onGoHome={(): void => {
        window.location.href = "/";
      }}
    />
  );
};

// ─── React component error boundary ───────────────────────────────────────────

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    this.setState({ error, errorInfo });

    // Log error to console for diagnostic purposes — never log PII.
    // In production, this is the integration point for an error reporting service.
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  handleRefresh = (): void => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.reload();
  };

  handleGoHome = (): void => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.href = "/";
  };

  render(): React.ReactNode {
    if (this.state.hasError) {
      const isDevelopment = process.env.NODE_ENV === "development";
      const resolved: ResolvedErrorInfo = {
        code: "Application",
        title: "Application error",
        description:
          "We encountered an unexpected error while rendering this page. The team has been notified — try refreshing or returning home.",
        Icon: Bug,
      };
      const errorMessage =
        this.state.error?.message || "An unknown error occurred";

      return (
        <ErrorShell
          resolved={resolved}
          errorMessage={errorMessage}
          stack={this.state.error?.stack}
          showStack={isDevelopment}
          onRefresh={this.handleRefresh}
          onGoHome={this.handleGoHome}
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
