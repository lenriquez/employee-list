import { Employee } from './../models/employee';
import { Action } from '@ngrx/store';
import { conditionallyCreateMapObjectLiteral } from '@angular/compiler/src/render3/view/util';
import { Sort } from '@angular/material';

export enum EmployeesActionTypes {
  LoadEmployees = 'Load Employees',
  LoadEmployee = 'Load Employee',
  LoadEmployeesSuccess = 'Load Employees Success',
  LoadEmployeesError = 'Load Employees Error',
  RemoveEmployees = 'Remove Employee',
  AddEmployee = 'Add Employee',
  SortEmployees = 'SortEmployees'
}

export class LoadEmployees implements Action {
  readonly type = EmployeesActionTypes.LoadEmployees;
}

export class LoadEmployee implements Action {
  readonly type = EmployeesActionTypes.LoadEmployee;

  constructor(public id: string) {}
}
export class LoadEmployeesSuccess implements Action {
  readonly type = EmployeesActionTypes.LoadEmployeesSuccess;

  constructor(private payload) {}
}

export class LoadEmployeesError implements Action {
  readonly type = EmployeesActionTypes.LoadEmployeesError;
}

export class RemoveEmployees implements Action {
  readonly type = EmployeesActionTypes.RemoveEmployees;

  constructor(public id: string) {}
}

export class AddEmployee implements Action {
  readonly type = EmployeesActionTypes.AddEmployee;

  constructor(public employee: string) {}
}

export class SortEmployees implements Action {
  readonly type = EmployeesActionTypes.SortEmployees;

  constructor(public sort: Sort) {}
}
