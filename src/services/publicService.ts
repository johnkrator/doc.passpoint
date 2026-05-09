import apiClient from './api';

// Public API types
export interface NavigationSection {
    _id: string;
    title: string;
    slug: string;
    icon?: string;
    order: number;
    isVisible: boolean;
    children?: NavigationSection[];
    pages?: any[]; // Pages attached to this section
}

export interface NavigationResponse {
    sections: NavigationSection[];
}

// Public Service - No authentication required
class PublicNavigationService {
    async getNavigation(): Promise<NavigationSection[]> {
        const response = await apiClient.get<NavigationResponse>('/public/navigation');
        // Backend returns { sections: [...] }, extract the array
        return response.data.sections || [];
    }

    async getSectionBySlug(slug: string): Promise<NavigationSection> {
        const response = await apiClient.get<NavigationSection>(`/public/sections/${slug}`);
        return response.data;
    }
}

export const publicNavigationService = new PublicNavigationService();
