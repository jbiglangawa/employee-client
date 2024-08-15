import type { Address } from 'cluster';
import type Contact from './Contact';

export default interface CreateEmployee {
	firstName: String;
	lastName: String;
	middleName: String;
	age: Number;
	birthDate: String;
	hireDate: String;
	gender: String;
	maritalStatus: String;
	currentPosition: String;
	contacts: Contact[];
	addresses: Address[];
}
