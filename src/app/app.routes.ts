import { Routes } from '@angular/router';
import { PATH } from '@constants/index';
import { LayoutComponent } from '@shared/components';
import { HomeComponent } from './views/home/home.component';
import { LogoutComponent } from './views/logout/logout.component';
import { LoginComponent } from './views/login/login.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: PATH.HOME, component: HomeComponent },
      { path: PATH.ROUTE_1, component: HomeComponent, canActivate: [authGuard] },
      { path: PATH.ROUTE_2, component: HomeComponent, canActivate: [authGuard] },
      { path: PATH.LOGOUT, component: LogoutComponent },
      { path: PATH.AUTH, component: LoginComponent },
      { path: '**', redirectTo: PATH.HOME, pathMatch: 'full' },
      { path: '', redirectTo: PATH.HOME, pathMatch: 'full' },
    ],
  },
];
