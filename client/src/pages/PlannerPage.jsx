import { Button, Form, Input, Row, Col, Select, Space, Tag, Typography } from "antd";
import PageShell from "../shared/ui/PageShell";
import FeatureCard from "../shared/ui/FeatureCard";
import TextList from "../shared/ui/TextList";
import { useAuth } from "../shared/hooks/useAuth";
import { ROLES } from "../shared/constants/roles";

export default function PlannerPage() {
  const { role } = useAuth();
  const canManagePlanner = role === ROLES.ADMIN || role === ROLES.KRAEVED;

  return (
    <PageShell
      title="Планнер"
      subtitle="Маршрут, билеты, логистика и личные задачи."
    >
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <Space direction="vertical" size={4}>
          <Tag color="green">Planner</Tag>
          <Typography.Title level={4} style={{ margin: 0 }}>
            Личный маршрут на день
          </Typography.Title>
          <Typography.Text type="secondary">
            Сценарий поездки с временем, задачами и билетами.
          </Typography.Text>
        </Space>

        <Row gutter={[16, 16]}>
          <Col xs={24} lg={12}>
            <FeatureCard
              label="Timeline"
              title="Таймлайн маршрута"
              actions={
                <>
                  <Button type="primary">
                    {canManagePlanner ? "Добавить точку" : "Добавить в избранное"}
                  </Button>
                  <Button>Сохранить маршрут</Button>
                </>
              }
            >
              <TextList
                items={[
                  "09:00 — музей краеведения",
                  "11:30 — прогулка по историческому кварталу",
                  "14:00 — встреча клуба краеведов",
                  "18:00 — концерт на площади",
                ]}
              />
            </FeatureCard>
          </Col>
          <Col xs={24} lg={12}>
            <FeatureCard
              label="Logistics"
              title="Логистика"
              actions={
                <>
                  <Button type="primary">Подключить билеты</Button>
                  <Button>Вызвать такси</Button>
                </>
              }
            >
              <TextList
                items={[
                  "Билеты на транспорт с внешних сервисов",
                  "Вызов такси между точками",
                  "Оповещения о задержках",
                ]}
              />
            </FeatureCard>
          </Col>
        </Row>

        {canManagePlanner && (
          <FeatureCard label="Create" title="Создание планнера">
            <Form layout="vertical">
              <Form.Item label="Название маршрута">
                <Input placeholder="Маршрут краеведа на выходные" />
              </Form.Item>
              <Form.Item label="Краткое описание">
                <Input.TextArea
                  placeholder="Ключевые точки, тема, особенности маршрута."
                  rows={4}
                />
              </Form.Item>
              <Form.Item label="Категория">
                <Select
                  placeholder="Выберите категорию"
                  options={[
                    { value: "center", label: "Сторический центр" },
                    { value: "museums", label: "Музеи и архивы" },
                    { value: "clubs", label: "Клубные встречи" },
                  ]}
                />
              </Form.Item>
              <Space>
                <Button type="primary">Сохранить шаблон</Button>
                <Button>Предпросмотр</Button>
              </Space>
            </Form>
          </FeatureCard>
        )}

        <Row gutter={[16, 16]}>
          <Col xs={24} lg={12}>
            <FeatureCard label="Checklist" title="Задачи">
              <TextList
                items={[
                  "Скачать оффлайн карту",
                  "Подготовить заметки о метках",
                  "Поделиться маршрутом с друзьями",
                ]}
              />
            </FeatureCard>
          </Col>
          <Col xs={24} lg={12}>
            <FeatureCard label="Saved" title="Сценарии поездок">
              <TextList
                items={[
                  "Исторический центр — 1 день",
                  "Маршрут «краеведческий музей»",
                  "Семейная прогулка с детьми",
                ]}
              />
            </FeatureCard>
          </Col>
        </Row>
      </Space>
    </PageShell>
  );
}
