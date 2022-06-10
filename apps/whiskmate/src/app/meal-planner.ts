import { Injectable } from '@angular/core';
import { Recipe } from './recipe';

@Injectable({
  providedIn: 'root',
})
export class MealPlanner {
  private _recipes: Recipe[] = [];

  addRecipe(recipe: Recipe) {
    if (this._contains(recipe)) {
      throw new Error('Duplicate recipe error.');
    }

    this._recipes = [...this._recipes, recipe];
  }

  getRecipes(): Recipe[] {
    return this._recipes;
  }

  moveDown(recipeId: string) {
    const recipeIndex = this._recipes.findIndex(
      (recipe) => recipe.id === recipeId
    );

    if (recipeIndex === this._recipes.length - 1) {
      return;
    }

    this._swap(recipeIndex, recipeIndex + 1);
  }

  moveUp(recipeId: string) {
    const recipeIndex = this._recipes.findIndex(
      (recipe) => recipe.id === recipeId
    );

    if (recipeIndex === 0) {
      return;
    }

    this._swap(recipeIndex, recipeIndex - 1);
  }

  removeRecipe(recipeId: string) {
    this._recipes = this._recipes.filter((recipe) => recipe.id !== recipeId);
  }

  private _contains(recipe: Recipe) {
    return this._recipes.findIndex((_recipe) => _recipe.id === recipe.id) >= 0;
  }

  private _updateRecipes(recipes: Recipe[]) {
    this._recipes = recipes;
  }

  private _swap(srcIndex: number, dstIndex: number) {
    this._updateRecipes(
      this._recipes.map((recipe, index) => {
        if (index === srcIndex) {
          return this._recipes[dstIndex];
        }

        if (index === dstIndex) {
          return this._recipes[srcIndex];
        }

        return recipe;
      })
    );
  }
}
