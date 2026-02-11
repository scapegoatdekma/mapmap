import { Button, Card, Form, Input, Row, Col, Space, Tag, Typography } from "antd";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import PageShell from "../shared/ui/PageShell";
import FeatureCard from "../shared/ui/FeatureCard";
import TextList from "../shared/ui/TextList";

export default function ProfilePage() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("mapmap.favorites");
      const parsed = raw ? JSON.parse(raw) : [];
      if (Array.isArray(parsed)) {
        setFavorites(parsed.map(String));
      }
    } catch (e) {
      // ignore
    }
  }, []);

  const favoriteMarkers = useMemo(() => {
    try {
      const raw = localStorage.getItem("mapmap.markers");
      const parsed = raw ? JSON.parse(raw) : [];
      if (!Array.isArray(parsed)) return [];
      const ids = new Set(favorites.map(String));
      return parsed.filter((item) => ids.has(String(item.id)));
    } catch (e) {
      return [];
    }
  }, [favorites]);

  const removeFavorite = (id) => {
    const next = favorites.filter((item) => String(item) !== String(id));
    setFavorites(next);
    localStorage.setItem("mapmap.favorites", JSON.stringify(next));
  };

  return (
    <PageShell
      title="Профиль"
      subtitle="Личный кабинет пользователя и быстрый доступ к планнеру."
    >
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <Space direction="vertical" size={4}>
          <Tag color="purple">User</Tag>
          <Typography.Title level={4} style={{ margin: 0 }}>
            Личный кабинет путешественника
          </Typography.Title>
          <Typography.Text type="secondary">
            стория маршрутов, избранные точки и доступ к планированию.
          </Typography.Text>
        </Space>

        <Row gutter={[16, 16]}>
          <Col xs={24} lg={14}>
            <FeatureCard label="Profile" title="Редактирование профиля">
              <Form layout="vertical">
                <Form.Item label="Имя">
                  <Input placeholder="Дмитрий" />
                </Form.Item>
                <Form.Item label="Почта">
                  <Input type="email" placeholder="name@example.com" />
                </Form.Item>
                <Form.Item label="Город">
                  <Input placeholder="Тула" />
                </Form.Item>
                <Form.Item label="Интересы">
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
                    <Button>История билетов</Button>
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
            <FeatureCard label="Favorites" title="Избранные места">
              {favoriteMarkers.length === 0 ? (
                <Typography.Text type="secondary">
                  Здесь будут ваши сохраненные места.
                </Typography.Text>
              ) : (
                <Space direction="vertical" size="small" style={{ width: "100%" }}>
                  {favoriteMarkers.map((marker) => (
                    <Card key={marker.id} size="small">
                      <Space direction="vertical" size={4} style={{ width: "100%" }}>
                        <Typography.Text strong>{marker.name}</Typography.Text>
                        <Typography.Text type="secondary">
                          {marker.area || "Без района"}
                        </Typography.Text>
                        <Space>
                          <Link to={`/markers/${marker.id}`}>
                            <Button type="primary">Открыть</Button>
                          </Link>
                          <Button onClick={() => removeFavorite(marker.id)}>
                            Удалить
                          </Button>
                        </Space>
                      </Space>
                    </Card>
                  ))}
                </Space>
              )}
            </FeatureCard>
          </Col>
          <Col xs={24} lg={8}>
            <FeatureCard label="History" title="История активностей">
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
