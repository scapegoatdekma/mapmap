import { useEffect, useState } from 'react';

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) {
      if (window.ymaps) return resolve(window.ymaps);
      existing.addEventListener('load', () => resolve(window.ymaps));
      existing.addEventListener('error', reject);
      return;
    }
    const s = document.createElement('script');
    s.src = src;
    s.async = true;
    s.onload = () => resolve(window.ymaps);
    s.onerror = reject;
    document.head.appendChild(s);
  });
}

/**
 * Подключает Yandex Maps API 2.1 (как в mapPoint). Возвращает ymaps и error.
 */
export function useYandexMaps() {
  const [ymaps, setYmaps] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const key = import.meta.env.VITE_YANDEX_MAPS_API_KEY;
    if (!key) {
      setError(new Error('VITE_YANDEX_MAPS_API_KEY не задан'));
      return;
    }
    const src = `https://api-maps.yandex.ru/2.1/?apikey=${encodeURIComponent(key)}&lang=ru_RU`;
    loadScript(src)
      .then((y) => y.ready(() => setYmaps(y)))
      .catch((e) => setError(e));
  }, []);

  return { ymaps, error };
}
