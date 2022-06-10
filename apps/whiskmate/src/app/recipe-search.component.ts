import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { suspensify } from '@jscutlery/operators';
import { debounceTime, filter, share, startWith, switchMap } from 'rxjs';
import { RecipePreviewComponent } from './recipe-preview.component';
import { RecipeFilter, RecipeRepository } from './recipe-repository.service';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
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

    <div *ngIf="recipes$ | async as recipes">
      <div *ngIf="recipes.pending">Loading...</div>

      <div *ngIf="recipes.value?.length === 0">No results.</div>

      <wm-recipe-preview
        *ngFor="let recipe of recipes.value"
        [recipe]="recipe"
      ></wm-recipe-preview>
    </div>
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

  recipes$ = this.searchForm.valueChanges.pipe(
    debounceTime(100),
    filter(() => this.searchForm.valid),
    startWith({} as RecipeFilter),
    switchMap((filter) =>
      this._recipeRepository.search(filter).pipe(suspensify())
    ),
    share({
      resetOnRefCountZero: true,
    })
  );

  constructor(private _recipeRepository: RecipeRepository) {}

  ngOnInit() {
    this._updateControls();
    this.keywordsCtrl.valueChanges.subscribe(() => this._updateControls());
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
