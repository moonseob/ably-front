import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-reset-form',
  templateUrl: './reset-form.component.html',
  styleUrls: ['./reset-form.component.scss'],
})
export class ResetFormComponent implements OnInit {
  @Output() req = new EventEmitter<string>();
  formGroup = this.fb.group({
    newPassword: ['', Validators.required],
    newPasswordConfirm: ['', Validators.required],
  });

  onSubmit() {
    if (this.formGroup.invalid) {
      return;
    }
    const { newPassword } = this.formGroup.value;
    this.req.emit(newPassword);
  }

  ngOnInit() {
    this.formGroup.controls.newPasswordConfirm.setAsyncValidators(({ value }) =>
      this.formGroup.controls.newPassword.valueChanges.pipe(
        map((change) =>
          change.toString() !== value.toString() ? { mismatch: true } : null,
        ),
      ),
    );
  }

  constructor(private fb: FormBuilder) {}
}
