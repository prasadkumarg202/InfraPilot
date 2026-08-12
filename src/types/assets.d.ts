/**
 * Ambient declarations for non-code imports.
 *
 * `next-env.d.ts` normally supplies these, but Next regenerates that file on
 * every build and would drop anything added to it. Keeping the declarations
 * here means they survive, and means `tsc --noEmit` succeeds without a Next
 * build having been run first.
 */

declare module '*.css';
declare module '*.svg' {
  const src: string;
  export default src;
}
