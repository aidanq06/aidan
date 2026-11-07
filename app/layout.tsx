import './portfolio.css'
import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/next'

export const metadata: Metadata = {
  metadataBase: new URL('https://aidanquach.dev'),
  title: 'Aidan Quach - Portfolio',
  description: 'incoming at palantir & rippling · previously at raymond james & afterquery',
  openGraph: {
    title: 'Aidan Quach - Portfolio',
    description: 'incoming at palantir & rippling · previously at raymond james & afterquery',
    url: 'https://aidanquach.dev',
    siteName: 'Aidan Quach',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Aidan Quach - incoming at palantir & rippling · previously at raymond james & afterquery',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aidan Quach - Portfolio',
    description: 'incoming at palantir & rippling · previously at raymond james & afterquery',
    images: ['/opengraph-image'],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: "try{document.documentElement.dataset.theme=localStorage.getItem('aq-portfolio-theme')==='light'?'light':'dark'}catch(e){}" }} /></head>
      <body className="transcript">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
