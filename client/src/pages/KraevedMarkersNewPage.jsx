import { Form, Input, Button, Space } from "antd";
import PageShell from "../shared/ui/PageShell";

export default function KraevedMarkersNewPage() {
  return (
    <PageShell
      title="Новая метка"
      subtitle="Сторические объекты, координаты, статьи и фото."
    >
      <Form layout="vertical">
        <Form.Item label="Название">
          <Input placeholder="Старый дом, музей, площадь" />
        </Form.Item>
        <Form.Item label="Краткое описание">
          <Input.TextArea rows={4} placeholder="Основные факты и история." />
        </Form.Item>
        <Space>
          <Button type="primary">Сохранить</Button>
          <Button>Отправить на модерацию</Button>
        </Space>
      </Form>
    </PageShell>
  );
}
