import { Component } from '@angular/core';
import { CounterComponent } from './counter.component';

@Component({
  standalone: true,
  selector: 'wm-app',
  imports: [CounterComponent],
  template: `
    <h1>👨🏻‍🍳 Welcome to {{ title }}</h1>
    <wm-counter></wm-counter>
  `,
})
export class AppComponent {
  title = 'whiskmate';
}
