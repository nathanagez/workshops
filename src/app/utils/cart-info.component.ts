import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Cart } from '../recipe-domain/cart.service';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-cart-info',
  template: `Meals count: {{ count() }}`,
})
export class CartInfoComponent {
  count = inject(Cart).count;
}
