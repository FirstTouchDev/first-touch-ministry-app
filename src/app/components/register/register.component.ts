import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CustomBackButtonComponent } from "../custom-back-button/custom-back-button.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../models/user.model';
import { UserService } from '../../services/firebase/user.service';
import { Status } from '../../models/enums/status.enum';
import { SpinnerService } from '../../services/prompts/spinner.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    CustomBackButtonComponent,
    ReactiveFormsModule,
    RouterLink,
],
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent  implements OnInit {


  public registrationForm!: FormGroup;
  public loginForm!: FormGroup;
  

  constructor(
    private userService: UserService,
    private spinnerService: SpinnerService,
  ) { 
    
  }

  ngOnInit() {

    this.registrationForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      middleName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      emailAddress: new FormControl('', [Validators.required, Validators.email]),
      phoneNumber: new FormControl('', [Validators.required]),
      birthDate: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      joinDate: new FormControl(),
      baptismDate: new FormControl(),
      username: new FormControl('', [Validators.required, Validators.minLength(4)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required]),
      recoveryEmail: new FormControl('', [Validators.required, Validators.email])
    });

  }

  public async registerUser(): Promise<void>{
    if (this.registrationForm.invalid) {
      this.registrationForm.markAllAsTouched();
      return;
    }
    const form = this.registrationForm.value;

    const newUser: User = {
      sys_id: '',
      sys_created_by: 'admin',
      sys_created_at: new Date(),
      sys_updated_by: 'admin',
      sys_updated_at: new Date(),

      user_first_name: form.firstName,
      user_middle_name: form.middleName,
      user_last_name: form.lastName,
      user_full_name: `${form.firstName} ${form.middleName} ${form.lastName}`,
      user_email_address: form.emailAddress,
      user_phone_number: form.phoneNumber,
      user_date_of_birth: new Date(form.birthDate),
      user_gender: form.gender,
      user_address: form.address,
      user_join_date: form.joinDate ? new Date(form.joinDate) : new Date(),
      user_baptism_date: form.baptismDate ? new Date(form.baptismDate) : new Date(),
      user_all_access: false,

      user_account: {
        sys_created_by: 'admin',
        sys_created_at: new Date(),
        sys_updated_by: 'admin',
        sys_updated_at: new Date(),
        username: form.username,
        password: form.password,
        recovery_email: form.recoveryEmail,
        isUserLoggedIn: false,
        lastLogIn: new Date(),
        accountStatus: Status.Pending
      },

      user_role: [
        {
          sys_created_by: 'admin',
          sys_created_at: new Date(),
          sys_updated_by: 'admin',
          sys_updated_at: new Date(),
          role_name: 'Member',
          role_description: 'Standard member role',
        }
      ],

      user_department: [
        {
          sys_created_by: 'admin',
          sys_created_at: new Date(),
          sys_updated_by: 'admin',
          sys_updated_at: new Date(),
          department_group: 'Default',
          department_description: 'Default department',
          department_head: {} as User
        }
      ]
    };
    await this.spinnerService.show('Creating your account...', 'circular');
    await this.userService.add(newUser)
      .then(() => {
        
        this.registrationForm.reset();
      })
      .catch(err => {
        console.error('Error registering user:', err);
      });
    
    this.spinnerService.hide();
  }

  public isInvalid(controlName: string): boolean {
    const control = this.registrationForm.get(controlName);
    return !!(control && control.touched && control.invalid);
  }

}
