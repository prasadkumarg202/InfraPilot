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

  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
};

const withMDX = createMDX({});

export default withMDX(config);
