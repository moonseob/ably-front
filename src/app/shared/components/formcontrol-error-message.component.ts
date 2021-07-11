import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-formcontrol-error-message',
  template: `
    <ng-container *ngIf="fc.invalid && fc.dirty">
      <span class="color-error form-error" *ngIf="fc.hasError('email')"
        >올바른 형식의 이메일을 입력해주세요.</span
      >
      <span class="color-error form-error" *ngIf="fc.hasError('pattern')"
        >올바른 형식의 인증 코드를 입력해주세요.</span
      >
      <span class="color-error form-error" *ngIf="fc.hasError('required')"
        >필수 항목입니다.</span
      >
      <span class="color-error form-error" *ngIf="fc.hasError('mismatch')"
        >두 비밀번호가 서로 달라요.</span
      >
    </ng-container>
  `,
  styles: [
    `
      :host {
        font-size: 0.8em;
      }
      span {
        display: block;
        padding-top: 0.2em;
      }
    `,
  ],
})
export class FormcontrolErrorMessageComponent {
  @Input() fc!: AbstractControl;

  constructor() {}
}
