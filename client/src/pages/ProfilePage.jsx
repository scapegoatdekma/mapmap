import { Button, Form, Input, Row, Col, Space, Tag, Typography } from "antd";
import PageShell from "../shared/ui/PageShell";
import FeatureCard from "../shared/ui/FeatureCard";
import TextList from "../shared/ui/TextList";

export default function ProfilePage() {
  return (
    <PageShell
      title="Профиль"
      subtitle="Личный кабинет пользователя и быстрый доступ к планнеру."
    >
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <Space direction="vertical" size={4}>
          <Tag color="purple">User</Tag>
          <Typography.Title level={4} style={{ margin: 0 }}>
            Личный кабинет путешественника</Typography.Title>
          <Typography.Text type="secondary">
            стория маршрутов, избранные точки и доступ к планированию.
          </Typography.Text>
        </Space>

        <Row gutter={[16, 16]}>
          <Col xs={24} lg={14}>
            <FeatureCard label="Profile" title="Редактирование профиля">
              <Form layout="vertical">
                <Form.Item label="Мя">
                  <Input placeholder="Дмитрий" />
                </Form.Item>
                <Form.Item label="Почта">
                  <Input type="email" placeholder="name@example.com" />
                </Form.Item>
                <Form.Item label="Город">
                  <Input placeholder="Тула" />
                </Form.Item>
                <Form.Item label="Нтересы">
                  <Input placeholder="Архитектура, музеи, прогулки" />
                </Form.Item>
                <Space>
                  <Button type="primary">Сохранить</Button>
                  <Button>Сбросить</Button>
                </Space>
              </Form>
            </FeatureCard>
          </Col>
          <Col xs={24} lg={10}>
            <Space direction="vertical" size="large" style={{ width: "100%" }}>
              <FeatureCard
                label="Planner"
                title="Мой планнер"
                actions={
                  <>
                    <Button type="primary">Открыть планнер</Button>
                    <Button>Сохранить шаблон</Button>
                  </>
                }
              >
                <TextList
                  items={[
                    "Маршрут на день и таймлайн остановок",
                    "Добавление музеев и событий в путь",
                    "Предложения по логистике и такси",
                  ]}
                />
              </FeatureCard>

              <FeatureCard
                label="Tickets"
                title="Билеты и поездки"
                actions={
                  <>
                    <Button>стория билетов</Button>
                    <Button type="primary">Вызвать такси</Button>
                  </>
                }
              >
                <TextList
                  items={[
                    "Парсинг билетов с внешних сервисов",
                    "Оповещения о смене расписаний",
                    "Быстрый вызов такси по маршруту",
                  ]}
                />
              </FeatureCard>
            </Space>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col xs={24} lg={8}>
            <FeatureCard label="Favorites" title="Збранные места">
              <TextList
                items={[
                  "Сохраненные метки и музеи",
                  "Личные заметки и фото",
                  "Шаблоны подборок",
                ]}
              />
            </FeatureCard>
          </Col>
          <Col xs={24} lg={8}>
            <FeatureCard label="History" title="Стория активностей">
              <TextList
                items={[
                  "Посещенные события и статьи",
                  "Маршруты и отзывы",
                  "Запросы на новые точки",
                ]}
              />
            </FeatureCard>
          </Col>
          <Col xs={24} lg={8}>
            <FeatureCard label="Settings" title="Настройки профиля">
              <TextList
                items={[
                  "Персональные данные и контакты",
                  "Уведомления и рассылки",
                  "Привязка соцсетей",
                ]}
              />
            </FeatureCard>
          </Col>
        </Row>
      </Space>
    </PageShell>
  );
}
