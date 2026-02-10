import { Button, Card, Space, Typography } from "antd";

export default function AreasList({ areas, areaTypes = [], onOpen }) {
  return (
    <Card>
      <Typography.Title level={5} style={{ marginTop: 0 }}>
        Области
      </Typography.Title>
      <Space direction="vertical" size="small" style={{ width: "100%" }}>
        {areas.map((area) => (
          <Button
            key={area.id}
            type="text"
            style={{ textAlign: "left" }}
            onClick={() => onOpen(area.coords, area)}
          >
            {area.name} · {areaTypes.find((t) => t.value === area.type)?.label || "—"}
          </Button>
        ))}
      </Space>
    </Card>
  );
}
