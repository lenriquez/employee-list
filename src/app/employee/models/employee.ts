
import { v4 as uuid } from 'uuid';
export interface Employee {
  id: string;
  name: string;
  dob: Date;
  country: string;
  username: string;
  hireDate: Date;
  status: boolean;
  area: string;
  jobTitle: string;
  tipRate: number;
  age: number;
}

export class Employee implements Employee {
  id = uuid();
  name: string;
  dob: Date;
  country: string;
  username: string;
  hireDate: Date;
  status: boolean;
  area: string;
  jobTitle: string;
  tipRate: number;
  age: number;
}
