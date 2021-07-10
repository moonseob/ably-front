import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  LoginRequestBody,
  LoginResponse,
} from 'src/app/auth/model/login-api.model';
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

  constructor(private httpClient: HttpClient) {}
}
