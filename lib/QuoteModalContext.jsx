import { createContext, useCallback, useContext, useState } from "react";

const QuoteModalContext = createContext(null);

export function QuoteModalProvider({ children }) {
  const [state, setState] = useState({ isOpen: false, prefill: {}, context: "" });

  const openQuoteModal = useCallback((options = {}) => {
    const { context = "", ...prefill } = options;
    setState({ isOpen: true, prefill, context });
  }, []);

  const closeQuoteModal = useCallback(() => {
    setState((prev) => ({ ...prev, isOpen: false }));
  }, []);

  return (
    <QuoteModalContext.Provider value={{ ...state, openQuoteModal, closeQuoteModal }}>
      {children}
    </QuoteModalContext.Provider>
  );
}

export function useQuoteModal() {
  const ctx = useContext(QuoteModalContext);
  if (!ctx) throw new Error("useQuoteModal must be used within a QuoteModalProvider");
  return ctx;
}
