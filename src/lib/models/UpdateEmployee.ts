import type GetEmployee from "./GetEmployee";

export default interface UpdateEmployee extends GetEmployee {
  clearContacts: Boolean;
  clearAddresses: Boolean;
}
