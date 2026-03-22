import { useMemo, useState } from "react";

function normalizeItems(items) {
  if (!Array.isArray(items)) return [];

  return items.map((item, index) => ({
    product_id: item.product_id || `item-${index}`,
    product_title: item.product_title || "Untitled Product",
    product_image: item.product_image || "",
    sku: item.sku || "",
    quantity: Number(item.quantity) > 0 ? Number(item.quantity) : 1,
    unit_price: Number(item.unit_price) > 0 ? Number(item.unit_price) : 0,
  }));
}

function formatCurrency(value) {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    maximumFractionDigits: 2,
  }).format(value || 0);
}

export default function Cart({ initialItems = [] }) {
  const [items, setItems] = useState(() => normalizeItems(initialItems));

  const updateQuantity = (productId, nextQuantity) => {
    const safeQuantity = Number(nextQuantity);

    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.product_id !== productId) return item;
        return {
          ...item,
          quantity: safeQuantity > 0 ? safeQuantity : 1,
        };
      })
    );
  };

  const increment = (productId) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.product_id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decrement = (productId) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.product_id === productId
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      )
    );
  };

  const removeItem = (productId) => {
    setItems((prevItems) => prevItems.filter((item) => item.product_id !== productId));
  };

  const clearCart = () => setItems([]);

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.unit_price * item.quantity, 0),
    [items]
  );

  const totalItems = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  return (
    <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Cart</h2>
        <button
          type="button"
          onClick={clearCart}
          className="text-sm text-slate-400 hover:text-white transition-colors"
          disabled={items.length === 0}
        >
          Clear Cart
        </button>
      </div>

      {items.length === 0 ? (
        <p className="text-slate-400">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {items.map((item) => {
            const lineTotal = item.unit_price * item.quantity;

            return (
              <article
                key={item.product_id}
                className="bg-slate-950 border border-slate-800 rounded-xl p-4"
              >
                <div className="flex gap-4">
                  <div className="w-20 h-20 rounded-lg bg-slate-800 overflow-hidden flex-shrink-0">
                    {item.product_image ? (
                      <img
                        src={item.product_image}
                        alt={item.product_title}
                        className="w-full h-full object-cover"
                      />
                    ) : null}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-white font-semibold leading-tight">{item.product_title}</h3>
                        {item.sku ? <p className="text-xs text-slate-500 mt-1">SKU: {item.sku}</p> : null}
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.product_id)}
                        className="text-xs text-slate-400 hover:text-red-400 transition-colors"
                      >
                        Remove
                      </button>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => decrement(item.product_id)}
                          className="w-8 h-8 rounded-md bg-slate-800 text-slate-300 hover:text-white"
                          aria-label={`Decrease quantity for ${item.product_title}`}
                        >
                          -
                        </button>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(event) => updateQuantity(item.product_id, event.target.value)}
                          className="w-16 h-8 rounded-md bg-slate-800 border border-slate-700 text-white text-center"
                        />
                        <button
                          type="button"
                          onClick={() => increment(item.product_id)}
                          className="w-8 h-8 rounded-md bg-slate-800 text-slate-300 hover:text-white"
                          aria-label={`Increase quantity for ${item.product_title}`}
                        >
                          +
                        </button>
                      </div>

                      <div className="text-right">
                        <p className="text-xs text-slate-400">{formatCurrency(item.unit_price)} each</p>
                        <p className="text-white font-semibold">{formatCurrency(lineTotal)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      <div className="mt-6 pt-5 border-t border-slate-800 flex items-center justify-between">
        <p className="text-slate-400 text-sm">{totalItems} item{totalItems === 1 ? "" : "s"}</p>
        <p className="text-xl font-bold text-white">{formatCurrency(subtotal)}</p>
      </div>
    </section>
  );
}
