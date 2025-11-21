import { ReactNode } from 'react';
import type { Metadata, Viewport } from 'next';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

import { InstanaEumScripts } from 'common/instanaEumScripts';
import { AppProviders } from './providers';

// Import global styles (previously from pages/_app.tsx)
import 'public/index.css';

export const metadata: Metadata = {
  title: 'Coolboard - Hands-on Application Building with GraphQL',
  description:
    'Working live demo of /building an entire Trello-like application using GraphQL and React/ video course on PacktPub.com',

  twitter: {
    card: 'summary_large_image',
    site: '@rhosts',
    creator: '@rhosts',
    title: 'coolboard: graphql trello clone',
    description:
      'Working live demo of /building an entire Trello-like application using GraphQL and React/ video course on PacktPub.com',
    images: ['/screenshot.png'],
  },
  icons: {
    icon: [
      { url: '/favicons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicons/favicon.ico' },
    ],
    apple: [{ url: '/favicons/apple-touch-icon.png', sizes: '180x180' }],
    other: [
      {
        rel: 'mask-icon',
        url: '/favicons/safari-pinned-tab.svg',
        color: '#ffffff',
      },
      { rel: 'shortcut icon', url: '/favicons/favicon.ico' },
    ],
  },
  manifest: '/favicons/site.webmanifest',
};

export const viewport: Viewport = {
  themeColor: '#27ae60',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AppProviders>{children}</AppProviders>
        {/* Analytics tools */}
        <Analytics />
        <SpeedInsights />
        {/* Custom EUM scripts */}
        <InstanaEumScripts />
      </body>
    </html>
  );
}
