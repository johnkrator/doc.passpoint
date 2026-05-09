import apiClient from './api';
import { FEEDBACK_API } from '@/constants';

export type FeedbackReaction = 'helpful' | 'not_helpful';

export interface SubmitFeedbackPayload {
  pageId: string;
  reaction: FeedbackReaction;
  comment?: string;
}

export interface FeedbackEntry {
  _id: string;
  pageId: string;
  reaction: FeedbackReaction;
  comment?: string;
  userAgent?: string;
  createdAt: string;
  updatedAt: string;
}

export interface FeedbackPageStats {
  pageId: string;
  helpful: number;
  notHelpful: number;
  total: number;
  helpfulPercent: number;
}

export interface FeedbackSummary {
  totalFeedback: number;
  helpful: number;
  notHelpful: number;
  helpfulPercent: number;
  topPages: FeedbackPageStats[];
  recentFeedback: FeedbackEntry[];
}

export interface PaginatedFeedback {
  data: FeedbackEntry[];
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export interface FeedbackListParams {
  pageId?: string;
  reaction?: FeedbackReaction;
  page?: number;
  limit?: number;
}

class FeedbackService {
  async submit(payload: SubmitFeedbackPayload): Promise<void> {
    await apiClient.post(FEEDBACK_API.SUBMIT, payload);
  }

  async getSummary(): Promise<FeedbackSummary> {
    const response = await apiClient.get<FeedbackSummary>(FEEDBACK_API.ADMIN_SUMMARY);
    return response.data;
  }

  async getAll(params?: FeedbackListParams): Promise<PaginatedFeedback> {
    const response = await apiClient.get<PaginatedFeedback>(FEEDBACK_API.ADMIN_LIST, { params });
    return response.data;
  }
}

export const feedbackService = new FeedbackService();
