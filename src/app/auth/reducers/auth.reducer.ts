import { createReducer, on } from '@ngrx/store';
import {
  AblyErrorMessage,
  handleError,
} from 'src/app/shared/model/http-errors.model';
import {
  requestLogin,
  requestLoginFailure,
  requestLoginSuccess,
  requestLogoutSuccess,
} from '../actions/auth.actions';

export const featureKey = 'auth';

export interface State {
  accessToken: string | null;
  loginLoading: boolean;
  errorMessage: AblyErrorMessage | null;
}

export const initialState: State = {
  // android webview 등 localstorage를 지원하지 않는 환경이 있음
  accessToken: window.localStorage?.getItem('bearerToken') ?? null,
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
  on(requestLogoutSuccess, (state, { res }) => ({
    ...state,
    loginLoading: false,
    accessToken: null,
  })),
);
