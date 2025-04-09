import { Base } from "./base.model";
import { User } from "./user.model";

export interface Department extends Base {
  department_group: string;
  department_description: string;
  department_head: User;

}
