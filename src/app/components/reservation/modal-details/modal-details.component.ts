import {
  booleanAttribute,
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
} from '@angular/core';

import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { RatingModule } from 'primeng/rating';
import { InputNumberModule } from 'primeng/inputnumber';
import { CheckboxModule } from 'primeng/checkbox';
import { DatePickerModule } from 'primeng/datepicker';
import { AccordionModule } from 'primeng/accordion';

import { Reservation } from '@interfaces/models';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FindHotelNamePipe } from '../../../core/pipes/find-hotel-name.pipe';
import { HotelsService } from '@services/index';

@Component({
  selector: 'app-modal-details',
  imports: [
    Dialog,
    ButtonModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    TextareaModule,
    RatingModule,
    FindHotelNamePipe,
    InputNumberModule,
    CheckboxModule,
    DatePickerModule,
    AccordionModule,
  ],
  templateUrl: './modal-details.component.html',
})
export class ModalDetailsComponent {
  @Output() closeModal = new EventEmitter();
  @Input({ transform: booleanAttribute }) visible = false;
  @Input() title = 'Detalle de la Reservación';
  @Input() data!: Reservation;

  readonly hotelServ = inject(HotelsService);

  onClose() {
    this.closeModal.emit();
  }
}
