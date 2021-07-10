import { createReducer, on } from '@ngrx/store';
import {
  AblyErrorMessage,
  handleError,
} from 'src/app/common/model/http-errors.model';
import {
  requestLogin,
  requestLoginFailure,
  requestLoginSuccess,
} from '../actions/auth.actions';

export const featureKey = 'auth';

export interface State {
  accessToken: string | null;
  loginLoading: boolean;
  errorMessage: AblyErrorMessage | null;
}

export const initialState: State = {
  accessToken: null,
  loginLoading: false,
  errorMessage: null,
};

export function reducer(state: State | undefined, action: any) {
  return reducerInternal(state, action);
}

export const reducerInternal = createReducer(
  initialState,
  on(requestLogin, (state) => ({
    ...state,
    loginLoading: true,
    errorMessage: null,
  })),
  on(requestLoginSuccess, (state, { res }) => ({
    ...state,
    loginLoading: false,
    accessToken: res.accessToken,
  })),
  on(requestLoginFailure, (state, { err }) => ({
    ...state,
    loginLoading: false,
    errorMessage: handleError(err),
  })),
);
