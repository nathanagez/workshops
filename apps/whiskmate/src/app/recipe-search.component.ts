import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { Suspense, suspensify } from '@jscutlery/operators';
import { BehaviorSubject, switchMap } from 'rxjs';
import { Recipe } from './recipe';
import { RecipeFilter } from './recipe-filter';
import { RecipeFilterModule } from './recipe-filter.component';
import { RecipePreviewV2Module } from './recipe-preview-v2.component';
import { RecipePreviewModule } from './recipe-preview.component';
import { RecipeRepository } from './recipe-repository.service';

@Component({
  selector: 'wm-recipe-search',
  template: `
    <wm-recipe-filter (filterChange)="updateFilter($event)"></wm-recipe-filter>

    <div *ngIf="result?.pending">Loading...</div>

    <div *ngIf="result?.error">Oups! 😭</div>

    <div *ngIf="result?.value?.length === 0">No recipes</div>

    <wm-recipe-preview
      *ngFor="let recipe of result?.value"
      [recipe]="recipe"
    ></wm-recipe-preview>
  `,
})
export class RecipeSearchComponent implements OnInit {
  result?: Suspense<Recipe[]>;
  private _filter$ = new BehaviorSubject<RecipeFilter | null>(null);

  constructor(private _recipeRepository: RecipeRepository) {}

  ngOnInit() {
    this._filter$
      .pipe(
        switchMap((filter) =>
          this._recipeRepository.search(filter).pipe(suspensify())
        )
      )
      .subscribe((result) => (this.result = result));
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
