import { generateUUID } from "@/lib/generateUUID"; // Si te da error de paths, usa:  import { generateUUID } from "../../../lib/generateUUID";

export async function GET() {
  const id = generateUUID();
  return Response.json({ id });
}
