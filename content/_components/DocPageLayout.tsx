import type { ReactNode } from "react";

interface DocPageLayoutProps {
  badge?: string;
  title: string;
  description?: string;
  children: ReactNode;
}

export default function DocPageLayout({ badge, title, description, children }: DocPageLayoutProps) {
  return (
    <div className="not-prose space-y-6">
      <header className="space-y-3">
        {badge ? (
          <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white/80">
            {badge}
          </span>
        ) : null}
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold text-white">{title}</h1>
          {description ? <p className="text-slate-300 leading-relaxed">{description}</p> : null}
        </div>
      </header>
      <div className="prose prose-invert max-w-none">
        {children}
      </div>
    </div>
  );
}
