import { commitHash, linkIcon } from '../utils/format';

/**
 * git-log style vertical timeline.
 * items: { title, subtitle, period, description?, bullets?, tags?, links? }
 */
export default function Timeline({ items }) {
  return (
    <ol className="timeline">
      {items.map((item, index) => {
        const current = /present/i.test(item.period);
        const bullets = Array.isArray(item.bullets) ? item.bullets : [];
        const tags = Array.isArray(item.tags) ? item.tags : [];
        const links = Array.isArray(item.links) ? item.links : [];

        return (
          <li key={`${item.title}-${item.period}`} className="timeline-item reveal">
            <span className={`timeline-dot${current ? ' is-current' : ''}`} aria-hidden="true" />

            <div className="timeline-meta">
              <span>
                <span className="text-slate-500">commit </span>
                <span className="commit-hash">{commitHash(item.title + item.period)}</span>
              </span>
              {index === 0 && <span className="head-badge">(HEAD -&gt; main)</span>}
              <span className="timeline-date">
                <i className="fa-regular fa-calendar" aria-hidden="true" /> {item.period}
              </span>
            </div>

            <article className="timeline-card glow-card">
              <h3 className="timeline-title">{item.title}</h3>
              <p className="timeline-sub">{item.subtitle}</p>

              {item.description && <p className="timeline-desc">{item.description}</p>}

              {bullets.length > 0 && (
                <ul className="code-list">
                  {bullets.map((b, i) => <li key={i}>{b}</li>)}
                </ul>
              )}

              {tags.length > 0 && (
                <div className="tag-list">
                  {tags.map((t) => <span key={t} className="tag">{t}</span>)}
                </div>
              )}

              {links.length > 0 && (
                <div className="link-row">
                  {links.map(({ label, href }) => (
                    <a key={href} href={href} target="_blank" rel="noopener noreferrer" className="project-link">
                      <i className={linkIcon(href)} aria-hidden="true" />
                      {label}
                    </a>
                  ))}
                </div>
              )}
            </article>
          </li>
        );
      })}
    </ol>
  );
}
