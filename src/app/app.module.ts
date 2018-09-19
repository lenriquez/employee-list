import { routing } from './routes';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EmployeeListComponent } from './employee/containers/employee-list/employee-list.component';
import { EmployeeEditComponent } from './employee/containers/employee-edit/employee-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent,
    EmployeeEditComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    routing,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
