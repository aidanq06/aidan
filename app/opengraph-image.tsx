import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Aidan Quach - working on RL environments at afterquery (yc w25)'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px',
          background: 'linear-gradient(135deg, #0b1020 0%, #111827 55%, #0f172a 100%)',
          color: '#f8fafc',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '-140px',
            right: '-90px',
            width: '380px',
            height: '380px',
            borderRadius: '9999px',
            background: 'rgba(56, 189, 248, 0.16)',
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-180px',
            left: '-120px',
            width: '460px',
            height: '460px',
            borderRadius: '9999px',
            background: 'rgba(99, 102, 241, 0.14)',
            display: 'flex',
          }}
        />

        <div
          style={{
            display: 'flex',
            fontSize: 24,
            letterSpacing: 4,
            color: '#93c5fd',
            fontWeight: 600,
          }}
        >
          AIDAN QUACH
        </div>

        <div
          style={{
            display: 'flex',
            maxWidth: '980px',
            fontSize: 64,
            lineHeight: 1.07,
            fontWeight: 700,
            textWrap: 'balance',
          }}
        >
          working on RL environments at afterquery (yc w25)
        </div>

        <div
          style={{
            display: 'flex',
            fontSize: 28,
            color: '#cbd5e1',
            fontWeight: 500,
          }}
        >
          aidanquach.dev
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
