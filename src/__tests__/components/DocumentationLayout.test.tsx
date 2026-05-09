import { render, screen, act } from "@testing-library/react";
import { createMemoryRouter, RouterProvider, Outlet } from "react-router-dom";
import React from "react";

vi.mock("@/components/Header", () => ({
    default: () => <div data-testid="header" />,
}));

vi.mock("@/components/Sidebar", () => ({
    default: ({ isOpen }: { isOpen: boolean }) => (
        <div data-testid="sidebar" data-open={String(isOpen)} />
    ),
}));

vi.mock("@/components/ScrollProgress", () => ({ default: () => null }));
vi.mock("@/components/SearchModal", () => ({ default: () => null }));
vi.mock("@/components/LikeFeature", () => ({ default: () => null }));
vi.mock("@/components/PaginationNavigation", () => ({ default: () => null }));
vi.mock("@/contexts/SearchContext", () => ({
    SearchProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

import DocumentationLayout from "@/components/DocumentationLayout";

const makeRouter = (initialPath = "/introduction") =>
    createMemoryRouter(
        [
            {
                path: "/",
                element: (
                    <DocumentationLayout>
                        <Outlet />
                    </DocumentationLayout>
                ),
                children: [
                    { index: true, element: <div>Home</div> },
                    { path: "introduction", element: <div>Introduction</div> },
                    { path: "api-integrations", element: <div>API Integrations</div> },
                ],
            },
        ],
        { initialEntries: [initialPath] }
    );

describe("DocumentationLayout", () => {
    beforeEach(() => {
        HTMLElement.prototype.scrollTo = vi.fn();
        Object.defineProperty(window, "innerWidth", {
            writable: true,
            configurable: true,
            value: 1280,
        });
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    describe("scroll-to-top on route change", () => {
        it("scrolls the main content container to top when the pathname changes", async () => {
            const router = makeRouter("/introduction");
            render(<RouterProvider router={router} />);

            const scrollTo = HTMLElement.prototype.scrollTo as ReturnType<typeof vi.fn>;
            scrollTo.mockClear();

            await act(async () => {
                router.navigate("/api-integrations");
            });

            expect(scrollTo).toHaveBeenCalledWith({ top: 0 });
        });

        it("scrolls to top on each successive navigation", async () => {
            const router = makeRouter("/introduction");
            render(<RouterProvider router={router} />);

            const scrollTo = HTMLElement.prototype.scrollTo as ReturnType<typeof vi.fn>;
            scrollTo.mockClear();

            await act(async () => {
                router.navigate("/api-integrations");
            });
            await act(async () => {
                router.navigate("/introduction");
            });

            expect(scrollTo).toHaveBeenCalledTimes(2);
            expect(scrollTo).toHaveBeenCalledWith({ top: 0 });
        });

        it("does not scroll when only the hash changes", async () => {
            const router = makeRouter("/introduction");
            render(<RouterProvider router={router} />);

            const scrollTo = HTMLElement.prototype.scrollTo as ReturnType<typeof vi.fn>;
            scrollTo.mockClear();

            await act(async () => {
                router.navigate({ pathname: "/introduction", hash: "#section" });
            });

            expect(scrollTo).not.toHaveBeenCalled();
        });
    });

    describe("sidebar resize behaviour", () => {
        it("is open by default on desktop", () => {
            Object.defineProperty(window, "innerWidth", { value: 1280, writable: true, configurable: true });
            const router = makeRouter("/introduction");
            render(<RouterProvider router={router} />);

            expect(screen.getByTestId("sidebar")).toHaveAttribute("data-open", "true");
        });

        it("is closed by default on mobile", () => {
            Object.defineProperty(window, "innerWidth", { value: 375, writable: true, configurable: true });
            const router = makeRouter("/introduction");
            render(<RouterProvider router={router} />);

            expect(screen.getByTestId("sidebar")).toHaveAttribute("data-open", "false");
        });

        it("closes the sidebar when resized from desktop to mobile", async () => {
            Object.defineProperty(window, "innerWidth", { value: 1280, writable: true, configurable: true });
            const router = makeRouter("/introduction");
            render(<RouterProvider router={router} />);

            expect(screen.getByTestId("sidebar")).toHaveAttribute("data-open", "true");

            await act(async () => {
                Object.defineProperty(window, "innerWidth", { value: 375, writable: true, configurable: true });
                window.dispatchEvent(new Event("resize"));
            });

            expect(screen.getByTestId("sidebar")).toHaveAttribute("data-open", "false");
        });

        it("opens the sidebar when resized from mobile to desktop", async () => {
            Object.defineProperty(window, "innerWidth", { value: 375, writable: true, configurable: true });
            const router = makeRouter("/introduction");
            render(<RouterProvider router={router} />);

            expect(screen.getByTestId("sidebar")).toHaveAttribute("data-open", "false");

            await act(async () => {
                Object.defineProperty(window, "innerWidth", { value: 1280, writable: true, configurable: true });
                window.dispatchEvent(new Event("resize"));
            });

            expect(screen.getByTestId("sidebar")).toHaveAttribute("data-open", "true");
        });

        it("does not render the sidebar on the home page", () => {
            const router = makeRouter("/");
            render(<RouterProvider router={router} />);

            expect(screen.queryByTestId("sidebar")).not.toBeInTheDocument();
        });
    });
});
