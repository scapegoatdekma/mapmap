import { Form, Input, Button, Space } from "antd";
import PageShell from "../shared/ui/PageShell";

export default function KraevedEventsNewPage() {
  return (
    <PageShell
      title="Новое событие"
      subtitle="Добавьте клубное или культурное событие."
    >
      <Form layout="vertical">
        <Form.Item label="Название">
          <Input placeholder="Лекция, концерт, встреча" />
        </Form.Item>
        <Form.Item label="Дата и время">
          <Input placeholder="15.02 18:30" />
        </Form.Item>
        <Form.Item label="Описание">
          <Input.TextArea rows={4} placeholder="Краткая программа и дополнительная информация." />
        </Form.Item>
        <Space>
          <Button type="primary">Сохранить</Button>
          <Button>Отправить на модерацию</Button>
        </Space>
      </Form>
    </PageShell>
  );
}
