import { Empty } from "antd";
import PageShell from "../shared/ui/PageShell";

export default function PhotosPage() {
  return (
    <PageShell
      title="Фото"
      subtitle="Фотоархив и галереи с метками."
    >
      <Empty description="Фотоархив будет здесь." />
    </PageShell>
  );
}
