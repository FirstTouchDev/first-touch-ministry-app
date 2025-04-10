import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    IonicModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'first-touch-ministry-app';

  constructor(
    private authService: AuthService
  ){

  }

  ngOnInit(){
    const user = this.authService.getUser();
    if (user) {
      console.log('Auto-login user:', user.user_first_name);
    } else {
      console.log('No saved user session');
    }
  }

}
