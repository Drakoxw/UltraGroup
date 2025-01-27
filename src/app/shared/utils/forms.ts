import { FormGroup } from '@angular/forms';

export function getValidationError(
  formControlName: string,
  form: FormGroup,
  errorMessage: string
) {
  const control = form.get(formControlName);
  return {
    validateError: control?.errors && control?.touched ? errorMessage : '',
    error: control?.errors && control?.touched,
  };
}
