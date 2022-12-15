import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RecipeSearchComponent } from './recipe-search.component';
import { provideHttpClient } from '@angular/common/http';
import { MealCounterComponent } from './meal-counter';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mp-app',
  template: `
    <mp-meal-counter></mp-meal-counter>
    <hr />
    <mp-recipe-search></mp-recipe-search>
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
