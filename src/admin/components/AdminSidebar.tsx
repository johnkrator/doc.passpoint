import React, { useState } from 'react';
import {
    LayoutDashboard,
    FolderTree,
    FileText,
    Code,
    Users,
    Settings,
    MessageSquare,
    LogOut,
    Menu,
    User,
    Shield,
    Eye,
    Edit,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo from "@/assets/new-logo.png";
import { useAuth } from '@/contexts/AuthContext';
import { LG_BREAKPOINT } from '@/constants';

type AdminRole = 'admin' | 'editor' | 'viewer';

interface AdminSidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

interface NavItem {
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    href: string;
}

const getRoleIcon = (role?: AdminRole): React.ReactElement => {
    switch (role) {
        case 'admin':
            return <Shield className='h-4 w-4 text-brand' aria-hidden="true" />;
        case 'editor':
            return <Edit className='h-4 w-4 text-brand' aria-hidden="true" />;
        case 'viewer':
            return <Eye className='h-4 w-4 text-brand' aria-hidden="true" />;
        default:
            return <User className='h-4 w-4 text-brand' aria-hidden="true" />;
    }
};

const getRoleBadgeColor = (role?: AdminRole): string => {
    switch (role) {
        case 'admin':
            return 'bg-brand/20 text-brand border-brand/30';
        case 'editor':
            return 'bg-brand/10 text-brand/80 dark:text-brand/70 border-brand/30';
        case 'viewer':
            return 'bg-muted/30 text-muted-foreground border-border/50';
        default:
            return 'bg-muted/30 text-muted-foreground border-border/50';
    }
};

const AdminSidebar = ({ isOpen, onClose }: AdminSidebarProps): React.ReactElement => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const navItems: NavItem[] = [
        { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
        { icon: FolderTree, label: 'Sections', href: '/admin/sections' },
        { icon: FileText, label: 'Pages', href: '/admin/pages' },
        { icon: Code, label: 'API Endpoints', href: '/admin/endpoints' },
        { icon: Users, label: 'Users', href: '/admin/users' },
        { icon: MessageSquare, label: 'Feedback', href: '/admin/feedback' },
        { icon: Settings, label: 'Settings', href: '/admin/settings' },
    ];

    const isActive = (href: string): boolean => {
        if (href === '/admin') {
            return location.pathname === href;
        }
        return location.pathname.startsWith(href);
    };

    const handleLogout = async (): Promise<void> => {
        setIsLoggingOut(true);
        try {
            await logout();
            navigate('/admin/login');
        } catch {
            // logout errors are non-critical; user is still navigated to login
        } finally {
            setIsLoggingOut(false);
        }
    };

    // Narrowed role — falls back to undefined for unknown/missing values
    const userRole = (user?.role as AdminRole | undefined);

    return (
        <>
            {isOpen && (
                <div
                    className='fixed inset-0 bg-black/50 z-40 lg:hidden'
                    onClick={onClose}
                    aria-hidden="true"
                />
            )}

            <aside
                className={cn(
                    'fixed top-0 left-0 h-full w-64 bg-card border-r border-border z-50 transform transition-transform duration-300 ease-in-out lg:translate-x-0 flex flex-col',
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                )}
                aria-label="Admin navigation"
            >
                {/* Header */}
                <div className='h-16 border-b border-border flex items-center justify-between px-6 shrink-0'>
                    <Link to='/admin' className='flex items-center gap-2'>
                        <img src={Logo} className="h-16 w-auto object-contain" alt="Passpoint Logo" />
                    </Link>
                    <Button
                        variant='ghost'
                        size='icon'
                        className='lg:hidden'
                        onClick={onClose}
                        aria-label="Close navigation"
                    >
                        <Menu className='h-5 w-5' aria-hidden="true" />
                    </Button>
                </div>

                {/* User Profile Section */}
                {user && (
                    <div className='px-4 py-3 border-b border-border'>
                        <div className='flex items-center gap-3 p-3 rounded-xl bg-accent/50'>
                            <div className='shrink-0 w-10 h-10 rounded-full bg-brand flex items-center justify-center'>
                                <User className='h-5 w-5 text-white' aria-hidden="true" />
                            </div>
                            <div className='flex-1 min-w-0'>
                                <p className='text-sm font-medium text-foreground truncate'>
                                    {user.email}
                                </p>
                                <div className='flex items-center gap-1.5 mt-1'>
                                    {getRoleIcon(userRole)}
                                    <span className={cn(
                                        'text-xs font-medium px-2 py-0.5 rounded-full border capitalize',
                                        getRoleBadgeColor(userRole)
                                    )}>
                                        {user.role}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Navigation - Scrollable */}
                <nav className='flex-1 overflow-y-auto p-4 space-y-1' aria-label="Main navigation">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const active = isActive(item.href);

                        return (
                            <Link
                                key={item.href}
                                to={item.href}
                                onClick={() => {
                                    if (window.innerWidth < LG_BREAKPOINT) {
                                        onClose();
                                    }
                                }}
                                aria-current={active ? 'page' : undefined}
                                className={cn(
                                    'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors',
                                    active
                                        ? 'bg-brand/10 dark:bg-brand/15 text-brand font-semibold'
                                        : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                                )}
                            >
                                <Icon className='h-5 w-5 shrink-0' aria-hidden="true" />
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Footer - Fixed at bottom */}
                <div className='shrink-0 p-4 border-t border-border'>
                    <Button
                        variant='outline'
                        className='w-full justify-start gap-3 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30 dark:hover:bg-destructive/20 dark:hover:text-destructive/80 dark:hover:border-destructive/50 transition-colors'
                        onClick={() => void handleLogout()}
                        disabled={isLoggingOut}
                    >
                        {isLoggingOut ? (
                            <>
                                <div className='h-5 w-5 border-2 border-current border-t-transparent rounded-full animate-spin' aria-hidden="true" />
                                <span>Logging out…</span>
                            </>
                        ) : (
                            <>
                                <LogOut className='h-5 w-5' aria-hidden="true" />
                                <span>Logout</span>
                            </>
                        )}
                    </Button>
                </div>
            </aside>
        </>
    );
};

export default AdminSidebar;
