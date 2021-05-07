import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-book-search',
  template: `<form [formGroup]="formGroup" (ngSubmit)="search()">
    <input formControlName="keywords" type="text" />
    <select formControlName="printType">
      <option value="all">All</option>
      <option value="books">Books</option>
      <option value="magazines">Magazines</option>
    </select>

    <button [disabled]="!formGroup.valid" type="submit">SEARCH</button>

    <button type="button" (click)="reset()">RESET</button>

    <ng-container *ngIf="formGroup.get('keywords')?.dirty">
      <div *ngIf="formGroup.hasError('required', 'keywords')">
        Keywords is required
      </div>

      <div *ngIf="formGroup.hasError('minlength', 'keywords')">
        Please type more
      </div>
    </ng-container>
  </form>`,
})
export class BookSearchComponent {
  formGroup = new FormGroup({
    keywords: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
    ]),
    printType: new FormControl(),
  });

  search() {
    console.log(this.formGroup.value);
  }

  reset() {
    this.formGroup.reset();
  }
}
