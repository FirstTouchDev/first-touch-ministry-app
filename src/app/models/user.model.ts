import { Base } from './base.model';
import { Role } from './role.model';
import { Department } from './department.model';
import { Gender } from './enums/gender.enum';
import { UserAccount } from './user-account.model';

export interface User extends Omit<Base, 'sys_id'> {
  sys_id?: string;
  user_first_name: string;
  user_middle_name: string;
  user_last_name: string;
  user_full_name: string;
  user_email_address: string;
  user_phone_number: string;
  user_date_of_birth: Date;
  user_gender: Gender; 
  user_address: string;
  user_join_date: Date;
  user_baptism_date: Date;
  user_role: Role[];
  user_department: Department[];
  user_account: UserAccount;
  user_all_access: boolean;
}