import { SERVER_URL } from "$env/static/private";
import type { LoginForm } from "$lib/models/LoginForm";
import util from "$lib/util.js";
import { json } from "@sveltejs/kit";

export async function POST({ request, cookies }) {
  const loginForm: LoginForm = await request.json();

  const query = `
        mutation GetToken($loginForm: LoginForm!) {
            getToken(loginForm: $loginForm) {
                token
                roles
            }
        }`;

  const res = await fetch(SERVER_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      query: query,
      variables: { loginForm },
    }),
  });

  if (res.status == 200) {
    const resJson = await res.json();
    util.saveTokenToStorage(resJson.data.getToken, cookies);
    return json(resJson.data.getToken);
  }
  // Exception handling
  return json(res);
}
