import { Recipe } from './recipe';

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

  /**
   * @deprecated 🚧 Work in progress.
   */
  moveUp(recipeId: string) {
    throw new Error('🚧 Work in progress!');
  }

  removeRecipe(recipeId: string) {
    this._recipes = this._recipes.filter((recipe) => recipe.id !== recipeId);
  }

  private _contains(recipe: Recipe) {
    return this._recipes.findIndex((_recipe) => _recipe.id === recipe.id) >= 0;
  }
}
