import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Book, createBook } from './book';
import { combineLatest, defer, Observable, of, Subscription } from 'rxjs';
import {
  catchError,
  filter,
  map,
  shareReplay,
  startWith,
  switchMap,
} from 'rxjs/operators';

enum PrintType {
  All = 'all',
  Books = 'books',
  Magazines = 'magazines',
}

interface BookSearchQuery {
  keywords: string;
  printType: PrintType;
}

interface VolumeListResponse {
  items: Array<{
    volumeInfo: {
      title: string;
      imageLinks?: {
        thumbnail: string;
      };
    };
    saleInfo: {
      retailPrice?: {
        amount: number;
      };
    };
  }>;
}

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
    <mc-book-preview
      *ngFor="let book of books$ | async"
      [book]="book"
    ></mc-book-preview> `,
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
        ? this._searchBooks(searchQuery).pipe(
            startWith(null),
            catchError(() => of(null))
          )
        : of(null);
    }),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  constructor(private _httpClient: HttpClient) {
    this.reset();
  }

  reset() {
    this.formGroup.reset({
      printType: PrintType.All,
    });
  }

  private _searchBooks(searchQuery: BookSearchQuery): Observable<Book[]> {
    return this._httpClient
      .get<VolumeListResponse>(`https://www.googleapis.com/books/v1/volumes`, {
        params: {
          q: searchQuery.keywords,
          printType: searchQuery.printType,
        },
      })
      .pipe(
        map((data) =>
          data.items.map((item) =>
            createBook({
              name: item.volumeInfo.title,
              picture: item.volumeInfo.imageLinks?.thumbnail ?? null,
              price: item.saleInfo.retailPrice?.amount ?? null,
            })
          )
        )
      );
  }
}
