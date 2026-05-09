import {createContext} from "react";
import type {LucideIcon} from "lucide-react";

export type SearchItemType = "documentation" | "guide" | "api-reference" | "page";

export interface SearchItem {
    title: string;
    content: string;
    url: string;
    section?: string;
    keywords?: string[];
    icon?: LucideIcon;
    aliases?: string[]; // Alternative names/spellings
    category?: string; // For grouping results
    tags?: string[]; // Exact technical values: header values, status codes, endpoint paths
    type?: SearchItemType; // For category filter tabs
}

export interface SearchContextType {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    searchResults: SearchItem[];
    isSearching: boolean;
    showSuggestions: boolean;
    setShowSuggestions: (show: boolean) => void;
    isModalOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
}

export const SearchContext = createContext<SearchContextType | undefined>(undefined);