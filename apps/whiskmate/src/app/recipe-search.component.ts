import { CommonModule } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  NgModule,
  OnInit,
} from '@angular/core';
import {
  BehaviorSubject,
  concatMap,
  debounceTime,
  exhaustMap,
  map,
  mergeMap,
  Observable,
  startWith,
  switchMap,
} from 'rxjs';
import { Recipe } from './recipe';
import { RecipePreviewModule } from './recipe-preview.component';

@Component({
  selector: 'wm-recipe-search',
  template: `
    <input
      (input)="onKeywordsInput($event)"
      placeholder="Keywords"
      type="text"
    />

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
  recipes$: Observable<Recipe[] | undefined>;
  private _keywords$ = new BehaviorSubject<string | null>(null);

  constructor(private _http: HttpClient) {
    this.recipes$ = this._keywords$.pipe(
      switchMap((keywords) => {
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
      })
    );
  }

  ngOnInit() {
    this.recipes$.subscribe((recipes) => (this.recipes = recipes));
  }

  onKeywordsInput(event: Event) {
    const keywords = (event.target as HTMLInputElement).value;
    this._keywords$.next(keywords);
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
