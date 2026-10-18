import { useEffect } from 'react';

/**
 * Watches .reveal elements and section headings, adding .is-visible when they
 * enter the viewport. Sibling .reveal items get a staggered --reveal-delay so
 * grids and lists cascade in instead of appearing all at once.
 */
export function useReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll('.reveal, .section-heading');

    elements.forEach((el) => {
      if (!el.classList.contains('reveal')) return;
      const siblings = [...el.parentElement.children].filter((c) =>
        c.classList.contains('reveal')
      );
      const index = siblings.indexOf(el);
      el.style.setProperty('--reveal-delay', `${Math.min(index, 5) * 90}ms`);
    });

    const timers = [];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            el.classList.add('is-visible');
            observer.unobserve(el);

            // Once the entrance finishes, drop the delay so hover effects stay snappy
            const delay = parseInt(el.style.getPropertyValue('--reveal-delay'), 10) || 0;
            timers.push(
              setTimeout(() => {
                el.style.removeProperty('--reveal-delay');
                el.classList.add('reveal-done');
              }, delay + 750)
            );
          }
        });
      },
      { rootMargin: '0px 0px -60px 0px', threshold: 0.08 }
    );

    elements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
      timers.forEach(clearTimeout);
    };
  }, []);
}
