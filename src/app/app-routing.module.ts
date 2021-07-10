import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: async () => (await import('./auth/auth.module')).AuthModule,
  },
  {
    path: 'user',
    loadChildren: async () => (await import('./user/user.module')).UserModule,
  },
  {
    path: 'reset',
    loadChildren: async () =>
      (await import('./reset/reset.module')).ResetModule,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
