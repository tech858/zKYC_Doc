'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/utils/cn';

type Props = {
  code: string;
  label?: string;
};

export default function CopyCode({ code, label = 'Example' }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch (error) {
      console.error('Failed to copy', error);
    }
  };

  return (
    <div className="overflow-hidden rounded-lg border border-white/10 bg-slate-900/50 backdrop-blur-md shadow-lg">
      <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-4 py-2.5 text-xs text-slate-200">
        <span className="font-medium">{label}</span>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleCopy}
          className="h-7 border-white/20 bg-black/30 text-slate-100 hover:bg-white/10 hover:text-white hover:border-white/30 transition-all"
        >
          {copied ? (
            <>
              <Check className="h-3 w-3 mr-1.5" />
              Copied
            </>
          ) : (
            <>
              <Copy className="h-3 w-3 mr-1.5" />
              Copy
            </>
          )}
        </Button>
      </div>
      <pre className="overflow-x-auto px-4 py-4 text-sm leading-relaxed text-slate-100 font-mono whitespace-pre-wrap">{code}</pre>
    </div>
  );
}

