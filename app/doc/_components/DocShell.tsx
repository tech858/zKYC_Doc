'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Sidebar from './Sidebar';

export default function DocShell({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="text-white relative">
      <div className="flex">
        <div
          className={`fixed left-0 top-0 bottom-0 z-30 w-72 transform transition-transform duration-200 ease-in-out lg:static lg:translate-x-0 lg:top-0 ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <Sidebar onNavigate={() => setIsOpen(false)} />
        </div>

        <Button
          type="button"
          variant="outline"
          size="icon"
          className="fixed left-4 top-4 z-40 border-white/20 bg-black/20 backdrop-blur-md text-white hover:bg-white/10 lg:hidden"
          onClick={() => setIsOpen((open) => !open)}
          aria-label="Toggle navigation"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>

        <main className="flex-1 lg:ml-0">
          <div className="mx-auto max-w-5xl px-6 py-12 lg:px-8">{children}</div>
        </main>
      </div>
    </div>
  );
}

