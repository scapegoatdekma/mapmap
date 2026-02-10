import { Card, Space, Typography } from "antd";

export default function PageShell({ title, subtitle, children }) {
  return (
    <div className="page-shell">
      <Space direction="vertical" size="large" style={{ width: "100%" }} className="page-shell__stack">
        <div className="page-shell__head">
          <Typography.Title level={2} style={{ marginBottom: 0 }}>
            {title}
          </Typography.Title>
          {subtitle && (
            <Typography.Text type="secondary">{subtitle}</Typography.Text>
          )}
        </div>
        <Card className="page-shell__card">{children}</Card>
      </Space>
    </div>
  );
}
