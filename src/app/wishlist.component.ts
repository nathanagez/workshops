import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Wishlist } from './wishlist';
import { Book } from './book';
import { map } from 'rxjs/operators';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-wishlist',
  template: `
    <h1>My Wishlist</h1>
    <ul>
      <mc-book-preview *ngFor="let book of books$ | async" [book]="book">
        <button (click)="removeBook(book)">REMOVE</button>
      </mc-book-preview>
    </ul>
    <hr />
    <div>
      Total ({{ count$ | async }}):
      <mc-price [price]="totalPrice$ | async"></mc-price>
    </div>
  `,
})
export class WishlistComponent {
  books$ = this._wishlist.books$;
  count$ = this.books$.pipe(map((books) => books.length));
  totalPrice$ = this.books$.pipe(
    map((books) => {
      return books.reduce((total, book) => total + (book.price ?? 0), 0);
    })
  );

  constructor(private _wishlist: Wishlist) {}

  removeBook(book: Book) {
    this._wishlist.removeBook(book);
  }
}
