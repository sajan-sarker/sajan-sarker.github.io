import { useEffect } from 'react';

/**
 * Watches .reveal elements and adds .is-visible when they enter the viewport.
 * Re-runs whenever the component tree re-renders (no deps → runs once on mount).
 */
export function useReveal() {
  useEffect(() => {
    function revealOnScroll() {
      const elements = document.querySelectorAll('.reveal');
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 80) {
          el.classList.add('is-visible');
        }
      });
    }

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // run immediately for elements already in view

    return () => window.removeEventListener('scroll', revealOnScroll);
  }, []);
}
