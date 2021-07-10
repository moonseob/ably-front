import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, switchMapTo, tap } from 'rxjs/operators';
import { AuthApiService } from 'src/app/auth/services/auth-api.service';
import {
  requestLogin,
  requestLoginFailure,
  requestLoginSuccess,
  requestLogout,
  requestLogoutFailure,
  requestLogoutSuccess,
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

  storeToken$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(requestLoginSuccess),
        tap(({ res }) => {
          window.localStorage?.setItem(
            'bearerToken',
            `${res?.accessToken ?? ''}`,
          );
        }),
      ),
    { dispatch: false },
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

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(requestLogout),
      switchMapTo(
        this.accService.logout().pipe(
          map((res) => requestLogoutSuccess({ res })),
          catchError((err) => of(requestLogoutFailure({ err }))),
        ),
      ),
    ),
  );

  removeStoredToken$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(requestLogoutSuccess),
        tap(() => {
          window.localStorage?.removeItem('bearerToken');
        }),
      ),
    { dispatch: false },
  );

  logoutRedirect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(requestLogoutSuccess),
        tap(() => {
          this.router.navigate(['login']);
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
