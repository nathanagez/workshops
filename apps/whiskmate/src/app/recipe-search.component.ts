import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  catchError,
  concat,
  debounceTime,
  delay,
  EMPTY,
  filter,
  fromEvent,
  map,
  Observable,
  retry,
  retryWhen,
  startWith,
  switchMap,
  take,
  timer,
} from 'rxjs';
import { Recipe } from './recipe';
import { RecipePreviewComponent } from './recipe-preview.component';

@Component({
  standalone: true,
  selector: 'wm-recipe-search',
  imports: [CommonModule, ReactiveFormsModule, RecipePreviewComponent],
  template: `
    <form [formGroup]="searchForm">
      <input formControlName="keywords" placeholder="Keywords" type="text" />
      <input formControlName="minSteps" placeholder="Min steps" type="number" />
      <input formControlName="maxSteps" placeholder="Max steps" type="number" />
    </form>

    <div
      *ngIf="
        searchForm.get('keywords')?.touched &&
        searchForm.get('keywords')?.hasError('required')
      "
    >
      Keywords is required
    </div>

    <hr />

    <div *ngIf="recipes == null">Loading...</div>

    <div *ngIf="recipes?.length === 0">No results.</div>

    <wm-recipe-preview
      *ngFor="let recipe of recipes"
      [recipe]="recipe"
    ></wm-recipe-preview>
  `,
  styles: [
    `
      input.ng-touched.ng-invalid {
        background: red;
      }
    `,
  ],
})
export class RecipeSearchComponent implements OnInit {
  keywordsCtrl = new FormControl<string | null>(null, {
    validators: [Validators.required, Validators.minLength(3)],
  });
  minStepsCtrl = new FormControl<number | null>(null);
  maxStepsCtrl = new FormControl<number | null>(null);
  searchForm = new FormGroup({
    keywords: this.keywordsCtrl,
    minSteps: this.minStepsCtrl,
    maxSteps: this.maxStepsCtrl,
  });

  recipes?: Recipe[] | null;

  constructor(private _http: HttpClient) {}

  ngOnInit() {
    this._updateControls();
    this.keywordsCtrl.valueChanges.subscribe(() => this._updateControls());

    this.searchForm.valueChanges
      .pipe(
        debounceTime(100),
        filter(() => this.searchForm.valid),
        startWith(
          {} as { keywords?: string; minSteps?: number; maxSteps?: number }
        ),
        switchMap(({ keywords, maxSteps, minSteps }) => {
          this.recipes = null;
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
              retry({
                delay: () => connectionResumed$,
              }),
              catchError((err) => {
                console.error(err);
                return EMPTY;
              })
            );
        }),
        map((response) => response.items)
      )
      .subscribe((recipes) => (this.recipes = recipes));
  }

  /**
   * Enable/disable min/max steps based on keywords.
   */
  private _updateControls() {
    if (this.keywordsCtrl.valid) {
      this.minStepsCtrl.enable({ emitEvent: false });
      this.maxStepsCtrl.enable({ emitEvent: false });
    } else {
      this.minStepsCtrl.disable({ emitEvent: false });
      this.maxStepsCtrl.disable({ emitEvent: false });
    }
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

const connectionResumed$ = fromEvent(window, 'online');
