import React, { useEffect, useState, useCallback } from "react";
import {
    ThumbsUp,
    ThumbsDown,
    MessageSquare,
    TrendingUp,
    Loader2,
    AlertCircle,
    ChevronLeft,
    ChevronRight,
    RefreshCw,
} from "lucide-react";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";
import {
    feedbackService,
    type FeedbackEntry,
    type FeedbackSummary,
    type FeedbackReaction,
    type FeedbackListParams,
} from "@/services/feedbackService";
import { FEEDBACK_PAGE_SIZE } from "@/constants";
import { cn } from "@/lib/utils";

// ─── Types ───────────────────────────────────────────────────────────────────

type AdminRole = "admin" | "editor" | "viewer";

interface FilterState {
    pageId: string;
    reaction: FeedbackReaction | "";
    page: number;
}

// ─── Utilities ────────────────────────────────────────────────────────────────

function extractErrorMessage(err: unknown, fallback: string): string {
    if (
        err !== null &&
        typeof err === "object" &&
        "response" in err &&
        err.response !== null &&
        typeof err.response === "object" &&
        "data" in err.response &&
        err.response.data !== null &&
        typeof err.response.data === "object" &&
        "message" in err.response.data &&
        typeof (err.response.data as { message?: unknown }).message === "string"
    ) {
        return (err.response.data as { message: string }).message;
    }
    return fallback;
}

// ─── Sub-components ──────────────────────────────────────────────────────────

interface SummaryCardProps {
    label: string;
    value: string | number;
    icon: React.ComponentType<{ className?: string }>;
    accent?: "brand" | "green" | "red";
}

const SummaryCard = ({ label, value, icon: Icon, accent = "brand" }: SummaryCardProps): React.ReactElement => {
    const accentClasses: Record<NonNullable<SummaryCardProps["accent"]>, string> = {
        brand: "bg-brand/10 text-brand",
        green: "bg-green-500/10 text-green-600 dark:text-green-400",
        red: "bg-destructive/10 text-destructive",
    };

    return (
        <div className="bg-card border border-border rounded-lg p-5">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-xs text-muted-foreground">{label}</p>
                    <p className="text-2xl font-semibold mt-1">{value}</p>
                </div>
                <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", accentClasses[accent])}>
                    <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
            </div>
        </div>
    );
};

interface ReactionBadgeProps {
    reaction: FeedbackReaction;
}

const ReactionBadge = ({ reaction }: ReactionBadgeProps): React.ReactElement =>
    reaction === "helpful" ? (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-green-500/10 text-green-600 dark:text-green-400">
            <ThumbsUp className="h-3 w-3" aria-hidden="true" />
            Helpful
        </span>
    ) : (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-destructive/10 text-destructive">
            <ThumbsDown className="h-3 w-3" aria-hidden="true" />
            Not helpful
        </span>
    );

// ─── Main component ───────────────────────────────────────────────────────────

// Re-export to silence the unused-import lint for AdminRole — used in future role-scoped logic
export type { AdminRole };

const FeedbackPage = (): React.ReactElement => {
    const [summary, setSummary] = useState<FeedbackSummary | null>(null);
    const [summaryError, setSummaryError] = useState<string | null>(null);
    const [entries, setEntries] = useState<FeedbackEntry[]>([]);
    const [entriesError, setEntriesError] = useState<string | null>(null);
    const [totalPages, setTotalPages] = useState(1);
    const [loadingSummary, setLoadingSummary] = useState(true);
    const [loadingEntries, setLoadingEntries] = useState(true);
    const [filters, setFilters] = useState<FilterState>({
        pageId: "",
        reaction: "",
        page: 1,
    });

    const fetchSummary = useCallback(async (): Promise<void> => {
        setLoadingSummary(true);
        setSummaryError(null);
        try {
            const data = await feedbackService.getSummary();
            setSummary(data);
        } catch (err: unknown) {
            const message = extractErrorMessage(err, "Failed to load feedback summary");
            setSummaryError(message);
            toast.error(message);
        } finally {
            setLoadingSummary(false);
        }
    }, []);

    const fetchEntries = useCallback(async (f: FilterState): Promise<void> => {
        setLoadingEntries(true);
        setEntriesError(null);
        try {
            const params: FeedbackListParams = {
                page: f.page,
                limit: FEEDBACK_PAGE_SIZE,
                ...(f.pageId.trim() ? { pageId: f.pageId.trim() } : {}),
                ...(f.reaction ? { reaction: f.reaction } : {}),
            };
            const data = await feedbackService.getAll(params);
            setEntries(data.data);
            setTotalPages(data.pages);
        } catch (err: unknown) {
            const message = extractErrorMessage(err, "Failed to load feedback entries");
            setEntriesError(message);
            toast.error(message);
        } finally {
            setLoadingEntries(false);
        }
    }, []);

    useEffect(() => {
        void fetchSummary();
    }, [fetchSummary]);

    useEffect(() => {
        void fetchEntries(filters);
    }, [fetchEntries, filters]);

    const handleFilterChange = <K extends keyof Omit<FilterState, "page">>(
        key: K,
        value: FilterState[K],
    ): void => {
        setFilters((prev) => ({ ...prev, [key]: value, page: 1 }));
    };

    const handlePageChange = (page: number): void => {
        setFilters((prev) => ({ ...prev, page }));
    };

    return (
        <div className="space-y-6 md:space-y-8">
            {/* Header */}
            <div>
                <h2 className="text-2xl md:text-3xl font-semibold text-foreground">User Feedback</h2>
                <p className="text-muted-foreground mt-1 text-sm">
                    Track how users react to documentation pages.
                </p>
            </div>

            {/* Summary Cards */}
            {loadingSummary ? (
                <div className="flex items-center justify-center h-24">
                    <Loader2 className="h-6 w-6 animate-spin text-brand" aria-label="Loading summary" />
                </div>
            ) : summaryError ? (
                <div className="flex flex-col items-center justify-center h-24 gap-3">
                    <AlertCircle className="h-6 w-6 text-destructive" aria-hidden="true" />
                    <p className="text-sm text-muted-foreground">{summaryError}</p>
                    <button
                        onClick={() => void fetchSummary()}
                        className="flex items-center gap-1.5 text-xs text-brand hover:underline"
                    >
                        <RefreshCw className="h-3 w-3" aria-hidden="true" />
                        Retry
                    </button>
                </div>
            ) : summary ? (
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <SummaryCard label="Total Feedback" value={summary.totalFeedback} icon={MessageSquare} />
                    <SummaryCard label="Helpful" value={summary.helpful} icon={ThumbsUp} accent="green" />
                    <SummaryCard label="Not Helpful" value={summary.notHelpful} icon={ThumbsDown} accent="red" />
                    <SummaryCard label="Helpful Rate" value={`${summary.helpfulPercent}%`} icon={TrendingUp} accent="brand" />
                </div>
            ) : null}

            {/* Top Pages */}
            {summary && summary.topPages.length > 0 && (
                <div className="bg-card border border-border rounded-lg p-5">
                    <h3 className="text-sm font-semibold text-foreground mb-3">Top Pages by Feedback</h3>
                    <div className="space-y-2">
                        {summary.topPages.map((pg) => (
                            <div
                                key={pg.pageId}
                                className="flex items-center justify-between gap-4 py-2 border-b border-border last:border-0"
                            >
                                <span className="text-xs text-muted-foreground truncate max-w-[60%]" title={pg.pageId}>
                                    {pg.pageId}
                                </span>
                                <div className="flex items-center gap-3 shrink-0 text-xs text-muted-foreground">
                                    <span className="inline-flex items-center gap-1 text-green-600 dark:text-green-400">
                                        <ThumbsUp className="h-3 w-3" aria-hidden="true" />
                                        {pg.helpful}
                                    </span>
                                    <span className="inline-flex items-center gap-1 text-destructive">
                                        <ThumbsDown className="h-3 w-3" aria-hidden="true" />
                                        {pg.notHelpful}
                                    </span>
                                    <span className="font-medium text-foreground">{pg.helpfulPercent}%</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
                <input
                    type="text"
                    value={filters.pageId}
                    onChange={(e) => handleFilterChange("pageId", e.target.value)}
                    placeholder="Filter by page ID…"
                    aria-label="Filter by page ID"
                    className="flex-1 px-3 py-2 text-sm bg-card border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-brand/40 text-foreground placeholder:text-muted-foreground"
                />
                <select
                    value={filters.reaction}
                    onChange={(e) => handleFilterChange("reaction", e.target.value as FeedbackReaction | "")}
                    aria-label="Filter by reaction"
                    className="px-3 py-2 text-sm bg-card border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-brand/40 text-foreground"
                >
                    <option value="">All reactions</option>
                    <option value="helpful">Helpful</option>
                    <option value="not_helpful">Not helpful</option>
                </select>
            </div>

            {/* Entries Table */}
            <div className="bg-card border border-border rounded-lg overflow-hidden">
                {loadingEntries ? (
                    <div className="flex items-center justify-center h-48">
                        <Loader2 className="h-6 w-6 animate-spin text-brand" aria-label="Loading entries" />
                    </div>
                ) : entriesError ? (
                    <div className="flex flex-col items-center justify-center h-48 gap-3 px-4 text-center">
                        <AlertCircle className="h-8 w-8 text-destructive" aria-hidden="true" />
                        <p className="text-sm text-muted-foreground">{entriesError}</p>
                        <button
                            onClick={() => void fetchEntries(filters)}
                            className="flex items-center gap-1.5 text-xs text-brand hover:underline"
                        >
                            <RefreshCw className="h-3 w-3" aria-hidden="true" />
                            Retry
                        </button>
                    </div>
                ) : entries.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-48 text-center px-4">
                        <AlertCircle className="h-8 w-8 text-muted-foreground mb-2" aria-hidden="true" />
                        <p className="text-sm text-muted-foreground">No feedback entries found.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <caption className="sr-only">Feedback entries</caption>
                            <thead>
                                <tr className="border-b border-border bg-muted/40">
                                    <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground" scope="col">Page</th>
                                    <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground" scope="col">Reaction</th>
                                    <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground hidden md:table-cell" scope="col">Comment</th>
                                    <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground hidden sm:table-cell" scope="col">When</th>
                                </tr>
                            </thead>
                            <tbody>
                                {entries.map((entry) => (
                                    <tr
                                        key={entry._id}
                                        className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
                                    >
                                        <td className="px-4 py-3 max-w-[200px]">
                                            <span className="block truncate text-xs text-foreground" title={entry.pageId}>
                                                {entry.pageId}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <ReactionBadge reaction={entry.reaction} />
                                        </td>
                                        <td className="px-4 py-3 hidden md:table-cell">
                                            {entry.comment ? (
                                                <span className="text-xs text-muted-foreground line-clamp-2 max-w-xs" title={entry.comment}>
                                                    {entry.comment}
                                                </span>
                                            ) : (
                                                <span className="text-xs text-muted-foreground/40 italic" aria-label="No comment">—</span>
                                            )}
                                        </td>
                                        <td className="px-4 py-3 hidden sm:table-cell text-xs text-muted-foreground whitespace-nowrap">
                                            {entry.createdAt && !isNaN(new Date(entry.createdAt).getTime())
                                                ? formatDistanceToNow(new Date(entry.createdAt), { addSuffix: true })
                                                : '—'}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                        Page {filters.page} of {totalPages}
                    </span>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => handlePageChange(filters.page - 1)}
                            disabled={filters.page <= 1 || loadingEntries}
                            className="p-1.5 rounded-md border border-border hover:bg-accent disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                            aria-label="Previous page"
                        >
                            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                        </button>
                        <button
                            onClick={() => handlePageChange(filters.page + 1)}
                            disabled={filters.page >= totalPages || loadingEntries}
                            className="p-1.5 rounded-md border border-border hover:bg-accent disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                            aria-label="Next page"
                        >
                            <ChevronRight className="h-4 w-4" aria-hidden="true" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FeedbackPage;
