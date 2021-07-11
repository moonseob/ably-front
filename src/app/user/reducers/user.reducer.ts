import { createReducer, on } from '@ngrx/store';
import {
  AblyErrorMessage,
  handleError,
} from 'src/app/shared/model/http-errors.model';
import {
  loadUser,
  loadUserFailure,
  loadUserSuccess,
} from '../actions/user.actions';
import { User } from '../models/user.model';

export const featureKey = 'user';

export interface State {
  user: User | null;
  loading: boolean;
  errorMessage: AblyErrorMessage | null;
}

export const initialState: State = {
  user: null,
  loading: false,
  errorMessage: null,
};

export function reducer(state: State | undefined, action: any) {
  return reducerInternal(state, action);
}

export const reducerInternal = createReducer(
  initialState,
  on(loadUser, (state) => ({
    ...state,
    loading: true,
    errorMessage: null,
  })),
  on(loadUserSuccess, (state, { res }) => ({
    ...state,
    loading: false,
    user: res,
  })),
  on(loadUserFailure, (state, { err }) => ({
    ...state,
    loading: false,
    errorMessage: handleError(err),
  })),
);
