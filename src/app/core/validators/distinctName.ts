import { AbstractControl, ValidatorFn } from '@angular/forms';

export function distinctNameValidator(
  originKey: string,
  destinationKey: string
): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const originControl = control.get(originKey);
    const destinationControl = control.get(destinationKey);

    if (!originControl || !destinationControl) {
      return null;
    }

    const originName = originControl.value?.nombre;
    const destinationName = destinationControl.value?.nombre;

    return originName && destinationName && originName === destinationName
      ? { sameName: true }
      : null;
  };
}
