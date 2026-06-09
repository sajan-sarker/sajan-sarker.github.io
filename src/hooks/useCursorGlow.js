import { useEffect } from 'react';

/**
 * Attaches the cursor-glow mousemove/mouseleave handlers to all matching elements.
 * Exact port of the original script.js glowTargets logic.
 */
export function useCursorGlow() {
  useEffect(() => {
    const selector = [
      '.card',
      '.content-card',
      '.project-card',
      '.project-card > a',
      '.project-tech span',
      '.skill-tags span',
      '.btn-primary',
      '.btn-secondary',
      ".social-links a[aria-label='GitHub']",
    ].join(', ');

    const elements = document.querySelectorAll(selector);

    const handlers = [];

    elements.forEach((el) => {
      el.classList.add('cursor-glow');

      const onMove = (event) => {
        const rect = el.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        el.style.setProperty('--glow-x', `${x}px`);
        el.style.setProperty('--glow-y', `${y}px`);

        if (
          el.matches(
            ".project-tech span, .skill-tags span, .project-card > a, .social-links a[aria-label='GitHub']"
          )
        ) {
          const hue = Math.round(
            ((x / Math.max(rect.width, 1)) * 320 +
              (y / Math.max(rect.height, 1)) * 40) %
              360
          );
          el.style.setProperty('--chip-hue', `${hue}`);
        }

        if (el.matches('.btn-primary, .btn-secondary')) {
          const hue = Math.round(210 + (x / Math.max(rect.width, 1)) * 70);
          el.style.setProperty('--chip-hue', `${hue}`);
        }

        el.classList.add('is-glow-active');
      };

      const onLeave = () => {
        el.classList.remove('is-glow-active');
      };

      el.addEventListener('mousemove', onMove);
      el.addEventListener('mouseleave', onLeave);
      handlers.push({ el, onMove, onLeave });
    });

    return () => {
      handlers.forEach(({ el, onMove, onLeave }) => {
        el.removeEventListener('mousemove', onMove);
        el.removeEventListener('mouseleave', onLeave);
      });
    };
  });
  // No deps array → runs after every render to catch newly-rendered elements
}
