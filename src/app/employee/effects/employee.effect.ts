import { LoadEmployeesError } from './../actions/employee.actions';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { EmployeesActionTypes, LoadEmployeesSuccess } from '../actions/employee.actions';
import { HttpClient } from '@angular/common/http';
import { Action } from '@ngrx/store';
import { Employee } from '../models/employee';
import { catchError, map, switchMap} from 'rxjs/operators';

@Injectable()
export class EmployeeEffects {
  @Effect()
  loadEmployees$: Observable<Action> = this.actions$.pipe(
    ofType(EmployeesActionTypes.LoadEmployees),
    switchMap(() =>
      this.http.get('/assets/employees.json').pipe(
        map(
          (employees: Employee) => new LoadEmployeesSuccess(employees)
        ),
        catchError(error =>
          of(new LoadEmployeesError())
        )
      )
    )
  );

  constructor(private http: HttpClient, private actions$: Actions) {}
}
