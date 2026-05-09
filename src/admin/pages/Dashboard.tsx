import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    FolderTree,
    FileText,
    Code,
    Users,
    TrendingUp,
    Activity,
    Loader2,
    AlertCircle,
} from 'lucide-react';
import { adminDashboardService, type DashboardStats, type AuditLog } from '@/services/adminService';
import { formatDistanceToNow } from 'date-fns';

interface StatsCardProps {
    title: string;
    value: string | number;
    icon: React.ComponentType<{ className?: string }>;
    trend?: string;
}

const StatsCard = ({ title, value, icon: Icon, trend }: StatsCardProps) => (
    <div className='bg-card border border-border rounded-2xl p-6 hover:shadow-md transition-shadow'>
        <div className='flex items-start justify-between gap-4'>
            <div className='flex-1 min-w-0'>
                <p className='text-xs font-medium text-muted-foreground uppercase tracking-wider'>{title}</p>
                <p className='text-3xl font-bold text-foreground mt-2 tabular-nums'>{value}</p>
                {trend && (
                    <p className='text-xs text-brand mt-2 flex items-center gap-1'>
                        <TrendingUp className='h-3 w-3' />
                        {trend}
                    </p>
                )}
            </div>
            <div className='w-11 h-11 bg-brand-50 dark:bg-brand-950/40 rounded-full flex items-center justify-center shrink-0'>
                <Icon className='h-5 w-5 text-brand' />
            </div>
        </div>
    </div>
);

const Dashboard = () => {
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [recentActivity, setRecentActivity] = useState<AuditLog[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            setError(null);

            const [statsData, activityData] = await Promise.all([
                adminDashboardService.getStats(),
                adminDashboardService.getRecentActivity(10),
            ]);

            setStats(statsData);
            setRecentActivity(activityData);
        } catch (err: unknown) {
            const message = axios.isAxiosError(err)
                ? err.response?.data?.message ?? 'Failed to load dashboard data'
                : 'Failed to load dashboard data';
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="h-7 w-7 animate-spin text-brand" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-64 space-y-4">
                <div className="w-14 h-14 rounded-full bg-destructive/10 flex items-center justify-center">
                    <AlertCircle className="h-7 w-7 text-destructive" />
                </div>
                <div className="text-center">
                    <p className="text-base font-semibold text-foreground">Error loading dashboard</p>
                    <p className="text-sm text-muted-foreground mt-1">{error}</p>
                    <button
                        onClick={fetchDashboardData}
                        className="mt-4 px-4 py-2 bg-brand text-white rounded-xl text-sm font-medium hover:bg-brand/90 transition-colors"
                    >
                        Try again
                    </button>
                </div>
            </div>
        );
    }

    const statsCards = stats ? [
        {
            title: 'Total Sections',
            value: stats.totalSections,
            icon: FolderTree,
            trend: stats.sectionsThisMonth > 0 ? `+${stats.sectionsThisMonth} this month` : undefined
        },
        {
            title: 'Total Pages',
            value: stats.totalPages,
            icon: FileText,
            trend: stats.pagesThisMonth > 0 ? `+${stats.pagesThisMonth} this month` : undefined
        },
        {
            title: 'API Endpoints',
            value: stats.totalEndpoints,
            icon: Code,
            trend: stats.endpointsThisMonth > 0 ? `+${stats.endpointsThisMonth} this month` : undefined
        },
        {
            title: 'Active Users',
            value: stats.activeUsers,
            icon: Users
        },
    ] : [];

    return (
        <div className='space-y-8'>
            <div>
                <h2 className='text-2xl font-bold text-foreground'>Dashboard</h2>
                <p className='text-muted-foreground mt-1 text-sm'>
                    Overview of your documentation platform
                </p>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
                {statsCards.map((stat, index) => (
                    <StatsCard key={index} {...stat} />
                ))}
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                {/* Recent Activity */}
                <div className='bg-card border border-border rounded-2xl p-6'>
                    <div className='flex items-center justify-between mb-5'>
                        <h3 className='text-sm font-semibold text-foreground uppercase tracking-wider'>Recent activity</h3>
                        <Activity className='h-4 w-4 text-muted-foreground' />
                    </div>
                    <div className='space-y-3'>
                        {recentActivity.length > 0 ? (
                            recentActivity.map((activity) => (
                                <div key={activity._id} className='flex items-start gap-3 py-2 border-b border-border last:border-0'>
                                    <div className='w-1.5 h-1.5 bg-brand rounded-full mt-2 shrink-0' />
                                    <div className='flex-1 min-w-0'>
                                        <p className='text-sm text-foreground break-words leading-snug'>
                                            <span className='font-medium'>{activity.entityType}</span>{' '}
                                            {activity.operationType.toLowerCase()}:{' '}
                                            <span className='text-muted-foreground'>"{activity.entityName}"</span>
                                        </p>
                                        <p className='text-xs text-muted-foreground mt-0.5'>
                                            {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                                        </p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className='text-sm text-muted-foreground text-center py-6'>
                                No recent activity
                            </p>
                        )}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className='bg-card border border-border rounded-2xl p-6'>
                    <h3 className='text-sm font-semibold text-foreground uppercase tracking-wider mb-5'>Quick actions</h3>
                    <div className='space-y-2'>
                        {[
                            { label: 'Add new section', desc: 'Create a new documentation section' },
                            { label: 'Add new page', desc: 'Create a new documentation page' },
                            { label: 'Add API endpoint', desc: 'Document a new API endpoint' },
                        ].map(({ label, desc }) => (
                            <button
                                key={label}
                                className='w-full text-left px-4 py-3.5 bg-muted/40 dark:bg-background/40 hover:bg-muted/70 dark:hover:bg-background/60 border border-border rounded-xl transition-colors'
                            >
                                <p className='text-sm font-medium text-foreground'>{label}</p>
                                <p className='text-xs text-muted-foreground mt-0.5'>{desc}</p>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
