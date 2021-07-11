import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ErrorMessageComponent } from './components/error-message.component';
import { FormcontrolErrorMessageComponent } from './components/formcontrol-error-message.component';

@NgModule({
  declarations: [ErrorMessageComponent, FormcontrolErrorMessageComponent],
  imports: [CommonModule],
  exports: [ErrorMessageComponent, FormcontrolErrorMessageComponent],
})
export class SharedModule {}
