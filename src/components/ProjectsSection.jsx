import data from '../data/data.json';

export default function ProjectsSection() {
  const projects = data.projects;

  return (
    <section id="projects" className="section-wrapper">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="section-heading">Projects</h2>
        <div className="space-y-6">
          {projects.map((project, index) => (
            <article key={index} className="project-card reveal">
              <h3>{project.title}</h3>
              <ul>
                {project.bullets.map((bullet, i) => (
                  <li key={i}>{bullet}</li>
                ))}
              </ul>
              <p className="project-tech-label">Tools:</p>
              <div className="project-tech">
                {project.tools.map((tool) => (
                  <span key={tool}>{tool}</span>
                ))}
              </div>
              {project.links.map(({ label, href }) => (
                <a key={href} href={href} target="_blank" rel="noopener noreferrer" className="mr-3">
                  {label}
                </a>
              ))}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
