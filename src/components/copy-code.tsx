"use client";

import { useEffect, useState } from "react";

interface CopyCodeProps {
  code: string;
  label?: string;
}


export default function CopyCode({ code, label = "Code snippet" }: CopyCodeProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 1500);
    return () => window.clearTimeout(timer);
  }, [copied]);

  async function handleCopy() {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(code);
        setCopied(true);
      }
    } catch (error) {
      console.error("Failed to copy code", error);
    }
  }

  return (
    <div className="not-prose overflow-hidden rounded-xl border border-neutral-800/50 bg-neutral-900/70 shadow-lg">
      <div className="flex items-center justify-between border-b border-neutral-800/60 px-4 py-2 text-sm text-neutral-100">
        <span className="font-medium">{label}</span>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-2 rounded-md bg-white/5 px-3 py-1 text-xs font-semibold text-white ring-1 ring-inset ring-white/10 transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
          aria-live="polite"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto px-4 py-3 text-sm leading-relaxed text-neutral-100">
        <code className="whitespace-pre-wrap font-mono">{code}</code>
      </pre>
    </div>
  );
}
