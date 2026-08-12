import { Icon, Badge } from '@/components/primitives';

/**
 * Policy panel.
 *
 * Shows the guardrail definition alongside the decision it produced. Pairing
 * the two is the point: an engineer who is denied should be able to read the
 * rule that stopped them and fix the request themselves.
 */

const CHECKS = [
  { label: 'Approved maintenance window', result: 'pass', detail: 'CW-2841 · 02:00–08:00 UTC' },
  { label: 'Change risk below threshold', result: 'pass', detail: '18 / 100 (limit 40)' },
  { label: 'Backup verified within 24h', result: 'pass', detail: '2,101 of 2,104 · 3 remediated' },
  { label: 'Quorum preserved per wave', result: 'pass', detail: '38 availability groups' },
  { label: 'Blast radius within limit', result: 'pass', detail: '238 of 2,104 per wave' },
  { label: 'Credentials brokered just-in-time', result: 'pass', detail: 'CyberArk · 15 min TTL' },
  { label: 'Production freeze not active', result: 'warn', detail: 'Freeze begins in 6 days' },
];

export function PolicyPanel() {
  return (
    <div className="viz-frame ticked">
      <div className="viz-frame__head">
        <span>Policy · production-database-change</span>
        <Badge tone="success" dot>
          Permitted
        </Badge>
      </div>

      <div className="policy">
        <div className="code-block policy__code">
          <div className="code-block__head">
            <span className="code-block__name">policies/production-database-change.yaml</span>
            <span className="code-block__name">signed · v9</span>
          </div>
          <pre className="code-block__body">
            <code>
              <span className="tok-com"># Evaluated before any step runs</span>
              {'\n'}
              <span className="tok-key">apiVersion</span>
              <span className="tok-punc">: </span>
              <span className="tok-str">policy.infrapilot.io/v1</span>
              {'\n'}
              <span className="tok-key">kind</span>
              <span className="tok-punc">: </span>
              <span className="tok-str">ExecutionPolicy</span>
              {'\n'}
              <span className="tok-key">match</span>
              <span className="tok-punc">:</span>
              {'\n  '}
              <span className="tok-key">environment</span>
              <span className="tok-punc">: </span>
              <span className="tok-str">production</span>
              {'\n  '}
              <span className="tok-key">assetClass</span>
              <span className="tok-punc">: </span>
              <span className="tok-str">database</span>
              {'\n'}
              <span className="tok-key">require</span>
              <span className="tok-punc">:</span>
              {'\n  '}
              <span className="tok-punc">- </span>
              <span className="tok-fn">approvedWindow</span>
              <span className="tok-punc">()</span>
              {'\n  '}
              <span className="tok-punc">- </span>
              <span className="tok-fn">riskScore</span>
              <span className="tok-punc">(max: </span>
              <span className="tok-num">40</span>
              <span className="tok-punc">)</span>
              {'\n  '}
              <span className="tok-punc">- </span>
              <span className="tok-fn">verifiedBackup</span>
              <span className="tok-punc">(within: </span>
              <span className="tok-str">24h</span>
              <span className="tok-punc">)</span>
              {'\n  '}
              <span className="tok-punc">- </span>
              <span className="tok-fn">preserveQuorum</span>
              <span className="tok-punc">()</span>
              {'\n  '}
              <span className="tok-punc">- </span>
              <span className="tok-fn">blastRadius</span>
              <span className="tok-punc">(max: </span>
              <span className="tok-num">15</span>
              <span className="tok-str">%</span>
              <span className="tok-punc">)</span>
              {'\n'}
              <span className="tok-key">credentials</span>
              <span className="tok-punc">:</span>
              {'\n  '}
              <span className="tok-key">broker</span>
              <span className="tok-punc">: </span>
              <span className="tok-str">cyberark</span>
              {'\n  '}
              <span className="tok-key">ttl</span>
              <span className="tok-punc">: </span>
              <span className="tok-str">15m</span>
              {'\n'}
              <span className="tok-key">onDeny</span>
              <span className="tok-punc">: </span>
              <span className="tok-str">explain</span>
            </code>
          </pre>
        </div>

        <ul className="policy__checks">
          {CHECKS.map((check) => (
            <li key={check.label} className={`is-${check.result}`}>
              <span className="policy__check-icon">
                <Icon
                  name={check.result === 'pass' ? 'check' : 'alertTriangle'}
                  size={12}
                />
              </span>
              <span className="policy__check-body">
                <span className="policy__check-label">{check.label}</span>
                <span className="policy__check-detail">{check.detail}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="viz-frame__foot">
        <span>
          <Icon name="lock" size={13} />
          Zero standing privilege
        </span>
        <span>
          <Icon name="book" size={13} />
          Decision written to audit chain
        </span>
      </div>
    </div>
  );
}
