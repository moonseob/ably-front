import { createAction, props } from '@ngrx/store';
import { AblyErrorResponse } from 'src/app/common/model/http-errors.model';
import { User } from '../models/user.model';

export const loadUser = createAction('[User] Load');

export const loadUserSuccess = createAction(
  '[User] Load Success',
  props<{ res: User }>(),
);

export const loadUserFailure = createAction(
  '[User] Load Failure',
  props<{ err: AblyErrorResponse }>(),
);
