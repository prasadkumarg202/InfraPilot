import { Ambient, ButtonLink, Icon } from '@/components/primitives';
import { ControlPlaneConsole } from '@/components/visualizations/ControlPlaneConsole';
import { CustomerLogos } from './CustomerLogos';

/**
 * Home hero.
 *
 * The headline carries a single gradient phrase rather than a gradient
 * sentence — one emphasis per screen. The console below the fold-line is
 * deliberately cropped by the viewport so there is a reason to scroll.
 */
export function Hero() {
  return (
    <section className="hero">
      <Ambient aurora mesh floor noise />

      <div className="container container--wide hero__inner">
        <a className="pill hero__pill" href="/blog">
          <span className="pill__tag">New</span>
          Copilot now writes and validates its own rollback plans
          <Icon name="arrowRight" size={13} />
        </a>

        <h1 className="hero__title">
          Autonomous infrastructure operations
          <br className="hide-sm" />{' '}
          <span className="text-gradient">for modern enterprises</span>
        </h1>

        <p className="hero__lede">
          Automate discovery, provisioning, patching, upgrades, migrations,
          compliance, incident response and self-healing across databases,
          operating systems, middleware, cloud and Kubernetes — from one
          intelligent platform.
        </p>

        <div className="hero__actions">
          <ButtonLink href="/book-demo" size="lg" iconRight="arrowRight">
            Book demo
          </ButtonLink>
          <ButtonLink href="/platform#tour" variant="secondary" size="lg" iconLeft="play">
            Watch live demo
          </ButtonLink>
          <ButtonLink href="/contact-sales" variant="link" size="lg" iconRight="arrowUpRight">
            Start proof of concept
          </ButtonLink>
        </div>

        <ul className="hero__assurances">
          <li>
            <Icon name="checkCircle" size={15} />
            Deploys inside your network in under a day
          </li>
          <li>
            <Icon name="checkCircle" size={15} />
            No agents required for discovery
          </li>
          <li>
            <Icon name="checkCircle" size={15} />
            SOC 2 Type II · ISO 27001 · PCI DSS ready
          </li>
        </ul>
      </div>

      <div className="hero__console container container--wide" data-reveal="scale">
        <ControlPlaneConsole />
      </div>

      <div className="container container--wide">
        <CustomerLogos marquee label="Running production change at" />
      </div>
    </section>
  );
}
