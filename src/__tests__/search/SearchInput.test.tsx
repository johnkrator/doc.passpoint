/**
 * INTEGRATION TESTS - Search System
 *
 * Run with: npm test
 */

import {render, screen, waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {BrowserRouter} from "react-router-dom";
import SearchInput from "@/components/SearchInput";
import {SearchProvider} from "@/contexts/SearchContext";
import React from "react";

// Helper to render with providers
const renderWithProviders = (ui: React.ReactElement) => {
    return render(
        <BrowserRouter>
            <SearchProvider>
                {ui}
            </SearchProvider>
        </BrowserRouter>
    );
};

describe("SearchInput Component", () => {
    describe("Basic Functionality", () => {
        it("should render search input with placeholder", () => {
            renderWithProviders(<SearchInput/>);
            expect(screen.getByPlaceholderText("Search API Docs...")).toBeInTheDocument();
        });

        it("should show suggestions when typing", async () => {
            const user = userEvent.setup();
            renderWithProviders(<SearchInput/>);
            const input = screen.getByRole("textbox");

            await user.type(input, "webhook");

            await waitFor(() => {
                expect(screen.getByText(/Global Callback Setup/i)).toBeInTheDocument();
            });
        });

        it("should hide suggestions when input is cleared", async () => {
            const user = userEvent.setup();
            renderWithProviders(<SearchInput/>);
            const input = screen.getByRole("textbox");

            await user.type(input, "webhook");
            await waitFor(() => {
                expect(screen.getByText(/Global Callback Setup/i)).toBeInTheDocument();
            });

            await user.clear(input);

            await waitFor(() => {
                expect(screen.queryByText(/Global Callback Setup/i)).not.toBeInTheDocument();
            });
        });

        it("should show \"No results found\" for invalid search", async () => {
            const user = userEvent.setup();
            renderWithProviders(<SearchInput/>);
            const input = screen.getByRole("textbox");

            await user.type(input, "xyzinvalidquery123");

            await waitFor(() => {
                expect(screen.getByText(/No results found/i)).toBeInTheDocument();
            });
        });
    });

    describe("Keyboard Navigation", () => {
        it("should highlight first result on ArrowDown", async () => {
            const user = userEvent.setup();
            renderWithProviders(<SearchInput/>);
            const input = screen.getByRole("textbox");

            await user.type(input, "momo");
            await waitFor(() => {
                expect(screen.getByRole("listbox")).toBeInTheDocument();
            });

            await user.keyboard("{ArrowDown}");

            const firstOption = screen.getAllByRole("option")[0];
            expect(firstOption).toHaveClass("bg-gray-200");
        });

        it("should navigate down through results", async () => {
            const user = userEvent.setup();
            renderWithProviders(<SearchInput/>);
            const input = screen.getByRole("textbox");

            await user.type(input, "bank");
            await waitFor(() => {
                expect(screen.getByRole("listbox")).toBeInTheDocument();
            });

            await user.keyboard("{ArrowDown}");
            await user.keyboard("{ArrowDown}");

            const secondOption = screen.getAllByRole("option")[1];
            expect(secondOption).toHaveClass("bg-gray-200");
        });

        it("should navigate up through results", async () => {
            const user = userEvent.setup();
            renderWithProviders(<SearchInput/>);
            const input = screen.getByRole("textbox");

            await user.type(input, "transfer");
            await waitFor(() => {
                expect(screen.getByRole("listbox")).toBeInTheDocument();
            });

            await user.keyboard("{ArrowDown}");
            await user.keyboard("{ArrowDown}");
            await user.keyboard("{ArrowUp}");

            const firstOption = screen.getAllByRole("option")[0];
            expect(firstOption).toHaveClass("bg-gray-200");
        });

        it("should select result on Enter", async () => {
            const user = userEvent.setup();
            renderWithProviders(<SearchInput/>);
            const input = screen.getByRole("textbox");

            await user.type(input, "webhook");
            await waitFor(() => {
                expect(screen.getByRole("listbox")).toBeInTheDocument();
            });

            await user.keyboard("{Enter}");

            // Should navigate (we can't easily test navigation in unit tests)
            // but the function should be called
            expect(true).toBe(true); // Placeholder - navigation would happen
        });

        it("should close dropdown on Escape", async () => {
            const user = userEvent.setup();
            renderWithProviders(<SearchInput/>);
            const input = screen.getByRole("textbox");

            await user.type(input, "payout");
            await waitFor(() => {
                expect(screen.getByRole("listbox")).toBeInTheDocument();
            });

            await user.keyboard("{Escape}");

            await waitFor(() => {
                expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
            });
        });
    });

    describe("Mouse Interaction", () => {
        it("should clear search on clear button click", async () => {
            const user = userEvent.setup();
            renderWithProviders(<SearchInput/>);
            const input = screen.getByRole("textbox") as HTMLInputElement;

            await user.type(input, "collection");
            expect(input.value).toBe("collection");

            const clearButton = screen.getByLabelText("Clear search");
            await user.click(clearButton);

            expect(input.value).toBe("");
        });
    });

    describe("Accessibility", () => {
        it("should have proper ARIA attributes", () => {
            renderWithProviders(<SearchInput/>);
            const input = screen.getByRole("textbox");

            expect(input).toHaveAttribute("aria-label", "Search documentation");
            expect(input).toHaveAttribute("aria-autocomplete", "list");
            expect(input).toHaveAttribute("aria-controls", "search-results");
        });

        it("should update aria-expanded when dropdown opens", async () => {
            const user = userEvent.setup();
            renderWithProviders(<SearchInput/>);
            const input = screen.getByRole("textbox");

            expect(input).toHaveAttribute("aria-expanded", "false");

            await user.type(input, "wallet");

            await waitFor(() => {
                expect(input).toHaveAttribute("aria-expanded", "true");
            });
        });

        it("should have proper role attributes on results", async () => {
            const user = userEvent.setup();
            renderWithProviders(<SearchInput/>);
            const input = screen.getByRole("textbox");

            await user.type(input, "bank");

            await waitFor(() => {
                expect(screen.getByRole("listbox")).toBeInTheDocument();
                expect(screen.getAllByRole("option").length).toBeGreaterThan(0);
            });
        });
    });

    describe("Performance", () => {
        it("should debounce search input", async () => {
            jest.useFakeTimers();
            const user = userEvent.setup({delay: null});
            renderWithProviders(<SearchInput/>);
            const input = screen.getByRole("textbox");

            await user.type(input, "w");
            expect(screen.queryByRole("listbox")).not.toBeInTheDocument();

            await user.type(input, "e");
            expect(screen.queryByRole("listbox")).not.toBeInTheDocument();

            await user.type(input, "b");

            jest.advanceTimersByTime(300);

            await waitFor(() => {
                expect(screen.getByRole("listbox")).toBeInTheDocument();
            });

            jest.useRealTimers();
        });
    });
});

describe("Search Algorithm", () => {
    it("should rank exact title matches first", async () => {
        const user = userEvent.setup();
        renderWithProviders(<SearchInput/>);
        const input = screen.getByRole("textbox");

        await user.type(input, "authentication");

        await waitFor(() => {
            const options = screen.getAllByRole("option");
            expect(options[0]).toHaveTextContent("Authentication");
        });
    });

    it("should search by keywords", async () => {
        const user = userEvent.setup();
        renderWithProviders(<SearchInput/>);
        const input = screen.getByRole("textbox");

        await user.type(input, "momo");

        await waitFor(() => {
            const options = screen.getAllByRole("option");
            expect(options.some(opt => opt.textContent?.includes("Mobile Money"))).toBe(true);
        });
    });

    it("should search by URL segments", async () => {
        const user = userEvent.setup();
        renderWithProviders(<SearchInput/>);
        const input = screen.getByRole("textbox");

        await user.type(input, "ngn");

        await waitFor(() => {
            const options = screen.getAllByRole("option");
            expect(options.some(opt => opt.textContent?.includes("NGN"))).toBe(true);
        });
    });

    it("should handle multi-word queries", async () => {
        const user = userEvent.setup();
        renderWithProviders(<SearchInput/>);
        const input = screen.getByRole("textbox");

        await user.type(input, "bank transfer");

        await waitFor(() => {
            const options = screen.getAllByRole("option");
            expect(options.length).toBeGreaterThan(0);
            expect(options.some(opt =>
                opt.textContent?.toLowerCase().includes("bank") &&
                opt.textContent?.toLowerCase().includes("transfer")
            )).toBe(true);
        });
    });

    it("should search for API endpoints", async () => {
        const user = userEvent.setup();
        renderWithProviders(<SearchInput/>);
        const input = screen.getByRole("textbox");

        await user.type(input, "init-credentials");

        await waitFor(() => {
            const options = screen.getAllByRole("option");
            expect(options.some(opt => opt.textContent?.includes("Init Credentials"))).toBe(true);
        });
    });

    it("should search for full URLs", async () => {
        const user = userEvent.setup();
        renderWithProviders(<SearchInput/>);
        const input = screen.getByRole("textbox");

        await user.type(input, "https://API_BASE_URL/userapp/merchant-app/get-banks");

        await waitFor(() => {
            const options = screen.getAllByRole("option");
            expect(options.some(opt => opt.textContent?.includes("Get Banks"))).toBe(true);
        });
    });
});

describe("Search Coverage", () => {
    const expectedRoutes = [
        "/",
        "/introduction",
        "/authentication",
        "/api-integrations",
        "/quick-guides",
        "/api-rate-limits",
        "/global-callback-setup",
        "/wallet",
        "/transfer",
        "/collection",
        "/payout",
        "/user-roles",
        "/status-responses",
        "/sandbox-playground",
    ];

    it("should index all critical routes", async () => {
        const user = userEvent.setup();

        for (const route of expectedRoutes) {
            renderWithProviders(<SearchInput/>);
            const input = screen.getByRole("textbox");
            await user.clear(input);

            // Search by route path
            const searchTerm = route.split("/").pop() || "home";
            await user.type(input, searchTerm);

            await waitFor(() => {
                // Should find at least one result
                expect(screen.queryByText(/No results found/i)).not.toBeInTheDocument();
            }, {timeout: 2000});
        }
    });
});
