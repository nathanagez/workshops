import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipePreviewComponent } from './recipe-preview.component';
import { RecipeRepository } from './recipe-repository.service';
import { RecipeFilterComponent } from './recipe-filter.component';
import { RecipeFilterV2Component } from './recipe-filter-v2.component';
import {
  debounceTime,
  distinctUntilChanged,
  interval,
  retry,
  startWith,
  Subject,
  switchMap,
} from 'rxjs';

@Component({
  selector: 'app-recipe-search',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    RecipeFilterComponent,
    RecipeFilterV2Component,
    RecipePreviewComponent,
  ],
  template: `
<!--        <app-recipe-filter (filterSubmit)="keywords$.next($event)"/>-->
        <app-recipe-filter-v2 (filterChange)="keywords$.next($event)"/>
        <hr>
        <app-recipe-preview *ngFor="let recipe of recipes$ | async" [recipe]="recipe"/>
    `,
})
export class RecipeSearchComponent {
  keywords$ = new Subject<string | undefined>();
  recipes$ = this.keywords$.pipe(
    startWith(undefined),
    debounceTime(100),
    distinctUntilChanged(),
    switchMap((keywords) =>
      this._repo.searchRecipes(keywords).pipe(
        retry({
          delay: (_, retryCount) => interval(retryCount * 1000),
        })
      )
    )
  );

  private _repo = inject(RecipeRepository);
}
