import { Injectable } from '@angular/core';
import { Recipe } from './recipe';
import { Observable } from 'rxjs';
import { RxState } from '@rx-angular/state';

@Injectable({
  providedIn: 'root',
})
export class MealPlanner {

  /* Selectors */

  count$: Observable<number>;
  favoriteRecipeId$: Observable<string | null>;

  private _state = new RxState<State>();

  constructor() {
    this._state.set({
      recipes: [],
      favoriteRecipeId: null,
    });

    this.count$ = this._state.select('recipes', 'length');
    this.favoriteRecipeId$ = this._state.select('favoriteRecipeId');
  }

  /* Actions. */

  addRecipe(recipe: Recipe) {
    this._state.set((state) => {
      return {
        /* Mark first added recipe as favorite if no favorite was set yet. */
        favoriteRecipeId: state.favoriteRecipeId ?? recipe.id,
        recipes: [...state.recipes, recipe],
      };
    });
  }
}

interface State {
  recipes: Recipe[];
  favoriteRecipeId: string | null;
}
