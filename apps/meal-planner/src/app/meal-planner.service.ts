import { Injectable } from '@angular/core';
import { Recipe } from './recipe';
import {
  BehaviorSubject,
  Observable,
  ReplaySubject,
  distinctUntilChanged,
  map,
  share,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MealPlanner {
  recipes$: Observable<Recipe[]>;
  count$: Observable<number>;

  private _recipes$ = new BehaviorSubject<Recipe[]>([]);

  constructor() {
    this.recipes$ = this._recipes$.asObservable();
    this.count$ = this._recipes$.pipe(
      distinctUntilChanged(),
      map((recipes) => {
        console.log('computing length...');
        return recipes.length;
      }),
      distinctUntilChanged(),
      share({
        connector: () => new ReplaySubject(1),
      })
    );
  }

  addRecipe(recipe: Recipe) {
    const recipes = [...this._recipes$.value, recipe];
    this._recipes$.next(recipes);
    this._recipes$.next(recipes);
  }
}
