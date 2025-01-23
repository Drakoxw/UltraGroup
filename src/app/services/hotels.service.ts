import { inject, Injectable } from '@angular/core';
import { HotelsRepositoryService } from './repositories/hotels-repository.service';
import { patchState, signalState } from '@ngrx/signals';
import { ToastAlertService } from './toast-alert.service';
import { HotelData, HotelForm } from '@interfaces/index';

interface State {
  loading: boolean;
  hotels: HotelData[];
}
@Injectable({
  providedIn: 'root',
})
export class HotelsService {
  #repository = inject(HotelsRepositoryService);
  #alert = inject(ToastAlertService);

  #state = signalState<State>({
    loading: false,
    hotels: [],
  });

  readonly loading = this.#state.loading;
  readonly hotels = this.#state.hotels;

  list(): void {
    patchState(this.#state, { loading: true });
    this.#repository.list().subscribe({
      next: (r) => {
        if (!r.success) {
          this.#alert.info(r.message || 'No se encontraron datos!');
        }
        patchState(this.#state, { hotels: r.response ?? [] });
      },
      complete: () => {
        patchState(this.#state, { loading: false });
      },
    });
  }

  addHotel(payload: HotelForm): void {
    const hotels = [...this.#state().hotels];
    const first = hotels[0];
    hotels.unshift({
      ...payload,
      id: first.id + 1,
    });
    patchState(this.#state, { hotels });
    this.#alert.success('Nuevo hotel agregado!');
  }

  toggleActiveHotel(id: number, active: boolean): void {
    const hotels = [...this.#state().hotels];
    const hotelIndex = hotels.findIndex(hotel => hotel.id === id);
    if (hotelIndex !== -1) {
      hotels[hotelIndex] = { ...hotels[hotelIndex], active };
      patchState(this.#state, { hotels });
      this.#alert.success(`El estado del hotel con ID ${id} fue actualizado!`);
    } else {
      this.#alert.error(`No se encontró el hotel con ID ${id}`);
    }
  }

  updateHotel(id: number, payload: HotelForm): void {
    const hotels = [...this.#state().hotels];
    const hotelIndex = hotels.findIndex(hotel => hotel.id === id);
    if (hotelIndex !== -1) {
      hotels[hotelIndex] = { ...hotels[hotelIndex], ...payload };
      patchState(this.#state, { hotels });
      this.#alert.success(`El hotel con ID ${id} ha sido actualizado!`);
    } else {
      this.#alert.error(`No se encontró el hotel con ID ${id}`);
    }
  }

}
