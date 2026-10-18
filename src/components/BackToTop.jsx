import { useScrollProgress } from '../hooks/useScrollProgress';

export default function BackToTop() {
  const { progress, scrollY } = useScrollProgress();
  const visible = scrollY > 600;

  return (
    <button
      type="button"
      className={`back-to-top${visible ? ' is-visible' : ''}`}
      style={{ '--progress': `${Math.round(progress * 360)}deg` }}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
    >
      <span className="back-to-top-inner">
        <i className="fa-solid fa-arrow-up" />
      </span>
    </button>
  );
}
