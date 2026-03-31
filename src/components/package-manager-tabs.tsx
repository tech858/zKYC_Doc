"use client";

import { useState } from "react";
import {
  CodeBlockTabs,
  CodeBlockTabsList,
  CodeBlockTabsTrigger,
  CodeBlockTab,
} from "fumadocs-ui/components/codeblock";

const MANAGERS = ["npm", "yarn", "pnpm", "bun"] as const;
type Manager = (typeof MANAGERS)[number];

function getCommand(manager: Manager, packageName: string): string {
  switch (manager) {
    case "npm":
      return `npm install ${packageName}`;
    case "yarn":
      return `yarn add ${packageName}`;
    case "pnpm":
      return `pnpm add ${packageName}`;
    case "bun":
      return `bun add ${packageName}`;
  }
}

interface PackageManagerTabsProps {
  packageName: string;
}

export default function PackageManagerTabs({ packageName }: PackageManagerTabsProps) {
  const [copied, setCopied] = useState<Manager | null>(null);

  async function handleCopy(manager: Manager) {
    try {
      await navigator.clipboard.writeText(getCommand(manager, packageName));
      setCopied(manager);
      setTimeout(() => setCopied(null), 1500);
    } catch {
      // clipboard not available
    }
  }

  return (
    <CodeBlockTabs defaultValue="npm">
      <CodeBlockTabsList>
        {MANAGERS.map((m) => (
          <CodeBlockTabsTrigger key={m} value={m}>
            {m}
          </CodeBlockTabsTrigger>
        ))}
      </CodeBlockTabsList>
      {MANAGERS.map((m) => (
        <CodeBlockTab key={m} value={m}>
          <div className="relative">
            <pre className="overflow-x-auto px-4 py-3 text-sm">
              <code>{getCommand(m, packageName)}</code>
            </pre>
            <button
              type="button"
              onClick={() => handleCopy(m)}
              className="absolute right-3 top-2 rounded-md bg-white/5 px-2 py-1 text-xs text-neutral-300 ring-1 ring-inset ring-white/10 transition hover:bg-white/10"
              aria-live="polite"
            >
              {copied === m ? "Copied" : "Copy"}
            </button>
          </div>
        </CodeBlockTab>
      ))}
    </CodeBlockTabs>
  );
}
