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
  moveDown(recipeId: string) {
    throw new Error('🚧 Work in progress!');
  }

  moveUp(recipeId: string) {
    const recipeIndex = this._recipes.findIndex(
      (recipe) => recipe.id === recipeId
    );

    if (recipeIndex === 0) {
      return;
    }

    const previousRecipes = this._recipes.slice(0, recipeIndex - 1);
    const swappedRecipe = this._recipes[recipeIndex - 1];
    const recipe = this._recipes[recipeIndex];
    const nextRecipes = this._recipes.slice(recipeIndex + 1);
    this._updateRecipes([
      ...previousRecipes,
      recipe,
      swappedRecipe,
      ...nextRecipes,
    ]);
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
}
