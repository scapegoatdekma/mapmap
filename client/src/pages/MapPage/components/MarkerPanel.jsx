import { Button, Card, Descriptions, Form, Image, Input, Space, Tag, Typography } from "antd";
import { useEffect, useMemo, useState } from "react";

export default function MarkerPanel({ marker, isFavorite, onToggleFavorite, onClose }) {
  const [comments, setComments] = useState([]);
  const [form] = Form.useForm();

  const storageKey = useMemo(
    () => `mapmap.comments.${marker.id}`,
    [marker.id]
  );

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      const parsed = raw ? JSON.parse(raw) : [];
      if (Array.isArray(parsed)) setComments(parsed);
    } catch (e) {
      // ignore
    }
  }, [storageKey]);

  const handleAddComment = async () => {
    const values = await form.validateFields();
    const next = {
      id: `${Date.now()}_${Math.random().toString(16).slice(2)}`,
      author: values.author.trim(),
      text: values.text.trim(),
      createdAt: new Date().toISOString(),
    };
    const updated = [next, ...comments];
    setComments(updated);
    localStorage.setItem(storageKey, JSON.stringify(updated));
    form.resetFields();
  };

  const handleRemoveComment = (id) => {
    const updated = comments.filter((item) => item.id !== id);
    setComments(updated);
    localStorage.setItem(storageKey, JSON.stringify(updated));
  };

  const media = marker.media || [];
  const related = marker.related || [];
  const relatedMuseums = marker.relatedMuseums || [];
  const relatedClubs = marker.relatedClubs || [];
  const relatedEvents = marker.relatedEvents || [];

  return (
    <div className="map-marker-panel">
      <Card className="map-marker-panel__card">
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <div className="map-marker-panel__head">
            <div>
              <Typography.Title level={4} style={{ marginBottom: 4 }}>
                {marker.name || "Локация"}
              </Typography.Title>
              <Typography.Text type="secondary">
                {marker.description || "Без описания"}
              </Typography.Text>
            </div>
            <Space>
              <Button type={isFavorite ? "default" : "primary"} onClick={onToggleFavorite}>
                {isFavorite ? "Убрать из избранного" : "В избранное"}
              </Button>
              <Button onClick={onClose}>Закрыть</Button>
            </Space>
          </div>

          <Descriptions column={1} size="small">
            <Descriptions.Item label="Категория">
              <Tag color="blue">{marker.category || "—"}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Адрес">{marker.address || "—"}</Descriptions.Item>
            <Descriptions.Item label="Период/эпоха">{marker.period || "—"}</Descriptions.Item>
            <Descriptions.Item label="Область/район">{marker.area || "—"}</Descriptions.Item>
            <Descriptions.Item label="Координаты">
              {marker.latitude?.toFixed?.(6) ?? "—"}, {marker.longitude?.toFixed?.(6) ?? "—"}
            </Descriptions.Item>
          </Descriptions>

          <Card size="small" title="Связанные объекты">
            <Space wrap>
              {related.map((item) => (
                <Tag key={`r-${item}`}>{item}</Tag>
              ))}
              {relatedMuseums.map((item) => (
                <Tag key={`m-${item}`} color="geekblue">
                  {item}
                </Tag>
              ))}
              {relatedClubs.map((item) => (
                <Tag key={`c-${item}`} color="purple">
                  {item}
                </Tag>
              ))}
              {relatedEvents.map((item) => (
                <Tag key={`e-${item}`} color="gold">
                  {item}
                </Tag>
              ))}
              {related.length +
                relatedMuseums.length +
                relatedClubs.length +
                relatedEvents.length ===
                0 && <Typography.Text type="secondary">Нет связей.</Typography.Text>}
            </Space>
          </Card>

          <Card size="small" title="Медиа">
            {media.length === 0 ? (
              <Typography.Text type="secondary">Нет материалов.</Typography.Text>
            ) : (
              <Space wrap>
                {media.map((url) => (
                  <Image
                    key={url}
                    src={url}
                    alt="media"
                    width={140}
                    height={100}
                    style={{ objectFit: "cover", borderRadius: 8 }}
                  />
                ))}
              </Space>
            )}
          </Card>

          <Card size="small" title="Детали">
            <Descriptions column={1} size="small">
              <Descriptions.Item label="Часы работы">
                {marker.openingHours || "—"}
              </Descriptions.Item>
              <Descriptions.Item label="Контакты">{marker.contacts || "—"}</Descriptions.Item>
              <Descriptions.Item label="Билеты/стоимость">
                {marker.tickets || "—"}
              </Descriptions.Item>
              <Descriptions.Item label="Источник">{marker.source || "—"}</Descriptions.Item>
            </Descriptions>
          </Card>

          <Card size="small" title="Комментарии">
            <Form form={form} layout="vertical">
              <Form.Item
                label="Имя"
                name="author"
                rules={[{ required: true, message: "Введите имя" }]}
              >
                <Input placeholder="Ваше имя" />
              </Form.Item>
              <Form.Item
                label="Комментарий"
                name="text"
                rules={[{ required: true, message: "Введите текст" }]}
              >
                <Input.TextArea rows={3} placeholder="Поделитесь впечатлением" />
              </Form.Item>
              <Button type="primary" onClick={handleAddComment}>
                Добавить
              </Button>
            </Form>

            <Space direction="vertical" size="small" style={{ width: "100%", marginTop: 16 }}>
              {comments.length === 0 && (
                <Typography.Text type="secondary">Комментариев пока нет.</Typography.Text>
              )}
              {comments.map((comment) => (
                <Card key={comment.id} size="small">
                  <Space direction="vertical" size={2} style={{ width: "100%" }}>
                    <Typography.Text strong>{comment.author}</Typography.Text>
                    <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                      {new Date(comment.createdAt).toLocaleString("ru-RU")}
                    </Typography.Text>
                    <Typography.Text>{comment.text}</Typography.Text>
                    <Button size="small" onClick={() => handleRemoveComment(comment.id)}>
                      Удалить
                    </Button>
                  </Space>
                </Card>
              ))}
            </Space>
          </Card>
        </Space>
      </Card>
    </div>
  );
}
