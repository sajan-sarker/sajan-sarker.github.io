import { useEffect, useState } from 'react';
import data from '../data/data.json';
import SectionHeading from './SectionHeading';
import WindowFrame from './WindowFrame';

export default function ContactSection() {
  const { intro, subIntro, email, phone, location } = data.contact;
  const resume = data.social.find((s) => s.label.toLowerCase() === 'resume');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 1800);
    return () => clearTimeout(timer);
  }, [copied]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  const rows = [
    { key: 'email', icon: 'fa-solid fa-envelope', value: email, href: `mailto:${email}`, copy: true },
    { key: 'phone', icon: 'fa-solid fa-phone', value: phone, href: `tel:${phone.replace(/[^+\d]/g, '')}` },
    { key: 'location', icon: 'fa-solid fa-location-dot', value: location },
  ];

  return (
    <section id="contact" className="section-wrapper section-alt">
      <div className="max-w-6xl mx-auto px-4">
        <SectionHeading index={8} title="Get In Touch" comment="ping sajan" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="reveal space-y-5">
            <p className="contact-heading">
              {subIntro.replace(/\.$/, '')}
              <span className="title-dot">.</span>
            </p>
            <p className="text-lg text-slate-300 leading-relaxed max-w-xl">{intro}</p>
            <div className="flex flex-wrap gap-3">
              <a href={`mailto:${email}`} className="btn-primary">
                <i className="fa-solid fa-paper-plane" aria-hidden="true" />
                Say Hello
              </a>
              {resume && (
                <a href={resume.href} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                  <i className="fa-solid fa-file-arrow-down" aria-hidden="true" />
                  Resume
                </a>
              )}
            </div>
          </div>

          <div className="reveal">
            <WindowFrame title="contact.sh" className="contact-window">
              <p className="term-line">
                <span className="tp-user">guest@sajan</span>
                <span className="tp-sep">:</span>
                <span className="tp-path">~</span>
                <span className="tp-sep">$ </span>
                <span className="term-cmd">./contact --info</span>
              </p>
              <div className="mt-3 space-y-1">
                {rows.map(({ key, icon, value, href, copy }) => (
                  <div key={key} className="contact-row">
                    <span className="contact-icon"><i className={icon} aria-hidden="true" /></span>
                    <div className="min-w-0 flex-1">
                      <p className="contact-key">{key}</p>
                      {href ? (
                        <a href={href} className="contact-value">{value}</a>
                      ) : (
                        <p className="contact-value">{value}</p>
                      )}
                    </div>
                    {copy && (
                      <button
                        type="button"
                        className={`contact-copy${copied ? ' is-copied' : ''}`}
                        onClick={copyEmail}
                        aria-label={copied ? 'Email copied' : 'Copy email address'}
                        title={copied ? 'Copied!' : 'Copy'}
                      >
                        <i className={`fa-solid ${copied ? 'fa-check' : 'fa-copy'}`} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <p className="contact-toast" aria-live="polite">
                {copied ? '✔ email copied to clipboard' : <span className="typed-caret" />}
              </p>
            </WindowFrame>
          </div>
        </div>
      </div>
    </section>
  );
}
