import { HttpClientModule } from '@angular/common/http';
import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RecipeSearchModule } from './recipe-search.component';

@Component({
  selector: 'wm-root',
  template: `<wm-recipe-search></wm-recipe-search>`,
})
export class AppComponent {}

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, RecipeSearchModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
