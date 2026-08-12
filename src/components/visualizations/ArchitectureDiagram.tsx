import { Icon, type IconName } from '@/components/primitives';

/**
 * Reference architecture.
 *
 * Four horizontal planes with the trust boundary drawn explicitly. The
 * boundary is the point of the diagram: everything that touches a credential
 * or a production host sits inside the customer network, and the diagram is
 * usually the first thing a security architect asks to see.
 */

interface Tier {
  id: string;
  label: string;
  caption: string;
  tone: 'edge' | 'control' | 'exec' | 'estate';
  blocks: Array<{ label: string; icon?: IconName; note?: string }>;
}

const TIERS: Tier[] = [
  {
    id: 'access',
    label: 'Access plane',
    caption: 'How people and systems reach the platform',
    tone: 'edge',
    blocks: [
      { label: 'Web console', icon: 'grid' },
      { label: 'REST API & webhooks', icon: 'code' },
      { label: 'CLI & SDKs', icon: 'terminal' },
      { label: 'SSO · SAML / OIDC', icon: 'key' },
    ],
  },
  {
    id: 'control',
    label: 'Control plane',
    caption: 'Stateless services, horizontally scaled, no customer credentials at rest',
    tone: 'control',
    blocks: [
      { label: 'Workflow engine', icon: 'workflow', note: 'Durable execution' },
      { label: 'Policy engine', icon: 'shieldCheck', note: 'Pre-execution' },
      { label: 'Knowledge graph', icon: 'network', note: 'Topology & CMDB' },
      { label: 'Intelligence layer', icon: 'sparkles', note: 'Risk · RCA · Copilot' },
      { label: 'Audit ledger', icon: 'book', note: 'Append-only' },
    ],
  },
  {
    id: 'exec',
    label: 'Execution plane',
    caption: 'Runners you deploy; outbound-only connections, no inbound firewall rules',
    tone: 'exec',
    blocks: [
      { label: 'Regional runner', icon: 'server', note: 'EMEA' },
      { label: 'Regional runner', icon: 'server', note: 'AMER' },
      { label: 'Regional runner', icon: 'server', note: 'APAC' },
      { label: 'Secrets broker', icon: 'lock', note: 'Vault · CyberArk' },
    ],
  },
  {
    id: 'estate',
    label: 'Managed estate',
    caption: 'Reached over native protocols — no agent required for discovery',
    tone: 'estate',
    blocks: [
      { label: 'Databases', icon: 'database' },
      { label: 'Operating systems', icon: 'terminal' },
      { label: 'Middleware', icon: 'layers' },
      { label: 'Kubernetes', icon: 'container' },
      { label: 'Cloud accounts', icon: 'cloud' },
    ],
  },
];

export function ArchitectureDiagram() {
  return (
    <div className="arch">
      <div className="arch__boundary" aria-hidden="true">
        <span>Customer network boundary</span>
      </div>

      {TIERS.map((tier, index) => (
        <div key={tier.id} className={`arch__tier is-${tier.tone}`} data-reveal>
          <div className="arch__tier-head">
            <span className="arch__tier-index" data-numeric>
              {String(index + 1).padStart(2, '0')}
            </span>
            <div>
              <h3 className="arch__tier-label">{tier.label}</h3>
              <p className="arch__tier-caption">{tier.caption}</p>
            </div>
          </div>
          <div className="arch__blocks">
            {tier.blocks.map((block) => (
              <div key={block.label + (block.note ?? '')} className="arch__block">
                {block.icon && <Icon name={block.icon} size={15} />}
                <span>
                  <span className="arch__block-label">{block.label}</span>
                  {block.note && <span className="arch__block-note">{block.note}</span>}
                </span>
              </div>
            ))}
          </div>
          {index < TIERS.length - 1 && (
            <div className="arch__link" aria-hidden="true">
              <span />
              <em>
                {index === 0
                  ? 'TLS 1.3 · mutual auth'
                  : index === 1
                    ? 'Outbound gRPC · signed job manifests'
                    : 'SSH · WinRM · native drivers · cloud APIs'}
              </em>
              <span />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
