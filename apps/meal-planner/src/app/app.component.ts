import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RecipeSearchComponent } from './recipe-search.component';
import { provideHttpClient } from '@angular/common/http';
import { MealCounterComponent } from './meal-counter.component';
import { RecipeRepository } from './recipe-repository.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mp-app',
  template: `
    <mp-meal-counter></mp-meal-counter>
    <hr />
    <mp-recipe-search></mp-recipe-search>
    <hr />

    <mp-meal-counter></mp-meal-counter>
  `,
})
export class AppComponent {}

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, RecipeSearchComponent, MealCounterComponent],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
