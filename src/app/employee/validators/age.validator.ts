import { Utils } from './../models/utils';
import { ValidatorFn, AbstractControl } from '@angular/forms';

export function validateAge(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    console.log(control.value);
    const age = Utils.getAgeFromDate(control.value);
    return age <= 18 ? {'validateAge': {value: control.value}} : null;
  };
}
