import { Observable } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';

/**
 * Debounce para la peticiones HTTP
 * @param time tiempo en milisegundo de espera para realizar la peticion
 * @param callback Funcion CallBack a realizar
 * @returns retorna un observable
 */
export function debounce<T>(time: number, callback: (value: T) => Observable<any>) {
  return (value: T) => new Observable<T>((observer) => {
    observer.next(value);
  }).pipe(
    debounceTime(time),
    switchMap(callback)
  );
}

