import { Component } from '@angular/core';
import { RecipeSearchComponent } from './recipe-search.component';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RecipeSearchComponent],
  template: ` 
  <app-recipe-search/>
  `,
})
export class AppComponent {}
