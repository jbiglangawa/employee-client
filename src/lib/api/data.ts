import { SERVER_URL } from '$env/static/private';
import type CreateEmployee from '$lib/models/CreateEmployee';
import type { LoginForm } from '$lib/models/LoginForm';
import type PageSize from '$lib/models/PageSize';
import type UpdateEmployee from '$lib/models/UpdateEmployee';
import Util from '../util';

/**
 * Sends an authenticated request to the graphql backend server
 * @param query
 * @param variables
 * @returns
 */
const sendAuthRequest = (query: String, variables: any) => {
	return fetch(SERVER_URL, {
		method: 'POST',
		headers: {
			'content-type': 'application/json',
			Authorization: `Bearer ${Util.getTokenFromStorage().token}`
		},
		body: JSON.stringify({
			query: query,
			variables: variables
		})
	}).then((res) => {
		if (res.status == 403) {
			window.location.href = '/login';
		}
		return res.json();
	});
};

const getAllEmployees = (page: PageSize) => {
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
		{
			pageSize: {
				page: Number(page),
				size: 10
			}
		}
	);
};

const getEmployeeById = (employeeId: Number) => {
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
		{ employeeId }
	);
};

const createEmployee = (employee: CreateEmployee) => {
	return sendAuthRequest(
		`
        mutation CreateEmployee($employee: CreateEmployeeInput!) {
            createEmployee(employee: $employee)
        }`,
		employee
	);
};

const updateEmployee = (employee: UpdateEmployee) => {
	return sendAuthRequest(
		`
        mutation UpdateEmployee($employee: UpdateEmployeeInput!) {
            updateEmployee(employee: $employee)
        }`,
		employee
	);
};

const deleteEmployeeById = (employeeId: Number) => {
	return sendAuthRequest(
		`
        mutation DeleteEmployee($employeeId: Int!) {
            deleteEmployee(employeeId: $employeeId)
        }`,
		{ employeeId }
	);
};

export default {
	getAllEmployees,
	getEmployeeById,
	createEmployee,
	updateEmployee,
	deleteEmployeeById
};
