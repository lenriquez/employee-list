import { LoadCountries } from './../../actions/country.actions';
import { Employee } from './../../models/employee';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { select } from '@ngrx/store';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit {
  @Output() submitted = new EventEmitter<Employee>();

  countries$: Observable<any>;

  form: FormGroup = new FormGroup({
    name: new FormControl(''),
    dob: new FormControl(''),
    country: new FormControl(''),
    username: new FormControl(''),
    hireDate: new FormControl(''),
    status: new FormControl(''),
    area: new FormControl(''),
    jobTitle: new FormControl(''),
    tipRate: new FormControl(''),
    age: new FormControl(''),
  });

  constructor(
    private store: Store<{employees: Employee[]}>,
    private activatedRoute: ActivatedRoute) {
      this.countries$ = this.store.pipe(select('countries'));
    }

  ngOnInit() {
    // Assumption: Form is not going to be reset so for that reason is using route
    // https://angular.io/guide/router#snapshot-the-no-observable-alternative
    if (this.activatedRoute.snapshot.paramMap.get('viewmode')) {
      this.form.disable();
    }
    this.store.dispatch(new LoadCountries());
  }

  submit() {
    if (this.form.valid) {
      this.submitted.emit(this.form.value);
    }
  }

}
