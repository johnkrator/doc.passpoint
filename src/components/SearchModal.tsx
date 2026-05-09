import React, { useRef, useEffect, useState, useCallback } from "react";
import { Search, X, FileText, BookOpen, Code2, File, ArrowRight } from "lucide-react";
import { useSearch } from "@/hooks/useSearch";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import type { SearchItemType } from "@/contexts/SearchContextTypes";

type FilterTab = "all" | SearchItemType;

interface TabConfig {
    id: FilterTab;
    label: string;
    icon: React.ElementType;
}

const TABS: TabConfig[] = [
    { id: "all", label: "All", icon: Search },
    { id: "documentation", label: "Documentation", icon: BookOpen },
    { id: "guide", label: "Guides", icon: FileText },
    { id: "api-reference", label: "API References", icon: Code2 },
    { id: "page", label: "Pages", icon: File },
];

const TYPE_LABEL_MAP: Record<SearchItemType, string> = {
    documentation: "Documentation",
    guide: "Guide",
    "api-reference": "API Reference",
    page: "Page",
};

const SearchModal: React.FC = () => {
    const {
        searchTerm,
        setSearchTerm,
        searchResults,
        isSearching,
        isModalOpen,
        closeModal,
    } = useSearch();

    const navigate = useNavigate();
    const inputRef = useRef<HTMLInputElement>(null);
    const resultsRef = useRef<HTMLDivElement>(null);
    const [selectedIndex, setSelectedIndex] = useState<number>(-1);
    const [activeTab, setActiveTab] = useState<FilterTab>("all");

    // Focus input when modal opens
    useEffect(() => {
        if (isModalOpen) {
            setActiveTab("all");
            setSelectedIndex(-1);
            setTimeout(() => inputRef.current?.focus(), 50);
        }
    }, [isModalOpen]);

    // Reset selection when results change
    useEffect(() => {
        setSelectedIndex(-1);
    }, [searchResults, activeTab]);

    // Keyboard shortcut: Cmd/Ctrl+K to open
    useEffect(() => {
        const handleGlobalKey = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault();
                if (!isModalOpen) {
                    // openModal is called from SearchInput trigger
                    // This effect is just a no-op here since modal is managed by context
                }
            }
        };
        document.addEventListener("keydown", handleGlobalKey);
        return () => document.removeEventListener("keydown", handleGlobalKey);
    }, [isModalOpen]);

    const filteredResults = activeTab === "all"
        ? searchResults
        : searchResults.filter(r => r.type === activeTab);

    const handleResultClick = useCallback((url: string) => {
        closeModal();
        if (url.startsWith("http")) {
            window.open(url, "_blank", "noopener noreferrer");
        } else {
            navigate(url);
        }
    }, [navigate, closeModal]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        const maxIndex = Math.min(filteredResults.length - 1, 9);

        switch (e.key) {
            case "ArrowDown":
                e.preventDefault();
                setSelectedIndex(prev => prev < maxIndex ? prev + 1 : prev);
                break;
            case "ArrowUp":
                e.preventDefault();
                setSelectedIndex(prev => prev > 0 ? prev - 1 : 0);
                break;
            case "Enter":
                e.preventDefault();
                if (selectedIndex >= 0 && filteredResults[selectedIndex]) {
                    handleResultClick(filteredResults[selectedIndex].url);
                } else if (filteredResults.length > 0) {
                    handleResultClick(filteredResults[0].url);
                }
                break;
            case "Escape":
                e.preventDefault();
                closeModal();
                break;
        }
    };

    // Scroll selected item into view
    useEffect(() => {
        if (selectedIndex >= 0 && resultsRef.current) {
            const el = resultsRef.current.querySelector(`[data-index="${selectedIndex}"]`);
            el?.scrollIntoView({ block: "nearest" });
        }
    }, [selectedIndex]);

    // Highlight matching text
    const highlightMatch = (text: string, query: string): React.ReactNode => {
        if (!query.trim()) return text;
        const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const splitRegex = new RegExp(`(${escaped})`, "gi");
        const testRegex = new RegExp(`^${escaped}$`, "i");
        const parts = text.split(splitRegex);
        return parts.map((part, i) =>
            testRegex.test(part)
                ? <mark key={i} className="bg-brand-100 dark:bg-brand-900/40 text-brand-700 dark:text-brand-300 rounded-sm px-0.5 not-italic font-medium">{part}</mark>
                : part
        );
    };

    if (!isModalOpen) return null;

    const tabCounts: Record<FilterTab, number> = {
        all: searchResults.length,
        documentation: searchResults.filter(r => r.type === "documentation").length,
        guide: searchResults.filter(r => r.type === "guide").length,
        "api-reference": searchResults.filter(r => r.type === "api-reference").length,
        page: searchResults.filter(r => r.type === "page").length,
    };

    return (
        <div
            className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] px-4"
            aria-modal="true"
            role="dialog"
            aria-label="Search documentation"
        >
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm"
                onClick={closeModal}
                aria-hidden="true"
            />

            {/* Modal panel */}
            <div className="relative w-full max-w-2xl bg-white dark:bg-surface-dim rounded-2xl shadow-2xl border border-border dark:border-white/10 overflow-hidden flex flex-col max-h-[75vh]">

                {/* Search input row */}
                <div className="flex items-center gap-3 px-5 py-4 border-b border-border dark:border-white/10">
                    <Search className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    <input
                        ref={inputRef}
                        type="text"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Search documentation..."
                        className="flex-1 bg-transparent text-foreground dark:text-foreground placeholder:text-muted-foreground outline-none"
                        style={{ fontSize: "16px" }}
                        aria-label="Search"
                        aria-autocomplete="list"
                        autoComplete="off"
                        spellCheck={false}
                    />
                    {searchTerm && (
                        <button
                            onClick={() => setSearchTerm("")}
                            className="flex-shrink-0 text-muted-foreground hover:text-foreground transition-colors"
                            aria-label="Clear"
                            type="button"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    )}
                    <button
                        onClick={closeModal}
                        className="flex-shrink-0 text-xs text-muted-foreground border border-border dark:border-white/15 rounded px-2 py-1 hover:text-foreground hover:border-foreground/30 transition-colors"
                        aria-label="Close search"
                        type="button"
                    >
                        Esc
                    </button>
                </div>

                {/* Category filter tabs — only shown when there are results */}
                {searchTerm.trim() && searchResults.length > 0 && (
                    <div className="flex items-center gap-1 px-4 py-2 border-b border-border dark:border-white/10 overflow-x-auto scrollbar-hide">
                        {TABS.map(tab => {
                            const count = tabCounts[tab.id];
                            const isActive = activeTab === tab.id;
                            const TabIcon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => { setActiveTab(tab.id); setSelectedIndex(-1); }}
                                    className={cn(
                                        "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all",
                                        isActive
                                            ? "bg-brand-500 text-white"
                                            : "text-muted-foreground hover:text-foreground hover:bg-muted dark:hover:bg-white/5"
                                    )}
                                    type="button"
                                >
                                    <TabIcon className="h-3 w-3" />
                                    {tab.label}
                                    {count > 0 && (
                                        <span className={cn(
                                            "rounded-full px-1.5 py-0.5 text-[10px] font-semibold",
                                            isActive
                                                ? "bg-white/20 text-white"
                                                : "bg-muted dark:bg-white/10 text-muted-foreground"
                                        )}>
                                            {count}
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                )}

                {/* Results */}
                <div ref={resultsRef} className="flex-1 overflow-y-auto">
                    {isSearching ? (
                        <div className="flex items-center justify-center py-12">
                            <div className="h-5 w-5 rounded-full border-2 border-brand-500 border-t-transparent animate-spin" />
                        </div>
                    ) : searchTerm.trim() === "" ? (
                        <div className="px-5 py-8 text-center">
                            <Search className="h-10 w-10 text-muted-foreground/30 mx-auto mb-3" />
                            <p className="text-sm text-muted-foreground">Start typing to search the docs</p>
                            <p className="text-xs text-muted-foreground/60 mt-1">
                                Try: authentication, payout, x-channel-id, virtual card
                            </p>
                        </div>
                    ) : filteredResults.length === 0 ? (
                        <div className="px-5 py-8 text-center">
                            <p className="text-sm text-muted-foreground">No results for <span className="font-medium text-foreground">"{searchTerm}"</span></p>
                            <p className="text-xs text-muted-foreground/60 mt-1">
                                Try a different search term or browse the sidebar
                            </p>
                        </div>
                    ) : (
                        <ul role="listbox" className="py-2">
                            {filteredResults.slice(0, 10).map((result, index) => {
                                const Icon = result.icon || FileText;
                                const isSelected = index === selectedIndex;
                                const typeLabel = result.type ? TYPE_LABEL_MAP[result.type] : null;

                                return (
                                    <li key={`${result.url}-${index}`} role="option" aria-selected={isSelected}>
                                        <button
                                            data-index={index}
                                            onClick={() => handleResultClick(result.url)}
                                            onMouseEnter={() => setSelectedIndex(index)}
                                            className={cn(
                                                "w-full text-left px-5 py-3.5 flex items-start gap-4 transition-colors group",
                                                isSelected
                                                    ? "bg-muted dark:bg-white/5"
                                                    : "hover:bg-muted dark:hover:bg-white/5"
                                            )}
                                            type="button"
                                        >
                                            {/* Icon */}
                                            <div className={cn(
                                                "flex-shrink-0 mt-0.5 h-8 w-8 rounded-lg flex items-center justify-center transition-colors",
                                                isSelected
                                                    ? "bg-brand-500/15 text-brand-500"
                                                    : "bg-muted dark:bg-white/5 text-muted-foreground group-hover:bg-brand-500/10 group-hover:text-brand-500"
                                            )}>
                                                <Icon className="h-4 w-4" />
                                            </div>

                                            {/* Text content */}
                                            <div className="min-w-0 flex-1">
                                                <div className="flex items-center gap-2 mb-0.5">
                                                    <span className={cn(
                                                        "text-sm font-semibold truncate transition-colors",
                                                        isSelected
                                                            ? "text-brand-600 dark:text-brand-400"
                                                            : "text-foreground group-hover:text-brand-600 dark:group-hover:text-brand-400"
                                                    )}>
                                                        {highlightMatch(result.title, searchTerm)}
                                                    </span>
                                                    {typeLabel && (
                                                        <span className="flex-shrink-0 text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-muted dark:bg-white/8 text-muted-foreground border border-border dark:border-white/10">
                                                            {typeLabel}
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                                                    {highlightMatch(result.content, searchTerm)}
                                                </p>
                                                {result.section && (
                                                    <p className="text-[10px] text-brand-500 dark:text-brand-400 font-medium mt-1 uppercase tracking-wide">
                                                        {result.section}
                                                    </p>
                                                )}
                                            </div>

                                            {/* Arrow */}
                                            <ArrowRight className={cn(
                                                "flex-shrink-0 h-4 w-4 mt-1 transition-all",
                                                isSelected
                                                    ? "text-brand-500 translate-x-0 opacity-100"
                                                    : "text-muted-foreground -translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                                            )} />
                                        </button>
                                    </li>
                                );
                            })}
                            {filteredResults.length > 10 && (
                                <li className="px-5 py-2 text-xs text-muted-foreground border-t border-border dark:border-white/10">
                                    Showing 10 of {filteredResults.length} results — refine your search to narrow results
                                </li>
                            )}
                        </ul>
                    )}
                </div>

                {/* Footer hint */}
                <div className="px-5 py-2.5 border-t border-border dark:border-white/10 flex items-center gap-4 text-[11px] text-muted-foreground/60">
                    <span className="flex items-center gap-1"><kbd className="font-sans bg-muted dark:bg-white/8 border border-border dark:border-white/10 rounded px-1.5 py-0.5 text-[10px]">↑↓</kbd> navigate</span>
                    <span className="flex items-center gap-1"><kbd className="font-sans bg-muted dark:bg-white/8 border border-border dark:border-white/10 rounded px-1.5 py-0.5 text-[10px]">↵</kbd> open</span>
                    <span className="flex items-center gap-1"><kbd className="font-sans bg-muted dark:bg-white/8 border border-border dark:border-white/10 rounded px-1.5 py-0.5 text-[10px]">Esc</kbd> close</span>
                </div>
            </div>
        </div>
    );
};

export default SearchModal;
