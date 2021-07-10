export interface LoginRequestPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  /** JWT 인증 토큰 */
  accessToken: string;
}

export interface LogoutResponse {
  /** 마지막 접속 일자, Date */
  lastConntedAt: string;
}
