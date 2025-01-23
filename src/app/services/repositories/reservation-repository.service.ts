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
    const response: ResponseBase<Reservation[]> = {
      status: 200,
      success: true,
      message: 'se encontraron datos',
      response: RESERVATIONS.sort((a, b) => b.id - a.id),
    };

    const randomDelay = Math.floor(Math.random() * 1000);
    return of(response).pipe(delay(randomDelay));
  }
}
