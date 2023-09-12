import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Recipe } from './recipe';

@Injectable({
  providedIn: 'root',
})
export class RecipeRepository {
  private _httpClient = inject(HttpClient);

  searchRecipes(): Observable<Recipe[]> {
    return this._httpClient
      .get<RecipesResponseDto>('https://recipes-api.marmicode.io/recipes')
      .pipe(
        map((data) =>
          data.items.map((item) => ({
            id: item.id,
            name: item.name,
            pictureUri: item.picture_uri,
          }))
        )
      );
  }
}

/*
 * Data transfer objects are defined manually here...
 * ... but could be generated automatically using openapi-generator.
 */
interface RecipesResponseDto {
  items: RecipeDto[];
}

interface RecipeDto {
  id: string;
  created_at: string;
  name: string;
  picture_uri: string;
}
