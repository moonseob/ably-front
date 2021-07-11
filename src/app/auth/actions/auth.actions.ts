import { createAction, props } from '@ngrx/store';
import { AblyErrorResponse } from 'src/app/shared/model/http-errors.model';
import {
  LoginRequestPayload,
  LoginResponse,
  LogoutResponse,
} from '../model/auth.model';

export const loginInit = createAction('[Auth] Login Init');

export const requestLogin = createAction(
  '[Auth] Request Login',
  props<{ payload: LoginRequestPayload; returnUrl?: string }>(),
);

export const requestLoginSuccess = createAction(
  '[Auth] Request Login Success',
  props<{ res: LoginResponse }>(),
);

export const requestLoginFailure = createAction(
  '[Auth] Request Login Failure',
  props<{ err: AblyErrorResponse | null }>(),
);

export const requestLogout = createAction(
  '[Auth] Request Logout',
  props<{ returnUrl?: string }>(), // returnUrl은 angular route
);

export const requestLogoutSuccess = createAction(
  '[Auth] Request Logout Success',
  props<{ res: LogoutResponse }>(),
);

export const requestLogoutFailure = createAction(
  '[Auth] Request Logout Failure',
  props<{ err: AblyErrorResponse }>(),
);

export const removeStoredToken = createAction(
  '[Auth] Remove Token from LocalStorage',
);
