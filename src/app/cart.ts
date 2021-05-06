export interface Book {
  name: string;
  price: number | null;
}

export function createBook(book: Book): Book {
  return book;
}

export class Cart {
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
}
