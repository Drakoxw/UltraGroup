import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Rating } from 'primeng/rating';
import { TooltipModule } from 'primeng/tooltip';
import { TagModule } from 'primeng/tag';
import { ConfirmationService } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';

import { HotelsService } from '@services/index';
import { ModalFormComponent } from '@components/hotel/modal-form/modal-form.component';
import { HotelData } from '@interfaces/models/hotel';
import { RoomsService } from '@services/rooms.service';
import { ModalAssignRoomsComponent } from '@components/hotel/modal-assign-rooms/modal-assign-rooms.component';

@Component({
  selector: 'app-hotels-view',
  imports: [
    TableModule,
    CommonModule,
    ButtonModule,
    Rating,
    ModalFormComponent,
    TooltipModule,
    TagModule,
    ConfirmPopupModule,
    ToastModule,
    ModalAssignRoomsComponent
  ],
  templateUrl: './hotels-view.component.html',
  styleUrl: './hotels-view.component.css',
  providers: [ConfirmationService],
})
export default class HotelsViewComponent implements OnInit {
  #confirmationService = inject(ConfirmationService)
  #service = inject(HotelsService);
  #roomServ = inject(RoomsService);
  list = this.#service.hotels;
  loading = this.#service.loading;

  showModal = false;
  showModalAssing = false;
  hotelEdit: HotelData | null = null;
  hotelAssing: HotelData | null = null;

  ngOnInit(): void {
    if (this.#service.hotels().length == 0) {
      this.#service.list();
    }
    if (this.#roomServ.rooms().length == 0) {
      this.#roomServ.list();
    }
  }

  onAssing(hotel: HotelData) {
    this.hotelAssing = hotel;
    this.showModalAssing = true;
  }

  onEdit(hotel: HotelData) {
    this.hotelEdit = hotel;
    this.showModal = true;
  }

  onCloseModal() {
    this.hotelEdit = null;
    this.showModal = false;
    this.hotelAssing = null;
    this.showModalAssing = false;
  }

  onToggleActive(id: number, active: boolean, event: Event) {
    this.#confirmationService.confirm({
      target: event.target as EventTarget,
      message: active ? 'Desactivar Hotel?' : 'Activar Hotel?',
      accept: () => {
        this.#service.toggleActiveHotel(id, !active);
      },
    });
  }
}
