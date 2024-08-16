import Data from '$lib/api/data.js';
import type CreateEmployee from '$lib/models/CreateEmployee.js';
import type PageSize from '$lib/models/PageSize.js';
import { json } from '@sveltejs/kit';

export async function GET({ url, cookies }) {
	const employees = await Data.getAllEmployees(
		{ page: Number(url.searchParams.get('page')), size: 10 },
		cookies
	);
	return json(employees.data.getEmployees);
}

export async function POST({ request, cookies }) {
	const employee: CreateEmployee = await request.json();
	console.log(employee);
	const res = await Data.createEmployee(employee, cookies);
	console.log(JSON.stringify(res));
	return json({ ...res });
}
