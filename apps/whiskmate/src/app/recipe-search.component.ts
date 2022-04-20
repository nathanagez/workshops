import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, NgModule, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Recipe } from './recipe';
import { RecipePreviewModule } from './recipe-preview.component';

@Component({
  selector: 'wm-recipe-search',
  template: `
    <div *ngIf="!recipes">Loading...</div>

    <div *ngIf="recipes?.length === 0">No recipes</div>

    <wm-recipe-preview
      *ngFor="let recipe of recipes"
      [recipe]="recipe"
    ></wm-recipe-preview>
  `,
})
export class RecipeSearchComponent implements OnInit {
  recipes?: Recipe[];

  constructor(private _http: HttpClient) {}

  async ngOnInit() {
    this._http
      .get<RecipeSearchResponse>(
        'https://ottolenghi-recipes.getsandbox.com/recipes'
      )
      .pipe(map((response) => response.items))
      .subscribe((recipes) => (this.recipes = recipes));
  }
}

interface RecipeSearchResponse {
  items: RecipeDto[];
}

interface RecipeDto {
  id: string;
  name: string;
  ingredients: IngredientDto[];
  steps: string[];
}

interface IngredientDto {
  id: string;
  name: string;
}

@NgModule({
  declarations: [RecipeSearchComponent],
  exports: [RecipeSearchComponent],
  imports: [CommonModule, RecipePreviewModule],
})
export class RecipeSearchModule {}
