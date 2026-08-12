import { PageShell } from '@/components/layout/PageShell';
import { PageIntro } from '@/components/marketing/PageIntro';
import { Section, SectionHead, Icon, Badge } from '@/components/primitives';
import { CtaBand } from '@/components/marketing/sections';
import { articles } from '@/content/resources';
import { toNextMetadata } from '@/lib/seo';
import { meta } from './meta';

export const metadata = toNextMetadata(meta);

function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

export default function BlogPage() {
  const featured = articles.find((a) => a.featured) ?? articles[0];
  const rest = articles.filter((a) => a.slug !== featured.slug);
  const categories = Array.from(new Set(articles.map((a) => a.category)));

  return (
    <PageShell current="/blog" breadcrumbs={[{ label: 'Blog', href: '/blog' }]}>
      <PageIntro
        eyebrow="Blog"
        title={
          <>
            Writing for the people{' '}
            <span className="text-gradient">who hold the pager</span>
          </>
        }
        lede="Engineering notes, operating research and regulatory analysis from the team building the platform — and occasionally from the customers running it."
      />

      <Section size="sm" tightTop>
        <div className="chip-row" style={{ marginBottom: 'var(--space-8)' }}>
          <span className="chip" style={{ borderColor: 'var(--border-accent)' }}>
            All
          </span>
          {categories.map((category) => (
            <span key={category} className="chip">
              {category}
            </span>
          ))}
        </div>

        <a className="article-feature" href={`/blog/${featured.slug}`} data-reveal>
          <div className="article-feature__body">
            <div className="row">
              <Badge tone="accent">{featured.category}</Badge>
              <span className="article__meta">{formatDate(featured.date)}</span>
              <span className="article__meta">{featured.readingTime}</span>
            </div>
            <h2 className="article-feature__title">{featured.title}</h2>
            <p className="article-feature__excerpt">{featured.excerpt}</p>
            <span className="article__author">
              <span className="quote-card__avatar" aria-hidden="true">
                {featured.author
                  .split(' ')
                  .map((w) => w[0])
                  .join('')}
              </span>
              <span>
                <strong>{featured.author}</strong>
                <span>{featured.role}</span>
              </span>
            </span>
          </div>
          <div className="article-feature__visual" aria-hidden="true">
            <div className="article-feature__grid" />
            <Icon name="activity" size={64} />
          </div>
        </a>

        <div className="article-grid">
          {rest.map((article) => (
            <a
              key={article.slug}
              className="article-card"
              href={`/blog/${article.slug}`}
              data-reveal
            >
              <div className="row">
                <Badge tone="outline">{article.category}</Badge>
                <span className="article__meta">{article.readingTime}</span>
              </div>
              <h3 className="article-card__title">{article.title}</h3>
              <p className="article-card__excerpt">{article.excerpt}</p>
              <div className="article-card__foot">
                <span className="article__meta">{article.author}</span>
                <span className="article__meta">{formatDate(article.date)}</span>
              </div>
            </a>
          ))}
        </div>
      </Section>

      <Section tone="panel" size="sm">
        <SectionHead
          align="center"
          eyebrow="Subscribe"
          title="One email a month, no product announcements"
          lede="A summary of what we published, what we got wrong, and what we learned from customer estates. Unsubscribe in one click."
        />
        <form className="subscribe" onSubmit={undefined}>
          <label className="sr-only" htmlFor="subscribe-email">
            Work email
          </label>
          <input
            id="subscribe-email"
            className="input"
            type="email"
            name="email"
            placeholder="you@company.com"
            autoComplete="email"
          />
          <button type="submit" className="btn btn--primary">
            Subscribe
          </button>
        </form>
      </Section>

      <Section size="sm">
        <CtaBand />
      </Section>
    </PageShell>
  );
}
