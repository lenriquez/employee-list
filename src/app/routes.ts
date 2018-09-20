import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { EmployeeListComponent } from './employee/containers/employee-list/employee-list.component';
import { EmployeeEditComponent } from './employee/containers/employee-edit/employee-edit.component';
import { CanDeactivateGuard } from './employee/guards/can-deactivate-guard.service.';

export const routes: Routes = [
  { path: '', redirectTo: '/employees', pathMatch: 'full' },
  { path: 'employees', component: EmployeeListComponent },
  { path: 'employee/new_employee', component: EmployeeEditComponent,  canDeactivate: [CanDeactivateGuard] },
  { path: 'employee/:id', component: EmployeeEditComponent, canDeactivate: [CanDeactivateGuard] },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
