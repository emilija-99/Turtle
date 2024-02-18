import { ApplicationConfig, NgModule } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { NgModel } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration()],

};
