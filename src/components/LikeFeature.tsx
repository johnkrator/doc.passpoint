import React, { useState, useEffect } from "react";
import { ThumbsUp, ThumbsDown, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { feedbackService } from "@/services/feedbackService";
import FeedbackModal from "./FeedbackModal";

interface LikeFeatureProps {
    pageId: string;
    className?: string;
}

type Reaction = "helpful" | "not_helpful";

const STORAGE_KEY_PREFIX = "pp_feedback_";

/** Returns the localStorage key for a given pageId. */
function storageKey(pageId: string): string {
    return `${STORAGE_KEY_PREFIX}${pageId}`;
}

/** Returns the persisted reaction for the page, or null if none. */
function getPersistedReaction(pageId: string): Reaction | null {
    try {
        const raw = localStorage.getItem(storageKey(pageId));
        if (raw === "helpful" || raw === "not_helpful") return raw;
    } catch {
        // localStorage unavailable (private mode, etc.) — degrade gracefully
    }
    return null;
}

/** Persists the reaction for the page. */
function persistReaction(pageId: string, reaction: Reaction): void {
    try {
        localStorage.setItem(storageKey(pageId), reaction);
    } catch {
        // ignore
    }
}

const LikeFeature: React.FC<LikeFeatureProps> = ({ pageId, className = "" }) => {
    const [submittedReaction, setSubmittedReaction] = useState<Reaction | null>(null);
    const [pendingReaction, setPendingReaction] = useState<Reaction | null>(null);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        setSubmittedReaction(getPersistedReaction(pageId));
        setPendingReaction(null);
        setModalOpen(false);
    }, [pageId]);

    /** Fire-and-forget API call; reverts optimistic update on failure. */
    const syncToApi = async (reaction: Reaction, comment?: string): Promise<void> => {
        try {
            await feedbackService.submit({ pageId, reaction, comment });
            persistReaction(pageId, reaction);
            toast.success("Thanks for your feedback!");
        } catch {
            // Revert optimistic update
            setSubmittedReaction(null);
            toast.error("Couldn't save your feedback — please try again.");
        }
    };

    const handleReactionClick = (reaction: Reaction): void => {
        if (submittedReaction !== null) return;

        if (reaction === "not_helpful") {
            setPendingReaction(reaction);
            setModalOpen(true);
            return;
        }

        // Optimistic: show confirmed state immediately
        setSubmittedReaction(reaction);
        void syncToApi(reaction);
    };

    const handleModalSubmit = async (comment: string): Promise<void> => {
        if (pendingReaction === null) return;
        const reaction = pendingReaction;
        setModalOpen(false);
        setPendingReaction(null);
        // Optimistic: show confirmed state before API responds
        setSubmittedReaction(reaction);
        await syncToApi(reaction, comment || undefined);
    };

    const handleModalClose = (): void => {
        setModalOpen(false);
        setPendingReaction(null);
    };

    const hasSubmitted = submittedReaction !== null;

    return (
        <>
            <div
                className={cn(
                    "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-5 sm:py-6",
                    className
                )}
            >
                <div>
                    <h3 className="text-sm font-semibold text-foreground">
                        Was this page helpful?
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                        Let us know if this documentation helped you.
                    </p>
                </div>

                {/* aria-live ensures screen readers announce the confirmation message */}
                <div aria-live="polite" aria-atomic="true">
                    {hasSubmitted ? (
                        <div className="flex items-center gap-2 text-sm text-brand font-medium" role="status">
                            <CheckCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                            <span>
                                {submittedReaction === "helpful"
                                    ? "Glad it helped!"
                                    : "Thanks! We'll improve this."}
                            </span>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleReactionClick("helpful")}
                                className={cn(
                                    "gap-1.5 text-sm transition-colors",
                                    "hover:border-brand/60 hover:text-brand dark:hover:border-brand/50 dark:hover:text-brand/80"
                                )}
                                aria-label="Mark as helpful"
                            >
                                <ThumbsUp className="h-4 w-4" aria-hidden="true" />
                                Helpful
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleReactionClick("not_helpful")}
                                className={cn(
                                    "gap-1.5 text-sm transition-colors",
                                    "hover:border-destructive/30 hover:text-destructive dark:hover:border-destructive/40 dark:hover:text-destructive/80"
                                )}
                                aria-label="Mark as not helpful"
                            >
                                <ThumbsDown className="h-4 w-4" aria-hidden="true" />
                                Not helpful
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            <FeedbackModal
                isOpen={modalOpen}
                type="dislike"
                onClose={handleModalClose}
                onSubmit={handleModalSubmit}
            />
        </>
    );
};

export default LikeFeature;
