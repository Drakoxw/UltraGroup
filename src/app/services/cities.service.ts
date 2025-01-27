import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  CitiesResponse,
  CityData,
  SearchCityPayload,
  ServiceResp,
} from '@interfaces/index';
import { httpErrorHandler } from '@utils/error-catch';
import { debounce } from '@utils/index';
import { catchError, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CitiesService {
  #http = inject(HttpClient);
  private url = 'https://app.aveonline.co/api/comunes/v1.0/ciudad.php';

  searchCity(value: string): Observable<ServiceResp<CityData[]>> {
    const payload: SearchCityPayload = {
      tipo: 'listar',
      data: value,
      registros: 10,
    };
    const res = {
      error: true,
      msg: `No se encontro la ciudad ${value}`,
      data: [] as CityData[],
    };

    return debounce<SearchCityPayload>(300, (payload) =>
      this.#http.post<CitiesResponse>(this.url, payload).pipe(
        map((r) => {
          if (r.status != 'ok') {
            return res;
          }

          res.data = r.ciudades;
          res.error = false;
          res.msg = 'Cuidades encontradas!';
          return res;
        }),
        catchError(httpErrorHandler)
      )
    )(payload);
  }
}
