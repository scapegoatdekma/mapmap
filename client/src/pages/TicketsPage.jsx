import { Empty } from "antd";
import PageShell from "../shared/ui/PageShell";

export default function TicketsPage() {
  return (
    <PageShell
      title="Билеты"
      subtitle="Билеты, поездки и сохранённые маршруты."
    >
      <Empty description="Список билетов появится здесь." />
    </PageShell>
  );
}
