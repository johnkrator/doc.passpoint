import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { getNavigationInfo } from "@/utils/navigationOrder";

interface PageInfo {
    title: string;
    href: string;
}

interface PaginationNavigationProps {
    previousPage?: PageInfo;
    nextPage?: PageInfo;
    className?: string;
}

const PaginationNavigation: React.FC<PaginationNavigationProps> = ({
    previousPage: manualPreviousPage,
    nextPage: manualNextPage,
    className,
}) => {
    const location = useLocation();
    const { previousPage: autoPreviousPage, nextPage: autoNextPage } = getNavigationInfo(location.pathname);

    const previousPage = manualPreviousPage ?? autoPreviousPage;
    const nextPage = manualNextPage ?? autoNextPage;

    if (!previousPage && !nextPage) return null;

    return (
        <nav
            aria-label="Page navigation"
            className={cn(
                "grid grid-cols-2 gap-3 pt-8 mt-8 border-t border-border",
                className
            )}
        >
            {/* Previous */}
            <div>
                {previousPage ? (
                    <Link
                        to={previousPage.href}
                        className={cn(
                            "group flex flex-col gap-1.5 rounded-xl border border-border bg-card",
                            "px-4 py-3.5 h-full",
                            "transition-all duration-150",
                            "hover:border-brand/40 hover:shadow-sm hover:bg-muted/40",
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50"
                        )}
                        aria-label={`Previous page: ${previousPage.title}`}
                    >
                        <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            <ArrowLeft
                                className="h-3.5 w-3.5 transition-transform duration-150 group-hover:-translate-x-0.5"
                                aria-hidden="true"
                            />
                            Previous
                        </span>
                        <span className="text-sm font-semibold text-foreground leading-snug line-clamp-2 group-hover:text-brand transition-colors duration-150">
                            {previousPage.title}
                        </span>
                    </Link>
                ) : (
                    <div />
                )}
            </div>

            {/* Next */}
            <div>
                {nextPage ? (
                    <Link
                        to={nextPage.href}
                        className={cn(
                            "group flex flex-col gap-1.5 rounded-xl border border-border bg-card",
                            "px-4 py-3.5 h-full items-end text-right",
                            "transition-all duration-150",
                            "hover:border-brand/40 hover:shadow-sm hover:bg-muted/40",
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50"
                        )}
                        aria-label={`Next page: ${nextPage.title}`}
                    >
                        <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Next
                            <ArrowRight
                                className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-0.5"
                                aria-hidden="true"
                            />
                        </span>
                        <span className="text-sm font-semibold text-foreground leading-snug line-clamp-2 group-hover:text-brand transition-colors duration-150">
                            {nextPage.title}
                        </span>
                    </Link>
                ) : (
                    <div />
                )}
            </div>
        </nav>
    );
};

export default PaginationNavigation;
