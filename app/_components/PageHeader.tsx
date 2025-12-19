import { Badge } from '@/components/ui/badge';

type PageHeaderProps = {
  badge?: string;
  title: string;
  description?: string;
  metadata?: string | React.ReactNode;
};

export default function PageHeader({ badge, title, description, metadata }: PageHeaderProps) {
  return (
    <header className="space-y-4 mb-8">
      {badge && (
        <Badge className="bg-blue-600/25 text-blue-100 border-blue-600/30">
          {badge}
        </Badge>
      )}
      <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl leading-tight">{title}</h1>
      {description && <p className="max-w-3xl text-lg text-slate-300 leading-relaxed">{description}</p>}
      {metadata && <p className="text-lg text-slate-300 leading-relaxed">{metadata}</p>}
    </header>
  );
}

