import type CreateEmployee from './CreateEmployee';

export default interface UpdateEmployee extends CreateEmployee {
	employeeId: Number;
	clearContacts: Boolean;
	clearAddresses: Boolean;
}
