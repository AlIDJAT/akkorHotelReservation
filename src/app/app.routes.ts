import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { AuthComponent } from './features/auth/components/auth/auth.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'auth', component: AuthComponent },
  { path: 'dashboard', component: DashboardComponent },
  // ...
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
