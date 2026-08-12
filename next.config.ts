import type { NextConfig } from 'next';
import createMDX from '@next/mdx';

const config: NextConfig = {
  reactStrictMode: true,
  pageExtensions: ['ts', 'tsx', 'mdx'],

  /**
   * The site ships no bitmap imagery — every visual is SVG or CSS — so the
   * image pipeline exists only for future editorial content.
   */
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [],
  },

  experimental: {
    // Tree-shake barrel imports from the icon and animation libraries so a
    // single `import { Icon } from 'lucide-react'` does not pull the set.
    optimizePackageImports: ['lucide-react', 'framer-motion', 'recharts'],
  },

  /** Security headers. Values mirror what the platform itself enforces. */
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
        ],
      },
      {
        // Fonts are content-addressed by the build and never change in place.
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  async redirects() {
    return [
      { source: '/docs/api', destination: '/api', permanent: true },
      { source: '/demo', destination: '/book-demo', permanent: true },
      { source: '/contact', destination: '/contact-sales', permanent: true },
      { source: '/about', destination: '/company/about', permanent: true },
      { source: '/careers', destination: '/company/careers', permanent: true },
      { source: '/trust', destination: '/security', permanent: true },
    ];
  },
};

const withMDX = createMDX({});

export default withMDX(config);
