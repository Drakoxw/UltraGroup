import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { TagModule } from 'primeng/tag';
import { ConfirmationService } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';

import { ModalFormComponent } from '@components/rooms/modal-form/modal-form.component';
import { RoomData } from '@interfaces/models';
import { RoomsService } from '@services/rooms.service';
import { HotelsService } from '@services/index';
import { FindHotelNamePipe } from '../../core/pipes/find-hotel-name.pipe';

@Component({
  selector: 'app-hotel-rooms-view',
  imports: [
    TableModule,
    CommonModule,
    ButtonModule,
    ModalFormComponent,
    TooltipModule,
    TagModule,
    ConfirmPopupModule,
    ToastModule,
    FindHotelNamePipe
  ],
  templateUrl: './hotel-rooms-view.component.html',
  styleUrl: './hotel-rooms-view.component.css',
  providers: [ConfirmationService],
})
export default class HotelRoomsViewComponent implements OnInit {
  #confirmationService = inject(ConfirmationService);
  #service = inject(RoomsService);
  readonly hotelServ = inject(HotelsService);

  list = this.#service.rooms;
  loading = this.#service.loading;

  showModal = false;
  roomEdit: RoomData | null = null;

  ngOnInit(): void {
    if (this.#service.rooms().length == 0) {
      this.#service.list();
    }
    if (this.hotelServ.hotels().length == 0) {
      this.hotelServ.list();
    }
  }

  onEdit(room: RoomData) {
    this.roomEdit = room;
    this.showModal = true;
  }

  onCloseModal() {
    this.roomEdit = null;
    this.showModal = false;
  }

  onToggleActive(id: number, active: boolean, event: Event) {
    this.#confirmationService.confirm({
      target: event.target as EventTarget,
      message: active ? 'Desactivar Habitación?' : 'Activar Habitación?',
      accept: () => {
        this.#service.toggleActiveRoom(id, !active);
      },
    });
  }
}
