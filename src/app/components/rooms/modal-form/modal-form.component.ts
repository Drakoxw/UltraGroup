import {
  booleanAttribute,
  Component,
  effect,
  EventEmitter,
  inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { RatingModule } from 'primeng/rating';
import { InputNumberModule } from 'primeng/inputnumber';
import { CheckboxModule } from 'primeng/checkbox';
import { SelectModule } from 'primeng/select';
import {
  AutoCompleteCompleteEvent,
  AutoCompleteModule,
} from 'primeng/autocomplete';

import { RoomsService } from '@services/rooms.service';
import { HotelData, RoomData, RoomForm } from '@interfaces/index';
import { HotelsService } from '@services/hotels.service';
import { TYPES_ROOM } from '@constants/index';

@Component({
  selector: 'app-modal-form',
  imports: [
    Dialog,
    ButtonModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    TextareaModule,
    RatingModule,
    InputNumberModule,
    CheckboxModule,
    AutoCompleteModule,
    SelectModule
  ],
  templateUrl: './modal-form.component.html',
})
export class ModalFormComponent implements OnInit, OnDestroy {
  @Output() closeModal = new EventEmitter();
  @Input({ transform: booleanAttribute }) visible = false;
  @Input() title = 'Modal titulo';
  @Input() data: RoomData | null = null;

  #service = inject(RoomsService);
  #hotelServ = inject(HotelsService);
  form: FormGroup;
  public loading = false;
  hoterList: HotelData[] = [];
  types = TYPES_ROOM

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      idHotel: [null, [Validators.required]],
      persons: [
        1,
        [Validators.required, Validators.min(1), Validators.max(15)],
      ],
      available: [true],
      active: [true],
      tax: [17, [Validators.required, Validators.min(1), Validators.max(90)]],
      cost: [null, [Validators.required, Validators.min(1)]],
      type: [null, [Validators.required]],
      code: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(10),
        ],
      ],
    });
    this.setValues();
    effect(() => {
      this.hoterList = this.#hotelServ.hotels();
    });
  }

  ngOnDestroy(): void {
    this.onClose();
  }

  ngOnInit(): void {
    this.setValues();
    if (this.#hotelServ.hotels().length == 0) {
      this.#hotelServ.list();
    }
  }

  setValues() {
    this.title = 'Nueva Habitación';
    if (this.data) {
      this.title = 'Editar Nueva Habitación';
      this.form.patchValue({
        idHotel: this.findHotel(this.data.idHotel),
        code: this.data.code,
        persons: this.data.persons,
        available: this.data.available,
        active: this.data.active,
        tax: this.data.tax,
        cost: this.data.cost,
        type: this.data.type,
      });
    }
  }

  onClose() {
    this.closeModal.emit();
  }

  onSave() {
    this.form.markAsTouched();
    if (this.form.invalid) {
      return;
    }
    const hotel = this.form.value.idHotel;
    const type = this.form.value.type;

    const payload: RoomForm = {
      ...this.form.value,
      idHotel: hotel.id ?? Number(this.data?.idHotel),
      type: type ?? String(this.data?.type)
    };

    if (this.data) {
      this.#service.updateRoom(this.data.id, payload);
    } else {
      this.#service.addRoom(payload);
    }
    this.onClose();
  }

  filterHotel(ev: AutoCompleteCompleteEvent) {
    const filtered: HotelData[] = [];
    const query = ev.query;
    for (let i = 0; i < this.#hotelServ.hotels().length; i++) {
      const hotel = this.#hotelServ.hotels()[i];
      if (hotel.name.toLowerCase().includes(query.toLowerCase())) {
        filtered.push(hotel);
      }
    }
    this.hoterList = filtered;
  }

  filter(ev: AutoCompleteCompleteEvent) {
    this.types = TYPES_ROOM.filter(el => el.label.toLowerCase().includes(ev.query.toLowerCase()))
  }

  private findHotel(id: number): string {
    let name = '';
    this.#hotelServ.hotels().forEach((el) => {
      if (el.id == id) {
        name = el.name;
      }
    });
    return name;
  }
}
