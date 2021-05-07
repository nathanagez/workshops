import { Component } from '@angular/core';

@Component({
  selector: 'mc-root',
  template: `<mc-book-search></mc-book-search>
    <hr />
    <mc-wishlist></mc-wishlist> `,
})
export class AppComponent {}
