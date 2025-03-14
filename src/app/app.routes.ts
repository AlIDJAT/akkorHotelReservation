import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { AuthComponent } from './features/auth/components/auth/auth.component';
import { HotelListComponent } from './features/hotel/hotel-list/hotel-list.component';
import { HotelFormComponent } from './features/hotel/hotel-form/hotel-form.component';
import { AuthGuard } from './core/guards/auth.guard';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { RoleGuard } from './core/guards/role.guard';
import { UserFormComponent } from './features/user/user-form/user-form.component';
import { UserListComponent } from './features/user/user-list/user-list.component';

export const routes: Routes = [
  // Page d'authentification accessible sans être connecté
  { path: 'auth', component: AuthComponent },

  // Tout le reste est protégé par AuthGuard et s'affiche via le layout principal
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard], // l'utilisateur doit être connecté
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'hotels', component: HotelListComponent },
      // Route pour créer un nouvel hôtel (admin uniquement)
      {
        path: 'hotels/new',
        component: HotelFormComponent,
        canActivate: [RoleGuard],
        data: { role: 'ADMIN' }
      },
      // Route pour éditer un hôtel existant (admin uniquement)
      {
        path: 'hotels/:id/edit',
        component: HotelFormComponent,
        canActivate: [RoleGuard],
        data: { role: 'ADMIN' }
      },
      // Route pour consulter la liste des utilisateurs (admin uniquement)
      {
        path: 'users',
        component: UserListComponent,
        canActivate: [RoleGuard],
        data: { role: 'ADMIN' }
      },
      // Routes pour créer/éditer un utilisateur (optionnel, admin uniquement)
      {
        path: 'users/new',
        component: UserFormComponent,
        canActivate: [RoleGuard],
        data: { role: 'ADMIN' }
      },
      {
        path: 'users/:id/edit',
        component: UserFormComponent,
        canActivate: [RoleGuard],
        data: { role: 'ADMIN' }
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
