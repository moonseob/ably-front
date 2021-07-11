import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { BehaviorSubject, interval, Observable, of, Subject } from 'rxjs';
import { map, startWith, takeWhile } from 'rxjs/operators';
import { removeStoredToken } from 'src/app/auth/actions/auth.actions';
import {
  AblyErrorMessage,
  handleError,
} from 'src/app/shared/model/http-errors.model';
import * as fromRoot from '../../common/reducers';
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
export class ResetComponent implements OnInit, OnDestroy {
  ngSubscribe$ = new Subject();
  isLoading$ = new BehaviorSubject<boolean>(false);

  /** 사용자 화면의 진행 상태 */
  step = ResetStep.RequestCode;
  errorMessage!: AblyErrorMessage | null;

  /** 인증 코드 발급 요청 토큰 */
  issueToken!: ResetIssueToken['issueToken'];
  /** 인증 코드 만료 시각 */
  expiresAt!: Date;

  // Form Controls
  emailFormGroup = this.fb.group({
    email: [
      '',
      {
        validators: [Validators.required, Validators.email],
      },
    ],
  });
  validationCodeFormGroup = this.fb.group({
    code: [
      '',
      {
        validators: [Validators.required, Validators.pattern(/\d{6}/)],
      },
    ],
  });
  resetFormGroup = this.fb.group({
    newPassword: ['', Validators.required],
    newPasswordConfirm: [''], // add validator at onInit()
  });

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

  onNext() {
    this.isLoading$.next(true);
    this.errorMessage = null;
    switch (this.step) {
      case ResetStep.RequestCode: {
        const fc = this.emailFormGroup.controls.email;
        fc.markAsDirty();
        if (fc.invalid) {
          this.isLoading$.next(false);
          return;
        }
        this.requestCode(fc.value);
        break;
      }
      case ResetStep.ValidateCode: {
        const fc = this.validationCodeFormGroup.controls.code;
        fc.markAsDirty();
        if (fc.invalid) {
          this.isLoading$.next(false);
          return;
        }
        this.validateCode(fc.value);
        break;
      }
      case ResetStep.ResetForm: {
        const fg = this.resetFormGroup;
        Object.values(fg.controls).forEach((fc) => fc.markAsDirty());
        if (fg.invalid) {
          this.isLoading$.next(false);
          return;
        }
        this.updatePassword(fg.controls.newPassword.value);
        break;
      }
    }
  }

  requestCode(email: string) {
    this.service.reqeustResetCode(email).subscribe({
      next: (res) => {
        this.issueToken = res.issueToken;
        this.timer$ = this.getTimer(res.remainMillisecond);
        this.step++;
        this.isLoading$.next(false);
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorMessage = handleError(err);
        this.isLoading$.next(false);
        this.cdr.detectChanges();
      },
    });
  }

  validateCode(authCode: ResetCodeValidatationPayload['authCode']) {
    const payload = {
      authCode,
      email: this.emailFormGroup.value.email,
      issueToken: this.issueToken,
    };
    this.service.validateResetCode(payload).subscribe({
      next: (res) => {
        this.timer$ = of(null);
        this.confirmToken = res.confirmToken;
        this.step++;
        this.isLoading$.next(false);
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorMessage = handleError(err);
        this.isLoading$.next(false);
        this.cdr.detectChanges();
      },
    });
  }

  updatePassword(newPassword: ResetPayload['newPassword']) {
    const payload = {
      email: this.emailFormGroup.value.email,
      confirmToken: this.confirmToken,
      newPassword,
      newPasswordConfirm: newPassword,
    };
    this.service.requestReset(payload).subscribe({
      next: (res) => {
        this.store.dispatch(removeStoredToken());
        this.step++;
        this.isLoading$.next(false);
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorMessage = handleError(err);
        this.isLoading$.next(false);
        this.cdr.detectChanges();
      },
    });
  }

  ngOnInit(): void {
    // 비밀번호 확인 필드에 일치하는지 여부 확인 validator 추가
    const { newPassword, newPasswordConfirm } = this.resetFormGroup.controls;
    newPasswordConfirm.setValidators([
      ({ value }) =>
        value.toString() !== newPassword.value.toString()
          ? { mismatch: true }
          : null,
    ]);
    newPassword.valueChanges.subscribe(() =>
      newPasswordConfirm.updateValueAndValidity(),
    );

    this.cdr.detectChanges();
  }

  ngOnDestroy() {
    this.ngSubscribe$.next();
    this.ngSubscribe$.complete();
  }

  constructor(
    private store: Store<fromRoot.State>,
    private service: ResetApiService,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
  ) {}
}
