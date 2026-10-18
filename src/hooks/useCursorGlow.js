import { useEffect } from 'react';

const CARDS = '.glow-card';
const CHIPS = '.tag, .project-link, .social-icon';
const BUTTONS = '.btn-primary, .btn-secondary';
const SELECTOR = [CARDS, CHIPS, BUTTONS].join(', ');

/**
 * Cursor-following glow. Uses one delegated pointermove listener, and a
 * MutationObserver so elements rendered later (e.g. "show all") also glow.
 */
export function useCursorGlow() {
  useEffect(() => {
    const mark = (root) => {
      if (root.matches?.(SELECTOR)) root.classList.add('cursor-glow');
      root.querySelectorAll?.(SELECTOR).forEach((el) => el.classList.add('cursor-glow'));
    };
    mark(document.body);

    const mutations = new MutationObserver((records) => {
      records.forEach((r) => r.addedNodes.forEach((n) => n.nodeType === 1 && mark(n)));
    });
    mutations.observe(document.body, { childList: true, subtree: true });

    let active = new Set();

    const onMove = (event) => {
      if (event.pointerType === 'touch') return;

      const next = new Set();
      let el = event.target instanceof Element ? event.target.closest(SELECTOR) : null;
      while (el) {
        next.add(el);
        el = el.parentElement ? el.parentElement.closest(SELECTOR) : null;
      }

      active.forEach((prev) => {
        if (!next.has(prev)) prev.classList.remove('is-glow-active');
      });

      next.forEach((target) => {
        const rect = target.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const rx = x / Math.max(rect.width, 1);
        const ry = y / Math.max(rect.height, 1);
        target.style.setProperty('--glow-x', `${x}px`);
        target.style.setProperty('--glow-y', `${y}px`);

        if (target.matches(CHIPS)) {
          target.style.setProperty('--chip-hue', `${Math.round((rx * 320 + ry * 40) % 360)}`);
        } else if (target.matches(BUTTONS)) {
          target.style.setProperty('--chip-hue', `${Math.round(210 + rx * 70)}`);
        }
        target.classList.add('is-glow-active');
      });

      active = next;
    };

    const clear = () => {
      active.forEach((el) => el.classList.remove('is-glow-active'));
      active = new Set();
    };

    document.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', clear);
    window.addEventListener('blur', clear);

    return () => {
      mutations.disconnect();
      document.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('mouseleave', clear);
      window.removeEventListener('blur', clear);
    };
  }, []);
}
