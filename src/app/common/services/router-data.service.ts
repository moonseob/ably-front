import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RouterDataService {
  private url$ = new BehaviorSubject<string>('');
  public getCurrentUrl(): Observable<string> {
    return this.url$.pipe(map((url) => url ?? ''));
  }

  constructor(private router: Router) {
    this.router.events
      .pipe(
        filter((e) => e instanceof NavigationEnd),
        map((e) => e as NavigationEnd),
      )
      .subscribe({
        next: (e) => {
          if (e instanceof NavigationEnd) {
            this.url$.next(e.urlAfterRedirects);
          }
        },
      });
  }
}
