import apiClient from './api';

// Types
export interface Section {
    _id: string;
    title: string;
    slug: string;
    description?: string;
    icon?: string;
    order: number;
    parentId?: string;
    isVisible: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface Page {
    _id: string;
    title: string;
    slug: string;
    content: string;
    sectionId: string;
    isPublished: boolean;
    order: number;
    tags?: string[];
    createdAt: string;
    updatedAt: string;
}

export interface Endpoint {
    _id: string;
    name: string;
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    path: string;
    description?: string;
    pageId: string;
    requestBody?: any;
    responseExample?: any;
    createdAt: string;
    updatedAt: string;
}

export interface User {
    _id: string;
    email: string;
    role: 'admin' | 'editor' | 'viewer';
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface AuditLog {
    _id: string;
    userId: string;
    userName: string;
    operationType: 'CREATE' | 'UPDATE' | 'DELETE';
    entityType: string;
    entityId: string;
    entityName: string;
    timestamp: string;
}

export interface DashboardStats {
    totalSections: number;
    totalPages: number;
    totalEndpoints: number;
    activeUsers: number;
    sectionsThisMonth: number;
    pagesThisMonth: number;
    endpointsThisMonth: number;
}

export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
}

// Dashboard Service
class AdminDashboardService {
    async getStats(): Promise<DashboardStats> {
        try {
            // Fetch data from multiple endpoints and aggregate
            // Use large limit to get all records for stats calculation
            const [sectionsRes, pagesRes, endpointsRes, usersRes] = await Promise.all([
                apiClient.get('/admin/sections'),
                apiClient.get('/admin/pages', { params: { limit: 1000 } }),
                apiClient.get('/admin/endpoints'),
                apiClient.get('/api/admin/users'),
            ]);

            // Handle paginated vs non-paginated responses
            const sections = this.extractDataArray<Section>(sectionsRes.data);
            const pages = this.extractDataArray<Page>(pagesRes.data);
            const endpoints = this.extractDataArray<Endpoint>(endpointsRes.data);
            const users = this.extractDataArray<User>(usersRes.data);

            // Calculate stats
            const now = new Date();
            const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);

            return {
                totalSections: sections.length,
                totalPages: pages.length,
                totalEndpoints: endpoints.length,
                activeUsers: users.filter(u => u.isActive).length,
                sectionsThisMonth: sections.filter(
                    s => new Date(s.createdAt) >= thisMonth
                ).length,
                pagesThisMonth: pages.filter(
                    p => new Date(p.createdAt) >= thisMonth
                ).length,
                endpointsThisMonth: endpoints.filter(
                    e => new Date(e.createdAt) >= thisMonth
                ).length,
            };
        } catch (error) {
            throw error;
        }
    }

    private extractDataArray<T>(response: PaginatedResponse<T> | T[] | any): T[] {
        // Handle different response formats
        if (Array.isArray(response)) {
            return response;
        }
        if (response && Array.isArray(response.data)) {
            return response.data;
        }
        return [];
    }

    async getRecentActivity(limit: number = 10): Promise<AuditLog[]> {
        try {
            const response = await apiClient.get<AuditLog[]>('/admin/audit', {
                params: { limit },
            });
            return Array.isArray(response.data) ? response.data : [];
        } catch {
            return [];
        }
    }
}

// Sections Service
class AdminSectionsService {
    async getAll(): Promise<Section[]> {
        const response = await apiClient.get<Section[]>('/admin/sections');
        return response.data;
    }

    async getOne(id: string): Promise<Section> {
        const response = await apiClient.get<Section>(`/admin/sections/${id}`);
        return response.data;
    }

    async create(data: Partial<Section>): Promise<Section> {
        const response = await apiClient.post<Section>('/admin/sections', data);
        return response.data;
    }

    async update(id: string, data: Partial<Section>): Promise<Section> {
        const response = await apiClient.patch<Section>(`/admin/sections/${id}`, data);
        return response.data;
    }

    async delete(id: string): Promise<void> {
        await apiClient.delete(`/admin/sections/${id}`);
    }

    async toggleVisibility(id: string): Promise<Section> {
        const response = await apiClient.patch<Section>(`/admin/sections/${id}/visibility`);
        return response.data;
    }
}

// Pages Service
class AdminPagesService {
    async getAll(params?: any): Promise<PaginatedResponse<Page>> {
        const response = await apiClient.get<PaginatedResponse<Page>>('/admin/pages', { params });
        return response.data;
    }

    async getOne(id: string): Promise<Page> {
        const response = await apiClient.get<Page>(`/admin/pages/${id}`);
        return response.data;
    }

    async create(data: Partial<Page>): Promise<Page> {
        const response = await apiClient.post<Page>('/admin/pages', data);
        return response.data;
    }

    async update(id: string, data: Partial<Page>): Promise<Page> {
        const response = await apiClient.patch<Page>(`/admin/pages/${id}`, data);
        return response.data;
    }

    async delete(id: string): Promise<void> {
        await apiClient.delete(`/admin/pages/${id}`);
    }

    async togglePublished(id: string): Promise<Page> {
        const response = await apiClient.patch<Page>(`/admin/pages/${id}/publish`);
        return response.data;
    }

    async search(query: string): Promise<Page[]> {
        const response = await apiClient.get<Page[]>('/admin/pages/search', {
            params: { q: query },
        });
        return response.data;
    }
}

// Endpoints Service
class AdminEndpointsService {
    async getAll(): Promise<Endpoint[]> {
        const response = await apiClient.get<Endpoint[]>('/admin/endpoints');
        return response.data;
    }

    async getOne(id: string): Promise<Endpoint> {
        const response = await apiClient.get<Endpoint>(`/admin/endpoints/${id}`);
        return response.data;
    }

    async create(data: Partial<Endpoint>): Promise<Endpoint> {
        const response = await apiClient.post<Endpoint>('/admin/endpoints', data);
        return response.data;
    }

    async update(id: string, data: Partial<Endpoint>): Promise<Endpoint> {
        const response = await apiClient.patch<Endpoint>(`/admin/endpoints/${id}`, data);
        return response.data;
    }

    async delete(id: string): Promise<void> {
        await apiClient.delete(`/admin/endpoints/${id}`);
    }

    async getByPage(pageId: string): Promise<Endpoint[]> {
        const response = await apiClient.get<Endpoint[]>(`/admin/endpoints/page/${pageId}`);
        return response.data;
    }
}

// Users Service
class AdminUsersService {
    async getAll(): Promise<User[]> {
        const response = await apiClient.get<User[]>('/api/admin/users');
        return response.data;
    }

    async getOne(id: string): Promise<User> {
        const response = await apiClient.get<User>(`/api/admin/users/${id}`);
        return response.data;
    }

    async create(data: Partial<User> & { password: string }): Promise<User> {
        const response = await apiClient.post<User>('/api/admin/users', data);
        return response.data;
    }

    async update(id: string, data: Partial<User>): Promise<User> {
        const response = await apiClient.patch<User>(`/api/admin/users/${id}`, data);
        return response.data;
    }

    async delete(id: string): Promise<void> {
        await apiClient.delete(`/api/admin/users/${id}`);
    }

    async toggleActive(id: string): Promise<User> {
        const response = await apiClient.patch<User>(`/api/admin/users/${id}/toggle-active`);
        return response.data;
    }

    async changeRole(id: string, role: 'admin' | 'editor' | 'viewer'): Promise<User> {
        const response = await apiClient.patch<User>(`/api/admin/users/${id}/change-role`, { role });
        return response.data;
    }
}

// Export service instances
export const adminDashboardService = new AdminDashboardService();
export const adminSectionsService = new AdminSectionsService();
export const adminPagesService = new AdminPagesService();
export const adminEndpointsService = new AdminEndpointsService();
export const adminUsersService = new AdminUsersService();
