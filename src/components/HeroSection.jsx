import { useState } from 'react';
import data from '../data/data.json';
import NetworkCanvas from './NetworkCanvas';
import Terminal from './Terminal';
import { useTypewriter } from '../hooks/useTypewriter';

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function HeroSection() {
  const { meta, social, heroButtons } = data;
  const [roles] = useState(() => meta.tagline.split('|').map((r) => r.trim()).filter(Boolean));
  const [staticRoles] = useState(prefersReducedMotion);
  const typed = useTypewriter(staticRoles ? [] : roles);

  const nameParts = meta.name.split(' ');
  const lastName = nameParts.pop();

  const handleAnchorClick = (e, href) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      document.getElementById(href.slice(1))?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="hero-section">
      <NetworkCanvas />
      <div className="hero-grid" aria-hidden="true" />

      <div className="relative max-w-6xl mx-auto px-4 pt-28 pb-24 md:pt-32 hero-inner">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] items-center gap-12 lg:gap-14 w-full min-w-0">

          {/* Text side */}
          <div className="space-y-6 reveal min-w-0">
            <span className="hero-chip">
              <span className="hero-chip-dot" aria-hidden="true" />
              {meta.heroChip}
            </span>

            <div>
              <p className="hero-greeting">
                <span className="text-accent">&gt;</span> Hello, World! I&apos;m
              </p>
              <h1 className="hero-name" data-text={meta.name}>
                {nameParts.join(' ')} <span className="name-accent">{lastName}</span>
              </h1>
            </div>

            <p className="hero-role">
              <span className="sr-only">{meta.tagline}</span>
              <span aria-hidden="true">
                <span className="hero-role-prompt">$</span>
                {staticRoles ? (
                  meta.tagline
                ) : (
                  <>
                    <span className="typed-text">{typed}</span>
                    <span className="typed-caret" />
                  </>
                )}
              </span>
            </p>

            <p className="hero-bio">{meta.bio}</p>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-3">
              {heroButtons.map(({ text, href, variant }) => (
                <a
                  key={text}
                  href={href}
                  className={variant === 'primary' ? 'btn-primary' : 'btn-secondary'}
                  onClick={(e) => handleAnchorClick(e, href)}
                >
                  <i
                    className={`fa-solid ${variant === 'primary' ? 'fa-code' : 'fa-terminal'}`}
                    aria-hidden="true"
                  />
                  {text}
                </a>
              ))}
            </div>

            {/* Social links */}
            <div className="flex flex-wrap items-center gap-2.5">
              {social.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  className="social-icon"
                >
                  <i className={icon} />
                </a>
              ))}
            </div>
          </div>

          {/* Interactive terminal */}
          <div className="reveal min-w-0">
            <Terminal />
          </div>
        </div>
      </div>

      <a
        href="#about"
        className="scroll-cue"
        aria-label="Scroll to About section"
        onClick={(e) => handleAnchorClick(e, '#about')}
      >
        <span className="scroll-cue-mouse"><span className="scroll-cue-wheel" /></span>
      </a>
    </section>
  );
}
