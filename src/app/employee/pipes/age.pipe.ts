import { Utils } from './../models/utils';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'age'
})
export class AgePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return Utils.getAgeFromDate(value);
  }
}
