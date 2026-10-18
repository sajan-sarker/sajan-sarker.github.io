import { useState } from 'react';
import data from '../data/data.json';

const QUOTES = data.footer.quotes ?? [];

export default function Footer() {
  // Pick one quote per page load
  const [quote] = useState(() => QUOTES[Math.floor(Math.random() * QUOTES.length)]);

  return (
    <footer className="site-footer">
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p>{data.footer.text}</p>
        {quote && (
          <p className="footer-quote">
            <span className="text-accent">{'// '}</span>
            &ldquo;{quote.text}&rdquo;
            {quote.author && <span className="footer-quote-author"> — {quote.author}</span>}
          </p>
        )}
      </div>
    </footer>
  );
}
