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

  constructor(private _mealPlanner: MealPlanner) {
    this._mealPlanner.addRecipe(
      createRecipe({
        id: 'burger',
        name: 'Burger',
        pictureUri:
          'https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/102cf51c-9220-4278-8b63-2b9611ad275e/Derivates/3831dbe2-352e-4409-a2e2-fc87d11cab0a.jpg',
      })
    );
    this._mealPlanner.addRecipe(
      createRecipe({
        id: 'pizza',
        name: 'Pizza',
        pictureUri:
          'https://assets.afcdn.com/recipe/20200206/107152_w1024h1024c1cx176cy267cxb353cyb535.jpg',
      })
    );
    this._mealPlanner.addRecipe(
      createRecipe({
        id: 'salad',
        name: 'Salad',
        pictureUri:
          'https://cdn.loveandlemons.com/wp-content/uploads/2019/07/salad.jpg',
      })
    );
  }

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
