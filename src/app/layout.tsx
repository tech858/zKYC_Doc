import { RootProvider } from 'fumadocs-ui/provider/next';
import './global.css';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';

const inter = Inter({
  subsets: ['latin'],
});

const title = 'zKYC Docs';
const description =
  'Integrate private, reusable identity verification for humans and autonomous agents — SDKs, APIs, and pricing for Human KYC and Agent KYA.';

export const metadata: Metadata = {
  metadataBase: new URL('https://doc.zkyc.tech'),
  title: {
    default: `${title} — Secure, Private KYC Verification`,
    template: `%s | ${title}`,
  },
  description,
  openGraph: {
    type: 'website',
    siteName: title,
    title: `${title} — Secure, Private KYC Verification`,
    description,
    url: '/',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${title} — Secure, Private KYC Verification`,
    description,
  },
};

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider theme={{ defaultTheme: 'dark' }}>{children}</RootProvider>
      </body>
    </html>
  );
}
