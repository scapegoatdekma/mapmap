import { Button, Card, Form, Input, Space, Typography } from "antd";
import { Link } from "react-router-dom";
import PageShell from "../shared/ui/PageShell";

export default function AuthLoginPage() {
  return (
    <PageShell
      title="Вход"
      subtitle="Авторизуйтесь, чтобы сохранять избранное и строить маршруты."
    >
      <Card style={{ maxWidth: 480 }}>
        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
          <Typography.Title level={4} style={{ margin: 0 }}>
            Войти в аккаунт
          </Typography.Title>
          <Typography.Text type="secondary">
            Доступ к профилю, планнеру и комментариям.
          </Typography.Text>

          <Form layout="vertical">
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
              rules={[{ required: true, message: "Введите пароль" }]}
            >
              <Input.Password placeholder="Введите пароль" />
            </Form.Item>
            <Space direction="vertical" style={{ width: "100%" }} size="small">
              <Button type="primary" block>
                Войти
              </Button>
              <Typography.Text type="secondary">
                Нет аккаунта? <Link to="/auth/register">Зарегистрироваться</Link>
              </Typography.Text>
              <Typography.Text type="secondary">
                Забыли пароль? Восстановление будет добавлено позже.
              </Typography.Text>
            </Space>
          </Form>
        </Space>
      </Card>
    </PageShell>
  );
}
