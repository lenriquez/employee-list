import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Action } from '@ngrx/store';
import { catchError, map, switchMap, tap, mergeMap } from 'rxjs/operators';
import {
  CountriesActionTypes,
  LoadCountriesSuccess,
  LoadCountriesError } from '../actions/country.actions';

@Injectable()
export class CountryEffects {
  @Effect()
  loadCountries$: Observable<Action> = this.actions$.pipe(
    ofType(CountriesActionTypes.LoadCountries),
    switchMap(() =>
      this.http.get('https://restcountries.eu/rest/v2/all').pipe(
        map((country: any) => country.map( c => c.name )),
        map(country => new LoadCountriesSuccess(country)),
        catchError(error => of(new LoadCountriesError()))
      )
    )
  );

  constructor(private http: HttpClient, private actions$: Actions) {}
}
