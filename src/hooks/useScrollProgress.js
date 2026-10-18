import { useEffect, useState } from 'react';

/**
 * Returns page scroll progress (0–1) and the raw scrollY, throttled to one
 * update per animation frame.
 */
export function useScrollProgress() {
  const [state, setState] = useState({ progress: 0, scrollY: 0 });

  useEffect(() => {
    let frame = null;

    function update() {
      frame = null;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const scrollY = window.scrollY;
      setState({ progress: max > 0 ? Math.min(scrollY / max, 1) : 0, scrollY });
    }

    function onScroll() {
      if (frame === null) frame = requestAnimationFrame(update);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, []);

  return state;
}
