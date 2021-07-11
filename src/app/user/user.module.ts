import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../shared/services/auth.guard';
import { UserComponent } from './containers/user.component';

@NgModule({
  declarations: [UserComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: UserComponent,
        canActivate: [AuthGuard],
      },
    ]),
  ],
})
export class UserModule {}
