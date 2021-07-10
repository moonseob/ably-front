import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  LoginRequestBody,
  LoginResponse,
  LogoutResponse,
} from 'src/app/auth/model/auth.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  login(body: LoginRequestBody): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(
      `${environment.apiHost}/login`,
      body,
    );
  }

  logout(): Observable<LogoutResponse> {
    return this.httpClient.post<LogoutResponse>(
      `${environment.apiHost}/logout`,
      null,
    );
  }

  constructor(private httpClient: HttpClient) {}
}
