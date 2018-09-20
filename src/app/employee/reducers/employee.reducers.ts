import { LoadEmployees, EmployeesActionTypes, RemoveEmployees } from './../actions/employee.actions';
import { Employee } from './../models/employee';
import { Action } from '@ngrx/store';

export interface State {
  loading: boolean;
  loaded: boolean;
  employees: Employee[];
}

const initialState: State = {
  loading: false,
  loaded: false,
  employees: []
};

export function employeeReducer(state = initialState, action) {
  switch (action.type) {
    case EmployeesActionTypes.LoadEmployees: {
      return {
        ...state,
        loading: false,
      };
    }
    case EmployeesActionTypes.LoadEmployeesSuccess: {
      // The if is not necessary if I had a real database;
      return state.loaded ?
        { ...state } :
        { ...state,
          loading: false,
          loaded: true,
          employees: action.payload
        };
    }

    case EmployeesActionTypes.RemoveEmployees: {
      state.employees = state.employees.filter(e => e.id !== action.id);
      return { ...state };
    }
  }

}
