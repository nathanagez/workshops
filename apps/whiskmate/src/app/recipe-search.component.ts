import { Observable, map } from 'rxjs';
import { MealPlanner } from './meal-planner.service';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  NgModule,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import { Suspense, suspensify } from '@jscutlery/operators';
import { BehaviorSubject, switchMap } from 'rxjs';
import { Recipe } from './recipe';
import { RecipeFilter } from './recipe-filter';
import { RecipeFilterModule } from './recipe-filter.component';
import { RecipePreviewV2Module } from './recipe-preview-v2.component';
import { RecipePreviewModule } from './recipe-preview.component';
import { RecipeRepository } from './recipe-repository.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'wm-recipe-search',
  template: `
    <wm-recipe-filter (filterChange)="updateFilter($event)"></wm-recipe-filter>

    <ng-container *ngIf="result$ | async as result">
      <div data-role="loading-message" *ngIf="result.pending">Loading...</div>

      <div data-role="error-message" *ngIf="result.error">Oups! 😭</div>

      <div *ngIf="result.value?.length === 0">No recipes</div>

      <wm-recipe-preview *ngFor="let recipe of result.value" [recipe]="recipe">
        <ng-container slot="actions">
          <button (click)="addRecipe(recipe)">ADD</button>
        </ng-container>
      </wm-recipe-preview>
    </ng-container>
  `,
})
export class RecipeSearchComponent {
  result$: Observable<Suspense<Recipe[]>>;

  private _filter$ = new BehaviorSubject<RecipeFilter | null>(null);

  constructor(
    private _mealPlanner: MealPlanner,
    private _recipeRepository: RecipeRepository
  ) {
    this.result$ = this._filter$.pipe(
      switchMap((filter) =>
        this._recipeRepository.search(filter).pipe(suspensify())
      )
    );
  }

  addRecipe(recipe: Recipe) {
    this._mealPlanner.addRecipe(recipe);
  }

  updateFilter(filter: RecipeFilter | null) {
    this._filter$.next(filter);
  }
}

@NgModule({
  declarations: [RecipeSearchComponent],
  exports: [RecipeSearchComponent],
  imports: [
    CommonModule,
    RecipePreviewModule,
    RecipePreviewV2Module,
    RecipeFilterModule,
  ],
})
export class RecipeSearchModule {}
