import {Component} from '@angular/core';

@Component({
  selector: 'mc-demo',
  template: `
    <p>
      {{ value }}
    </p>
    <button [disabled]="!canIncrease()" (click)="increment()">+</button>
    <button [disabled]="!canDecrease()" (click)="decrement()">-</button>
    <button (click)="reset()">RESET</button>
  `,
})
export class DemoComponent {
  value = 0;

  increment() {
    this.value++;
  }

  decrement() {
    this.value--;
  }

  canDecrease() {
    return this.value > 0;
  }

  canIncrease() {
    return this.value < 5;
  }

  reset() {
    this.value = 0;
  }
}
