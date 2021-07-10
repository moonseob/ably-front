import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import { requestLogin } from '../actions/auth.actions';

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
        validators: [
          Validators.required,
          // TODO: 이메일 형식 검사
        ],
      },
    ],
    password: ['', Validators.required],
  });

  isLoading$ = this.store.select(fromRoot.getLoginIsLoading);
  errorMsg$ = this.store.select(fromRoot.getLoginErrorMessage);

  onSubmit() {
    if (this.formGroup.invalid) {
      return;
    }
    this.store.dispatch(requestLogin({ body: this.formGroup.value }));
  }

  ngOnInit(): void {}

  constructor(private fb: FormBuilder, private store: Store<fromRoot.State>) {}
}
