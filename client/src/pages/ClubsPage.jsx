import { Button, Row, Col, Space, Tag, Typography } from "antd";
import PageShell from "../shared/ui/PageShell";
import FeatureCard from "../shared/ui/FeatureCard";
import TextList from "../shared/ui/TextList";

export default function ClubsPage() {
  return (
    <PageShell
      title="Кабинеты клубов"
      subtitle="Организации, клубы краеведов, музеи и библиотеки."
    >
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <Space direction="vertical" size={4}>
          <Tag color="cyan">Clubs</Tag>
          <Typography.Title level={4} style={{ margin: 0 }}>
            Кабинет организации
          </Typography.Title>
          <Typography.Text type="secondary">
            Профиль клуба, мероприятия, участники и публичные материалы.
          </Typography.Text>
        </Space>

        <Row gutter={[16, 16]}>
          <Col xs={24} lg={12}>
            <FeatureCard
              label="Profile"
              title="Профиль клуба"
              actions={
                <>
                  <Button type="primary">Редактировать</Button>
                  <Button>Публичная страница</Button>
                </>
              }
            >
              <TextList
                items={[
                  "Описание организации и миссия",
                  "Контакты, адрес, расписание",
                  "Галерея и архив проектов",
                ]}
              />
            </FeatureCard>
          </Col>
          <Col xs={24} lg={12}>
            <FeatureCard
              label="Events"
              title="Мероприятия клуба"
              actions={
                <>
                  <Button type="primary">Создать событие</Button>
                  <Button>Список событий</Button>
                </>
              }
            >
              <TextList
                items={[
                  "Создание события для афиши",
                  "Регистрация участников",
                  "Отчеты после мероприятий",
                ]}
              />
            </FeatureCard>
          </Col>
          <Col xs={24} lg={12}>
            <FeatureCard
              label="Members"
              title="Участники"
              actions={<Button>Управлять участниками</Button>}
            >
              <TextList
                items={[
                  "Списки и роли внутри организации",
                  "Приглашения и заявки",
                  "Права на публикацию",
                ]}
              />
            </FeatureCard>
          </Col>
          <Col xs={24} lg={12}>
            <FeatureCard
              label="Library"
              title="Материалы"
              actions={<Button>Загрузить материалы</Button>}
            >
              <TextList
                items={[
                  "Статьи, фото и архивы",
                  "Привязка к меткам на карте",
                  "Общий каталог клуба",
                ]}
              />
            </FeatureCard>
          </Col>
        </Row>

        <Typography.Paragraph type="secondary">
          Кабинет клуба используется организациями, меузеями и библиотеками для
          ведения афиши и публикации контента.
        </Typography.Paragraph>
      </Space>
    </PageShell>
  );
}
