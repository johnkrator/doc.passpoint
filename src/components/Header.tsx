import { Menu, Moon, Sun, Sparkles, X, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";
import SearchInput from "./SearchInput";
import { Link, useLocation } from "react-router-dom";
import logoSrc from "@/assets/new-logo.png";
import PasspointAI from "./PasspointAI/PasspointAI";

interface HeaderProps {
  onMenuClick: () => void;
}

const MOBILE_NAV_SECTIONS = [
  {
    heading: "Products",
    links: [
      { label: "Collections", to: "/collection" },
      { label: "Payouts", to: "/payout" },
      { label: "Wallets", to: "/wallet" },
      { label: "Virtual Cards", to: "/virtual-card-v2" },
      { label: "Cross-Border", to: "/transfer" },
    ],
  },
  {
    heading: "Developers",
    links: [
      { label: "Introduction", to: "/introduction" },
      { label: "Quick Start", to: "/quickstart" },
      { label: "API Integrations", to: "/api-integrations" },
      { label: "Sandbox", to: "/sandbox-playground" },
      { label: "Authentication", to: "/authentication" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Quick Guides", to: "/quick-guides" },
      { label: "Status Responses", to: "/status-responses" },
      { label: "Rate Limits", to: "/api-rate-limits" },
    ],
  },
];

const Header = ({ onMenuClick }: HeaderProps) => {
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const [showAI, setShowAI] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // Close mobile nav on route change
  useEffect(() => {
    setMobileNavOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile nav is open
  useEffect(() => {
    if (mobileNavOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileNavOpen]);

  const handleHamburgerClick = () => {
    if (isHomePage) {
      setMobileNavOpen((prev) => !prev);
    } else {
      onMenuClick();
    }
  };

  return (
    <>
      <header className="bg-white/90 dark:bg-background/90 backdrop-blur-md border-b border-border sticky top-0 z-50">
        <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
          {/* Left  hamburger + logo */}
          <div className="flex items-center gap-2 min-w-0 shrink-0">
            {/* Hamburger  always visible on mobile; hidden on lg+ for homepage */}
            <Button
              variant="ghost"
              size="sm"
              aria-label={mobileNavOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileNavOpen}
              className="text-foreground cursor-pointer hover:bg-muted dark:hover:bg-card p-1.5 shrink-0 lg:hidden"
              onClick={handleHamburgerClick}
            >
              {mobileNavOpen && isHomePage ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </Button>

            {/* Sidebar toggle for doc pages on desktop */}
            {!isHomePage && (
              <Button
                variant="ghost"
                size="sm"
                className="text-foreground cursor-pointer hover:bg-muted dark:hover:bg-card p-1.5 shrink-0 hidden lg:flex"
                onClick={onMenuClick}
              >
                <Menu className="h-4 w-4" />
              </Button>
            )}

            <Link to="/" className="flex items-center min-w-0 -ml-5">
              <img
                src={logoSrc}
                alt="Passpoint"
                className="h-20 w-auto object-contain mix-blend-multiply dark:mix-blend-screen dark:filter-[invert(1)_hue-rotate(180deg)]"
              />
            </Link>
          </div>

          {/* Center  search (desktop only) */}
          <div className="hidden lg:flex flex-1 max-w-sm xl:max-w-md mx-4 xl:mx-8">
            <SearchInput />
          </div>

          {/* Right  nav + theme + Ask AI */}
          <nav className="flex items-center gap-1 sm:gap-1.5 lg:gap-2">
            <a
              href="https://mypasspoint.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors text-xs font-medium hidden xl:block px-2 py-1 rounded-md hover:bg-muted dark:hover:bg-card"
            >
              Website
            </a>
            <a
              href="http://go.mypasspoint.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors text-xs font-medium hidden 2xl:block px-2 py-1 rounded-md hover:bg-muted dark:hover:bg-card"
            >
              Dashboard
            </a>

            <div className="w-px h-4 bg-border hidden sm:block mx-1" />

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="text-muted-foreground cursor-pointer hover:text-foreground hover:bg-muted dark:hover:bg-card p-1.5 shrink-0"
            >
              {theme === "light" ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
            </Button>

            {!isHomePage && (
              <button
                onClick={() => setShowAI(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand text-white text-xs font-medium hover:opacity-90 transition-all ml-1"
              >
                <Sparkles className="w-3 h-3" />
                <span className="hidden sm:inline">Ask AI</span>
              </button>
            )}

            {/* Homepage CTA  desktop only */}
            {isHomePage && (
              <a
                href="https://go.mypasspoint.com/authentication/login"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand text-white text-xs font-medium hover:opacity-90 transition-all ml-1"
              >
                Login
                <ArrowRight className="w-3 h-3" />
              </a>
            )}
          </nav>
        </div>

        {/* Search  mobile & tablet (hidden when mobile nav is open) */}
        {!mobileNavOpen && (
          <div className="lg:hidden px-4 sm:px-6 pb-2.5">
            <SearchInput />
          </div>
        )}

        {/* Mobile nav drawer  homepage only */}
        {isHomePage && mobileNavOpen && (
          <nav
            className="lg:hidden border-t border-border bg-background overflow-y-auto"
            style={{ maxHeight: "calc(100vh - 4rem)" }}
            aria-label="Mobile navigation"
          >
            <div className="px-4 pt-4 pb-6 space-y-6">
              {MOBILE_NAV_SECTIONS.map(({ heading, links }) => (
                <div key={heading}>
                  <p className="text-[10.5px] uppercase tracking-[0.12em] font-semibold text-muted-foreground/60 mb-2.5">
                    {heading}
                  </p>
                  <ul className="space-y-0.5">
                    {links.map(({ label, to }) => (
                      <li key={label}>
                        <Link
                          to={to}
                          className="flex items-center justify-between py-2.5 px-3 rounded-lg text-[14px] font-medium text-foreground hover:bg-muted dark:hover:bg-card transition-colors"
                        >
                          {label}
                          <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {/* CTA */}
              <div className="pt-2 flex flex-col gap-2.5">
                <a
                  href="https://go.mypasspoint.com/authentication/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 rounded-[10px] text-[14px] font-medium text-white bg-brand hover:opacity-90 transition-all"
                >
                  Login
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://mypasspoint.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center py-3 rounded-[10px] text-[14px] font-medium border border-border text-foreground hover:bg-muted transition-all"
                >
                  Visit website
                </a>
              </div>
            </div>
          </nav>
        )}
      </header>

      {/* AI Panel */}
      <PasspointAI isOpen={showAI} onClose={() => setShowAI(false)} />
    </>
  );
};

export default Header;
