import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RecipeSearchComponent } from './recipe-search.component';
import { RecipeCarouselComponent } from './recipe-carousel.component';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  imports: [RecipeSearchComponent, RecipeCarouselComponent],
  template: `
        <app-recipe-carousel/>
        <!--<app-recipe-search/>-->
    `,
})
export class AppComponent {}
