import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { AuthApiService } from 'src/app/common/services/auth-api.service';
import {
  requestLogin,
  requestLoginFailure,
  requestLoginSuccess,
} from '../actions/auth.actions';

@Injectable()
export class AuthEffects {
  loadToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(requestLogin),
      switchMap(({ body }) =>
        this.accService.login(body).pipe(
          map((res) => requestLoginSuccess({ res })),
          catchError((err) => of(requestLoginFailure({ err }))),
        ),
      ),
    ),
  );

  loginRedirect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(requestLoginSuccess),
        tap(() => {
          this.router.navigate(['user']);
        }),
      ),
    { dispatch: false },
  );

  constructor(
    private actions$: Actions,
    private router: Router,
    private accService: AuthApiService,
  ) {}
}
