import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
    children: React.ReactElement;
    requiredRole?: 'admin' | 'editor' | 'viewer';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
    const { isAuthenticated, hasRole, loading } = useAuth();

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

    if (!isAuthenticated) {
        // Redirect to login if not authenticated
        return <Navigate to="/admin/login" replace />;
    }

    if (requiredRole && !hasRole(requiredRole)) {
        // Redirect to dashboard if user doesn't have required role
        return <Navigate to="/admin" replace />;
    }

    return children;
};

export default ProtectedRoute;
