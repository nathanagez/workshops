import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-recipe-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <form (ngSubmit)="onSubmit()">
      <input
        [(ngModel)]="keywords"
        name="keywords"
        type="text"
        placeholder="keywords..."
      />
      <button type="submit">SEARCH</button>
    </form>
  `,
})
export class RecipeFilterComponent {
  @Output() filterSubmit = new EventEmitter<string>();

  keywords?: string;

  onSubmit() {
    this.filterSubmit.emit(this.keywords);
  }
}
