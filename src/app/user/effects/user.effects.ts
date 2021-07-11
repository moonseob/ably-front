import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMapTo } from 'rxjs/operators';
import {
  loadUser,
  loadUserFailure,
  loadUserSuccess,
} from '../actions/user.actions';
import { UserApiService } from '../services/user-api.service';

@Injectable()
export class UserEffects {
  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUser),
      switchMapTo(
        this.service.getUser().pipe(
          map((res) => loadUserSuccess({ res })),
          catchError((err) => of(loadUserFailure({ err }))),
        ),
      ),
    ),
  );

  constructor(private actions$: Actions, private service: UserApiService) {}
}
