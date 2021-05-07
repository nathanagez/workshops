import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

enum PrintType {
  All = 'all',
  Books = 'books',
  Magazines = 'magazines',
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-book-search',
  template: `<form [formGroup]="formGroup" (ngSubmit)="search()">
    <input class="keywords" formControlName="keywords" type="text" />
    <select formControlName="printType">
      <option [value]="PrintType.All">All</option>
      <option [value]="PrintType.Books">Books</option>
      <option [value]="PrintType.Magazines">Magazines</option>
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
  styles: [
    `
      input.ng-invalid.ng-touched {
        background-color: red;
      }
    `,
  ],
})
export class BookSearchComponent {
  PrintType = PrintType;
  formGroup = new FormGroup({
    keywords: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
    ]),
    printType: new FormControl(),
  });

  constructor() {
    this.reset();
  }

  search() {
    console.log(this.formGroup.value);
  }

  reset() {
    this.formGroup.reset({
      printType: PrintType.All,
    });
  }
}
