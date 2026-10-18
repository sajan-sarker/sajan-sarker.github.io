import { useEffect, useRef, useState } from 'react';
import data from '../data/data.json';
import SectionHeading from './SectionHeading';
import WindowFrame from './WindowFrame';

/** Counts from 0 to `value` once the number scrolls into view. */
function CountUp({ value }) {
  const ref = useRef(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const el = ref.current;
    let frame = null;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          setCurrent(value);
          return;
        }
        const start = performance.now();
        const step = () => {
          const p = Math.min(Math.max((performance.now() - start) / 1200, 0), 1);
          setCurrent(Math.round(value * (1 - Math.pow(1 - p, 3))));
          if (p < 1) frame = requestAnimationFrame(step);
        };
        frame = requestAnimationFrame(step);
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, [value]);

  return <span ref={ref}>{current}</span>;
}

const stats = [
  { label: 'projects', value: data.projects.length },
  { label: 'certificates', value: data.certifications.length },
  { label: 'roles', value: data.experience.length },
  { label: 'skills', value: data.skills.reduce((n, s) => n + s.groups.reduce((m, g) => m + g.tags.length, 0), 0) },
];

export default function AboutSection() {
  const { paragraphs } = data.about;
  const tiltRef = useRef(null);

  const handleTilt = (e) => {
    const el = tiltRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.setProperty('--tilt-x', `${(-y * 14).toFixed(2)}deg`);
    el.style.setProperty('--tilt-y', `${(x * 14).toFixed(2)}deg`);
  };

  const resetTilt = () => {
    tiltRef.current?.style.setProperty('--tilt-x', '0deg');
    tiltRef.current?.style.setProperty('--tilt-y', '0deg');
  };

  return (
    <section id="about" className="section-wrapper">
      <div className="max-w-6xl mx-auto px-4">
        <SectionHeading index={1} title="About Me" comment="whoami" />

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] gap-12 items-center">
          {/* Profile */}
          <div className="flex justify-center reveal profile-stage" onMouseMove={handleTilt} onMouseLeave={resetTilt}>
            <div ref={tiltRef} className="profile-tilt">
              <div className="profile-frame">
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

          {/* Bio + stats */}
          <div className="reveal">
            <WindowFrame title="~/about/README.md" className="about-window">
              <p className="code-comment"># about_me</p>
              {paragraphs.map((text, i) => (
                <p key={i} className="about-text">{text}</p>
              ))}
            </WindowFrame>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
              {stats.map(({ label, value }) => (
                <div key={label} className="stat-card glow-card">
                  <span className="stat-value"><CountUp value={value} /></span>
                  <span className="stat-label">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
