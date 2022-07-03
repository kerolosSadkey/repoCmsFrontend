import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
 { path: 'auth', loadChildren: () => import('./View/auth/auth.module').then(m => m.AuthModule) },
 { path: 'Dashboard', loadChildren: () => import('./View/dashboard/dashboard.module').then(m => m.DashboardModule) },
 { path: 'layout', loadChildren: () => import('./View/layout/layout.module').then(m => m.LayoutModule) }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
