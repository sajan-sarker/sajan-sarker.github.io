import data from '../data/data.json';

export default function EducationSection() {
  const educations = data.education;

  return (
    <section id="educations" className="section-wrapper">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="section-heading">Education</h2>
        <div className="grid gap-5 md:grid-cols-2">
          {educations.map((edu, index) => (
            <article key={index} className="card reveal">
              <h3 className="card-title">{edu.degree}</h3>
              <p>{edu.institution}</p>
              <p>{edu.period}</p>
              <p className="font-semibold text-slate-100">{edu.grade}</p>
              <p>{edu.extra}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
