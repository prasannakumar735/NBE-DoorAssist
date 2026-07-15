import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Loader2, ShieldCheck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/lib/CartContext";
import { formatCurrency } from "@/lib/utils";
import { submitOrderRequest } from "@/api/leadsClient";

const emptyShipping = {
  name: "",
  email: "",
  phone: "",
  address1: "",
  address2: "",
  suburb: "",
  state: "",
  postcode: "",
};

function generateOrderNumber() {
  const digits = Math.floor(100000 + Math.random() * 900000);
  return `DR-${digits}`;
}

export default function Checkout() {
  const { items, subtotal, shipping, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [shippingDetails, setShippingDetails] = useState(emptyShipping);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (field, value) => setShippingDetails((prev) => ({ ...prev, [field]: value }));

  const handleContinue = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePlaceOrder = async () => {
    setSubmitting(true);
    setError("");
    const orderNumber = generateOrderNumber();
    try {
      await submitOrderRequest({
        orderNumber,
        shipping: shippingDetails,
        items,
        subtotal,
        shippingCost: shipping,
        total,
      });
      clearCart();
      navigate("/order-confirmation", { state: { orderNumber, total } });
    } catch {
      setError("Unable to submit your order request right now. Please try again, or email support@drooov.com.au.");
    } finally {
      setSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center">
        <p className="text-lg text-on-surface-variant mb-4">Your cart is empty.</p>
        <Link to="/strip-rolls" className="text-brand font-semibold hover:text-brandDark">
          Browse strip rolls →
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-6 lg:px-8 py-12 md:py-16">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-ink tracking-tight mb-2">Checkout</h1>
        <div className="flex items-start gap-3 bg-surface-low border border-line rounded-lg px-4 py-3 mb-8 text-sm text-on-surface-variant">
          <ShieldCheck className="w-4 h-4 mt-0.5 shrink-0 text-brand" />
          <p>
            No payment is taken online. Your order goes straight to our team — we confirm pricing,
            freight and payment with you by email before anything ships.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            {step === 1 ? (
              <form onSubmit={handleContinue} className="space-y-5">
                <h2 className="text-lg font-heading font-bold uppercase tracking-wide text-ink mb-2">
                  Shipping details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-ink text-sm">Full name *</Label>
                    <Input required value={shippingDetails.name} onChange={(e) => handleChange("name", e.target.value)} className="bg-white border-line rounded-lg h-11" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-ink text-sm">Email *</Label>
                    <Input required type="email" value={shippingDetails.email} onChange={(e) => handleChange("email", e.target.value)} className="bg-white border-line rounded-lg h-11" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-ink text-sm">Phone *</Label>
                    <Input required value={shippingDetails.phone} onChange={(e) => handleChange("phone", e.target.value)} className="bg-white border-line rounded-lg h-11" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-ink text-sm">Address line 1 *</Label>
                    <Input required value={shippingDetails.address1} onChange={(e) => handleChange("address1", e.target.value)} className="bg-white border-line rounded-lg h-11" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-ink text-sm">Address line 2</Label>
                    <Input value={shippingDetails.address2} onChange={(e) => handleChange("address2", e.target.value)} className="bg-white border-line rounded-lg h-11" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-ink text-sm">Suburb *</Label>
                    <Input required value={shippingDetails.suburb} onChange={(e) => handleChange("suburb", e.target.value)} className="bg-white border-line rounded-lg h-11" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-ink text-sm">State *</Label>
                    <Input required value={shippingDetails.state} onChange={(e) => handleChange("state", e.target.value)} className="bg-white border-line rounded-lg h-11" placeholder="VIC" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-ink text-sm">Postcode *</Label>
                    <Input required value={shippingDetails.postcode} onChange={(e) => handleChange("postcode", e.target.value)} className="bg-white border-line rounded-lg h-11" />
                  </div>
                </div>
                <button type="submit" className="w-full bg-brand hover:bg-brandDark text-white font-bold uppercase tracking-wide text-sm py-4 rounded-lg transition-colors">
                  Continue to review
                </button>
              </form>
            ) : (
              <div className="space-y-6">
                <h2 className="text-lg font-heading font-bold uppercase tracking-wide text-ink">Review &amp; place order</h2>
                <div className="rounded-xl border border-line p-5">
                  <p className="text-sm font-semibold text-ink mb-1">{shippingDetails.name}</p>
                  <p className="text-sm text-on-surface-variant">{shippingDetails.address1}{shippingDetails.address2 ? `, ${shippingDetails.address2}` : ""}</p>
                  <p className="text-sm text-on-surface-variant">{shippingDetails.suburb} {shippingDetails.state} {shippingDetails.postcode}</p>
                  <p className="text-sm text-on-surface-variant mt-1">{shippingDetails.email} · {shippingDetails.phone}</p>
                  <button type="button" onClick={() => setStep(1)} className="text-xs font-semibold text-brand hover:text-brandDark mt-3">
                    Edit details
                  </button>
                </div>

                <div className="rounded-xl border border-line divide-y divide-line">
                  {items.map((item) => (
                    <div key={item.sku} className="flex items-center justify-between px-5 py-3">
                      <div>
                        <p className="text-sm font-medium text-ink">{item.name}</p>
                        <p className="font-mono-spec text-xs text-on-surface-variant">{item.sku} × {item.qty}</p>
                      </div>
                      <span className="font-mono-spec text-sm font-semibold text-ink">{formatCurrency(item.price * item.qty)}</span>
                    </div>
                  ))}
                </div>

                {error && <p className="text-sm text-red-600">{error}</p>}

                <button
                  type="button"
                  onClick={handlePlaceOrder}
                  disabled={submitting}
                  className="w-full bg-brand hover:bg-brandDark text-white font-bold uppercase tracking-wide text-sm py-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                  {submitting ? "Submitting order request..." : "Place order request"}
                </button>
              </div>
            )}
          </div>

          <div className="rounded-xl border border-line p-5 h-fit space-y-3">
            <p className="text-sm font-semibold text-ink flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-brand" /> Order summary
            </p>
            <div className="flex justify-between text-sm text-on-surface-variant">
              <span>Subtotal</span>
              <span className="font-mono-spec">{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm text-on-surface-variant">
              <span>Delivery</span>
              <span className="font-mono-spec">{shipping === 0 ? "Free" : formatCurrency(shipping)}</span>
            </div>
            <div className="flex justify-between text-base font-bold text-ink pt-2 border-t border-line">
              <span>Total</span>
              <span className="font-mono-spec">{formatCurrency(total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
