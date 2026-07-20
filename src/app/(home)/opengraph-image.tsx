import { ImageResponse } from 'next/og';
import { ZkycOgImage } from '@/lib/og-image';

export const revalidate = false;
export const alt = 'zKYC Docs';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <ZkycOgImage
        title="zKYC Docs"
        description="Integrate private, reusable identity verification for humans and autonomous agents."
        site="zKYC"
      />
    ),
    size,
  );
}
