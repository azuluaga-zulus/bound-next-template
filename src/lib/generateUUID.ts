/**
 * generateUUID
 * - SSR/Browser safe: no usa window/document.
 * - Prefiere Web Crypto (randomUUID / getRandomValues).
 * - Fallback no-cripto si nada está disponible.
 */
export function generateUUID(): string {
  // 1) Node 20+ y navegadores modernos
  const cryptoObj = (globalThis as any)?.crypto;
  if (cryptoObj?.randomUUID) {
    return cryptoObj.randomUUID();
  }

  // 2) Si no hay randomUUID, usar getRandomValues para UUID v4
  if (cryptoObj?.getRandomValues) {
    const bytes = new Uint8Array(16);
    cryptoObj.getRandomValues(bytes);
    // version (4) y variant (RFC 4122)
    bytes[6] = (bytes[6] & 0x0f) | 0x40;
    bytes[8] = (bytes[8] & 0x3f) | 0x80;

    const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join(
      "",
    );
    return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
  }

  // 3) Último fallback (no cripto): suficiente para IDs locales/debug
  const s4 = () =>
    Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
}

export default generateUUID;
