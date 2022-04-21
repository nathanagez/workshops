import { HttpClientModule } from '@angular/common/http';
import { Component, NgModule, ChangeDetectionStrategy } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MealPlanningModule } from './meal-planning.component';
import { RecipeSearchModule } from './recipe-search.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'wm-root',
  template: `
    <wm-recipe-search></wm-recipe-search>
    <hr />
    <wm-meal-planning></wm-meal-planning>
  `,
})
export class AppComponent {}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    MealPlanningModule,
    RecipeSearchModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
