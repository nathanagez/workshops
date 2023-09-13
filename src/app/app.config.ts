import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, Routes } from '@angular/router';
import { RecipeSearchComponent } from './recipe-search.component';
import { RecipeCarouselComponent } from './recipe-carousel.component';

const routes: Routes = [
  {
    path: 'carousel',
    component: RecipeCarouselComponent,
  },
  {
    path: 'search',
    component: RecipeSearchComponent,
  },
  {
    path: '**',
    redirectTo: 'search',
  },
];

export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(), provideRouter(routes)],
};
