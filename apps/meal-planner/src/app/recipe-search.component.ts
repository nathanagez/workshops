import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { RecipeRepository } from './recipe-repository.service';
import { Recipe } from './recipe';
import { RecipePreviewComponent } from './recipe-preview.component';
import { debounceTime, map, Observable, switchMap } from 'rxjs';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RxState, selectSlice } from '@rx-angular/state';
import { MealPlanner } from './meal-planner.service';
import { RecipeFilterComponent } from './recipe-filter.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mp-recipe-search',
  standalone: true,
  imports: [
    NgForOf,
    RecipePreviewComponent,
    AsyncPipe,
    ReactiveFormsModule,
    NgIf,
    RecipeFilterComponent,
  ],
  template: `
    <mp-recipe-filter
      (keywordsChange)="updateKeywords($event)"
    ></mp-recipe-filter>

    <ng-container *ngFor="let recipe of recipes$ | async">
      <mp-recipe-preview [recipe]="recipe"></mp-recipe-preview>
      <span *ngIf="recipe.isFavorite">✨</span>
      <button [disabled]="recipe.isAlreadyPlanned" (click)="addRecipe(recipe)">
        ADD
      </button>
    </ng-container>

    <div *ngIf="count$ | async as count">Showing {{ count }} results</div>
  `,
  providers: [RxState],
})
export class RecipeSearchComponent {
  state: RxState<State> = inject(RxState, { self: true });
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
