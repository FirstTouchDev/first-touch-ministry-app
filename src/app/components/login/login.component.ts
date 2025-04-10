import { Component, OnInit } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { IonicModule } from '@ionic/angular';
import { UserService } from '../../services/firebase/user.service';
import { Gender } from '../../models/enums/gender.enum';
import { User } from '../../models/user.model';
import { LoginService } from '../../services/login.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../services/prompts/toast.service';
import { SpinnerService } from '../../services/prompts/spinner.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnInit {

  public loginForm!: FormGroup;

  constructor(
    private userService: UserService,
    private loginService: LoginService,
    private toastService: ToastService,
    private spinnerService: SpinnerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  public async verifyCredentials(): Promise<void> {
    if (this.loginForm.valid) {

      await this.spinnerService.show('Logging in...', 'circular');

      const { username, password } = this.loginForm.value;
      const isValid = await this.loginService.verifyUser(username, password, true);
      if (isValid) {
        this.toastService.toast('Welcome!', 2000, 'primary');
        this.router.navigate(['/home']);
      } else {
        this.toastService.toast('Invalid username or password!', 2000, 'danger');
      }

      await this.spinnerService.hide();
    }
  }

  

  private manualUserAddition(){
    const newUser: User = {
      sys_created_by: 'admin',
      sys_created_date: new Date(),
      sys_created_time: new Date().toTimeString(),
      sys_updated_by: 'admin',
      sys_updated_date: new Date(),
      sys_updated_time: new Date().toTimeString(),

      user_first_name: 'Jane',
      user_middle_name: 'A.',
      user_last_name: 'Doe',
      user_email_address: 'jane.doe@example.com',
      user_phone_number: '1234567890',
      user_date_of_birth: new Date('1990-01-01'),
      user_gender: Gender.Female,
      user_address: '123 Main St',
      user_join_date: new Date(),
      user_baptism_date: new Date('2020-01-01'),
      user_all_access: false,

      user_account: {
        sys_created_by: 'admin',
        sys_created_date: new Date(),
        sys_created_time: new Date().toTimeString(),
        sys_updated_by: 'admin',
        sys_updated_date: new Date(),
        sys_updated_time: new Date().toTimeString(),
        username: 'janedoe',
        password: 'securepass123',
        recovery_email: 'recovery@example.com',
      },
      user_role: [
        {
          sys_created_by: 'admin',
          sys_created_date: new Date(),
          sys_created_time: new Date().toTimeString(),
          sys_updated_by: 'admin',
          sys_updated_date: new Date(),
          sys_updated_time: new Date().toTimeString(),
          role_name: 'Viewer',
          role_description: 'Can view data only',
        }
      ],
      user_department: [
        {
        sys_created_by: 'admin',
        sys_created_date: new Date(),
        sys_created_time: new Date().toTimeString(),
        sys_updated_by: 'admin',
        sys_updated_date: new Date(),
        sys_updated_time: new Date().toTimeString(),
        department_group: 'HR',
        department_description: 'Human Resources',
        department_head: {} as User,
        }
      ]
    };

    this.userService.add(newUser).then(() => {
      console.log('User added successfully!');
    }).catch(err => {
      console.error('Error adding user:', err);
    });
  }




  

}
