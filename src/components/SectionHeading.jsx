/** Numbered, left-aligned section heading with a code-comment kicker. */
export default function SectionHeading({ index, title, comment }) {
  return (
    <div className="section-heading">
      <p className="section-kicker">
        <span className="section-index">{String(index).padStart(2, '0')}.</span>
        <span>{`// ${comment}`}</span>
      </p>
      <h2 className="section-title">
        <span>
          {title}
          <span className="title-dot">.</span>
        </span>
      </h2>
    </div>
  );
}
