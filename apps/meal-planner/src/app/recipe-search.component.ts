import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, NgForOf } from '@angular/common';
import { RecipeRepository } from './recipe-repository.service';
import { Recipe } from './recipe';
import { RecipePreviewComponent } from './recipe-preview.component';
import { Observable } from 'rxjs';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mp-recipe-search',
  standalone: true,
  imports: [NgForOf, RecipePreviewComponent, AsyncPipe],
  template: `
    <mp-recipe-preview
      *ngFor="let recipe of recipes$ | async"
      [recipe]="recipe"
    ></mp-recipe-preview>
  `,
})
export class RecipeSearchComponent {
  recipes$: Observable<Recipe[]>;

  private _recipeRepository = inject(RecipeRepository);

  constructor() {
    this.recipes$ = this._recipeRepository.getRecipes();
  }
}
