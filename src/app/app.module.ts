import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { importProvidersFrom } from '@angular/core';
import { CoreModule } from './core/core.module';

@NgModule({
  imports: [
    BrowserModule,
    CoreModule // ✅ Importation du CoreModule
  ],
})
export class AppModule {}

// 🚀 Démarrage de l'application avec bootstrapApplication
bootstrapApplication(AppComponent, {
  providers: [importProvidersFrom(AppModule)]
});
