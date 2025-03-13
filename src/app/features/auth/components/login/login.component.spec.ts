import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../../../../core/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Modules Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { of } from 'rxjs';

describe('LoginComponent', () => {
  let fixture: ComponentFixture<LoginComponent>;
  let component: LoginComponent;

  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj<AuthService>('AuthService', ['login']);
    snackBarSpy = jasmine.createSpyObj<MatSnackBar>('MatSnackBar', ['open']);

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        ReactiveFormsModule,
        BrowserAnimationsModule,   // souvent requis par Angular Material
        MatCardModule,             // pour <mat-card>
        MatFormFieldModule,        // pour <mat-form-field>
        MatInputModule,            // pour matInput
        MatButtonModule            // pour <button mat-button> ou mat-raised-button
      ],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: MatSnackBar, useValue: snackBarSpy }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Initialise la vue
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should login successfully', () => {
    // On simule une réponse OK
    authServiceSpy.login.and.returnValue(of({ token: 'fake-token' }));

    // On remplit le formulaire
    component.loginForm.setValue({
      email: 'test@example.com',
      password: 'secret'
    });

    // On déclenche la méthode
    component.onLogin();

    // Vérifier que le service est appelé
    expect(authServiceSpy.login).toHaveBeenCalledWith('test@example.com', 'secret');

    // Vérifier qu'un message de succès est affiché
    expect(snackBarSpy.open).toHaveBeenCalledWith('Login successful!', 'Close', { duration: 3000 });
  });
});
