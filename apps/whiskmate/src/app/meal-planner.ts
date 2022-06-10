import { BehaviorSubject, map, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Recipe } from './recipe';

@Injectable({
  providedIn: 'root',
})
export class MealPlanner {
  recipes$: Observable<Recipe[]>;
  private _recipes$ = new BehaviorSubject<Recipe[]>([]);

  constructor() {
    this.recipes$ = this._recipes$.asObservable();
  }

  addRecipe(recipe: Recipe) {
    if (this._contains(this._recipes$.value, recipe)) {
      throw new Error('Duplicate recipe error.');
    }

    this._updateRecipes([...this._recipes$.value, recipe]);
  }

  canAddRecipe(recipe: Recipe) {
    return this._recipes$.pipe(
      map((recipes) => !this._contains(recipes, recipe))
    );
  }

  /**
   * @deprecated use {@link _recipes$} instead.
   */
  getRecipes(): Recipe[] {
    return this._recipes$.value;
  }

  moveDown(recipeId: string) {
    const recipeIndex = this._recipes$.value.findIndex(
      (recipe) => recipe.id === recipeId
    );

    if (recipeIndex === this._recipes$.value.length - 1) {
      return;
    }

    this._swap(recipeIndex, recipeIndex + 1);
  }

  moveUp(recipeId: string) {
    const recipeIndex = this._recipes$.value.findIndex(
      (recipe) => recipe.id === recipeId
    );

    if (recipeIndex === 0) {
      return;
    }

    this._swap(recipeIndex, recipeIndex - 1);
  }

  removeRecipe(recipeId: string) {
    this._updateRecipes(
      this._recipes$.value.filter((recipe) => recipe.id !== recipeId)
    );
  }

  private _contains(recipes: Recipe[], recipe: Recipe) {
    return recipes.find((_recipe) => _recipe.id === recipe.id) != null;
  }

  private _updateRecipes(recipes: Recipe[]) {
    this._recipes$.next(recipes);
  }

  private _swap(srcIndex: number, dstIndex: number) {
    const recipes = this._recipes$.value;
    this._updateRecipes(
      recipes.map((recipe, index) => {
        if (index === srcIndex) {
          return recipes[dstIndex];
        }

        if (index === dstIndex) {
          return recipes[srcIndex];
        }

        return recipe;
      })
    );
  }
}
