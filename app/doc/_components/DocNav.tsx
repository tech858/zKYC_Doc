'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight } from './icons';
import { navSections } from './nav-config';

const orderedRoutes = navSections.flatMap((section) => section.links);

const normalize = (href: string) => (href.endsWith('/') && href !== '/' ? href.slice(0, -1) : href);

export default function DocNav() {
  const pathname = normalize(usePathname() ?? '');
  const index = orderedRoutes.findIndex((route) => normalize(route.href) === pathname);
  const prev = index > 0 ? orderedRoutes[index - 1] : null;
  const next = index >= 0 && index < orderedRoutes.length - 1 ? orderedRoutes[index + 1] : null;

  if (!prev && !next) return null;

  return (
    <nav className="mt-12 pt-8 border-t border-white/10">
      <div className="flex items-center justify-between gap-4">
        {prev ? (
          <Link
            href={prev.href}
            className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 transition-all hover:border-white/20 hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/20"
          >
            <ChevronRight className="h-4 w-4 rotate-180 flex-shrink-0" />
            <div className="flex flex-col">
              <span className="text-xs text-slate-400 font-medium">Previous</span>
              <span className="font-medium">{prev.label}</span>
            </div>
          </Link>
        ) : (
          <div />
        )}

        {next ? (
          <Link
            href={next.href}
            className="flex items-center gap-3 rounded-lg border-2 border-white/20 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition-all hover:border-white/40 hover:bg-white/10 hover:shadow-lg hover:shadow-white/5 focus:outline-none focus:ring-2 focus:ring-white/30"
          >
            <div className="flex flex-col text-left">
              <span className="text-xs text-white/60 font-medium">Next</span>
              <span className="font-semibold">{next.label}</span>
            </div>
            <ChevronRight className="h-4 w-4 flex-shrink-0" />
          </Link>
        ) : (
          <div />
        )}
      </div>
    </nav>
  );
}

