import data from '../data/data.json';

export default function SkillsSection() {
  const skills = data.skills;

  return (
    <section id="skills" className="section-wrapper section-alt">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="section-heading">Skills</h2>
        <div className="grid md:grid-cols-2 gap-5">
          {skills.map((skillSet, index) => (
            <article key={index} className="card reveal">
              <h3 className="card-title">{skillSet.category}</h3>
              {skillSet.groups.map((group) => (
                <div key={group.label}>
                  <p className={group.label !== skillSet.groups[0].label ? 'mt-4' : ''}>
                    <strong>{group.label}</strong>
                  </p>
                  <div className="skill-tags">
                    {group.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              ))}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
