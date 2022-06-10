import { RecipeSearchComponent } from './recipe-search.component';
import { Component } from '@angular/core';
import { MealPlannerComponent } from './meal-planner.component';
import { NowComponent } from './now.component';

@Component({
  standalone: true,
  selector: 'wm-app',
  imports: [MealPlannerComponent, NowComponent, RecipeSearchComponent],
  template: `
    <wm-now></wm-now>
    <h1>👨🏻‍🍳 Welcome to {{ title }}</h1>
    <wm-recipe-search></wm-recipe-search>
    <hr />
    <wm-meal-planner></wm-meal-planner>
  `,
})
export class AppComponent {
  title = 'whiskmate';
}
