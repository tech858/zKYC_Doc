import Hero from '@/components/hero';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Documentation',
  description:
    'Integrate private, reusable identity verification for humans and autonomous agents — SDKs, APIs, and pricing for Human KYC and Agent KYA.',
};

export default function HomePage() {
  return (
    <div className="flex flex-1 flex-col">
      <Hero />
    </div>
  );
}
