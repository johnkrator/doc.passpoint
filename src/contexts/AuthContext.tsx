import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { authService, type User, type LoginCredentials } from '@/services/authService';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (credentials: LoginCredentials) => Promise<void>;
    logout: () => Promise<void>;
    isAuthenticated: boolean;
    hasRole: (role: 'admin' | 'editor' | 'viewer') => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initAuth = async () => {
            const restoredUser = await authService.restoreSession();
            setUser(restoredUser);
            setLoading(false);
        };

        initAuth();
    }, []);

    const login = async (credentials: LoginCredentials) => {
        const response = await authService.login(credentials);
        setUser(response.user);
    };

    const logout = async () => {
        await authService.logout();
        setUser(null);
    };

    const hasRole = (role: 'admin' | 'editor' | 'viewer'): boolean => {
        return authService.hasRole(role);
    };

    const value = {
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user,
        hasRole,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
