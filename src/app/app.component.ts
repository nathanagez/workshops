import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Cart } from './recipe-domain/cart.service';

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
