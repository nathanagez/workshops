import { Book } from './book';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Wishlist {
  books$: Observable<Book[]>;

  private _books$ = new BehaviorSubject<Book[]>([]);

  constructor() {
    this.books$ = this._books$.asObservable();
  }

  addBook(book: Book) {
    this._setBooks([...this._getBooks(), book]);
  }

  removeBook(book: Book) {
    this._setBooks(this._getBooks().filter((_book) => book !== _book));
  }

  update(book: Book, changes: Partial<Book>) {
    this._setBooks(
      this._getBooks().map((_book) => {
        if (_book === book) {
          /* This is the new book. */
          return {
            ...book,
            ...changes,
          };
        }

        return _book;
      })
    );
  }

  private _getBooks(): Book[] {
    return this._books$.value;
  }

  private _setBooks(books: Book[]) {
    this._books$.next(books);
  }
}
