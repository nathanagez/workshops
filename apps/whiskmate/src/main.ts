import { HttpClientModule } from '@angular/common/http';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { Route, RouterModule } from '@angular/router';
import { AppComponent } from './app/app.component';
import { MealPlannerComponent } from './app/meal-planner.component';
import { RecipeSearchComponent } from './app/recipe-search.component';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

const appRoutes: Route[] = [
  {
    path: '',
    component: RecipeSearchComponent,
  },
  {
    path: 'meals',
    component: MealPlannerComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(HttpClientModule),
    importProvidersFrom(RouterModule.forRoot(appRoutes)),
  ],
}).catch((err) => console.error(err));
