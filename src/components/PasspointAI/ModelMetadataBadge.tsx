import { useState } from 'react';
import { Zap, Clock, ChevronDown, Route } from 'lucide-react';
import type { ChatResponse } from '../../services/ai.service';
import { ClaudeLogo, GeminiLogo } from './ProviderLogos';

interface ModelMetadataBadgeProps {
  metadata: ChatResponse;
}

function resolveModelLabel(modelUsed: string): { label: string; isClaude: boolean } {
  const m = modelUsed.toLowerCase();
  if (m.includes('opus'))   return { label: 'Claude Opus',   isClaude: true };
  if (m.includes('sonnet')) return { label: 'Claude Sonnet', isClaude: true };
  if (m.includes('haiku'))  return { label: 'Claude Haiku',  isClaude: true };
  if (m.includes('claude')) return { label: 'Claude',        isClaude: true };
  if (m.includes('pro'))    return { label: 'Gemini Pro',    isClaude: false };
  if (m.includes('flash'))  return { label: 'Gemini Flash',  isClaude: false };
  if (m.includes('gemini')) return { label: 'Gemini',        isClaude: false };
  return { label: modelUsed, isClaude: false };
}

export default function ModelMetadataBadge({ metadata }: ModelMetadataBadgeProps) {
  const [expanded, setExpanded] = useState(false);
  const { label, isClaude } = resolveModelLabel(metadata.model_used);
  const ModelLogo = isClaude ? ClaudeLogo : GeminiLogo;

  const hasTokens  = metadata.tokens_used > 0;
  const hasLatency = metadata.latency_ms > 0;

  return (
    <div className="inline-flex flex-col">
      <button
        onClick={() => setExpanded(!expanded)}
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-muted border border-border text-[10px] text-muted-foreground hover:bg-accent transition-colors"
      >
        <ModelLogo size={11} />
        <span className="font-medium text-foreground">{label}</span>
        {hasTokens && (
          <>
            <span className="text-border/60">·</span>
            <Zap className="w-2.5 h-2.5 text-amber-500" />
            <span>{metadata.tokens_used.toLocaleString()}</span>
          </>
        )}
        {hasLatency && (
          <>
            <span className="text-border/60">·</span>
            <Clock className="w-2.5 h-2.5" />
            <span>{metadata.latency_ms < 1000
              ? `${metadata.latency_ms}ms`
              : `${(metadata.latency_ms / 1000).toFixed(1)}s`}
            </span>
          </>
        )}
        <ChevronDown
          className={`w-2.5 h-2.5 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
        />
      </button>

      {expanded && (
        <div className="mt-1.5 px-3 py-2.5 rounded-xl bg-muted border border-border text-[10px] space-y-2 w-56">
          <Row label="Model"   value={metadata.model_used} mono />
          {hasTokens  && <Row label="Tokens"  value={metadata.tokens_used.toLocaleString()} />}
          {hasLatency && <Row label="Latency" value={metadata.latency_ms < 1000
            ? `${metadata.latency_ms}ms`
            : `${(metadata.latency_ms / 1000).toFixed(1)}s`}
          />}
          {metadata.cost_estimate > 0 && (
            <Row label="Cost" value={`$${metadata.cost_estimate.toFixed(6)}`} />
          )}
          {metadata.routing_reason && (
            <div className="flex items-start gap-1.5 text-muted-foreground pt-0.5 border-t border-border">
              <Route className="w-3 h-3 shrink-0 mt-0.5 text-brand-500" />
              <span className="leading-snug">{metadata.routing_reason}</span>
            </div>
          )}
          {metadata.budget_warning && (
            <div className="px-2 py-1 rounded-lg bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400">
              ⚠️ {metadata.budget_warning}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function Row({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-2 text-muted-foreground">
      <span className="font-medium text-foreground/70">{label}</span>
      <span className={mono ? 'font-mono truncate max-w-[120px]' : ''}>{value}</span>
    </div>
  );
}
