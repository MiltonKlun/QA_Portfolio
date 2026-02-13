import { motion, AnimatePresence } from "framer-motion";
import { Bug, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";

import { createPortal } from "react-dom";

interface ModeTransitionProps {
    isPlaying: boolean;
    onComplete: () => void;
}

const ModeTransition = ({ isPlaying, onComplete }: ModeTransitionProps) => {
    const [phase, setPhase] = useState<"deploying" | "passing" | "done">("deploying");

    useEffect(() => {
        if (!isPlaying) {
            setPhase("deploying");
            return;
        }

        // Phase 1 → Phase 2 after 1.2s
        const t1 = setTimeout(() => setPhase("passing"), 1200);
        // Phase 2 → done after 2.8s total (green icon visible for 1.6s)
        const t2 = setTimeout(() => setPhase("done"), 2800);
        // Call onComplete after fade-out finishes (~3.2s total)
        const t3 = setTimeout(() => onComplete(), 3200);

        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
        };
    }, [isPlaying, onComplete]);

    return createPortal(
        <AnimatePresence>
            {isPlaying && phase !== "done" && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
                    style={{ backgroundColor: "hsl(222 47% 6% / 0.97)" }}
                >
                    {/* Icon */}
                    <div className="relative w-28 h-28 mb-8">
                        <AnimatePresence mode="wait">
                            {phase === "deploying" && (
                                <motion.div
                                    key="bug"
                                    initial={{ scale: 0, rotate: -180 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    exit={{ scale: 0, rotate: 180, opacity: 0 }}
                                    transition={{ type: "spring", damping: 15, stiffness: 200, duration: 0.4 }}
                                    className="absolute inset-0 flex items-center justify-center"
                                >
                                    <div
                                        className="w-28 h-28 rounded-full flex items-center justify-center border-2"
                                        style={{
                                            backgroundColor: "hsl(0 84% 60% / 0.15)",
                                            borderColor: "hsl(0 84% 60% / 0.4)",
                                            boxShadow: "0 0 40px hsl(0 84% 60% / 0.2)",
                                        }}
                                    >
                                        <Bug className="w-14 h-14 text-danger" />
                                    </div>
                                </motion.div>
                            )}

                            {phase === "passing" && (
                                <motion.div
                                    key="check"
                                    initial={{ scale: 0, rotate: -90 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    exit={{ scale: 0, opacity: 0 }}
                                    transition={{ type: "tween", duration: 0.25, ease: "easeOut" }}
                                    className="absolute inset-0 flex items-center justify-center"
                                >
                                    <div
                                        className="w-28 h-28 rounded-full flex items-center justify-center border-2"
                                        style={{
                                            backgroundColor: "hsl(142 76% 45% / 0.2)",
                                            borderColor: "hsl(142 76% 45% / 0.6)",
                                            boxShadow: "0 0 50px hsl(142 76% 45% / 0.35)",
                                        }}
                                    >
                                        <CheckCircle className="w-14 h-14 text-success" />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Text */}
                    <AnimatePresence mode="wait">
                        {phase === "deploying" && (
                            <motion.div
                                key="deploying-text"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                                className="text-center"
                            >
                                <p className="text-lg sm:text-xl font-semibold text-danger mb-2">
                                    Deploying Fixes...
                                </p>
                                <div className="flex items-center justify-center gap-1.5">
                                    {[0, 1, 2].map((i) => (
                                        <motion.div
                                            key={i}
                                            animate={{ opacity: [0.3, 1, 0.3] }}
                                            transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                                            className="w-2 h-2 rounded-full bg-danger"
                                        />
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {phase === "passing" && (
                            <motion.div
                                key="passing-text"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                                className="text-center"
                            >
                                <p className="text-lg sm:text-xl font-semibold text-success">
                                    All Tests Passing ✓
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    );
};

export default ModeTransition;


