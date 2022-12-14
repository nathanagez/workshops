import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { JsonPipe, NgForOf, NgIf } from '@angular/common';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mp-ingredient-form',
  imports: [ReactiveFormsModule, NgIf],
  template: ` <fieldset *ngIf="control" [formGroup]="control">
    <legend>Ingredient</legend>
    <input type="text" formControlName="name" />
    <input type="number" formControlName="quantity" />
  </fieldset>`,
})
export class IngredientFormComponent {
  @Input() control?: IngredientFormControl;
}

type IngredientFormControl = FormGroup<{
  name: FormControl<string | null>;
  quantity: FormControl<number | null>;
}>;

function createIngredientFormControl(): IngredientFormControl {
  return new FormGroup({
    name: new FormControl<string | null>(null),
    quantity: new FormControl<number | null>(null),
  });
}

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mp-recipe-form',
  imports: [ReactiveFormsModule, NgForOf, JsonPipe, IngredientFormComponent],
  template: `
    <form [formGroup]="form">
      <input type="text" formControlName="name" />

      <mp-ingredient-form
        *ngFor="let control of ingredientsFormArray.controls"
        [control]="control"
      ></mp-ingredient-form>

      <button (click)="addIngredient()">ADD INGREDIENT</button>
      <button type="reset">RESET</button>
    </form>

    {{ form.value | json }}
  `,
})
export class RecipeFormComponent {
  ingredientsFormArray = new FormArray<IngredientFormControl>([]);

  form = new FormGroup({
    name: new FormControl<string | null>(null),
    ingredients: this.ingredientsFormArray,
  });

  addIngredient() {
    this.ingredientsFormArray.push(createIngredientFormControl());
  }
}
