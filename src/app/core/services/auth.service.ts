import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../../environements/environment';
import { tap } from 'rxjs';

export interface LoginResponse {
  token: string;
  role: string;
  pseudo: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'token';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.apiBaseUrl}/auth/login`, { email, password }).pipe(
      tap(response => {
        console.log("Role reçu:", response.role);
        localStorage.setItem(this.tokenKey, response.token);
        localStorage.setItem('role', response.role);       // Stocker le rôle
        localStorage.setItem('pseudo', response.pseudo);     // Stocker le pseudo
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem('role');
    localStorage.removeItem('pseudo');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getUserRole(): string | null {
    return localStorage.getItem('role');
  }

  isAdmin(): boolean {
    return this.getUserRole() === 'ADMIN';
  }

  getUserPseudo(): string | null {
    return localStorage.getItem('pseudo');
  }
}
