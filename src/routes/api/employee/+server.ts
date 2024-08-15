import Data from '$lib/api/data.js';
import type PageSize from '$lib/models/PageSize.js';
import { json } from '@sveltejs/kit';

export async function GET({ url, cookies }) {
	const employees = await Data.getAllEmployees(
		{ page: Number(url.searchParams.get('page')), size: 10 },
		cookies
	);
	return json(employees.data.getEmployees);
}
