import { Card, Space, Tag, Typography } from "antd";

export default function FeatureCard({ label, title, children, actions, size = "default" }) {
  return (
    <Card
      size={size}
      title={
        <Space size="small" wrap>
          {label && <Tag color="blue">{label}</Tag>}
          {title && <Typography.Text strong>{title}</Typography.Text>}
        </Space>
      }
    >
      {children}
      {actions && (
        <Space style={{ marginTop: 12 }} wrap>
          {actions}
        </Space>
      )}
    </Card>
  );
}
