import { motion } from "framer-motion";

interface BugHintProps {
    visible: boolean;
    className?: string;
}

const BugHint = ({ visible, className = "" }: BugHintProps) => {
    if (!visible) return null;

    return (
        <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className={`absolute z-20 pointer-events-none ${className}`}
        >
            <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-danger opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-danger shadow-[0_0_10px_hsl(var(--danger))]"></span>
            </span>
        </motion.div>
    );
};

export default BugHint;
