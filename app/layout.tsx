import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: 'zKYC Documentation',
    template: '%s | zKYC Docs',
  },
  description: 'Minimal Next.js 16 docs for integrating the zKYC SDK.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://docs.zkyc.tech'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased hero-bg text-white relative font-sans min-h-screen`}
      >
        {/* Decorative blurred circle similar to landing page - fixed to viewport */}
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/20 rounded-full blur-[150px] pointer-events-none z-0" />
        <div className="relative z-10 w-full">
          {children}
        </div>
      </body>
    </html>
  );
}
