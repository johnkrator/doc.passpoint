import React, {useState, useEffect, useRef} from "react";
import {useLocation} from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import ScrollProgress from "./ScrollProgress";
import LikeFeature from "./LikeFeature.tsx";
import PaginationNavigation from "./PaginationNavigation.tsx";
import SearchModal from "./SearchModal";
import {SearchProvider} from "@/contexts/SearchContext";

interface DocumentationLayoutProps {
    children: React.ReactNode;
}

const DocumentationLayout = ({children}: DocumentationLayoutProps) => {
    const mainRef = useRef<HTMLElement>(null);

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();

    // Close sidebar when resizing down to mobile
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1024) setSidebarOpen(false);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleMenuClick = () => {
        setSidebarOpen(!sidebarOpen); // Toggle instead of just opening
    };

    const handleSidebarClose = () => {
        setSidebarOpen(false);
    };

    // Generate pageId from pathname for LikeFeature
    const generatePageId = () => {
        return location.pathname.replace(/^\//, "").replace(/\//g, "-") || "home";
    };

    useEffect(() => {
        mainRef.current?.scrollTo({ top: 0 });
        setSidebarOpen(false);
    }, [location.pathname]);

    // Parallax: lerp cursor position into CSS custom properties for smooth trailing
    useEffect(() => {
        let rafId: number;
        let targetX = 0, targetY = 0;
        let currentX = 0, currentY = 0;

        const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

        const tick = () => {
            currentX = lerp(currentX, targetX, 0.05);
            currentY = lerp(currentY, targetY, 0.05);
            document.documentElement.style.setProperty('--geo-mx', currentX.toFixed(4));
            document.documentElement.style.setProperty('--geo-my', currentY.toFixed(4));
            rafId = requestAnimationFrame(tick);
        };

        const onMouseMove = (e: MouseEvent) => {
            targetX = e.clientX / window.innerWidth - 0.5;
            targetY = e.clientY / window.innerHeight - 0.5;
        };

        window.addEventListener('mousemove', onMouseMove, { passive: true });
        rafId = requestAnimationFrame(tick);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            cancelAnimationFrame(rafId);
        };
    }, []);

    // Home page has its own footer and pagination inside DocumentationContent
    const isHomePage = location.pathname === "/";
    const shouldShowGlobalComponents = !isHomePage;

    const pageId = generatePageId();

    return (
        <SearchProvider>
            <div className="h-screen flex flex-col bg-white dark:bg-background overflow-hidden">
                {/* Global Search Modal */}
                <SearchModal/>

                {/* Scroll Progress Bar */}
                <ScrollProgress containerRef={mainRef}/>

                {/* Header */}
                <Header onMenuClick={handleMenuClick}/>

                {/* Main layout  fills remaining height, each column scrolls independently */}
                <div className="flex flex-1 min-h-0">
                    <div
                        className={`transition-all duration-300 ease-out overflow-hidden ${isHomePage ? 'w-0 opacity-0 pointer-events-none' : 'opacity-100'}`}
                    >
                        <Sidebar isOpen={sidebarOpen} onClose={handleSidebarClose}/>
                    </div>

                    {/* Main content  its own scroll context */}
                    <main
                        ref={mainRef}
                        className="flex-1 min-w-0 min-h-0 overflow-y-auto"
                    >
                        <div className="home-grid relative w-full overflow-x-hidden">
                            <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
                                {/* 3 levels: [position] → [parallax] → [animation + visuals] */}
                                <div className="absolute -top-14 -right-14 w-48 h-48">
                                    <div className="geo-px-1 w-full h-full">
                                        <div className="geo-anim-1 w-full h-full rounded-2xl border-2 border-[#100318]/6 dark:border-white/4 rotate-14" />
                                    </div>
                                </div>
                                <div className="absolute top-6 right-8 w-24 h-24">
                                    <div className="geo-px-2 w-full h-full">
                                        <div className="geo-anim-2 w-full h-full rounded-xl border border-[#100318]/4 dark:border-white/3 rotate-14" />
                                    </div>
                                </div>
                                <div className="absolute -top-6 -left-6 w-36 h-36">
                                    <div className="geo-px-3 w-full h-full">
                                        <div className="geo-anim-3 w-full h-full rounded-2xl border border-[#100318]/5 dark:border-white/4 -rotate-18 bg-[#100318]/[.012] dark:bg-white/[.008]" />
                                    </div>
                                </div>
                                <div className="absolute top-1/3 -left-10 w-20 h-20">
                                    <div className="geo-px-4 w-full h-full">
                                        <div className="geo-anim-4 w-full h-full rounded-xl border-2 border-[#100318]/4 dark:border-white/3 rotate-32" />
                                    </div>
                                </div>
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80">
                                    <div className="geo-px-5 w-full h-full">
                                        <div className="geo-anim-5 w-full h-full rounded-3xl border border-[#100318]/[.022] dark:border-white/[.018]" />
                                    </div>
                                </div>
                                <div className="absolute -bottom-16 -left-8 w-56 h-56">
                                    <div className="geo-px-6 w-full h-full">
                                        <div className="geo-anim-6 w-full h-full rounded-2xl border border-[#100318]/5 dark:border-white/3 rotate-22 bg-[#100318]/[.008] dark:bg-white/0.5" />
                                    </div>
                                </div>
                                <div className="absolute bottom-12 -right-6 w-40 h-40">
                                    <div className="geo-px-7 w-full h-full">
                                        <div className="geo-anim-7 w-full h-full rounded-2xl border border-[#100318]/5 dark:border-white/4 -rotate-18" />
                                    </div>
                                </div>
                                <div className="absolute bottom-12 right-20 w-14 h-14">
                                    <div className="geo-px-8 w-full h-full">
                                        <div className="geo-anim-8 w-full h-full rounded-lg border border-[#100318]/6 dark:border-white/4 rotate-10 bg-[#100318]/2 dark:bg-white/1" />
                                    </div>
                                </div>
                            </div>
                            <div className={`docs-content w-full transition-[max-width,padding] duration-300 ease-out ${isHomePage ? "max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 xl:px-24" : "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"}`}>
                                <div key={location.key} className="page-enter">
                                    {children}
                                </div>

                                {/* Global components - automatically added to all pages except home */}
                                {shouldShowGlobalComponents && (
                                    <div>
                                        {/* Like Feature */}
                                        <div className="mt-10 border-t border-border dark:border-border pt-6">
                                            <LikeFeature pageId={pageId}/>
                                        </div>

                                        {/* Pagination Navigation */}
                                        <div className="mt-2">
                                            <PaginationNavigation/>
                                        </div>

                                        {/* Footer */}
                                        <footer className="mt-14 pt-8 border-t border-border dark:border-border">
                                            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-10">
                                                <p className="text-muted-foreground text-xs">
                                                    © {new Date().getFullYear()} Passpoint Payment Service. All rights reserved.
                                                </p>
                                                <div className="flex items-center gap-4">
                                                    <a
                                                        href="https://mypasspoint.com/"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-xs text-muted-foreground hover:text-brand transition-colors"
                                                    >
                                                        Website
                                                    </a>
                                                    <a
                                                        href="http://go.mypasspoint.com/"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-xs text-muted-foreground hover:text-brand transition-colors"
                                                    >
                                                        Dashboard
                                                    </a>
                                                </div>
                                            </div>
                                        </footer>
                                    </div>
                                )}
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </SearchProvider>
    );
};

export default DocumentationLayout;
