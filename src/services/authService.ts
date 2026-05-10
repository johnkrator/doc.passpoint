import apiClient from './api';
import { tokenStore } from './tokenStore';

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface LoginResponse {
    access_token: string;
    refresh_token: string;
    user: {
        _id: string;
        email: string;
        role: 'admin' | 'editor' | 'viewer';
        isActive: boolean;
    };
}

export interface ForgotPasswordData {
    email: string;
}

export interface User {
    _id: string;
    email: string;
    role: 'admin' | 'editor' | 'viewer';
    isActive: boolean;
}

// In-memory user  wiped on page unload, restored via restoreSession()
let storedUser: User | null = null;

class AuthService {
    async login(credentials: LoginCredentials): Promise<LoginResponse> {
        const response = await apiClient.post<LoginResponse>('/api/auth/login', credentials);

        if (response.data.access_token) {
            tokenStore.accessToken = response.data.access_token;
            tokenStore.setRefreshToken(response.data.refresh_token);
            storedUser = response.data.user;
        }

        return response.data;
    }

    /**
     * Called on page load  exchanges the persisted refresh token for a fresh
     * access token, restoring the session without requiring re-login.
     * Returns the user if session was restored, null otherwise.
     */
    async restoreSession(): Promise<User | null> {
        const refreshToken = tokenStore.getRefreshToken();
        if (!refreshToken) return null;

        try {
            const response = await apiClient.post<{ access_token: string; refresh_token: string }>(
                '/api/auth/refresh',
                { refresh_token: refreshToken },
            );

            tokenStore.accessToken = response.data.access_token;
            tokenStore.setRefreshToken(response.data.refresh_token);

            // Fetch the current user profile
            const userResponse = await apiClient.get<User>('/api/auth/me');
            storedUser = userResponse.data;
            return storedUser;
        } catch {
            // Refresh token is expired or revoked  clear it and force re-login
            this.clearTokens();
            return null;
        }
    }

    async forgotPassword(data: ForgotPasswordData): Promise<void> {
        await apiClient.post('/api/auth/forgot-password', data);
    }

    async logout(): Promise<void> {
        try {
            const refreshToken = tokenStore.getRefreshToken();
            if (refreshToken) {
                await apiClient.post('/api/auth/logout', {
                    refresh_token: refreshToken,
                });
            }
        } finally {
            this.clearTokens();
        }
    }

    async getCurrentUser(): Promise<User> {
        const response = await apiClient.get<User>('/api/auth/me');
        storedUser = response.data;
        return response.data;
    }

    getStoredUser(): User | null {
        return storedUser;
    }

    getAccessToken(): string | null {
        return tokenStore.accessToken;
    }

    clearTokens(): void {
        tokenStore.accessToken = null;
        tokenStore.clearRefreshToken();
        storedUser = null;
    }

    isAuthenticated(): boolean {
        return !!tokenStore.accessToken;
    }

    hasRole(requiredRole: 'admin' | 'editor' | 'viewer'): boolean {
        if (!storedUser) return false;
        const roleHierarchy: Record<'admin' | 'editor' | 'viewer', number> = { admin: 3, editor: 2, viewer: 1 };
        return roleHierarchy[storedUser.role] >= roleHierarchy[requiredRole];
    }
}

export const authService = new AuthService();
