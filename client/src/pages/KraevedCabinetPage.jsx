import PageShell from "../shared/ui/PageShell";
import { Link } from "react-router-dom";

export default function KraevedCabinetPage() {
  return (
    <PageShell
      title="Кабинет краеведа"
      subtitle="Создание меток, статей, мероприятий, работа с контентом."
    >
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <Link to="/kraeved/markers/new">➕ Новая метка</Link>
        <Link to="/kraeved/events/new">➕ Новое мероприятие</Link>
        <Link to="/kraeved/articles/new">➕ Новая статья</Link>
      </div>
    </PageShell>
  );
}
