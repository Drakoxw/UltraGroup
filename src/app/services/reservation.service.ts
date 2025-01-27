import { inject, Injectable } from '@angular/core';
import { DestinationAndCheck, Reservation, ReservationForm } from '@interfaces/models';
import { ReservationRepositoryService } from './repositories/reservation-repository.service';
import { ToastAlertService } from './toast-alert.service';
import { patchState, signalState } from '@ngrx/signals';
import { DESTINATION_MOCK } from '@constants/index';
import { BehaviorSubject } from 'rxjs';
import { CreateReservationEmail, TypeStatus } from '@interfaces/index';
import { EmailServiceService } from './email-service.service';

interface State {
  loading: boolean;
  reservations: Reservation[];
}

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  #repository = inject(ReservationRepositoryService);
  #emailServ = inject(EmailServiceService);
  #alert = inject(ToastAlertService);

  #state = signalState<State>({
    loading: false,
    reservations: [],
  });

  status$ = new BehaviorSubject<TypeStatus>('');

  readonly loading = this.#state.loading;
  readonly reservations = this.#state.reservations;

  private destination: DestinationAndCheck = { ...DESTINATION_MOCK };

  list(): void {
    patchState(this.#state, { loading: true });
    this.#repository.list().subscribe({
      next: (r) => {
        if (!r.success) {
          this.#alert.info(r.message || 'No se encontraron datos!');
        }
        patchState(this.#state, { reservations: r.response ?? [] });
      },
      complete: () => {
        patchState(this.#state, { loading: false });
      },
    });
  }

  setDestinationAndChecking(data: DestinationAndCheck) {
    this.destination = data;
  }

  getDestinationAndChecking(): DestinationAndCheck {
    return this.destination;
  }

  addReservation(data: ReservationForm): void {
    this.status$.next('loading')
    patchState(this.#state, { loading: true });

    const reservations = [...this.#state().reservations];
    const first = reservations[0];

    reservations.unshift({
      ...data,
      id: first.id + 1,
    });

    patchState(this.#state, { reservations, loading: false });

    const usersEmail: CreateReservationEmail[] = data.guests.map(el => {
      const mail: CreateReservationEmail = {
        mailTo: el.email,
        code: data.roomCode,
        dateFrom: data.checkInDate,
        dateTo: data.checkOutDate,
        total: data.totalCost
      }
      return mail
    })

    this.#emailServ.sendEmailNewReservation(usersEmail)

    this.status$.next('created')
    this.#alert.success('Se ha creado la reservación!');

    this.destination = { ...DESTINATION_MOCK };
    this.status$.next('')
  }

}
