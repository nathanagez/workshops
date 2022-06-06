import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'wm-app',
  template: `<h1>👨🏻‍🍳 Welcome to {{ title }}</h1>`,
})
export class AppComponent {
  title = 'whiskmate';
}
