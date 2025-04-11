import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { MenuController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { listCircle, personCircle, home, apps, create, trash, musicalNotes, musicalNote, personRemove, play, checkmarkCircle, checkmarkSharp, checkbox, menu, logOut } from 'ionicons/icons'
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../services/prompts/toast.service';

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

  constructor(
    private menuCtrl: MenuController,
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService
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

  ngOnInit() {}

  public openAppMenu(): void { this.menuCtrl.open('app-menu'); }
  public userMenu(): void { this.menuCtrl.open('user-menu'); }

  public logoutUser(): void{
    this.authService.clearUser();
    this.toastService.toast('You are logged out successfully!', 2000, 'success');
    this.router.navigate(['/']);
  }

}
