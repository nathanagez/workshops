import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Recipe } from './recipe';
import { RecipePreviewComponent } from './recipe-preview.component';
import { RecipeRepository } from './recipe-repository.service';

@Component({
  selector: 'app-recipe-search',
  standalone: true,
  imports: [CommonModule, RecipePreviewComponent],
  template: `
    <app-recipe-preview *ngFor="let recipe of recipes" [recipe]="recipe"/>
  `,
})
export class RecipeSearchComponent implements OnInit {
  recipes?: Recipe[];

  private _repo = inject(RecipeRepository);

  ngOnInit() {
    this._repo.searchRecipes().subscribe((recipes) => (this.recipes = recipes));
  }
}
