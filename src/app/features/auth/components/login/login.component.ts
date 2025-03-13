import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  isLoading = false;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  constructor(private authService: AuthService, private snackBar: MatSnackBar) {}

  onLogin() {
    if (this.loginForm.valid) {
      this.isLoading = true; // Désactiver le bouton pendant la requête
      const { email, password } = this.loginForm.value;
      
      this.authService.login(email!, password!).subscribe({
        next: (res) => {
          console.log('Login successful', res);
          this.snackBar.open('Login successful!', 'Close', { duration: 3000 });
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Login failed', err);
          this.snackBar.open('Invalid credentials', 'Close', { duration: 3000 });
          this.isLoading = false;
        },
      });
    }
  }
}
