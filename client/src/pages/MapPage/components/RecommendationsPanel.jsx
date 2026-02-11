import { Button, Card, Image, Space, Typography } from "antd";
export default function RecommendationsPanel({ items, onSelect, compact = false, onClose }) {
  if (!items || items.length === 0) return null;

  const loopItems = [...items, ...items];

  return (
    <div className="map-recommendations-panel">
      <Card size="small" className="map-recommendations-panel__card">
        <div className="map-recommendations-panel__head">
          {!compact && <Typography.Text strong>Рекомендации</Typography.Text>}
          {compact && (
            <Button size="small" onClick={onClose}>
              ✕
            </Button>
          )}
        </div>
        <div className="map-recommendations-banner">
          <div className="map-recommendations-banner__track">
            {loopItems.map((marker, idx) => {
              const image =
                Array.isArray(marker.media) && marker.media.length > 0
                  ? marker.media[0]
                  : "";
              return (
                <button
                  key={`${marker.id}-${idx}`}
                  className="map-recommendations-banner__item"
                  type="button"
                  onClick={() => onSelect(marker)}
                >
                  <Image
                    src={image}
                    alt={marker.name}
                    width={220}
                    height={220}
                    preview={false}
                    style={{ objectFit: "cover", borderRadius: 12 }}
                  />
                  <Typography.Text className="map-recommendations-banner__title">
                    {marker.name}
                  </Typography.Text>
                </button>
              );
            })}
          </div>
        </div>
      </Card>
    </div>
  );
}
