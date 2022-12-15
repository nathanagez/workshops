import { Injectable } from '@angular/core';
import { Recipe } from './recipe';
import { Observable } from 'rxjs';
import { RxState } from '@rx-angular/state';

@Injectable({
  providedIn: 'root',
})
export class MealPlanner {
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

  addRecipe(recipe: Recipe) {
    this._state.set((state) => {
      return {
        favoriteRecipeId: recipe.id,
        recipes: [...state.recipes, recipe],
      };
    });
  }
}

interface State {
  recipes: Recipe[];
  favoriteRecipeId: string | null;
}
