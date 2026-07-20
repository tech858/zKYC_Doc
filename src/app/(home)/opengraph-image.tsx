import { ImageResponse } from 'next/og';
import { generate as DefaultImage } from 'fumadocs-ui/og';

export const revalidate = false;
export const alt = 'zKYC Docs';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <DefaultImage
        title="zKYC Docs"
        description="Integrate private, reusable identity verification for humans and autonomous agents."
        site="zKYC"
      />
    ),
    size,
  );
}
