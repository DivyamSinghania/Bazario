export function safeMap(data, callback) {
  return Array.isArray(data) ? data.map(callback) : [];
}