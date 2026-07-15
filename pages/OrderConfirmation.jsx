import { Link, useLocation, Navigate } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export default function OrderConfirmation() {
  const location = useLocation();
  const { orderNumber, total } = location.state || {};

  if (!orderNumber) return <Navigate to="/" replace />;

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6 py-16">
      <div className="max-w-lg text-center">
        <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/15 flex items-center justify-center mb-6">
          <CheckCircle2 className="w-8 h-8 text-emerald-600" />
        </div>
        <h1 className="text-3xl font-heading font-bold text-ink tracking-tight mb-3">Order request received</h1>
        <p className="text-on-surface-variant leading-relaxed">
          Thanks — your order reference is <span className="font-mono-spec font-semibold text-ink">{orderNumber}</span>.
          {typeof total === "number" && <> Estimated total <span className="font-mono-spec font-semibold text-ink">{formatCurrency(total)}</span>.</>}
        </p>
        <p className="text-on-surface-variant leading-relaxed mt-3">
          We'll email you within one business day to confirm pricing, freight and payment before dispatch.
        </p>
        <Link
          to="/"
          className="inline-block mt-8 bg-brand hover:bg-brandDark text-white font-bold uppercase tracking-wide text-sm px-8 py-3.5 rounded-lg transition-colors"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
