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
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { map, Observable } from 'rxjs';
import { RecipeFilter } from './recipe-filter';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'wm-recipe-filter',
  template: `
    <form [formGroup]="filterForm" (ngSubmit)="submit()">
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

      <button [disabled]="filterForm.invalid" type="submit">SEARCH</button>
      <button type="reset">RESET</button>
    </form>
  `,
})
export class RecipeFilterComponent {
  /**
   * Emits null if form is invalid.
   */
  @Output() filterChange: Observable<RecipeFilter | null>;
  @Output() filterSubmit = new EventEmitter<RecipeFilter>();

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
    this.filterChange = this._getValueChanges().pipe(
      map((value) => (this.filterForm.valid ? value : null))
    );
  }

  submit() {
    this.filterSubmit.emit(this.filterForm.value);
  }

  private _getValueChanges(): Observable<RecipeFilter> {
    return this.filterForm.valueChanges;
  }
}

@NgModule({
  declarations: [RecipeFilterComponent],
  exports: [RecipeFilterComponent],
  imports: [CommonModule, ReactiveFormsModule],
})
export class RecipeFilterModule {}

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
