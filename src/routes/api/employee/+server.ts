import Data from '$lib/api/data.js';
import type PageSize from '$lib/models/PageSize.js';
import { json } from '@sveltejs/kit';

export async function GET({ params, cookies }) {
	console.log('GET', params);

	// await Data.getAllEmployees(pageSize, cookies);
	return json({});
}
