import { Button, Row, Col, Space, Tag, Typography } from "antd";
import PageShell from "../shared/ui/PageShell";
import FeatureCard from "../shared/ui/FeatureCard";
import TextList from "../shared/ui/TextList";

export default function EditorDashboardPage() {
  return (
    <PageShell
      title="Редактор"
      subtitle="Проверка и выпуск контента по меткам."
    >
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <Space direction="vertical" size={4}>
          <Tag color="gold">Editor</Tag>
          <Typography.Title level={4} style={{ margin: 0 }}>
            Панель редактора</Typography.Title>
          <Typography.Text type="secondary">
            Контроль качества данных, правки и публикации.
          </Typography.Text>
        </Space>

        <Row gutter={[16, 16]}>
          <Col xs={24} lg={12}>
            <FeatureCard
              label="Queue"
              title="Очередь на проверку"
              actions={<Button type="primary">Открыть очередь</Button>}
            >
              <TextList
                items={[
                  "Новые метки и события",
                  "Обновленные статьи и фото",
                  "Приоритетные заявки",
                ]}
              />
            </FeatureCard>
          </Col>
          <Col xs={24} lg={12}>
            <FeatureCard
              label="Fixes"
              title="На доработку"
              actions={<Button>Список правок</Button>}
            >
              <TextList
                items={[
                  "Возврат авторам с комментариями",
                  "Запрос источников и подтверждений",
                  "Проверка корректности координат",
                ]}
              />
            </FeatureCard>
          </Col>
          <Col xs={24} lg={12}>
            <FeatureCard label="Publish" title="Готово к публикации">
              <TextList
                items={[
                  "Утверждение и выпуск",
                  "Расписание публикаций",
                  "Лог изменений",
                ]}
              />
            </FeatureCard>
          </Col>
          <Col xs={24} lg={12}>
            <FeatureCard label="Guides" title="Чек-листы">
              <TextList
                items={[
                  "Качество контента и фактов",
                  "Мультимедиа и источники",
                  "Правила оформления",
                ]}
              />
            </FeatureCard>
          </Col>
        </Row>
      </Space>
    </PageShell>
  );
}
