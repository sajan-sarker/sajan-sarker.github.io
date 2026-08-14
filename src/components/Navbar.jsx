import { useState, useCallback } from 'react';
import data from '../data/data.json';

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

  const handleNavClick = useCallback((e, targetId) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileOpen(false);
  }, []);

  return (
    <nav className="site-nav fixed top-0 w-full z-30">
      <div className="max-w-6xl mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
          <a
            href="#home"
            className="brand"
            onClick={(e) => handleNavClick(e, 'home')}
          >
            {data.meta.name}
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-2">
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
            className="md:hidden text-slate-100 hover:text-white p-2"
            aria-label="Toggle mobile menu"
            onClick={() => setMobileOpen((v) => !v)}
          >
            <i className="fa-solid fa-bars text-xl" />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${mobileOpen ? '' : 'hidden'} md:hidden px-4 pb-4`}>
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
    </nav>
  );
}
