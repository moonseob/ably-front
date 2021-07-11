import { createReducer, on } from '@ngrx/store';
import {
  AblyErrorMessage,
  handleError,
} from 'src/app/shared/model/http-errors.model';
import {
  loginInit,
  requestLogin,
  requestLoginFailure,
  requestLoginSuccess,
  requestLogout,
  requestLogoutFailure,
  requestLogoutSuccess,
} from '../actions/auth.actions';

export const featureKey = 'auth';

export interface State {
  accessToken: string | null;
  loginLoading: boolean;
  logoutLoading: boolean;
  errorMessage: AblyErrorMessage | null;
  returnUrl: string;
}

export const initialState: State = {
  // android webview 등 localstorage를 지원하지 않는 환경이 있음
  accessToken: null,
  loginLoading: true,
  logoutLoading: false,
  errorMessage: null,
  returnUrl: '/',
};

export function reducer(state: State | undefined, action: any) {
  return reducerInternal(state, action);
}

export const reducerInternal = createReducer(
  initialState,
  // init
  on(loginInit, (state) => ({
    ...initialState,
    loginLoading: false,
  })),

  // login
  on(requestLogin, (state, { returnUrl }) => ({
    ...state,
    loginLoading: true,
    errorMessage: null,
    returnUrl: returnUrl ?? initialState.returnUrl,
  })),
  on(requestLoginSuccess, (state, { res }) => ({
    ...state,
    loginLoading: false,
    accessToken: res.accessToken,
    errorMessage: null,
  })),
  on(requestLoginFailure, (state, { err }) => ({
    ...state,
    loginLoading: false,
    errorMessage: !!err ? handleError(err) : null,
  })),

  // logout
  on(requestLogout, (state, { returnUrl }) => ({
    ...state,
    logoutLoading: true,
    errorMessage: null,
    returnUrl: returnUrl ?? initialState.returnUrl,
  })),
  on(requestLogoutSuccess, (state, { res }) => ({
    ...state,
    logoutLoading: false,
    accessToken: null,
    errorMessage: null,
  })),
  on(requestLogoutFailure, (state, { err }) => ({
    ...state,
    logoutLoading: false,
    errorMessage: handleError(err),
  })),
);
