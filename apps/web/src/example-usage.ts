import { generateUUID } from "@bound/utils";
import type { UUID, WithId } from "@bound/types";

export function demo(): WithId {
  const id: UUID = generateUUID();
  return { id };
}
