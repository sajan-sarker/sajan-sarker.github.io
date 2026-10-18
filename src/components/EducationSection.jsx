import data from '../data/data.json';
import SectionHeading from './SectionHeading';

export default function EducationSection() {
  const educations = data.education;

  return (
    <section id="educations" className="section-wrapper">
      <div className="max-w-6xl mx-auto px-4">
        <SectionHeading index={3} title="Education" comment="cat education.log" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {educations.map((edu, index) => (
            <article key={edu.degree} className="edu-card glow-card reveal">
              <div className="flex items-center justify-between gap-3 mb-4">
                <span className="edu-icon">
                  <i className={`fa-solid ${index === 0 ? 'fa-graduation-cap' : 'fa-school'}`} aria-hidden="true" />
                </span>
                <span className="edu-index">{`edu[${index}]`}</span>
              </div>
              <h3 className="edu-degree">{edu.degree}</h3>
              <p className="edu-institution">{edu.institution}</p>
              <p className="edu-period">
                <i className="fa-regular fa-calendar" aria-hidden="true" /> {edu.period}
              </p>
              <span className="grade-badge">{edu.grade}</span>
              {edu.extra && <p className="edu-extra">{edu.extra}</p>}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
