import { InjectionToken, computed, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';

import { TOKEN_KEY } from '@constants/index';
import { TokenData } from '@interfaces/token';
import { LocalStorageService } from '@services/local-storage.service';
import { getTokenRemainingTime, parseJwt } from '@utils/token';

interface ISessionStore extends TokenData {
  isLogged: boolean;
  status: string;
}

const initialState: ISessionStore = {
  isLogged: false,
  status: '',
  exp: 0,
  id: 0,
  username: '',
  email: '',
  firstName: '',
  lastName: '',
  role: '',
};

const SESSION_STATE = new InjectionToken<ISessionStore>('SessionState', {
  factory: () => initialState,
});

export const SessionStore = signalStore(
  { providedIn: 'root' },
  withState(() => inject(SESSION_STATE)),
  withComputed(
    ({ exp, role, username, lastName, status, email, isLogged }) => ({
      status,
      isLogged,
      rol: role,
      email,
      fullName: computed(() => `${username()} ${lastName()}`),
      expireDate: computed(() => new Date(exp() * 1000)),
      isAdmin: computed(() => role().includes('ADMIN')),
    })
  ),
  withMethods((store, LocalStorage = inject(LocalStorageService)) => ({
    remainingSessionTime: () => getTokenRemainingTime(store.exp()),
    killSession: () => {
      LocalStorage.deleteToken();
      patchState(store, { ...initialState });
    },
    initSession: (token: string) => {
      LocalStorage.setToken(token);
      const tokenData = parseJwt(token);
      if (tokenData && getTokenRemainingTime(tokenData.exp) > 1) {
        patchState(store, { ...tokenData, isLogged: true  });
      }
    },
    init() {
      const token = LocalStorage.getItem(TOKEN_KEY);
      if (token) {
        const tokenData = parseJwt(token);
        if (tokenData && getTokenRemainingTime(tokenData.exp) > 1) {
          patchState(store, { ...tokenData, isLogged: true });
        }
      }
    },
  })),
  withHooks({
    onInit(store, LocalStorage = inject(LocalStorageService)) {
      const init = { ...initialState };
      init.status = 'LOADING';
      patchState(store, init);
      const token = LocalStorage.getItem(TOKEN_KEY);
      if (token) {
        const tokenData = parseJwt(token);
        if (tokenData && getTokenRemainingTime(tokenData.exp) > 1) {
          return patchState(store, { ...tokenData, isLogged: true });
        }
      }
      init.status = 'NO-LOGUED';
      patchState(store, init);
    },
  })
);
