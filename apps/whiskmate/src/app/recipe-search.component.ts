import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { suspensify } from '@jscutlery/operators';
import { BehaviorSubject, debounceTime, switchMap } from 'rxjs';
import { RecipeFilter } from './recipe-filter';
import { RecipeFilterComponent } from './recipe-filter.component';
import { RecipePreviewComponent } from './recipe-preview.component';
import { RecipeRepository } from './recipe-repository.service';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'wm-recipe-search',
  imports: [CommonModule, RecipeFilterComponent, RecipePreviewComponent],
  template: `
    <wm-recipe-filter
      [filter]="filter$ | async"
      (filterChange)="filter$.next($event)"
    ></wm-recipe-filter>

    <ng-container *ngIf="recipes$ | async as recipes">
      <div *ngIf="recipes.pending">Loading...</div>

      <div *ngIf="recipes.value?.length === 0">No results.</div>

      <wm-recipe-preview
        *ngFor="let recipe of recipes.value"
        [recipe]="recipe"
      ></wm-recipe-preview>
    </ng-container>
  `,
  styles: [
    `
      input.ng-touched.ng-invalid {
        background: red;
      }
    `,
  ],
})
export class RecipeSearchComponent {
  filter$ = new BehaviorSubject<RecipeFilter>({});
  recipes$ = this.filter$.pipe(
    debounceTime(50),
    switchMap((filter) =>
      this._recipeRepository.search(filter).pipe(suspensify())
    )
  );

  constructor(private _recipeRepository: RecipeRepository) {}
}
