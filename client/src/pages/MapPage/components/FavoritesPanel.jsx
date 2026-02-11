import { Button, Card, Space, Typography } from "antd";
export default function FavoritesPanel({ items, onSelect, onRemove, compact = false, onClose }) {
  if (!items || items.length === 0) return null;

  return (
    <div className="map-favorites-panel">
      <Card size="small" className="map-favorites-panel__card">
        <div className="map-favorites-panel__head">
          {!compact && <Typography.Text strong>Избранные места</Typography.Text>}
          {compact && (
            <Button size="small" onClick={onClose}>
              ✕
            </Button>
          )}
        </div>
        <Space direction="vertical" size="small" style={{ width: "100%" }}>
          {items.map((marker) => (
            <div key={marker.id} className="map-favorites-panel__item">
              <div>
                <Typography.Text strong>{marker.name}</Typography.Text>
                <Typography.Text type="secondary" style={{ display: "block" }}>
                  {marker.area || "Без района"}
                </Typography.Text>
              </div>
              <Space size="small">
                <Button type="primary" onClick={() => onSelect(marker)}>
                  Открыть
                </Button>
                <Button onClick={() => onRemove(marker.id)}>Убрать</Button>
              </Space>
            </div>
          ))}
        </Space>
      </Card>
    </div>
  );
}
