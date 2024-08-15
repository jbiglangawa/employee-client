import type { Cookies } from '@sveltejs/kit';

const TOK3N_KEY = 'JESSION_TKEN';

const clearTokenFromStorage = (cookies: Cookies) => {
	cookies.delete(TOK3N_KEY, { path: '/' });
};

const getTokenFromStorage = (cookies: Cookies) => {
	let cookie = cookies.get(TOK3N_KEY);
	if (cookie && cookie != 'null') {
		return JSON.parse(cookie);
	} else {
		// Navigate to login page
		// window.location.href = '/login';
	}
};

const saveTokenToStorage = (token: String, cookies: Cookies) => {
	cookies.set(TOK3N_KEY, JSON.stringify(token), {
		path: '/'
	});
};

const isUserAndAdmin = (cookies: Cookies) => {
	const roles = getTokenFromStorage(cookies).roles;
	return roles.includes('ROLE_USER') && roles.includes('ROLE_ADMIN');
};

export default {
	clearTokenFromStorage,
	getTokenFromStorage,
	saveTokenToStorage,
	isUserAndAdmin
};
