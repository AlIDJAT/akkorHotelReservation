import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Angular Material modules nécessaires
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { of, throwError } from 'rxjs';

import { LoginComponent } from './login.component';
import { AuthService } from '../../../../core/services/auth.service';
import { Router } from '@angular/router';

describe('LoginComponent', () => {
  let fixture: ComponentFixture<LoginComponent>;
  let component: LoginComponent;

  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    // On crée des espions (mocks) pour AuthService, MatSnackBar, Router
    authServiceSpy = jasmine.createSpyObj<AuthService>('AuthService', ['login']);
    snackBarSpy = jasmine.createSpyObj<MatSnackBar>('MatSnackBar', ['open']);
    routerSpy = jasmine.createSpyObj<Router>('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatSnackBarModule
      ],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: MatSnackBar, useValue: snackBarSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should not call authService.login if form is invalid', () => {
    // Par défaut, email='' et password='', donc invalide
    component.onLogin();
    expect(authServiceSpy.login).not.toHaveBeenCalled();
    expect(component.isLoading).toBeFalse();
  });

  it('should login successfully and navigate to /dashboard', () => {
    // On simule une réponse de succès
    authServiceSpy.login.and.returnValue(of({ token: 'fake-token' }));

    // On rend le formulaire valide
    component.loginForm.setValue({ email: 'test@example.com', password: 'secret' });

    // On appelle la méthode
    component.onLogin();

    // Vérifier l’appel à authService.login
    expect(authServiceSpy.login).toHaveBeenCalledWith('test@example.com', 'secret');
    // Vérifier que le snackBar a un message de succès
    expect(snackBarSpy.open).toHaveBeenCalledWith('Login successful!', 'Close', { duration: 3000 });
    // L’indicateur de chargement doit repasser à false
    expect(component.isLoading).toBeFalse();
    // Vérifier la navigation
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('should show an error if login fails', () => {
    // On simule un login qui échoue
    authServiceSpy.login.and.returnValue(throwError(() => new Error('Bad credentials')));

    // Formulaire valide
    component.loginForm.setValue({ email: 'fail@example.com', password: 'wrong' });

    component.onLogin();

    // On s’attend à l’appel du service
    expect(authServiceSpy.login).toHaveBeenCalledWith('fail@example.com', 'wrong');
    // On s’attend à un snackBar d’erreur
    expect(snackBarSpy.open).toHaveBeenCalledWith('Invalid credentials', 'Close', { duration: 3000 });
    // Pas de navigation
    expect(routerSpy.navigate).not.toHaveBeenCalled();
    // L’indicateur de chargement doit repasser à false
    expect(component.isLoading).toBeFalse();
  });
});
