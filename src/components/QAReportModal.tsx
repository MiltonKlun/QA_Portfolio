import { motion, AnimatePresence } from "framer-motion";
import { X, AlertTriangle, ExternalLink, Bug, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

interface QAReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  bugTitle: string;
  bugDescription: string;
  businessImpact: string;
  severity: "critical" | "high" | "medium";
}

const QAReportModal = ({
  isOpen,
  onClose,
  bugTitle,
  bugDescription,
  businessImpact,
  severity,
}: QAReportModalProps) => {
  const severityColors = {
    critical: "text-danger border-danger bg-danger/10",
    high: "text-warning border-warning bg-warning/10",
    medium: "text-primary border-primary bg-primary/10",
  };

  const severityLabels = {
    critical: "CRITICAL",
    high: "HIGH",
    medium: "MEDIUM",
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-lg z-50"
          >
            <div className="bg-card border border-danger/30 rounded-2xl shadow-2xl shadow-danger/20 overflow-hidden">
              {/* Header */}
              <div className="bg-danger/10 border-b border-danger/20 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-danger/20 flex items-center justify-center animate-pulse">
                    <Bug className="w-5 h-5 text-danger" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-danger flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5" />
                      Critical Defect Found!
                    </h2>
                    <p className="text-sm text-muted-foreground">QA Report #BUG-{Math.floor(Math.random() * 9000) + 1000}</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center hover:bg-muted transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                {/* Severity Badge */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Severity:</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${severityColors[severity]}`}>
                    {severityLabels[severity]}
                  </span>
                </div>

                {/* Bug Details */}
                <div className="space-y-3">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Bug Title</h3>
                    <p className="text-foreground font-semibold">{bugTitle}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Description</h3>
                    <p className="text-foreground/80 text-sm">{bugDescription}</p>
                  </div>

                  <div className="p-4 rounded-lg bg-danger/5 border border-danger/20">
                    <h3 className="text-sm font-medium text-danger mb-1 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" />
                      Business Impact
                    </h3>
                    <p className="text-foreground/80 text-sm">{businessImpact}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Button
                    variant="dangerOutline"
                    className="flex-1"
                    onClick={() => window.open("https://jira.example.com/browse/BUG-1234", "_blank")}
                  >
                    <FileText className="w-4 h-4" />
                    View Jira Ticket
                    <ExternalLink className="w-3 h-3" />
                  </Button>
                  <Button
                    variant="secondary"
                    className="flex-1"
                    onClick={onClose}
                  >
                    Continue Exploring
                  </Button>
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 py-3 bg-muted/30 border-t border-border">
                <p className="text-xs text-muted-foreground text-center">
                  Without QA, this bug would have reached production.
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default QAReportModal;
