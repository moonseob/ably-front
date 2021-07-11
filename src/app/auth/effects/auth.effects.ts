import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import {
  catchError,
  filter,
  map,
  switchMap,
  switchMapTo,
  tap,
} from 'rxjs/operators';
import { AuthApiService } from 'src/app/auth/services/auth-api.service';
import {
  removeStoredToken,
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
      switchMap(({ payload }) =>
        this.accService.login(payload).pipe(
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
        map(({ res }) => res.accessToken),
        filter((token) => !!token),
        tap((token) => {
          window.localStorage?.setItem('bearerToken', `${token}`);
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

  onLogoutSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(requestLogoutSuccess),
      map(() => removeStoredToken()),
    ),
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

  removeStoredToken$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(removeStoredToken),
        tap(() => {
          window.localStorage?.removeItem('bearerToken');
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
