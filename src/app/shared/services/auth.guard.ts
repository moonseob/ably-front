import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthApiService } from 'src/app/auth/services/auth-api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.service
      .isLoggedIn()
      .pipe(
        map((loggedIn) =>
          loggedIn ? true : this.router.createUrlTree(['/login']),
        ),
      );
  }

  constructor(private service: AuthApiService, private router: Router) {}
}
