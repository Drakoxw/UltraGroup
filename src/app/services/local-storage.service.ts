import { Injectable } from '@angular/core';
import { TOKEN_KEY } from '@constants/index';

class LocalStorage implements Storage {
  [name: string]: any;
  readonly length!: number;
  clear(): void {}
  getItem(key: string): string | null {
    return null;
  }
  key(index: number): string | null {
    return null;
  }
  removeItem(key: string): void {}
  setItem(key: string, value: string): void {}
}

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private storage: Storage;
  private tokenString: string = '';

  constructor() {
    this.storage = new LocalStorage();

    if (this.isBrowser()) {
      this.storage = localStorage;
    }
  }

  [name: string]: any;
  length!: number;

  private isBrowser(): boolean {
    return typeof window !== 'undefined';
  }

  /** Retorna el token guardado en el localstorage */
  getToken(): string {
    if (this.tokenString !== '') {
      return this.tokenString;
    }
    const token = this.getItem(TOKEN_KEY);
    if (token) {
      this.tokenString = token;
      return token;
    }
    if (this.isBrowser()) {
      if (window.localStorage.getItem(TOKEN_KEY) != null) {
        return String(window.localStorage.getItem(TOKEN_KEY));
      }
    }
    return '';
  }

  /** Guardar el token */
  setToken(token: string): void {
    this.tokenString = token;
    this.setItem(TOKEN_KEY, token);
  }
  /** Borrar el token */
  deleteToken(): void {
    this.tokenString = '';
    this.removeItem(TOKEN_KEY);
  }

  clear(): void {
    this.storage.clear();
  }

  getItem(key: string): string | null {
    return this.storage.getItem(key);
  }

  key(index: number): string | null {
    return this.storage.key(index);
  }

  removeItem(key: string): void {
    return this.storage.removeItem(key);
  }

  setItem(key: string, value: string): void {
    return this.storage.setItem(key, value);
  }
}
