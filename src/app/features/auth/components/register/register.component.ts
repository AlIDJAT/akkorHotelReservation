import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User, UserService } from '../../../../core/services/user.service';

// Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    pseudo: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  onRegister() {
    if (this.registerForm.valid) {
      const newUser: User = {
        email: this.registerForm.value.email!,
        pseudo: this.registerForm.value.pseudo!,
        password: this.registerForm.value.password!,
        role: 'USER'
      };

      this.userService.createUser(newUser).subscribe({
        next: () => {
          this.snackBar.open('User created successfully!', 'Close', { duration: 3000 });
          this.router.navigate(['/login']);
        },
        error: err => {
          this.snackBar.open('Error creating user', 'Close', { duration: 3000 });
          console.error(err);
        }
      });
    }
  }
}
