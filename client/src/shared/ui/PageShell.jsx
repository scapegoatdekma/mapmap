import "./pageShell.scss";

export default function PageShell({ title, subtitle, children }) {
  return (
    <div className="pageShell">
      <div className="pageShell-head">
        <h1 className="pageShell-title">{title}</h1>
        {subtitle && <div className="pageShell-subtitle">{subtitle}</div>}
      </div>

      <div className="pageShell-body">{children}</div>
    </div>
  );
}
