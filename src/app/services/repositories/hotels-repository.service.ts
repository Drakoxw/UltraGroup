import { Injectable } from '@angular/core';
import { ResponseBase } from '@interfaces/index';
import { HotelData } from '@interfaces/models/hotel';
import { HOTELS_DATA } from '../../core/mocks/hotel';
import { delay, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HotelsRepositoryService {
  list(): Observable<ResponseBase<HotelData[]>> {
    const response: ResponseBase<HotelData[]> = {
      status: 200,
      success: true,
      message: 'se encontraron datos',
      response: HOTELS_DATA.sort((a, b) => b.id - a.id),
    };

    const randomDelay = Math.floor(Math.random() * 1000) + 1000;
    return of(response).pipe(delay(randomDelay));
  }
}
