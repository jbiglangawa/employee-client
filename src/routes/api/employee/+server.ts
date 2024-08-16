import Data from "$lib/api/data.js";
import type CreateEmployee from "$lib/models/CreateEmployee.js";
import type UpdateEmployee from "$lib/models/UpdateEmployee.js";
import { json } from "@sveltejs/kit";

export async function GET({ url, cookies }) {
  const employees = await Data.getAllEmployees(
    { page: Number(url.searchParams.get("page")), size: 10 },
    cookies,
  );
  return json(employees.data.getEmployees);
}

export async function POST({ request, cookies }) {
  const employee: CreateEmployee = await request.json();
  const res = await Data.createEmployee(employee, cookies);
  return json({ ...res });
}

export async function PATCH({ request, cookies }) {
  const employee: UpdateEmployee = await request.json();
  const res = await Data.updateEmployee(employee, cookies);
  return json({ ...res });
}
