import PageShell from "../shared/ui/PageShell";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <PageShell title="404" subtitle="Страница не найдена">
      <div style={{ display: "grid", gap: 12 }}>
        <div>Такой страницы нет.</div>
        <Link to="/">← На главную</Link>
      </div>
    </PageShell>
  );
}
