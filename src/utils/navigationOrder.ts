import { NAV_SECTIONS } from "@/constants/navigation";
import type { NavRoute, NavSection } from "@/constants/navigation";

interface NavigationPage {
    title: string;
    href: string;
}

// Flatten the nav tree into a sequential list of leaf pages only.
// Parent/group nodes (items with children) are category headers  not content pages.
const flattenNavigation = (sections: NavSection[]): NavigationPage[] => {
    const pages: NavigationPage[] = [];

    const processItems = (items: NavRoute[]): void => {
        items.forEach(item => {
            if (item.children && item.children.length > 0) {
                processItems(item.children);
            } else {
                pages.push({ title: item.label, href: item.href });
            }
        });
    };

    sections.forEach(section => {
        processItems(section.items);
    });

    return pages;
};

const getOrderedPages = (): NavigationPage[] => flattenNavigation(NAV_SECTIONS);

export const getNavigationInfo = (currentHref: string): { previousPage?: NavigationPage; nextPage?: NavigationPage } => {
    const pages = getOrderedPages();
    const currentIndex = pages.findIndex(page => page.href === currentHref);

    if (currentIndex === -1) return {};

    return {
        previousPage: currentIndex > 0 ? pages[currentIndex - 1] : undefined,
        nextPage: currentIndex < pages.length - 1 ? pages[currentIndex + 1] : undefined,
    };
};

export { getOrderedPages };
