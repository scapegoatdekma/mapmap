import { Button, Divider, Form, Input, Modal, Select, Typography } from "antd";

export default function AreaModal({
  open,
  activeArea,
  onCancel,
  onDelete,
  onSave,
  afterClose,
  areaForm,
  areaTypes,
}) {
  return (
    <Modal
      title={activeArea ? "Редактирование области" : "Новая область"}
      open={open}
      onCancel={onCancel}
      onOk={onSave}
      okText={activeArea ? "Сохранить" : "Создать"}
      cancelText="Отмена"
      afterClose={afterClose}
      footer={[
        activeArea ? (
          <Button key="delete" danger onClick={onDelete}>
            Удалить область
          </Button>
        ) : null,
        <Button key="cancel" onClick={onCancel}>
          Отмена
        </Button>,
        <Button key="ok" type="primary" onClick={onSave}>
          {activeArea ? "Сохранить" : "Создать"}
        </Button>,
      ].filter(Boolean)}
    >
      <Form form={areaForm} layout="vertical">
        <Form.Item
          label="Название"
          name="name"
          rules={[{ required: true, message: "Введите название области" }]}
        >
          <Input placeholder="Центральный район" />
        </Form.Item>
        <Form.Item label="Тип" name="type">
          <Select options={areaTypes} />
        </Form.Item>
        <Form.Item label="Описание" name="description">
          <Input.TextArea rows={3} placeholder="Короткое описание территории." />
        </Form.Item>
        <Form.Item label="Теги" name="tags">
          <Input placeholder="история, прогулка" />
        </Form.Item>
        <Divider />
        <Typography.Text type="secondary">
          Вершин: {areaForm.getFieldValue("coords")?.length ?? 0}
        </Typography.Text>
        <Form.Item name="coords" hidden>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}
