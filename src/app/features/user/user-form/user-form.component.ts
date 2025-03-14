import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { User, UserService } from '../../../core/services/user.service';


@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatSnackBarModule
  ],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  userForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    pseudo: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    role: new FormControl('USER', Validators.required)
  });
  userId: number | null = null;
  isEditMode = false;
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    // Si un id est présent et différent de 'new', on est en mode édition
    if (idParam && idParam !== 'new') {
      this.userId = Number(idParam);
      this.isEditMode = true;
      this.loadUser(this.userId);
    }
  }

  loadUser(id: number): void {
    this.isLoading = true;
    this.userService.getUser(id).subscribe({
      next: (user: User) => {
        // Pour des raisons de sécurité, le mot de passe n'est pas renvoyé
        // On laisse le champ password vide pour permettre à l'admin de le modifier s'il le souhaite
        this.userForm.setValue({
          email: user.email,
          pseudo: user.pseudo,
          password: '',
          role: user.role || 'USER'
        });
        this.isLoading = false;
      },
      error: err => {
        console.error('Error loading user', err);
        this.isLoading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const user: User = {
        email: this.userForm.value.email!,
        pseudo: this.userForm.value.pseudo!,
        password: this.userForm.value.password!,
        role: this.userForm.value.role!
      };

      if (this.isEditMode && this.userId) {
        // Mise à jour : PUT /users/:id
        this.userService.updateUser(this.userId, user).subscribe({
          next: updatedUser => {
            this.snackBar.open('User updated successfully!', 'Close', { duration: 3000 });
            this.router.navigate(['/users']);
          },
          error: err => {
            console.error('Error updating user', err);
            this.snackBar.open('Error updating user', 'Close', { duration: 3000 });
          }
        });
      } else {
        // Création : POST /users
        this.userService.createUser(user).subscribe({
          next: createdUser => {
            this.snackBar.open('User created successfully!', 'Close', { duration: 3000 });
            this.router.navigate(['/users']);
          },
          error: err => {
            console.error('Error creating user', err);
            this.snackBar.open('Error creating user', 'Close', { duration: 3000 });
          }
        });
      }
    }
  }
}
