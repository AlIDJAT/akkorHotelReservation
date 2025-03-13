import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../core/services/auth.service';
import { UserService } from '../../../../core/services/user.service';

@Component({
  selector: 'app-auth',
  standalone: true, // si vous voulez en faire un composant standalone
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  // Indice de l'onglet sélectionné: 0=login, 1=register
  selectedTabIndex = 0;

  // Formulaire login
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  // Formulaire register
  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    pseudo: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  onLogin() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email!, password!).subscribe({
        next: () => {
          this.snackBar.open('Login successful!', 'Close', { duration: 3000 });
          this.router.navigate(['/dashboard']);
        },
        error: () => {
          this.snackBar.open('Invalid credentials', 'Close', { duration: 3000 });
        }
      });
    }
  }

  onRegister() {
    if (this.registerForm.valid) {
      const newUser = {
        email: this.registerForm.value.email!,
        pseudo: this.registerForm.value.pseudo!,
        password: this.registerForm.value.password!,
        role: 'USER'
      };
      this.userService.createUser(newUser).subscribe({
        next: () => {
          this.snackBar.open('User created successfully!', 'Close', { duration: 3000 });
          // Après la création, on peut basculer vers l'onglet "Login"
          this.selectedTabIndex = 0;
        },
        error: () => {
          this.snackBar.open('Error creating user', 'Close', { duration: 3000 });
        }
      });
    }
  }
}
