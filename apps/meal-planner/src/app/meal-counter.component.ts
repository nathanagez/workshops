import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MealPlanner } from './meal-planner.service';
import { AsyncPipe } from '@angular/common';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mp-meal-counter',
  imports: [AsyncPipe],
  template: `{{ count$ | async }}`,
})
export class MealCounterComponent {
  count$ = inject(MealPlanner).count$;
}
