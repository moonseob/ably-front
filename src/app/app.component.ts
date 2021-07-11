import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import * as fromRoot from './common/reducers';
import { RouterDataService } from './common/services/router-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  /** 현재 표시중인게 홈 화면인지 여부 */
  isAtHome$ = this.rdService.getCurrentUrl().pipe(map((url) => url === '/'));

  // SPA 특성상 enter 입력으로 인한 submit 시에도 blur되지 않는 문제를 해결
  @HostListener('keydown.enter', ['$event.target']) onEnterPressed(
    target: EventTarget,
  ) {
    if (target instanceof HTMLInputElement) {
      target.blur();
    }
  }

  ngOnInit() {}

  constructor(
    private rdService: RouterDataService,
    private store: Store<fromRoot.State>,
  ) {}
}
