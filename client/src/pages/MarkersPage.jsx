import { Row, Col, Space, Tag, Typography } from "antd";
import PageShell from "../shared/ui/PageShell";
import FeatureCard from "../shared/ui/FeatureCard";
import TextList from "../shared/ui/TextList";

const cards = [
  {
    label: "Core",
    title: "Координаты и базовые данные",
    items: [
      "Точные координаты и геопривязка",
      "Название, эпоха, категория",
      "Источник информации",
    ],
  },
  {
    label: "Events",
    title: "Мероприятия краеведов",
    items: [
      "Заседания клуба краеведов",
      "Экспедиции и встречи",
      "Привязка к точке на карте",
    ],
  },
  {
    label: "Articles",
    title: "Статьи и материалы",
    items: [
      "Исторические статьи",
      "Заметки и архивы",
      "Связанные источники",
    ],
  },
  {
    label: "Info",
    title: "Нформация",
    items: [
      "Описание объекта",
      "Интересные факты",
      "Режим работы и контакты",
    ],
  },
  {
    label: "Photos",
    title: "Фотографии",
    items: [
      "Архивные и современные снимки",
      "Подписи и авторство",
      "В перспективе — восстановление улиц",
    ],
  },
  {
    label: "Culture",
    title: "Культурные события",
    items: [
      "Спектакли, концерты, фестивали",
      "Привязка к месту и дате",
      "Переход в афишу",
    ],
  },
  {
    label: "Museums",
    title: "Музеи",
    items: [
      "Карточки музеев и экспозиций",
      "Рекомендации по маршруту",
      "Связанные коллекции",
    ],
  },
];

export default function MarkersPage() {
  return (
    <PageShell
      title="Метки"
      subtitle="Структура карточки метки и разделы данных."
    >
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <Space direction="vertical" size={4}>
          <Tag color="blue">Markers</Tag>
          <Typography.Title level={4} style={{ margin: 0 }}>
            Карточка метки: все подразделы
          </Typography.Title>
          <Typography.Text type="secondary">
            Краевед заполняет данные по пунктам, пользователь видит готовую
            историю точки.
          </Typography.Text>
        </Space>

        <Row gutter={[16, 16]}>
          {cards.map((card) => (
            <Col key={card.title} xs={24} sm={12} lg={8}>
              <FeatureCard label={card.label} title={card.title}>
                <TextList items={card.items} />
              </FeatureCard>
            </Col>
          ))}
        </Row>
      </Space>
    </PageShell>
  );
}
