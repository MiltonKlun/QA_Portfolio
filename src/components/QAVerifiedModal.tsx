import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, ShieldCheck, FileText, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface QAVerifiedModalProps {
  isOpen: boolean;
  onClose: () => void;
  bugTitle: string;
  bugDescription: string;
  solution: string;
}

const QAVerifiedModal = ({
  isOpen,
  onClose,
  bugTitle,
  bugDescription,
  solution,
}: QAVerifiedModalProps) => {
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
            className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 w-auto md:w-[90vw] md:max-w-lg z-50 flex items-center justify-center"
          >
            <div className="w-full max-h-[calc(100vh-2rem)] overflow-y-auto rounded-2xl">
              <div className="bg-card border border-success/30 rounded-2xl shadow-2xl shadow-success/20 overflow-hidden">
                {/* Header */}
                <div className="bg-success/10 border-b border-success/20 px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center">
                      <ShieldCheck className="w-5 h-5 text-success" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-success flex items-center gap-2">
                        <CheckCircle className="w-5 h-5" />
                        Bug Fixed & Verified!
                      </h2>
                      <p className="text-sm text-muted-foreground">QA Verification Complete</p>
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
                  {/* Status Badge */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Status:</span>
                    <span className="px-3 py-1 rounded-full text-xs font-bold border text-success border-success bg-success/10">
                      RESOLVED
                    </span>
                  </div>

                  {/* Bug Details */}
                  <div className="space-y-3">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">Original Bug</h3>
                      <p className="text-foreground font-semibold">{bugTitle}</p>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">Issue Description</h3>
                      <p className="text-foreground/80 text-sm">{bugDescription}</p>
                    </div>

                    <div className="p-4 rounded-lg bg-success/5 border border-success/20">
                      <h3 className="text-sm font-medium text-success mb-1 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        Solution Applied
                      </h3>
                      <p className="text-foreground/80 text-sm">{solution}</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <Button
                      variant="outline"
                      className="flex-1 border-success/50 text-success hover:bg-success/10"
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
                    QA ensures bugs are caught before they reach production.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default QAVerifiedModal;
