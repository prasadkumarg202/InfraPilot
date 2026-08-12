/**
 * Maps island names to their client components for the static harness.
 * Kept separate from the entry so the bundle graph is explicit and easy to
 * audit — anything not listed here is never shipped to the browser.
 */

import type { IslandRegistry } from '@/lib/islands';
import { Header } from '@/components/layout/Header';
import { DemoTheatre } from '@/components/demos/DemoTheatre';
import { Accordion } from '@/components/marketing/Accordion';

export const registry: IslandRegistry = {
  Header: Header as IslandRegistry[string],
  Accordion: Accordion as IslandRegistry[string],
  DemoTheatre: DemoTheatre as IslandRegistry[string],
};
