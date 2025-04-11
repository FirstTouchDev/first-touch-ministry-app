import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { MenuController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { listCircle, personCircle, home, apps, create, trash, musicalNotes, musicalNote, personRemove, play, checkmarkCircle, checkmarkSharp, checkbox, menu, logOut } from 'ionicons/icons'
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../services/prompts/toast.service';
import { User } from '../../models/user.model';
import { firstValueFrom, Observable } from 'rxjs';
import { UserService } from '../../services/firebase/user.service';
import { SpinnerService } from '../../services/prompts/spinner.service';

@Component({
  selector: 'app-header-menu',
  standalone: true,
  imports: [
    IonicModule,
    CommonModule
  ],
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss'],
})
export class HeaderMenuComponent  implements OnInit {

  
  public user$!: Observable<User | null>;

  constructor(
    private menuCtrl: MenuController,
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService,
    private userService: UserService,
    private spinnerService: SpinnerService
  ) { 
    addIcons(
      { listCircle, 
        musicalNote, 
        personRemove, 
        play, 
        checkmarkCircle, 
        checkmarkSharp, 
        checkbox,
        menu,
        logOut
      })
  }
  
  ngOnInit() {
    this.user$ = this.authService.user$;
  }

  

  public openAppMenu(): void { this.menuCtrl.open('app-menu'); }
  public userMenu(): void { this.menuCtrl.open('user-menu'); }
  

  public async logoutUser(): Promise<void>{

    const user = await firstValueFrom(this.user$);
    if (user?.sys_id){
      await this.spinnerService.show('Logging out...', 'circular');
      await this.userService.update(user.sys_id, {
        user_account: {
          ...user.user_account,
          
          isUserLoggedIn: false
        }
      });
      this.spinnerService.hide();
      this.authService.clearUser();
      this.toastService.toast('You are logged out successfully!', 2000, 'success');
      this.router.navigate(['/']);
    }

    
    
  }

}
