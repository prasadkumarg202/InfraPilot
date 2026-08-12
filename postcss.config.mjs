/**
 * Tailwind is present for utility work in future product surfaces. The
 * marketing site's visual truth lives in the token-driven CSS under
 * `src/styles`, which Tailwind's preflight is configured not to disturb.
 */
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

export default config;
