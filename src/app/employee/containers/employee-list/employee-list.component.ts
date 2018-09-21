import { LoadEmployees, RemoveEmployees, SortEmployees, SearchEmployees } from '../../actions/employee.actions';
import { Component, OnInit, Pipe } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Employee } from '../../models/employee';
import { fromEvent, Observable } from 'rxjs';
import { map, tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { faEdit, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { Sort } from '@angular/material';
import { filter } from 'rxjs/internal/operators/filter';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  @ViewChild('search') search: ElementRef;
  employee$: Observable<any>;
  displayedColumns = ['name', 'age', 'username', 'hireDate', 'actions'];
  icons = [ faEdit, faEye, faTrash ];
  query = '';

  constructor(
    private store: Store<{employees: Employee[]}>,
    private router: Router) {
    this.employee$ = this.store.pipe(select('employees'),
      filter(e => e && e.employees),
      map(e => e.employees),
      map(e => this.applyQuery(e)));
  }

  ngOnInit() {
    this.store.dispatch(new LoadEmployees());
    this.initializeSearch();
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

  initializeSearch() {
    return fromEvent(this.search.nativeElement, 'keyup').pipe(
      map((e: any) => e.target.value),
      debounceTime(500),
      distinctUntilChanged())
      .subscribe((query: string) => {
        this.query = query;
        this.store.dispatch(new SearchEmployees(query));
      });
  }

  applyQuery(e: Employee[]): Employee[] {
    if (this.query === '') { return e; }

    const employeesSearch: Employee[]  = [];
    for (let i = 0; i < e.length; i++) {
      for (const key in e[i]) {
        if ( typeof e[i][key] !== 'string') { continue; }
        if (e[i][key].indexOf(this.query) !== -1) {
          employeesSearch.push(e[i]);
          break;
        }
      }
    }
    return employeesSearch;
  }
}
