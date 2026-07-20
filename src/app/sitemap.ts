import type { MetadataRoute } from 'next';
import { source } from '@/lib/source';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://doc.zkyc.tech';

  const docPages: MetadataRoute.Sitemap = source.getPages().map((page) => ({
    url: `${base}${page.url}`,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [
    {
      url: `${base}/`,
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...docPages,
  ];
}
