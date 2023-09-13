import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Recipe } from './recipe';
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
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-recipe-search',
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
        <app-recipe-preview *ngFor="let recipe of recipes" [recipe]="recipe"/>
    `,
})
export class RecipeSearchComponent implements OnInit {
  keywords$ = new Subject<string | undefined>();
  recipes?: Recipe[];
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
    ),
    takeUntilDestroyed()
  );

  private _repo = inject(RecipeRepository);

  ngOnInit() {
    this.recipes$.subscribe((recipes) => (this.recipes = recipes));
  }
}
