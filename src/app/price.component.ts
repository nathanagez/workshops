import { Component, Input } from '@angular/core';

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
  @Input() currency = 'EUR';
}
