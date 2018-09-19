import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Employee } from '../../models/employee';
import { LoadEmployees } from '../../actions/employee.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  employee$: Observable<any>;

  constructor(private store: Store<{employees: Employee[]}>) {
    this.employee$ = this.store.pipe(select('employees'));
  }

  ngOnInit() {
    this.store.dispatch(new LoadEmployees());

  }
}
