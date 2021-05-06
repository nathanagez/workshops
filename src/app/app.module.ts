import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DemoComponent } from './demo/demo.component';
import { WishlistComponent } from './wishlist.component';
import { ValueComponent } from './demo/value.component';

@NgModule({
  declarations: [
    AppComponent,
    DemoComponent,
    WishlistComponent,
    ValueComponent,
  ],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
