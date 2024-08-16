import { type Cookies } from "@sveltejs/kit";

export const TOK3N_KEY = "JESSION_TKEN";

const clearTokenFromStorage = (cookies: Cookies) => {
  cookies.delete(TOK3N_KEY, { path: "/" });
};

const getTokenFromStorage = (cookies: Cookies) => {
  let cookie = cookies.get(TOK3N_KEY);
  if (cookie && cookie != "null") {
    return JSON.parse(cookie);
  } else {
    throw "Failed to authorize user";
  }
};

const saveTokenToStorage = (token: String, cookies: Cookies) => {
  cookies.set(TOK3N_KEY, JSON.stringify(token), {
    path: "/",
  });
};

const isUserAndAdmin = (cookies: Cookies): boolean => {
  const token = getTokenFromStorage(cookies);
  if (token?.roles) {
    return (
      token.roles.includes("ROLE_USER") && token.roles.includes("ROLE_ADMIN")
    );
  } else {
    return false;
  }
};

export default {
  clearTokenFromStorage,
  getTokenFromStorage,
  saveTokenToStorage,
  isUserAndAdmin,
};
