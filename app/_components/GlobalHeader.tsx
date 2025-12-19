import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

/**
 * Global header component that appears on all pages.
 * Provides consistent site-wide navigation.
 */
export default function GlobalHeader() {
  return (
    <header className="border-b border-white/10 bg-black/20 backdrop-blur-md sticky top-0 z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link 
          href="/" 
          className="flex items-center gap-3 text-xl font-bold tracking-tight text-white hover:text-slate-200 transition-colors"
        >
          <Image
            src="/zKYC_Icon.png"
            alt="zKYC"
            width={32}
            height={32}
            className="rounded-lg"
          />
          <span>zKYC Docs</span>
        </Link>
        <nav className="flex items-center gap-4">
          <Button
            asChild
            variant="ghost"
            className="text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10"
          >
            <Link href="/doc">
              Documentation
            </Link>
          </Button>
          <Button
            asChild
            variant="ghost"
            className="text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10"
          >
            <Link href="/doc/sdk-integration">
              SDK Integration
            </Link>
          </Button>
          <Button
            asChild
            variant="ghost"
            className="text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10"
          >
            <Link href="/doc/pricing">
              Pricing
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}

