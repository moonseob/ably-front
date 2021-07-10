import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { interval, Observable, of } from 'rxjs';
import { map, startWith, takeWhile } from 'rxjs/operators';
import {
  AblyErrorMessage,
  handleError,
} from 'src/app/common/model/http-errors.model';
import {
  ResetCodeValidatationPayload,
  ResetIssueToken,
  ResetPayload,
} from '../models/reset.models';
import { ResetApiService } from '../services/reset-api.service';

enum ResetStep {
  RequestCode = 1,
  ValidateCode = 2,
  ResetForm = 3,
  Complete = 4,
}

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class ResetComponent implements OnInit {
  /** 사용자 화면의 진행 상태 */
  step = ResetStep.RequestCode;
  errorMessage!: AblyErrorMessage;

  /** 인증 코드 발급 요청 토큰 */
  issueToken!: ResetIssueToken['issueToken'];
  /** 인증 코드 만료 시각 */
  expiresAt!: Date;

  email!: string;
  timer$!: Observable<{
    min: number;
    sec: number;
  } | null>;

  confirmToken!: string;

  // private setExpireDate(remaining: string | number) {
  //   const now = Date.now(); // 실행 시각을 milisecond로 변환
  //   if (typeof remaining === 'string') {
  //     remaining = parseInt(remaining);
  //   }
  //   this.expiresAt = new Date(now + remaining);
  // }

  private getTimer(duration: number, disableMargin = false) {
    if (duration > 1000 && !disableMargin) {
      // 세션이 서버측에서 먼저 만료될 수 있기 때문에 여유 시간을 둠
      duration -= 1000;
    }
    if (duration <= 0) {
      return of({
        min: 0,
        sec: 0,
      });
    }
    // 500ms 마다 갱신하여 2배의 정밀도를 갖게 함
    const precision: number = 500;
    return interval(precision).pipe(
      startWith(0),
      map((i) => duration - precision * (i + 1)),
      takeWhile((remaining) => remaining >= 0),
      map((ms) => {
        const s = Math.floor(ms / 1000);
        return {
          min: Math.floor(s / 60),
          sec: Math.floor(s % 60),
        };
      }),
    );
  }

  requestCode(email: string) {
    this.service.reqeustResetCode(email).subscribe({
      next: (res) => {
        this.issueToken = res.issueToken;
        this.timer$ = this.getTimer(res.remainMillisecond);
        this.email = email;
        this.step++;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorMessage = handleError(err);
        this.cdr.detectChanges();
      },
    });
  }

  validateCode(authCode: ResetCodeValidatationPayload['authCode']) {
    const payload = {
      authCode,
      email: this.email,
      issueToken: this.issueToken,
    };
    this.service.validateResetCode(payload).subscribe({
      next: (res) => {
        this.timer$ = of(null);
        this.confirmToken = res.confirmToken;
        this.step++;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorMessage = handleError(err);
        this.cdr.detectChanges();
      },
    });
  }

  updatePassword(newPassword: ResetPayload['newPassword']) {
    const payload = {
      email: this.email,
      confirmToken: this.confirmToken,
      newPassword,
      newPasswordConfirm: newPassword,
    };
    this.service.requestReset(payload).subscribe({
      next: (res) => {
        this.step++;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorMessage = handleError(err);
        this.cdr.detectChanges();
      },
    });
  }

  ngOnInit(): void {
    this.cdr.detectChanges();
  }

  constructor(
    private service: ResetApiService,
    private cdr: ChangeDetectorRef,
  ) {}
}
