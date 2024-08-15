import { json } from '@sveltejs/kit';
import Data from '$lib/api/data.js';

/** @type {import('./$types').PageLoad} */
export async function load({ cookies }) {
	const employees = await Data.getAllEmployees({ page: 0, size: 10 }, cookies);
	return {
		post: employees.data.getEmployees
	};
}
