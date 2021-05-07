import { Book } from './book';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Wishlist {
  private _books: Book[] = [];

  addBook(book: Book) {
    this._books = [...this._books, book];
  }

  removeBook(book: Book) {
    this._books = this._books.filter((_book) => book !== _book);
  }

  getBookList(): Book[] {
    return this._books;
  }

  update(book: Book, changes: Partial<Book>) {
    this._books = this._books.map((_book) => {
      if (_book === book) {
        /* This is the new book. */
        return {
          ...book,
          ...changes,
        };
      }

      return _book;
    });
  }
}
