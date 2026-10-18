import { useState } from 'react';
import data from '../data/data.json';
import SectionHeading from './SectionHeading';

const INITIAL_COUNT = 6;

export default function CertificationsSection({ onImageClick }) {
  const certs = data.certifications;
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? certs : certs.slice(0, INITIAL_COUNT);

  return (
    <section id="certifications" className="section-wrapper">
      <div className="max-w-6xl mx-auto px-4">
        <SectionHeading index={7} title="Certifications" comment="ls ./certificates" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {visible.map((cert, index) => (
            <article
              key={cert.title}
              className={`cert-card glow-card ${index < INITIAL_COUNT ? 'reveal' : 'pop-in'}`}
              style={index >= INITIAL_COUNT ? { animationDelay: `${(index - INITIAL_COUNT) * 70}ms` } : undefined}
            >
              <button
                type="button"
                className="certificate-thumb"
                onClick={() => onImageClick(index)}
                aria-label={`View ${cert.title} certificate`}
              >
                <img
                  src={cert.img}
                  alt={`${cert.title} certificate`}
                  className="certificate-img"
                  loading="lazy"
                />
                <span className="certificate-overlay" aria-hidden="true">
                  <i className="fa-solid fa-magnifying-glass-plus" /> preview
                </span>
              </button>
              <p className="cert-file">{`cert_${String(index + 1).padStart(2, '0')}.${cert.img.split('.').pop()}`}</p>
              <h3 className="cert-title">{cert.title}</h3>
              <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer" className="cert-link">
                verify credential <i className="fa-solid fa-arrow-up-right-from-square text-xs" aria-hidden="true" />
              </a>
            </article>
          ))}
        </div>

        {certs.length > INITIAL_COUNT && (
          <div className="flex justify-center mt-8">
            <button type="button" className="btn-secondary" onClick={() => setShowAll((v) => !v)}>
              <i className={`fa-solid ${showAll ? 'fa-chevron-up' : 'fa-folder-open'}`} aria-hidden="true" />
              {showAll ? 'ls certificates --less' : `ls certificates --all (${certs.length})`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
