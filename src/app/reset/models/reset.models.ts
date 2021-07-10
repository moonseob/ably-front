export interface ResetIssueToken {
  /** 인증 코드 발급 요청 토큰 */
  issueToken: string;
  /** 인증 코드 확인 남은 시간 */
  remainMillisecond: number;
}

export interface ResetCodeValidatationPayload {
  /** 이메일 */
  email: string;
  /** 비밀번호 재설정 인증 코드 */
  authCode: string;
  /** 인증 코드 발급 요청 토큰 */
  issueToken: string;
}

export interface ResetConfirmToken {
  /** 인증 코드 검증 토큰 */
  confirmToken: string;
}

export interface ResetPayload {
  /** 이메일 */
  email: string;
  /** 인증 코드 검증 토큰 */
  confirmToken: string;
  /** 새로운 비밀번호 */
  newPassword: string;
  /** 새로운 비밀번호 확인 */
  newPasswordConfirm: string;
}
