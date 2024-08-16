/**
 * Sends a request to the svelte backend server and redirects to the backend graphQL APIs
 * @param query
 * @param variables
 * @returns
 */
export const sendRequest = (input: RequestInfo | URL, method?: string, body?: any) => {
	let opts: RequestInit = {
		method: method || 'GET',
		headers: {
			'content-type': 'application/json'
		}
	};
	if (body && method != 'GET') {
		opts.body = JSON.stringify(body);
	}
	return fetch(input, opts).then((res) => {
		if (res.status == 403) {
			// window.location.href = '/login';
		}
		return res.json();
	});
};
