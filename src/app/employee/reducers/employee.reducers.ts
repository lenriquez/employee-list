import { LoadEmployees, EmployeesActionTypes, RemoveEmployees, SortEmployees } from './../actions/employee.actions';
import { Employee } from './../models/employee';
import { Action } from '@ngrx/store';
import { Utils } from '../models/utils';

export interface State {
  loading: boolean;
  loaded: boolean;
  employees: Employee[];
  activeEmployee: Employee;
  employeesSearch: Employee[];
}

const initialState: State = {
  loading: false,
  loaded: false,
  employees: [],
  activeEmployee: undefined,
  employeesSearch: undefined
};

export function employeeReducer(state = initialState, action) {
  switch (action.type) {
    case EmployeesActionTypes.LoadEmployees: {
      return {
        ...state,
        loading: false
      };
    }
    case EmployeesActionTypes.LoadEmployeesSuccess: {
      return state.loaded ?
        { ...state } :
        {
          loading: false,
          loaded: true,
          employees: action.payload,
          employeesSearch: action.payload
        };
    }

    case EmployeesActionTypes.RemoveEmployees: {
      state.employees = state.employees.filter(e => e.id !== action.id);
      return { ...state };
    }

    case EmployeesActionTypes.SortEmployees: {
      let employees = state.employees.slice();
      employees = employees.sort((a, b) => {
        const isAsc = action.sort.direction === 'asc';
        switch (action.sort.active) {
          case 'name': return Utils.compare(a.name, b.name, isAsc);
          case 'age': return Utils.compare(a.dob, b.dob, isAsc);
          case 'username': return Utils.compare(a.username, b.username, isAsc);
          case 'hireDate': return Utils.compare(a.hireDate, b.hireDate, isAsc);
          default: return 0;
        }
      });
      return {
        ...state,
        employees
      };
    }

    case EmployeesActionTypes.LoadEmployee: {
      const activeEmployee = state.employees.find( e => e.id === action.id );
      return {
        ...state,
        activeEmployee: { ...activeEmployee }
      };
    }

    case EmployeesActionTypes.AddEmployee: {
      const indexEmployee = state.employees.findIndex( e => e.id === action.employee.id );
      const employees = state.employees.slice();

      if (indexEmployee === -1) { employees.push(action.employee); }
      if (indexEmployee !== -1) { employees[indexEmployee] = action.employee; }

      return {
        ...state,
        employees
      };
    }

    default:
      return {...state };
  }

}
