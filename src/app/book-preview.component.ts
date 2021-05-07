import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Book } from './book';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-book-preview',
  template: `
    <ng-container *ngIf="book != null">
      <mc-card>
        <span slot="title">{{ book.name }}</span>
        <mc-price slot="body" [price]="getPrice()" currency="EUR"></mc-price>
        <div slot="actions">
          <ng-content></ng-content>
        </div>
      </mc-card>
    </ng-container>
  `,
})
export class BookPreviewComponent {
  @Input() book: Book | null = null;

  getPrice() {
    return this.book?.price || null;
  }
}
