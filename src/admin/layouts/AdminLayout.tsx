import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '@/admin/components/AdminSidebar';
import { Button } from '@/components/ui/button';
import { Menu, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

const AdminLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { user } = useAuth();

    const getRoleBadgeColor = (role?: string) => {
        switch (role) {
            case 'admin':
                return 'bg-brand/20 text-brand border-brand/30';
            case 'editor':
                return 'bg-brand/20 text-brand/80 dark:text-brand/70 border-brand/30';
            case 'viewer':
                return 'bg-muted/30 text-muted-foreground dark:text-muted-foreground border-border/50';
            default:
                return 'bg-muted/30 text-muted-foreground dark:text-muted-foreground border-border/50';
        }
    };

    return (
        <div className='min-h-screen bg-background home-grid'>
            <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <div className='lg:pl-64'>
                <header className='h-16 border-b border-border bg-card sticky top-0 z-30 flex items-center px-4 lg:px-6 gap-3'>
                    <Button
                        variant='ghost'
                        size='icon'
                        className='lg:hidden shrink-0'
                        onClick={() => setSidebarOpen(true)}
                    >
                        <Menu className='h-5 w-5' />
                    </Button>
                    <div className='flex-1 flex items-center justify-between min-w-0'>
                        <p className='text-sm font-semibold text-foreground truncate'>
                            Admin portal
                        </p>

                        {/* User Profile - Desktop */}
                        {user && (
                            <div className='hidden sm:flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-accent/50'>
                                <div className='shrink-0 w-7 h-7 rounded-full bg-brand flex items-center justify-center'>
                                    <User className='h-3.5 w-3.5 text-white' />
                                </div>
                                <span className='text-sm font-medium text-foreground max-w-40 truncate'>
                                    {user.email}
                                </span>
                                <span className={cn(
                                    'text-xs font-medium px-2 py-0.5 rounded-full border capitalize',
                                    getRoleBadgeColor(user.role)
                                )}>
                                    {user.role}
                                </span>
                            </div>
                        )}
                    </div>
                </header>

                {/* Centered main content with max-width and responsive padding */}
                <main className='w-full'>
                    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8'>
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
