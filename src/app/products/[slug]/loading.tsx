export default function ProductDetailLoading() {
  return (
    <main className="min-h-screen bg-background">
      <div className="h-[380px] animate-pulse bg-surface-container-high md:h-[460px]" />
      <div className="mx-auto max-w-[1440px] animate-pulse px-8 pb-16 pt-24">
        <div className="mb-10 h-4 w-64 rounded bg-surface-container-high" />

        <div className="grid gap-10 lg:grid-cols-2">
          <div className="h-[420px] rounded-lg bg-surface-container-high" />
          <div className="space-y-4">
            <div className="h-4 w-28 rounded bg-surface-container-high" />
            <div className="h-12 w-4/5 rounded bg-surface-container-high" />
            <div className="h-28 rounded-lg bg-surface-container-high" />
          </div>
        </div>

        <div className="mt-16">
          <div className="mb-6 h-8 w-56 rounded bg-surface-container-high" />
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="rounded-lg border border-gray-100 bg-surface-container-lowest p-2">
                <div className="aspect-[4/3] rounded-sm bg-surface-container-high" />
                <div className="space-y-2 p-3 pt-4">
                  <div className="h-5 w-2/3 rounded bg-surface-container-high" />
                  <div className="h-10 w-full rounded bg-surface-container-high" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
