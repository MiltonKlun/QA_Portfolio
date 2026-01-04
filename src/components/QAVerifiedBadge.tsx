import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, ExternalLink } from "lucide-react";

interface QAVerifiedBadgeProps {
  testName: string;
  testFile: string;
}

const QAVerifiedBadge = ({ testName, testFile }: QAVerifiedBadgeProps) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative inline-flex">
      <motion.button
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onFocus={() => setShowTooltip(true)}
        onBlur={() => setShowTooltip(false)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="w-6 h-6 rounded-full bg-success/20 border border-success/30 flex items-center justify-center cursor-help hover:bg-success/30 transition-colors"
      >
        <CheckCircle className="w-4 h-4 text-success" />
      </motion.button>

      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 5, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50"
          >
            <div className="bg-card border border-success/30 rounded-lg shadow-lg shadow-success/10 p-3 min-w-[240px]">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-4 h-4 text-success" />
                <span className="text-sm font-semibold text-success">QA Verified</span>
              </div>
              
              <p className="text-xs text-muted-foreground mb-2">
                {testName}
              </p>
              
              <div className="flex items-center gap-1 text-xs text-primary">
                <code className="bg-muted px-1.5 py-0.5 rounded text-[10px]">{testFile}</code>
              </div>
              
              <a
                href="https://github.com/example/qa-tests"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs text-primary hover:underline mt-2"
              >
                View on GitHub
                <ExternalLink className="w-3 h-3" />
              </a>

              {/* Arrow */}
              <div className="absolute left-1/2 -translate-x-1/2 -bottom-1.5 w-3 h-3 bg-card border-b border-r border-success/30 rotate-45" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default QAVerifiedBadge;
