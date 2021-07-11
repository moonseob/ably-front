import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { requestLogout } from 'src/app/auth/actions/auth.actions';
import * as fromRoot from '../../common/reducers';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent {
  user$ = this.store.select(fromRoot.selectUserInfo);
  isLoading$ = this.store.select(fromRoot.selectUserIsLoading);
  isLogoutLoading$ = this.store.select(fromRoot.selectLogoutIsLoading);
  errorMessage$ = this.store.select(fromRoot.selectUserErrorMessage);

  logout() {
    this.store.dispatch(requestLogout({ returnUrl: '/' }));
  }

  constructor(private store: Store<fromRoot.State>) {}
}
