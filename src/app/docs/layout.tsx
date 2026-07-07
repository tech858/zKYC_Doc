import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';
import { HeroBackgroundVideo } from '@/components/hero-background-video';

export default function Layout({ children }: LayoutProps<'/docs'>) {
  return (
    <>
      <HeroBackgroundVideo fixed />
      <DocsLayout tree={source.pageTree} {...baseOptions()}>
        {children}
      </DocsLayout>
    </>
  );
}
