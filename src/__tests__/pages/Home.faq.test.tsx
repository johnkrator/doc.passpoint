import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import Home from "@/pages/getting-started/Home.tsx";

const renderHome = () =>
    render(
        <MemoryRouter>
            <Home />
        </MemoryRouter>
    );

describe("Home — FAQ accordion renderer", () => {
    describe("plain-text paragraphs", () => {
        it("renders a plain answer as <p> elements", () => {
            renderHome();

            const sandboxBtn = screen.getByRole("button", {
                name: /is there a sandbox environment for testing\?/i,
            });
            fireEvent.click(sandboxBtn);

            const paragraphs = screen
                .getByText(/passpoint provides a full sandbox environment/i)
                .closest("p");
            expect(paragraphs).toBeInTheDocument();
        });

        it("splits double-newline paragraphs into separate <p> elements", () => {
            renderHome();

            const webhookBtn = screen.getByRole("button", {
                name: /how do i receive payment notifications\?/i,
            });
            fireEvent.click(webhookBtn);

            const container = webhookBtn.nextElementSibling as HTMLElement;
            const paragraphs = container.querySelectorAll("p");
            expect(paragraphs.length).toBeGreaterThan(1);
        });
    });

    describe("bullet-list paragraphs", () => {
        it("renders bullet items as <ul><li> — not inline <p> text", () => {
            renderHome();

            const codesBtn = screen.getByRole("button", {
                name: /what do the passpoint response codes mean\?/i,
            });
            fireEvent.click(codesBtn);

            const list = screen
                .getByText(/00 — success/i)
                .closest("li");
            expect(list).toBeInTheDocument();
            expect(list?.tagName).toBe("LI");
        });

        it("renders all six response code bullets as separate <li> items", () => {
            renderHome();

            const codesBtn = screen.getByRole("button", {
                name: /what do the passpoint response codes mean\?/i,
            });
            fireEvent.click(codesBtn);

            const container = codesBtn.nextElementSibling as HTMLElement;
            const listItems = container.querySelectorAll("li");
            expect(listItems).toHaveLength(6);
        });

        it("strips the leading bullet character from each list item", () => {
            renderHome();

            const codesBtn = screen.getByRole("button", {
                name: /what do the passpoint response codes mean\?/i,
            });
            fireEvent.click(codesBtn);

            const items = screen.getAllByRole("listitem");
            items.forEach((item) => {
                expect(item.textContent).not.toMatch(/^•/);
            });
        });

        it("renders the channel-headers answer with one bullet <li>", () => {
            renderHome();

            const channelBtn = screen.getByRole("button", {
                name: /what are x-channel-id and x-channel-code/i,
            });
            fireEvent.click(channelBtn);

            const container = channelBtn.nextElementSibling as HTMLElement;
            const listItems = container.querySelectorAll("li");
            expect(listItems).toHaveLength(1);
        });

        it("renders intro and closing paragraphs as <p> alongside the bullet <ul>", () => {
            renderHome();

            const codesBtn = screen.getByRole("button", {
                name: /what do the passpoint response codes mean\?/i,
            });
            fireEvent.click(codesBtn);

            const container = codesBtn.nextElementSibling as HTMLElement;
            expect(container.querySelector("p")).toBeInTheDocument();
            expect(container.querySelector("ul")).toBeInTheDocument();
        });
    });

    describe("accordion open/close behaviour", () => {
        it("does not render answer content before the item is opened", () => {
            renderHome();

            expect(
                screen.queryByText(/00 — success/i)
            ).not.toBeInTheDocument();
        });

        it("closes the open item when clicked a second time", () => {
            renderHome();

            const codesBtn = screen.getByRole("button", {
                name: /what do the passpoint response codes mean\?/i,
            });
            fireEvent.click(codesBtn);
            expect(screen.getByText(/00 — success/i)).toBeInTheDocument();

            fireEvent.click(codesBtn);
            expect(screen.queryByText(/00 — success/i)).not.toBeInTheDocument();
        });

        it("opening one item does not open another", () => {
            renderHome();

            const codesBtn = screen.getByRole("button", {
                name: /what do the passpoint response codes mean\?/i,
            });
            fireEvent.click(codesBtn);

            expect(
                screen.queryByText(/passpoint provides a full sandbox/i)
            ).not.toBeInTheDocument();
        });
    });
});
