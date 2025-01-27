import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';

import { ButtonComponent } from '@shared/components';
import { PATH } from '@constants/index';
import { SessionService, ToastAlertService } from '@services/index';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [
    ButtonComponent,
    FormsModule,
    PasswordModule,
    ReactiveFormsModule,
    InputTextModule,
  ],
})
export class LoginComponent {
  #toastAlert = inject(ToastAlertService);
  #session = inject(SessionService);
  #router = inject(Router);

  form: FormGroup;

  public loading = false;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit(): void {
    this.#session.clearSession()
  }

  onSubmit(): void {
    this.form.markAllAsTouched();
    if (this.loading) {
      return;
    }

    if (this.form.valid) {
      this.loading = true;
      const { email, password } = this.form.value;

      this.#session.login({ email, password }).subscribe({
        next: (res) => {
          if (!res.error && res.data && res.data.token) {
            this.#toastAlert.success(res.msg, 'Bienvenido...  😁',);
            this.#router.navigate([PATH.BOOKING]);
            return
          }
          this.#toastAlert.error(res.msg);
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          this.loading = false;
        },
      });
    }
  }
}
