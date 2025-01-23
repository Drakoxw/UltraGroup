import {
  booleanAttribute,
  Component,
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

import { HotelsService } from '@services/index';
import { HotelData, HotelForm } from '@interfaces/models/hotel';

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
    CheckboxModule
  ],
  templateUrl: './modal-form.component.html',
})
export class ModalFormComponent implements OnInit,OnDestroy {
  @Output() closeModal = new EventEmitter();
  @Input({ transform: booleanAttribute }) visible = false;
  @Input() title = 'Modal titulo';
  @Input() data: HotelData | null = null;

  #service = inject(HotelsService);
  form: FormGroup;
  public loading = false;

  private validators = [
    Validators.required,
    Validators.minLength(4),
    Validators.maxLength(50),
  ];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', [...this.validators]],
      location: ['', [...this.validators]],
      stars: [1, [Validators.required, Validators.min(1), Validators.max(5)]],
      numberOfRooms: [1, [Validators.required, Validators.min(1)]],
      description: ['', [Validators.maxLength(150)]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      active: [true],
    });
    this.setValues()
  }

  ngOnDestroy(): void {
    this.onClose()
  }
  ngOnInit(): void {
    this.setValues()
  }

  setValues() {
    this.title = 'Nuevo Hotel'
    if (this.data) {
      this.title = 'Editar Hotel'
      this.form.patchValue({
        name: this.data.name,
        location: this.data.location,
        stars: this.data.stars,
        numberOfRooms: this.data.numberOfRooms,
        description: this.data.description,
        phone: this.data.phone,
        active: this.data.active,
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
    const { name, location, stars,active, numberOfRooms, description, phone } =
      this.form.value;
    const payload: HotelForm = {
      active,
      name,
      location,
      stars,
      numberOfRooms,
      description,
      phone,
    };
    if (this.data) {
      this.#service.updateHotel(this.data.id, payload)
    } else {
      this.#service.addHotel(payload)
    }
    this.onClose();
  }
}
