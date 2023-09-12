import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Recipe } from './recipe';
import { RecipePreviewComponent } from './recipe-preview.component';

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

  constructor(private _httpClient: HttpClient) {}

  ngOnInit() {
    this._httpClient
      .get<RecipesResponseDto>('https://recipes-api.marmicode.io/recipes')
      .subscribe((data) => {
        this.recipes = data.items.map((item) => ({
          id: item.id,
          name: item.name,
          pictureUri: item.picture_uri,
        }));
      });
  }
}

interface RecipesResponseDto {
  items: RecipeDto[];
}

interface RecipeDto {
  id: string;
  created_at: string;
  name: string;
  picture_uri: string;
}
