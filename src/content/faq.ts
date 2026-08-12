/**
 * FAQ content shared between a page's body and its JSON-LD.
 *
 * Kept in the content layer rather than inside a route file so the same
 * questions feed both the rendered accordion and the FAQPage structured data
 * without any risk of the two drifting apart.
 */

export interface FaqEntry {
  question: string;
  answer: string;
}

export const homeFaq: FaqEntry[] = [
  {
    question: 'How long does it take to see value from Infrapilot?',
    answer:
      'Discovery typically returns a complete estate inventory within 48 hours of deployment, without agents. Most customers run their first governed automated change in week two of a proof of concept.',
  },
  {
    question: 'Does Infrapilot replace our existing automation tooling?',
    answer:
      'No. Infrapilot orchestrates the tooling you already run — Ansible, PowerShell, Terraform, Python — and adds the dependency awareness, policy enforcement, approval routing and audit record that scripts alone do not provide.',
  },
  {
    question: 'Where does Infrapilot run and where does our data live?',
    answer:
      'Infrapilot deploys as a self-hosted control plane inside your network, or as a dedicated single-tenant cloud instance in the region you choose. Credentials are never stored by the platform; they are brokered per execution from your existing vault.',
  },
];

export const securityFaq: FaqEntry[] = [
  {
    question: 'Does Infrapilot store our credentials?',
    answer:
      'No. Credentials are requested from your broker — CyberArk, HashiCorp Vault, Azure Key Vault or an equivalent — at the moment a step begins, held in runner memory for the duration of that step, and revoked on completion. Nothing is written to disk and nothing is persisted in the control plane.',
  },
  {
    question: 'What network access does the platform require?',
    answer:
      'Runners establish outbound TLS 1.3 connections to the control plane. No inbound firewall rules, no VPN into your estate and no public exposure of managed systems are required. In self-hosted deployments the control plane never leaves your network at all.',
  },
  {
    question: 'Is our data used to train models?',
    answer:
      'Never. Risk models are trained per tenant on that tenant’s own change history and are not shared across customers. Copilot uses retrieval over your data at inference time; prompts and responses are not retained for training and are excluded from any foundation-model provider’s training pipeline by contract.',
  },
  {
    question: 'How do you handle a compromised runner?',
    answer:
      'Runners hold no long-lived credentials and no customer data at rest, which limits the value of a compromise. Each runner has an individually revocable identity; revoking it terminates in-flight leases immediately. Runner binaries are signed and verified on start, and job manifests are signed by the control plane.',
  },
  {
    question: 'Can we audit what the platform did?',
    answer:
      'Every action, parameter, approval, output and policy decision is written to an append-only ledger with cryptographic chaining, so any modification is detectable. The ledger is queryable over API and exportable to your SIEM. Retention is twelve months on Foundation, seven years on Enterprise, and configurable on Sovereign.',
  },
  {
    question: 'How are vulnerabilities in the platform handled?',
    answer:
      'We run continuous dependency and container scanning, annual third-party penetration testing with summary reports available under NDA, and a coordinated disclosure programme. Critical findings are remediated within seven days and communicated to affected customers within the contractual notification window.',
  },
];

export const designSystemFaq: FaqEntry[] = [
  {
    question: 'Why a custom design system rather than a component library?',
    answer:
      'Off-the-shelf libraries carry visual defaults that a hundred other products also carry. The tokens here are authored specifically for dense operational interfaces on a dark canvas — the neutral ramp is blue-shifted so the accent does not turn it muddy, and elevation reads through light bloom rather than drop shadow.',
  },
  {
    question: 'How is dark and light mode handled?',
    answer:
      'Light mode is not an inversion. It drops the ambient field to near nothing, moves depth cues from bloom to shadow, and darkens both accents so they clear 4.5:1 against white. Every semantic token is redefined per theme rather than algorithmically flipped.',
  },
  {
    question: 'What accessibility standard does this meet?',
    answer:
      'WCAG 2.2 AA. Body text clears 7:1 against its background in both themes, interactive targets are at least 44×44 CSS pixels on touch, focus is visible for keyboard users only, and every ambient animation stops entirely under prefers-reduced-motion.',
  },
];
