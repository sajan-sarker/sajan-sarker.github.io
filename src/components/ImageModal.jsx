import { useEffect } from 'react';

/**
 * Certificate lightbox. `items` is the list of { img, title, credentialUrl };
 * `index` is the open item (null when closed). Arrow keys / buttons navigate.
 */
export default function ImageModal({ items, index, onClose, onNavigate }) {
  const isOpen = index !== null;

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNavigate(1);
      if (e.key === 'ArrowLeft') onNavigate(-1);
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, onNavigate]);

  if (!isOpen) return null;

  const item = items[index];

  return (
    <div
      id="imgModal"
      className="modal open"
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      onClick={(e) => {
        if (e.target.id === 'imgModal') onClose();
      }}
    >
      <button type="button" className="modal-close" onClick={onClose} aria-label="Close preview">
        <i className="fa-solid fa-xmark" />
      </button>

      {items.length > 1 && (
        <>
          <button type="button" className="modal-nav modal-nav--prev" onClick={() => onNavigate(-1)} aria-label="Previous certificate">
            <i className="fa-solid fa-chevron-left" />
          </button>
          <button type="button" className="modal-nav modal-nav--next" onClick={() => onNavigate(1)} aria-label="Next certificate">
            <i className="fa-solid fa-chevron-right" />
          </button>
        </>
      )}

      <figure className="modal-figure" key={index}>
        <img src={item.img} alt={`${item.title} certificate`} />
        <figcaption className="modal-caption">
          <span className="modal-count">{index + 1} / {items.length}</span>
          <span className="modal-title">{item.title}</span>
          {item.credentialUrl && (
            <a href={item.credentialUrl} target="_blank" rel="noopener noreferrer">
              Credential <i className="fa-solid fa-arrow-up-right-from-square text-xs" />
            </a>
          )}
        </figcaption>
      </figure>
    </div>
  );
}
