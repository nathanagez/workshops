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
        <app-recipe-preview *ngFor="let recipe of recipes()" [recipe]="recipe"/>
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

  private _repo = inject(RecipeRepository);
}
