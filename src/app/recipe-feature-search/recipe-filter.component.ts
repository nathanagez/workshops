import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-recipe-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <form #form="ngForm" (ngSubmit)="onSubmit()">
      <input
        #keywordsControl="ngModel"
        [(ngModel)]="keywords"
        name="keywords"
        required
        type="text"
        placeholder="keywords..."
      />

      <button [disabled]="!form.valid" type="submit">SEARCH</button>

      <p
        class="error"
        *ngIf="keywordsControl.dirty && keywordsControl.hasError('required')"
      >
        Keywords are required.
      </p>
    </form>
  `,
  styles: [
    `
      input.ng-dirty.ng-invalid {
        background-color: red;
      }

      .error {
        font-size: small;
        color: red;
      }
    `,
  ],
})
export class RecipeFilterComponent {
  @Output() filterSubmit = new EventEmitter<string>();

  keywords?: string;

  onSubmit() {
    this.filterSubmit.emit(this.keywords);
  }
}
