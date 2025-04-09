import { Base } from "./base.model";

export interface UserAccount extends Base {
    username: string,
    password: string,
    recovery_email: string,
}