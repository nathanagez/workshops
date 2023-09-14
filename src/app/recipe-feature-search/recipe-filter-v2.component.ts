import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { filter, map, Observable } from 'rxjs';
import { FormErrorsComponent } from '../ui/form-errors.component';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-recipe-filter-v2',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ReactiveFormsModule, FormErrorsComponent, MatInputModule],
  template: `
      <form [formGroup]="form">
          <mat-form-field>
              <mat-label>Keywords</mat-label>
              <input
                      formControlName="keywords"
                      matInput
                      type="text"
                      placeholder="keywords..."/>
          </mat-form-field>

          <mat-form-field>
              <mat-label>Min Ingredients</mat-label>
              <input
                      formControlName="minIngredients"
                      matInput
                      type="number"
                      placeholder="min ingredients..."
              />
          </mat-form-field>


          <mat-form-field>
              <mat-label>Max Ingredients</mat-label>
              <input
                      formControlName="maxIngredients"
                      matInput
                      type="number"
                      placeholder="max ingredients..."
              />
          </mat-form-field>
      </form>

      <app-form-errors
          [form]="form"
          [controlNames]="{
        keywords: 'Keywords',
        maxIngredients: 'Max ingredients',
        minIngredients: 'Min ingredients'
      }"/>
  `,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    `,
  ],
})
export class RecipeFilterV2Component implements OnInit {
  @Output() filterChange: Observable<string | undefined>;

  form = new FormGroup({
    keywords: new FormControl<string | null>(null),
    maxIngredients: new FormControl<number>(10, {
      nonNullable: true,
      validators: [Validators.min(0)],
    }),
    minIngredients: new FormControl<number>(0, {
      nonNullable: true,
      validators: [Validators.min(0), isEven],
    }),
  });
  maxIngredients = this.form.controls.maxIngredients;
  minIngredients = this.form.controls.minIngredients;

  constructor() {
    this.filterChange = this.form.valueChanges.pipe(
      filter(() => this.form.valid),
      map((value) => value.keywords ?? undefined)
    );
  }

  ngOnInit() {
    this.minIngredients.valueChanges.subscribe((min) => {
      if (this.maxIngredients.value < min) {
        this.maxIngredients.setValue(min);
      }
    });

    this.maxIngredients.valueChanges.subscribe((max) => {
      if (this.minIngredients.value > max) {
        this.minIngredients.setValue(max);
      }
    });
  }
}

const isEven: ValidatorFn = (control) =>
  control.value % 2 === 0 ? null : { isEven: 'value is not even' };
