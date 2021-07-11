import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, pluck, shareReplay, switchMapTo } from 'rxjs/operators';
import { requestLogout } from 'src/app/auth/actions/auth.actions';
import { AuthApiService } from 'src/app/auth/services/auth-api.service';
import { loadUser } from 'src/app/user/actions/user.actions';
import * as fromRoot from '../../common/reducers';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  isLoggedIn$ = this.authService.isLoggedIn().pipe(shareReplay(1));
  userName$ = this.isLoggedIn$.pipe(
    filter((login) => login === true),
    switchMapTo(this.store.select(fromRoot.selectUserInfo).pipe(pluck('name'))),
    filter((name) => {
      if (name == null) {
        this.store.dispatch(loadUser());
      }
      return name !== null;
    }),
  );

  logout() {
    this.store.dispatch(requestLogout());
  }

  constructor(
    private store: Store<fromRoot.State>,
    private authService: AuthApiService,
  ) {}
}
