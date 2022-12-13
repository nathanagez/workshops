import { Component } from '@angular/core';

@Component({
  selector: 'mp-app',
  template: `<h1>{{ title }}</h1>`
})
export class AppComponent {
  title = 'meal-planner';
}
