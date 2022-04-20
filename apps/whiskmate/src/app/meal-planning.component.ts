import { Recipe } from './recipe';
import { Component } from '@angular/core';

@Component({
  selector: 'wm-meal-planning',
  template: `<h1>Meal Planning</h1>
    <button *ngIf="canUndo()" (click)="undo()">UNDO</button>
    <ul>
      <li *ngFor="let recipe of recipes; let first = first; let last = last">
        <span>{{ recipe.name }}</span>
        <button [disabled]="first" (click)="moveUp(recipe)">⬆️</button>
        <button [disabled]="last">⬇️</button>
        <button (click)="removeRecipe(recipe)">DELETE</button>
      </li>
    </ul> `,
})
export class MealPlanningComponent {
  recipes: Recipe[] = [
    {
      id: 'burger',
      name: 'Burger',
      ingredients: [
        {
          name: 'Cheese',
          quantity: 50,
          unit: 'g',
        },
        {
          name: 'Meat',
          quantity: 100,
          unit: 'g',
        },
        {
          name: 'Bread',
          quantity: 100,
          unit: 'g',
        },
      ],
      steps: ['Put the meat in the pan', '...'],
    },
    {
      id: 'pizza',
      name: 'Pizza',
      ingredients: [
        {
          name: 'Dough',
          quantity: 200,
          unit: 'g',
        },
        {
          name: 'Tomatoes',
          quantity: 50,
          unit: 'g',
        },
      ],
      steps: ['...'],
    },
    {
      id: 'salad',
      name: 'Salad',
      ingredients: [
        {
          name: 'Tomatoes',
          quantity: 50,
          unit: 'g',
        },
      ],
      steps: ['Mix everything'],
    },
  ];

  private _history: Recipe[][] = [];

  moveUp(recipe: Recipe) {
    const index = this.recipes.indexOf(recipe);
    const previousRecipes = this.recipes.slice(0, index - 1);
    const nextRecipes = this.recipes.slice(index + 1);
    const previousRecipe = this.recipes[index - 1];
    const recipes = [
      ...previousRecipes,
      recipe,
      previousRecipe,
      ...nextRecipes,
    ];
    this._updateRecipes(recipes);
  }

  removeRecipe(recipe: Recipe) {
    const recipes = this.recipes.filter((_recipe) => _recipe !== recipe);
    this._updateRecipes(recipes);
  }

  canUndo() {
    return this._history.length > 0;
  }

  undo() {
    if (this._history.length === 0) {
      return;
    }
    const [lastRecipes, ...history] = this._history;
    this.recipes = lastRecipes;
    this._history = history;
  }

  private _updateRecipes(recipes: Recipe[]) {
    this._history = [this.recipes, ...this._history];
    this.recipes = recipes;
  }
}
