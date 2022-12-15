import { Injectable, OnDestroy } from '@angular/core';
import { Recipe } from './recipe';
import {
  bufferTime,
  combineLatest,
  map,
  Observable,
  Subject,
  withLatestFrom,
} from 'rxjs';
import { RxState } from '@rx-angular/state';

@Injectable({
  providedIn: 'root',
})
export class MealPlanner implements OnDestroy {
  /* Selectors */

  count$: Observable<number>;
  favoriteRecipeId$: Observable<string | null>;
  recipes$: Observable<Recipe[]>;

  private _state = new RxState<State>();
  // private _addRecipeAction$ = new Subject<Recipe>();

  constructor() {
    /* Try to load from local storage. */
    this._state.set(this._getInitialState());

    this.recipes$ = this._state.select('recipes');
    this.count$ = this._state.select('recipes', 'length');
    this.favoriteRecipeId$ = this._state.select('favoriteRecipeId');

    /* Effects. */
    // this._state.hold(this._state.select(), (state) => {
    //   localStorage.setItem('meal-planning', JSON.stringify(state));
    // });

    // this._state.connect(
    //   'recipes',
    //   this._addRecipeAction$.pipe(
    //     bufferTime(1000),
    //     withLatestFrom(this.recipes$),
    //     map(([pendingRecipes, recipes]) => [...recipes, ...pendingRecipes])
    //   )
    // );

    // this._state.connect(
    //   'recipes',
    //   this._addRecipeAction$.pipe(
    //     withLatestFrom(this.recipes$),
    //     map(([recipe, recipes]) => [...recipes, recipe])
    //   )
    // );
  }

  /* Actions. */

  addRecipe(recipe: Recipe) {
    this._state.set((state) => {
      if (state.recipes.find((r) => r.id === recipe.id)) {
        return {};
      }

      return {
        recipes: [
          ...state.recipes,
          // @todo add typing
          { ...recipe, createdAt: new Date().toISOString() },
        ],
      };
    });
  }

  ngOnDestroy() {
    this._state.ngOnDestroy();
  }

  private _getInitialState(): State {
    const defaultState = {
      recipes: [],
      favoriteRecipeId: null,
    };

    try {
      const rawState = localStorage.getItem('meal-planning');
      if (rawState == null) {
        return defaultState;
      }
      return {
        ...defaultState,
        ...JSON.parse(localStorage.getItem('meal-planning') as string),
      };
    } catch {
      return defaultState;
    }
  }
}

interface State {
  recipes: Recipe[];
  favoriteRecipeId: string | null;
}
