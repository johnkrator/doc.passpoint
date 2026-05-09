import apiClient from './api';

export interface ChatConfig {
  temperature?: number;
  max_tokens?: number;
  system_prompt_override?: string;
  prompt_template?: string;
  template_variables?: Record<string, string>;
}

export interface ContextMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface ChatRequest {
  model: string;
  prompt: string;
  context?: ContextMessage[];
  config?: ChatConfig;
}

export interface ChatResponse {
  model_used: string;
  routing_reason: string;
  tokens_used: number;
  cost_estimate: number;
  latency_ms: number;
  output: string;
  budget_warning?: string;
  request_id: string;
  sources?: { title: string; section: string; path: string }[];
  context_status?: 'grounded' | 'insufficient';
}

export interface TokenBudget {
  allowed: boolean;
  totalUsed: number;
  softLimit: number;
  hardLimit: number;
  remaining: number;
  warning?: string;
}

export interface UsageSummary {
  totalTokens: number;
  totalCost: number;
  requestCount: number;
  byModel: Record<string, { tokens: number; cost: number; count: number }>;
  burnRate: number;
}

export interface ModelInfo {
  id: string;
  name: string;
  provider: string;
  maxContextTokens: number;
  capabilities: string[];
  costPer1kInput: number;
  costPer1kOutput: number;
  latencyTier: 'fast' | 'medium' | 'slow';
}

export interface ProviderStatus {
  name: string;
  available: boolean;
  circuitState: {
    state: string;
    failureCount: number;
    lastFailureTime: number;
  };
  modelCount: number;
}

// ── Chat ──

export async function sendChatMessage(request: ChatRequest): Promise<ChatResponse> {
  const { data } = await apiClient.post<ChatResponse>('/ai/chat', request);
  return data;
}

// ── Admin: Usage ──

export async function getTokenBudget(): Promise<TokenBudget> {
  const { data } = await apiClient.get<TokenBudget>('/ai/admin/budget');
  return data;
}

export async function getUsageSummary(): Promise<UsageSummary> {
  const { data } = await apiClient.get<UsageSummary>('/ai/admin/usage');
  return data;
}

// ── Admin: Models ──

export async function getModelsAndProviders(): Promise<{
  models: ModelInfo[];
  providers: ProviderStatus[];
}> {
  const { data } = await apiClient.get('/ai/admin/models');
  return data;
}

// ── Admin: Metrics ──

export async function getAiMetrics(days = 30) {
  const { data } = await apiClient.get(`/ai/admin/metrics?days=${days}`);
  return data;
}
