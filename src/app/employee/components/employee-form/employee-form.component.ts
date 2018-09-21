import { LoadEmployee, LoadEmployees } from './../../actions/employee.actions';
import { LoadCountries } from './../../actions/country.actions';
import { Employee } from './../../models/employee';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { select } from '@ngrx/store';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { filter } from 'rxjs/internal/operators/filter';
import { State } from '../../reducers/employee.reducers';
import { validateAge } from '../../validators/age.validator';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit {
  @Output() submitted = new EventEmitter<Employee>();

  countries$: Observable<any>;
  sub: Subscription[] = [];
  editMode = false;
  showTipRate = false;
  isSubmitted = false;

  form: FormGroup = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', Validators.required),
    dob: new FormControl('', [Validators.required, validateAge()]),
    country: new FormControl('', Validators.required),
    username: new FormControl('', [ Validators.required,  Validators.pattern('[a-zA-Z0-9]*')]),
    hireDate: new FormControl('', Validators.required),
    status: new FormControl('true', Validators.required),
    area: new FormControl('kitchen'),
    jobTitle: new FormControl('', Validators.required),
    tipRate: new FormControl('', Validators.required),
  });

  constructor(
    private store: Store<{employees: Employee[]}>,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
      this.countries$ = this.store.pipe(select('countries'));
      this.sub.push(this.store.pipe(select('employees'), filter(e => e && e.activeEmployee))
        .subscribe((e: State) => this.setFormValues(e.activeEmployee)));
    }

  ngOnInit() {
    // Assumption: Form is not going to be reset so for that reason is using route
    // https://angular.io/guide/router#snapshot-the-no-observable-alternative
    if (this.activatedRoute.snapshot.queryParamMap.get('viewmode')) { this.form.disable(); }
    if (this.activatedRoute.snapshot.paramMap.get('id')) {
      this.store.dispatch(new LoadEmployee(this.activatedRoute.snapshot.paramMap.get('id')));
      this.editMode = true;
    } else {
      this.form.setValue(new Employee());
    }
    this.store.dispatch(new LoadCountries());
  }

  submit() {
    this.submitted.emit(new Employee(this.form.value, true));
    this.isSubmitted = true;
    this.router.navigateByUrl('/employees');
  }

  setFormValues(employee: Employee) {
    if (!employee.id) { return this.router.navigateByUrl('/employees'); }
    this.form.setValue(employee);
    this.form.get('dob').setValue(new Date(employee.dob));
    this.form.get('hireDate').setValue(new Date(employee.hireDate));
    this.setTipRate(employee.jobTitle);
  }

  onNgDestroy() {
    this.sub.forEach(subs => { if (subs) { subs.unsubscribe(); }});
  }

  isDirty(): boolean {
    if (this.isSubmitted) { return false; }
    return this.form.dirty;
  }

  getError(fc: FormControl): string {
    return fc.hasError('required') || fc.hasError('matDatepickerParse') ? 'You must enter a valid value' :
    fc.hasError('pattern') ? 'Invalid characters' :
    fc.hasError('validateAge') ? 'Employee needs to be 18 years old or older' :
    '';
  }

  setTitle(title: string): void {
    this.form.get('jobTitle').setValue(title);
    this.setTipRate(title);
  }

  setTipRate(title: string) {
    this.showTipRate = title === 'Waitress' || title === 'Dining Room Manager';
    if (!this.showTipRate) { this.form.get('tipRate').setValue(0); }
  }
}
