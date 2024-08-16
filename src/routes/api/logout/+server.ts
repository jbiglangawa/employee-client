import util from "$lib/util.js";
import { json } from "@sveltejs/kit";

export async function POST({ cookies }) {
  util.clearTokenFromStorage(cookies);
  return json({ success: true });
}
