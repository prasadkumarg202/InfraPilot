/**
 * Island registry.
 *
 * The marketing site is server-rendered. Components that need real
 * interactivity — the live dashboards, the dependency graph, the demo
 * players — are mounted as isolated hydration roots ("islands") rather than
 * hydrating the whole document. This keeps the main thread free during load
 * and means a failure in one widget can't blank the page.
 *
 * In the Next.js build these same components are plain `"use client"`
 * components and the framework handles the boundary; `Island` degrades to a
 * transparent wrapper. The component source is identical either way.
 */

import type { ComponentType, ReactNode } from 'react';

export interface IslandProps<P> {
  /** Registry key. Must match the export name in `island-registry`. */
  name: string;
  /** Serializable props handed to the client component on hydration. */
  props?: P;
  children: ReactNode;
}

export function Island<P>({ name, props, children }: IslandProps<P>) {
  return (
    <div
      data-island={name}
      data-island-props={props ? JSON.stringify(props) : undefined}
      style={{ display: 'contents' }}
    >
      {children}
    </div>
  );
}

export type IslandComponent = ComponentType<Record<string, unknown>>;
export type IslandRegistry = Record<string, IslandComponent>;
