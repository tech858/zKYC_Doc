'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

interface HeroBackgroundVideoProps {
  /**
   * Pin the video to the viewport so it persists as a page-level backdrop
   * (docs layout) instead of scrolling away with a single hero section.
   */
  fixed?: boolean;
}

export function HeroBackgroundVideo({ fixed = false }: HeroBackgroundVideoProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const theme = mounted ? resolvedTheme : 'dark';
  const videoSrc = theme === 'dark' ? '/images/hero-glow.mp4' : '/images/hero-glow-light.mp4';

  return (
    <video
      key={videoSrc}
      aria-hidden
      autoPlay
      muted
      loop
      playsInline
      className={
        (fixed ? 'fixed inset-0 -z-20 ' : 'absolute inset-0 ') +
        'pointer-events-none hidden h-full w-full object-cover opacity-70 mix-blend-normal md:block dark:opacity-40 dark:mix-blend-screen'
      }
      style={{
        maskImage: 'radial-gradient(ellipse 70% 65% at 50% 40%, black 0%, transparent 85%)',
        WebkitMaskImage:
          'radial-gradient(ellipse 70% 65% at 50% 40%, black 0%, transparent 85%)',
        filter: theme === 'dark' ? undefined : 'saturate(1.6) contrast(1.15)',
      }}
    >
      <source src={videoSrc} type="video/mp4" />
    </video>
  );
}
