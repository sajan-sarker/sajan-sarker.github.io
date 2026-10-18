import data from '../data/data.json';
import SectionHeading from './SectionHeading';
import WindowFrame from './WindowFrame';
import { linkIcon, projectSlug } from '../utils/format';

export default function ProjectsSection() {
  const projects = data.projects;

  return (
    <section id="projects" className="section-wrapper">
      <div className="max-w-6xl mx-auto px-4">
        <SectionHeading index={4} title="Projects" comment="ls ~/projects" />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {projects.map((project, index) => (
            <WindowFrame
              key={project.title}
              title={`~/projects/${projectSlug(project.title)}`}
              className={`project-window glow-card reveal${index === 0 ? ' md:col-span-2 is-featured' : ''}`}
            >
              <p className="project-index">{`0x${String(index + 1).padStart(2, '0')}`}</p>
              <h3 className="project-title">{project.title}</h3>
              <ul className="code-list">
                {project.bullets.map((bullet, i) => (
                  <li key={i}>{bullet}</li>
                ))}
              </ul>
              <p className="project-tech-label">{'// stack'}</p>
              <div className="tag-list">
                {project.tools.map((tool) => (
                  <span key={tool} className="tag">{tool}</span>
                ))}
              </div>
              <div className="link-row project-links">
                {project.links.map(({ label, href }) => (
                  <a key={href} href={href} target="_blank" rel="noopener noreferrer" className="project-link">
                    <i className={linkIcon(href)} aria-hidden="true" />
                    {label}
                  </a>
                ))}
              </div>
            </WindowFrame>
          ))}
        </div>
      </div>
    </section>
  );
}
