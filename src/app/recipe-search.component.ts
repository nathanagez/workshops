import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { RecipePreviewComponent } from './recipe-preview.component';
import { RecipeRepository } from './recipe-repository.service';
import { RecipeFilterComponent } from './recipe-filter.component';
import { RecipeFilterV2Component } from './recipe-filter-v2.component';
import { trackById } from './utils';
import { Recipe } from './recipe';
import { Cart } from './cart.service';
import { rxComputed } from '@jscutlery/rx-computed';
import { suspensify } from '@jscutlery/operators';

@Component({
  selector: 'app-recipe-search',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NgFor,
    RecipeFilterComponent,
    RecipeFilterV2Component,
    RecipePreviewComponent,
    NgIf,
  ],
  template: `
    <!--        <app-recipe-filter (filterSubmit)="keywords.set($event)"/>-->
    <app-recipe-filter-v2 (filterChange)="keywords.set($event)"/>
    <hr>
    
    <div *ngIf="recipes()?.pending">...</div>
    
    <div *ngIf="recipes()?.error">Oups!</div>

    <div *ngIf="recipes()?.value?.length === 0">No result.</div>
    
    <app-recipe-preview *ngFor="let recipe of recipes()?.value; trackBy: trackById" [recipe]="recipe">
      <button [disabled]="!canAddRecipe(recipe)" (click)="addRecipe(recipe)">ADD</button>
    </app-recipe-preview>
  `,
})
export class RecipeSearchComponent {
  keywords = signal<string | undefined>(undefined);

  recipes = rxComputed(() =>
    this._repo
      .searchRecipes(this.keywords())
      .pipe(suspensify({ strict: false }))
  );

  // recipes = toSignal(
  //   toObservable(this.keywords).pipe(
  //     debounceTime(100),
  //     distinctUntilChanged(),
  //     switchMap((keywords) => this._repo.searchRecipes(keywords))
  //   )
  // );

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

export default RecipeSearchComponent;
