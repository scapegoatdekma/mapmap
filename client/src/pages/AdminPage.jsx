import { Button, Form, Input, Row, Col, Select, Space, Statistic, Tag, Typography } from "antd";
import PageShell from "../shared/ui/PageShell";
import FeatureCard from "../shared/ui/FeatureCard";
import TextList from "../shared/ui/TextList";

export default function AdminPage() {
  return (
    <PageShell
      title="Админка"
      subtitle="Управление пользователями, ролями, модерацией и интеграциями."
    >
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <Space direction="vertical" size={4}>
          <Tag color="red">Admin</Tag>
          <Typography.Title level={4} style={{ margin: 0 }}>
            Центр управления картой краеведа
          </Typography.Title>
          <Typography.Text type="secondary">
            Полный контроль над доступами, качеством данных и безопасностью.
          </Typography.Text>
        </Space>

        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} lg={6}>
            <FeatureCard label="Users" title="Users">
              <Statistic title="Пользователей" value={128} />
            </FeatureCard>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <FeatureCard label="Queue" title="Queue">
              <Statistic title="Ожидают модерации" value={23} />
            </FeatureCard>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <FeatureCard label="Integrations" title="Integrations">
              <Statistic title="Интеграций активны" value={7} />
            </FeatureCard>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <FeatureCard label="Uptime" title="Uptime">
              <Statistic title="Доступность" value="99.7%" />
            </FeatureCard>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col xs={24} lg={12}>
            <FeatureCard
              label="Users"
              title="Пользователи и роли"
              actions={
                <>
                  <Button type="primary">Управлять ролями</Button>
                  <Button>Журнал аудита</Button>
                </>
              }
            >
              <TextList
                items={[
                  "Назначение ролей: админ, краевед, редактор, пользователь",
                  "Блокировки и восстановление доступа",
                  "Журнал входов и подозрительной активности",
                ]}
              />
            </FeatureCard>
          </Col>
          <Col xs={24} lg={12}>
            <FeatureCard
              label="Moderation"
              title="Модерация контента"
              actions={
                <>
                  <Button type="primary">Очередь модерации</Button>
                  <Button>Настройки правил</Button>
                </>
              }
            >
              <TextList
                items={[
                  "Очередь новых меток и правок",
                  "Жалобы пользователей и причины отклонений",
                  "Гибкие правила проверки по типам данных",
                ]}
              />
            </FeatureCard>
          </Col>
          <Col xs={24} lg={12}>
            <FeatureCard
              label="Data"
              title="Справочники и доступы"
              actions={
                <>
                  <Button>Категории</Button>
                  <Button>Шаблоны</Button>
                </>
              }
            >
              <TextList
                items={[
                  "Категории меток, музеев и событий",
                  "Шаблоны карточек и обязательные поля",
                  "Карта прав доступа по организациям",
                ]}
              />
            </FeatureCard>
          </Col>
          <Col xs={24} lg={12}>
            <FeatureCard
              label="Integrations"
              title="Интеграции"
              actions={
                <>
                  <Button type="primary">Управлять API</Button>
                  <Button>Вебхуки</Button>
                </>
              }
            >
              <TextList
                items={[
                  "Парсинг билетов и расписаний транспорта",
                  "Подключение такси и маршрутов",
                  "API для внешних музеев и библиотек",
                ]}
              />
            </FeatureCard>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col xs={24} lg={12}>
            <FeatureCard label="Poster" title="Создание афиши">
              <Form layout="vertical">
                <Form.Item label="Название">
                  <Input placeholder="Экскурсия по центру" />
                </Form.Item>
                <Form.Item label="Организатор">
                  <Input placeholder="Клуб краеведов" />
                </Form.Item>
                <Form.Item label="Дата">
                  <Input placeholder="20.02 18:00" />
                </Form.Item>
                <Space>
                  <Button type="primary">Сохранить</Button>
                  <Button>Опубликовать</Button>
                </Space>
              </Form>
            </FeatureCard>
          </Col>
          <Col xs={24} lg={12}>
            <FeatureCard label="Planner" title="Создание планнера">
              <Form layout="vertical">
                <Form.Item label="Название маршрута">
                  <Input placeholder="Исторический день" />
                </Form.Item>
                <Form.Item label="Описание">
                  <Input.TextArea placeholder="Ключевые точки и логика." rows={4} />
                </Form.Item>
                <Space>
                  <Button type="primary">Сохранить шаблон</Button>
                  <Button>Назначить роли</Button>
                </Space>
              </Form>
            </FeatureCard>
          </Col>
        </Row>

        <FeatureCard label="Markers" title="Добавление метки (скоро)">
          <Form layout="vertical">
            <Form.Item label="Название метки">
              <Input placeholder="Старая усадьба" />
            </Form.Item>
            <Form.Item label="Метка">
              <Select
                placeholder="Выбрать метку на карте"
                options={[
                  { value: "old", label: "Старая усадьба" },
                  { value: "museum", label: "Краеведческий музей" },
                  { value: "square", label: "Городская площадь" },
                ]}
              />
            </Form.Item>
            <Form.Item label="Источник">
              <Input placeholder="Архивный документ" />
            </Form.Item>
            <Typography.Text type="secondary">
              Добавление точки на карте будет подключено позже.
            </Typography.Text>
          </Form>
        </FeatureCard>

        <Typography.Paragraph type="secondary">
          Роль администратора контролирует качество данных, права доступа и безопасность платформы. Это главный
          уровень принятия решений.
        </Typography.Paragraph>
      </Space>
    </PageShell>
  );
}
