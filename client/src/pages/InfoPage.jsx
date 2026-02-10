import { Empty } from "antd";
import PageShell from "../shared/ui/PageShell";

export default function InfoPage() {
  return (
    <PageShell
      title="Нфо"
      subtitle="Справочные материалы и помощь."
    >
      <Empty description="Справочные материалы будут здесь." />
    </PageShell>
  );
}
