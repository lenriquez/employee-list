import { AddEmployee } from './../../actions/employee.actions';
import { Component, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Employee } from '../../models/employee';
import { MatDialog } from '@angular/material';
import { ConfirmationDialogComponent } from '../../components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.scss']
})
export class EmployeeEditComponent {
  @ViewChild('form') form;

  constructor(
    private store: Store<{employees: Employee[]}>,
    public dialog: MatDialog)  { }

  onAddEmployee(event) {
    this.store.dispatch(new AddEmployee(event));
  }

  canDeactivate() {
    if (this.form.isDirty()) {
      return this.openDialog();
    }
    return true;
  }

  openDialog() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: {continue: false}
    });

    return dialogRef.afterClosed();
  }
}
