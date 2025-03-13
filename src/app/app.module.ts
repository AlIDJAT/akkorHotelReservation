import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { AuthService } from './core/services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule, MatCardTitle } from '@angular/material/card';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { AuthModule } from './features/auth/auth.module';

@NgModule({
  declarations: [
    AppComponent,
    // ...
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AuthModule
   
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
