import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  ResetCodeValidatationPayload,
  ResetConfirmToken,
  ResetIssueToken,
  ResetPayload,
} from '../models/reset.models';

@Injectable({
  providedIn: 'root',
})
export class ResetApiService {
  /** 인증 코드 발급 요청 */
  reqeustResetCode(email: string): Observable<ResetIssueToken> {
    return this.httpClient.get<ResetIssueToken>(
      `${environment.apiHost}/reset-password?email=${email}`,
    );
  }

  /** 인증 코드 검증 */
  validateResetCode(
    payload: ResetCodeValidatationPayload,
  ): Observable<ResetConfirmToken> {
    return this.httpClient.post<ResetConfirmToken>(
      `${environment.apiHost}/reset-password`,
      payload,
    );
  }

  /** 비밀번호 변경 */
  requestReset(payload: ResetPayload): Observable<any> {
    return this.httpClient.patch<any>(
      `${environment.apiHost}/reset-password`,
      payload,
    );
  }

  constructor(private httpClient: HttpClient) {}
}
