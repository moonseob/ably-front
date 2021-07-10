import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ResetCodeValidatationPayload } from '../models/reset.models';

@Component({
  selector: 'app-validate-code',
  templateUrl: './validate-code.component.html',
  styleUrls: ['./validate-code.component.scss'],
})
export class ValidateCodeComponent {
  @Output() req = new EventEmitter<ResetCodeValidatationPayload['authCode']>();
  formGroup = this.fb.group({
    authCode: ['', Validators.required],
  });

  onSubmit() {
    if (this.formGroup.invalid) {
      return;
    }
    this.req.emit(this.formGroup.value.authCode);
  }

  constructor(private fb: FormBuilder) {}
}
