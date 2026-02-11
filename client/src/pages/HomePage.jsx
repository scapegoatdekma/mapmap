import {
  Alert,
  Button,
  Card,
  Col,
  Image,
  Row,
  Space,
  Tag,
  Typography,
} from "antd";
import { useEffect, useMemo, useState } from "react";
import PageShell from "../shared/ui/PageShell";
import { useAuth } from "../shared/hooks/useAuth";
import { ROLES } from "../shared/constants/roles";
import mapHeroImage from "./images/1.jpg";

const primarySections = [
  {
    label: "Карта",
    title: "Метки и исторические точки",
    text: "Поиск, фильтры, карточки мест и маршруты рядом. Откройте карту и начните исследовать город.",
    link: "Перейти к карте →",
    image: mapHeroImage,
  },
  {
    label: "Афиша",
    title: "События и встречи",
    text: "Концерты, лекции, клубные мероприятия и музеи. Подборки на выходные и ближайшие дни.",
    link: "Открыть афишу →",
  },
  {
    label: "Планнер",
    title: "Маршрут на день",
    text: "Схораняйте поездки, задачи, билеты и такси. Планируйте маршруты и повторяйте лучшие прогулки.",
    link: "Перейти в планнер →",
  },
  {
    label: "Профиль",
    title: "Личный кабинет",
    text: "Настройки, избранное, история посещений и персональные рекомендации.",
    link: "Открыть профиль →",
  },
];

const quickTiles = [
  {
    title: "Топ-5 мест рядом",
    text: "Лента ближайших меток и музеев по вашему району.",
  },
  {
    title: "События выходных",
    text: "Подборка мероприятий для семейной прогулки.",
  },
  {
    title: "Маршрут дня",
    text: "Готовый план на 4 часа с музеем и прогулкой.",
  },
  {
    title: "Збранные метки",
    text: "Места, которые вы сохраняли в прошлых поездках.",
  },
];

export default function HomePage() {
  const { role } = useAuth();
  const isEditor = role === ROLES.EDITOR;
  const isKraeved = role === ROLES.KRAEVED;
  const isAdmin = role === ROLES.ADMIN;
  const [markers, setMarkers] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("mapmap.markers");
      const parsed = raw ? JSON.parse(raw) : [];
      if (Array.isArray(parsed)) setMarkers(parsed);
    } catch (e) {
      // ignore
    }
    try {
      const raw = localStorage.getItem("mapmap.favorites");
      const parsed = raw ? JSON.parse(raw) : [];
      if (Array.isArray(parsed)) setFavorites(parsed.map(String));
    } catch (e) {
      // ignore
    }
  }, []);

  const recommendations = useMemo(() => {
    const withMedia = markers.filter(
      (m) => Array.isArray(m.media) && m.media.some((url) => typeof url === "string" && url.trim())
    );
    if (withMedia.length === 0) return [];
    const favIds = new Set(favorites.map(String));
    const favMarkers = withMedia.filter((m) => favIds.has(String(m.id)));
    if (favMarkers.length === 0) return withMedia.slice(0, 4);

    const areaSet = new Set(favMarkers.map((m) => m.area).filter(Boolean));
    const categorySet = new Set(favMarkers.map((m) => m.category).filter(Boolean));
    const tagSet = new Set(
      favMarkers.flatMap((m) => (Array.isArray(m.tags) ? m.tags : [])).filter(Boolean)
    );

    const scored = withMedia
      .filter((m) => !favIds.has(String(m.id)))
      .map((m) => {
        let score = 0;
        if (m.area && areaSet.has(m.area)) score += 2;
        if (m.category && categorySet.has(m.category)) score += 2;
        if (Array.isArray(m.tags)) {
          for (const tag of m.tags) {
            if (tagSet.has(tag)) score += 1;
          }
        }
        return { marker: m, score };
      })
      .sort((a, b) => b.score - a.score);

    const top = scored.filter((item) => item.score > 0).slice(0, 4).map((item) => item.marker);
    return top.length > 0 ? top : withMedia.slice(0, 4);
  }, [markers, favorites]);

  return (
    <PageShell
      title="Главная"
      subtitle="Маршруты, события и полезные сервисы для гостей и жителей."
      className="home-page"
    >
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} lg={14}>
            <Space direction="vertical" size="middle">
              <Tag color="blue">Для пользователя</Tag>
              <Typography.Title level={2} style={{ margin: 0 }}>
                Карта краеведа
              </Typography.Title>
              <Typography.Paragraph type="secondary">
                Находите исторические места, планируйте прогулки и узнавайте о
                культурных событиях. Всё в одном месте.
              </Typography.Paragraph>
              <Space wrap>
                <Button type="primary">Начать с карты</Button>
                <Button>Посмотреть афишу</Button>
              </Space>
            </Space>
          </Col>
          <Col xs={24} lg={10}>
            <Card>
              {mapHeroImage ? (
                <Image
                  src={mapHeroImage}
                  alt="Коллаж исторического центра с маршрутом"
                  width="100%"
                  height={220}
                  style={{ objectFit: "cover", borderRadius: 8 }}
                  preview={false}
                />
              ) : (
                <Typography.Text type="secondary">
                  зображение: мягкий дуотон города + тонкая линия маршрута.
                </Typography.Text>
              )}
            </Card>
          </Col>
        </Row>

        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
          <div>
            <Typography.Title level={4} style={{ marginBottom: 4 }}>
              Основные разделы
            </Typography.Title>
            <Typography.Text type="secondary">
              Большие hero-блоки, как на главных страницах сервисов.
            </Typography.Text>
          </div>

          <Space direction="vertical" size="large" style={{ width: "100%" }}>
            {primarySections.map((section) => (
              <Card key={section.title}>
                <Row gutter={[16, 16]} align="middle">
                  <Col xs={24} lg={14}>
                    <Space direction="vertical" size="small">
                      <Tag color="geekblue">{section.label}</Tag>
                      <Typography.Title level={4} style={{ margin: 0 }}>
                        {section.title}
                      </Typography.Title>
                      <Typography.Text type="secondary">
                        {section.text}
                      </Typography.Text>
                      <Button type="link" style={{ padding: 0 }}>
                        {section.link}
                      </Button>
                    </Space>
                  </Col>
                  <Col xs={24} lg={10}>
                    {section.image ? (
                      <Image
                        src={section.image}
                        alt={section.title}
                        width="100%"
                        height={200}
                        style={{ objectFit: "cover", borderRadius: 8 }}
                        preview={false}
                      />
                    ) : (
                      <Card>
                        <Typography.Text type="secondary">
                          зображение: hero-иллюстрация для раздела.
                        </Typography.Text>
                      </Card>
                    )}
                  </Col>
                </Row>
              </Card>
            ))}
          </Space>
        </Space>

        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
          <div>
            <Typography.Title level={4} style={{ marginBottom: 4 }}>
              Полезно сейчас
            </Typography.Title>
            <Typography.Text type="secondary">
              Рекомендации и быстрые подборки на сегодня.
            </Typography.Text>
          </div>
          <Row gutter={[16, 16]}>
            {quickTiles.map((tile) => (
              <Col key={tile.title} xs={24} sm={12} lg={6}>
                <Card>
                  <Typography.Text strong>{tile.title}</Typography.Text>
                  <Typography.Paragraph
                    type="secondary"
                    style={{ marginTop: 8 }}
                  >
                    {tile.text}
                  </Typography.Paragraph>
                </Card>
              </Col>
            ))}
          </Row>
        </Space>

        {recommendations.length > 0 && (
          <Space direction="vertical" size="middle" style={{ width: "100%" }}>
            <div>
              <Typography.Title level={4} style={{ marginBottom: 4 }}>
                Рекомендации
              </Typography.Title>
              <Typography.Text type="secondary">
                Персональные места на основе сохранённых точек.
              </Typography.Text>
            </div>
            <div className="home-recommendations-banner">
              <div className="home-recommendations-banner__track">
                {[...recommendations, ...recommendations].map((marker, idx) => {
                  const image = Array.isArray(marker.media) ? marker.media[0] : "";
                  return (
                    <div key={`${marker.id}-${idx}`} className="home-recommendations-banner__item">
                      <Image
                        src={image}
                        alt={marker.name}
                        width={120}
                        height={120}
                        preview={false}
                        style={{ objectFit: "cover", borderRadius: 14 }}
                      />
                      <Typography.Text className="home-recommendations-banner__title">
                        {marker.name}
                      </Typography.Text>
                    </div>
                  );
                })}
              </div>
            </div>
          </Space>
        )}

        {(isAdmin || isKraeved || isEditor) && (
          <Alert
            type="info"
            message={`Роль ${role} даёт доступ к профессиональным кабинетам.`}
            description="Для обычного пользователя доступен функционал карты, афиши, планнера и профиля."
            showIcon
          />
        )}
      </Space>
    </PageShell>
  );
}
