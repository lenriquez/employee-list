import { routing } from './routes';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EmployeeListComponent } from './employee/containers/employee-list/employee-list.component';
import { EmployeeEditComponent } from './employee/containers/employee-edit/employee-edit.component';
import { EmployeeFormComponent } from './employee/components/employee-form/employee-form.component';
import { EmployeeEffects } from './employee/effects/employee.effect';
import { employeeReducer } from './employee/reducers/employee.reducers';
import { countryReducer } from './employee/reducers/countries.reducers';

import {
  MatButtonModule,
  MatTableModule,
  MatFormFieldModule,
  MatNativeDateModule,
  MatInputModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatButtonToggleModule,
  MatCardModule,
  MatDatepickerModule } from '@angular/material';


import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CountryEffects } from './employee/effects/country.effect';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent,
    EmployeeEditComponent,
    EmployeeFormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    routing,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot({ employees: employeeReducer, countries: countryReducer }),
    EffectsModule.forRoot([EmployeeEffects, CountryEffects]),
    MatTableModule,
    MatButtonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatButtonToggleModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
