import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, NgForOf } from '@angular/common';
import { RecipeRepository } from './recipe-repository.service';
import { Recipe } from './recipe';
import { RecipePreviewComponent } from './recipe-preview.component';
import { Observable } from 'rxjs';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormGroupDirective,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mp-recipe-search',
  standalone: true,
  imports: [NgForOf, RecipePreviewComponent, AsyncPipe, ReactiveFormsModule],
  template: `
    <form [formGroup]="form">
      <input type="text" formControlName="keywords" />
      <button type="submit">Search</button>
    </form>

    <mp-recipe-preview
      *ngFor="let recipe of recipes$ | async"
      [recipe]="recipe"
    ></mp-recipe-preview>
  `,
})
export class RecipeSearchComponent {
  recipes$: Observable<Recipe[]>;
  form = new FormGroup({
    keywords: new FormControl<string | null>(null),
  });

  private _recipeRepository = inject(RecipeRepository);

  // 1. @todo trigger search on submit
  // 2. @todo trigger search on keywords change

  constructor() {
    // this.form.value.keywords
    // this.form.valueChanges => Observable<{ keywords: string | null }>
    this.recipes$ = this._recipeRepository.getRecipes();
  }
}
