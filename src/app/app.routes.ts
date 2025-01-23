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
      {
        path: PATH.HOTELS,
        loadComponent: () =>
          import('./views/hotels-view/hotels-view.component'),
        canActivate: [authGuard],
      },
      {
        path: PATH.BOOKING,
        loadComponent: () =>
          import('./views/booking-view/booking-view.component'),
        canActivate: [authGuard],
      },
      {
        path: PATH.ROOMS,
        loadComponent: () =>
          import('./views/hotel-rooms-view/hotel-rooms-view.component'),
        canActivate: [authGuard],
      },
      { path: PATH.LOGOUT, component: LogoutComponent },
      { path: PATH.AUTH, component: LoginComponent },
      { path: '**', redirectTo: PATH.HOME, pathMatch: 'full' },
      { path: '', redirectTo: PATH.HOME, pathMatch: 'full' },
    ],
  },
];
