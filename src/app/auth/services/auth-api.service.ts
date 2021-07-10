import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  LoginRequestPayload,
  LoginResponse,
  LogoutResponse,
} from 'src/app/auth/model/auth.model';
import { environment } from 'src/environments/environment';

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

  constructor(private httpClient: HttpClient) {}
}
