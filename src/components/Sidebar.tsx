import React, { useState, useRef, useCallback, useEffect } from "react";
import {
  ChevronRight,
  Home,
  Book,
  Users,
  BarChart3,
  FileText,
  Settings,
  X,
  Send,
  ArrowDownToLine,
  ArrowUpToLine,
  Globe,
  DollarSign,
  TrendingUp,
  History,
  MessageSquare,
  Webhook,
  CheckCircle,
  Building2,
  RefreshCw,
  MapPin,
  CreditCard,
  Shield,
  Key,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLocation, Link } from "react-router-dom";
import { NAV_SECTIONS } from "@/constants/navigation";
import type { NavRoute } from "@/constants/navigation";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

type IconComponent = React.ComponentType<{ className?: string }>;

interface NavItem {
  icon: IconComponent;
  label: string;
  href: string;
  children?: NavItem[];
}

interface SidebarSection {
  title: string;
  items: NavItem[];
}

const ICON_MAP: Record<string, IconComponent> = {
  "/": Home,
  "/introduction": FileText,
  "/api-integrations": Settings,
  "/wallet": BarChart3,
  "/transfer": Send,
  "/payout": ArrowUpToLine,
  "/payout/momo": MessageSquare,
  "/payout/momo/get-network": Globe,
  "/payout/momo/get-payout-network": Globe,
  "/payout/momo/validate-msisdn": CheckCircle,
  "/payout/momo/transfer": Send,
  "/payout/bank": Building2,
  "/payout/bank/local": MapPin,
  "/payout/bank/local/get-banks": Building2,
  "/payout/bank/local/account-enquiry": CheckCircle,
  "/payout/bank/local/account-transfer-ngn": Send,
  "/payout/bank/local/passpoint-enquiry": CheckCircle,
  "/payout/bank/local/passpoint-wallet-transfer": Send,
  "/payout/bank/foreign": Globe,
  "/payout/bank/foreign/summary": FileText,
  "/payout/bank/foreign/get-available-countries": Globe,
  "/payout/bank/foreign/get-payment-methods": CreditCard,
  "/payout/bank/foreign/ach-usd": DollarSign,
  "/payout/bank/foreign/wire-usd": Send,
  "/payout/bank/foreign/rtp-usd": Send,
  "/payout/bank/foreign/fednow-usd": Send,
  "/payout/bank/foreign/account-deposit-usd": BarChart3,
  "/payout/bank/foreign/account-deposit-gbp": BarChart3,
  "/payout/bank/foreign/account-deposit-eur": BarChart3,
  "/payout/bank/foreign/account-deposit-cny": BarChart3,
  "/payout/bank/foreign/momo-deposit-cny": MessageSquare,
  "/payout/bank/foreign/b2b-transfer-cny": Send,
  "/payout/bank/foreign/b2c-transfer-cny": Send,
  "/payout/bank/foreign/b2b-transfer-usd": Send,
  "/payout/rate": TrendingUp,
  "/payout/report": History,
  "/payout/convert-funds": RefreshCw,
  "/payout/funds-transfer-callback-sample": Webhook,
  "/collection": ArrowDownToLine,
  "/collection/momo": MessageSquare,
  "/collection/momo/get-currency": Globe,
  "/collection/momo/get-network": Globe,
  "/collection/momo/request-to-pay": Send,
  "/collection/bank": Building2,
  "/collection/bank/open-banking": Shield,
  "/collection/bank/open-banking/request-payment-foreign": Send,
  "/collection/bank/open-banking/preselect": MapPin,
  "/collection/bank/open-banking/preselect/get-banks": Building2,
  "/collection/bank/open-banking/preselect/get-countries": Globe,
  "/collection/bank/open-banking/preselect/request-payment-foreign-with-bank-preselect":
    Send,
  "/collection/bank/get-collection-currency": DollarSign,
  "/collection/bank/generate-ngn-static-virtual-account": BarChart3,
  "/collection/bank/generate-ngn-dynamic-virtual-account": BarChart3,
  "/collection/bank/generate-ngn-dynamic-virtual-account-with-other-info":
    BarChart3,
  "/collection/bank/generate-usd-virtual-account-individual": BarChart3,
  "/collection/bank/generate-usd-virtual-account-business": BarChart3,
  "/collection/bank/list-virtual-accounts-ngn-paginated": BarChart3,
  "/collection/bank/get-virtual-account": BarChart3,
  "/collection/report": History,
  "/collection/wallet-credit-callback-sample": Webhook,
  "/transfer/transfer-introduction": FileText,
  "/transfer/list-countries": BarChart3,
  "/transfer/transfer-status": BarChart3,
  "/transfer/payment-status-report": BarChart3,
  "/transfer/resend-single-webhook": Send,
  "/transfer/resend-bulk-webhook": Send,
  "/transfer/confirm-momo-payment": CheckCircle,
  "/global-callback-setup": Settings,
  "/authentication": Key,
  "/virtual-card-v2": FileText,
  "/virtual-card-v2/card-introduction": FileText,
  "/virtual-card-v2/issue-card-default-billing": Send,
  "/virtual-card-v2/issue-card-client-billing": Send,
  "/virtual-card-v2/issue-and-fund-card-client-billing": Send,
  "/virtual-card-v2/card-details": FileText,
  "/virtual-card-v2/card-full-pan": FileText,
  "/virtual-card-v2/card-balance": DollarSign,
  "/virtual-card-v2/card-profile-status": CheckCircle,
  "/virtual-card-v2/freeze-card": Settings,
  "/virtual-card-v2/unfreeze-card": Settings,
  "/virtual-card-v2/fund-card": Send,
  "/virtual-card-v2/withdraw-from-card": ArrowUpToLine,
  "/virtual-card-v2/card-transaction": History,
  "/virtual-card-v2/card-transactions-list": History,
  "/virtual-card-v2/terminate-card": Settings,
  "/virtual-card-v2/update-card-callback-details": Settings,
  "/virtual-card-v2/card-statement": FileText,
  "/virtual-card-v2/card-statement-by-transaction-id": FileText,
  "/virtual-card-v2/realtime-authorization-decision-maker": CheckCircle,
  "/api-rate-limits": BarChart3,
  "/quick-guides": Book,
  "/transaction-dynamics": FileText,
  "/user-roles": Users,
  "/status-responses": BarChart3,
};

const getIcon = (href: string): IconComponent => ICON_MAP[href] ?? FileText;

const mapRouteToNavItem = (route: NavRoute): NavItem => ({
  icon: getIcon(route.href),
  label: route.label,
  href: route.href,
  children: route.children?.map(mapRouteToNavItem),
});

const buildNavSections = (): SidebarSection[] =>
  NAV_SECTIONS.map((section) => ({
    title: section.title,
    items: section.items.map(mapRouteToNavItem),
  }));

const MIN_WIDTH = 224;
const MAX_WIDTH = 480;
const DEFAULT_WIDTH = 288;
const STORAGE_KEY = "pp_sidebar_width";
const KEYBOARD_STEP = 16;

const clampWidth = (w: number): number =>
  Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, w));

// ── Recursive nav item renderer ───────────────────────────────────────────────

interface NavItemRendererProps {
  item: NavItem;
  level: number;
  onClose: () => void;
  openNavItems: string[];
  toggleNavItem: (key: string) => void;
  parentKeys: readonly string[];
  currentPath: string;
}

const NavItemRenderer: React.FC<NavItemRendererProps> = ({
  item,
  level,
  onClose,
  openNavItems,
  toggleNavItem,
  parentKeys,
  currentPath,
}) => {
  const isActive = currentPath === item.href;
  const hasChildren = (item.children?.length ?? 0) > 0;
  const itemKey = [...parentKeys, item.label].join("||");
  const isExpanded = openNavItems.includes(itemKey);

  const itemClass = cn(
    "flex items-center gap-2.5 w-full text-left rounded-md transition-colors duration-150",
    level === 0 ? "px-2.5 py-2 text-sm" : "px-2 py-1.5 text-[0.8125rem]",
    isActive
      ? "bg-brand/10 dark:bg-brand/15 text-brand font-semibold"
      : "text-foreground/75 dark:text-muted-foreground hover:bg-muted dark:hover:bg-card hover:text-foreground dark:hover:text-foreground",
  );

  if (hasChildren) {
    return (
      <div>
        <button
          type="button"
          onClick={() => toggleNavItem(itemKey)}
          className={itemClass}
        >
          {level === 0 && <item.icon className="h-4 w-4 shrink-0" />}
          <span className="truncate flex-1">{item.label}</span>
          <ChevronRight
            className={cn(
              "h-3 w-3 shrink-0 text-muted-foreground/50 transition-transform duration-150",
              isExpanded && "rotate-90",
            )}
          />
        </button>
        {isExpanded && (
          <div className="mt-0.5 ml-3 pl-2.5 border-l border-border/50 dark:border-border/30 space-y-0.5">
            {item.children!.map((child) => (
              <NavItemRenderer
                key={child.href}
                item={child}
                level={level + 1}
                onClose={onClose}
                openNavItems={openNavItems}
                toggleNavItem={toggleNavItem}
                parentKeys={[...parentKeys, item.label]}
                currentPath={currentPath}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      to={item.href}
      onClick={() => {
        if (window.innerWidth < 1024) onClose();
      }}
      className={itemClass}
    >
      {level === 0 && <item.icon className="h-4 w-4 shrink-0" />}
      <span className="truncate">{item.label}</span>
    </Link>
  );
};

// ── Sidebar ───────────────────────────────────────────────────────────────────

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const location = useLocation();
  const [openSections, setOpenSections] = useState<string[]>([
    "GETTING STARTED",
  ]);
  const [openNavItems, setOpenNavItems] = useState<string[]>([]);
  const [sidebarWidth, setSidebarWidth] = useState<number>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? clampWidth(parseFloat(saved)) : DEFAULT_WIDTH;
  });
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startWidth = useRef(DEFAULT_WIDTH);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, sidebarWidth.toString());
  }, [sidebarWidth]);

  const applyWidth = useCallback((clientX: number): void => {
    const delta = clientX - startX.current;
    setSidebarWidth(clampWidth(startWidth.current + delta));
  }, []);

  const endDrag = useCallback((): void => {
    isDragging.current = false;
    document.body.style.cursor = "";
    document.body.style.userSelect = "";
  }, []);

  const onMouseMove = useCallback(
    (e: MouseEvent): void => {
      if (!isDragging.current) return;
      applyWidth(e.clientX);
    },
    [applyWidth],
  );

  const onMouseUp = useCallback((): void => {
    endDrag();
  }, [endDrag]);

  const onTouchMove = useCallback(
    (e: TouchEvent): void => {
      if (!isDragging.current) return;
      applyWidth(e.touches[0].clientX);
    },
    [applyWidth],
  );

  const onTouchEnd = useCallback((): void => {
    endDrag();
  }, [endDrag]);

  useEffect(() => {
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("touchmove", onTouchMove, { passive: true });
    document.addEventListener("touchend", onTouchEnd);
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("touchmove", onTouchMove);
      document.removeEventListener("touchend", onTouchEnd);
    };
  }, [onMouseMove, onMouseUp, onTouchMove, onTouchEnd]);

  const startDrag = (e: React.MouseEvent): void => {
    e.preventDefault();
    isDragging.current = true;
    startX.current = e.clientX;
    startWidth.current = sidebarWidth;
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  };

  const startTouchDrag = (e: React.TouchEvent): void => {
    isDragging.current = true;
    startX.current = e.touches[0].clientX;
    startWidth.current = sidebarWidth;
  };

  const handleResizeKey = (e: React.KeyboardEvent): void => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      setSidebarWidth((w) => clampWidth(w + KEYBOARD_STEP));
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      setSidebarWidth((w) => clampWidth(w - KEYBOARD_STEP));
    }
  };

  const toggleSection = (section: string) => {
    setOpenSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section],
    );
  };

  const toggleNavItem = (key: string) => {
    setOpenNavItems((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key],
    );
  };

  const navSections: SidebarSection[] = buildNavSections();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        style={{ width: sidebarWidth }}
        className={cn(
          "bg-white dark:bg-background border-r border-border dark:border-border relative flex flex-col",
          // Mobile: fixed overlay, slides in/out
          "max-lg:fixed max-lg:left-0 max-lg:top-0 max-lg:z-50 max-lg:h-screen",
          "max-lg:transition-transform max-lg:duration-200 max-lg:ease-in-out",
          isOpen ? "max-lg:translate-x-0" : "max-lg:-translate-x-full",
          // Desktop: sticky below header, stays in flow so page scrolls normally
          "lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)] lg:overflow-hidden",
          isOpen ? "" : "lg:hidden",
        )}
      >
        {/* Mobile close */}
        <div className="lg:hidden flex justify-end px-4 pt-4 pb-2 shrink-0">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-foreground dark:text-foreground h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto scrollbar-hide px-3 py-3 space-y-4">
          {navSections.map((section) => {
            const isSectionOpen = openSections.includes(section.title);
            return (
              <div key={section.title}>
                <button
                  type="button"
                  onClick={() => toggleSection(section.title)}
                  className="flex items-center justify-between w-full px-2 py-1 mb-1 group"
                >
                  <span className="text-[0.6875rem] font-bold text-muted-foreground/60 dark:text-muted-foreground/50 uppercase tracking-widest group-hover:text-muted-foreground transition-colors">
                    {section.title}
                  </span>
                  <ChevronRight
                    className={cn(
                      "h-3 w-3 text-muted-foreground/40 transition-transform duration-150",
                      isSectionOpen && "rotate-90",
                    )}
                  />
                </button>

                {isSectionOpen && (
                  <div className="space-y-0.5">
                    {section.items.map((item) => (
                      <NavItemRenderer
                        key={item.href}
                        item={item}
                        level={0}
                        onClose={onClose}
                        openNavItems={openNavItems}
                        toggleNavItem={toggleNavItem}
                        parentKeys={[]}
                        currentPath={location.pathname}
                      />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Resize handle */}
        <div
          role="separator"
          aria-label="Resize sidebar"
          aria-orientation="vertical"
          aria-valuenow={sidebarWidth}
          aria-valuemin={MIN_WIDTH}
          aria-valuemax={MAX_WIDTH}
          tabIndex={0}
          onMouseDown={startDrag}
          onTouchStart={startTouchDrag}
          onKeyDown={handleResizeKey}
          className={cn(
            "absolute top-0 right-0 h-full w-1.5 cursor-col-resize group z-10",
            "hover:bg-brand/15 focus-visible:bg-brand/15 transition-colors duration-150",
            "focus-visible:outline-none",
          )}
        >
          <div className="absolute top-1/2 right-0 -translate-y-1/2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-150 pr-0.5">
            <span className="block w-0.5 h-4 rounded-full bg-brand/40" />
            <span className="block w-0.5 h-4 rounded-full bg-brand/40" />
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
