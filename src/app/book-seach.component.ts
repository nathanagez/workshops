import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-book-search',
  template: `<form>
    <input type="text" />
    <select>
      <option value="all">All</option>
      <option value="books">Books</option>
      <option value="magazines">Magazines</option>
    </select>
    <button type="submit">Search</button>
  </form>`,
})
export class BookSearchComponent {}
