import { CommonModule } from '@angular/common';
import { MealPlanner } from './meal-planner';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'wm-app',
  imports: [CommonModule, RouterModule],
  template: `
    <h1>👨🏻‍🍳 Welcome to {{ title }}</h1>
    <router-outlet></router-outlet>
    <footer>
      <hr />
      <ul>
        <li><a routerLink="">Recipe Search</a></li>
        <li>
          <a routerLink="/meals"
            >Meals ({{ mealPlanner.recipeCount$ | async }})</a
          >
        </li>
      </ul>
    </footer>
  `,
  styles: [
    `
      footer {
        position: absolute;
        bottom: 0;
        width: 100%;
      }
    `,
  ],
})
export class AppComponent {
  title = 'whiskmate';

  constructor(protected mealPlanner: MealPlanner) {}
}
