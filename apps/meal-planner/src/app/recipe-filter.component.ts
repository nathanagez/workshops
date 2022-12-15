import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'mp-recipe-filter',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: ` <form [formGroup]="form">
    <input type="text" formControlName="keywords" />
  </form>`,
})
export class RecipeFilterComponent {
  @Output() keywordsChange: Observable<string | null>;

  form = new FormGroup({
    keywords: new FormControl<string | null>(null),
  });

  constructor() {
    this.keywordsChange = this.form.controls.keywords.valueChanges;
  }
}
