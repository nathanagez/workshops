import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component, OnInit
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Recipe } from './recipe';


@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'wm-recipe-search',
  imports: [CommonModule, ReactiveFormsModule],
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

  recipes?: Recipe[];

  constructor(private _http: HttpClient) {}

  ngOnInit() {
    this._updateControls();
    this.keywordsCtrl.valueChanges.subscribe(() => this._updateControls());

    this._http
      .get<RecipeResponse>('https://ottolenghi-recipes.getsandbox.com/recipes')
      .subscribe((data) => {
        this.recipes = data.items;
      });
    // @todo on form change, fetch recipes
    // https://ottolenghi-recipes.getsandbox.com/recipes
    // keywords, min_steps, max_steps
  }

  /**
   * Enable/disable min/max steps based on keywords.
   */
  private _updateControls() {
    if (this.keywordsCtrl.valid) {
      this.minStepsCtrl.enable();
      this.maxStepsCtrl.enable();
    } else {
      this.minStepsCtrl.disable();
      this.maxStepsCtrl.disable();
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
