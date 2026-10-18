/** Code-editor style window with traffic-light dots and a title bar. */
export default function WindowFrame({ title, className = '', bodyClassName = '', bodyProps, footer, children }) {
  return (
    <div className={`window ${className}`}>
      <div className="window-bar">
        <span className="window-dots" aria-hidden="true"><i /><i /><i /></span>
        <span className="window-title">{title}</span>
      </div>
      <div className={`window-body ${bodyClassName}`} {...bodyProps}>
        {children}
      </div>
      {footer}
    </div>
  );
}
