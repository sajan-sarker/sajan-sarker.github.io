import data from '../data/data.json';

export default function ContactSection() {
  const { intro, subIntro, email, phone, location } = data.contact;

  return (
    <section id="contact" className="section-wrapper section-alt">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="section-heading">Contact</h2>
        <div className="content-card text-center reveal" style={{padding: '2.5rem 2rem'}}>
          <p className="text-lg text-slate-300">{intro}</p>
          <p className="text-lg text-slate-300 mt-2">{subIntro}</p>
          <div className="mt-6 flex flex-col md:flex-row justify-center gap-3 md:gap-5 text-base md:text-lg">
            <p>
              <strong>Email:</strong>{' '}
              <a href={`mailto:${email}`}>{email}</a>
            </p>
            <p>
              <strong>Phone:</strong> {phone}
            </p>
            <p>
              <strong>Location:</strong> {location}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
