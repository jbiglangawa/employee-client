import util from "$lib/util.js";
import { redirect } from "@sveltejs/kit";
import { TOK3N_KEY } from "$lib/util.js";

/** @type {import('./$types').PageLoad} */
export async function load({ url, cookies }) {
  try {
    let isAdmin = util.isUserAndAdmin(cookies);
    return {
      post: {
        isUserAndAdmin: isAdmin,
        isTokenReady: cookies.get(TOK3N_KEY),
      },
    };
  } catch (e) {
    if (url.pathname != "/") {
      redirect(307, "/");
    }
  }
}
