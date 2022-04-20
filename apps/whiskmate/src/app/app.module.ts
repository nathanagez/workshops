import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { MealPlanningModule } from './meal-planning.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, MealPlanningModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
