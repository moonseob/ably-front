import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-request-code',
  templateUrl: './request-code.component.html',
  styleUrls: ['./request-code.component.scss'],
})
export class RequestCodeComponent {
  @Output() req = new EventEmitter<string>();
  formGroup = this.fb.group({
    email: ['', Validators.required],
  });

  onSubmit() {
    if (this.formGroup.invalid) {
      return;
    }
    const { email } = this.formGroup.value;
    this.req.emit(email);
  }

  constructor(private fb: FormBuilder) {}
}
