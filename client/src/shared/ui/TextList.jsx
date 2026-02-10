import { List, Typography } from "antd";

export default function TextList({ items }) {
  if (!items?.length) return null;

  return (
    <List
      size="small"
      split={false}
      dataSource={items}
      renderItem={(item) => (
        <List.Item style={{ padding: "4px 0" }}>
          <Typography.Text>{item}</Typography.Text>
        </List.Item>
      )}
    />
  );
}
