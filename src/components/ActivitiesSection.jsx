import data from '../data/data.json';

export default function ActivitiesSection() {
  const activities = data.activities;

  return (
    <section id="activities" className="section-wrapper">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="section-heading">Activities</h2>
        <div className="space-y-6">
          {activities.map((activity, index) => {
            const bullets = Array.isArray(activity.bullets) ? activity.bullets : [];
            const links = Array.isArray(activity.links) ? activity.links : [];

            return (
              <article key={index} className="project-card reveal">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-1 mb-3">
                <div>
                  <h3 className="text-xl font-bold text-slate-100">{activity.organization}</h3>
                  <p className="text-accent font-semibold mt-0.5">{activity.title}</p>
                </div>
                <span className="text-slate-400 text-sm font-medium whitespace-nowrap mt-1 md:mt-0 bg-slate-800/60 border border-slate-700/60 px-3 py-1 rounded-full self-start">
                  {activity.period}
                </span>
              </div>
                <ul>
                  {bullets.map((bullet, i) => (
                    <li key={i}>{bullet}</li>
                  ))}
                </ul>
                {links.length > 0 &&
                  links.map(({ label, href }) => (
                    <a key={href} href={href} target="_blank" rel="noopener noreferrer" className="mr-3">
                      {label}
                    </a>
                  ))
                }
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}