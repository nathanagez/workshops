import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'wm-counter',
  imports: [CommonModule],
  template: `
    <div class="counter" [style.fontSize.px]="getFontSize()">{{ counter }}</div>
    <button type="button" [disabled]="!canIncrement()" (click)="increment()">
      +
    </button>
    <button type="button" [disabled]="!canDecrement()" (click)="decrement()">
      -
    </button>
    <div>
      <span
        *ngFor="let star of getStars(); let idx = index"
        class="star"
        (click)="setCounter(idx + 1)"
      >
        {{ star ? '★' : '☆' }}
      </span>
    </div>
  `,
  styles: [
    `
      .counter {
        font-weight: bold;
      }

      .star {
        cursor: pointer;
      }
    `,
  ],
})
export class CounterComponent {
  counter = 0;

  getFontSize() {
    return this.counter + 10;
  }

  getStars() {
    return [
      ...range(this.counter).map(() => true),
      ...range(5 - this.counter).map(() => false),
    ];
  }

  setCounter(counter: number) {
    this.counter = counter;
  }

  canDecrement() {
    return this.counter > 0;
  }

  canIncrement() {
    return this.counter < 5;
  }

  increment() {
    this.counter++;
  }

  decrement() {
    this.counter--;
  }
}

function range(count: number) {
  return Array.from(Array(count));
}
