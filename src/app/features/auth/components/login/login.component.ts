import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

// Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  // On importe ici tout ce dont le composant a besoin
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  isLoading = false;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  onLogin() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      const { email, password } = this.loginForm.value;

      this.authService.login(email!, password!).subscribe({
        next: (res) => {
          this.isLoading = false;
          this.snackBar.open('Login successful!', 'Close', { duration: 3000 });
          this.router.navigate(['/dashboard']); // Redirection après connexion
        },
        error: () => {
          this.isLoading = false;
          this.snackBar.open('Invalid credentials', 'Close', { duration: 3000 });
        }
      });
    }
  }
}
