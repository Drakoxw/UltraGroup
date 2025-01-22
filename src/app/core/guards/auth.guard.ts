import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SessionStore } from '../store/session.store';
import { ToastAlertService } from '@services/index';
import { PATH } from '@constants/index';

export const authGuard: CanActivateFn = (route, state) => {
  const store = inject(SessionStore);
  const alert = inject(ToastAlertService);
  const router = inject(Router);

  if (store.isLogged() && store.remainingSessionTime() < 1) {
    alert.warning('Sesión Vencida')
    store.killSession()
    router.navigate(['/' + PATH.AUTH])
    return false;
  }

  return store.isLogged();
};
