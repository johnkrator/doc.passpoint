import axios from 'axios';
import { tokenStore } from './tokenStore';

const getApiBaseUrl = (): string => {
    if (import.meta.env.VITE_API_URL) {
        return import.meta.env.VITE_API_URL;
    }

    const hostname = window.location.hostname;

    if (hostname === 'localhost' || hostname === '127.0.0.1') {
        return 'http://localhost:3000';
    }

    return 'https://main-passpoint-documentation-api.vercel.app';
};

const API_BASE_URL = getApiBaseUrl();

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Attach in-memory access token to every request
apiClient.interceptors.request.use(
    (config) => {
        const token = tokenStore.accessToken;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error: unknown) => Promise.reject(error),
);

// On 401: attempt silent refresh using the persisted refresh token
apiClient.interceptors.response.use(
    (response) => response,
    async (error: unknown) => {
        if (!axios.isAxiosError(error)) {
            return Promise.reject(error);
        }

        const originalRequest = error.config as typeof error.config & { _retry?: boolean };

        if (error.response?.status === 401 && !originalRequest?._retry) {
            if (originalRequest) {
                originalRequest._retry = true;
            }

            try {
                const refreshToken = tokenStore.getRefreshToken();

                if (refreshToken) {
                    const response = await axios.post<{ access_token: string; refresh_token: string }>(
                        `${API_BASE_URL}/api/auth/refresh`,
                        { refresh_token: refreshToken },
                    );

                    tokenStore.accessToken = response.data.access_token;
                    tokenStore.setRefreshToken(response.data.refresh_token);

                    if (originalRequest) {
                        originalRequest.headers = originalRequest.headers ?? {};
                        originalRequest.headers.Authorization = `Bearer ${response.data.access_token}`;
                        return apiClient(originalRequest);
                    }
                }
            } catch (refreshError: unknown) {
                tokenStore.accessToken = null;
                tokenStore.clearRefreshToken();
                window.location.href = '/admin/login';
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    },
);

export default apiClient;
