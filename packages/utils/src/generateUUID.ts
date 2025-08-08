/**
 * generateUUID — SSR/Browser safe
 * - Prefiere Web Crypto (randomUUID / getRandomValues)
 * - Evita window/document (válido en Server Components)
 * - Fallback no-cripto solo para no romper en entornos limitados
 */
export function generateUUID(): string {
  const cryptoObj = (globalThis as any)?.crypto;

  // 1) randomUUID si está disponible
  if (cryptoObj?.randomUUID) {
    return cryptoObj.randomUUID();
  }

  // 2) getRandomValues para UUID v4
  if (cryptoObj?.getRandomValues) {
    const bytes = new Uint8Array(16);
    cryptoObj.getRandomValues(bytes);
    bytes[6] = (bytes[6] & 0x0f) | 0x40; // version 4
    bytes[8] = (bytes[8] & 0x3f) | 0x80; // variant RFC 4122
    const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join(
      "",
    );
    return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
  }

  // 3) Fallback no-cripto (usar solo para entornos de prueba/debug)
  const s4 = () =>
    Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
}
