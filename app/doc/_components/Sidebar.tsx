'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { navSections } from './nav-config';
import { cn } from '@/utils/cn';

type Props = {
  onNavigate?: () => void;
};

const isActivePath = (currentPath: string, href: string) => {
  // Normalize paths (remove trailing slashes for comparison, except root)
  const normalize = (path: string) => (path.endsWith('/') && path !== '/' ? path.slice(0, -1) : path);
  const normalizedCurrent = normalize(currentPath);
  const normalizedHref = normalize(href);
  
  // Only exact matches - each nav link points to a specific page
  return normalizedCurrent === normalizedHref;
};

export default function Sidebar({ onNavigate }: Props) {
  const pathname = usePathname();

  return (
    <aside className="flex h-full flex-col border-r border-white/10 bg-black/20 backdrop-blur-md text-white">
      <div className="border-b border-white/10 px-4 py-5">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/zKYC_Icon.png"
            alt="zKYC"
            width={28}
            height={28}
            className="rounded-lg"
          />
          <div>
            <div className="text-xl font-bold tracking-tight">zKYC Docs</div>
            <p className="text-xs text-slate-400">Privacy-first identity verification</p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 space-y-6 overflow-y-auto px-4 py-5">
        {navSections.map((section) => (
          <div key={section.title} className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">{section.title}</p>
            <ul className="space-y-1">
              {section.links.map((link) => {
                const active = isActivePath(pathname, link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={onNavigate}
                      className={cn(
                        'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
                        active
                          ? 'bg-white text-black font-semibold'
                          : 'text-slate-300 hover:bg-white/10 hover:text-white',
                      )}
                    >
                      <span className="flex-1">{link.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="border-t border-white/10 px-4 py-4 text-xs text-slate-400">
        Built with Next.js 16 · Minimal static docs
      </div>
    </aside>
  );
}

