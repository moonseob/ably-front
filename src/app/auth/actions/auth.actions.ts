import { createAction, props } from '@ngrx/store';
import { AblyErrorResponse } from 'src/app/common/model/http-errors.model';
import { LoginRequestBody, LoginResponse } from '../model/login-api.model';

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
