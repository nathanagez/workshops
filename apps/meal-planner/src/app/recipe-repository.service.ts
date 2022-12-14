import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Recipe } from './recipe';

@Injectable({
  providedIn: 'root',
})
export class RecipeRepository {
  private _httpClient = inject(HttpClient);

  getRecipes({ keywords }: { keywords?: string | null } = {}): Observable<
    Recipe[]
  > {
    return this._httpClient
      .get<RecipesResponseDto>('https://recipes-api.marmicode.io/recipes', {
        params: keywords ? { q: keywords } : {},
      })
      .pipe(
        map((response) =>
          response.items.map((recipe) => {
            return {
              id: recipe.id,
              name: recipe.name,
              pictureUri: recipe.picture_uri,
            };
          })
        )
      );
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
  ingredients?: IngredientDto[];
}

interface IngredientDto {
  id: string;
  name: string;
}
