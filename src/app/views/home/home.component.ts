import { Component, HostListener, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DatePicker } from 'primeng/datepicker';
import { ButtonModule } from 'primeng/button';
import { CarruselHomeComponent } from '@components/index';
import { ToastAlertService } from '@services/toast-alert.service';

interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    AutoCompleteModule,
    DatePicker,
    ButtonModule,
    CarruselHomeComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  #toastAlert = inject(ToastAlertService)
  items: any[] = [];
  isSmall = false
  value: any;
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      destination: ['', [Validators.required]],
      dateFrom: ['', [Validators.required]],
      dateTo: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {
    this.onResize()
  }

  search(event: AutoCompleteCompleteEvent) {
    let _items = [...Array(10).keys()];

    this.items = event.query
      ? [...Array(10).keys()].map((item) => event.query + '-' + item)
      : _items;
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.isSmall = window.innerWidth < 580
  }

  searchTravel() {
    this.#toastAlert.warning('En construcción! ...')
  }
}
