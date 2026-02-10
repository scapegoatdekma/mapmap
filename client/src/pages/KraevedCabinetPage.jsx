import { Button, Form, Input, Row, Col, Select, Space, Tag, Typography } from "antd";
import PageShell from "../shared/ui/PageShell";
import FeatureCard from "../shared/ui/FeatureCard";
import TextList from "../shared/ui/TextList";

export default function KraevedCabinetPage() {
  return (
    <PageShell
      title="Кабинет краеведа"
      subtitle="Создание меток, статей, мероприятий и контента."
    >
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <Space direction="vertical" size={4}>
          <Tag color="purple">Kraeved</Tag>
          <Typography.Title level={4} style={{ margin: 0 }}>
            Рабочее пространство краеведа</Typography.Title>
          <Typography.Text type="secondary">
            Заполнение карточек меток по пунктам и подготовка афиши.
          </Typography.Text>
        </Space>

        <Row gutter={[16, 16]}>
          <Col xs={24} lg={12}>
            <FeatureCard
              label="Marker"
              title="Новая метка"
              actions={
                <>
                  <Button type="primary">Создать метку</Button>
                  <Button>Шаблоны меток</Button>
                </>
              }
            >
              <TextList
                items={[
                  "Координаты и геопривязка",
                  "Информация, статьи, фото",
                  "Связанные события и музеи",
                ]}
              />
            </FeatureCard>
          </Col>
          <Col xs={24} lg={12}>
            <FeatureCard
              label="Articles"
              title="Статьи и заметки"
              actions={<Button>Новая статья</Button>}
            >
              <TextList
                items={[
                  "Исторические материалы",
                  "Привязка к точкам на карте",
                  "Статусы публикации",
                ]}
              />
            </FeatureCard>
          </Col>
          <Col xs={24} lg={12}>
            <FeatureCard
              label="Events"
              title="Мероприятия клуба"
              actions={<Button type="primary">Создать событие</Button>}
            >
              <TextList
                items={[
                  "Заседания и выезды",
                  "Культурные события",
                  "Включение в афишу",
                ]}
              />
            </FeatureCard>
          </Col>
          <Col xs={24} lg={12}>
            <FeatureCard
              label="Media"
              title="Фотоархив"
              actions={<Button>Загрузить фото</Button>}
            >
              <TextList
                items={[
                  "Загрузка фотографий",
                  "Подписи и источники",
                  "Подготовка подборок",
                ]}
              />
            </FeatureCard>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col xs={24} lg={12}>
            <FeatureCard label="Poster" title="Создание афиши">
              <Form layout="vertical">
                <Form.Item label="Название события">
                  <Input placeholder="Встреча клуба" />
                </Form.Item>
                <Form.Item label="Дата и время">
                  <Input placeholder="19.02 18:00" />
                </Form.Item>
                <Form.Item label="Локация">
                  <Input placeholder="Библиотека" />
                </Form.Item>
                <Space>
                  <Button type="primary">Сохранить</Button>
                  <Button>Отправить редактору</Button>
                </Space>
              </Form>
            </FeatureCard>
          </Col>
          <Col xs={24} lg={12}>
            <FeatureCard label="Planner" title="Создание планнера">
              <Form layout="vertical">
                <Form.Item label="Название маршрута">
                  <Input placeholder="Маршрут по музеям" />
                </Form.Item>
                <Form.Item label="Описание">
                  <Input.TextArea
                    placeholder="Ключевые точки и рекомендация по времени."
                    rows={4}
                  />
                </Form.Item>
                <Space>
                  <Button type="primary">Сохранить</Button>
                  <Button>Поделиться</Button>
                </Space>
              </Form>
            </FeatureCard>
          </Col>
        </Row>

        <FeatureCard label="Markers" title="Добавление метки (скоро)">
          <Form layout="vertical">
            <Form.Item label="Название метки">
              <Input placeholder="Старый дом купца" />
            </Form.Item>
            <Form.Item label="Метка">
              <Select
                placeholder="Выбрать метку на карте"
                options={[
                  { value: "house", label: "Старый дом купца" },
                  { value: "library", label: "Городская библиотека" },
                  { value: "square", label: "Площадь ремесленников" },
                ]}
              />
            </Form.Item>
            <Form.Item label="Сточник">
              <Input placeholder="Архивная справка" />
            </Form.Item>
            <Typography.Text type="secondary">
              Добавление точки на карте будет доступно позднее.
            </Typography.Text>
          </Form>
        </FeatureCard>

        <Typography.Paragraph type="secondary">
          Роль краеведа отвечает за наполнение базы и качественные исторические
          данные для пользователей.
        </Typography.Paragraph>
      </Space>
    </PageShell>
  );
}
