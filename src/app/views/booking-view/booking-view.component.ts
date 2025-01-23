import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';

import { ModalFormComponent } from '@components/rooms/modal-form/modal-form.component';
import { HotelsService } from '@services/index';
import { FindHotelNamePipe } from '../../core/pipes/find-hotel-name.pipe';
import { ReservationService } from '@services/reservation.service';

@Component({
  selector: 'app-booking-view',
  imports: [
    TableModule,
    CommonModule,
    ButtonModule,
    TooltipModule,
    TagModule,
    ToastModule,
    FindHotelNamePipe
  ],
  templateUrl: './booking-view.component.html',
  styleUrl: './booking-view.component.css'
})
export default class BookingViewComponent implements OnInit {
  #service = inject(ReservationService);
  readonly hotelServ = inject(HotelsService);

  list = this.#service.reservations;
  loading = this.#service.loading;

  ngOnInit(): void {
    if (this.#service.reservations().length == 0) {
      this.#service.list();
    }
    if (this.hotelServ.hotels().length == 0) {
      this.hotelServ.list();
    }
  }
}
