import { useState } from 'react';
import { X, Loader2, Zap, Clock, Coins } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
  sendChatMessage,
  type ChatResponse,
  type ContextMessage,
} from '../../services/ai.service';
import { ClaudeLogo, GeminiLogo } from './ProviderLogos';

interface ComparisonViewProps {
  prompt: string;
  context: ContextMessage[];
  onClose: () => void;
}

interface ComparisonResult {
  provider: string;
  response: ChatResponse | null;
  error?: string;
  loading: boolean;
}

export default function ComparisonView({
  prompt,
  context,
  onClose,
}: ComparisonViewProps) {
  const [results, setResults] = useState<ComparisonResult[]>([
    { provider: 'claude', response: null, loading: true },
    { provider: 'gemini', response: null, loading: true },
  ]);
  const [started, setStarted] = useState(false);

  async function runComparison() {
    setStarted(true);

    const providers = ['claude', 'gemini'];
    const promises = providers.map(async (provider, i) => {
      try {
        const response = await sendChatMessage({
          model: provider,
          prompt,
          context,
        });
        setResults((prev) =>
          prev.map((r, j) =>
            j === i ? { ...r, response, loading: false } : r,
          ),
        );
      } catch (error: any) {
        setResults((prev) =>
          prev.map((r, j) =>
            j === i
              ? {
                  ...r,
                  error: error?.response?.data?.message || error?.message || 'Failed',
                  loading: false,
                }
              : r,
          ),
        );
      }
    });

    await Promise.allSettled(promises);
  }

  return (
    <div className="absolute inset-0 z-30 bg-background flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-border">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <span>⚔️</span> Model Comparison
        </h3>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Prompt */}
      <div className="px-5 py-3 bg-muted border-b border-border">
        <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">
          Prompt
        </p>
        <p className="text-xs text-foreground line-clamp-3">
          {prompt}
        </p>
      </div>

      {!started ? (
        <div className="flex-1 flex items-center justify-center">
          <button
            onClick={runComparison}
            className="px-6 py-3 rounded-xl bg-brand-500 text-white text-sm font-medium hover:bg-brand-600 hover:shadow-lg hover:shadow-brand-500/25 transition-all"
          >
            Run Comparison: Claude vs Gemini
          </button>
        </div>
      ) : (
        <div className="flex-1 grid grid-cols-2 divide-x divide-border overflow-hidden">
          {results.map((result) => (
            <div
              key={result.provider}
              className="flex flex-col overflow-hidden"
            >
              {/* Provider header */}
              <div className="px-3 py-2 bg-muted border-b border-border flex items-center gap-2">
                <span className="text-xs">
                  {result.provider === 'claude' ? <ClaudeLogo size={16} /> : <GeminiLogo size={16} />}
                </span>
                <span className="text-xs font-semibold text-foreground capitalize">
                  {result.provider}
                </span>
                {result.response && (
                  <span className="text-[10px] text-muted-foreground ml-auto">
                    {result.response.latency_ms}ms / {result.response.tokens_used} tok
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-3">
                {result.loading ? (
                  <div className="flex items-center justify-center h-full">
                    <Loader2 className="w-5 h-5 animate-spin text-brand-500" />
                  </div>
                ) : result.error ? (
                  <div className="text-xs text-destructive p-3 bg-destructive/10 rounded-lg">
                    {result.error}
                  </div>
                ) : (
                  <div className="text-xs text-foreground prose prose-xs dark:prose-invert max-w-none">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {result.response?.output || ''}
                    </ReactMarkdown>
                  </div>
                )}
              </div>

              {/* Stats footer */}
              {result.response && (
                <div className="px-3 py-2 border-t border-border flex items-center gap-3 text-[10px] text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Zap className="w-2.5 h-2.5" />
                    {result.response.tokens_used}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-2.5 h-2.5" />
                    {result.response.latency_ms}ms
                  </span>
                  <span className="flex items-center gap-1">
                    <Coins className="w-2.5 h-2.5" />$
                    {result.response.cost_estimate.toFixed(6)}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
