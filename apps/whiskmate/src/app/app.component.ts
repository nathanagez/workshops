import { MealPlannerComponent } from './meal-planner.component';
import { Component } from '@angular/core';
import { CounterComponent } from './counter.component';

@Component({
  standalone: true,
  selector: 'wm-app',
  imports: [MealPlannerComponent],
  template: `
    <h1>👨🏻‍🍳 Welcome to {{ title }}</h1>
    <wm-meal-planner></wm-meal-planner>
  `,
})
export class AppComponent {
  title = 'whiskmate';
}
