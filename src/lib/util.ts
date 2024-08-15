import * as Cookies from 'es-cookie';

const TOK3N_KEY = 'JESSION_TKEN';

const clearTokenFromStorage = () => {
	Cookies.remove(TOK3N_KEY);
};

const getTokenFromStorage = () => {
	let cookie = Cookies.get(TOK3N_KEY);
	if (cookie && cookie != 'null') {
		return JSON.parse(cookie);
	} else {
		// Navigate to login page
		// window.location.href = '/login';
	}
};

const saveTokenToStorage = (token: String) => {
	Cookies.set(TOK3N_KEY, JSON.stringify(token));
};

const isUserAndAdmin = () => {
	const roles = getTokenFromStorage().roles;
	return roles.includes('ROLE_USER') && roles.includes('ROLE_ADMIN');
};

export default {
	clearTokenFromStorage,
	getTokenFromStorage,
	saveTokenToStorage,
	isUserAndAdmin
};
