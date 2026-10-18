import { useState, useCallback } from 'react';
import data from '../data/data.json';
import { useScrollProgress } from '../hooks/useScrollProgress';

const navSections = [
  { label: 'Home',         section: 'home' },
  { label: 'About',        section: 'about' },
  { label: 'Experience',   section: 'experience' },
  { label: 'Education',    section: 'educations' },
  { label: 'Projects',     section: 'projects' },
  { label: 'Skills',       section: 'skills' },
  { label: 'Activities',   section: 'activities' },
  { label: 'Certificates', section: 'certifications' },
  { label: 'Contact',      section: 'contact' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { progress, scrollY } = useScrollProgress();

  const handleNavClick = useCallback((e, targetId) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileOpen(false);
  }, []);

  return (
    <nav className={`site-nav fixed top-0 w-full z-30${scrollY > 20 ? ' is-scrolled' : ''}`}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
          <a
            href="#home"
            className="brand"
            aria-label={`${data.meta.name} — home`}
            onClick={(e) => handleNavClick(e, 'home')}
          >
            <span className="brand-user">sajan</span>
            <span className="brand-sep">@</span>
            <span className="brand-host">portfolio</span>
            <span className="brand-sep">:~$</span>
            <span className="brand-caret" aria-hidden="true" />
          </a>

          {/* Desktop links */}
          <ul className="hidden lg:flex items-center gap-1">
            {navSections.map(({ label, section }) => (
              <li key={section}>
                <a
                  href={`#${section}`}
                  data-section={section}
                  className="nav-link"
                  onClick={(e) => handleNavClick(e, section)}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          {/* Hamburger */}
          <button
            id="menu-toggle"
            className="lg:hidden text-slate-100 hover:text-white p-2"
            aria-label="Toggle mobile menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            <i className={`fa-solid ${mobileOpen ? 'fa-xmark' : 'fa-bars'} text-xl menu-icon`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`mobile-menu lg:hidden px-4${mobileOpen ? ' is-open' : ''}`} inert={!mobileOpen}>
        <div>
          <div className="mobile-menu-inner">
            {navSections.map(({ label, section }) => (
              <a
                key={section}
                href={`#${section}`}
                data-section={section}
                className="mobile-nav-link"
                onClick={(e) => handleNavClick(e, section)}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="scroll-progress" style={{ transform: `scaleX(${progress})` }} />
    </nav>
  );
}
