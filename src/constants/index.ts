// ─── Feedback ─────────────────────────────────────────────────────────────────
export const FEEDBACK_API = {
  SUBMIT: '/api/feedback',
  ADMIN_SUMMARY: '/api/feedback/admin/summary',
  ADMIN_LIST: '/api/feedback/admin',
} as const;

export const FEEDBACK_PAGE_SIZE = 20;

// ─── Layout ───────────────────────────────────────────────────────────────────
/** Tailwind `lg` breakpoint in pixels  used for sidebar open/close logic. */
export const LG_BREAKPOINT = 1024;
