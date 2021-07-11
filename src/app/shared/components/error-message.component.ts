import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error-message',
  template: `
    <p *ngIf="message" class="error-message">
      <span class="color-error fa error">에러가 발생했습니다:</span><br />
      <span>{{ message }}</span>
    </p>
  `,
  styles: [
    `
      :host {
        display: block;
        margin-top: auto;
      }
      p.error-message {
        font-size: 0.9em;
        margin-top: 2em;
        margin-bottom: 0;
        color: black;
        background-color: white;
        border: 1px solid var(--error);
        box-sizing: border-box;
        min-height: 2.5em;
        line-height: 1.5em;
        padding: 0.5em 1em;
      }
    `,
  ],
})
export class ErrorMessageComponent {
  @Input() message!: string;

  constructor() {}
}
