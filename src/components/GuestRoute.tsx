import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface GuestRouteProps {
    children: React.ReactElement;
}

const GuestRoute: React.FC<GuestRouteProps> = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        // Show loading spinner while checking auth
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="flex flex-col items-center gap-4">
                    <div className="h-12 w-12 border-4 border-brand border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-sm text-muted-foreground">Loading...</p>
                </div>
            </div>
        );
    }

    if (isAuthenticated) {
        // Redirect to admin dashboard if already authenticated
        return <Navigate to="/admin" replace />;
    }

    return children;
};

export default GuestRoute;
