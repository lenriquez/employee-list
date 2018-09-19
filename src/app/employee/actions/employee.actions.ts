import { Employee } from './../models/employee';
import { Action } from '@ngrx/store';
import { conditionallyCreateMapObjectLiteral } from '@angular/compiler/src/render3/view/util';

export enum EmployeesActionTypes {
  LoadEmployees = 'Load Employees',
  LoadEmployeesSuccess = 'Load Employees Success',
  LoadEmployeesError = 'Load Employees Error',
}

export class LoadEmployees implements Action {
  readonly type = EmployeesActionTypes.LoadEmployees;
}

export class LoadEmployeesSuccess implements Action {
  readonly type = EmployeesActionTypes.LoadEmployeesSuccess;

  constructor(private payload) {}
}

export class LoadEmployeesError implements Action {
  readonly type = EmployeesActionTypes.LoadEmployeesError;
}

