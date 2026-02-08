export async function createMarker(payload) {
  console.log("createMarker payload:", payload);

  // потом заменим на fetch("http://localhost:PORT/api/markers", ...)
  return { ok: true, id: Date.now() };
}

export async function getMarkers() {
  // потом заменим на fetch
  return [];
}
