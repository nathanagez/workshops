import { Observable, map, distinctUntilChanged, shareReplay } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { Recipe } from './recipe';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MealPlanner {
  recipes$: Observable<Recipe[]>;
  canUndo$: Observable<boolean>;

  private _history$ = new BehaviorSubject<Recipe[][]>([]);
  private _recipes$ = new BehaviorSubject<Recipe[]>([]);

  constructor() {
    this.canUndo$ = this._history$.pipe(map((history) => history.length > 0));
    this.recipes$ = this._recipes$.asObservable();
  }

  addRecipe(recipe: Recipe) {
    const recipes = [...this._recipes$.value, recipe];
    this._updateRecipes(recipes.map((r) => ({ ...r })));
  }

  moveUp(recipe: Recipe) {
    const recipes = this._recipes$.value;
    const index = recipes.indexOf(recipe);
    const previousRecipes = recipes.slice(0, index - 1);
    const nextRecipes = recipes.slice(index + 1);
    const previousRecipe = recipes[index - 1];
    const newRecipes = [
      ...previousRecipes,
      recipe,
      previousRecipe,
      ...nextRecipes,
    ];
    this._updateRecipes(newRecipes);
  }

  removeRecipe(recipe: Recipe) {
    const recipes = this._recipes$.value.filter(
      (_recipe) => _recipe.id !== recipe.id
    );
    this._updateRecipes(recipes);
  }

  undo() {
    if (this._history$.value.length === 0) {
      return;
    }
    const [lastRecipes, ...history] = this._history$.value;
    this._recipes$.next(lastRecipes);
    this._history$.next(history);
  }

  private _updateRecipes(recipes: Recipe[]) {
    this._history$.next([this._recipes$.value, ...this._history$.value]);
    this._recipes$.next(recipes);
  }
}
