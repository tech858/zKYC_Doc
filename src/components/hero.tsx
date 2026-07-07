'use client';

import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import { HeroBackgroundVideo } from '@/components/hero-background-video';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: custom },
  }),
};

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <HeroBackgroundVideo />

      <div className="relative mx-auto max-w-6xl px-4 py-20 text-center sm:px-8 sm:py-36">
        <motion.span
          initial="hidden"
          animate="visible"
          custom={0.1}
          variants={fadeUp}
          className="glass-card inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide text-violet-700 dark:text-violet-300"
        >
          Documentation
        </motion.span>

        <motion.h1
          initial="hidden"
          animate="visible"
          custom={0.16}
          variants={fadeUp}
          className="mt-6 text-4xl font-semibold sm:text-5xl"
        >
          <span className="grad-text">zKYC</span>{' '}
          <span className="text-slate-900 dark:text-white">Documentation</span>
        </motion.h1>

        <motion.p
          initial="hidden"
          animate="visible"
          custom={0.24}
          variants={fadeUp}
          className="mx-auto mt-4 max-w-2xl leading-relaxed text-slate-600 dark:text-white/55"
        >
          Integrate private, reusable identity verification for humans and autonomous
          agents — SDKs, APIs, and pricing for Human KYC and Agent KYA.
        </motion.p>

        <motion.div
          initial="hidden"
          animate="visible"
          custom={0.34}
          variants={fadeUp}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            href="/docs/get-started/overview"
            className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-slate-800 dark:bg-white dark:text-black dark:hover:bg-white/90"
          >
            View Docs →
          </Link>
          <Link
            href="/docs/pricing/01-zKYC"
            className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-600 transition-all duration-300 hover:border-slate-400 hover:text-slate-900 dark:border-white/12 dark:text-white/60 dark:hover:border-white/22 dark:hover:text-white"
          >
            View Pricing
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
