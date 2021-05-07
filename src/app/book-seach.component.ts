import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import {
  catchError,
  map,
  shareReplay,
  startWith,
  switchMap,
} from 'rxjs/operators';
import {
  BookRepository,
  BookSearchQuery,
  PrintType,
} from './book-repository.service';
import { Wishlist } from './wishlist';
import { Book } from './book';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-book-search',
  template: `<form [formGroup]="formGroup">
      <input class="keywords" formControlName="keywords" type="text" />
      <select formControlName="printType">
        <option [value]="PrintType.All">All</option>
        <option [value]="PrintType.Books">Books</option>
        <option [value]="PrintType.Magazines">Magazines</option>
      </select>

      <button type="button" (click)="reset()">RESET</button>

      <ng-container *ngIf="formGroup.get('keywords')?.dirty">
        <div *ngIf="formGroup.hasError('required', 'keywords')">
          Keywords is required
        </div>

        <div *ngIf="formGroup.hasError('minlength', 'keywords')">
          Please type more
        </div>
      </ng-container>
    </form>
    <hr />
    <mc-book-preview *ngFor="let book of books$ | async" [book]="book">
      <button (click)="addToWishlist(book)">ADD</button>
    </mc-book-preview> `,
  styles: [
    `
      input.ng-invalid.ng-touched {
        background-color: red;
      }
    `,
  ],
})
export class BookSearchComponent {
  PrintType = PrintType;
  formGroup = new FormGroup({
    keywords: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
    ]),
    printType: new FormControl(),
  });

  books$ = this.formGroup.valueChanges.pipe(
    map((searchQuery: BookSearchQuery) => ({
      searchQuery,
      valid: this.formGroup.valid,
    })),
    switchMap(({ searchQuery, valid }) => {
      return valid
        ? this._bookRepository.searchBooks(searchQuery).pipe(
            startWith(null),
            catchError(() => of(null))
          )
        : of(null);
    }),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  constructor(
    private _bookRepository: BookRepository,
    private _wishlist: Wishlist
  ) {
    this.reset();
  }

  reset() {
    this.formGroup.reset({
      printType: PrintType.All,
    });
  }

  addToWishlist(book: Book) {
    this._wishlist.addBook(book);
  }
}
