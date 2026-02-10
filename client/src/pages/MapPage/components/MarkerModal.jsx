import { Button, Divider, Form, Image, Input, Modal, Select, Space, Tabs, Typography } from "antd";

export default function MarkerModal({
  open,
  activeMarker,
  onCancel,
  onDelete,
  onSave,
  form,
  watchedLat,
  watchedLng,
  watchedMedia,
  watchedMuseums,
  watchedClubs,
  watchedEvents,
  categoryOptions,
}) {
  const modalFooter = [
    activeMarker ? (
      <Button key="delete" danger onClick={onDelete}>
        Удалить точку
      </Button>
    ) : null,
    <Button key="cancel" onClick={onCancel}>
      Отмена
    </Button>,
    <Button key="ok" type="primary" onClick={onSave}>
      {activeMarker ? "Сохранить" : "Создать"}
    </Button>,
  ].filter(Boolean);

  return (
    <Modal
      title={activeMarker ? "Редактирование точки" : "Новая точка"}
      open={open}
      onCancel={onCancel}
      footer={modalFooter}
    >
      <Form form={form} layout="vertical">
        <Tabs
          items={[
            {
              key: "main",
              label: "Основное",
              children: (
                <Space direction="vertical" size="small" style={{ width: "100%" }}>
                  <Form.Item
                    label="Название"
                    name="name"
                    rules={[{ required: true, message: "Введите название" }]}
                  >
                    <Input placeholder="Старый дом купца" />
                  </Form.Item>
                  <Form.Item label="Описание" name="description">
                    <Input.TextArea rows={3} placeholder="Короткая историческая справка." />
                  </Form.Item>
                  <Form.Item label="Категория" name="category">
                    <Select options={categoryOptions} />
                  </Form.Item>
                  <Form.Item label="Адрес" name="address">
                    <Input placeholder="ул. Ленина, 10" />
                  </Form.Item>
                  <Form.Item label="Период/эпоха" name="period">
                    <Input placeholder="XIX век" />
                  </Form.Item>
                  <Form.Item label="Область/район" name="area">
                    <Input placeholder="Центральный район" />
                  </Form.Item>
                  <Typography.Text type="secondary">
                    Координаты: {watchedLat?.toFixed?.(6) ?? "—"}, {watchedLng?.toFixed?.(6) ?? "—"}
                  </Typography.Text>
                </Space>
              ),
            },
            {
              key: "media",
              label: "Медиа",
              children: (
                <>
                  <Form.Item label="Фото/видео (каждая ссылка с новой строки)" name="media">
                    <Input.TextArea rows={4} placeholder="https://..." />
                  </Form.Item>
                  {watchedMedia && String(watchedMedia).trim().length > 0 && (
                    <>
                      <Divider />
                      <Space wrap>
                        {String(watchedMedia)
                          .split("\n")
                          .map((url) => url.trim())
                          .filter(Boolean)
                          .map((url) => (
                            <Image
                              key={url}
                              src={url}
                              alt="media"
                              width={120}
                              height={90}
                              style={{ objectFit: "cover", borderRadius: 8 }}
                            />
                          ))}
                      </Space>
                    </>
                  )}
                </>
              ),
            },
            {
              key: "links",
              label: "Связи",
              children: (
                <>
                  <Form.Item label="Связанные объекты" name="related">
                    <Input placeholder="музей, клуб, мероприятие" />
                  </Form.Item>
                  <Form.Item label="Музеи" name="relatedMuseums">
                    <Input placeholder="Музей истории, Галерея" />
                  </Form.Item>
                  <Form.Item label="Клубы" name="relatedClubs">
                    <Input placeholder="Клуб краеведов, Лекторий" />
                  </Form.Item>
                  <Form.Item label="Мероприятия" name="relatedEvents">
                    <Input placeholder="Лекция, Экскурсия" />
                  </Form.Item>
                  <Form.Item label="Теги" name="tags">
                    <Input placeholder="история, архитектура, прогулка" />
                  </Form.Item>
                  {(watchedMuseums || watchedClubs || watchedEvents) && (
                    <>
                      <Divider />
                      <Typography.Text type="secondary">
                        Связи будут показаны в карточке локации.
                      </Typography.Text>
                    </>
                  )}
                </>
              ),
            },
            {
              key: "info",
              label: "Детали",
              children: (
                <>
                  <Form.Item label="Часы работы" name="openingHours">
                    <Input placeholder="10:00–18:00" />
                  </Form.Item>
                  <Form.Item label="Контакты" name="contacts">
                    <Input placeholder="телефон, сайт" />
                  </Form.Item>
                  <Form.Item label="Билеты/стоимость" name="tickets">
                    <Input placeholder="от 200 ₽" />
                  </Form.Item>
                  <Form.Item label="Источник" name="source">
                    <Input placeholder="архив, книга, сайт" />
                  </Form.Item>
                </>
              ),
            },
          ]}
        />
        <Form.Item name="latitude" hidden>
          <Input />
        </Form.Item>
        <Form.Item name="longitude" hidden>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}
