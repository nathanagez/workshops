import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Cart } from './cart.service';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  template: `
      Recipes in cart: {{count()}}
      <router-outlet/>

      <hr>
      
      <footer>
          <a routerLink="/search">Search</a>
          |
          <a routerLink="/carousel">Carousel</a>
      </footer>
  `,
})
export class AppComponent {
  count = inject(Cart).count;
}
