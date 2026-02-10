import { Empty } from "antd";
import PageShell from "../shared/ui/PageShell";

export default function MuseumsPage() {
  return (
    <PageShell
      title="Музеи"
      subtitle="Подборки музеев, экспозиций и маршрутов."
    >
      <Empty description="Список музеев появится здесь." />
    </PageShell>
  );
}
