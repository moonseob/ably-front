import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { LoginComponent } from './containers/login.component';
import { AuthEffects } from './effects/auth.effects';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'exact',
        component: LoginComponent,
      },
    ]),
    EffectsModule.forFeature([AuthEffects]),
  ],
})
export class AuthModule {}
