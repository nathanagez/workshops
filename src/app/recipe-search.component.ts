import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Recipe } from './recipe';
import { RecipePreviewComponent } from './recipe-preview.component';
import { RecipeRepository } from './recipe-repository.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-recipe-search',
  standalone: true,
  imports: [CommonModule, FormsModule, RecipePreviewComponent],
  template: `
    <form (ngSubmit)="search()">
      <input [(ngModel)]="keywords" name="keywords" type="text" placeholder="keywords...">
      <button type="submit">SEARCH</button>
    </form>
    <hr>
    <app-recipe-preview *ngFor="let recipe of recipes" [recipe]="recipe"/>
  `,
})
export class RecipeSearchComponent implements OnInit {
  recipes?: Recipe[];
  keywords?: string;

  private _repo = inject(RecipeRepository);

  ngOnInit() {
    this.search();
  }

  search() {
    this._repo
      .searchRecipes(this.keywords)
      .subscribe((recipes) => (this.recipes = recipes));
  }
}
