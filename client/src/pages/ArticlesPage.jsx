import { Empty } from "antd";
import PageShell from "../shared/ui/PageShell";

export default function ArticlesPage() {
  return (
    <PageShell
      title="Статьи"
      subtitle="Сторические материалы, заметки, архивы."
    >
      <Empty description="Список статей будет тут." />
    </PageShell>
  );
}
