import { Base } from "./base.model";

export interface Role extends Base {
  role_name: string;
  role_description: string;
}