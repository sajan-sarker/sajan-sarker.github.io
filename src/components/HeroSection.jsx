import data from '../data/data.json';

export default function HeroSection() {
  const { meta, social, heroButtons } = data;

  const handleAnchorClick = (e, href) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const target = document.getElementById(href.slice(1));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="hero-section">
      <div className="max-w-6xl mx-auto px-4 py-24 md:py-28">
        <div className="grid md:grid-cols-2 items-center gap-12">

          {/* Text side */}
          <div className="space-y-5 reveal">
            <span className="hero-chip">{meta.heroChip}</span>
            <h1 className="text-4xl md:text-6xl font-bold text-slate-100 leading-tight">
              {meta.name}
            </h1>
            <p className="text-lg md:text-xl text-slate-200 font-medium">
              {meta.tagline}
            </p>
            <p className="text-slate-300 max-w-2xl">{meta.bio}</p>

            {/* Social links */}
            <div className="flex items-center gap-4 text-2xl pt-1 social-links">
              {social.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                >
                  <i className={icon} />
                </a>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-3 pt-2">
              {heroButtons.map(({ text, href, variant }) => (
                <a
                  key={text}
                  href={href}
                  className={variant === 'primary' ? 'btn-primary' : 'btn-secondary'}
                  onClick={(e) => handleAnchorClick(e, href)}
                >
                  {text}
                </a>
              ))}
            </div>
          </div>

          {/* Profile image */}
          <div className="flex justify-center reveal">
            <div className="profile-wrap">
              <img
                src="img/profile-illustration.png"
                alt="Sajan Kumer Sarker profile"
                className="profile-image"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
