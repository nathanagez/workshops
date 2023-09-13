import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RecipeSearchComponent } from './recipe-search.component';
import { RecipeCarouselComponent } from './recipe-carousel.component';
import { SignalImmutabilityDemoComponent } from './signal-immutability-demo.component';
import { Cart } from './cart.service';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  imports: [
    RecipeSearchComponent,
    RecipeCarouselComponent,
    SignalImmutabilityDemoComponent,
  ],
  template: `
<!--      <app-signal-immutability-demo/>-->
      <!--        <app-recipe-carousel/>-->
      Recipes in cart: {{count()}}
      <app-recipe-search/>
  `,
})
export class AppComponent {
  count = inject(Cart).count;
}
