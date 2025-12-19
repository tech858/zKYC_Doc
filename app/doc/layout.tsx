import type { Metadata } from 'next';
import DocShell from './_components/DocShell';

export const metadata: Metadata = {
  title: 'zKYC Documentation',
  description: 'Integrate zKYC with a minimal, privacy-first workflow.',
};

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return <DocShell>{children}</DocShell>;
}

