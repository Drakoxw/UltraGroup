import { Component, HostListener, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import {
  AutoCompleteCompleteEvent,
  AutoCompleteModule,
} from 'primeng/autocomplete';
import { DatePicker } from 'primeng/datepicker';
import { ButtonModule } from 'primeng/button';
import { FloatLabel } from 'primeng/floatlabel';
import { SelectChangeEvent, SelectModule } from 'primeng/select';

import { CarruselHomeComponent } from '@components/index';

import { CitiesService, ReservationService, ToastAlertService } from '@services/index';
import { CityData, SelectOptions } from '@interfaces/index';
import { CITIES_BASE, PEOPLE_PER_ROOM } from '@constants/index';
import { NgClass } from '@angular/common';
import { dateArrayValidator } from '@validators/index';
import { formatDate, getValidationError } from '@utils/index';
import { ModalSelectRoomComponent } from '@components/rooms/modal-select-room/modal-select-room.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    AutoCompleteModule,
    DatePicker,
    ButtonModule,
    CarruselHomeComponent,
    FloatLabel,
    NgClass,
    SelectModule,
    ModalSelectRoomComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  #toastAlert = inject(ToastAlertService);
  #cityServ = inject(CitiesService);
  #reservationServ = inject(ReservationService);

  minDate = new Date();
  showModal = false
  peopleCount = 1

  cities: CityData[] = [...CITIES_BASE];
  peopleOptions: SelectOptions[] = [];
  isSmall = false;
  value: any;
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      destination: ['', [Validators.required]],
      people: ['', [Validators.required]],
      dates: ['', [Validators.required, dateArrayValidator()]],
    });
  }

  ngOnInit(): void {
    this.onResize();
    this.#reservationServ.status$.subscribe(status => {
      if (status == 'created') {
        this.form.reset();
      }
    })
  }

  setPeopleOptions() {
    if (this.peopleOptions.length == 0) {
      this.peopleOptions = [...PEOPLE_PER_ROOM];
    }
  }

  setValue(ev: SelectChangeEvent) {
    this.form.controls['people'].markAsTouched()
    this.form.controls['people'].setValue(ev.value?.value)
  }

  search(ev: AutoCompleteCompleteEvent) {
    if (ev.query) {
      this.#cityServ.searchCity(ev.query).subscribe({
        next: (res) => {
          if (!res.error) {
            this.cities = res.data ?? [];
          }
        },
      });
    } else {
      this.cities = [...CITIES_BASE];
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.isSmall = window.innerWidth < 580;
  }

  searchTravel() {
    this.form.markAllAsTouched()
    if (this.form.invalid) {
      this.#toastAlert.info('Completa los datos correctamente!')
      return
    }

    const {destination, dates, people} = this.form.value
    const [date1, date2] = [...dates]

    const data = {
      destination: destination.nombre,
      people: Number(people),
      dateFrom: formatDate(date1, 'yyyy-MM-dd'),
      dateTo: formatDate(date2, 'yyyy-MM-dd')
    }

    this.peopleCount = data.people
    this.showModal = true
    this.#reservationServ.setDestinationAndChecking(data)
  }

  get dates() {
    return getValidationError('dates', this.form, 'Selecciona tus fechas de inicio y salida');
  }

  get people() {
    return getValidationError('people', this.form, 'Selecciona una opción');
  }

  get destination() {
    return getValidationError('destination', this.form, 'Selecciona tu lugar de destino');
  }
}
