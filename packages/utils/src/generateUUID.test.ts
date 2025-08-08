import { describe, it, expect } from "vitest";
import { generateUUID } from "./generateUUID";

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

describe("generateUUID", () => {
  it("genera un UUID con el formato v4", () => {
    const id = generateUUID();
    expect(UUID_RE.test(id)).toBe(true);

    // version = '4' en el 3er bloque, primer char (índice 14 global)
    expect(id[14]).toBe("4");

    // variant = [8,9,a,b] en el 4to bloque, primer char (índice 19 global)
    expect(/[89ab]/i.test(id[19])).toBe(true);
  });

  it("genera valores únicos en múltiples llamadas", () => {
    const set = new Set<string>();
    for (let i = 0; i < 1000; i++) set.add(generateUUID());
    expect(set.size).toBe(1000);
  });
});
