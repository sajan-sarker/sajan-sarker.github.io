import data from '../data/data.json';

export default function CertificationsSection({ onImageClick }) {
  const certs = data.certifications;

  return (
    <section id="certifications" className="section-wrapper">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="section-heading">Certifications</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {certs.map((cert, index) => (
            <article
              key={index}
              className="card certificate-card reveal"
            >
              <img
                src={cert.img}
                alt={`${cert.title} certificate`}
                className="certificate-img"
                onClick={() => onImageClick(cert.img)}
              />
              <h3 className="card-title">{cert.title}</h3>
              <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer">
                Credential Link
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
