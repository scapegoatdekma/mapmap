import { useMemo } from "react";
import { Button, Card, Descriptions, Image, Space, Tag, Typography } from "antd";
import { Link, useParams } from "react-router-dom";
import PageShell from "../shared/ui/PageShell";

export default function MarkerDetailsPage() {
  const { id } = useParams();

  const marker = useMemo(() => {
    try {
      const raw = localStorage.getItem("mapmap.markers");
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return null;
      return parsed.find((item) => String(item.id) === String(id)) ?? null;
    } catch (e) {
      return null;
    }
  }, [id]);

  if (!marker) {
    return (
      <PageShell title="Метка" subtitle="Детали локации.">
        <Card>
          <Typography.Text type="secondary">Метка не найдена.</Typography.Text>
          <div style={{ marginTop: 12 }}>
            <Link to="/map">
              <Button type="primary">На карту</Button>
            </Link>
          </div>
        </Card>
      </PageShell>
    );
  }

  const media = marker.media || [];
  const related = marker.related || [];
  const relatedMuseums = marker.relatedMuseums || [];
  const relatedClubs = marker.relatedClubs || [];
  const relatedEvents = marker.relatedEvents || [];

  return (
    <PageShell title={marker.name || "Метка"} subtitle={marker.description || "Детали локации."}>
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <Card>
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
        </Card>

        <Card title="Связанные объекты">
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

        <Card title="Медиа">
          {media.length === 0 ? (
            <Typography.Text type="secondary">Нет материалов.</Typography.Text>
          ) : (
            <Space wrap>
              {media.map((url) => (
                <Image
                  key={url}
                  src={url}
                  alt="media"
                  width={160}
                  height={120}
                  style={{ objectFit: "cover", borderRadius: 8 }}
                />
              ))}
            </Space>
          )}
        </Card>

        <Card title="Детали">
          <Descriptions column={1} size="small">
            <Descriptions.Item label="Часы работы">{marker.openingHours || "—"}</Descriptions.Item>
            <Descriptions.Item label="Контакты">{marker.contacts || "—"}</Descriptions.Item>
            <Descriptions.Item label="Билеты/стоимость">{marker.tickets || "—"}</Descriptions.Item>
            <Descriptions.Item label="Источник">{marker.source || "—"}</Descriptions.Item>
          </Descriptions>
        </Card>
      </Space>
    </PageShell>
  );
}
