export interface LoginRequestBody {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string; // JWT 인증 토큰
}
