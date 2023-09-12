import { Component } from '@angular/core';
import { RecipeCarouselComponent } from './recipe-carousel.component';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RecipeCarouselComponent],
  template: ` 
  <h1>Hello</h1> 
  <app-recipe-carousel/>
  `,
})
export class AppComponent {}
