import { Component } from '@angular/core';
import { Wishlist } from './wishlist';
import { Book, createBook } from './book';

@Component({
  selector: 'mc-wishlist',
  template: `
    <h1>My Wishlist</h1>
    <ul>
      <button (click)="addBook()">ADD</button>
      <mc-book-preview *ngFor="let book of getBooks()" [book]="book">
        <button (click)="removeBook(book)">REMOVE</button>
      </mc-book-preview>
    </ul>
    <hr />
    <div>Total: <mc-price [price]="getTotalPrice()"></mc-price></div>
  `,
})
export class WishlistComponent {
  private _wishlist = new Wishlist();

  constructor() {
    this._wishlist.addBook(
      createBook({
        name: 'eXtreme Programming Explained',
        price: 30,
      })
    );
    this._wishlist.addBook(
      createBook({
        name: 'FullWebDev',
        price: 45,
      })
    );
  }

  getBooks() {
    return this._wishlist.getBookList();
  }

  getTotalPrice() {
    return this.getBooks().reduce(
      (total, book) => total + (book.price ?? 0),
      0
    );
  }

  removeBook(book: Book) {
    this._wishlist.removeBook(book);
  }

  addBook() {
    this._wishlist.addBook(createBook({ name: 'test', price: 3 }));
  }
}
