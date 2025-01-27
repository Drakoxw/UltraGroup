import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import { DatePickerModule } from 'primeng/datepicker';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { InputMaskModule } from 'primeng/inputmask';

import { EmergencyContact, Guest } from '@interfaces/index';

@Component({
  selector: 'app-form-emergency-contact',
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    FormsModule,
    FloatLabel,
    ButtonModule,
    DatePickerModule,
    InputNumberModule,
    SelectModule,
    InputMaskModule,
  ],
  templateUrl: './form-emergency-contact.component.html',
  styleUrl: './form-emergency-contact.component.css',
})
export class FormEmergencyContactComponent {
  @Output() contact = new EventEmitter<EmergencyContact>();
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      fullName: [null, [Validators.required]],
      phone: [null, [Validators.required]],
    });
  }

  onSave() {
    const { fullName, phone } = this.form.value;

    const data: EmergencyContact = {
      fullName,
      phone,
    };

    this.contact.emit(data);
  }
}
