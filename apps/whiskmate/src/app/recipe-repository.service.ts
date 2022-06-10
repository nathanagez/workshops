import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { fromEvent, map, Observable, retry } from 'rxjs';
import { Recipe } from './recipe';

export interface RecipeFilter {
  keywords?: string | null;
  maxSteps?: number | null;
  minSteps?: number | null;
}

@Injectable({
  providedIn: 'root',
})
export class RecipeRepository {
  private _backOnline = fromEvent(window, 'online');

  constructor(private _http: HttpClient) {}

  search(filter: RecipeFilter = {}): Observable<Recipe[]> {
    const { keywords, minSteps, maxSteps } = filter;
    return this._http
      .get<RecipeResponse>(
        'https://ottolenghi-recipes.getsandbox.com/recipes',
        {
          params: {
            ...(keywords != null ? { keywords } : {}),
            ...(minSteps != null ? { min_steps: minSteps } : {}),
            ...(maxSteps != null ? { max_steps: maxSteps } : {}),
          },
        }
      )
      .pipe(
        map((response) => response.items),
        retry({ delay: () => this._backOnline })
      );
  }
}

interface RecipeResponse {
  items: Array<{
    id: string;
    name: string;
    ingredients: string[];
    steps: string[];
  }>;
}
