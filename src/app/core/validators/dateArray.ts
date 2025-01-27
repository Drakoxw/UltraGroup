import { AbstractControl, ValidatorFn } from '@angular/forms';

export function dateArrayValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const datesArray = control.value;

    if (!Array.isArray(datesArray) || datesArray.length !== 2) {
      return { 'invalidArray': { value: control.value } };
    }

    const startDate = new Date(datesArray[0]);
    const endDate = new Date(datesArray[1]);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return { 'invalidDate': { value: control.value } };
    }

    if (startDate > endDate) {
      return { 'invalidRange': { value: control.value } };
    }

    return null;
  };
}
