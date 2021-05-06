import { Component, Input, OnInit } from '@angular/core';
import { Book } from './wishlist';

@Component({
  selector: 'mc-price',
  template: `{{ price | currency: currency }}`,
  styles: [
    `
      :host {
        font-style: italic;
      }
    `,
  ],
})
export class PriceComponent {
  @Input() price: number | null = null;
  @Input() currency: string = 'EUR';
}
