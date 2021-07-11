import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { pluck } from 'rxjs/operators';
import { requestLogout } from 'src/app/auth/actions/auth.actions';
import { AuthApiService } from 'src/app/auth/services/auth-api.service';
import * as fromRoot from '../../common/reducers';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
    `
      :host {
        display: block;
        height: 100%;
      }
    `,
  ],
})
export class HomeComponent {
  isLoggedIn$ = this.authService.isLoggedIn();
  isLogoutLoading$ = this.store.select(fromRoot.selectLogoutIsLoading);
  userName$ = this.store.select(fromRoot.selectUserInfo).pipe(pluck('name'));

  logout() {
    this.store.dispatch(requestLogout({ returnUrl: '/' }));
  }

  constructor(
    private store: Store<fromRoot.State>,
    private authService: AuthApiService,
  ) {}
}
