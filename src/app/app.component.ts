import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
} from '@angular/core';
import { map } from 'rxjs/operators';
import { RouterDataService } from './common/services/router-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  /** 현재 표시중인게 홈 화면인지 여부 */
  isAtHome$ = this.rdService.getCurrentUrl().pipe(map((url) => url === '/'));

  @HostListener('keydown.enter', ['$event.target']) onEnterPressed(
    target: EventTarget,
  ) {
    if (target instanceof HTMLInputElement) {
      // SPA 특성상 enter 입력으로 인한 submit 시에도 blur되지 않는 문제를 해결
      setTimeout(() => target.blur(), 0);
    }
  }

  constructor(private rdService: RouterDataService) {}
}
