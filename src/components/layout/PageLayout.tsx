import type { ReactNode } from "react";

interface PageLayoutProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export default function PageLayout({ title, description, children }: PageLayoutProps) {
  return (
    <main className="min-h-screen bg-background pb-24 pt-24 md:pb-32 md:pt-28">
      <div className="mx-auto max-w-[1440px] px-8">
        <header className="mb-12 md:mb-16" suppressHydrationWarning>
          <h1 className="font-headline text-4xl font-bold tracking-tight text-text-primary md:text-5xl">{title}</h1>
          {description ? (
            <p className="mt-4 max-w-3xl font-body text-lg leading-relaxed text-text-muted">{description}</p>
          ) : null}
        </header>
        {children}
      </div>
    </main>
  );
}
