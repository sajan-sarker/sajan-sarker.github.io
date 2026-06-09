import data from '../data/data.json';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="max-w-6xl mx-auto px-4">
        <p>{data.footer.text}</p>
      </div>
    </footer>
  );
}
