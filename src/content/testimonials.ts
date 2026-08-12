export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  initials: string;
  metric?: { value: string; label: string };
}

export const testimonials: Testimonial[] = [
  {
    id: 'northwind',
    quote:
      'We were spending eleven weeks a quarter on database patching and still finishing late. The first automated cycle took six days, and the second took four. The difference was not speed of execution — it was that nobody had to negotiate a sequence any more.',
    name: 'Rebecca Ashford',
    role: 'Director of Database Engineering',
    company: 'Northwind Financial',
    initials: 'RA',
    metric: { value: '11 weeks → 6 days', label: 'Quarterly patch cycle' },
  },
  {
    id: 'trellis',
    quote:
      'The dependency graph paid for the platform on its own. We had four services nobody could account for sitting in the path of our signalling stack. Two of them were single points of failure.',
    name: 'Daniel Okonkwo',
    role: 'VP Platform Engineering',
    company: 'Trellis Telecom',
    initials: 'DO',
    metric: { value: '71%', label: 'Reduction in MTTR' },
  },
  {
    id: 'castellan',
    quote:
      'Our regulator asked for evidence of control over privileged database access. Previously that was a six-week exercise across four teams. We exported it in an afternoon, and the auditors accepted it without a follow-up request.',
    name: 'Marta Lindqvist',
    role: 'Head of Technology Risk',
    company: 'Castellan Insurance Group',
    initials: 'ML',
    metric: { value: '6 weeks → 1 day', label: 'Audit evidence preparation' },
  },
  {
    id: 'meridian',
    quote:
      'Clinical systems do not get maintenance windows. Being able to rehearse a cutover against production data, then roll it back cleanly, is what let us move sixty-two hospitals without a single patient-facing outage.',
    name: 'Aaron Feldman',
    role: 'Chief Technology Officer',
    company: 'Meridian Health System',
    initials: 'AF',
    metric: { value: '0', label: 'Patient-facing outages across 62 sites' },
  },
  {
    id: 'auric',
    quote:
      'Plant floors run three shifts. The wave planner understood which lines could take a restart and which could not, because it read our own dependency data rather than a spreadsheet somebody maintained in 2019.',
    name: 'Priya Raghunathan',
    role: 'Global Head of IT Operations',
    company: 'Auric Manufacturing',
    initials: 'PR',
    metric: { value: '112 plants', label: 'Patched without production stoppage' },
  },
  {
    id: 'cobalt',
    quote:
      'We committed to a datacentre exit with a fixed lease end. The migration factory turned a bespoke project into a repeatable production line — we finished four months ahead of the deadline.',
    name: 'James Whitlock',
    role: 'Director of Infrastructure',
    company: 'Cobalt Logistics',
    initials: 'JW',
    metric: { value: '4 months early', label: 'Datacentre exit completed' },
  },
];
