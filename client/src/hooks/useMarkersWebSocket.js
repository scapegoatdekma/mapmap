import { useEffect, useRef } from 'react';

const WS_BASE = (() => {
  const u = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  return u.replace(/^http/, 'ws');
})();

/**
 * Подключается к WebSocket серверу и вызывает колбэки при событиях меток и комментариев.
 */
export function useMarkersWebSocket({
  onMarkerCreated,
  onMarkerUpdated,
  onMarkerDeleted,
  onCommentCreated,
  onCommentUpdated,
  onCommentDeleted,
}) {
  const refs = useRef({
    onMarkerCreated,
    onMarkerUpdated,
    onMarkerDeleted,
    onCommentCreated,
    onCommentUpdated,
    onCommentDeleted,
  });
  refs.current = {
    onMarkerCreated,
    onMarkerUpdated,
    onMarkerDeleted,
    onCommentCreated,
    onCommentUpdated,
    onCommentDeleted,
  };

  useEffect(() => {
    const ws = new WebSocket(WS_BASE);
    ws.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data);
        const { type, payload } = msg;
        if (!payload) return;
        if (type === 'marker_created') refs.current.onMarkerCreated?.(payload);
        else if (type === 'marker_updated') refs.current.onMarkerUpdated?.(payload);
        else if (type === 'marker_deleted') refs.current.onMarkerDeleted?.(payload);
        else if (type === 'comment_created') refs.current.onCommentCreated?.(payload);
        else if (type === 'comment_updated') refs.current.onCommentUpdated?.(payload);
        else if (type === 'comment_deleted') refs.current.onCommentDeleted?.(payload);
      } catch (_) {}
    };
    return () => ws.close();
  }, []);
}
