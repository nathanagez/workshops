import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'mp-app',
  template: `<h1>{{ title }}</h1>`,
})
export class AppComponent {
  title = 'meal-planner';
}

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
