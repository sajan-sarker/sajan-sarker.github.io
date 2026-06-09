import { useEffect } from 'react';

/**
 * Scrollspy: highlights the nav link whose section is currently in the viewport.
 * Matches the original JS activateLink() logic (scrollY + 140 offset).
 */
export function useScrollSpy() {
  useEffect(() => {
    function activateLink() {
      const sections = document.querySelectorAll('section[id]');
      const navLinks = document.querySelectorAll('.nav-link');
      const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
      const scrollY = window.scrollY + 140;

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          [...navLinks, ...mobileNavLinks].forEach((link) => {
            link.classList.toggle('active', link.dataset.section === sectionId);
          });
        }
      });
    }

    window.addEventListener('scroll', activateLink);
    activateLink();

    return () => window.removeEventListener('scroll', activateLink);
  }, []);
}
