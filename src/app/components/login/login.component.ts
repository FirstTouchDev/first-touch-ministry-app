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
import { Router, RouterModule } from '@angular/router';
import { Status } from '../../models/enums/status.enum';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule
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
    private router: Router,
  ) { }

  ngOnInit(): void {

    //this.manualUserAddition();

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
        this.toastService.toast('Welcome!', 2000, 'success');
        this.router.navigate(['/home']);
      } else {
        this.toastService.toast('Invalid username or password!', 2000, 'danger');
      }

      await this.spinnerService.hide();
    }
  }

  

  private manualUserAddition(){
    const newUser: User = {
      sys_id: '',
      sys_created_by: 'admin',
      sys_created_at: new Date(),
      sys_updated_by: 'admin',
      sys_updated_at: new Date(),

      user_first_name: 'Daryll',
      user_middle_name: 'T.',
      user_last_name: 'Talaba',
      user_full_name: 'Daryll T. Talaba',
      user_email_address: 'darylltalaba@gmail.com',
      user_phone_number: '09997527570',
      user_date_of_birth: new Date('2002-03-30'),
      user_gender: Gender.Male,
      user_address: 'Test',
      user_join_date: new Date(),
      user_baptism_date: new Date('2018-08-21'),
      user_all_access: false,

      user_account: {
        sys_created_by: 'admin',
        sys_created_at: new Date(),
        sys_updated_by: 'admin',
        sys_updated_at: new Date(),
        username: 'admin',
        password: 'admin',
        recovery_email: 'darylltalaba@gmail.com',
        isUserLoggedIn: false,
        lastLogIn: new Date(),
        accountStatus: Status.Approved
      },
      user_role: [
        {
          sys_created_by: 'admin',
          sys_created_at: new Date(),
          sys_updated_by: 'admin',
          sys_updated_at: new Date(),
          role_name: 'All Access',
          role_description: 'All Access',
        }
      ],
      user_department: [
        {
        sys_created_by: 'admin',
        sys_created_at: new Date(),
        sys_updated_by: 'admin',
        sys_updated_at: new Date(),
        department_group: 'All Access',
        department_description: 'All Access',
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
