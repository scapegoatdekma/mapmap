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

export default function YandexMap({ markers = [], onMapClick, onMarkerClick }) {
  const { ymaps, error } = useYandexMaps();
  const mapElRef = useRef(null);
  const mapRef = useRef(null);
  const placemarksRef = useRef(new Map()); // id -> Placemark
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!ymaps || !mapElRef.current || mapRef.current) return;

    const map = new ymaps.Map(
      mapElRef.current,
      {
        center: DEFAULT_CENTER,
        zoom: DEFAULT_ZOOM,
        controls: ['zoomControl', 'geolocationControl'],
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
      setReady(false);
    };
  }, [ymaps, onMapClick]);

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
