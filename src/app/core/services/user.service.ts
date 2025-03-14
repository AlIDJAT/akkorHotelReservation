import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environements/environment';
import { Observable } from 'rxjs';

// Exemple d'interface pour un utilisateur
export interface User {
  id?: number;
  email: string;
  pseudo: string;
  password?: string;
  role?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = `${environment.apiBaseUrl}/users`;

  constructor(private http: HttpClient) {}

  // POST /users
  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.baseUrl, user);
  }

  // GET /users/{id}
  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${id}`);
  }

  // PUT /users/{id}
  updateUser(id: number, user: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/${id}`, user);
  }

  // DELETE /users/{id}
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  // GET /users - liste des utilisateurs
  listUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl);
  }
}
