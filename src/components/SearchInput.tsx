import React, { useEffect } from "react";
import { Search } from "lucide-react";
import { useSearch } from "@/hooks/useSearch";
import { cn } from "@/lib/utils";

interface SearchInputProps {
    className?: string;
    placeholder?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
    className,
    placeholder = "Search docs...",
}) => {
    const { openModal } = useSearch();

    // Global Cmd/Ctrl+K shortcut
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault();
                openModal();
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [openModal]);

    return (
        <button
            type="button"
            onClick={openModal}
            className={cn(
                "flex items-center gap-2.5 w-full px-3 py-2 rounded-md",
                "bg-white dark:bg-card border border-border",
                "text-muted-foreground hover:text-foreground hover:border-brand/40 hover:shadow-sm",
                "transition-all duration-150 cursor-text group",
                className
            )}
            aria-label="Open search"
        >
            <Search className="h-4 w-4 flex-shrink-0 text-muted-foreground group-hover:text-brand-500 transition-colors" />
            <span className="flex-1 text-left text-sm truncate">{placeholder}</span>
            <kbd className="hidden sm:flex items-center gap-0.5 text-[10px] font-sans text-muted-foreground/60 bg-background dark:bg-background/20 border border-border dark:border-white/10 rounded px-1.5 py-0.5 flex-shrink-0">
                <span className="text-[11px]">⌘</span>K
            </kbd>
        </button>
    );
};

export default SearchInput;
