import data from '../data/data.json';
import SectionHeading from './SectionHeading';
import Timeline from './Timeline';

export default function ActivitiesSection() {
  const items = data.activities.map((activity) => ({
    title: activity.organization,
    subtitle: activity.title,
    period: activity.period,
    bullets: activity.bullets,
    links: activity.links,
  }));

  return (
    <section id="activities" className="section-wrapper">
      <div className="max-w-6xl mx-auto px-4">
        <SectionHeading index={6} title="Activities" comment="git log --community" />
        <Timeline items={items} />
      </div>
    </section>
  );
}
