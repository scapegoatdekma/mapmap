import { Button, Card, Checkbox, Form, Input, Space, Typography } from "antd";
import { Link } from "react-router-dom";
import PageShell from "../shared/ui/PageShell";

export default function AuthRegisterPage() {
  return (
    <PageShell
      title="Регистрация"
      subtitle="Создайте аккаунт, чтобы сохранять места и строить маршруты."
    >
      <Card style={{ maxWidth: 520 }}>
        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
          <Typography.Title level={4} style={{ margin: 0 }}>
            Новый аккаунт
          </Typography.Title>
          <Typography.Text type="secondary">
            Регистрация для клиентов. Доступы краеведа и менеджера выдаются отдельно.
          </Typography.Text>

          <Form layout="vertical">
            <Form.Item
              label="Имя и фамилия"
              name="name"
              rules={[{ required: true, message: "Введите имя" }]}
            >
              <Input placeholder="Иван Петров" />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Введите email" }]}
            >
              <Input placeholder="name@example.com" />
            </Form.Item>
            <Form.Item
              label="Пароль"
              name="password"
              rules={[{ required: true, message: "Придумайте пароль" }]}
            >
              <Input.Password placeholder="Минимум 8 символов" />
            </Form.Item>
            <Form.Item
              label="Повторите пароль"
              name="passwordRepeat"
              rules={[{ required: true, message: "Повторите пароль" }]}
            >
              <Input.Password placeholder="Повторите пароль" />
            </Form.Item>
            <Form.Item name="policy" valuePropName="checked">
              <Checkbox>
                Согласен с правилами и политикой обработки данных
              </Checkbox>
            </Form.Item>
            <Space direction="vertical" style={{ width: "100%" }} size="small">
              <Button type="primary" block>
                Создать аккаунт
              </Button>
              <Typography.Text type="secondary">
                Уже есть аккаунт? <Link to="/auth/login">Войти</Link>
              </Typography.Text>
            </Space>
          </Form>
        </Space>
      </Card>
    </PageShell>
  );
}
