import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { NgFor } from '@angular/common';
import { RecipePreviewComponent } from './recipe-preview.component';
import { RecipeRepository } from './recipe-repository.service';
import { RecipeFilterComponent } from './recipe-filter.component';
import { RecipeFilterV2Component } from './recipe-filter-v2.component';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { trackById } from './utils';
import { Recipe } from './recipe';
import { Cart } from './cart.service';

@Component({
  selector: 'app-recipe-search',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NgFor,
    RecipeFilterComponent,
    RecipeFilterV2Component,
    RecipePreviewComponent,
  ],
  template: `
        <!--        <app-recipe-filter (filterSubmit)="keywords.set($event)"/>-->
        <app-recipe-filter-v2 (filterChange)="keywords.set($event)"/>
        <hr>
        <app-recipe-preview *ngFor="let recipe of recipes(); trackBy: trackById"  [recipe]="recipe">
          <button [disabled]="!canAddRecipe(recipe)" (click)="addRecipe(recipe)">ADD</button>
        </app-recipe-preview>
    `,
})
export class RecipeSearchComponent {
  keywords = signal<string | undefined>(undefined);
  recipes = toSignal(
    toObservable(this.keywords).pipe(
      debounceTime(100),
      distinctUntilChanged(),
      switchMap((keywords) => this._repo.searchRecipes(keywords))
    )
  );
  trackById = trackById;

  private _cart = inject(Cart);
  private _repo = inject(RecipeRepository);

  addRecipe(recipe: Recipe) {
    this._cart.addRecipe(recipe);
  }

  canAddRecipe(recipe: Recipe) {
    return this._cart.canAddRecipe(recipe);
  }
}
