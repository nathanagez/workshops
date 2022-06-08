import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

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
export class RecipeSearchComponent {
  searchForm = new FormGroup({
    keywords: new FormControl<string | null>(null, {
      validators: [Validators.required, Validators.minLength(3)],
    }),
    minSteps: new FormControl<number | null>(null),
    maxSteps: new FormControl<number | null>(null),
  });

  constructor() {
    this.searchForm.valueChanges.subscribe((value) => {
      console.log(this.searchForm.valid);
      console.log(this.searchForm.get('keywords')?.errors);
      console.log(value);
    });
  }
}
