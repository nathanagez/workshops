import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MealPlanner } from './meal-planner';
import { createRecipe } from './recipe';
import { RecipePreviewComponent } from './recipe-preview.component';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'wm-meal-planner',
  imports: [CommonModule, RecipePreviewComponent],
  template: `
    <wm-recipe-preview
      *ngFor="
        let recipe of recipes$ | async;
        let first = first;
        let last = last
      "
      [recipe]="recipe"
    >
      <button type="button" [disabled]="first" (click)="moveUp(recipe.id)">
        ⬆️
      </button>
      <button type="button" [disabled]="last" (click)="moveDown(recipe.id)">
        ⬇️
      </button>
      <button type="button" (click)="remove(recipe.id)">🗑</button>
    </wm-recipe-preview>
  `,
})
export class MealPlannerComponent {
  recipes$ = this._mealPlanner.recipes$;

  constructor(private _mealPlanner: MealPlanner) {}

  moveUp(recipeId: string) {
    this._mealPlanner.moveUp(recipeId);
  }

  moveDown(recipeId: string) {
    this._mealPlanner.moveDown(recipeId);
  }

  remove(recipeId: string) {
    this._mealPlanner.removeRecipe(recipeId);
  }
}
