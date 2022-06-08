import { RecipePreviewComponent } from './recipe-preview.component';
import { MealPlanner } from './meal-planner';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { createRecipe } from './recipe';

@Component({
  standalone: true,
  selector: 'wm-meal-planner',
  imports: [CommonModule, RecipePreviewComponent],
  template: `
    <wm-recipe-preview
      *ngFor="let recipe of getRecipes(); let first = first; let last = last"
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
  mealPlanner = new MealPlanner();

  constructor() {
    this.mealPlanner.addRecipe(createRecipe({ id: 'burger', name: 'Burger' }));
    this.mealPlanner.addRecipe(createRecipe({ id: 'pizza', name: 'Pizza' }));
    this.mealPlanner.addRecipe(createRecipe({ id: 'salad', name: 'Salad' }));
  }

  getRecipes() {
    return this.mealPlanner.getRecipes();
  }

  moveUp(recipeId: string) {
    this.mealPlanner.moveUp(recipeId);
  }

  moveDown(recipeId: string) {
    this.mealPlanner.moveDown(recipeId);
  }

  remove(recipeId: string) {
    this.mealPlanner.removeRecipe(recipeId);
  }
}
