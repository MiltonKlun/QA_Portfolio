import { useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Bug, ArrowRight } from "lucide-react";
import FocusTrap from "focus-trap-react"; // Added import for FocusTrap
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import ModeTransition from "@/components/ModeTransition";

interface CompletionModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const CompletionModal = ({ isOpen, onClose }: CompletionModalProps) => {
    const navigate = useNavigate();
    const [isTransitioning, setIsTransitioning] = useState(false);

    const handleVerifiedClick = () => {
        onClose();
        setIsTransitioning(true);
    };

    const handleTransitionComplete = useCallback(() => {
        setIsTransitioning(false);
        window.scrollTo(0, 0);
        navigate("/tested");
    }, [navigate]);

    return createPortal(
        <>
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Modal Container - No Backdrop */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ type: "spring", damping: 20, stiffness: 300 }}
                            className="fixed inset-0 z-[100] flex items-center justify-center p-4 pointer-events-none"
                        >
                            {/* Wrapped the inner modal structure with FocusTrap */}
                            <FocusTrap active={isOpen}>
                                <div
                                    role="dialog"
                                    aria-modal="true"
                                    className="w-full max-w-lg rounded-2xl bg-card border border-border/50 shadow-2xl pointer-events-auto overflow-hidden"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    {/* Header (Simplified) */}
                                    <div className="pt-12 px-8 pb-4 flex flex-col items-center justify-center text-center relative">
                                        <button
                                            onClick={onClose}
                                            className="absolute top-4 right-4 w-8 h-8 rounded-full hover:bg-muted flex items-center justify-center transition-colors"
                                        >
                                            <X className="w-4 h-4 text-muted-foreground" />
                                        </button>

                                        <motion.div
                                            initial={{ scale: 0, rotate: -180 }}
                                            animate={{ scale: 1, rotate: 0 }}
                                            transition={{ type: "spring", delay: 0.2 }}
                                            className="w-20 h-20 rounded-full bg-success flex items-center justify-center shadow-md mb-6"
                                        >
                                            <Bug className="w-10 h-10 text-success-foreground fill-current" />
                                        </motion.div>

                                        <motion.h2
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.3 }}
                                            className="text-2xl font-bold text-foreground mb-2"
                                        >
                                            Job Done
                                        </motion.h2>

                                        <motion.p
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.4 }}
                                            className="text-muted-foreground"
                                        >
                                            You've successfully identified all 5 bugs.
                                        </motion.p>
                                    </div>

                                    {/* Content */}
                                    <div className="p-8 pt-2 space-y-6">
                                        <div className="flex flex-col gap-3">
                                            <Button
                                                className="w-full h-12 text-base shadow-lg shadow-success/20 group relative overflow-hidden"
                                                variant="default"
                                                onClick={handleVerifiedClick}
                                            >
                                                <span className="text-success-foreground bg-success absolute inset-0 opacity-100 group-hover:opacity-90 transition-opacity" />
                                                <span className="relative z-10 flex items-center justify-center gap-2 text-white font-semibold">
                                                    See Verified Version
                                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                                </span>
                                            </Button>

                                            <Button
                                                variant="ghost"
                                                className="w-full text-muted-foreground hover:text-foreground hover:bg-muted"
                                                onClick={onClose}
                                            >
                                                Continue Navigating
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </FocusTrap>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Cinematic Transition Overlay */}
            <ModeTransition isPlaying={isTransitioning} onComplete={handleTransitionComplete} />
        </>,
        document.body
    );
};

export default CompletionModal;

