// Admin data types and interfaces - All types explicitly defined

// ============================================
// CONTENT BLOCK TYPES
// ============================================

export interface TextContentBlock {
    id: string;
    type: 'text';
    content: {
        text: string;
        format?: 'markdown' | 'html' | 'plain';
    };
    order: number;
}

export interface HeadingContentBlock {
    id: string;
    type: 'heading';
    content: {
        text: string;
        level: 1 | 2 | 3 | 4 | 5 | 6;
    };
    order: number;
}

export interface CodeContentBlock {
    id: string;
    type: 'code';
    content: {
        code: string;
        language: string;
        filename?: string;
        showLineNumbers?: boolean;
    };
    order: number;
}

export interface TableContentBlock {
    id: string;
    type: 'table';
    content: {
        headers: string[];
        rows: string[][];
    };
    order: number;
}

export interface CalloutContentBlock {
    id: string;
    type: 'callout';
    content: {
        text: string;
        variant: 'info' | 'warning' | 'error' | 'success';
        title?: string;
    };
    order: number;
}

export interface ListContentBlock {
    id: string;
    type: 'list';
    content: {
        items: string[];
        ordered: boolean;
    };
    order: number;
}

export interface EndpointContentBlock {
    id: string;
    type: 'endpoint';
    content: {
        endpointId: string;
    };
    order: number;
}

export type ContentBlock =
    | TextContentBlock
    | HeadingContentBlock
    | CodeContentBlock
    | TableContentBlock
    | CalloutContentBlock
    | ListContentBlock
    | EndpointContentBlock;

// ============================================
// SECTION
// ============================================

export interface Section {
    _id: string;
    title: string;
    slug: string;
    icon?: string;
    order: number;
    parentId?: string;
    isVisible: boolean;
    description?: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateSectionInput {
    title: string;
    slug: string;
    icon: string;
    order: number;
    parentId: string | null;
    isVisible: boolean;
}

export interface UpdateSectionInput {
    title?: string;
    slug?: string;
    icon?: string;
    order?: number;
    parentId?: string | null;
    isVisible?: boolean;
}

// ============================================
// PAGE
// ============================================

export interface Page {
    _id: string;
    sectionId: string;
    title: string;
    slug: string;
    description?: string;
    content?: string; // Content as string (markdown/HTML) from backend
    order: number;
    isPublished: boolean;
    metaKeywords?: string[];
    metaAliases?: string[];
    tags?: string[];
    createdAt: string;
    updatedAt: string;
}

export interface CreatePageInput {
    sectionId: string;
    title: string;
    slug: string;
    description: string;
    content: ContentBlock[];
    order: number;
    isPublished: boolean;
    metaKeywords: string[];
    metaAliases: string[];
}

export interface UpdatePageInput {
    sectionId?: string;
    title?: string;
    slug?: string;
    description?: string;
    content?: ContentBlock[];
    order?: number;
    isPublished?: boolean;
    metaKeywords?: string[];
    metaAliases?: string[];
}

// ============================================
// API ENDPOINT
// ============================================

export interface EndpointHeader {
    id: string;
    key: string;
    value: string;
    isRequired: boolean;
    description: string;
}

export interface EndpointParameter {
    id: string;
    name: string;
    type: string;
    location: 'query' | 'body' | 'path' | 'header';
    isRequired: boolean;
    description: string;
    defaultValue: string | null;
    example: string;
    order: number;
}

export interface CodeSample {
    id: string;
    language: 'curl' | 'javascript' | 'python' | 'json' | 'bash' | 'typescript';
    sampleType: 'request' | 'response' | 'example';
    code: string;
    description: string;
    order: number;
}

export interface ApiEndpoint {
    _id: string;
    name: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    path: string;
    description?: string;
    pageId: string;
    requestBody?: Record<string, unknown>;
    responseExample?: Record<string, unknown>;
    createdAt: string;
    updatedAt: string;
}

export interface CreateApiEndpointInput {
    pageId: string;
    title: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    path: string;
    baseUrlType: 'dev' | 'production';
    description: string;
    headers: EndpointHeader[];
    parameters: EndpointParameter[];
    codeSamples: CodeSample[];
    order: number;
}

export interface UpdateApiEndpointInput {
    pageId?: string;
    title?: string;
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    path?: string;
    baseUrlType?: 'dev' | 'production';
    description?: string;
    headers?: EndpointHeader[];
    parameters?: EndpointParameter[];
    codeSamples?: CodeSample[];
    order?: number;
}

// ============================================
// USER
// ============================================

export interface User {
    _id: string;
    email: string;
    role: 'admin' | 'editor' | 'viewer';
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface CreateUserInput {
    email: string;
    password: string;
    role: 'admin' | 'editor' | 'viewer';
    isActive: boolean;
}

export interface UpdateUserInput {
    email?: string;
    password?: string;
    role?: 'admin' | 'editor' | 'viewer';
    isActive?: boolean;
}

// ============================================
// CONTENT VERSION (AUDIT TRAIL)
// ============================================

export interface SectionVersionSnapshot {
    title: string;
    slug: string;
    icon: string;
    order: number;
    parentId: string | null;
    isVisible: boolean;
}

export interface PageVersionSnapshot {
    sectionId: string;
    title: string;
    slug: string;
    description: string;
    content: ContentBlock[];
    order: number;
    isPublished: boolean;
    metaKeywords: string[];
    metaAliases: string[];
}

export interface EndpointVersionSnapshot {
    pageId: string;
    title: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    path: string;
    baseUrlType: 'dev' | 'production';
    description: string;
    headers: EndpointHeader[];
    parameters: EndpointParameter[];
    codeSamples: CodeSample[];
    order: number;
}

export type ContentVersionSnapshot =
    | SectionVersionSnapshot
    | PageVersionSnapshot
    | EndpointVersionSnapshot;

export interface ContentVersion {
    _id: string;
    entityType: 'page' | 'endpoint' | 'section';
    entityId: string;
    contentSnapshot: ContentVersionSnapshot;
    changedBy: string;
    createdAt: Date;
}

// ============================================
// API RESPONSE TYPES
// ============================================

export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message: string;
}

export interface ApiError {
    success: false;
    error: string;
    message: string;
    statusCode: number;
}

export interface PaginatedResponse<T> {
    success: boolean;
    data: T[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

// ============================================
// FORM STATE TYPES
// ============================================

export interface FormErrors {
    [key: string]: string;
}

export interface FormState<T> {
    data: T;
    errors: FormErrors;
    isSubmitting: boolean;
    isDirty: boolean;
}
