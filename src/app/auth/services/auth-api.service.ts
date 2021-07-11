import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  LoginRequestPayload,
  LoginResponse,
  LogoutResponse,
} from 'src/app/auth/model/auth.model';
import { environment } from 'src/environments/environment';
import * as fromRoot from '../../common/reducers';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  /** 로그인 */
  login(body: LoginRequestPayload): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(
      `${environment.apiHost}/login`,
      body,
    );
  }

  /** 로그아웃 */
  logout(): Observable<LogoutResponse> {
    return this.httpClient.post<LogoutResponse>(
      `${environment.apiHost}/logout`,
      null,
    );
  }

  isLoggedIn(): Observable<boolean> {
    return this.store
      .select(fromRoot.selectAccessToken)
      .pipe(map((token) => token !== null));
  }

  constructor(
    private httpClient: HttpClient,
    private store: Store<fromRoot.State>,
  ) {}
}
