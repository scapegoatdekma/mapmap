import { Alert, Button, Card, Select, Space, Tag } from "antd";

export default function MapOverlay({
  canEdit,
  showTip,
  editMode,
  setShowTip,
  setEditMode,
  setDraftAreaCoords,
  setEditableAreaId,
  setSelectedAreaId,
  areas,
  selectedArea,
  selectedAreaId,
  editableAreaId,
  draftAreaCoords,
  areaEditsRef,
  onOpenAreaModal,
  onSaveAreaDraft,
  onFinishArea,
}) {
  return (
    <div className="map-page__overlay">
      <Space direction="vertical" size="small">
        {showTip &&
          (canEdit ? (
            <Alert
              type="info"
              showIcon
              closable
              onClose={() => setShowTip(false)}
              message="Режим краеведа"
              description={
                editMode === "area"
                  ? "Кликните по карте, чтобы добавлять вершины области."
                  : "Кликните по карте, чтобы создать новую точку."
              }
            />
          ) : (
            <Alert
              type="info"
              showIcon
              closable
              onClose={() => setShowTip(false)}
              message="Публичная карта"
              description="Вы можете просматривать метки. Редактирование доступно краеведам."
            />
          ))}
        {canEdit && (
          <Card size="small" className="map-tools">
            <Space wrap className="map-tools__row">
              <Space size="small" className="map-tools__group">
                <Button
                  type={editMode === "marker" ? "primary" : "default"}
                  onClick={() => {
                    setEditMode("marker");
                    setDraftAreaCoords([]);
                    setEditableAreaId(null);
                    setSelectedAreaId(null);
                  }}
                >
                  Метки
                </Button>
                <Button
                  type={editMode === "area" ? "primary" : "default"}
                  onClick={() => {
                    setEditMode("area");
                    setDraftAreaCoords([]);
                    setEditableAreaId(null);
                  }}
                >
                  Области
                </Button>
              </Space>
              {editMode === "area" && (
                <Space size="small" className="map-tools__group">
                  <Select
                    placeholder="Выберите область"
                    style={{ minWidth: 200 }}
                    value={selectedAreaId}
                    options={areas.map((area) => ({
                      value: area.id,
                      label: area.name,
                    }))}
                    onChange={(value) => {
                      setSelectedAreaId(value);
                      setEditableAreaId(null);
                      if (value == null) {
                        areaEditsRef.current = {};
                      }
                    }}
                    allowClear
                  />
                  <Button
                    disabled={!selectedArea}
                    onClick={() => {
                      if (!selectedArea) return;
                      onOpenAreaModal(selectedArea.coords, selectedArea);
                    }}
                  >
                    Свойства
                  </Button>
                  <Button
                    type={editableAreaId ? "primary" : "default"}
                    disabled={!selectedArea}
                    onClick={() => {
                      if (!selectedArea) return;
                      setEditableAreaId((prev) => {
                        const next = prev === selectedArea.id ? null : selectedArea.id;
                        if (!next) delete areaEditsRef.current[selectedArea.id];
                        return next;
                      });
                    }}
                  >
                    Перетаскивать вершины
                  </Button>
                  <Button
                    type="primary"
                    disabled={!selectedAreaId}
                    onClick={() => onSaveAreaDraft(areaEditsRef.current[selectedAreaId])}
                  >
                    Сохранить область
                  </Button>
                  <Tag color="blue">Точек: {draftAreaCoords.length}</Tag>
                  <Button
                    type="primary"
                    disabled={draftAreaCoords.length < 3}
                    onClick={onFinishArea}
                  >
                    Завершить область
                  </Button>
                  <Button onClick={() => setDraftAreaCoords([])}>Очистить</Button>
                </Space>
              )}
            </Space>
          </Card>
        )}
      </Space>
    </div>
  );
}
