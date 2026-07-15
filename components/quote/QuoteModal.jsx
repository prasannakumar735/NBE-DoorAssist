import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useQuoteModal } from "@/lib/QuoteModalContext";
import QuoteForm from "./QuoteForm";

export default function QuoteModal() {
  const { isOpen, prefill, context, closeQuoteModal } = useQuoteModal();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeQuoteModal}
            className="fixed inset-0 bg-black/50 z-[300]"
            aria-hidden
          />
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-4 top-[6vh] sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 max-w-xl mx-auto bg-white rounded-2xl shadow-2xl z-[301] max-h-[88vh] overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-label="Request a quote"
          >
            <div className="sticky top-0 bg-white flex items-center justify-between px-6 sm:px-8 pt-6 pb-4 border-b border-line z-10">
              <h2 className="text-xl font-heading font-bold uppercase tracking-wide text-ink">Get a Quote</h2>
              <button
                type="button"
                onClick={closeQuoteModal}
                className="p-2 text-on-surface-variant hover:text-ink transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="px-6 sm:px-8 py-6">
              <QuoteForm prefill={prefill} context={context} onSubmitted={() => setTimeout(closeQuoteModal, 1800)} />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
