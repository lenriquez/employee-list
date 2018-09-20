import { Action } from '@ngrx/store';
import { CountriesActionTypes } from '../actions/country.actions';

export interface State {
  loading: boolean;
  loaded: boolean;
  payload: any[];
}

const initialState: State = {
  loading: false,
  loaded: false,
  payload: []
};

export function countryReducer(state = initialState, action) {
  switch (action.type) {
    case CountriesActionTypes.LoadCountries: {
      return {
        ...state,
        loading: false,
      };
    }
    case CountriesActionTypes.LoadCountriesSuccess: {
      return state.loaded ?
        { ...state } :
        { ...state,
          loading: false,
          loaded: true,
          payload: action.payload
        };
    }
    default:
      return state;
  }
}
