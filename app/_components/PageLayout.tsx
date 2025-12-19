import PageHeader from './PageHeader';

type PageLayoutProps = {
  badge?: string;
  title: string;
  description?: string;
  metadata?: string | React.ReactNode;
  children: React.ReactNode;
  className?: string;
};

/**
 * Reusable page layout component for consistent page structure.
 * Provides header with badge, title, description, and content area.
 */
export default function PageLayout({
  badge,
  title,
  description,
  metadata,
  children,
  className = '',
}: PageLayoutProps) {
  return (
    <div className={`space-y-12 ${className}`}>
      <PageHeader badge={badge} title={title} description={description} metadata={metadata} />
      <div className="prose prose-invert max-w-none">
        {children}
      </div>
    </div>
  );
}

