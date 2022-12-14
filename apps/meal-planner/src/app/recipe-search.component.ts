import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { RecipeRepository } from './recipe-repository.service';
import { Recipe } from './recipe';
import { RecipePreviewComponent } from './recipe-preview.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mp-recipe-search',
  standalone: true,
  imports: [NgForOf, RecipePreviewComponent, NgIf],
  template: `
    <mp-recipe-preview
      *ngFor="let recipe of recipes"
      [recipe]="recipe"
    ></mp-recipe-preview>
  `,
})
export class RecipeSearchComponent implements OnInit {
  recipes?: Recipe[];

  private _recipeRepository = inject(RecipeRepository);

  ngOnInit() {
    this._recipeRepository.getRecipes().subscribe((recipes) => {
      this.recipes = recipes;
    });
  }
}
