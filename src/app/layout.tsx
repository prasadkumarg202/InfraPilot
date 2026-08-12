import type { Metadata, Viewport } from 'next';
import './globals.css';
import { site } from '@/content/site.config';
import { organizationSchema, websiteSchema, softwareApplicationSchema } from '@/lib/seo';

/**
 * Root layout.
 *
 * Fonts are self-hosted variable files rather than fetched from a third party:
 * one request per family, no render-blocking DNS to a font CDN, and no
 * third-party request for a visitor's browser to make on a page that talks
 * about data residency.
 *
 * The @font-face rules live in `src/styles/tokens.css` rather than in
 * `next/font/local` on purpose. The same stylesheet is consumed by the offline
 * render harness in `tools/`, so declaring the faces twice — once here, once
 * there — would let the two builds drift apart on the exact thing that is
 * hardest to spot in a screenshot. One declaration, two consumers. The cost is
 * that the preload hints below have to be written by hand.
 */

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline} for Modern Enterprises`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  generator: `${site.name} Web Platform`,
  authors: [{ name: site.legalName, url: site.url }],
  creator: site.legalName,
  publisher: site.legalName,
  formatDetection: { telephone: false },
  manifest: '/site.webmanifest',
  icons: {
    icon: [{ url: '/brand/favicon.svg', type: 'image/svg+xml' }],
    apple: [{ url: '/brand/apple-touch-icon.png', sizes: '180x180' }],
  },
  alternates: { canonical: '/' },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  colorScheme: 'dark light',
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#060b16' },
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
  ],
};

/**
 * Applies the stored theme before first paint. Inlined deliberately: any
 * deferred alternative produces a visible flash of the wrong palette, which is
 * far more jarring than a 300-byte blocking script.
 */
const THEME_BOOTSTRAP = `
(function () {
  var d = document.documentElement;
  d.classList.remove('no-js');
  try {
    var stored = localStorage.getItem('infrapilot-theme');
    d.setAttribute('data-theme', stored || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'));
  } catch (e) {
    d.setAttribute('data-theme', 'dark');
  }
})();
`.trim();

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className="no-js"
      suppressHydrationWarning
    >
      <head>
        <link
          rel="preload"
          href="/fonts/NotoSans-Variable.woff"
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/AnekLatin-Variable.woff"
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        />
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOTSTRAP }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              organizationSchema(),
              websiteSchema(),
              softwareApplicationSchema(),
            ]),
          }}
        />
      </head>
      <body>
        <a className="skip-link" href="#main">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
