import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RequestCodeComponent } from './components/request-code.component';
import { ResetFormComponent } from './components/reset-form.component';
import { ValidateCodeComponent } from './components/validate-code.component';
import { ResetComponent } from './containers/reset.component';

@NgModule({
  declarations: [
    ResetComponent,
    RequestCodeComponent,
    ValidateCodeComponent,
    ResetFormComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'exact',
        component: ResetComponent,
      },
    ]),
  ],
})
export class ResetModule {}
