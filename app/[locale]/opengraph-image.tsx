import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Fernando Rodriguez Memije — Senior Software Engineer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #16213e 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
          }}
        >
          <div
            style={{
              fontSize: 64,
              fontWeight: 800,
              background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
              backgroundClip: 'text',
              color: 'transparent',
              lineHeight: 1.1,
            }}
          >
            Fernando Rodriguez Memije
          </div>
          <div
            style={{
              fontSize: 32,
              color: '#94a3b8',
              fontWeight: 500,
            }}
          >
            Senior Software Engineer
          </div>
          <div
            style={{
              display: 'flex',
              gap: '12px',
              marginTop: '16px',
            }}
          >
            {['React', 'Node.js', 'TypeScript', 'Python', 'AWS', 'Docker'].map(
              (tech) => (
                <div
                  key={tech}
                  style={{
                    padding: '8px 20px',
                    borderRadius: '12px',
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    color: '#cbd5e1',
                    fontSize: 18,
                    fontWeight: 500,
                  }}
                >
                  {tech}
                </div>
              )
            )}
          </div>
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: '60px',
            right: '80px',
            fontSize: 20,
            color: '#64748b',
          }}
        >
          fernandomemije.dev
        </div>
      </div>
    ),
    { ...size }
  );
}
