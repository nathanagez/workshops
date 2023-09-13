import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-errors',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule],
  template: `
    <ng-container *ngFor="let control of form.controls | keyvalue">
      <ng-container *ngFor="let error of control.value.errors ?? {} | keyvalue">
        <li [ngSwitch]="error.key" class="error">
          {{ controlNames?.[control.key] ?? control.key }}
          <ng-container *ngSwitchCase="'required'">is required.</ng-container>
          <ng-container *ngSwitchCase="'min'"
            >min value is {{ error.value.min }}.</ng-container
          >
          <ng-container *ngSwitchDefault>is invalid.</ng-container>
        </li>
      </ng-container>
    </ng-container>
  `,
  styles: [
    `
      .error {
        font-size: small;
        color: red;
      }
    `,
  ],
})
export class FormErrorsComponent {
  @Input({ required: true }) form!: FormGroup;
  @Input() controlNames?: Record<string, string>;
}
