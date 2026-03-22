export default function ProductsLoading() {
  return (
    <main className="min-h-screen bg-background pt-24">
      <div className="mx-auto max-w-[1440px] animate-pulse px-8 pb-16">
        <div className="mb-4 h-12 w-56 rounded bg-surface-container-high" />
        <div className="mb-10 h-6 max-w-xl rounded bg-surface-container-high" />

        <div className="mb-10 grid gap-3 lg:grid-cols-[minmax(0,1fr)_200px_200px]">
          <div className="h-12 rounded-lg bg-surface-container-high" />
          <div className="h-12 rounded-lg bg-surface-container-high" />
          <div className="h-12 rounded-lg bg-surface-container-high" />
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-xl border border-gray-100 bg-surface-container-lowest p-2"
            >
              <div className="aspect-[4/3] bg-surface-container-high" />
              <div className="space-y-3 p-4">
                <div className="h-5 w-2/3 rounded bg-surface-container-high" />
                <div className="h-4 w-full rounded bg-surface-container-high" />
                <div className="h-10 w-full rounded bg-surface-container-high" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
