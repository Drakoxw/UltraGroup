import { inject, Injectable } from '@angular/core';
import { patchState, signalState } from '@ngrx/signals';
import { ToastAlertService } from './toast-alert.service';
import { RoomData, RoomForm } from '@interfaces/index';
import { RoomRepositoryService } from './repositories/room-repository.service';

interface State {
  loading: boolean;
  rooms: RoomData[];
}

@Injectable({
  providedIn: 'root',
})
export class RoomsService {
  #repository = inject(RoomRepositoryService);
  #alert = inject(ToastAlertService);

  #state = signalState<State>({
    loading: false,
    rooms: [],
  });

  readonly loading = this.#state.loading;
  readonly rooms = this.#state.rooms;

  list(): void {
    patchState(this.#state, { loading: true });
    this.#repository.list().subscribe({
      next: (r) => {
        if (!r.success) {
          this.#alert.info(r.message || 'No se encontraron datos!');
        }
        patchState(this.#state, { rooms: r.response ?? [] });
      },
      complete: () => {
        patchState(this.#state, { loading: false });
      },
    });
  }

  addRoom(payload: RoomForm): void {
    const rooms = [...this.#state().rooms];
    const first = rooms[0];
    rooms.unshift({
      ...payload,
      id: first.id + 1,
    });
    patchState(this.#state, { rooms });
    this.#alert.success('Nuevo hotel agregado!');
  }

  toggleActiveRoom(id: number, active: boolean): void {
    const rooms = [...this.#state().rooms];
    const index = rooms.findIndex(room => room.id === id);
    if (index !== -1) {
      rooms[index] = { ...rooms[index], active };
      patchState(this.#state, { rooms });
      this.#alert.success(`El estado de la habitación con ID ${id} fue actualizado!`);
    } else {
      this.#alert.error(`No se encontró la habitación con ID ${id}`);
    }
  }

  updateRoom(id: number, payload: RoomForm): void {
    const rooms = [...this.#state().rooms];
    const index = rooms.findIndex(room => room.id === id);
    if (index !== -1) {
      rooms[index] = { ...rooms[index], ...payload };
      patchState(this.#state, { rooms });
      this.#alert.success(`La habitación con ID ${id} ha sido actualizada!`);
    } else {
      this.#alert.error(`No se encontró la habitación con ID ${id}`);
    }
  }

  assingRooms(idHotel: number, idsRooms: number[]) {
    if (idsRooms.length) {
      const rooms = this.#state().rooms.map(el => {
        const item = {...el}
        if (idsRooms.includes(item.id)) {
          item.idHotel = idHotel
        }
        return item
      })
      patchState(this.#state, { rooms });
      this.#alert.success(`Se han asignado ${idsRooms.length} habitaciones!`);
    }
  }

}
