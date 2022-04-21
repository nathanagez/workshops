import { MealPlanner } from './meal-planner.service';
import { RecipePreviewModule } from './recipe-preview.component';
import { CommonModule } from '@angular/common';
import { Recipe } from './recipe';
import {
  Component,
  NgModule,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'wm-meal-planning',
  template: `<h1>Meal Planning</h1>
    <button *ngIf="canUndo$ | async" (click)="undo()">UNDO</button>

    <wm-recipe-preview
      *ngFor="let recipe of recipes$ | async; trackBy: trackById"
      [recipe]="recipe"
    >
      <ng-container slot="actions">
        <button (click)="removeRecipe(recipe)">REMOVE</button>
      </ng-container>
    </wm-recipe-preview> `,
})
export class MealPlanningComponent {
  canUndo$ = this._mealPlanner.canUndo$;
  recipes$ = this._mealPlanner.recipes$;

  constructor(private _mealPlanner: MealPlanner) {}

  trackById(index: number, recipe: Recipe) {
    return recipe.id;
  }

  removeRecipe(recipe: Recipe) {
    this._mealPlanner.removeRecipe(recipe);
  }

  undo() {
    this._mealPlanner.undo();
  }
}

@NgModule({
  declarations: [MealPlanningComponent],
  exports: [MealPlanningComponent],
  imports: [CommonModule, RecipePreviewModule],
})
export class MealPlanningModule {}
