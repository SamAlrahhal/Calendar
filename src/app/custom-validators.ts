import { AbstractControl, ValidationErrors } from '@angular/forms';

export class CustomValidators {
  static passwordContainsNumber(
    control: AbstractControl
  ): ValidationErrors | null {
    const regex = /\d/;
    if (control.value && !regex.test(control.value)) {
      return { passwordContainsNumber: true };
    }
    return null;
  }
}
