import { Injectable, signal } from '@angular/core';
import { Recipe } from './recipe';

@Injectable({
  providedIn: 'root',
})
export class Cart {
  count = () => this._recipes().length;

  private _recipes = signal<Recipe[]>([]);

  addRecipe(recipe: Recipe) {
    this._recipes.update((recipes) => [...recipes, recipe]);
  }

  canAddRecipe(recipe: Recipe) {
    return !this._recipes().includes(recipe);
  }
}
