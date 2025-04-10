import { inject, Injectable } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, doc, deleteDoc, updateDoc, getFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { firstValueFrom } from 'rxjs';
import { UserService } from './firebase/user.service';
import { SpinnerService } from './prompts/spinner.service';
import { AuthService } from './auth/auth.service';


@Injectable({
    providedIn: 'root'
})
export class LoginService {

    constructor(
        private userService: UserService,
        private authService: AuthService
    ){

    }

    public async verifyUser(username: string, password: string, setUser: boolean): Promise<boolean>{ 

        const users = await firstValueFrom(this.userService.getAll());
        const matchedUser = users.find(
          user =>
            user.user_account.username.toLowerCase() === username.toLowerCase() &&
            user.user_account.password.toLowerCase() === password.toLowerCase()
        );

        if (setUser && matchedUser){
            this.authService.setUser(matchedUser);
        }

        return matchedUser !== undefined;
    }
}