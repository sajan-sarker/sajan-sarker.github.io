import data from '../data/data.json';

export default function AboutSection() {
  const { paragraphs } = data.about;

  return (
    <section id="about" className="section-wrapper">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="section-heading">About Me</h2>
        <div className="content-card reveal">
          {paragraphs.map((text, i) => (
            <p
              key={i}
              className={`text-base md:text-lg leading-relaxed text-slate-300${i > 0 ? ' mt-4' : ''}`}
            >
              {text}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
