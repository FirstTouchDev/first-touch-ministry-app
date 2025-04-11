import { Base } from "./base.model";
import { Status } from "./enums/status.enum";

export interface UserAccount extends Base {
    accountStatus: Status
    username: string,
    password: string,
    recovery_email: string,
    isUserLoggedIn: boolean,
    lastLogIn: Date,
}