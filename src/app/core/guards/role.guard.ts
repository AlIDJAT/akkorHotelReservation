import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    // On récupère le rôle exigé depuis la config de la route
    const requiredRole = route.data['role']; // ex. 'ADMIN'
    // On récupère le rôle de l'utilisateur
    const userRole = this.authService.getUserRole();

    // Vérifier si le rôle de l'utilisateur correspond
    if (userRole === requiredRole) {
      return true;
    } else {
      // Si l'utilisateur n'a pas le bon rôle, on peut le rediriger
      this.router.navigate(['/dashboard']); // ou autre route
      return false;
    }
  }
}
