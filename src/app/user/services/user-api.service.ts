import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  /** 회원 정보 조회 */
  getUser(): Observable<User> {
    return this.httpClient.get<User>(`${environment.apiHost}/user`);
  }
  constructor(private httpClient: HttpClient) {}
}
