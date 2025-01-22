import { inject, Injectable } from '@angular/core';

import { LoginRequest, ServiceResp, UserResponse } from '@interfaces/index'; // Asumo que tienes una interfaz User definida
import { LIST_USERS } from '../core/mocks/login';
import { Observable, of, throwError } from 'rxjs';
import { SessionStore } from '../core/store/session.store';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private secretKey = 'ClaveUltraHiperSecreta';
  private listUserMocks = LIST_USERS;

  #store = inject(SessionStore);
  #storage = inject(LocalStorageService);

  private base64UrlEncode(obj: object): string {
    return btoa(JSON.stringify(obj))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  }

  private generateSignature(header: string, payload: string): Promise<string> {
    const key = this.secretKey;
    const data = `${header}.${payload}`;

    const encoder = new TextEncoder();
    const keyData = encoder.encode(key);
    const dataToSign = encoder.encode(data);

    return window.crypto.subtle
      .importKey('raw', keyData, { name: 'HMAC', hash: 'SHA-256' }, false, [
        'sign',
      ])
      .then((cryptoKey) =>
        window.crypto.subtle.sign('HMAC', cryptoKey, dataToSign)
      )
      .then((signature) =>
        btoa(String.fromCharCode(...new Uint8Array(signature)))
          .replace(/\+/g, '-')
          .replace(/\//g, '_')
          .replace(/=+$/, '')
      );
  }

  async generateToken(body: object): Promise<string> {
    const payload = {
      ...body,
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
    };
    const header = this.base64UrlEncode({ alg: 'HS256', typ: 'JWT' });
    const encodedPayload = this.base64UrlEncode(payload);
    const signature = await this.generateSignature(header, encodedPayload);

    return `${header}.${encodedPayload}.${signature}`;
  }

  clearSession() {
    this.#store.killSession()
  }

  login(
    payload: LoginRequest
  ): Observable<ServiceResp<{ user: UserResponse; token: string }>> {
    const user = this.listUserMocks.find(
      (u) => u.email === payload.email && u.password === payload.password
    );

    if (!user) {
      return of({
        error: true,
        msg: 'Usuario o contraseña incorrectos',
      });
    }

    const userData: UserResponse = { ...user };
    const tokenPromise = this.generateToken(userData);

    return new Observable((observer) => {
      tokenPromise
        .then((token) => {
          this.#store.initSession(token);
          this.#storage.setToken(token);

          observer.next({
            error: false,
            msg: 'Sesión iniciada!',
            data: {
              token,
              user: userData,
            },
          });
          observer.complete();
        })
        .catch((err) => {
          observer.next({
            error: false,
            msg: String(err),
          });
          observer.complete();
        });
    });
  }
}
