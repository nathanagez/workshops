import { RecipeFilter } from './recipe-filter';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, throwError } from 'rxjs';
import { Recipe } from './recipe';

@Injectable({
  providedIn: 'root',
})
export class RecipeRepository {
  constructor(private _http: HttpClient) {}

  search(filter?: RecipeFilter | null): Observable<Recipe[]> {
    return this._http
      .get<RecipeSearchResponse>(
        'https://ottolenghi-recipes.getsandbox.com/recipes',
        {
          params: this._filterToParams(filter),
        }
      )
      .pipe(map((response) => response.items));
  }

  private _filterToParams(filter?: RecipeFilter | null) {
    if (filter == null) {
      return undefined;
    }

    const { keywords, maxIngredients, maxSteps } = filter;

    return {
      ...(keywords != null ? { keywords } : {}),
      ...(maxIngredients != null ? { max_ingredients: maxIngredients } : {}),
      ...(maxSteps != null ? { max_steps: maxSteps } : {}),
    };
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
