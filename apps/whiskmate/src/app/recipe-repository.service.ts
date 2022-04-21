import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Recipe } from './recipe';

@Injectable({
  providedIn: 'root',
})
export class RecipeRepository {
  constructor(private _http: HttpClient) {}

  search(keywords?: string): Observable<Recipe[]> {
    let params = new HttpParams();
    if (keywords != null) {
      params = params.set('keywords', keywords);
    }

    return this._http
      .get<RecipeSearchResponse>(
        'https://ottolenghi-recipes.getsandbox.com/recipes',
        {
          params,
        }
      )
      .pipe(map((response) => response.items));
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
