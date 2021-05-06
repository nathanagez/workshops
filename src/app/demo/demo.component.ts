import { Component } from '@angular/core';

enum Color {
  Blue = 'blue',
  Orange = 'orange',
  Red = 'red',
}

@Component({
  selector: 'mc-demo',
  template: `
    <button (click)="pickNextColor()">Pick Random Color</button>
    <button
      *ngFor="let color of colors"
      [disabled]="color === selectedColor"
      (click)="selectedColor = color"
    >
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
  colors: Color[] = [Color.Blue, Color.Red, Color.Orange];
  selectedColor: Color = Color.Red;
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

  pickNextColor() {
    const nextColorIndex =
      (this.colors.indexOf(this.selectedColor) + 1) % this.colors.length;
    this.selectedColor = this.colors[nextColorIndex];
  }
}
