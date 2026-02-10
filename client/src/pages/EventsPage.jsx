import { Empty } from "antd";
import PageShell from "../shared/ui/PageShell";

export default function EventsPage() {
  return (
    <PageShell
      title="События"
      subtitle="Тематические отборы, календарь и подборки."
    >
      <Empty description="Список событий появится здесь." />
    </PageShell>
  );
}
