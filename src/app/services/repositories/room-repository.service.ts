import { Injectable } from '@angular/core';
import { ResponseBase, RoomData } from '@interfaces/index';
import { delay, Observable, of } from 'rxjs';
import { ROOMS_DATA } from '../../core/mocks/rooms';

@Injectable({
  providedIn: 'root'
})
export class RoomRepositoryService {

  list(): Observable<ResponseBase<RoomData[]>> {
    const response: ResponseBase<RoomData[]> = {
      status: 200,
      success: true,
      message: 'se encontraron datos',
      response: ROOMS_DATA.sort((a, b) => b.id - a.id),
    };

    const randomDelay = Math.floor(Math.random() * 1000) + 1000;
    return of(response).pipe(delay(randomDelay));
  }
}
