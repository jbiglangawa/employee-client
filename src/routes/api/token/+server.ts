import { SERVER_URL } from '$env/static/private';
import type { LoginForm } from '$lib/models/LoginForm';
import { json } from '@sveltejs/kit';

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
		method: 'POST',
		headers: {
			'content-type': 'application/json'
		},
		body: JSON.stringify({
			query: query,
			variables: { loginForm }
		})
	});

	if (res.status == 200) {
		const resJson = await res.json();
		cookies.set('JESSION_TKEN', JSON.stringify(resJson.data.getToken), {
			path: ''
		});
		console.log(resJson);
		return json(resJson.data.getToken);
	}
	// Exception handling
	return json(res);
}
