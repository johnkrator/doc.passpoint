import React, { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** Async  errors must be handled by the caller. */
  onSubmit: (feedback: string) => Promise<void>;
  type: "dislike";
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  type,
}) => {
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const previousOverflowRef = useRef<string>("");

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setFeedback("");
      setIsSubmitting(false);
    }
  }, [isOpen]);

  // ESC key + body scroll lock
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent): void => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      previousOverflowRef.current = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = previousOverflowRef.current;
    };
  }, [isOpen, onClose]);

  const handleSubmit = async (): Promise<void> => {
    if (isSubmitting) return;
    // Strip control characters before sending
    // eslint-disable-next-line no-control-regex
    const sanitized = feedback.replace(/[\u0000-\u001F\u007F]/g, "").trim();
    setIsSubmitting(true);
    try {
      await onSubmit(sanitized);
      onClose();
    } catch {
      // errors are surfaced by the caller via toast
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent): void => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  const placeholder =
    type === "dislike"
      ? "What could be improved about this page?"
      : "What was helpful about this page?";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="feedback-title"
    >
      <div className="relative w-full max-w-md mx-4 bg-card rounded-lg shadow-xl border border-border animate-in fade-in-0 zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2
            id="feedback-title"
            className="text-lg font-semibold text-foreground"
          >
            Share your feedback
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8 rounded-full hover:bg-muted"
            aria-label="Close feedback modal"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          <div>
            <label
              htmlFor="feedback-input"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Please provide details: (optional)
            </label>
            <textarea
              id="feedback-input"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder={placeholder}
              className={cn(
                "w-full px-3 py-2 text-base sm:text-sm border border-border rounded-md",
                "bg-background text-foreground",
                "placeholder:text-muted-foreground",
                "focus:outline-none focus:ring-2 focus:ring-brand/60 focus:border-transparent",
                "resize-none transition-colors duration-200",
                "touch-manipulation",
              )}
              rows={4}
              maxLength={500}
            />
            <div className="text-xs text-muted-foreground mt-1">
              {feedback.length}/500 characters
            </div>
          </div>

          <p className="text-xs text-muted-foreground leading-relaxed">
            Your feedback is used to improve our documentation.{" "}
            <a
              href="https://mypasspoint.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-500 dark:text-brand-400 hover:underline focus:outline-none focus:underline"
            >
              Learn More
            </a>
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-4 border-t border-border bg-muted/50 rounded-b-lg">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isSubmitting}
            className="text-foreground hover:bg-muted"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            aria-busy={isSubmitting}
            className="min-w-[80px]"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="h-3 w-3 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                Submitting
              </span>
            ) : (
              "Submit"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;
