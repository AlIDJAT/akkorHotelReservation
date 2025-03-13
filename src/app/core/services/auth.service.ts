import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../../environements/environment';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'auth_token';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<{ token: string; role: string }> {
    return this.http.post<{ token: string; role: string }>(`${environment.apiBaseUrl}/auth/login`, { email, password }).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('role', response.role); // Stocker le rôle
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey); 
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
}