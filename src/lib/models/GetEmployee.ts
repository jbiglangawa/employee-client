import type { Address } from "cluster";
import type Contact from "./Contact";
import type CreateEmployee from "./CreateEmployee";

export default interface GetEmployee extends CreateEmployee {
  employeeId: Number;
}
