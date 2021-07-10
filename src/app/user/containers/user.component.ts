import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { requestLogout } from 'src/app/auth/actions/auth.actions';
import * as fromRoot from '../../common/reducers';
import { loadUser } from '../actions/user.actions';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent {
  user$ = this.store.select(fromRoot.selectUserInfo).pipe(
    tap((userInfo) => {
      if (userInfo == null) {
        this.store.dispatch(loadUser());
      }
    }),
  );
  isLoading$ = this.store.select(fromRoot.selectUserIsLoading);
  errorMessage$ = this.store.select(fromRoot.selectUserErrorMessage);

  logout() {
    this.store.dispatch(requestLogout());
  }

  constructor(private store: Store<fromRoot.State>) {}
}
