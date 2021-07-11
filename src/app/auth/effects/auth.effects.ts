import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  Actions,
  createEffect,
  ofType,
  ROOT_EFFECTS_INIT,
} from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import {
  catchError,
  filter,
  map,
  switchMap,
  switchMapTo,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { AuthApiService } from 'src/app/auth/services/auth-api.service';
import { loadUser } from 'src/app/user/actions/user.actions';
import * as fromRoot from '../../common/reducers';
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
  login$ = createEffect(() =>
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

  loadUserOnLoginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(requestLoginSuccess),
      map(() => loadUser()),
    ),
  );

  checkLoginOnLoad$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ROOT_EFFECTS_INIT),
      map(() => {
        const lsToken = window.localStorage?.getItem('bearerToken');
        if (lsToken != undefined) {
          return requestLoginSuccess({ res: { accessToken: lsToken } });
        } else {
          return requestLoginFailure({ err: null });
        }
      }),
    ),
  );

  onLogoutSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(requestLogoutSuccess),
      map(() => removeStoredToken()),
    ),
  );

  redirectAfterAuthChange$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(requestLogoutSuccess, requestLoginSuccess),
        withLatestFrom(this.store.select(fromRoot.selectAuthReturnUrl)),
        map(([, returnUrl]) => this.router.createUrlTree([returnUrl])),
        tap((urlTree) => {
          this.router.navigateByUrl(urlTree);
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
    private accService: AuthApiService,
    private router: Router,
    private store: Store<fromRoot.State>,
  ) {}
}
