import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  NgModule,
  Output,
} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'wm-recipe-filter',
  template: `
    <form [formGroup]="filterForm">
      <input formControlName="keywords" placeholder="Keywords" type="text" />
      <input
        formControlName="maxIngredients"
        placeholder="Max Ingredients"
        type="number"
      />
      <input formControlName="maxSteps" placeholder="Max Steps" type="number" />

      <ul>
        <ng-container *ngIf="keywordsCtrl.touched">
          <li *ngIf="keywordsCtrl.hasError('required')">
            Keywords is required.
          </li>
          <li *ngIf="keywordsCtrl.hasError('minlength')">
            Keywords is too short.
          </li>
        </ng-container>

        <ng-container *ngIf="filterForm.hasError('someRequired')">
          <li>Please set some criteria.</li>
        </ng-container>
      </ul>
    </form>
  `,
})
export class RecipeFilterComponent {
  @Output() filterChange = new EventEmitter<Filter>();
  @Output() filterSubmit = new EventEmitter<Filter>();

  keywordsCtrl = new FormControl(null, [Validators.minLength(3)]);
  filterForm = new FormGroup(
    {
      keywords: this.keywordsCtrl,
      maxIngredients: new FormControl(),
      maxSteps: new FormControl(),
    },
    [someRequired(['keywords', 'maxIngredients', 'maxSteps'])]
  );

  constructor() {
    this.filterForm.valueChanges.subscribe((value) => {
      console.log(value);
    });
  }
}

@NgModule({
  declarations: [RecipeFilterComponent],
  exports: [RecipeFilterComponent],
  imports: [CommonModule, ReactiveFormsModule],
})
export class RecipeFilterModule {}

export interface Filter {
  keywords?: string;
  maxIngredients?: number;
  maxSteps?: number;
}

export const someRequired =
  (controlNames: string[]) => (formGroup: AbstractControl) => {
    if (
      !controlNames.some((name) => {
        const control = formGroup.get(name) as FormControl;
        return Validators.required(control) == null;
      })
    ) {
      return {
        someRequired: true,
      };
    }

    return null;
  };
