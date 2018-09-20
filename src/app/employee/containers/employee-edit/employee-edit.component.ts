import { AddEmployee } from './../../actions/employee.actions';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Employee } from '../../models/employee';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.scss']
})
export class EmployeeEditComponent implements OnInit {

  constructor(private store: Store<{employees: Employee[]}>)  { }

  ngOnInit() {
  }

  onAddEmployee(event) {
    this.store.dispatch(new AddEmployee(event));
  }
}
