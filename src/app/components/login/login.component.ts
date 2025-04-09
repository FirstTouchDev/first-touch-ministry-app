import { Component, OnInit } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { IonicModule } from '@ionic/angular';
import { UserService } from '../../services/firebase/user.service';
import { Gender } from '../../models/enums/gender.enum';
import { User } from '../../models/user.model';
import { Subscription, firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    IonicModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnInit {

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {

  }

  async login(firstName: string, lastName: string) {
    const users = await firstValueFrom(this.userService.getAll());
    const matchedUser = users.find(
      user =>
        user.user_first_name.toLowerCase() === firstName.toLowerCase() &&
        user.user_last_name.toLowerCase() === lastName.toLowerCase()
    );
    if (matchedUser) {
    } else {
    }
  }




  

}
