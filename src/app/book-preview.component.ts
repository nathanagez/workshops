import { Component, Input } from '@angular/core';
import { Book } from './wishlist';

@Component({
  selector: 'mc-book-preview',
  template: `
    <ng-container *ngIf="book != null">
      <mc-card>
        <span slot="title">{{ book.name }}</span>
        <mc-price slot="body" [price]="book.price" currency="EUR"></mc-price>
        <div slot="actions">
          <ng-content></ng-content>
        </div>
      </mc-card>
    </ng-container>
  `,
})
export class BookPreviewComponent {
  @Input() book: Book | null = null;
}
