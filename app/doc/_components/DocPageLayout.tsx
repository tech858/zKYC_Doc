import DocNav from './DocNav';
import PageLayout from '../../_components/PageLayout';

type DocPageLayoutProps = {
  badge?: string;
  title: string;
  description?: string;
  metadata?: string | React.ReactNode;
  children: React.ReactNode;
  className?: string;
  showNav?: boolean;
};

/**
 * Specialized page layout for documentation pages.
 * Includes the standard PageLayout plus DocNav for navigation between docs.
 */
export default function DocPageLayout({
  badge,
  title,
  description,
  metadata,
  children,
  className = '',
  showNav = true,
}: DocPageLayoutProps) {
  return (
    <PageLayout
      badge={badge}
      title={title}
      description={description}
      metadata={metadata}
      className={className}
    >
      {children}
      {showNav && <DocNav />}
    </PageLayout>
  );
}

