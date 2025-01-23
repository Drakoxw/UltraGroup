import { inject, Injectable } from '@angular/core';
import { Reservation } from '@interfaces/models';
import { ReservationRepositoryService } from './repositories/reservation-repository.service';
import { ToastAlertService } from './toast-alert.service';
import { patchState, signalState } from '@ngrx/signals';

interface State {
  loading: boolean;
  reservations: Reservation[];
}

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  #repository = inject(ReservationRepositoryService);
  #alert = inject(ToastAlertService);

  #state = signalState<State>({
    loading: false,
    reservations: [],
  });

  readonly loading = this.#state.loading;
  readonly reservations = this.#state.reservations;

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
}
