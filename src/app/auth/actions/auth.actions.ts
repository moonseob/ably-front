import { createAction, props } from '@ngrx/store';
import { AblyErrorResponse } from 'src/app/common/model/http-errors.model';
import {
  LoginRequestBody,
  LoginResponse,
  LogoutResponse,
} from '../model/auth.model';

export const requestLogin = createAction(
  '[Auth] Request Login',
  props<{ body: LoginRequestBody }>(),
);

export const requestLoginSuccess = createAction(
  '[Auth] Request Login Success',
  props<{ res: LoginResponse }>(),
);

export const requestLoginFailure = createAction(
  '[Auth] Request Login Failure',
  props<{ err: AblyErrorResponse }>(),
);

export const requestLogout = createAction('[Auth] Request Logout');

export const requestLogoutSuccess = createAction(
  '[Auth] Request Logout Success',
  props<{ res: LogoutResponse }>(),
);

export const requestLogoutFailure = createAction(
  '[Auth] Request Logout Failure',
  props<{ err: AblyErrorResponse }>(),
);
