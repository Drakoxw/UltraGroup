import {
  booleanAttribute,
  Component,
  EventEmitter,
  HostListener,
  inject,
  Input,
  Output,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { RatingModule } from 'primeng/rating';
import { InputNumberModule } from 'primeng/inputnumber';
import { CheckboxModule } from 'primeng/checkbox';
import { SelectModule } from 'primeng/select';
import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { StepsModule } from 'primeng/steps';
import {
  AutoCompleteModule,
} from 'primeng/autocomplete';

import { EmergencyContact, Guest, Product, ReservationForm, RoomData, TypeSeverity } from '@interfaces/index';
import { RESPONSIVE_OPTIONS, STEPS_OPTIONS } from '@constants/index';
import { NgStyle } from '@angular/common';
import { PRODUCTS } from '../../../core/mocks/products';
import { FormCreateReservationComponent } from '@components/reservation/form-create-reservation/form-create-reservation.component';
import { FormEmergencyContactComponent } from '@components/reservation/form-emergency-contact/form-emergency-contact.component';
import { PayReservationComponent } from '@components/reservation/pay-reservation/pay-reservation.component';
import { ReservationService } from '@services/index';
import { calculateDaysBetweenDates } from '@utils/index';

@Component({
  selector: 'app-modal-select-room',
  imports: [
    NgStyle,
    Dialog,
    TagModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    TextareaModule,
    RatingModule,
    InputNumberModule,
    CheckboxModule,
    StepsModule,
    CarouselModule,
    AutoCompleteModule,
    SelectModule,
    ProgressSpinnerModule,
    FormCreateReservationComponent,
    FormEmergencyContactComponent,
    PayReservationComponent
  ],
  templateUrl: './modal-select-room.component.html',
  styleUrl: './modal-select-room.component.css',
})
export class ModalSelectRoomComponent {
  @Output() closeModal = new EventEmitter();
  @Input({ transform: booleanAttribute }) visible = false;
  @Input() title = 'Habitaciones disponibles';
  @Input() data: RoomData | null = null;
  @Input() peopleCount!: number;

  #reservationServ = inject(ReservationService);
  products: Product[] = [];

  responsiveOptions = RESPONSIVE_OPTIONS;
  steps = STEPS_OPTIONS
  active = 0
  loading = false

  widthCardStyle = '97%'
  numVisible = 1;
  numScroll = 1;

  contact: EmergencyContact | null = null
  listGuest: Guest[] = []
  room?: Product
  showNewGuest = false

  ngOnInit() {
    this.#reservationServ.list()
    this.onResize();
    this.loading = true
    setTimeout(() => {
      this.products = PRODUCTS;
      this.loading = false
    }, 2000);
    this.#reservationServ.status$.subscribe(status => {
      if (status == 'created') {
        this.closeModal.emit()
      }
    })
  }

  onClose() {
    this.closeModal.emit();
  }

  seletedRoom(active: number, room: Product | null = null) {
    this.active = active
    if (room) {
      this.room = room
    }
  }

  finishReservation() {
    this.#reservationServ.loading()
    const predata = this.#reservationServ.getDestinationAndChecking()

    const days = calculateDaysBetweenDates(predata.dateFrom, predata.dateTo)

    const reservation: ReservationForm = {
      hotelId: Number(this.room?.hotelId),
      roomId: Number(this.room?.id),
      roomCode: String(this.room?.code),
      checkInDate: predata.dateFrom,
      checkOutDate: predata.dateTo,
      guests: this.listGuest,
      emergencyContact: this.contact as EmergencyContact,
      totalCost: Number(this.room?.price) * days
    }

    this.#reservationServ.addReservation(reservation)
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    if (window.innerWidth <= 450) {
      this.widthCardStyle = '97%'
      this.numVisible = 1;
      this.numScroll = 1;
    }
    if (window.innerWidth > 450) {
      this.numVisible = 2;
      this.numScroll = 2;
    }
    if (window.innerWidth > 680) {
      this.widthCardStyle = '50rem'
      this.numVisible = 3;
      this.numScroll = 3;
    }
  }

  onNewPeople(newGuest: Guest) {
    this.listGuest.push(newGuest)
    this.showNewGuest = true
  }

  setContactEmergency(contact: EmergencyContact) {
    this.contact = contact
    this.seletedRoom(3)
  }

  getSeverity(status: string): TypeSeverity {
    switch (status) {
      case 'INSTOCK':
        return 'success';
      case 'BEST PRICE':
        return 'info';
      default:
        return 'success';
    }
  }
}
