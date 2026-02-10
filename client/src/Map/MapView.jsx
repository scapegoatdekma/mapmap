import { useEffect, useRef, useState } from 'react';
import { Alert, Spin } from 'antd';
import { useYandexMaps } from '../hooks/useYandexMaps';
import './MapView.css';

const DEFAULT_CENTER = [55.755826, 37.617644]; // Москва [lat, lng]
const DEFAULT_ZOOM = 10;

function escapeHtml(s) {
  return String(s ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

export default function YandexMap({
  markers = [],
  areas = [],
  draftArea,
  onMapClick,
  onMarkerClick,
  onAreaClick,
  editableAreaId,
  onAreaCoordsChange,
}) {
  const { ymaps, error } = useYandexMaps();
  const mapElRef = useRef(null);
  const mapRef = useRef(null);
  const placemarksRef = useRef(new Map()); // id -> Placemark
  const polygonsRef = useRef(new Map()); // id -> Polygon
  const polygonChangeHandlers = useRef(new Map()); // id -> handler
  const editableAreaIdRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!ymaps || !mapElRef.current || mapRef.current) return;

    const map = new ymaps.Map(
      mapElRef.current,
      {
        center: DEFAULT_CENTER,
        zoom: DEFAULT_ZOOM,
        controls: ['zoomControl'],
      },
      { suppressMapOpenBlock: true }
    );
    mapRef.current = map;

    map.events.add('click', (e) => {
      const coords = e.get('coords');
      if (coords && onMapClick) {
        onMapClick(coords[0], coords[1]);
      }
    });

    setReady(true);
    return () => {
      map.destroy();
      mapRef.current = null;
      placemarksRef.current.clear();
      polygonsRef.current.clear();
      setReady(false);
    };
  }, [ymaps, onMapClick]);

  useEffect(() => {
    if (!ready || !mapRef.current) return;
    const handleResize = () => {
      try {
        mapRef.current.container.fitToViewport();
      } catch (e) {
        // ignore
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [ready]);

  useEffect(() => {
    if (!ready || !ymaps || !mapRef.current) return;
    const map = mapRef.current;

    const nextIds = new Set(markers.map((m) => m.id));
    for (const [id, pm] of placemarksRef.current.entries()) {
      if (!nextIds.has(id)) {
        map.geoObjects.remove(pm);
        placemarksRef.current.delete(id);
      }
    }

    for (const m of markers) {
      if (placemarksRef.current.has(m.id)) continue;
      const imgUrl = m.images?.[0];
      const apiBase = import.meta.env.VITE_API_URL || '';
      const imgSrc = imgUrl ? (imgUrl.startsWith('http') ? imgUrl : `${apiBase}${imgUrl}`) : '';
      const balloonContentBody = [
        m.description ? `<div style="max-width:280px">${escapeHtml(m.description)}</div>` : '',
        imgSrc ? `<div style="margin-top:8px"><img src="${escapeHtml(imgSrc)}" alt="" style="max-width:260px;max-height:180px;object-fit:contain;border-radius:4px;" /></div>` : '',
      ].filter(Boolean).join('') || '<div style="max-width:280px">—</div>';
      const preset = m.icon_preset && typeof m.icon_preset === 'string' ? m.icon_preset : 'islands#blueDotIcon';
      const pm = new ymaps.Placemark(
        [m.latitude, m.longitude],
        {
          balloonContentHeader: `<b>${escapeHtml(m.name || 'Метка')}</b>`,
          balloonContentBody,
          balloonContentFooter: m.author_name ? `<small>${escapeHtml(m.author_name)}</small>` : '',
        },
        { preset }
      );
      pm.events.add('click', () => onMarkerClick?.(m));
      placemarksRef.current.set(m.id, pm);
      map.geoObjects.add(pm);
    }
  }, [ready, ymaps, markers, onMarkerClick]);

  useEffect(() => {
    if (!ready || !ymaps || !mapRef.current) return;
    const map = mapRef.current;

    const nextIds = new Set(areas.map((a) => a.id));
    for (const [id, polygon] of polygonsRef.current.entries()) {
      if (!nextIds.has(id)) {
        const handler = polygonChangeHandlers.current.get(id);
        if (handler) {
          try {
            polygon.geometry.events.remove("change", handler);
          } catch (e) {
            // ignore
          }
          polygonChangeHandlers.current.delete(id);
        }
        map.geoObjects.remove(polygon);
        polygonsRef.current.delete(id);
      }
    }

    for (const area of areas) {
      const existing = polygonsRef.current.get(area.id);
      const props = {
        hintContent: escapeHtml(area.name || "Область"),
        balloonContentHeader: `<b>${escapeHtml(area.name || "Область")}</b>`,
        balloonContentBody: area.description
          ? `<div style="max-width:260px">${escapeHtml(area.description)}</div>`
          : '<div style="max-width:260px">—</div>',
      };
      const options = {
        fillColor: area.fillColor || "rgba(22,119,255,0.2)",
        strokeColor: area.strokeColor || "#1677ff",
        strokeWidth: 2,
      };

      if (existing) {
        const isEditing = editableAreaId && editableAreaId === area.id;
        if (!isEditing) {
          existing.geometry.setCoordinates([area.coords]);
        }
        existing.properties.set(props);
        existing.options.set(options);
        if (isEditing) {
          try {
            existing.editor?.startEditing?.();
          } catch (e) {
            // ignore
          }
        }
        continue;
      }

      const polygon = new ymaps.Polygon([area.coords], props, options);
      polygon.events.add("click", (e) => {
        const coords = e.get("coords");
        onAreaClick?.(area, coords);
      });
      if (onAreaCoordsChange) {
        const handler = () => {
          const coords = polygon.geometry.getCoordinates()?.[0] || [];
          onAreaCoordsChange(area.id, coords);
          if (editableAreaIdRef.current === area.id) {
            setTimeout(() => {
              try {
                polygon.editor?.startEditing?.();
              } catch (e) {
                // ignore
              }
            }, 0);
          }
        };
        polygon.geometry.events.add("change", handler);
        polygonChangeHandlers.current.set(area.id, handler);
      }
      polygonsRef.current.set(area.id, polygon);
      map.geoObjects.add(polygon);
    }
  }, [ready, ymaps, areas, onAreaClick, editableAreaId]);

  useEffect(() => {
    if (!ready || !ymaps || !mapRef.current) return;
    editableAreaIdRef.current = editableAreaId;
    for (const [id, polygon] of polygonsRef.current.entries()) {
      const shouldEdit = editableAreaId && id === editableAreaId;
      try {
        if (shouldEdit) {
          polygon.editor?.startEditing?.();
          setTimeout(() => {
            try {
              polygon.editor?.startEditing?.();
            } catch (e) {
              // ignore
            }
          }, 50);
        } else {
          polygon.editor?.stopEditing?.();
        }
      } catch (e) {
        // ignore
      }
    }
  }, [ready, ymaps, editableAreaId]);

  useEffect(() => {
    if (!ready || !ymaps || !mapRef.current) return;
    if (editableAreaId) return;
    for (const area of areas) {
      const polygon = polygonsRef.current.get(area.id);
      if (!polygon) continue;
      try {
        polygon.geometry.setCoordinates([area.coords]);
      } catch (e) {
        // ignore
      }
    }
  }, [ready, ymaps, editableAreaId, areas]);

  useEffect(() => {
    if (!ready || !ymaps || !mapRef.current) return;
    const map = mapRef.current;
    const draftId = "__draft__";

    if (!draftArea?.coords?.length) {
      const existing = polygonsRef.current.get(draftId);
      if (existing) {
        map.geoObjects.remove(existing);
        polygonsRef.current.delete(draftId);
      }
      return;
    }

    const existing = polygonsRef.current.get(draftId);
    if (existing) {
      existing.geometry.setCoordinates([draftArea.coords]);
      return;
    }

    const polygon = new ymaps.Polygon(
      [draftArea.coords],
      { hintContent: "Черновик области" },
      {
        fillColor: "rgba(99,102,241,0.18)",
        strokeColor: "#6366f1",
        strokeWidth: 2,
        strokeStyle: "dash",
      }
    );
    polygonsRef.current.set(draftId, polygon);
    map.geoObjects.add(polygon);
  }, [ready, ymaps, draftArea]);

  if (error) {
    return (
      <div className="yandex-map-container yandex-map-placeholder">
        <Alert
          type="warning"
          message="Карта недоступна"
          description={error.message || String(error)}
          showIcon
        />
      </div>
    );
  }

  if (!ymaps) {
    return (
      <div className="yandex-map-container">
        {/* <div className="yandex-map-loading">
          <Spin size="large" tip="Загрузка карты..." />
        </div> */}
      </div>
    );
  }

  return (
    <div className="yandex-map-container">
      <div ref={mapElRef} className="yandex-map-element" />
    </div>
  );
}
