import { Component } from '@angular/core';
import { Book, createBook, Wishlist } from './wishlist';

@Component({
  selector: 'mc-wishlist',
  template: `
    <h1>My Wishlist</h1>
    <ul>
      <li *ngFor="let book of getBooks()">
        <span>{{ book.name }}</span>
        <span> - </span>
        <mc-price [price]="book.price" currency="EUR"></mc-price>
        <button (click)="removeBook(book)">REMOVE</button>
      </li>
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
}
