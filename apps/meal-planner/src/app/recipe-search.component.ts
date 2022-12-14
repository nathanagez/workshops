import { Component, inject, OnInit } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { RecipeRepository } from './recipe-repository.service';
import { Recipe } from './recipe';
import { RecipePreviewComponent } from './recipe-preview.component';

@Component({
  selector: 'mp-recipe-search',
  standalone: true,
  imports: [NgForOf, RecipePreviewComponent, NgIf],
  template: `
    <mp-recipe-preview
      *ngFor="let recipe of recipes"
      [recipe]="recipe"
    ></mp-recipe-preview>
    <button (click)="isDisplayed = !isDisplayed">TOGGLE</button>
    <div *ngIf="isDisplayed">Hello</div>
  `,
})
export class RecipeSearchComponent implements OnInit {
  recipes?: Recipe[];
  isDisplayed = true;

  private _recipeRepository = inject(RecipeRepository);

  ngOnInit() {
    this._recipeRepository.getRecipes().subscribe((recipes) => {
      this.recipes = recipes;
    });
  }
}
