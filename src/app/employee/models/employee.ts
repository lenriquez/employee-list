
import { v4 as uuid } from 'uuid';
export interface Employee {
  id: string;
  name: string;
  dob: number;
  country: string;
  username: string;
  hireDate: string;
  status: boolean;
  area: string;
  jobTitle: string;
  tipRate: number;
}

export class Employee implements Employee {
  id: string;
  name: string;
  dob: number;
  country: string;
  username: string;
  hireDate: string;
  status: boolean;
  area: string;
  jobTitle: string;
  tipRate: number;

  constructor(fields?: Object, transformDates?: boolean) {
    if (!fields.id) { fields.id = uuid(); }
    if (transformDates) { fields = this.mapDates(fields); }
    if (fields) { Object.assign(this, fields); }
  }

  mapDates(fields: any) {
    fields.dob = fields.dob.getTime();
    fields.hireDate = fields.hireDate.getTime();
    return fields;
  }
}
