import { Employee } from './../models/employee';
import { Action } from '@ngrx/store';

export enum CountriesActionTypes {
  LoadCountries = 'Load Countries',
  LoadCountriesSuccess = 'Load Countries Success',
  LoadCountriesError = 'Load Countries Error'
}

export class LoadCountries implements Action {
  readonly type = CountriesActionTypes.LoadCountries;
}

export class LoadCountriesSuccess implements Action {
  readonly type = CountriesActionTypes.LoadCountriesSuccess;

  constructor(public payload) {}
}

export class LoadCountriesError implements Action {
  readonly type = CountriesActionTypes.LoadCountriesError;
}
