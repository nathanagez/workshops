import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DemoComponent } from './demo/demo.component';
import { WishlistComponent } from './wishlist.component';
import { ValueComponent } from './demo/value.component';
import { PriceComponent } from './price.component';
import { BookPreviewComponent } from './book-preview.component';
import { CardComponent } from './card.component';

@NgModule({
  declarations: [
    AppComponent,
    BookPreviewComponent,
    CardComponent,
    DemoComponent,
    WishlistComponent,
    ValueComponent,
    PriceComponent,
  ],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
