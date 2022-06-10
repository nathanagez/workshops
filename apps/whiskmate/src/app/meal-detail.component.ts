import { MealPlanner } from './meal-planner';
import { map, switchMap, filter } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'wm-recipe-detail',
  imports: [CommonModule],
  template: `<ng-container *ngIf="recipe$ | async as recipe">
    <h1>{{ recipe.name }}</h1>
    <ul>
      <li *ngFor="let step of recipe.steps">{{ step }}</li>
    </ul>
    <button>NEXT</button>
  </ng-container>`,
})
export class MealDetailComponent {
  recipe$ = this._route.paramMap.pipe(
    map((params) => params.get('recipeId') as string),
    switchMap((recipeId) => this._mealPlanner.getRecipe(recipeId))
  );

  constructor(
    private _mealPlanner: MealPlanner,
    private _route: ActivatedRoute
  ) {}
}
