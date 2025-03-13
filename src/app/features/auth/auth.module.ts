import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// 📌 Import des modules Angular Material
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule, MatCardTitle } from '@angular/material/card';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';


@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
  ]
})
export class AuthModule { }
