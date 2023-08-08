import { bootstrapApplication } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { AppRoutingModule } from './app/app-routing.module';
import { FormsModule } from '@angular/forms';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(AppRoutingModule),
    importProvidersFrom(HttpClientModule),
    importProvidersFrom(FormsModule),
  ],
});
