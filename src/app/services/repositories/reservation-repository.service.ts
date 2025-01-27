import { delay, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

import { Reservation } from '@interfaces/models';
import { RESERVATIONS } from '../../core/mocks/reservation';
import { ResponseBase } from '@interfaces/index';

@Injectable({
  providedIn: 'root'
})
export class ReservationRepositoryService {

  list(): Observable<ResponseBase<Reservation[]>> {
    const list = [...RESERVATIONS].reverse()
    const response: ResponseBase<Reservation[]> = {
      status: 200,
      success: true,
      message: 'se encontraron datos',
      response: list,
    };

    const randomDelay = Math.floor(Math.random() * 1000);
    return of(response).pipe(delay(randomDelay));
  }
}
