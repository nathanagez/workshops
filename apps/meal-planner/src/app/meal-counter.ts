import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mp-meal-counter',
  template: `🚧 meal-counter`,
})
export class MealCounterComponent {}
