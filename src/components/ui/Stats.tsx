const ITEMS = [
  { label: "PERFORMANCE", value: "500+", text: "Doors Installed" },
  { label: "LOGISTICS", value: "48hr", text: "Express Manufacturing" },
  { label: "RELIABILITY", value: "24/7", text: "Technical Support" },
];

export default function Stats() {
  return (
    <section className="border-y border-gray-100 bg-background py-20">
      <div className="mx-auto max-w-[1440px] px-8">
        <div className="grid grid-cols-1 gap-12 text-center md:grid-cols-3 md:gap-8">
          {ITEMS.map((item) => (
            <div key={item.label} className="home-highlight-card cursor-pointer rounded-sm px-4 py-6 md:px-6">
              <p className="mb-4 font-body text-xs font-semibold uppercase tracking-[0.2em] text-brand">
                {item.label}
              </p>
              <p className="font-headline text-4xl font-bold text-text-primary md:text-5xl lg:text-6xl">{item.value}</p>
              <p className="mt-3 font-body text-sm text-text-muted">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
