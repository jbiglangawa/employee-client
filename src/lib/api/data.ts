import { SERVER_URL } from '$env/static/private';
import type CreateEmployee from '$lib/models/CreateEmployee';
import type { LoginForm } from '$lib/models/LoginForm';
import type PageSize from '$lib/models/PageSize';
import type UpdateEmployee from '$lib/models/UpdateEmployee';
import type { Cookies } from '@sveltejs/kit';
import Util from '../util';

/**
 * Sends an authenticated request to the graphql backend server
 * @param query
 * @param variables
 * @returns
 */
const sendAuthRequest = (query: String, variables: any, cookies: Cookies) => {
	return fetch(SERVER_URL, {
		method: 'POST',
		headers: {
			'content-type': 'application/json',
			Authorization: `Bearer ${Util.getTokenFromStorage(cookies).token}`
		},
		body: JSON.stringify({
			query: query,
			variables: variables
		})
	}).then((res) => {
		if (res.status == 403) {
			// window.location.href = '/login';
		}
		return res.json();
	});
};

const getAllEmployees = (pageSize: PageSize, cookies: Cookies) => {
	console.log(pageSize);
	return sendAuthRequest(
		`query GetEmployees($pageSize: PageSize!) {
            getEmployees(pageSize: $pageSize) {
                employees {
                    employeeId
                    firstName
                    lastName
                    middleName
                    birthDate
                    hireDate
                    contacts {
                        contactInfo
                        isPrimary
                    }
                    addresses {
                        address1
                        isPrimary
                    }
                }
                totalCount
            }
        }`,
		{ pageSize },
		cookies
	);
};

const getEmployeeById = (employeeId: Number, cookies: Cookies) => {
	return sendAuthRequest(
		`
        query GetEmployees($employeeId: Int!) {
            getEmployeeById(employeeId: $employeeId) {
                employeeId
                firstName
                lastName
                middleName
                birthDate
                hireDate
                gender
                maritalStatus
                currentPosition
                contacts {
                    contactId
                    contactInfo
                    isPrimary
                }
                addresses {
                    addressId
                    address1
                    address2
                    isPrimary
                }
            }
        }`,
		{ employeeId },
		cookies
	);
};

const createEmployee = (employee: CreateEmployee, cookies: Cookies) => {
	return sendAuthRequest(
		`
        mutation CreateEmployee($employee: CreateEmployeeInput!) {
            createEmployee(employee: $employee)
        }`,
		{ employee },
		cookies
	);
};

const updateEmployee = (employee: UpdateEmployee, cookies: Cookies) => {
	return sendAuthRequest(
		`
        mutation UpdateEmployee($employee: UpdateEmployeeInput!) {
            updateEmployee(employee: $employee)
        }`,
		employee,
		cookies
	);
};

const deleteEmployeeById = (employeeId: Number, cookies: Cookies) => {
	return sendAuthRequest(
		`
        mutation DeleteEmployee($employeeId: Int!) {
            deleteEmployee(employeeId: $employeeId)
        }`,
		{ employeeId },
		cookies
	);
};

export default {
	getAllEmployees,
	getEmployeeById,
	createEmployee,
	updateEmployee,
	deleteEmployeeById
};
