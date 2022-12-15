import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Injectable,
} from '@angular/core';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { RecipeRepository } from './recipe-repository.service';
import { Recipe } from './recipe';
import { RecipePreviewComponent } from './recipe-preview.component';
import { debounceTime, map, Observable, switchMap } from 'rxjs';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RxState, selectSlice } from '@rx-angular/state';
import { MealPlanner } from './meal-planner.service';
import { RecipeFilterComponent } from './recipe-filter.component';
import { RecipeSearchPresenter } from './recipe-search.presenter';

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
      (keywordsChange)="presenter.updateKeywords($event)"
    ></mp-recipe-filter>

    <ng-container *ngFor="let recipe of presenter.recipes$ | async">
      <mp-recipe-preview [recipe]="recipe"></mp-recipe-preview>
      <span *ngIf="recipe.isFavorite">✨</span>
      <button
        [disabled]="recipe.isAlreadyPlanned"
        (click)="presenter.addRecipe(recipe)"
      >
        ADD
      </button>
    </ng-container>

    <div *ngIf="presenter.count$ | async as count">
      Showing {{ count }} results
    </div>
  `,
  providers: [RecipeSearchPresenter],
})
export class RecipeSearchComponent {
  presenter = inject(RecipeSearchPresenter, { self: true });
}
