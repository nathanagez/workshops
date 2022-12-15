import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { RecipeRepository } from './recipe-repository.service';
import { Recipe } from './recipe';
import { RecipePreviewComponent } from './recipe-preview.component';
import { debounceTime, switchMap } from 'rxjs';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RxState } from '@rx-angular/state';

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
  ],
  template: `
    <form [formGroup]="form">
      <input type="text" formControlName="keywords" />
    </form>

    <ng-container *ngFor="let recipe of recipes$ | async">
      <mp-recipe-preview [recipe]="recipe"> </mp-recipe-preview>
    </ng-container>

    <div *ngIf="count$ | async as count">Showing {{ count }} results</div>
  `,
  providers: [RxState],
})
export class RecipeSearchComponent {
  form = new FormGroup({
    keywords: new FormControl<string | null>(null),
  });

  state: RxState<State> = inject(RxState, { self: true });
  recipes$ = this.state.select('recipes');
  count$ = this.state.select('recipes', 'length');

  private _recipeRepository = inject(RecipeRepository);

  constructor() {
    this.state.set({
      keywords: null,
    });

    /* Fetch recipes each time keywords change. */
    this.state.connect(
      'recipes',
      this.state
        .select('keywords')
        .pipe(
          switchMap((keywords) =>
            this._recipeRepository.getRecipes({ keywords })
          )
        )
    );

    /* Sync reactive form with state. */
    this.state.connect(
      'keywords',
      this.form.controls.keywords.valueChanges.pipe(debounceTime(50))
    );
  }
}

interface State {
  keywords: string | null;
  recipes: Recipe[];
}
