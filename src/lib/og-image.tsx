import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { ReactNode } from 'react';

let backgroundDataUri: string | null = null;

function getBackgroundDataUri() {
  if (!backgroundDataUri) {
    const filePath = join(process.cwd(), 'public', 'images', 'og-background.png');
    backgroundDataUri = `data:image/png;base64,${readFileSync(filePath).toString('base64')}`;
  }
  return backgroundDataUri;
}

export function ZkycOgImage({
  title,
  description,
  site = 'zKYC',
}: {
  title: ReactNode;
  description?: ReactNode;
  site?: ReactNode;
}) {
  return (
    <div style={{ display: 'flex', width: '100%', height: '100%', position: 'relative' }}>
      <img
        src={getBackgroundDataUri()}
        width={1200}
        height={630}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
      />
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          backgroundImage:
            'linear-gradient(to top, rgba(5,5,15,0.92) 12%, rgba(5,5,15,0.4) 55%, rgba(5,5,15,0.05) 100%)',
        }}
      />
      <div
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          width: '100%',
          height: '100%',
          padding: '4rem',
          color: 'white',
        }}
      >
        <p
          style={{
            fontSize: 36,
            fontWeight: 600,
            color: 'rgb(196,181,253)',
            margin: 0,
            marginBottom: 8,
          }}
        >
          {site}
        </p>
        <p style={{ fontSize: 68, fontWeight: 800, margin: 0, lineHeight: 1.15, maxWidth: 980 }}>
          {title}
        </p>
        {description ? (
          <p
            style={{
              fontSize: 32,
              color: 'rgba(240,240,240,0.8)',
              marginTop: 16,
              marginBottom: 0,
              maxWidth: 900,
            }}
          >
            {description}
          </p>
        ) : null}
      </div>
    </div>
  );
}
