/**
 * Reference customers.
 *
 * Fictional enterprises used throughout the site for logo walls, case studies
 * and dashboard sample data. Names, sectors and figures are internally
 * consistent so the same organisation reads the same way on every page.
 */

export interface Customer {
  id: string;
  name: string;
  /** Short form used inside the logo lockup. */
  wordmark: string;
  sector: string;
  /** Geometric mark drawn on a 24×24 grid. */
  mark: 'orbit' | 'prism' | 'arc' | 'grid' | 'shield' | 'wave' | 'delta' | 'hex';
  region: string;
  estate: string;
  headline?: string;
}

export const customers: Customer[] = [
  {
    id: 'northwind',
    name: 'Northwind Financial',
    wordmark: 'NORTHWIND',
    sector: 'Banking & capital markets',
    mark: 'orbit',
    region: 'North America',
    estate: '18,400 database instances',
    headline: 'Cut quarterly patch execution from 11 weeks to 6 days',
  },
  {
    id: 'castellan',
    name: 'Castellan Insurance Group',
    wordmark: 'CASTELLAN',
    sector: 'Insurance',
    mark: 'shield',
    region: 'Europe',
    estate: '9,700 servers across 14 countries',
    headline: 'Continuous evidence for Solvency II and DORA',
  },
  {
    id: 'meridian',
    name: 'Meridian Health System',
    wordmark: 'MERIDIAN',
    sector: 'Healthcare',
    mark: 'arc',
    region: 'North America',
    estate: '340 clinical applications',
    headline: 'Zero downtime across 62 hospital migrations',
  },
  {
    id: 'trellis',
    name: 'Trellis Telecom',
    wordmark: 'TRELLIS',
    sector: 'Telecommunications',
    mark: 'wave',
    region: 'APAC',
    estate: '41,000 nodes',
    headline: 'MTTR down 71% on the core signalling estate',
  },
  {
    id: 'auric',
    name: 'Auric Manufacturing',
    wordmark: 'AURIC',
    sector: 'Manufacturing',
    mark: 'hex',
    region: 'Europe',
    estate: '112 plants, 6,800 edge servers',
    headline: 'Plant-floor patching without production stoppage',
  },
  {
    id: 'volta',
    name: 'Volta Energy',
    wordmark: 'VOLTA',
    sector: 'Energy & utilities',
    mark: 'delta',
    region: 'North America',
    estate: '7,200 OT and IT systems',
    headline: 'NERC CIP evidence generated continuously',
  },
  {
    id: 'halden',
    name: 'Halden Retail Group',
    wordmark: 'HALDEN',
    sector: 'Retail',
    mark: 'grid',
    region: 'Global',
    estate: '2,100 stores, 14,000 endpoints',
    headline: 'Peak-season change freeze cut from 9 weeks to 2',
  },
  {
    id: 'sentinel',
    name: 'Sentinel Federal',
    wordmark: 'SENTINEL',
    sector: 'Public sector',
    mark: 'prism',
    region: 'North America',
    estate: 'Accredited federal environment',
    headline: 'Automation operating inside the authorisation boundary',
  },
  {
    id: 'lumen',
    name: 'Lumen Biosciences',
    wordmark: 'LUMEN',
    sector: 'Life sciences',
    mark: 'orbit',
    region: 'Europe',
    estate: 'GxP-validated estate',
    headline: 'Validated change with automated 21 CFR Part 11 records',
  },
  {
    id: 'cobalt',
    name: 'Cobalt Logistics',
    wordmark: 'COBALT',
    sector: 'Transport & logistics',
    mark: 'delta',
    region: 'Global',
    estate: '5,400 instances, 38 regions',
    headline: 'Datacentre exit completed four months early',
  },
  {
    id: 'pinnacle',
    name: 'Pinnacle Airways',
    wordmark: 'PINNACLE',
    sector: 'Aviation',
    mark: 'wave',
    region: 'North America',
    estate: '3,900 systems',
    headline: 'Change failure rate reduced to 0.4%',
  },
  {
    id: 'corvid',
    name: 'Corvid Bank',
    wordmark: 'CORVID',
    sector: 'Banking',
    mark: 'hex',
    region: 'APAC',
    estate: '12,600 instances',
    headline: 'Core banking upgrade delivered in a single weekend',
  },
];

export function customerById(id: string): Customer {
  const found = customers.find((c) => c.id === id);
  if (!found) throw new Error(`Unknown customer: ${id}`);
  return found;
}

/** Headline proof points used on the home page and in the executive deck. */
export const proofMetrics = [
  {
    value: '92%',
    label: 'Patch automation coverage reached',
    detail: 'Fortune 100 bank, from a 34% baseline, across 18,400 instances',
  },
  {
    value: '41m → 3.2m',
    label: 'Mean time to restore',
    detail: 'Hospital network, 340 clinical applications across 62 sites',
  },
  {
    value: '400',
    label: 'Database migrations in eleven weeks',
    detail: 'Tier-1 telecom datacentre exit, delivered four months early',
  },
  {
    value: '$4.2M',
    label: 'Annual operating cost avoided',
    detail: 'Single customer, measured against their own prior baseline',
  },
];
