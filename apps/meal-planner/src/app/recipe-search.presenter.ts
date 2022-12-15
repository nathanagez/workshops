import { inject, Injectable, OnDestroy } from '@angular/core';
import { RxState, selectSlice } from '@rx-angular/state';
import { map, switchMap } from 'rxjs';
import { MealPlanner } from './meal-planner.service';
import { RecipeRepository } from './recipe-repository.service';
import { Recipe } from './recipe';

@Injectable()
export class RecipeSearchPresenter implements OnDestroy {
  state = new RxState<State>();
  recipes$ = this.state.select(
    selectSlice(['recipes', 'favoriteRecipeId', 'plannedRecipes']),
    map((state) => {
      return state.recipes?.map((recipe) => {
        return {
          ...recipe,
          isFavorite: recipe.id === state.favoriteRecipeId,
          isAlreadyPlanned:
            state.plannedRecipes.find((r) => r.id === recipe.id) != null,
        };
      });
    })
  );
  count$ = this.state.select(map((state) => state.recipes?.length ?? 0));

  private _mealPlanner = inject(MealPlanner);
  private _recipeRepository = inject(RecipeRepository);

  constructor() {
    this.state.set({
      keywords: null,
      recipes: null,
      favoriteRecipeId: null,
    });

    /* Sync meal planner favorite recipe id here. */
    this.state.connect('favoriteRecipeId', this._mealPlanner.favoriteRecipeId$);
    this.state.connect('plannedRecipes', this._mealPlanner.recipes$);

    /* Fetch recipes each time keywords change. */
    this.state.connect(
      'recipes',
      this.state
        .select('keywords')
        .pipe(
          switchMap((keywords) =>
            this._recipeRepository.getRecipes({ keywords })
          )
        )
    );
  }

  ngOnDestroy() {
    this.state.ngOnDestroy();
  }

  addRecipe(recipe: Recipe) {
    this._mealPlanner.addRecipe(recipe);
  }

  updateKeywords(keywords: string | null) {
    this.state.set({ keywords });
  }
}

interface State {
  keywords: string | null;
  plannedRecipes: Recipe[];
  recipes: Recipe[] | null;
  favoriteRecipeId: string | null;
}
