
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Employee } from '../../models/employee';
import { LoadEmployees, RemoveEmployees, SortEmployees } from '../../actions/employee.actions';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { faEdit, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { Sort } from '@angular/material';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  employee$: Observable<any>;
  displayedColumns = ['name', 'age', 'username', 'hireDate', 'actions'];
  icons = [ faEdit, faEye, faTrash ];

  constructor(
    private store: Store<{employees: Employee[]}>,
    private router: Router) {
    this.employee$ = this.store.pipe(select('employees'),
      map(e => e.employees));
  }

  ngOnInit() {
    this.store.dispatch(new LoadEmployees());
  }

  remove(id: string) {
    this.store.dispatch(new RemoveEmployees(id));
  }

  onAddEmployee() {
    this.router.navigateByUrl('/employee/new_employee');
  }

  sort(sort: Sort) {
    if (!sort.active || sort.direction === '') { return; }
    this.store.dispatch(new SortEmployees(sort));
  }
}
