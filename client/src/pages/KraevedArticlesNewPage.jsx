import { Form, Input, Button, Space } from "antd";
import PageShell from "../shared/ui/PageShell";

export default function KraevedArticlesNewPage() {
  return (
    <PageShell
      title="Новая статья"
      subtitle="Создание нового исторического материала."
    >
      <Form layout="vertical">
        <Form.Item label="Заголовок">
          <Input placeholder="Стория улицы..." />
        </Form.Item>
        <Form.Item label="Краткое описание">
          <Input.TextArea rows={4} placeholder="Основные факты и сюжет." />
        </Form.Item>
        <Space>
          <Button type="primary">Сохранить</Button>
          <Button>Отправить на модерацию</Button>
        </Space>
      </Form>
    </PageShell>
  );
}
