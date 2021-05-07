import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book, createBook } from './book';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

export enum PrintType {
  All = 'all',
  Books = 'books',
  Magazines = 'magazines',
}

export interface BookSearchQuery {
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

@Injectable({
  providedIn: 'root',
})
export class BookRepository {
  constructor(private _httpClient: HttpClient) {}

  searchBooks(searchQuery: BookSearchQuery): Observable<Book[]> {
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
