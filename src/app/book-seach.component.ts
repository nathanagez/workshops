import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Book, createBook } from './book';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
  selector: 'mc-book-search',
  template: `<form [formGroup]="formGroup" (ngSubmit)="search()">
      <input class="keywords" formControlName="keywords" type="text" />
      <select formControlName="printType">
        <option [value]="PrintType.All">All</option>
        <option [value]="PrintType.Books">Books</option>
        <option [value]="PrintType.Magazines">Magazines</option>
      </select>

      <button [disabled]="!formGroup.valid" type="submit">SEARCH</button>

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
      *ngFor="let book of books"
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
  books: Book[] | null = null;
  formGroup = new FormGroup({
    keywords: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
    ]),
    printType: new FormControl(),
  });

  constructor(private _httpClient: HttpClient) {
    this.reset();
  }

  search() {
    const formData = this.formGroup.value as BookSearchQuery;
    this._searchBooks(formData).subscribe((books) => (this.books = books));
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
