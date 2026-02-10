import { Button, Form, Input, Row, Col, Space, Tag, Typography } from "antd";
import PageShell from "../shared/ui/PageShell";
import FeatureCard from "../shared/ui/FeatureCard";
import TextList from "../shared/ui/TextList";
import { useAuth } from "../shared/hooks/useAuth";
import { ROLES } from "../shared/constants/roles";

export default function PosterPage() {
  const { role } = useAuth();
  const canManagePoster = role === ROLES.ADMIN || role === ROLES.KRAEVED;

  return (
    <PageShell
      title="Афиша"
      subtitle="Культурные события и клубные мероприятия."
    >
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <Space direction="vertical" size={4}>
          <Tag color="volcano">Poster</Tag>
          <Typography.Title level={4} style={{ margin: 0 }}>
            События от клубов и музеев
          </Typography.Title>
          <Typography.Text type="secondary">
            Краевед заполняет карточку события, пользователь выбирает, куда пойти.
          </Typography.Text>
        </Space>

        <Row gutter={[16, 16]}>
          <Col xs={24} lg={12}>
            <FeatureCard
              label="Create"
              title="Новое мероприятие"
              actions={
                canManagePoster ? (
                  <>
                    <Button type="primary">Создать событие</Button>
                    <Button>Шаблоны афиши</Button>
                  </>
                ) : (
                  <Button type="primary">Добавить в планнер</Button>
                )
              }
            >
              <TextList
                items={[
                  "Тип: концерт, лекция, спектакль",
                  "Место на карте и время",
                  "Связь с меткой или музеем",
                ]}
              />
            </FeatureCard>
          </Col>
          <Col xs={24} lg={12}>
            <FeatureCard
              label="Selection"
              title="Подборка событий"
              actions={
                <>
                  <Button>Фильтры</Button>
                  <Button type="primary">Добавить в планнер</Button>
                </>
              }
            >
              <TextList
                items={[
                  "Сегодня, выходные, тематические",
                  "Фильтры по интересам и ролям",
                  "Добавление в маршрут",
                ]}
              />
            </FeatureCard>
          </Col>
          <Col xs={24} lg={12}>
            <FeatureCard label="Publishing" title="Публикация">
              <TextList
                items={[
                  "Модерация и проверка редактора",
                  "Уведомления подприсчикам",
                  "Отчеты по посещаемости",
                ]}
              />
            </FeatureCard>
          </Col>
        </Row>

        {canManagePoster && (
          <FeatureCard label="Form" title="Форма создания афиши">
            <Form layout="vertical">
              <Form.Item label="Название события">
                <Input placeholder="Лекция о старых улицах" />
              </Form.Item>
              <Form.Item label="Дата и время">
                <Input placeholder="15.02 18:30" />
              </Form.Item>
              <Form.Item label="Локация">
                <Input placeholder="Музей краеведения" />
              </Form.Item>
              <Form.Item label="Описание">
                <Input.TextArea
                  placeholder="Краткая программа мероприятия."
                  rows={4}
                />
              </Form.Item>
              <Space>
                <Button type="primary">Сохранить черновик</Button>
                <Button>Отправить на модерацию</Button>
              </Space>
            </Form>
          </FeatureCard>
        )}
      </Space>
    </PageShell>
  );
}
