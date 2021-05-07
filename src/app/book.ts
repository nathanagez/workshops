export interface BookArgs {
  name: string;
  picture?: string | null;
  price?: number | null;
}

export interface Book extends BookArgs {
  picture: string | null;
  price: number | null;
}

export function createBook(book: BookArgs): Book {
  return {
    name: book.name,
    picture: book.picture ?? null,
    price: book.price ?? null,
  };
}
