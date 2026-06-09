import data from '../data/data.json';

export default function ExperienceSection() {
  const experiences = data.experience;

  return (
    <section id="experience" className="section-wrapper section-alt">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="section-heading">Work Experience</h2>
        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <article key={index} className="experience-card reveal">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-1 mb-3">
                <div>
                  <h3 className="text-xl font-bold text-slate-100">{exp.role}</h3>
                  <p className="text-accent font-semibold mt-0.5">{exp.company}</p>
                </div>
                <span className="text-slate-400 text-sm font-medium whitespace-nowrap mt-1 md:mt-0 bg-slate-800/60 border border-slate-700/60 px-3 py-1 rounded-full self-start">
                  {exp.period}
                </span>
              </div>

              <p className="text-slate-300 leading-relaxed mb-4">{exp.description}</p>

              <div className="project-tech">
                {exp.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
