/**
 * Token storage strategy:
 * - access_token: in-memory only (wiped on page unload — short-lived, 15min)
 * - refresh_token: localStorage (persisted — used to silently restore session on page load)
 *
 * On every page load, AuthContext calls authService.restoreSession() which exchanges
 * the stored refresh token for a fresh access token, restoring the session silently.
 *
 * This is the standard SPA session-persistence pattern:
 * access token never touches disk; refresh token in localStorage is acceptable
 * because it is rotated on every use and revoked on logout.
 */

const REFRESH_TOKEN_KEY = 'pp_rt';

export const tokenStore = {
    // Access token — in-memory only
    accessToken: null as string | null,

    // Refresh token helpers — backed by localStorage for persistence across page loads
    getRefreshToken(): string | null {
        return localStorage.getItem(REFRESH_TOKEN_KEY);
    },
    setRefreshToken(token: string): void {
        localStorage.setItem(REFRESH_TOKEN_KEY, token);
    },
    clearRefreshToken(): void {
        localStorage.removeItem(REFRESH_TOKEN_KEY);
    },
};
