import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, NgForOf } from '@angular/common';
import { RecipeRepository } from './recipe-repository.service';
import { Recipe } from './recipe';
import { RecipePreviewComponent } from './recipe-preview.component';
import {
  concatMap,
  exhaustMap,
  interval,
  map,
  mapTo,
  mergeMap,
  Observable,
  retry,
  switchMap,
  timer,
} from 'rxjs';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mp-recipe-search',
  standalone: true,
  imports: [NgForOf, RecipePreviewComponent, AsyncPipe, ReactiveFormsModule],
  template: `
    <form [formGroup]="form">
      <input type="text" formControlName="keywords" />
    </form>

    <mp-recipe-preview
      *ngFor="let recipe of recipes$ | async"
      [recipe]="recipe"
    ></mp-recipe-preview>
  `,
})
export class RecipeSearchComponent {
  form = new FormGroup({
    keywords: new FormControl<string | null>(null),
  });

  recipes$ = this.form.controls.keywords.valueChanges.pipe(
    switchMap((keywords) =>
      timer(0, 1000).pipe(
        exhaustMap(() => this._recipeRepository.getRecipes({ keywords }))
      )
    )
  );

  private _recipeRepository = inject(RecipeRepository);
}
