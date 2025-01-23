import { CarruselHomeComponent } from "./home/carrusel-home/carrusel-home.component";
import { ModalAssignRoomsComponent } from "./hotel/modal-assign-rooms/modal-assign-rooms.component";
import { ModalFormComponent as HotelModalFormComponent } from "./hotel/modal-form/modal-form.component";
import { ModalDetailsComponent } from "./reservation/modal-details/modal-details.component";
import { ModalFormComponent as RoomModalFormComponent } from "./rooms/modal-form/modal-form.component";

export const COMPONENTS = [
  CarruselHomeComponent,
  ModalAssignRoomsComponent,
  HotelModalFormComponent,
  ModalDetailsComponent,
  RoomModalFormComponent
]

export * from './home/carrusel-home/carrusel-home.component'
export * from './hotel/modal-assign-rooms/modal-assign-rooms.component'
export * from './hotel/modal-form/modal-form.component'
export * from './reservation/modal-details/modal-details.component'
