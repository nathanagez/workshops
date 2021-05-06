import { Component } from '@angular/core';

@Component({
  selector: 'mc-demo',
  template: `
    <button *ngFor="let color of colors" (click)="selectedColor = color">
      {{ color }}
    </button>
    <button [disabled]="!canIncrease()" (click)="increment()">+</button>
    <button [disabled]="!canDecrease()" (click)="decrement()">-</button>
    <button *ngIf="canReset()" (click)="reset()" class="reset-button">
      RESET
    </button>
    <p [style.color]="selectedColor" [style.fontSize.px]="value * 5 + 10">
      {{ value }}
    </p>
  `,
  styles: [
    `
      .reset-button {
        background-color: orange;
      }
    `,
  ],
})
export class DemoComponent {
  colors = ['red', 'blue'];
  selectedColor = 'red';
  value = 0;

  increment() {
    this.value++;
  }

  decrement() {
    this.value--;
  }

  reset() {
    this.value = 0;
  }

  canDecrease() {
    return this.value > 0;
  }

  canIncrease() {
    return this.value < 5;
  }

  canReset() {
    return this.value !== 0;
  }
}
