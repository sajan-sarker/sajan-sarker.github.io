import { useEffect, useCallback } from 'react';

export default function ImageModal({ src, onClose }) {
  // Keyboard ESC to close
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (src) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [src, handleKeyDown]);

  if (!src) return null;

  return (
    <div
      id="imgModal"
      className="modal open"
      onClick={(e) => {
        if (e.target.id === 'imgModal') onClose();
      }}
    >
      <span className="modal-close" id="modalClose" onClick={onClose}>
        &times;
      </span>
      <img src={src} alt="Certificate preview" />
    </div>
  );
}
