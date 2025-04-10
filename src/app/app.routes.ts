import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './services/auth/auth-guard.service';
import { GuestGuard } from './services/auth/guest-guard.service';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent, /*canActivate: [GuestGuard]*/ },
    { path: 'home', component: HomeComponent, /*canActivate: [AuthGuard]*/ },
];