import { enableProdMode, importProvidersFrom } from '@angular/core';


import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AppRoutingModule } from './app/app-routing.module';
import { AppComponent } from './app/app.component';
import { CoursesModule } from './app/courses/courses.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, AppRoutingModule, CoursesModule),
        provideHttpClient(withInterceptorsFromDi()),
        provideAnimations(), provideAnimationsAsync()
    ]
})
  .catch(err => console.error(err));
