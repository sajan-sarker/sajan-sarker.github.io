import data from '../data/data.json';
import SectionHeading from './SectionHeading';
import Timeline from './Timeline';

export default function ExperienceSection() {
  const items = data.experience.map((exp) => ({
    title: exp.role,
    subtitle: exp.company,
    period: exp.period,
    description: exp.description,
    tags: exp.tags,
  }));

  return (
    <section id="experience" className="section-wrapper section-alt">
      <div className="max-w-6xl mx-auto px-4">
        <SectionHeading index={2} title="Work Experience" comment="git log --career" />
        <Timeline items={items} />
      </div>
    </section>
  );
}
