import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'zKYC Documentation',
};

export default function Home() {
  // For static export, use a client-side redirect
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `if(typeof window !== 'undefined') { window.location.replace('/doc'); }`,
        }}
      />
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-white">Redirecting to documentation...</p>
          <Link href="/doc" className="text-blue-400 hover:text-blue-300 underline">
            Click here if you are not redirected
          </Link>
        </div>
      </div>
    </>
  );
}
