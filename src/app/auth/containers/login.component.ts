import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../common/reducers';
import { loginInit, requestLogin } from '../actions/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  formGroup = this.fb.group({
    email: [
      '',
      {
        validators: [Validators.required, Validators.email],
      },
    ],
    password: ['', Validators.required],
  });

  isLoading$ = this.store.select(fromRoot.selectLoginIsLoading);
  errorMsg$ = this.store.select(fromRoot.selectLoginErrorMessage);

  onSubmit() {
    Object.values(this.formGroup.controls).forEach((control) =>
      control.markAsDirty(),
    );
    if (this.formGroup.invalid) {
      return;
    }
    this.store.dispatch(
      requestLogin({ payload: this.formGroup.value, returnUrl: '/user' }),
    );
  }

  ngOnInit(): void {
    this.store.dispatch(loginInit());
  }

  constructor(private fb: FormBuilder, private store: Store<fromRoot.State>) {}
}
