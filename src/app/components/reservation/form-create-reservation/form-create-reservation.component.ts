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

import { DOCUMENTS_OPTIONS, GENDER_OPTIONS } from '@constants/index';
import { FormControlErrorClassPipe } from '../../../core/pipes/form-control-error-class.pipe';
import { NgClass } from '@angular/common';
import { Guest } from '@interfaces/index';
import { formatDate } from '@utils/date';

@Component({
  selector: 'app-form-create-reservation',
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    FormsModule,
    NgClass,
    FloatLabel,
    ButtonModule,
    DatePickerModule,
    InputNumberModule,
    SelectModule,
    FormControlErrorClassPipe,
    InputMaskModule
  ],
  templateUrl: './form-create-reservation.component.html',
  styleUrl: './form-create-reservation.component.css',
})
export class FormCreateReservationComponent {
  @Output() newPeople = new EventEmitter<Guest>()
  genderOptions = [...GENDER_OPTIONS]
  documentOptions = [...DOCUMENTS_OPTIONS]
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      lastname: [null, [Validators.required]],
      birthDate: [null, [Validators.required]],
      gender: [null, [Validators.required]],
      documentType: [null, [Validators.required]],
      documentNumber: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      phone: [null, [Validators.required]],
    });
  }

  onValidateVoid(formName: string) {
    if (this.form.get(formName)) {
      if (!this.form.get(formName)?.value?.label) {
        this.form.get(formName)?.setErrors({require: true})
      }
    }
  }

  onSave() {
    const {
      name,
      lastname,
      birthDate,
      gender,
      documentType,
      documentNumber,
      email,
      phone,
    } = this.form.value

    const data: Guest = {
      fullName: `${name} ${lastname}`,
      birthDate: formatDate(birthDate, 'yyyy-MM-dd'),
      gender: gender.value,
      documentType: documentType.value,
      documentNumber,
      email,
      phone
    }

    this.newPeople.emit(data)
  }


}
