import Data from "$lib/api/data.js";
import { json } from "@sveltejs/kit";

export async function GET({ url, cookies }) {
  const employees = await Data.getEmployeeById(
    Number(url.searchParams.get("id")),
    cookies,
  );
  return json(employees.data.getEmployeeById);
}

export async function DELETE({ url, cookies }) {
  const res = await Data.deleteEmployeeById(
    Number(url.searchParams.get("id")),
    cookies,
  );
  return json(res.data.deleteEmployee);
}
