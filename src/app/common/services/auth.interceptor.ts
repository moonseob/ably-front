import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, switchMap, switchMapTo, take } from 'rxjs/operators';
import * as fromRoot from '../reducers';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private store: Store<fromRoot.State>) {}

  private authedEndpoints = ['/api/logout', '/api/user'];

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    const authRequired = this.authedEndpoints.some((url) =>
      request.url.includes(url),
    );
    if (authRequired) {
      return this.store.select(fromRoot.selectLoginIsLoading).pipe(
        filter((isLoading) => isLoading === false),
        take(1),
        switchMapTo(
          this.store.select(fromRoot.selectAccessToken).pipe(
            switchMap((token) => {
              const _request = request.clone({
                setHeaders: {
                  Authorization: `Bearer ${token}`,
                },
              });
              return next.handle(_request);
            }),
          ),
        ),
      );
    }

    return next.handle(request);
  }
}
