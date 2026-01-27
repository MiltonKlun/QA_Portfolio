import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, ShieldCheck, FileText, ExternalLink, Code2, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

interface QAVerifiedModalProps {
  isOpen: boolean;
  onClose: () => void;
  bugTitle: string;
  bugDescription: string;
  solution: string;
  testSnippet: string;
}

const QAVerifiedModal = ({
  isOpen,
  onClose,
  bugTitle,
  bugDescription,
  solution,
  testSnippet,
}: QAVerifiedModalProps) => {
  const { toast } = useToast();


  return (
    <AnimatePresence mode="wait">
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

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-card border border-success/30 shadow-2xl shadow-success/20 pointer-events-auto flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-success/5 border-b border-success/20 px-6 py-4 flex items-center justify-between sticky top-0 z-10 shrink-0">
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
              <div className="p-6 overflow-y-auto">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Status:</span>
                    <span className="px-3 py-1 rounded-full text-xs font-bold border text-success border-success bg-success/10">
                      RESOLVED
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">Original Bug</h3>
                      <p className="text-foreground font-semibold">{bugTitle}</p>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">Issue Description</h3>
                      <p className="text-foreground/80 text-sm leading-relaxed">{bugDescription}</p>
                    </div>

                    <div className="p-4 rounded-lg bg-success/5 border border-success/20">
                      <h3 className="text-sm font-medium text-success mb-2 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        Solution Applied
                      </h3>
                      <p className="text-foreground/80 text-sm leading-relaxed">{solution}</p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Actions */}
              <div className="p-6 pt-2 shrink-0">
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    variant="outline"
                    className="flex-1 border-success/50 text-success hover:bg-success/10"
                    onClick={() => {
                      // In a real app this would go to the commit/PR
                      // window.open("https://github.com/...", "_blank")
                      toast({
                        title: "Coming Soon",
                        description: "GitHub link will be added in production.",
                        duration: 3000,
                      });
                    }}
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    View on Github
                    <ExternalLink className="w-3 h-3 ml-2" />
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

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default QAVerifiedModal;
