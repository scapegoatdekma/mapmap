import { useEffect, useRef, useState } from "react";
import { Card, Form, Space } from "antd";
import YandexMap from "../Map/MapView.jsx";
import { useAuth } from "../shared/hooks/useAuth";
import { ROLES } from "../shared/constants/roles";
import MapOverlay from "./MapPage/components/MapOverlay";
import AreasList from "./MapPage/components/AreasList";
import MarkerModal from "./MapPage/components/MarkerModal";
import AreaModal from "./MapPage/components/AreaModal";

const STORAGE_MARKERS = "mapmap.markers";
const STORAGE_AREAS = "mapmap.areas";
const CATEGORY_OPTIONS = [
  { value: "museum", label: "Музей" },
  { value: "club", label: "Клуб" },
  { value: "event", label: "Мероприятие" },
  { value: "place", label: "Локация" },
];
const AREA_TYPES = [
  { value: "city", label: "Город" },
  { value: "district", label: "Район" },
  { value: "quarter", label: "Квартал" },
];

const createId = () => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `m_${Date.now()}_${Math.random().toString(16).slice(2)}`;
};

export default function MapPage() {
  const { role } = useAuth();
  const canEdit = role === ROLES.KRAEVED || role === ROLES.ADMIN;
  const [markers, setMarkers] = useState([]);
  const [areas, setAreas] = useState([]);
  const [markersLoaded, setMarkersLoaded] = useState(false);
  const [areasLoaded, setAreasLoaded] = useState(false);
  const [editMode, setEditMode] = useState("marker"); // marker | area
  const [draftAreaCoords, setDraftAreaCoords] = useState([]);
  const [showTip, setShowTip] = useState(true);
  const [activeMarker, setActiveMarker] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeArea, setActiveArea] = useState(null);
  const [isAreaModalOpen, setIsAreaModalOpen] = useState(false);
  const [editableAreaId, setEditableAreaId] = useState(null);
  const [selectedAreaId, setSelectedAreaId] = useState(null);
  const areaEditsRef = useRef({});
  const [form] = Form.useForm();
  const [areaForm] = Form.useForm();
  const watchedLat = Form.useWatch("latitude", form);
  const watchedLng = Form.useWatch("longitude", form);
  const watchedMedia = Form.useWatch("media", form);
  const watchedMuseums = Form.useWatch("relatedMuseums", form);
  const watchedClubs = Form.useWatch("relatedClubs", form);
  const watchedEvents = Form.useWatch("relatedEvents", form);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_MARKERS);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setMarkers(parsed);
        }
      }
    } catch (e) {
      // ignore
    }
    setMarkersLoaded(true);
  }, []);

  useEffect(() => {
    if (!markersLoaded) return;
    localStorage.setItem(STORAGE_MARKERS, JSON.stringify(markers));
  }, [markers, markersLoaded]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_AREAS);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setAreas(parsed);
        }
      }
    } catch (e) {
      // ignore
    }
    setAreasLoaded(true);
  }, []);

  useEffect(() => {
    if (!areasLoaded) return;
    localStorage.setItem(STORAGE_AREAS, JSON.stringify(areas));
  }, [areas, areasLoaded]);

  const openCreateModal = (latitude, longitude) => {
    setActiveMarker(null);
    form.setFieldsValue({
      name: "",
      description: "",
      category: "place",
      related: "",
      relatedMuseums: "",
      relatedClubs: "",
      relatedEvents: "",
      media: "",
      area: "",
      latitude,
      longitude,
      address: "",
      period: "",
      openingHours: "",
      contacts: "",
      tickets: "",
      source: "",
      tags: "",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (marker) => {
    setActiveMarker(marker);
    form.setFieldsValue({
      name: marker.name ?? "",
      description: marker.description ?? "",
      category: marker.category ?? "place",
      related: (marker.related || []).join(", "),
      relatedMuseums: (marker.relatedMuseums || []).join(", "),
      relatedClubs: (marker.relatedClubs || []).join(", "),
      relatedEvents: (marker.relatedEvents || []).join(", "),
      media: (marker.media || []).join("\n"),
      area: marker.area ?? "",
      latitude: marker.latitude,
      longitude: marker.longitude,
      address: marker.address ?? "",
      period: marker.period ?? "",
      openingHours: marker.openingHours ?? "",
      contacts: marker.contacts ?? "",
      tickets: marker.tickets ?? "",
      source: marker.source ?? "",
      tags: (marker.tags || []).join(", "),
    });
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    const values = await form.validateFields();
    const nextMarker = {
      id: activeMarker?.id ?? createId(),
      name: values.name.trim(),
      description: values.description?.trim() || "",
      category: values.category,
      related: values.related
        ? values.related.split(",").map((item) => item.trim()).filter(Boolean)
        : [],
      relatedMuseums: values.relatedMuseums
        ? values.relatedMuseums.split(",").map((item) => item.trim()).filter(Boolean)
        : [],
      relatedClubs: values.relatedClubs
        ? values.relatedClubs.split(",").map((item) => item.trim()).filter(Boolean)
        : [],
      relatedEvents: values.relatedEvents
        ? values.relatedEvents.split(",").map((item) => item.trim()).filter(Boolean)
        : [],
      media: values.media
        ? values.media.split("\n").map((item) => item.trim()).filter(Boolean)
        : [],
      area: values.area?.trim() || "",
      address: values.address?.trim() || "",
      period: values.period?.trim() || "",
      openingHours: values.openingHours?.trim() || "",
      contacts: values.contacts?.trim() || "",
      tickets: values.tickets?.trim() || "",
      source: values.source?.trim() || "",
      tags: values.tags
        ? values.tags.split(",").map((item) => item.trim()).filter(Boolean)
        : [],
      latitude: Number(values.latitude),
      longitude: Number(values.longitude),
      icon_preset: "islands#blueDotIcon",
      updatedAt: new Date().toISOString(),
      createdAt: activeMarker?.createdAt ?? new Date().toISOString(),
    };

    setMarkers((prev) => {
      if (activeMarker) {
        return prev.map((m) => (m.id === activeMarker.id ? nextMarker : m));
      }
      return [nextMarker, ...prev];
    });
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    if (!activeMarker) return;
    setMarkers((prev) => prev.filter((m) => m.id !== activeMarker.id));
    setIsModalOpen(false);
  };

  const openAreaModal = (coords, area = null) => {
    setActiveArea(area);
    setEditableAreaId(null);
    areaForm.setFieldsValue({
      name: area?.name ?? "",
      description: area?.description ?? "",
      type: area?.type ?? "district",
      tags: (area?.tags || []).join(", "),
      coords,
    });
    setIsAreaModalOpen(true);
  };

  const handleAreaSave = async () => {
    const values = await areaForm.validateFields();
    const nextArea = {
      id: activeArea?.id ?? createId(),
      name: values.name.trim(),
      description: values.description?.trim() || "",
      type: values.type || "district",
      tags: values.tags
        ? values.tags.split(",").map((item) => item.trim()).filter(Boolean)
        : [],
      coords: values.coords || [],
      fillColor: activeArea?.fillColor || "rgba(22,119,255,0.2)",
      strokeColor: activeArea?.strokeColor || "#1677ff",
      updatedAt: new Date().toISOString(),
      createdAt: activeArea?.createdAt ?? new Date().toISOString(),
    };

    setAreas((prev) => {
      if (activeArea) {
        return prev.map((a) => (a.id === activeArea.id ? nextArea : a));
      }
      return [nextArea, ...prev];
    });
    setIsAreaModalOpen(false);
    setEditMode("marker");
    setEditableAreaId(null);
    setSelectedAreaId(null);
    areaEditsRef.current = {};
    setDraftAreaCoords([]);
  };

  const handleAreaDelete = () => {
    if (!activeArea) return;
    setAreas((prev) => prev.filter((a) => a.id !== activeArea.id));
    setIsAreaModalOpen(false);
    setEditableAreaId(null);
    setSelectedAreaId(null);
    if (activeArea?.id) {
      delete areaEditsRef.current[activeArea.id];
    }
  };

  const handleMapClick = (lat, lng) => {
    if (!canEdit) return;
    if (editMode === "area") {
      setDraftAreaCoords((prev) => [...prev, [lat, lng]]);
      return;
    }
    openCreateModal(lat, lng);
  };

  const finishArea = () => {
    if (draftAreaCoords.length < 3) return;
    openAreaModal(draftAreaCoords);
  };

  const selectedArea = areas.find((area) => area.id === selectedAreaId) || null;
  const selectedAreaDraft = selectedAreaId ? areaEditsRef.current[selectedAreaId] : null;

  return (
    <div className="map-page">
      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
        <Card className="map-page__card" bodyStyle={{ padding: 0 }}>
          <div className="map-page__frame">
            <MapOverlay
              canEdit={canEdit}
              showTip={showTip}
              editMode={editMode}
              setShowTip={setShowTip}
              setEditMode={setEditMode}
              setDraftAreaCoords={setDraftAreaCoords}
              setEditableAreaId={setEditableAreaId}
              setSelectedAreaId={setSelectedAreaId}
              areas={areas}
              selectedArea={selectedArea}
              selectedAreaId={selectedAreaId}
              editableAreaId={editableAreaId}
              draftAreaCoords={draftAreaCoords}
              areaEditsRef={areaEditsRef}
              onOpenAreaModal={openAreaModal}
              onSaveAreaDraft={(draft) => {
                if (!selectedAreaId || !draft || draft.length < 3) return;
                setAreas((prev) =>
                  prev.map((area) =>
                    area.id === selectedAreaId ? { ...area, coords: draft } : area
                  )
                );
                delete areaEditsRef.current[selectedAreaId];
                setEditableAreaId(null);
              }}
              onFinishArea={finishArea}
            />
            <YandexMap
              markers={markers.map((m) => ({
                ...m,
                images: m.media && m.media.length ? m.media : [],
              }))}
              areas={areas}
              draftArea={editMode === "area" ? { coords: draftAreaCoords } : null}
              onMapClick={handleMapClick}
              onMarkerClick={(marker) => {
                if (!canEdit) return;
                openEditModal(marker);
              }}
              onAreaClick={(area, coords) => {
                if (!canEdit) return;
                if (editMode === "area") {
                  setSelectedAreaId(area.id);
                  return;
                }
                if (coords?.length === 2) {
                  openCreateModal(coords[0], coords[1]);
                }
              }}
              editableAreaId={editableAreaId}
              onAreaCoordsChange={(areaId, coords) => {
                areaEditsRef.current[areaId] = coords;
              }}
            />
          </div>
        </Card>
        {canEdit && areas.length > 0 && (
          <AreasList areas={areas} areaTypes={AREA_TYPES} onOpen={openAreaModal} />
        )}
      </Space>

      <MarkerModal
        open={isModalOpen}
        activeMarker={activeMarker}
        onCancel={() => setIsModalOpen(false)}
        onDelete={handleDelete}
        onSave={handleSave}
        form={form}
        watchedLat={watchedLat}
        watchedLng={watchedLng}
        watchedMedia={watchedMedia}
        watchedMuseums={watchedMuseums}
        watchedClubs={watchedClubs}
        watchedEvents={watchedEvents}
        categoryOptions={CATEGORY_OPTIONS}
      />

      <AreaModal
        open={isAreaModalOpen}
        activeArea={activeArea}
        onCancel={() => setIsAreaModalOpen(false)}
        onDelete={handleAreaDelete}
        onSave={handleAreaSave}
        afterClose={() => setEditableAreaId(null)}
        areaForm={areaForm}
        areaTypes={AREA_TYPES}
      />
    </div>
  );
}
