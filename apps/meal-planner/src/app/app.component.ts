import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RecipeSearchComponent } from './recipe-search.component';
import { provideHttpClient } from '@angular/common/http';

@Component({
  selector: 'mp-app',
  template: `<mp-recipe-search></mp-recipe-search>`,
})
export class AppComponent {
  title = 'meal-planner';
}

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, RecipeSearchComponent],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}