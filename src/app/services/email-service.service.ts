import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CreateReservationEmail, ResponseBase } from '@interfaces/index';
import { httpErrorHandler } from '@utils/index';
import { catchError, forkJoin, map } from 'rxjs';
import { ToastAlertService } from './toast-alert.service';

@Injectable({
  providedIn: 'root',
})
export class EmailServiceService {
  #http = inject(HttpClient);
  #alert = inject(ToastAlertService);
  private url = 'https://hotel-back-production-0497.up.railway.app';

  /**
   * ENVIA LOS CORREOS A LAS PERSONAS DE LAS RESERVAS
   * * Ejecuta todas las solicitudes HTTP en paralelo
   */
  sendEmailNewReservation(payloads: CreateReservationEmail[]): void {
    let successCount = 0;
    let errorCount = 0;

    const requests = payloads.map((payload) =>
      this.#http.post<ResponseBase<null>>(this.url + '/mail/new-reservation', payload).pipe(
        map((r) => {
          if (r.success) {
            successCount++;
          } else {
            errorCount++;
          }
          return r.message;
        }),
        catchError((err) => {
          errorCount++;
          return httpErrorHandler(err);
        })
      )
    );

    forkJoin(requests).subscribe({
      next: () => {
        const errorMessage = `Correo(s) fallidos: ${errorCount}.`
        this.#alert.info(
          `Correo(s) enviados correctamente: ${successCount}. ${errorCount > 0 ? errorMessage : ''}`
        );
      },
      error: (err) => {
        this.#alert.error(`Error al enviar los correos. Fallaron: ${errorCount}`);
      },
    });
  }
}

