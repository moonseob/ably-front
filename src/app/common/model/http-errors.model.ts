import { HttpErrorResponse } from '@angular/common/http';

export interface AblyErrorResponse extends HttpErrorResponse {
  error: {
    error?: {
      message: AblyErrorMessage;
    };
  };
}

export type AblyErrorMessage = '알 수 없는 에러가 발생했어요.' | string;

export function handleError(err: AblyErrorResponse): AblyErrorMessage {
  return err?.error?.error?.message || '알 수 없는 에러가 발생했어요.';
}
