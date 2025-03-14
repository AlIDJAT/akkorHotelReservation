import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();
    console.log(`[Interceptor] ${req.method} ${req.url} – Token ajouté: ${token}`);
    if (token) {
      // On clone la requête et on y ajoute le header Authorization
      console.log("Token ajouté à la requête:", token);
      const clonedReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return next.handle(clonedReq);
    } else {
      // Pas de token => on laisse la requête telle quelle
      return next.handle(req);
    }
  }
}
